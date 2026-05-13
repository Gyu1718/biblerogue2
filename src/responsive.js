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
// main.js currently starts every new playthrough from its internal START_NODE_ID.
// This bridge only handles cards that declare data-start-node and starts them
// through the existing save/continue path without touching main.js internals.
(function () {
  const SAVE_KEY = 'biblerogue2.save.v1';
  const WILDERNESS_PLAY_ART_BASE = 'assets/images/story/wilderness/play_left_520x650';
  const WILDERNESS_ENDING_ART_BASE = 'assets/images/story/wilderness/original_16x9';
  const WILDERNESS_ENDING_IDS = new Set([
    'true_wilderness_daily_trust',
    'faithful_wilderness_witness',
    'wounded_wilderness_witness',
    'bad_wilderness_bitter_murmur',
    'bad_rotten_manna',
    'bad_sabbath_rebellion',
    'bad_massah_meribah'
  ]);

  function nodeExists(nodeId) {
    return Boolean(nodeId && window.STORY_NODES && window.STORY_NODES[nodeId]);
  }

  function resolveStartNodeId(trigger) {
    const explicitStartNode = trigger?.dataset?.startNode;
    if (nodeExists(explicitStartNode)) return explicitStartNode;

    if (trigger?.dataset?.chapter === 'wilderness') {
      const wildernessStart = window.WILDERNESS_START_NODE_ID || 'wilderness_01_marah_thirst';
      if (nodeExists(wildernessStart)) return wildernessStart;
    }

    return null;
  }

  function writeChapterStartSave(startNodeId) {
    if (!nodeExists(startNodeId)) return false;

    const payload = {
      version: 1,
      currentNodeId: startNodeId,
      currentEndingId: null,
      selectedChoiceIndex: null,
      gameState: {
        trust: 0,
        fear: 0,
        community: 0,
        discernment: 0,
        memory: 0,
        time: 0,
        clues: 0,
        delay: 0,
        scatter: 0
      },
      visitedNodes: [],
      unlockedEndings: [],
      lastPlayedAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
      return true;
    } catch (error) {
      console.warn('Chapter start save could not be written.', error);
      return false;
    }
  }

  function updateWildernessSceneArt() {
    const sceneArt = document.querySelector('.scene-art');
    const sceneId = sceneArt?.dataset?.sceneId || '';
    if (!sceneArt || !sceneId.startsWith('wilderness_')) return;

    const artPath = `${WILDERNESS_PLAY_ART_BASE}/${sceneId}.png`;
    sceneArt.style.backgroundImage = `url('${artPath}')`;
    sceneArt.dataset.artPath = artPath;
  }

  function updateWildernessEndingArt() {
    const ending = document.getElementById('ending-screen');
    const endingBg = ending?.querySelector?.('.ending-bg');
    const endingId = ending?.dataset?.endingId || '';
    if (!ending || !endingBg || !WILDERNESS_ENDING_IDS.has(endingId)) return;

    const artPath = `${WILDERNESS_ENDING_ART_BASE}/${endingId}.png`;
    const isTrue = endingId === 'true_wilderness_daily_trust' || endingId === 'faithful_wilderness_witness';
    const goldOpacity = isTrue ? '.34' : '.18';
    const warmOpacity = isTrue ? '.10' : '.06';

    endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,${goldOpacity}) 0 8%, rgba(255,198,83,${warmOpacity}) 23%, transparent 43%), url('${artPath}')`;
    ending.dataset.artPath = artPath;
  }

  function refreshWildernessArt() {
    updateWildernessSceneArt();
    updateWildernessEndingArt();
  }

  function scheduleWildernessArtRefresh() {
    window.requestAnimationFrame(() => {
      refreshWildernessArt();
      window.requestAnimationFrame(refreshWildernessArt);
    });
  }

  function startChapterFromCard(trigger) {
    const startNodeId = resolveStartNodeId(trigger);
    if (!startNodeId) return false;
    if (!writeChapterStartSave(startNodeId)) return false;

    if (typeof continueSavedOrStart === 'function') {
      continueSavedOrStart();
      scheduleWildernessArtRefresh();
      return true;
    }

    return false;
  }

  function interceptNewPlay(event) {
    const trigger = event.target?.closest?.('[data-go="new-play"]');
    if (!trigger) return;

    const startNodeId = resolveStartNodeId(trigger);
    if (!startNodeId) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    startChapterFromCard(trigger);
  }

  function scheduleAfterNavigation(event) {
    const target = event.target;
    if (!target?.closest?.('[data-go], .choice')) return;
    scheduleWildernessArtRefresh();
  }

  document.addEventListener('click', interceptNewPlay, true);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    interceptNewPlay(event);
  }, true);

  document.addEventListener('click', scheduleAfterNavigation, false);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    scheduleAfterNavigation(event);
  }, false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleWildernessArtRefresh);
  } else {
    scheduleWildernessArtRefresh();
  }
})();
