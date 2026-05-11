// Responsive shell for BibleRogue2.
// This keeps the game landscape-first while allowing desktop windows to be resized freely.

(function () {
  const BASE_WIDTH = 1672;
  const BASE_HEIGHT = 941;
  const MIN_READABLE_SCALE = 0.42;

  function getViewportSize() {
    const vv = window.visualViewport;
    return {
      width: Math.max(1, vv?.width || window.innerWidth || document.documentElement.clientWidth || BASE_WIDTH),
      height: Math.max(1, vv?.height || window.innerHeight || document.documentElement.clientHeight || BASE_HEIGHT)
    };
  }

  function isTouchDevice() {
    return window.matchMedia?.('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  }

  function ensureRotateNotice() {
    let notice = document.getElementById('rotate-notice');
    if (notice) return notice;

    notice = document.createElement('aside');
    notice.id = 'rotate-notice';
    notice.setAttribute('aria-live', 'polite');
    notice.innerHTML = `
      <div class="rotate-card">
        <span class="rotate-icon" aria-hidden="true">↻</span>
        <strong>가로 화면으로 플레이해 주세요</strong>
        <p>BibleRogue2는 가로 화면에 맞춘 선택형 서사 게임입니다. 휴대폰을 가로로 돌리면 플레이 화면이 열립니다.</p>
      </div>
    `;
    document.body.appendChild(notice);
    return notice;
  }

  function applyResponsiveLayout() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;

    const { width, height } = getViewportSize();
    const touchDevice = isTouchDevice();
    const portrait = height > width;
    const landscape = width >= height;
    const smallWindow = width < BASE_WIDTH || height < BASE_HEIGHT;
    const mobileLandscape = touchDevice && landscape;
    const mobilePortrait = touchDevice && portrait;
    const safePadX = touchDevice ? 4 : 0;
    const safePadY = touchDevice ? 2 : 0;
    const availableWidth = Math.max(1, width - safePadX * 2);
    const availableHeight = Math.max(1, height - safePadY * 2);
    const scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT);
    const centeredScale = Math.max(0.1, Math.min(scale, 1));

    document.documentElement.style.setProperty('--responsive-vw', `${width}px`);
    document.documentElement.style.setProperty('--responsive-vh', `${height}px`);
    document.documentElement.style.setProperty('--responsive-safe-x', `${safePadX}px`);
    document.documentElement.style.setProperty('--responsive-safe-y', `${safePadY}px`);
    document.documentElement.style.setProperty('--responsive-scale', String(centeredScale));

    document.body.classList.add('responsive-ready');
    document.body.classList.toggle('is-mobile', touchDevice);
    document.body.classList.toggle('is-mobile-landscape', mobileLandscape);
    document.body.classList.toggle('is-mobile-portrait', mobilePortrait);
    document.body.classList.toggle('is-small-window', smallWindow);
    document.body.classList.toggle('is-very-small-window', centeredScale < MIN_READABLE_SCALE);

    canvas.style.transform = `scale(${centeredScale})`;
    canvas.style.left = 'auto';
    canvas.style.top = 'auto';

    ensureRotateNotice();
  }

  function scheduleResponsiveLayout() {
    window.requestAnimationFrame(applyResponsiveLayout);
  }

  function initResponsiveLayout() {
    ensureRotateNotice();
    applyResponsiveLayout();
    window.addEventListener('resize', scheduleResponsiveLayout, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(applyResponsiveLayout, 120);
      setTimeout(applyResponsiveLayout, 360);
    });
    window.visualViewport?.addEventListener('resize', scheduleResponsiveLayout, { passive: true });
    window.visualViewport?.addEventListener('scroll', scheduleResponsiveLayout, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResponsiveLayout);
  } else {
    initResponsiveLayout();
  }
})();

