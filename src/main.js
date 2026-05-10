const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;
let currentSceneIndex = 0;

function getCurrentScene() {
  if (!Array.isArray(window.PLAY_SCENES) || window.PLAY_SCENES.length === 0) return null;
  return window.PLAY_SCENES[currentSceneIndex] || window.PLAY_SCENES[0];
}

function hasNextScene() {
  return Array.isArray(window.PLAY_SCENES) && currentSceneIndex < window.PLAY_SCENES.length - 1;
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

  setPlayChoice(0);
}

function setPlayChoice(choiceIndex) {
  const play = document.getElementById('play-screen');
  const scene = getCurrentScene();
  if (!play || !scene) return;

  const choice = scene.choices[choiceIndex] || scene.choices[0];
  play.dataset.choice = choice.key;
  renderCompanionDialogue(choice);
}

function goToNextPlayScene() {
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
