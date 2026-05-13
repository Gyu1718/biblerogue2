// Chapter runtime adapter for BibleRogue2.
// Keeps chapter routing and chapter-specific image paths out of responsive.js.
// This adapter patches only the existing public runtime functions from main.js.

(function () {
  const SAVE_KEY = 'biblerogue2.save.v1';

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
    }
  };

  const WILDERNESS_ENDING_IDS = new Set([
    'true_wilderness_daily_trust',
    'faithful_wilderness_witness',
    'wounded_wilderness_witness',
    'bad_wilderness_bitter_murmur',
    'bad_rotten_manna',
    'bad_sabbath_rebellion',
    'bad_massah_meribah'
  ]);

  function getNode(nodeId) {
    return nodeId && window.STORY_NODES ? window.STORY_NODES[nodeId] : null;
  }

  function getChapterByNodeId(nodeId) {
    if (!nodeId) return null;
    return Object.values(CHAPTERS).find((chapter) => nodeId.startsWith(chapter.nodePrefix)) || null;
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

  function getWildernessNodeImage(node) {
    if (!node?.id?.startsWith('wilderness_')) return null;
    const chapter = CHAPTERS.wilderness;
    const filename = node.image || `${node.id}.png`;
    return `${chapter.playArtBase}/${filename}`;
  }

  function getWildernessEndingImage(profile) {
    if (!profile?.id || !WILDERNESS_ENDING_IDS.has(profile.id)) return null;
    const chapter = CHAPTERS.wilderness;
    const filename = profile.image || `${profile.id}.png`;
    return `${chapter.endingArtBase}/${filename}`;
  }

  function patchSceneArt() {
    if (typeof window.updateSceneArt !== 'function') return;
    const originalUpdateSceneArt = window.updateSceneArt;

    window.updateSceneArt = function patchedUpdateSceneArt(node) {
      originalUpdateSceneArt(node);

      const artPath = getWildernessNodeImage(node);
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

      const artPath = getWildernessEndingImage(profile);
      if (!artPath) return;

      const ending = document.getElementById('ending-screen');
      const endingBg = ending?.querySelector?.('.ending-bg');
      if (!ending || !endingBg) return;

      const isTrue = profile.type === 'true' || profile.id === 'true_wilderness_daily_trust' || profile.id === 'faithful_wilderness_witness';
      const goldOpacity = isTrue ? '.34' : '.18';
      const warmOpacity = isTrue ? '.10' : '.06';

      endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,${goldOpacity}) 0 8%, rgba(255,198,83,${warmOpacity}) 23%, transparent 43%), url('${artPath}')`;
      ending.dataset.artPath = artPath;
    };
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

  function initChapterRuntime() {
    patchSceneArt();
    patchEndingArt();
    bindChapterStartCards();
    window.BIBLE_ROGUE_CHAPTERS = CHAPTERS;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChapterRuntime);
  } else {
    initChapterRuntime();
  }
})();
