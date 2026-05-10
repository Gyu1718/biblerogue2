const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;

const PLAY_CHOICE_REACTIONS = [
  {
    key: 'trust',
    dialogue: '동행자의 반응\n\n엘리야벳\n길은 아직 열려 있습니다. 두려워 마십시오. 백성이 흔들릴수록 먼저 바라보아야 할 것은 뒤의 병거가 아니라 앞에 열린 길입니다.\n\n미라\n이 선택을 기록해야 합니다. 믿음은 마음속에만 머무르지 않고, 결국 발걸음으로 남습니다.\n\n아사르\n앞쪽 물길은 흔들리지만 아직 닫히지 않았습니다. 지금은 멈추기보다 조심스럽게 계속 나아가야 합니다.'
  },
  {
    key: 'care',
    dialogue: '동행자의 반응\n\n엘리야벳\n공동체는 가장 느린 사람을 버리지 않을 때 무너지지 않습니다. 속도보다 함께 건너는 것이 먼저입니다.\n\n요나단\n제가 뒤쪽을 살피겠습니다. 아이들과 노인들을 먼저 붙잡아 주십시오. 두려움이 퍼지기 전에 손을 내밀어야 합니다.\n\n미라\n오늘의 믿음은 서로를 놓지 않는 손으로 기록될 것입니다. 하나님이 여신 길은 혼자 달아나는 길이 아닙니다.'
  },
  {
    key: 'encourage',
    dialogue: '동행자의 반응\n\n요나단\n모두 지쳐 있습니다. 그러나 아직 걸을 수 있습니다. 누군가 먼저 다시 일어서면 백성들의 걸음도 되살아날 것입니다.\n\n엘리야벳\n목소리를 낮추지 마십시오. 두려움보다 약속을 크게 들려주어야 합니다. 지금 백성에게 필요한 것은 명령보다 확신입니다.\n\n미라\n백성들이 다시 고개를 들기 시작했습니다. 말 한마디가 무너진 마음을 일으킬 때가 있습니다.'
  },
  {
    key: 'pray',
    dialogue: '동행자의 반응\n\n미라\n멈춤이 도망은 아닙니다. 지금은 하나님께 귀를 기울일 때입니다. 다만 기도는 길을 포기하는 핑계가 아니라 다시 걷기 위한 숨입니다.\n\n엘리야벳\n짧게 기도하고 다시 움직입시다. 공동체가 흔들리지 않게 하겠습니다.\n\n아사르\n뒤의 소리가 가까워집니다. 오래 머물 수는 없습니다. 기도한 뒤에는 열린 길을 따라 움직여야 합니다.'
  },
  {
    key: 'discern',
    dialogue: '동행자의 반응\n\n아사르\n바람의 방향이 바뀌고 있습니다. 왼쪽 물벽 아래는 피하는 편이 좋겠습니다. 중앙 길이 더 안정적입니다.\n\n요나단\n제가 사람들을 중앙 길로 모으겠습니다. 겁먹은 이들이 흩어지지 않게 해야 합니다.\n\n미라\n분별은 두려움이 아니라, 하나님이 여신 길을 자세히 보는 일입니다. 믿음은 눈을 감는 것이 아니라 무엇을 볼지 선택하는 것입니다.'
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
