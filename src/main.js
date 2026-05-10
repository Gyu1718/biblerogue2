const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;

const PLAY_CHOICE_REACTIONS = [
  {
    key: 'trust',
    log: '당신은 하나님을 신뢰하고, 전진합니다.',
    dialogue: '동행자의 말\n\n엘리야벳: 길은 아직 열려 있습니다. 두려워 마십시오.\n미라: 이 선택을 기록해야 합니다. 믿음은 발걸음으로 남습니다.\n아사르: 앞쪽 물길은 흔들리지만 아직 닫히지 않았습니다.'
  },
  {
    key: 'care',
    log: '당신은 뒤처진 가족들을 돌아보며 함께 걷습니다.',
    dialogue: '동행자의 말\n\n엘리야벳: 공동체는 가장 느린 사람을 버리지 않을 때 무너지지 않습니다.\n요나단: 제가 뒤쪽을 살피겠습니다. 아이들과 노인들을 먼저 붙잡아 주십시오.\n미라: 오늘의 믿음은 서로를 놓지 않는 손으로 기록될 것입니다.'
  },
  {
    key: 'encourage',
    log: '당신은 백성들을 격려하여 걸음을 다시 세웁니다.',
    dialogue: '동행자의 말\n\n요나단: 모두 지쳐 있습니다. 그러나 아직 걸을 수 있습니다.\n엘리야벳: 목소리를 낮추지 마십시오. 두려움보다 약속을 크게 들려주어야 합니다.\n미라: 백성들이 다시 고개를 들기 시작했습니다.'
  },
  {
    key: 'pray',
    log: '당신은 잠시 멈춰 기도하며 하나님의 인도를 구합니다.',
    dialogue: '동행자의 말\n\n미라: 멈춤이 도망은 아닙니다. 지금은 하나님께 귀를 기울일 때입니다.\n엘리야벳: 짧게 기도하고 다시 움직입시다. 공동체가 흔들리지 않게 하겠습니다.\n아사르: 뒤의 소리가 가까워집니다. 오래 머물 수는 없습니다.'
  },
  {
    key: 'discern',
    log: '당신은 상황을 살피며 안전한 길을 찾습니다.',
    dialogue: '동행자의 말\n\n아사르: 바람의 방향이 바뀌고 있습니다. 왼쪽 물벽 아래는 피하는 편이 좋겠습니다.\n요나단: 제가 사람들을 중앙 길로 모으겠습니다.\n미라: 분별은 두려움이 아니라, 하나님이 여신 길을 자세히 보는 일입니다.'
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

  const rightPanel = play.querySelector('.right-panel');
  if (rightPanel) {
    rightPanel.setAttribute('data-dialogue', reaction.dialogue);
  }

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