// Play bottom navigation helper.
// Keeps the existing next-story logic, but presents the play footer as a center-bottom pair:
// previous scene / advance with selected choice.
(function () {
  const SAVE_KEY = 'biblerogue2.save.v1';
  const HISTORY_KEY = 'biblerogue2.playHistory.v1';
  const RETURN_FLAG = 'biblerogue2.returnToPlayAfterBack';
  const STATE_KEYS = ['trust', 'fear', 'community', 'discernment', 'memory', 'time', 'clues', 'delay', 'scatter'];

  function canUseStorage() {
    try {
      const testKey = `${HISTORY_KEY}.test`;
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readJson(key, fallback) {
    if (!canUseStorage()) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    if (!canUseStorage()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Keep navigation non-fatal if storage quota or privacy settings block writes.
    }
  }

  function getPlayScreen() {
    return document.getElementById('play-screen');
  }

  function isPlayScreenActive() {
    return getPlayScreen()?.classList.contains('screen-active');
  }

  function getCurrentSnapshot() {
    const play = getPlayScreen();
    const nodeId = play?.querySelector('.scene-art')?.dataset?.sceneId || null;
    if (!nodeId || !window.STORY_NODES?.[nodeId]) return null;

    const previousSave = readJson(SAVE_KEY, {});
    const gameState = {};
    STATE_KEYS.forEach((key) => {
      gameState[key] = Number(play?.dataset?.[key] || 0);
    });

    return {
      version: 1,
      currentNodeId: nodeId,
      currentEndingId: null,
      selectedChoiceIndex: null,
      gameState,
      visitedNodes: Array.isArray(previousSave.visitedNodes) ? previousSave.visitedNodes : [],
      unlockedEndings: Array.isArray(previousSave.unlockedEndings) ? previousSave.unlockedEndings : [],
      lastPlayedAt: new Date().toISOString()
    };
  }

  function readHistory() {
    const history = readJson(HISTORY_KEY, []);
    return Array.isArray(history) ? history.filter((item) => item?.currentNodeId) : [];
  }

  function writeHistory(history) {
    writeJson(HISTORY_KEY, history.slice(-80));
  }

  function pushCurrentSnapshot() {
    const snapshot = getCurrentSnapshot();
    if (!snapshot) return;

    const history = readHistory();
    const last = history[history.length - 1];
    if (last?.currentNodeId !== snapshot.currentNodeId) {
      history.push(snapshot);
      writeHistory(history);
    }
  }

  function clearHistory() {
    if (!canUseStorage()) return;
    window.localStorage.removeItem(HISTORY_KEY);
  }

  function setTextIfChanged(element, text) {
    if (element && element.textContent !== text) element.textContent = text;
  }

  function setAttrIfChanged(element, name, value) {
    if (element && element.getAttribute(name) !== value) element.setAttribute(name, value);
  }

  function updateBottomBackButton() {
    const play = getPlayScreen();
    const backButton = play?.querySelector('.back-home');
    if (!backButton) return;

    const hasHistory = readHistory().length > 0;
    setTextIfChanged(backButton, '이전 장면');
    backButton.classList.toggle('disabled', !hasHistory);
    backButton.disabled = !hasHistory;
    setAttrIfChanged(backButton, 'aria-disabled', String(!hasHistory));
    if (backButton.dataset.go !== 'previous-play-scene') backButton.dataset.go = 'previous-play-scene';
  }

  function restorePreviousScene() {
    const history = readHistory();
    const previous = history.pop();
    if (!previous?.currentNodeId || !window.STORY_NODES?.[previous.currentNodeId]) {
      writeHistory(history);
      updateBottomBackButton();
      return;
    }

    writeHistory(history);
    writeJson(SAVE_KEY, {
      ...previous,
      version: 1,
      selectedChoiceIndex: null,
      currentEndingId: null,
      lastPlayedAt: new Date().toISOString()
    });

    window.sessionStorage?.setItem(RETURN_FLAG, 'true');
    window.location.reload();
  }

  function shouldRecordAdvance(trigger) {
    return trigger?.classList?.contains('next-story') && !trigger.disabled && !trigger.classList.contains('disabled');
  }

  function handleCapturedClick(event) {
    const trigger = event.target.closest('[data-go]');
    if (!trigger) return;

    if (trigger.classList.contains('restart-button') || trigger.dataset.go === 'new-play') {
      clearHistory();
      return;
    }

    if (trigger.dataset.go === 'previous-play-scene') {
      event.preventDefault();
      event.stopImmediatePropagation();
      restorePreviousScene();
      return;
    }

    if (shouldRecordAdvance(trigger)) {
      pushCurrentSnapshot();
      window.setTimeout(updateBottomBackButton, 0);
    }
  }

  function handleCapturedKeydown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    handleCapturedClick(event);
  }

  function initPlayBottomNavigation() {
    document.addEventListener('click', handleCapturedClick, true);
    document.addEventListener('keydown', handleCapturedKeydown, true);

    // Do not observe footer child mutations here. Updating the button label itself can
    // recursively trigger MutationObserver callbacks and lock up the browser.
    window.setInterval(() => {
      if (isPlayScreenActive()) updateBottomBackButton();
    }, 800);

    if (window.sessionStorage?.getItem(RETURN_FLAG) === 'true') {
      window.sessionStorage.removeItem(RETURN_FLAG);
      window.setTimeout(() => {
        document.querySelector('[data-go="play"]')?.click();
      }, 0);
    }

    updateBottomBackButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayBottomNavigation);
  } else {
    initPlayBottomNavigation();
  }
})();
