const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;
let currentNodeId = window.START_NODE_ID || 'exodus_01_slave_day';
let currentEndingId = null;
let selectedChoiceIndex = 0;

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

function getCurrentScene() {
  if (window.STORY_NODES && currentNodeId) return window.STORY_NODES[currentNodeId] || null;
  if (Array.isArray(window.PLAY_SCENES) && window.PLAY_SCENES.length > 0) return window.PLAY_SCENES[0];
  return null;
}

function getSelectedChoice() {
  const scene = getCurrentScene();
  return scene?.choices?.[selectedChoiceIndex] || scene?.choices?.[0] || null;
}

function hasNextScene() {
  const choice = getSelectedChoice();
  return Boolean(choice?.next || choice?.ending || choice?.endingResolver);
}

function clampStateValue(value) {
  return Math.max(0, Math.min(99, value));
}

function resetGame() {
  Object.keys(gameState).forEach((key) => {
    gameState[key] = 0;
  });
  currentNodeId = window.START_NODE_ID || 'exodus_01_slave_day';
  currentEndingId = null;
  selectedChoiceIndex = 0;
  renderScene(getCurrentScene());
  renderGameState();
}

function applyChoiceEffects(choice) {
  if (!choice || !choice.effects) return;

  Object.entries(choice.effects).forEach(([key, amount]) => {
    if (!(key in gameState)) return;
    gameState[key] = clampStateValue(gameState[key] + amount);
  });

  renderGameState();
}

function renderGameState() {
  const play = document.getElementById('play-screen');
  if (!play) return;

  const trust = play.querySelector('.play-stats span:nth-child(1)');
  const community = play.querySelector('.play-stats span:nth-child(2)');
  const discernment = play.querySelector('.play-stats span:nth-child(3)');

  setText(trust, `신뢰 ${gameState.trust}`);
  setText(community, `공동체 ${gameState.community}`);
  setText(discernment, `분별 ${gameState.discernment}`);

  Object.entries(gameState).forEach(([key, value]) => {
    play.dataset[key] = String(value);
  });
}

function resolveExodusEnding() {
  if (gameState.trust >= 4 && gameState.community >= 3 && gameState.memory >= 3) return 'true_exodus_deliverance';
  if (gameState.fear >= 4 || gameState.scatter >= 3 || gameState.delay >= 3) return 'wounded_exodus_witness';
  return 'faithful_exodus_witness';
}

function getEndingProfile() {
  if (currentEndingId && window.STORY_ENDINGS?.[currentEndingId]) {
    return window.STORY_ENDINGS[currentEndingId];
  }

  if (window.STORY_ENDINGS?.true_exodus_deliverance) {
    return window.STORY_ENDINGS.true_exodus_deliverance;
  }

  return {
    id: 'fallback_ending',
    type: 'true',
    title: '해방의 목격자',
    bannerLeft: '당신은 열린 길을 바라보았습니다',
    bannerRight: '믿음의 발걸음이 증언이 되었습니다',
    description: ['당신은 두려움의 소리보다 하나님이 여신 길을 바라보았습니다.', '그 걸음은 바다를 건넌 백성의 기억 속에 해방의 증언으로 남았습니다.'],
    grade: '신뢰의 목격자',
    scripture: '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라',
    reference: '출애굽기 14:14'
  };
}

function renderEnding() {
  const ending = document.getElementById('ending-screen');
  if (!ending) return;

  const profile = getEndingProfile();

  setText(ending.querySelector('.ending-panel h2'), profile.title);

  const bannerSpans = ending.querySelectorAll('.ending-banner span');
  setText(bannerSpans[0], profile.bannerLeft || '당신의 선택이 기록되었습니다');
  setText(bannerSpans[1], profile.bannerRight || '여정의 결과가 남았습니다');

  const desc = ending.querySelector('.ending-desc');
  if (desc) {
    desc.innerHTML = '';
    (profile.description || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      desc.appendChild(p);
    });
  }

  const summaryCards = ending.querySelectorAll('.ending-summary article');
  const values = [
    ['✦', '신뢰의 걸음', String(gameState.trust)],
    ['◇', '공동체 돌봄', String(gameState.community)],
    ['◎', '기억과 분별', String(gameState.memory + gameState.discernment)],
    ['♕', '최종 평가', profile.grade || profile.title]
  ];

  summaryCards.forEach((card, index) => {
    const [icon, label, value] = values[index];
    setText(card.querySelector('i'), icon);
    setText(card.querySelector('span'), label);
    setText(card.querySelector('strong'), value);
  });

  setText(ending.querySelector('.ending-scripture p'), profile.scripture || '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라');
  setText(ending.querySelector('.ending-scripture span'), profile.reference || '출애굽기 14:14');

  Object.entries(gameState).forEach(([key, value]) => {
    ending.dataset[key] = String(value);
  });
  ending.dataset.endingId = profile.id || '';
  ending.dataset.endingType = profile.type || '';
  ending.dataset.result = profile.grade || profile.title || '';
}

