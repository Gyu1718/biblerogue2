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
    ],
    samuel: [
      'src/data/samuelStructurePatch.js?v=samuel-20260515a',
      'src/data/samuelEndingsPatch.js?v=samuel-20260515a'
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
    },
    samuel: {
      startNodeId: window.SAMUEL_START_NODE_ID || 'samuel_01_siloh_dim_lamp',
      nodePrefix: 'samuel_',
      playArtBase: 'assets/images/story/samuel/play_left_520x650',
      endingArtBase: 'assets/images/story/samuel/original_16x9',
      cardArtClass: 'samuel',
      cardLabel: '6장 사무엘의 부르심 시작'
    },
    saul: {
      startNodeId: window.SAUL_START_NODE_ID || 'saul_01_gilgal_waiting',
      nodePrefix: 'saul_',
      playArtBase: 'assets/images/story/saul/play_left_520x650',
      endingArtBase: 'assets/images/story/saul/original_16x9',
      cardArtClass: 'saul',
      cardLabel: '1장 사울의 불순종 시작'
    }
  };

  const HOME_PART_SCRIPTURES = {
    story: {
      quote: '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라',
      reference: '출애굽기 14:14'
    },
    'part-02': {
      quote: '순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니',
      reference: '사무엘상 15:22'
    },
    'part-03': {
      quote: '오직 정의를 물 같이, 공의를 마르지 않는 강 같이 흐르게 할지어다',
      reference: '아모스 5:24'
    },
    'part-04': {
      quote: '그렇게 하지 아니하실지라도 왕이여 우리가 왕의 신들을 섬기지도 아니하고',
      reference: '다니엘 3:18'
    },
    'part-05': {
      quote: '이는 우리 하나님의 긍휼로 인함이라 이로써 돋는 해가 위로부터 우리에게 임하여',
      reference: '누가복음 1:78'
    },
    'part-06': {
      quote: '땅 끝까지 이르러 내 증인이 되리라 하시니라',
      reference: '사도행전 1:8'
    }
  };

  let currentHomeScripturePanel = 'story';

  const CHAPTER_ENDING_IDS = new Map([
    ['exodus', new Set([
      'true_exodus_deliverance',
      'faithful_exodus_witness',
      'wounded_exodus_witness',
      'bad_bricks_forever',
      'bad_unmarked_door',
      'bad_stayed_in_egypt',
      'bad_return_to_egypt',
      'bad_scattered_people',
      'bad_closed_sea'
    ])],
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
    ])],
    ['samuel', new Set([
      'true_samuel_listening_witness',
      'faithful_samuel_lamp_keeper',
      'wounded_samuel_trembling_word',
      'bad_samuel_mocked_prayer',
      'bad_samuel_stolen_offering',
      'bad_samuel_silenced_call',
      'bad_samuel_hidden_word'
    ])],
    ['saul', new Set([
      'true_saul_obedient_witness',
      'faithful_saul_waiting_remnant',
      'wounded_saul_silent_witness',
      'bad_saul_religious_excuse',
      'bad_saul_kingdom_pride',
      'bad_saul_fearful_compromise'
    ])]
  ]);

  const AUTO_ACTIVATED_CHAPTERS = ['jericho', 'judges', 'ruth', 'samuel', 'saul'];

  function getNode(nodeId) {
    return nodeId && window.STORY_NODES ? window.STORY_NODES[nodeId] : null;
  }

  function getChapterKeyByNodeId(nodeId) {
    if (!nodeId) return null;
    const entry = Object.entries(CHAPTERS).find(([, chapter]) => nodeId.startsWith(chapter.nodePrefix));
    return entry?.[0] || null;
  }

  function getChapterByNodeId(nodeId) {
    const chapterKey = getChapterKeyByNodeId(nodeId);
    return chapterKey ? CHAPTERS[chapterKey] : null;
  }

  function getChapterKeyByEndingId(endingId) {
    if (!endingId) return null;
    for (const [chapterKey, endingIds] of CHAPTER_ENDING_IDS.entries()) {
      if (endingIds.has(endingId)) return chapterKey;
    }
    return null;
  }

  function getChapterByEndingId(endingId) {
    const chapterKey = getChapterKeyByEndingId(endingId);
    return chapterKey ? CHAPTERS[chapterKey] : null;
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

  function readSave() {
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function getRetryStartNodeId() {
    const ending = document.getElementById('ending-screen');
    const endingId = ending?.dataset?.endingId || readSave()?.currentEndingId;
    const chapterFromEnding = getChapterByEndingId(endingId);
    if (chapterFromEnding?.startNodeId && getNode(chapterFromEnding.startNodeId)) return chapterFromEnding.startNodeId;

    const savedNodeId = readSave()?.currentNodeId;
    const chapterFromNode = getChapterByNodeId(savedNodeId);
    if (chapterFromNode?.startNodeId && getNode(chapterFromNode.startNodeId)) return chapterFromNode.startNodeId;

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

  function startChapterFromNode(startNodeId) {
    if (!startNodeId) return false;
    if (!writeStartSave(startNodeId)) return false;

    if (typeof window.continueSavedOrStart === 'function') {
      window.continueSavedOrStart();
      return true;
    }

    return false;
  }

  function startChapterFromTrigger(trigger) {
    return startChapterFromNode(getStartNodeId(trigger));
  }

  function restartCurrentChapter() {
    return startChapterFromNode(getRetryStartNodeId());
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

    // Exodus uses the legacy explicit image map in main.js because its image
    // filenames do not match ending IDs. Do not override that working mapping.
    if (chapter.nodePrefix === 'exodus_') return null;

    const filename = profile.image || `${profile.id}.png`;
    return `${chapter.endingArtBase}/${filename}`;
  }

  function applyHomeScriptureLayout(scripture) {
    scripture.style.position = 'absolute';
    scripture.style.left = 'auto';
    scripture.style.right = '86px';
    scripture.style.top = '138px';
    scripture.style.bottom = 'auto';
    scripture.style.width = '430px';
    scripture.style.minHeight = '0';
    scripture.style.padding = '14px 18px 13px';
    scripture.style.zIndex = '8';
    scripture.style.textAlign = 'left';
    scripture.style.pointerEvents = 'none';
    scripture.style.border = '1px solid rgba(196,154,85,.22)';
    scripture.style.background = 'linear-gradient(180deg, rgba(13, 12, 9, .58), rgba(4, 5, 6, .44))';
    scripture.style.boxShadow = '0 12px 28px rgba(0,0,0,.22), inset 0 0 18px rgba(0,0,0,.26)';

    const quote = scripture.querySelector('.quote');
    const reference = scripture.querySelector('.reference');

    [quote, reference].forEach((element) => {
      if (!element) return;
      element.style.position = 'static';
      element.style.left = 'auto';
      element.style.top = 'auto';
      element.style.width = 'auto';
      element.style.height = 'auto';
      element.style.margin = '0';
      element.style.textAlign = 'left';
    });

    if (quote) {
      quote.style.fontSize = '15px';
      quote.style.lineHeight = '1.55';
      quote.style.wordBreak = 'keep-all';
      quote.style.textShadow = '0 2px 8px rgba(0,0,0,.88)';
    }

    if (reference) {
      reference.style.marginTop = '7px';
      reference.style.fontSize = '13px';
      reference.style.letterSpacing = '.06em';
      reference.style.color = '#a98143';
    }
  }

  function updateHomeScripture(panelName = currentHomeScripturePanel) {
    const home = document.getElementById('home-screen');
    const scripture = home?.querySelector?.('.scripture');
    if (!home || !scripture) return;

    const partPanelName = HOME_PART_SCRIPTURES[panelName] ? panelName : currentHomeScripturePanel;
    const scriptureData = HOME_PART_SCRIPTURES[partPanelName] || HOME_PART_SCRIPTURES.story;

    currentHomeScripturePanel = partPanelName;
    home.dataset.scripturePanel = partPanelName;

    const quote = scripture.querySelector('.quote');
    const reference = scripture.querySelector('.reference');
    if (quote) quote.textContent = scriptureData.quote;
    if (reference) reference.textContent = scriptureData.reference;

    applyHomeScriptureLayout(scripture);
  }

  function bindHomeScriptureRuntime() {
    updateHomeScripture('story');

    document.addEventListener('click', (event) => {
      const panelTrigger = event.target?.closest?.('[data-panel]');
      if (panelTrigger) {
        window.setTimeout(() => updateHomeScripture(panelTrigger.dataset.panel), 0);
        return;
      }

      const homeTrigger = event.target?.closest?.('[data-go="home"]');
      if (homeTrigger) window.setTimeout(() => updateHomeScripture('story'), 0);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const panelTrigger = event.target?.closest?.('[data-panel]');
      if (panelTrigger) {
        window.setTimeout(() => updateHomeScripture(panelTrigger.dataset.panel), 0);
        return;
      }

      const homeTrigger = event.target?.closest?.('[data-go="home"]');
      if (homeTrigger) window.setTimeout(() => updateHomeScripture('story'), 0);
    });

    window.BIBLE_ROGUE_HOME_SCRIPTURES = HOME_PART_SCRIPTURES;
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

  function handleChapterStartEvent(event) {
    const retryTrigger = event.target?.closest?.('#ending-screen [data-go="new-play"]');
    if (retryTrigger && restartCurrentChapter()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const trigger = event.target?.closest?.('[data-go="new-play"][data-start-node], [data-go="new-play"][data-chapter]');
    if (!trigger) return;

    const startNodeId = getStartNodeId(trigger);
    if (!startNodeId) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    startChapterFromTrigger(trigger);
  }

  function bindChapterStartCards() {
    document.addEventListener('click', handleChapterStartEvent, true);

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      handleChapterStartEvent(event);
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
    Promise.all(AUTO_ACTIVATED_CHAPTERS.map((chapterKey) => ensureChapterPatches(chapterKey)))
      .catch((error) => console.warn('Optional chapter patches could not be loaded.', error))
      .finally(() => {
        patchSceneArt();
        patchEndingArt();

        AUTO_ACTIVATED_CHAPTERS.forEach((chapterKey) => {
          if (isChapterReady(chapterKey)) {
            makeChapterCardPlayable(chapterKey);
          } else {
            console.warn(`${chapterKey} chapter was not activated because required data is missing.`);
          }
        });

        bindChapterStartCards();
        bindHomeScriptureRuntime();
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
