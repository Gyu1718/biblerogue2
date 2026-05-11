// Post-cleanup adjustments after the narrative redesign.
// Keeps temporary legacy controls from reappearing while the branching story structure is being rebuilt.

(function () {
  const PLAY_ART_BASE = 'assets/images/story/exodus/play_left_520x650';
  const ENDING_ART_BASE = 'assets/images/story/exodus/original_16x9';

  const SCENE_ART_BY_TITLE = {
    '끝나지 않는 벽돌': `${PLAY_ART_BASE}/exodus_01_slave_labor.png`,
    '돌아온 이름': `${PLAY_ART_BASE}/exodus_02_moses_rumor_night.png`,
    '더 무거워진 짐': `${PLAY_ART_BASE}/exodus_01_slave_labor.png`,
    '흔들리는 애굽': `${PLAY_ART_BASE}/exodus_03_first_plague_blood_river.png`,
    '구별된 땅': `${PLAY_ART_BASE}/exodus_03_first_plague_blood_river.png`,
    '손으로 만질 듯한 어둠': `${PLAY_ART_BASE}/exodus_02_moses_rumor_night.png`,
    '표시된 문': `${PLAY_ART_BASE}/exodus_04_passover_marked_door.png`,
    '급히 떠나는 사람들': `${PLAY_ART_BASE}/exodus_05_departure_from_egypt.png`,
    '먼지 속의 소리': `${PLAY_ART_BASE}/exodus_06_egyptian_pursuit.png`,
    '바다 앞에 선 밤': `${PLAY_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
    '뒤처진 사람들': `${PLAY_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
    '흔들리는 물벽': `${PLAY_ART_BASE}/exodus_08_sea_parted_night.png`,
    '바다 가운데 난 길': `${PLAY_ART_BASE}/exodus_09_crossing_the_sea.png`,
    '해방의 새벽': `${PLAY_ART_BASE}/exodus_10_deliverance_dawn.png`
  };

  const ENDING_ART_BY_TITLE = {
    '해방의 목격자': `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`,
    '믿음의 길을 걸은 자': `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`,
    '흔들린 목격자': `${ENDING_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
    '끝나지 않는 벽돌': `${ENDING_ART_BASE}/exodus_01_slave_labor.png`,
    '표시 없는 문': `${ENDING_ART_BASE}/exodus_04_passover_marked_door.png`,
    '남겨진 밤': `${ENDING_ART_BASE}/exodus_05_departure_from_egypt.png`,
    '돌아선 발걸음': `${ENDING_ART_BASE}/exodus_06_egyptian_pursuit.png`,
    '흩어진 공동체': `${ENDING_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
    '닫혀버린 길': `${ENDING_ART_BASE}/exodus_08_sea_parted_night.png`
  };

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

  function patchSceneArt() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const title = play.querySelector('.narrative-panel h2')?.textContent?.trim();
    const sceneArt = play.querySelector('.scene-art');
    if (!title || !sceneArt) return;

    const artPath = SCENE_ART_BY_TITLE[title] || `${PLAY_ART_BASE}/exodus_01_slave_labor.png`;
    sceneArt.style.backgroundImage = `url('${artPath}')`;
    sceneArt.dataset.sceneTitle = title;
    sceneArt.dataset.artPath = artPath;
  }

  function patchEndingArt() {
    const ending = document.getElementById('ending-screen');
    if (!ending) return;

    const title = ending.querySelector('.ending-panel h2')?.textContent?.trim() || '';
    const endingBg = ending.querySelector('.ending-bg');
    if (!endingBg) return;

    const artPath = ENDING_ART_BY_TITLE[title] || `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`;
    const isTrue = title === '해방의 목격자' || title === '믿음의 길을 걸은 자';
    const goldOpacity = isTrue ? '.34' : '.18';
    const warmOpacity = isTrue ? '.10' : '.06';

    endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,${goldOpacity}) 0 8%, rgba(255,198,83,${warmOpacity}) 23%, transparent 43%), url('${artPath}')`;
    ending.dataset.endingTone = isTrue ? 'true' : 'bad';
    ending.dataset.artPath = artPath;
  }

  function patchRetryButtons() {
    const retry = document.querySelector('.ending-retry');
    const home = document.querySelector('.ending-home');

    retry?.addEventListener('click', () => {
      window.location.reload();
    });

    home?.addEventListener('click', () => {
      window.location.reload();
    });
  }

  function observePlayChanges() {
    const play = document.getElementById('play-screen');
    if (!play) return;

    const observer = new MutationObserver(() => {
      patchLocationText();
      patchSceneArt();
    });
    observer.observe(play, { childList: true, subtree: true, characterData: true });
  }

  function observeEndingChanges() {
    const ending = document.getElementById('ending-screen');
    if (!ending) return;

    const observer = new MutationObserver(() => patchEndingArt());
    observer.observe(ending, { childList: true, subtree: true, characterData: true, attributes: true });
  }

  function initPostCleanup() {
    cleanHome();
    patchLocationText();
    patchSceneArt();
    patchEndingArt();
    patchRetryButtons();
    observePlayChanges();
    observeEndingChanges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostCleanup);
  } else {
    initPostCleanup();
  }
})();
