window.PLAY_SCENES = [
  {
    id: 'redsea_01',
    chapter: '장정 1 · 여정의 시작',
    location: '홍해 도하',
    bible: '출애굽기 14:21–31',
    title: '멈추지 않는 발걸음',
    day: '30일째 되는 날',
    place: '광야의 캠프',
    progress: { current: 3, total: 12 },
    copy: [
      '홍해의 바람이 차갑게, 저 멀리 파도와 함께 숨을 몰아쉽니다.',
      '당신은 그들과 함께 길을 걷고 있습니다.',
      '파도는 양옆으로 우뚝 솟아 벽이 되었고,\n바닥은 마른 땅처럼 드러났습니다.',
      '그러나 뒤돌아보니, 애굽의 병거들이\n이미 물결로 밀려와 따라옵니다.'
    ],
    prompt: '당신은 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'trust', icon: '☝', text: '하나님을 신뢰하며 계속 나아간다',
        effects: { trust: 1, fear: -1, memory: 1 },
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '길은 아직 열려 있습니다. 두려워 마십시오. 백성이 흔들릴수록 먼저 바라보아야 할 것은 뒤의 병거가 아니라 앞에 열린 길입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '이 선택을 기록해야 합니다. 믿음은 마음속에만 머무르지 않고, 결국 발걸음으로 남습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '앞쪽 물길은 흔들리지만 아직 닫히지 않았습니다. 지금은 멈추기보다 조심스럽게 계속 나아가야 합니다.' }
        ]
      },
      {
        key: 'care', icon: '🤝', text: '뒤처진 가족들을 돌아봐 돕는다',
        effects: { community: 1, time: 1, fear: -1 },
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '공동체는 가장 느린 사람을 버리지 않을 때 무너지지 않습니다. 속도보다 함께 건너는 것이 먼저입니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤쪽을 살피겠습니다. 아이들과 노인들을 먼저 붙잡아 주십시오. 두려움이 퍼지기 전에 손을 내밀어야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '오늘의 믿음은 서로를 놓지 않는 손으로 기록될 것입니다. 하나님이 여신 길은 혼자 달아나는 길이 아닙니다.' }
        ]
      },
      {
        key: 'encourage', icon: '⛑', text: '백성들을 격려하여 속도를 높인다',
        effects: { community: 1, fear: -1 },
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '모두 지쳐 있습니다. 그러나 아직 걸을 수 있습니다. 누군가 먼저 다시 일어서면 백성들의 걸음도 되살아날 것입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '목소리를 낮추지 마십시오. 두려움보다 약속을 크게 들려주어야 합니다. 지금 백성에게 필요한 것은 명령보다 확신입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '백성들이 다시 고개를 들기 시작했습니다. 말 한마디가 무너진 마음을 일으킬 때가 있습니다.' }
        ]
      },
      {
        key: 'pray', icon: '♟', text: '잠시 멈춰 기도하며 하나님의 인도를 구한다',
        effects: { trust: 1, discernment: 1, time: 1 },
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '멈춤이 도망은 아닙니다. 지금은 하나님께 귀를 기울일 때입니다. 다만 기도는 길을 포기하는 핑계가 아니라 다시 걷기 위한 숨입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '짧게 기도하고 다시 움직입시다. 공동체가 흔들리지 않게 하겠습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '뒤의 소리가 가까워집니다. 오래 머물 수는 없습니다. 기도한 뒤에는 열린 길을 따라 움직여야 합니다.' }
        ]
      },
      {
        key: 'discern', icon: '◉', text: '상황을 살피며 안전한 길을 찾는다', marker: '⚂',
        effects: { discernment: 1, clues: 1 },
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '바람의 방향이 바뀌고 있습니다. 왼쪽 물벽 아래는 피하는 편이 좋겠습니다. 중앙 길이 더 안정적입니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 사람들을 중앙 길로 모으겠습니다. 겁먹은 이들이 흩어지지 않게 해야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '분별은 두려움이 아니라, 하나님이 여신 길을 자세히 보는 일입니다. 믿음은 눈을 감는 것이 아니라 무엇을 볼지 선택하는 것입니다.' }
        ]
      }
    ]
  },
  {
    id: 'redsea_02',
    chapter: '장정 1 · 여정의 시작',
    location: '홍해 도하',
    bible: '출애굽기 14:26–29',
    title: '뒤돌아오는 물소리',
    day: '30일째 되는 밤',
    place: '바다 한가운데',
    progress: { current: 4, total: 12 },
    copy: [
      '백성들의 발걸음이 점점 빨라집니다. 어둠 사이로 아이들의 울음과 숨소리가 섞입니다.',
      '모세의 손이 바다를 향해 들려 있고, 물벽은 아직 양옆에서 떨고 있습니다.',
      '그러나 뒤편에서 병거 바퀴가 진흙에 박히는 소리가 들립니다.\n애굽의 군대가 혼란에 빠졌습니다.',
      '지금 이 순간, 백성은 두려움과 해방 사이의 마지막 길을 지나고 있습니다.'
    ],
    prompt: '당신은 무엇을 먼저 보시겠습니까?',
    choices: [
      {
        key: 'keep_center', icon: '◇', text: '백성들을 중앙 길로 모아 계속 걷게 한다',
        effects: { community: 1, fear: -1 },
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '흩어지면 두려움이 커집니다. 모두가 같은 길 위에 있다는 사실을 보게 해야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 가장자리로 밀려난 사람들을 중앙으로 이끌겠습니다. 물벽 가까이는 위험합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '해방은 혼자 빠져나가는 일이 아니라 함께 길을 통과하는 사건으로 남을 것입니다.' }
        ]
      },
      {
        key: 'listen_wheels', icon: '◎', text: '뒤편의 병거 소리를 살피며 위험을 판단한다',
        effects: { discernment: 1, fear: 1, clues: 1 },
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '바퀴 소리가 고르지 않습니다. 그들의 길은 흔들리고 있습니다. 그러나 방심하면 안 됩니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '뒤를 확인하되 오래 머물지는 마십시오. 공포는 보는 순간 더 빨리 번집니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '위험을 아는 것과 위험에 붙들리는 것은 다릅니다. 판단한 뒤에는 다시 걸어야 합니다.' }
        ]
      },
      {
        key: 'comfort_children', icon: '🤝', text: '울고 있는 아이들과 가족들을 안심시킨다',
        effects: { community: 1, fear: -1, time: 1 },
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '아이들의 울음도 이 밤의 기록입니다. 하나님은 강한 자의 걸음만 기억하지 않으십니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '짧은 말로 충분합니다. “함께 간다.” 그 한 문장이 사람들을 다시 걷게 할 수 있습니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤를 막겠습니다. 당신은 사람들의 마음이 무너지지 않게 붙잡아 주십시오.' }
        ]
      },
      {
        key: 'remember_command', icon: '▤', text: '모세의 명령과 하나님의 약속을 다시 떠올린다',
        effects: { memory: 1, trust: 1, fear: -1 },
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기억은 지금의 두려움을 과거의 약속과 연결합니다. 그래서 기억하는 사람은 쉽게 무너지지 않습니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '백성에게 약속을 다시 들려주십시오. 길은 물이 아니라 말씀에 의해 열렸습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '말씀이 방향이 될 때, 어둠 속에서도 발을 둘 곳이 보입니다.' }
        ]
      },
      {
        key: 'move_quietly', icon: '☾', text: '불필요한 소란을 줄이고 조용히 이동한다', marker: '⚂',
        effects: { discernment: 1, community: 1, clues: 1 },
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '좋은 판단입니다. 소란이 줄어들면 앞쪽의 물소리와 길의 흔들림을 더 잘 들을 수 있습니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 사람들에게 신호를 보내겠습니다. 뛰기보다 질서를 지키는 편이 안전합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '침묵도 믿음의 방식이 될 수 있습니다. 모든 신뢰가 큰 소리로만 나타나는 것은 아닙니다.' }
        ]
      }
    ]
  }
];
