const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;
let currentSceneIndex = 0;
let selectedChoiceIndex = 0;

const gameState = {
  trust: 0,
  fear: 0,
  community: 0,
  discernment: 0,
  memory: 0,
  time: 0,
  clues: 0
};

const STATE_LABELS = {
  trust: '신뢰',
  fear: '두려움',
  community: '공동체',
  discernment: '분별',
  memory: '기억',
  time: '시간',
  clues: '단서'
};

function getCurrentScene() {
  if (!Array.isArray(window.PLAY_SCENES) || window.PLAY_SCENES.length === 0) return null;
  return window.PLAY_SCENES[currentSceneIndex] || window.PLAY_SCENES[0];
}

function hasNextScene() {
  return Array.isArray(window.PLAY_SCENES) && currentSceneIndex < window.PLAY_SCENES.length - 1;
}

function clampStateValue(value) {
  return Math.max(0, Math.min(99, value));
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

  play.dataset.trust = String(gameState.trust);
  play.dataset.fear = String(gameState.fear);
  play.dataset.community = String(gameState.community);
  play.dataset.discernment = String(gameState.discernment);
  play.dataset.memory = String(gameState.memory);
  play.dataset.time = String(gameState.time);
  play.dataset.clues = String(gameState.clues);
}

function getEndingProfile() {
  const total = gameState.trust + gameState.community + gameState.discernment + gameState.memory + gameState.clues;
  const strengths = [
    ['trust', gameState.trust],
    ['community', gameState.community],
    ['discernment', gameState.discernment],
    ['memory', gameState.memory],
    ['clues', gameState.clues]
  ].sort((a, b) => b[1] - a[1]);

  const primary = strengths[0][0];

  if (gameState.fear >= 2 && gameState.trust <= 1) {
    return {
      title: '두려움을 건넌 자',
      bannerLeft: '당신은 떨리는 밤을 통과했습니다',
      bannerRight: '두려움 속에서도 길은 닫히지 않았습니다',
      description: ['당신은 흔들림을 숨기지 않은 채 바다 사이를 걸었습니다.', '완전한 담대함은 아니었지만, 멈추지 않는 걸음이 당신의 증언이 되었습니다.'],
      grade: '흔들린 목격자',
      score: Math.max(1, total)
    };
  }

  if (primary === 'community') {
    return {
      title: '공동체를 지킨 자',
      bannerLeft: '당신은 가장 느린 사람의 걸음을 기억했습니다',
      bannerRight: '함께 건너는 길을 선택했습니다',
      description: ['당신은 빠른 탈출보다 함께 걷는 일을 먼저 보았습니다.', '그 선택은 해방을 개인의 생존이 아니라 공동체의 증언으로 남겼습니다.'],
      grade: '동행의 목격자',
      score: total
    };
  }

  if (primary === 'discernment' || primary === 'clues') {
    return {
      title: '길을 분별한 자',
      bannerLeft: '당신은 어둠 속에서 길의 흔들림을 살폈습니다',
      bannerRight: '두려움이 아니라 분별로 걸었습니다',
      description: ['당신은 무작정 달리지 않고, 하나님이 여신 길을 자세히 살폈습니다.', '그 분별은 백성이 위험을 피하고 앞으로 나아가게 하는 조용한 증언이 되었습니다.'],
      grade: '분별의 목격자',
      score: total
    };
  }

  if (primary === 'memory') {
    return {
      title: '기억의 기록자',
      bannerLeft: '당신은 사건의 의미를 붙잡았습니다',
      bannerRight: '오늘의 길을 내일의 증언으로 남겼습니다',
      description: ['당신은 바다 사이에서 일어난 일을 단순한 탈출로 보지 않았습니다.', '기억하고 기록하려는 마음은 공동체가 훗날 다시 믿음을 붙잡게 하는 씨앗이 되었습니다.'],
      grade: '기억의 목격자',
      score: total
    };
  }

  return {
    title: '해방의 목격자',
    bannerLeft: '당신은 열린 길을 바라보았습니다',
    bannerRight: '믿음의 발걸음이 증언이 되었습니다',
    description: ['당신은 두려움의 소리보다 하나님이 여신 길을 바라보았습니다.', '그 걸음은 바다를 건넌 백성의 기억 속에 해방의 증언으로 남았습니다.'],
    grade: '신뢰의 목격자',
    score: total
  };
}