function resizeGame() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  canvas.style.transform = `scale(${scale})`;
}

function showScreen(screenName) {
  const target = document.getElementById(`${screenName}-screen`);
  if (!target) return;

  if (screenName === 'play') {
    renderScene(getCurrentScene());
  }

  if (screenName === 'ending') {
    renderEnding();
  }

  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('screen-active', screen === target);
  });

  document.body.dataset.screen = screenName;
}

function showHomePanel(panelName) {
  const home = document.getElementById('home-screen');
  if (!home) return;

  const selectedPanel = panelName || 'story';
  home.dataset.homePanel = selectedPanel;

  home.querySelectorAll('[data-home-panel]').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.homePanel === selectedPanel);
  });

  home.querySelectorAll('[data-panel]').forEach((button) => {
    button.classList.toggle('active', button.dataset.panel === selectedPanel);
  });
}

function setText(el, text) {
  if (el) el.textContent = text;
}

function normalizeHomeLanguage() {
  const home = document.getElementById('home-screen');
  if (!home) return;

  const companionButton = home.querySelector('[data-panel="witnesses"] .menu-text');
  setText(companionButton?.querySelector('strong'), '동행자');
  setText(companionButton?.querySelector('em'), '함께 걷는 사람들');

  const progressText = home.querySelector('.progress-text');
  if (progressText) progressText.innerHTML = '동행의 빛<br />12%';
}

function cleanupLegacyPlayPanel() {
  const play = document.getElementById('play-screen');
  if (!play) return;

  const rightPanel = play.querySelector('.right-panel');
  if (!rightPanel) return;

  rightPanel.querySelector('h3:not(.log-title)')?.remove();
  rightPanel.querySelector('.witness-list')?.remove();
  rightPanel.querySelector('.log-title')?.remove();
  rightPanel.querySelector('.story-log')?.remove();
  rightPanel.setAttribute('aria-label', '동행자 대화');
}

function ensureCompanionDialoguePanel() {
  const play = document.getElementById('play-screen');
  if (!play) return null;

  const rightPanel = play.querySelector('.right-panel');
  if (!rightPanel) return null;

  let dialoguePanel = rightPanel.querySelector('.companion-dialogue');
  if (!dialoguePanel) {
    dialoguePanel = document.createElement('section');
    dialoguePanel.className = 'companion-dialogue';
    dialoguePanel.setAttribute('aria-label', '동행자 대화');
    rightPanel.appendChild(dialoguePanel);
  }

  return dialoguePanel;
}

function renderCompanionDialogue(choice) {
  const dialoguePanel = ensureCompanionDialoguePanel();
  if (!dialoguePanel || !choice) return;

  dialoguePanel.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = '동행자';
  dialoguePanel.appendChild(title);

  (choice.companions || []).forEach((line) => {
    const item = document.createElement('article');
    item.className = 'companion-line';

    const portrait = document.createElement('div');
    portrait.className = `companion-portrait portrait ${line.portrait}`;

    const body = document.createElement('div');
    body.className = 'companion-line-body';

    const name = document.createElement('strong');
    name.textContent = line.name;

    const role = document.createElement('em');
    role.textContent = line.role;

    const text = document.createElement('p');
    text.textContent = line.text;

    body.append(name, role, text);
    item.append(portrait, body);
    dialoguePanel.appendChild(item);
  });
}

