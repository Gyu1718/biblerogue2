// Lightweight visual cleanup and temporary no-save stabilization.
// Save/continue stays disabled until the game content and ending flow are complete.
// This file must never run a broad MutationObserver that rewrites the whole game tree.

(function () {
  const SAVE_KEY = 'biblerogue2.save.v1';

  function clearDeferredSave() {
    try {
      window.localStorage?.removeItem(SAVE_KEY);
    } catch (error) {
      // localStorage can be unavailable in some embedded/mobile contexts.
    }
  }

  function cleanHome() {
    const home = document.getElementById('home-screen');
    if (!home) return;

    const bottomIcons = home.querySelector('.bottom-icons');
    if (bottomIcons) bottomIcons.setAttribute('aria-hidden', 'true');
  }

  function patchLocationText() {
    const locationPanel = document.querySelector('#play-screen .location-panel');
    if (!locationPanel) return;

    const nextText = locationPanel.textContent.replace(/^\s*⛺\s*/, '').trim();
    if (locationPanel.textContent !== nextText) locationPanel.textContent = nextText;
  }

  function patchEndingRetryButton() {
    const retry = document.querySelector('#ending-screen .ending-retry');
    if (!retry) return;

    if (retry.dataset.go !== 'new-play') retry.dataset.go = 'new-play';
    if (retry.textContent !== '다시 도전') retry.textContent = '다시 도전';
  }

  function stabilizeNoSaveEntry() {
    clearDeferredSave();

    const home = document.getElementById('home-screen');
    if (!home) return;

    const triggers = home.querySelectorAll('.chapter-card.available[data-go], .continue-button[data-go]');
    triggers.forEach((trigger) => {
      if (trigger.dataset.go !== 'new-play') trigger.dataset.go = 'new-play';
    });

    const continueLabel = home.querySelector('.continue-label');
    if (continueLabel && continueLabel.textContent !== '이야기 시작하기') {
      continueLabel.textContent = '이야기 시작하기';
    }

    const restart = home.querySelector('.restart-button');
    if (restart) restart.remove();

    const settingsSaveText = Array.from(home.querySelectorAll('.home-settings-list p')).find((item) => item.textContent.includes('저장'));
    const saveDescription = settingsSaveText?.querySelector('span');
    if (saveDescription && saveDescription.textContent !== '게임 완성 후 마지막 단계에서 추가합니다.') {
      saveDescription.textContent = '게임 완성 후 마지막 단계에서 추가합니다.';
    }

    if (home.dataset.hasSave !== 'false') home.dataset.hasSave = 'false';
    if (home.dataset.saveMode !== 'disabled-until-release') home.dataset.saveMode = 'disabled-until-release';
  }

  function parseProgressText(value) {
    const match = String(value || '').match(/(\d+)\s*\/\s*(\d+)/);
    if (!match) return { current: 1, total: 1, ratio: 1 };

    const current = Math.max(1, Number(match[1]) || 1);
    const total = Math.max(current, Number(match[2]) || current);
    const ratio = Math.max(0, Math.min(1, current / total));
    return { current, total, ratio };
  }

  function patchStoryProgress() {
    const progress = document.querySelector('#play-screen .story-progress');
    if (!progress) return;

    const label = progress.querySelector('strong');
    const meter = progress.querySelector('div');
    const parsed = parseProgressText(label?.textContent || '1 / 1');
    const percent = `${Math.round(parsed.ratio * 100)}%`;

    if (progress.dataset.percent !== percent) {
      progress.style.setProperty('--story-progress-ratio', String(parsed.ratio));
      progress.dataset.current = String(parsed.current);
      progress.dataset.total = String(parsed.total);
      progress.dataset.percent = percent;
    }

    if (meter && !meter.classList.contains('progress-meter')) {
      meter.className = 'progress-meter';
      meter.innerHTML = '<b></b>';
    }

    const fill = meter?.querySelector('b');
    if (fill && fill.style.width !== percent) fill.style.width = percent;

    const topProgress = document.querySelector('#play-screen .play-progress-line');
    if (topProgress) {
      topProgress.style.setProperty('--story-progress-ratio', String(parsed.ratio));
      topProgress.dataset.percent = percent;

      const steps = Array.from(topProgress.querySelectorAll('span'));
      const activeCount = Math.max(1, Math.ceil(parsed.ratio * steps.length));
      steps.forEach((step, index) => {
        const shouldBeActive = index < activeCount;
        if (step.classList.contains('active') !== shouldBeActive) {
          step.classList.toggle('active', shouldBeActive);
        }
      });
    }
  }

  function runCleanupPass() {
    cleanHome();
    patchLocationText();
    patchStoryProgress();
    patchEndingRetryButton();
    stabilizeNoSaveEntry();
  }

  function bindCleanupHooks() {
    document.addEventListener('click', () => {
      window.requestAnimationFrame(runCleanupPass);
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        window.requestAnimationFrame(runCleanupPass);
      }
    }, true);
  }

  function initPostCleanup() {
    runCleanupPass();
    bindCleanupHooks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostCleanup);
  } else {
    initPostCleanup();
  }
})();