function renderEnding() {
  const ending = document.getElementById('ending-screen');
  if (!ending) return;

  const profile = getEndingProfile();

  setText(ending.querySelector('.ending-panel h2'), profile.title);

  const bannerSpans = ending.querySelectorAll('.ending-banner span');
  setText(bannerSpans[0], profile.bannerLeft);
  setText(bannerSpans[1], profile.bannerRight);

  const desc = ending.querySelector('.ending-desc');
  if (desc) {
    desc.innerHTML = '';
    profile.description.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      desc.appendChild(p);
    });
  }

  const summaryCards = ending.querySelectorAll('.ending-summary article');
  const values = [
    ['✦', '신뢰의 걸음', String(gameState.trust)],
    ['◇', '공동체 돌봄', String(gameState.community)],
    ['◎', '분별의 기록', String(gameState.discernment + gameState.clues)],
    ['♕', '최종 평가', profile.grade]
  ];

  summaryCards.forEach((card, index) => {
    const [icon, label, value] = values[index];
    setText(card.querySelector('i'), icon);
    setText(card.querySelector('span'), label);
    setText(card.querySelector('strong'), value);
  });

  const footer = ending.querySelector('.ending-scripture p');
  setText(footer, '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라');

  const reference = ending.querySelector('.ending-scripture span');
  setText(reference, '출애굽기 14:14');

  ending.dataset.trust = String(gameState.trust);
  ending.dataset.fear = String(gameState.fear);
  ending.dataset.community = String(gameState.community);
  ending.dataset.discernment = String(gameState.discernment);
  ending.dataset.memory = String(gameState.memory);
  ending.dataset.clues = String(gameState.clues);
  ending.dataset.result = profile.grade;
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

  const trainingButton = home.querySelector('[data-panel="training"] .menu-text');
  setText(trainingButton?.querySelector('strong'), '여정 준비');
  setText(trainingButton?.querySelector('em'), '선택과 분별');

  const progressText = home.querySelector('.progress-text');
  if (progressText) progressText.innerHTML = '동행의 빛<br />12%';

  const companionsPanel = home.querySelector('[data-home-panel="witnesses"]');
  if (companionsPanel) {
    companionsPanel.setAttribute('aria-label', '동행자');
    setText(companionsPanel.querySelector('header span'), '동행자');
    setText(companionsPanel.querySelector('header strong'), '함께 걷는 사람들');

    const cards = companionsPanel.querySelectorAll('article');
    const companionDescriptions = [
      ['인도자', '공동체의 방향을 살피고 흔들리는 백성을 세웁니다.'],
      ['기록자', '여정의 사건과 하나님의 일하심을 기억하고 해석합니다.'],
      ['보호자', '두려움 앞에서 약한 이들을 돌보고 안전을 지킵니다.'],
      ['탐색자', '어둠 속에서 길과 단서를 살피며 위험을 예고합니다.']
    ];

    cards.forEach((card, index) => {
      const [role, description] = companionDescriptions[index] || [];
      setText(card.querySelector('em'), role);
      setText(card.querySelector('p'), description);
    });
  }

  const achievementsPanel = home.querySelector('[data-home-panel="achievements"]');
  achievementsPanel?.querySelectorAll('p').forEach((item) => {
    item.innerHTML = item.innerHTML.replace('증인단의 기록', '동행자의 기록').replace('해방의 증인', '해방의 목격자');
  });

  const trainingPanel = home.querySelector('[data-home-panel="training"]');
  if (trainingPanel) {
    trainingPanel.setAttribute('aria-label', '여정 준비');
    setText(trainingPanel.querySelector('header span'), '여정 준비');
    setText(trainingPanel.querySelector('header strong'), '선택과 분별');

    const cards = trainingPanel.querySelectorAll('article');
    const trainingDescriptions = [
      ['신뢰', '두려움 속에서도 열린 길을 바라보는 힘입니다.'],
      ['기억', '사건의 의미와 하나님의 일하심을 붙잡습니다.'],
      ['돌봄', '뒤처지는 이들을 놓치지 않고 함께 걷게 합니다.'],
      ['분별', '위험한 길과 숨은 단서를 감지합니다.']
    ];

    cards.forEach((card, index) => {
      const [title, description] = trainingDescriptions[index] || [];
      setText(card.querySelector('b'), title);
      setText(card.querySelector('p'), description);
    });
  }
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

  choice.companions.forEach((line) => {
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
  setText(play.querySelector('.day-panel'), scene.day || '30일째 되는 날');
  setText(play.querySelector('.location-panel'), `⛺ ${scene.place || '광야의 캠프'}`);

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
    nextButton.dataset.go = hasNextScene() ? 'next-play-scene' : 'ending';
    nextButton.innerHTML = `${hasNextScene() ? '다음 이야기' : '엔딩 보기'} <span>›</span>`;
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
  const scene = getCurrentScene();
  const selectedChoice = scene?.choices[selectedChoiceIndex];
  applyChoiceEffects(selectedChoice);

  if (!hasNextScene()) {
    showScreen('ending');
    return;
  }

  currentSceneIndex += 1;
  renderScene(getCurrentScene());
  showScreen('play');
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
