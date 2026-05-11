// Lightweight visual cleanup only.
// Branching runtime, navigation, game state, scene rendering, and ending rendering belong to src/main.js.

(function () {
  function cleanHome() {
    const home = document.getElementById('home-screen');
    if (!home) return;

    const bottomIcons = home.querySelector('.bottom-icons');
    if (bottomIcons) bottomIcons.setAttribute('aria-hidden', 'true');
  }

  function patchLocationText() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const locationPanel = play.querySelector('.location-panel');
    if (!locationPanel) return;

    locationPanel.textContent = locationPanel.textContent.replace(/^\s*⛺\s*/, '').trim();
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
    const play = document.getElementById('play-screen');
    if (!play) return;

    const progress = play.querySelector('.story-progress');
    if (!progress) return;

    const label = progress.querySelector('strong');
    const meter = progress.querySelector('div');
    const parsed = parseProgressText(label?.textContent || '1 / 1');
    const percent = `${Math.round(parsed.ratio * 100)}%`;

    progress.style.setProperty('--story-progress-ratio', String(parsed.ratio));
    progress.dataset.current = String(parsed.current);
    progress.dataset.total = String(parsed.total);
    progress.dataset.percent = percent;

    if (meter && !meter.classList.contains('progress-meter')) {
      meter.className = 'progress-meter';
      meter.innerHTML = '<b></b>';
    }

    const fill = meter?.querySelector('b');
    if (fill) fill.style.width = percent;

    const topProgress = play.querySelector('.play-progress-line');
    if (topProgress) {
      topProgress.style.setProperty('--story-progress-ratio', String(parsed.ratio));
      topProgress.dataset.percent = percent;

      const steps = Array.from(topProgress.querySelectorAll('span'));
      const activeCount = Math.max(1, Math.ceil(parsed.ratio * steps.length));
      steps.forEach((step, index) => {
        step.classList.toggle('active', index < activeCount);
      });
    }
  }

  function observePlayProgress() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const observer = new MutationObserver(() => {
      patchLocationText();
      patchStoryProgress();
    });

    observer.observe(play, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function initPostCleanup() {
    cleanHome();
    patchLocationText();
    patchStoryProgress();
    observePlayProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostCleanup);
  } else {
    initPostCleanup();
  }
})();
