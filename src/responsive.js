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

// Temporary chapter routing bridge.
// Keeps existing main.js intact while allowing chapter cards with data-start-node
// to start their own story node instead of always falling back to START_NODE_ID.
(function () {
  function nodeExists(nodeId) {
    return Boolean(nodeId && window.STORY_NODES && window.STORY_NODES[nodeId]);
  }

  function getFallbackStartNodeId() {
    if (typeof START_NODE_ID !== 'undefined') return START_NODE_ID;
    return window.START_NODE_ID || 'exodus_01_slave_day';
  }

  function resolveStartNodeId(trigger) {
    const explicitStartNode = trigger?.dataset?.startNode;
    if (nodeExists(explicitStartNode)) return explicitStartNode;

    const chapter = trigger?.dataset?.chapter;
    if (chapter === 'wilderness') {
      const wildernessStart = window.WILDERNESS_START_NODE_ID || 'wilderness_01_marah_thirst';
      if (nodeExists(wildernessStart)) return wildernessStart;
    }

    if (chapter === 'exodus') return getFallbackStartNodeId();
    return getFallbackStartNodeId();
  }

  function startAtNode(startNodeId) {
    const resolvedStartNodeId = nodeExists(startNodeId) ? startNodeId : getFallbackStartNodeId();

    if (typeof clearSave === 'function') clearSave();
    if (typeof resetGame === 'function') resetGame();

    currentNodeId = resolvedStartNodeId;
    currentEndingId = null;
    selectedChoiceIndex = null;

    if (typeof renderNode === 'function') renderNode(getCurrentNode());
    if (typeof markVisitedNode === 'function') markVisitedNode(currentNodeId);
    if (typeof writeSave === 'function') writeSave();
    if (typeof showScreen === 'function') showScreen('play');
  }

  if (typeof startNewGame === 'function') {
    const originalStartNewGame = startNewGame;
    startNewGame = function patchedStartNewGame(startNodeId) {
      if (nodeExists(startNodeId)) {
        startAtNode(startNodeId);
        return;
      }
      originalStartNewGame();
    };
  }

  function interceptNewPlay(event) {
    const trigger = event.target?.closest?.('[data-go="new-play"]');
    if (!trigger) return;

    const hasChapterStart = trigger.dataset.startNode || trigger.dataset.chapter;
    if (!hasChapterStart) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    startAtNode(resolveStartNodeId(trigger));
  }

  document.addEventListener('click', interceptNewPlay, true);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    interceptNewPlay(event);
  }, true);
})();
