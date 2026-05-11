const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

const START_NODE_ID = window.START_NODE_ID || 'exodus_01_slave_day';
const PLAY_ART_BASE = 'assets/images/story/exodus/play_left_520x650';
const ENDING_ART_BASE = 'assets/images/story/exodus/original_16x9';

const SCENE_ART_BY_NODE_ID = {
  exodus_01_slave_day: `${PLAY_ART_BASE}/exodus_01_slave_labor.png`,
  exodus_02_whisper: `${PLAY_ART_BASE}/exodus_02_moses_rumor_night.png`,
  exodus_03_pharaoh: `${PLAY_ART_BASE}/exodus_01_slave_labor.png`,
  exodus_04_plague_begin: `${PLAY_ART_BASE}/exodus_03_first_plague_blood_river.png`,
  exodus_05_set_apart: `${PLAY_ART_BASE}/exodus_03_first_plague_blood_river.png`,
  exodus_06_darkness: `${PLAY_ART_BASE}/exodus_02_moses_rumor_night.png`,
  exodus_07_passover: `${PLAY_ART_BASE}/exodus_04_passover_marked_door.png`,
  exodus_08_departure: `${PLAY_ART_BASE}/exodus_05_departure_from_egypt.png`,
  exodus_09_wilderness_edge: `${PLAY_ART_BASE}/exodus_06_egyptian_pursuit.png`,
  exodus_10_redsea: `${PLAY_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
  exodus_10b_care_branch: `${PLAY_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
  exodus_10c_discern_branch: `${PLAY_ART_BASE}/exodus_08_sea_parted_night.png`,
  exodus_11_crossing: `${PLAY_ART_BASE}/exodus_09_crossing_the_sea.png`,
  exodus_12_deliverance: `${PLAY_ART_BASE}/exodus_10_deliverance_dawn.png`
};

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

const ENDING_ART_BY_ID = {
  true_exodus_deliverance: `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`,
  faithful_exodus_witness: `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`,
  wounded_exodus_witness: `${ENDING_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
  bad_bricks_forever: `${ENDING_ART_BASE}/exodus_01_slave_labor.png`,
  bad_unmarked_door: `${ENDING_ART_BASE}/exodus_04_passover_marked_door.png`,
  bad_stayed_in_egypt: `${ENDING_ART_BASE}/exodus_05_departure_from_egypt.png`,
  bad_return_to_egypt: `${ENDING_ART_BASE}/exodus_06_egyptian_pursuit.png`,
  bad_scattered_people: `${ENDING_ART_BASE}/exodus_07_trapped_at_the_sea.png`,
  bad_closed_sea: `${ENDING_ART_BASE}/exodus_08_sea_parted_night.png`
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

const STATE_LABELS = {
  trust: '신뢰',
  fear: '두려움',
  community: '공동체',
  discernment: '분별',
  memory: '기억',
  time: '시간',
  clues: '단서',
  delay: '지체',
  scatter: '흩어짐'
};

const gameState = {
  trust: 0,
  fear: 0,
  community: 0,
  discernment: 0,
  memory: 0,
  time: 0,
  clues: 0,
  delay: 0,
  scatter: 0
};

let initialized = false;
let currentNodeId = START_NODE_ID;
let currentEndingId = null;
let selectedChoiceIndex = null;

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setText(element, text) {
  if (element) element.textContent = text ?? '';
}

function clampStateValue(value) {
  return Math.max(0, Math.min(99, Number(value) || 0));
}

function resizeGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  canvas.style.transform = `scale(${scale})`;
}

function getCurrentNode() {
  return window.STORY_NODES?.[currentNodeId] || window.STORY_NODES?.[START_NODE_ID] || null;
}

function getSelectedChoice() {
  const node = getCurrentNode();
  if (!node || selectedChoiceIndex === null) return null;
  return node?.choices?.[selectedChoiceIndex] || null;
}

function resetGame() {
  Object.keys(gameState).forEach((key) => {
    gameState[key] = 0;
  });
  currentNodeId = START_NODE_ID;
  currentEndingId = null;
  selectedChoiceIndex = null;
}

function applyChoiceEffects(choice) {
  Object.entries(choice?.effects || {}).forEach(([key, amount]) => {
    if (key in gameState) gameState[key] = clampStateValue(gameState[key] + amount);
  });
}

function formatEffects(effects = {}) {
  return Object.entries(effects)
    .filter(([key, amount]) => key in STATE_LABELS && amount !== 0)
    .map(([key, amount]) => `${STATE_LABELS[key]} ${amount > 0 ? '+' : ''}${amount}`)
    .join(' / ');
}

function renderGameState() {
  const play = document.getElementById('play-screen');
  if (!play) return;

  setText($('.play-stats span:nth-child(1)', play), `신뢰 ${gameState.trust}`);
  setText($('.play-stats span:nth-child(2)', play), `공동체 ${gameState.community}`);
  setText($('.play-stats span:nth-child(3)', play), `분별 ${gameState.discernment}`);

  Object.entries(gameState).forEach(([key, value]) => {
    play.dataset[key] = String(value);
  });
}

function updateSceneArt(node) {
  const sceneArt = $('.scene-art');
  if (!sceneArt || !node) return;

  const explicitImage = node.image ? `${PLAY_ART_BASE}/${node.image}` : null;
  const artPath = explicitImage || SCENE_ART_BY_NODE_ID[node.id] || SCENE_ART_BY_TITLE[node.title] || `${PLAY_ART_BASE}/exodus_01_slave_labor.png`;
  sceneArt.style.backgroundImage = `url('${artPath}')`;
  sceneArt.dataset.sceneId = node.id || '';
  sceneArt.dataset.sceneTitle = node.title || '';
  sceneArt.dataset.artPath = artPath;
}

function updateEndingArt(profile) {
  const ending = document.getElementById('ending-screen');
  const endingBg = $('.ending-bg', ending || document);
  if (!ending || !endingBg || !profile) return;

  const title = profile.title || '';
  const explicitImage = profile.image ? `${ENDING_ART_BASE}/${profile.image}` : null;
  const artPath = explicitImage || ENDING_ART_BY_ID[profile.id] || ENDING_ART_BY_TITLE[title] || `${ENDING_ART_BASE}/exodus_10_deliverance_dawn.png`;
  const isTrue = profile.type === 'true' || profile.id === 'true_exodus_deliverance' || profile.id === 'faithful_exodus_witness';
  const goldOpacity = isTrue ? '.34' : '.18';
  const warmOpacity = isTrue ? '.10' : '.06';

  endingBg.style.backgroundImage = `linear-gradient(180deg, rgba(255,225,150,.04), rgba(0,0,0,.38)), radial-gradient(circle at 50% 2%, rgba(255,229,151,${goldOpacity}) 0 8%, rgba(255,198,83,${warmOpacity}) 23%, transparent 43%), url('${artPath}')`;
  ending.dataset.endingTone = isTrue ? 'true' : 'bad';
  ending.dataset.artPath = artPath;
}

function showScreen(screenName) {
  const target = document.getElementById(`${screenName}-screen`);
  if (!target) return;

  $all('.screen').forEach((screen) => {
    screen.classList.toggle('screen-active', screen === target);
  });

  document.body.dataset.screen = screenName;
}

function showHomePanel(panelName = 'story') {
  const home = document.getElementById('home-screen');
  if (!home) return;

  home.dataset.homePanel = panelName;

  $all('.home-panel', home).forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.homePanel === panelName);
  });

  $all('[data-panel]', home).forEach((button) => {
    button.classList.toggle('active', button.dataset.panel === panelName);
  });
}

function renderChoiceEffectSummary(choice, parent) {
  if (!choice || !parent) return;

  const effectsText = formatEffects(choice.effects || {});
  const summary = document.createElement('div');
  summary.className = 'choice-effect-summary';

  const label = document.createElement('strong');
  label.textContent = '선택의 흔적';
  summary.appendChild(label);

  const value = document.createElement('span');
  value.textContent = effectsText || '기록 변화 없음';
  summary.appendChild(value);

  parent.appendChild(summary);
}

function renderCompanionDialogue(choice) {
  const rightPanel = $('.right-panel');
  if (!rightPanel) return;

  rightPanel.innerHTML = '';

  const dialoguePanel = document.createElement('section');
  dialoguePanel.className = 'companion-dialogue';
  dialoguePanel.setAttribute('aria-label', '동행자 대화');

  const title = document.createElement('h3');
  title.textContent = '동행자';
  dialoguePanel.appendChild(title);

  if (!choice) {
    const placeholder = document.createElement('article');
    placeholder.className = 'companion-placeholder';

    const placeholderTitle = document.createElement('strong');
    placeholderTitle.textContent = '아직 선택하지 않았습니다';

    const placeholderText = document.createElement('p');
    placeholderText.textContent = '선택지를 고르면 동행자의 반응과 선택의 흔적이 이곳에 나타납니다.';

    placeholder.append(placeholderTitle, placeholderText);
    dialoguePanel.appendChild(placeholder);
    rightPanel.appendChild(dialoguePanel);
    return;
  }

  (choice.companions || []).forEach((line) => {
    const item = document.createElement('article');
    item.className = 'companion-line';

    const portrait = document.createElement('div');
    portrait.className = `companion-portrait portrait ${line.portrait || 'p1'}`;

    const body = document.createElement('div');
    body.className = 'companion-line-body';

    const name = document.createElement('strong');
    name.textContent = line.name || '';

    const role = document.createElement('em');
    role.textContent = line.role || '';

    const text = document.createElement('p');
    text.textContent = line.text || '';

    body.append(name, role, text);
    item.append(portrait, body);
    dialoguePanel.appendChild(item);
  });

  renderChoiceEffectSummary(choice, dialoguePanel);
  rightPanel.appendChild(dialoguePanel);
}

function updateNextButton() {
  const play = document.getElementById('play-screen');
  const nextButton = $('.next-story', play || document);
  const hasChoice = Boolean(getSelectedChoice());

  if (!play || !nextButton) return;

  nextButton.disabled = !hasChoice;
  nextButton.classList.toggle('disabled', !hasChoice);
  nextButton.setAttribute('aria-disabled', String(!hasChoice));
  nextButton.dataset.ready = hasChoice ? 'true' : 'false';
  nextButton.innerHTML = hasChoice ? '이 선택으로 나아가기 <span>›</span>' : '선택지를 고르세요 <span>›</span>';
}

function setPlayChoice(choiceIndex) {
  const node = getCurrentNode();
  const play = document.getElementById('play-screen');
  if (!node || !play) return;

  const requestedIndex = Number(choiceIndex);
  if (!Number.isInteger(requestedIndex) || requestedIndex < 0 || requestedIndex >= (node.choices || []).length) return;

  selectedChoiceIndex = requestedIndex;

  $all('.choice', play).forEach((button, index) => {
    button.classList.toggle('active', index === selectedChoiceIndex);
  });

  const choice = getSelectedChoice();
  play.dataset.choice = choice?.key || '';
  play.dataset.choiceEffects = formatEffects(choice?.effects || {});
  renderCompanionDialogue(choice);
  updateNextButton();
}

function renderNode(node) {
  const play = document.getElementById('play-screen');
  if (!play || !node) return;

  selectedChoiceIndex = null;
  play.dataset.choice = '';
  play.dataset.choiceEffects = '';

  setText($('.play-brand-text span', play), node.chapter);
  setText($('.scene-plaque strong', play), node.location);
  setText($('.scene-plaque span', play), node.bible);
  setText($('.narrative-panel h2', play), node.title);
  setText($('.day-panel', play), node.day || '여정의 날');
  setText($('.location-panel', play), node.place || '여정의 길');
  setText($('.story-progress strong', play), `${node.progress?.current || 1} / ${node.progress?.total || 12}`);

  const copy = $('.narrative-copy', play);
  if (copy) {
    copy.innerHTML = '';
    (node.copy || []).forEach((paragraph, index, array) => {
      if (index === array.length - 1) copy.appendChild(document.createElement('hr'));

      const p = document.createElement('p');
      p.textContent = paragraph;
      copy.appendChild(p);
    });

    const prompt = document.createElement('strong');
    prompt.textContent = node.prompt || '';
    copy.appendChild(prompt);
  }

  const choiceList = $('.choice-list', play);
  if (choiceList) {
    choiceList.innerHTML = '';
    (node.choices || []).forEach((choice, index) => {
      const button = document.createElement('button');
      button.className = 'choice';
      button.type = 'button';
      button.dataset.choiceIndex = String(index);
      button.title = formatEffects(choice.effects || {});

      const icon = document.createElement('span');
      icon.textContent = choice.icon || '◇';
      button.appendChild(icon);
      button.append(document.createTextNode(` ${index + 1}  ${choice.text || ''}`));

      if (choice.marker) {
        const marker = document.createElement('em');
        marker.textContent = choice.marker;
        button.appendChild(marker);
      }

      choiceList.appendChild(button);
    });
  }

  updateSceneArt(node);
  renderGameState();
  renderCompanionDialogue(null);
  updateNextButton();
}

function resolveExodusEnding() {
  if (gameState.trust >= 4 && gameState.community >= 3 && gameState.memory >= 3) return 'true_exodus_deliverance';
  if (gameState.fear >= 4 || gameState.scatter >= 3 || gameState.delay >= 3) return 'wounded_exodus_witness';
  return 'faithful_exodus_witness';
}

function getEndingProfile() {
  if (currentEndingId && window.STORY_ENDINGS?.[currentEndingId]) return window.STORY_ENDINGS[currentEndingId];
  return window.STORY_ENDINGS?.true_exodus_deliverance || {
    id: 'fallback_ending',
    type: 'true',
    title: '해방의 목격자',
    bannerLeft: '당신은 열린 길을 바라보았습니다',
    bannerRight: '믿음의 발걸음이 증언이 되었습니다',
    description: ['당신은 두려움의 소리보다 하나님이 여신 길을 바라보았습니다.'],
    grade: '신뢰의 목격자',
    scripture: '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라',
    reference: '출애굽기 14:14'
  };
}

function renderEnding() {
  const ending = document.getElementById('ending-screen');
  if (!ending) return;

  const profile = getEndingProfile();

  setText($('.ending-panel h2', ending), profile.title);

  const bannerSpans = $all('.ending-banner span', ending);
  setText(bannerSpans[0], profile.bannerLeft || '당신의 선택이 기록되었습니다');
  setText(bannerSpans[1], profile.bannerRight || '여정의 결과가 남았습니다');

  const desc = $('.ending-desc', ending);
  if (desc) {
    desc.innerHTML = '';
    (profile.description || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      desc.appendChild(p);
    });
  }

  const summaryCards = $all('.ending-summary article', ending);
  const values = [
    ['✦', '신뢰의 걸음', String(gameState.trust)],
    ['◇', '공동체 돌봄', String(gameState.community)],
    ['◎', '기억과 분별', String(gameState.memory + gameState.discernment)],
    ['♕', '최종 평가', profile.grade || profile.title]
  ];

  summaryCards.forEach((card, index) => {
    const [icon, label, value] = values[index] || [];
    setText($('i', card), icon);
    setText($('span', card), label);
    setText($('strong', card), value);
  });

  setText($('.ending-scripture p', ending), profile.scripture || '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라');
  setText($('.ending-scripture span', ending), profile.reference || '출애굽기 14:14');

  Object.entries(gameState).forEach(([key, value]) => {
    ending.dataset[key] = String(value);
  });
  ending.dataset.endingId = profile.id || '';
  ending.dataset.endingType = profile.type || '';
  ending.dataset.result = profile.grade || profile.title || '';

  updateEndingArt(profile);
}

function startPlay() {
  resetGame();
  renderNode(getCurrentNode());
  showScreen('play');
}

function goHome() {
  resetGame();
  renderNode(getCurrentNode());
  showHomePanel('story');
  showScreen('home');
}

function goToNextPlayScene() {
  const selectedChoice = getSelectedChoice();
  if (!selectedChoice) {
    updateNextButton();
    return;
  }

  applyChoiceEffects(selectedChoice);

  if (selectedChoice.endingResolver === 'exodus') {
    currentEndingId = resolveExodusEnding();
    renderEnding();
    showScreen('ending');
    return;
  }

  if (selectedChoice.ending) {
    currentEndingId = selectedChoice.ending;
    renderEnding();
    showScreen('ending');
    return;
  }

  if (selectedChoice.next && window.STORY_NODES?.[selectedChoice.next]) {
    currentNodeId = selectedChoice.next;
    renderNode(getCurrentNode());
    showScreen('play');
    return;
  }

  currentEndingId = resolveExodusEnding();
  renderEnding();
  showScreen('ending');
}

function bindNavigation() {
  document.addEventListener('click', (event) => {
    const choice = event.target.closest('.choice');
    if (choice) {
      event.preventDefault();
      setPlayChoice(Number(choice.dataset.choiceIndex || 0));
      return;
    }

    const trigger = event.target.closest('[data-go]');
    if (trigger) {
      event.preventDefault();
      const destination = trigger.dataset.go;

      if (destination === 'play') {
        startPlay();
        return;
      }

      if (destination === 'next-play-scene') {
        goToNextPlayScene();
        return;
      }

      if (destination === 'home') {
        goHome();
        return;
      }

      showScreen(destination);
      return;
    }

    const panelTrigger = event.target.closest('[data-panel]');
    if (panelTrigger) {
      event.preventDefault();
      showHomePanel(panelTrigger.dataset.panel);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const trigger = event.target.closest('[data-go]');
    if (trigger) {
      event.preventDefault();
      if (trigger.dataset.go === 'play') startPlay();
      else if (trigger.dataset.go === 'next-play-scene') goToNextPlayScene();
      else if (trigger.dataset.go === 'home') goHome();
      else showScreen(trigger.dataset.go);
      return;
    }

    const panelTrigger = event.target.closest('[data-panel]');
    if (panelTrigger) {
      event.preventDefault();
      showHomePanel(panelTrigger.dataset.panel);
    }
  });
}

function initGame() {
  if (initialized) return;
  initialized = true;

  resizeGame();
  bindNavigation();
  showHomePanel('story');
  renderNode(getCurrentNode());
  showScreen('home');
}

window.addEventListener('resize', resizeGame);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