function renderScene(scene) {
  const play = document.getElementById('play-screen');
  if (!play || !scene) return;

  selectedChoiceIndex = 0;

  setText(play.querySelector('.play-brand-text span'), scene.chapter);
  setText(play.querySelector('.scene-plaque strong'), scene.location);
  setText(play.querySelector('.scene-plaque span'), scene.bible);
  setText(play.querySelector('.narrative-panel h2'), scene.title);
  setText(play.querySelector('.day-panel'), scene.day || '여정의 날');
  setText(play.querySelector('.location-panel'), scene.place || '여정의 길');

  const copy = play.querySelector('.narrative-copy');
  if (copy) {
    copy.innerHTML = '';
    scene.copy.forEach((paragraph, index) => {
      if (index === scene.copy.length - 1) {
        const hr = document.createElement('hr');
        copy.appendChild(hr);
      }

      const p = document.createElement('p');
      p.innerHTML = paragraph.replace(/\n/g, '<br />');
      copy.appendChild(p);
    });

    const prompt = document.createElement('strong');
    prompt.textContent = scene.prompt;
    copy.appendChild(prompt);
  }

  const choiceList = play.querySelector('.choice-list');
  if (choiceList) {
    choiceList.innerHTML = '';
    scene.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.className = `choice${index === 0 ? ' active' : ''}`;
      button.type = 'button';
      button.dataset.choiceIndex = String(index);
      button.title = formatEffects(choice.effects);

      const icon = document.createElement('span');
      icon.textContent = choice.icon;
      button.appendChild(icon);

      const number = document.createTextNode(` ${index + 1}  `);
      button.appendChild(number);
      button.append(choice.text);

      if (choice.marker) {
        const marker = document.createElement('em');
        marker.textContent = choice.marker;
        button.appendChild(marker);
      }

      choiceList.appendChild(button);
    });
  }

  const progress = play.querySelector('.story-progress strong');
  if (progress) progress.textContent = `${scene.progress.current} / ${scene.progress.total}`;

  const nextButton = play.querySelector('.next-story');
  if (nextButton) {
    nextButton.dataset.go = 'next-play-scene';
    nextButton.innerHTML = '다음 이야기 <span>›</span>';
  }

  renderGameState();
  setPlayChoice(0);
}

function formatEffects(effects = {}) {
  return Object.entries(effects)
    .filter(([key, amount]) => key in STATE_LABELS && amount !== 0)
    .map(([key, amount]) => `${STATE_LABELS[key]} ${amount > 0 ? '+' : ''}${amount}`)
    .join(' / ');
}

function setPlayChoice(choiceIndex) {
  const play = document.getElementById('play-screen');
  const scene = getCurrentScene();
  if (!play || !scene) return;

  const choice = scene.choices[choiceIndex] || scene.choices[0];
  selectedChoiceIndex = choiceIndex;
  play.dataset.choice = choice.key;
  play.dataset.choiceEffects = formatEffects(choice.effects);
  renderCompanionDialogue(choice);
}

function goToNextPlayScene() {
  const selectedChoice = getSelectedChoice();
  applyChoiceEffects(selectedChoice);

  if (selectedChoice?.endingResolver === 'exodus') {
    currentEndingId = resolveExodusEnding();
    showScreen('ending');
    return;
  }

  if (selectedChoice?.ending) {
    currentEndingId = selectedChoice.ending;
    showScreen('ending');
    return;
  }

  if (selectedChoice?.next && window.STORY_NODES?.[selectedChoice.next]) {
    currentNodeId = selectedChoice.next;
    renderScene(getCurrentScene());
    showScreen('play');
    return;
  }

  currentEndingId = resolveExodusEnding();
  showScreen('ending');
}

function bindNavigation() {
  document.addEventListener('click', (event) => {
    const choice = event.target.closest('.choice');
    if (choice) {
      const index = Number(choice.dataset.choiceIndex || 0);
      document.querySelectorAll('.choice').forEach((item) => item.classList.remove('active'));
      choice.classList.add('active');
      setPlayChoice(index);
      return;
    }

    const panelTrigger = event.target.closest('[data-panel]');
    if (panelTrigger) {
      event.preventDefault();
      event.stopPropagation();
      showHomePanel(panelTrigger.dataset.panel);
      return;
    }

    const trigger = event.target.closest('[data-go]');
    if (!trigger) return;

    event.preventDefault();
    event.stopPropagation();

    if (trigger.dataset.go === 'next-play-scene') {
      goToNextPlayScene();
      return;
    }

    if (trigger.dataset.go === 'play') {
      resetGame();
      showScreen('play');
      return;
    }

    if (trigger.dataset.go === 'home') {
      resetGame();
      showScreen('home');
      return;
    }

    showScreen(trigger.dataset.go);
  });

  document.addEventListener('keydown', (event) => {
    const panelTrigger = event.target.closest('[data-panel]');
    if (panelTrigger && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      showHomePanel(panelTrigger.dataset.panel);
      return;
    }

    const trigger = event.target.closest('[data-go]');
    if (!trigger) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (trigger.dataset.go === 'next-play-scene') {
        goToNextPlayScene();
        return;
      }
      if (trigger.dataset.go === 'play') {
        resetGame();
        showScreen('play');
        return;
      }
      showScreen(trigger.dataset.go);
    }
  });
}

function initGame() {
  if (initialized) return;
  initialized = true;

  resizeGame();
  normalizeHomeLanguage();
  cleanupLegacyPlayPanel();
  bindNavigation();
  showHomePanel('story');
  renderScene(getCurrentScene());
  showScreen('home');
}

window.addEventListener('resize', resizeGame);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
