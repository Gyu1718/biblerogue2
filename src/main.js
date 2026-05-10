const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;

const PLAY_CHOICE_REACTIONS = [
  {
    key: 'trust',
    log: '당신은 하나님을 신뢰하고, 전진합니다.'
  },
  {
    key: 'care',
    log: '당신은 뒤처진 가족들을 돌아보며 함께 걷습니다.'
  },
  {
    key: 'encourage',
    log: '당신은 백성들을 격려하여 걸음을 다시 세웁니다.'
  },
  {
    key: 'pray',
    log: '당신은 잠시 멈춰 기도하며 하나님의 인도를 구합니다.'
  },
  {
    key: 'discern',
    log: '당신은 상황을 살피며 안전한 길을 찾습니다.'
  }
];

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

function setPlayChoice(choiceIndex) {
  const play = document.getElementById('play-screen');
  if (!play) return;

  const reaction = PLAY_CHOICE_REACTIONS[choiceIndex] || PLAY_CHOICE_REACTIONS[0];
  play.dataset.choice = reaction.key;

  const log = play.querySelector('.story-log');
  if (!log) return;

  const lastLog = log.querySelector('p.choice-result');
  if (lastLog) {
    lastLog.textContent = `◇ ${reaction.log}`;
    return;
  }

  const entry = document.createElement('p');
  entry.className = 'choice-result';
  entry.textContent = `◇ ${reaction.log}`;
  log.appendChild(entry);
}

function bindNavigation() {
  document.addEventListener('click', (event) => {
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
      showScreen(trigger.dataset.go);
    }
  });

  document.querySelectorAll('.choice').forEach((choice, index) => {
    choice.addEventListener('click', () => {
      document.querySelectorAll('.choice').forEach((item) => item.classList.remove('active'));
      choice.classList.add('active');
      setPlayChoice(index);
    });
  });
}

function initGame() {
  if (initialized) return;
  initialized = true;

  resizeGame();
  bindNavigation();
  showHomePanel('story');
  setPlayChoice(0);
  showScreen('home');
}

window.addEventListener('resize', resizeGame);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
