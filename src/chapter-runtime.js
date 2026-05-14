// Chapter runtime adapter for BibleRogue2.
// Keeps chapter routing and chapter-specific image paths out of responsive.js.
// This adapter patches only the existing public runtime functions from main.js.

(function () {
  const SAVE_KEY = 'biblerogue2.save.v1';
  const CHAPTER_PATCH_SCRIPTS = {
    jericho: [
      'src/data/jerichoStructurePatch.js?v=jericho-20260513a',
      'src/data/jerichoEndingsPatch.js?v=jericho-20260513a'
    ],
    judges: [
      'src/data/judgesStructurePatch.js?v=judges-20260514a',
      'src/data/judgesEndingsPatch.js?v=judges-20260514a'
    ],
    ruth: [
      'src/data/ruthStructurePatch.js?v=ruth-20260514a',
      'src/data/ruthEndingsPatch.js?v=ruth-20260514a'
    ]
  };

  const CHAPTERS = {
    exodus: {
      startNodeId: 'exodus_01_slave_day',
      nodePrefix: 'exodus_',
      playArtBase: 'assets/images/story/exodus/play_left_520x650',
      endingArtBase: 'assets/images/story/exodus/original_16x9'
    },
    wilderness: {
      startNodeId: window.WILDERNESS_START_NODE_ID || 'wilderness_01_marah_thirst',
      nodePrefix: 'wilderness_',
      playArtBase: 'assets/images/story/wilderness/play_left_520x650',
      endingArtBase: 'assets/images/story/wilderness/original_16x9'
    },
    jericho: {
      startNodeId: window.JERICHO_START_NODE_ID || 'jericho_01_jordan_edge',
      nodePrefix: 'jericho_',
      playArtBase: 'assets/images/story/jericho/play_left_520x650',
      endingArtBase: 'assets/images/story/jericho/original_16x9',
      cardArtClass: 'jericho',
      cardLabel: '3장 여리고 시작'
    },
    judges: {
      startNodeId: window.JUDGES_START_NODE_ID || 'judges_01_after_joshua',
      nodePrefix: 'judges_',
      playArtBase: 'assets/images/story/judges/play_left_520x650',
      endingArtBase: 'assets/images/story/judges/original_16x9',
      cardArtClass: 'judges',
      cardLabel: '4장 사사 시대 시작'
    },
    ruth: {
      startNodeId: window.RUTH_START_NODE_ID || 'ruth_01_famine_in_bethlehem',
      nodePrefix: 'ruth_',
      playArtBase: 'assets/images/story/ruth/play_left_520x650',
      endingArtBase: 'assets/images/story/ruth/original_16x9',
      cardArtClass: 'ruth',
      cardLabel: '5장 룻 시작'
    }
  };

  const CHAPTER_ENDING_IDS = new Map([
    ['wilderness', new Set([
      'true_wilderness_daily_trust',
      'faithful_wilderness_witness',
      'wounded_wilderness_witness',
      'bad_wilderness_bitter_murmur',
      'bad_rotten_manna',
      'bad_sabbath_rebellion',
      'bad_massah_meribah',
      'true_wilderness_covenant_witness',
      'faithful_wilderness_covenant_memory',
      'wounded_wilderness_covenant_witness',
      'bad_golden_calf_leader',
      'bad_idol_feast',
      'bad_covenant_broken',
      'bad_return_to_idols'
    ])],
    ['jericho', new Set([
      'true_jericho_faithful_witness',
      'faithful_jericho_memory_keeper',
      'wounded_jericho_trembling_witness',
      'bad_jericho_forgot_red_cord',
      'bad_jericho_broken_silence',
      'bad_jericho_silent_retreat',
      'bad_jericho_devoted_things'
    ])],
    ['judges', new Set([
      'true_judges_memory_kept',
      'faithful_judges_cry_and_return',
      'wounded_judges_trembling_generation',
      'bad_judges_baal_altar',
      'bad_judges_silenced_cry',
      'bad_judges_fear_scattered',
      'bad_judges_spoils_idol',
      'bad_judges_cycle_hardened'
    ])],
    ['ruth', new Set([
      'true_ruth_hesed_witness',
      'faithful_ruth_bethlehem_witness',
      'wounded_ruth_empty_to_full',
      'bad_ruth_left_widows',
      'bad_ruth_field_exploitation',
      'bad_ruth_redeemer_refused',
      'bad_ruth_closed_gate'
    ])]
  ]);

  function getNode(nodeId) {
    return nodeId && window.STORY_NODES ? window.STORY_NODES[nodeId] : null;
  }

  function getChapterByNodeId(nodeId) {
    if (!nodeId) return null;
    return Object.values(CHAPTERS).find((chapter) => nodeId.startsWith(chapter.nodePrefix)) || null;
  }

  function getChapterByEndingId(endingId) {
    if (!endingId) return null;
    for (const [chapterKey, endingIds] of CHAPTER_ENDING_IDS.entries()) {
      if (endingIds.has(endingId)) return CHAPTERS[chapterKey] || null;
    }
    return null;
  }

  function isChapterReady(chapterKey) {
    const chapter = CHAPTERS[chapterKey];
    if (!chapter || !getNode(chapter.startNodeId)) return false;

    const requiredEndings = CHAPTER_ENDING_IDS.get(chapterKey);
    if (!requiredEndings) return true;

    return Array.from(requiredEndings).every((endingId) => window.STORY_ENDINGS?.[endingId]);
  }

  function getChapterByTrigger(trigger) {
    const explicitStartNode = trigger?.dataset?.startNode;
    const chapterName = trigger?.dataset?.chapter;

    if (explicitStartNode && getNode(explicitStartNode)) {
      return getChapterByNodeId(explicitStartNode) || CHAPTERS[chapterName] || null;
    }

    if (chapterName && CHAPTERS[chapterName]) return CHAPTERS[chapterName];
    return null;
  }

  function getStartNodeId(trigger) {
    const explicitStartNode = trigger?.dataset?.startNode;
    if (explicitStartNode && getNode(explicitStartNode)) return explicitStartNode;

    const chapter = getChapterByTrigger(trigger);
    if (chapter && getNode(chapter.startNodeId)) return chapter.startNodeId;

    return null;
  }

  function writeStartSave(startNodeId) {
    if (!getNode(startNodeId)) return false;

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

  function startChapterFromTrigger(trigger) {
    const startNodeId = getStartNodeId(trigger);
    if (!startNodeId) return false;
    if (!writeStartSave(startNodeId)) return false;

    if (typeof window.continueSavedOrStart === 'function') {
      window.continueSavedOrStart();
      return true;
    }

    return false;
  }

  function getChapterNodeImage(node) {
    const chapter = getChapterByNodeId(node?.id);
    if (!chapter) return null;

    // Exodus uses the legacy explicit image map in main.js because its image
    // filenames do not match node IDs. Do not override that working mapping.
    if (chapter.nodePrefix === 'exodus_') return null;

    const filename = node.image || `${node.id}.png`;
    return `${chapter.playArtBase}/${filename}`;
  }

  function getChapterEndingImage(profile) {
    const chapter = getChapterByEndingId(profile?.id);
    if (!chapter) return null;
    const filename = profile.image || `${profile.id}.png`;
    return `${chapter.endingArtBase}/${filename}`;
  }

  function patchSceneArt() {
    if (typeof window.updateSceneArt !== 'function') return;
    const originalUpdateSceneArt = window.updateSceneArt;

    window.updateSceneArt = function patchedUpdateSceneArt(node) {
      originalUpdateSceneArt(node);

      const artPath = getChapterNodeImage(node);
      if (!artPath) return;

      const sceneArt = document.querySelector('.scene-art');
      if (!sceneArt) return;

      sceneArt.style.backgroundImage = `url('${artPath}')`;
      sceneArt.dataset.sceneId = node.id || '';
      sceneArt.dataset.sceneTitle = node.title || '';
      sceneArt.dataset.artPath = artPath;
    };
  }

  function patchEndingArt() {
    if (typeof window.updateEndingArt !== 'function') return;
    const originalUpdateEndingArt = window.updateEndingArt;

    window.updateEndingArt = function patchedUpdateEndingArt(profile) {
      originalUpdateEndingArt(profile);

      const artPath = getChapterEndingImage(profile);
      if (!artPath) return;

      const ending = document.getElementById('ending-screen');
      const endingBg = ending?.querySelector?.('.ending-bg');
      if (!ending || !endingBg) return;

      const isTrue = profile.type === 'true' || profile.type === 'good';
      const goldOpacity = isTrue ? '.34' : '.18';
      const warmOpacity = isTrue ? '.10' : '.06';

      endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,${goldOpacity}) 0 8%, rgba(255,198,83,${warmOpacity}) 23%, transparent 43%), url('${artPath}')`;
      ending.dataset.artPath = artPath;
    };
  }

  function makeChapterCardPlayable(chapterKey) {
    if (!isChapterReady(chapterKey)) return;

    const chapter = CHAPTERS[chapterKey];
    const art = document.querySelector(`.home-chapter-art.${chapter.cardArtClass || chapterKey}`);
    const card = art?.closest?.('.home-chapter-card');
    if (!card) return;

    card.dataset.go = 'new-play';
    card.dataset.startNode = chapter.startNodeId;
    card.dataset.chapter = chapterKey;
    delete card.dataset.panel;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', chapter.cardLabel || `${chapterKey} 시작`);
    card.classList.remove('is-preparing', 'locked');
    card.classList.add('available', 'is-current');

    const status = card.querySelector('.home-chapter-status');
    if (status) status.textContent = '플레이 가능';

    const lock = card.querySelector('.home-chapter-lock');
    if (lock) lock.remove();
  }

  function bindChapterStartCards() {
    document.addEventListener('click', (event) => {
      const trigger = event.target?.closest?.('[data-go="new-play"][data-start-node], [data-go="new-play"][data-chapter]');
      if (!trigger) return;

      const startNodeId = getStartNodeId(trigger);
      if (!startNodeId) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startChapterFromTrigger(trigger);
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const trigger = event.target?.closest?.('[data-go="new-play"][data-start-node], [data-go="new-play"][data-chapter]');
      if (!trigger) return;

      const startNodeId = getStartNodeId(trigger);
      if (!startNodeId) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      startChapterFromTrigger(trigger);
    }, true);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const baseSrc = src.split('?')[0];
      if ([...document.scripts].some((script) => script.getAttribute('src')?.split('?')[0] === baseSrc)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  function ensureChapterPatches(chapterKey) {
    if (isChapterReady(chapterKey)) return Promise.resolve();
    const scripts = CHAPTER_PATCH_SCRIPTS[chapterKey] || [];
    return scripts.reduce((promise, src) => promise.then(() => loadScript(src)), Promise.resolve());
  }

  function initChapterRuntime() {
    Promise.all(['jericho', 'judges', 'ruth'].map((chapterKey) => ensureChapterPatches(chapterKey)))
      .catch((error) => console.warn('Optional chapter patches could not be loaded.', error))
      .finally(() => {
        patchSceneArt();
        patchEndingArt();

        ['jericho', 'judges', 'ruth'].forEach((chapterKey) => {
          if (isChapterReady(chapterKey)) {
            makeChapterCardPlayable(chapterKey);
          } else {
            console.warn(`${chapterKey} chapter was not activated because required data is missing.`);
          }
        });

        bindChapterStartCards();
        loadScript('src/audio-runtime.js?v=audio-20260514a').catch((error) => console.warn('Audio runtime could not be loaded.', error));
        window.BIBLE_ROGUE_CHAPTERS = CHAPTERS;
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChapterRuntime);
  } else {
    initChapterRuntime();
  }
})();
