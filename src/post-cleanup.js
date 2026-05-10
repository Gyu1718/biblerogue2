// Post-cleanup adjustments after the narrative redesign.
// Keeps temporary legacy controls from reappearing while the branching story structure is being rebuilt.

(function () {
  const SCENE_ART_BY_TITLE = {
    '끝나지 않는 벽돌': 'assets/images/story/exodus/exodus_02_heavy_labor_city.png',
    '돌아온 이름': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '더 무거워진 짐': 'assets/images/story/exodus/exodus_02_heavy_labor_city.png',
    '흔들리는 애굽': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '구별된 땅': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '손으로 만질 듯한 어둠': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '표시된 문': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '급히 떠나는 사람들': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '먼지 속의 소리': 'assets/images/story/exodus/exodus_01_slave_city_egypt.png',
    '바다 앞에 선 밤': 'assets/images/story/exodus/exodus_11_redsea_crossing_scene.png',
    '뒤처진 사람들': 'assets/images/story/exodus/exodus_11_redsea_crossing_scene.png',
    '흔들리는 물벽': 'assets/images/story/exodus/exodus_11_redsea_crossing_scene.png',
    '바다 가운데 난 길': 'assets/images/story/exodus/exodus_11_redsea_crossing_scene.png',
    '해방의 새벽': 'assets/images/story/exodus/exodus_12_deliverance_scene.png'
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

    const artPath = SCENE_ART_BY_TITLE[title] || 'assets/images/story/exodus/exodus_01_slave_city_egypt.png';
    sceneArt.style.backgroundImage = `url('${artPath}')`;
    sceneArt.dataset.sceneTitle = title;
  }

  function patchEndingArt() {
    const ending = document.getElementById('ending-screen');
    if (!ending) return;

    const title = ending.querySelector('.ending-panel h2')?.textContent?.trim() || '';
    const endingBg = ending.querySelector('.ending-bg');
    if (!endingBg) return;

    const isBad = ['끝나지 않는 벽돌', '남겨진 밤', '돌아선 발걸음', '흩어진 공동체', '닫혀버린 길', '표시 없는 문'].includes(title);
    const isWounded = title.includes('흔들린');

    if (title === '해방의 목격자' || title === '믿음의 길을 걸은 자') {
      endingBg.style.backgroundImage = "linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,.34) 0 8%, rgba(255,198,83,.10) 23%, transparent 43%), url('assets/images/endings/exodus/ending_true_exodus_deliverance.png')";
      ending.dataset.endingTone = 'true';
      return;
    }

    if (isBad || isWounded) {
      let artPath = 'assets/images/endings/exodus/ending_bad_return_to_egypt_candidate.png';
      if (title === '끝나지 않는 벽돌' || title === '남겨진 밤' || title === '표시 없는 문') {
        artPath = 'assets/images/endings/exodus/ending_bad_bricks_forever_candidate.png';
      }
      if (title === '흩어진 공동체' || isWounded) {
        artPath = 'assets/images/endings/exodus/ending_bad_scattered_people_candidate.png';
      }
      endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,.20) 0 8%, rgba(255,198,83,.07) 23%, transparent 43%), url('${artPath}')`;
      ending.dataset.endingTone = 'bad';
    }
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
