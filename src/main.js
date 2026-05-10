const BASE_WIDTH = 1672;
const BASE_HEIGHT = 941;

let initialized = false;

const PLAY_CHOICE_REACTIONS = [
  {
    key: 'trust',
    lines: [
      {
        name: '엘리야벳',
        role: '인도자',
        portrait: 'p1',
        text: '길은 아직 열려 있습니다. 두려워 마십시오. 백성이 흔들릴수록 먼저 바라보아야 할 것은 뒤의 병거가 아니라 앞에 열린 길입니다.'
      },
      {
        name: '미라',
        role: '기록자',
        portrait: 'p2',
        text: '이 선택을 기록해야 합니다. 믿음은 마음속에만 머무르지 않고, 결국 발걸음으로 남습니다.'
      },
      {
        name: '아사르',
        role: '탐색자',
        portrait: 'p4',
        text: '앞쪽 물길은 흔들리지만 아직 닫히지 않았습니다. 지금은 멈추기보다 조심스럽게 계속 나아가야 합니다.'
      }
    ]
  },
  {
    key: 'care',
    lines: [
      {
        name: '엘리야벳',
        role: '인도자',
        portrait: 'p1',
        text: '공동체는 가장 느린 사람을 버리지 않을 때 무너지지 않습니다. 속도보다 함께 건너는 것이 먼저입니다.'
      },
      {
        name: '요나단',
        role: '보호자',
        portrait: 'p3',
        text: '제가 뒤쪽을 살피겠습니다. 아이들과 노인들을 먼저 붙잡아 주십시오. 두려움이 퍼지기 전에 손을 내밀어야 합니다.'
      },
      {
        name: '미라',
        role: '기록자',
        portrait: 'p2',
        text: '오늘의 믿음은 서로를 놓지 않는 손으로 기록될 것입니다. 하나님이 여신 길은 혼자 달아나는 길이 아닙니다.'
      }
    ]
  },
  {
    key: 'encourage',
    lines: [
      {
        name: '요나단',
        role: '보호자',
        portrait: 'p3',
        text: '모두 지쳐 있습니다. 그러나 아직 걸을 수 있습니다. 누군가 먼저 다시 일어서면 백성들의 걸음도 되살아날 것입니다.'
      },
      {
        name: '엘리야벳',
        role: '인도자',
        portrait: 'p1',
        text: '목소리를 낮추지 마십시오. 두려움보다 약속을 크게 들려주어야 합니다. 지금 백성에게 필요한 것은 명령보다 확신입니다.'
      },
      {
        name: '미라',
        role: '기록자',
        portrait: 'p2',
        text: '백성들이 다시 고개를 들기 시작했습니다. 말 한마디가 무너진 마음을 일으킬 때가 있습니다.'
      }
    ]
  },
  {
    key: 'pray',
    lines: [
      {
        name: '미라',
        role: '기록자',
        portrait: 'p2',
        text: '멈춤이 도망은 아닙니다. 지금은 하나님께 귀를 기울일 때입니다. 다만 기도는 길을 포기하는 핑계가 아니라 다시 걷기 위한 숨입니다.'
      },
      {
        name: '엘리야벳',
        role: '인도자',
        portrait: 'p1',
        text: '짧게 기도하고 다시 움직입시다. 공동체가 흔들리지 않게 하겠습니다.'
      },
      {
        name: '아사르',
        role: '탐색자',
        portrait: 'p4',
        text: '뒤의 소리가 가까워집니다. 오래 머물 수는 없습니다. 기도한 뒤에는 열린 길을 따라 움직여야 합니다.'
      }
    ]
  },
  {
    key: 'discern',
    lines: [
      {
        name: '아사르',
        role: '탐색자',
        portrait: 'p4',
        text: '바람의 방향이 바뀌고 있습니다. 왼쪽 물벽 아래는 피하는 편이 좋겠습니다. 중앙 길이 더 안정적입니다.'
      },
      {
        name: '요나단',
        role: '보호자',
        portrait: 'p3',
        text: '제가 사람들을 중앙 길로 모으겠습니다. 겁먹은 이들이 흩어지지 않게 해야 합니다.'
      },
      {
        name: '미라',
        role: '기록자',
        portrait: 'p2',
        text: '분별은 두려움이 아니라, 하나님이 여신 길을 자세히 보는 일입니다. 믿음은 눈을 감는 것이 아니라 무엇을 볼지 선택하는 것입니다.'
      }
    ]
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

function renderCompanionDialogue(reaction) {
  const dialoguePanel = ensureCompanionDialoguePanel();
  if (!dialoguePanel || !reaction) return;

  dialoguePanel.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = '동행자';
  dialoguePanel.appendChild(title);

  reaction.lines.forEach((line) => {
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

function setPlayChoice(choiceIndex) {
  const play = document.getElementById('play-screen');
  if (!play) return;

  const reaction = PLAY_CHOICE_REACTIONS[choiceIndex] || PLAY_CHOICE_REACTIONS[0];
  play.dataset.choice = reaction.key;
  renderCompanionDialogue(reaction);
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
  normalizeHomeLanguage();
  cleanupLegacyPlayPanel();
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
