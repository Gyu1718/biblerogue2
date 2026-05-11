(function applyExodusStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  function hasChoice(node, key) {
    return Array.isArray(node?.choices) && node.choices.some((choice) => choice?.key === key);
  }

  function appendChoice(nodeId, choice) {
    const node = nodes[nodeId];
    if (!node || !Array.isArray(node.choices) || hasChoice(node, choice.key)) return;
    node.choices.push(choice);
  }

  function setNodeText(nodeId, patch) {
    const node = nodes[nodeId];
    if (!node) return;
    Object.assign(node, patch);
  }

  // 1. Departure: make the exodus itself a playable decision point.
  setNodeText('exodus_08_departure', {
    prompt: '당신은 떠남의 문턱에서 어떻게 움직이시겠습니까?'
  });

  appendChoice('exodus_08_departure', {
    key: 'help_children_depart',
    icon: '🤝',
    text: '아이들과 노인들이 먼저 대열에 설 수 있게 돕는다',
    effects: { community: 1, memory: 1 },
    next: 'exodus_09_wilderness_edge',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 떠남은 빠른 사람만의 일이 아닙니다. 가장 느린 사람도 함께 나가야 공동체가 살아납니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '해방의 밤은 발 빠른 사람들의 탈출이 아니라, 함께 떠난 이름들의 기록으로 남아야 합니다.' }
    ]
  });

  appendChoice('exodus_08_departure', {
    key: 'carry_unleavened_memory',
    icon: '▤',
    text: '부풀지 못한 빵을 보며 이 밤을 기억하자고 말한다',
    effects: { memory: 1, trust: 1 },
    next: 'exodus_09_wilderness_edge',
    companions: [
      { name: '미라', role: '기록자', portrait: 'p2', text: '좋습니다. 급히 떠난 흔적은 부끄러운 흔적이 아니라 구원의 속도를 기억하게 하는 표지입니다.' },
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '기억하는 백성은 광야에서도 자신들이 왜 떠났는지 잊지 않을 수 있습니다.' }
    ]
  });

  appendChoice('exodus_08_departure', {
    key: 'stay_for_safety',
    icon: '✕',
    text: '아직 위험하니 애굽에 남아 상황을 보자고 한다',
    effects: { fear: 2, delay: 2, trust: -1 },
    ending: 'bad_stayed_in_egypt',
    companions: [
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '안전을 확인하고 싶은 마음은 이해합니다. 그러나 오늘 밤의 문은 오래 열려 있지 않습니다.' },
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '부름이 왔을 때 남는 것은 신중함이 아니라 애굽을 마지막 피난처로 삼는 일일 수 있습니다.' }
    ]
  });

  // 2. Wilderness edge: connect departure to the pressure of pursuit.
  setNodeText('exodus_09_wilderness_edge', {
    prompt: '당신은 광야 끝에서 들려오는 병거 소리에 어떻게 반응하시겠습니까?'
  });

  appendChoice('exodus_09_wilderness_edge', {
    key: 'hold_line_forward',
    icon: '✦',
    text: '대열을 붙들고 앞으로 나아가자고 말한다',
    effects: { trust: 1, community: 1 },
    next: 'exodus_10_redsea',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '대열이 무너지지 않으면 아직 길을 볼 수 있습니다. 먼저 사람들의 발걸음을 붙들겠습니다.' },
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '두려움은 뒤를 보게 하지만, 부르심은 앞으로 걷게 합니다. 지금은 흩어지지 않는 것이 중요합니다.' }
    ]
  });

  appendChoice('exodus_09_wilderness_edge', {
    key: 'count_pursuers',
    icon: '◎',
    text: '추격대의 거리와 대열의 상태를 살핀다',
    effects: { discernment: 1 },
    next: 'exodus_10_redsea',
    companions: [
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '병거는 빠르지만 대열은 아직 무너지지 않았습니다. 두려움을 사실로 바꾸어 살피면 다음 판단이 선명해집니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '분별은 공포를 부정하는 일이 아닙니다. 공포가 전부가 아니라고 기록하는 일입니다.' }
    ]
  });

  appendChoice('exodus_09_wilderness_edge', {
    key: 'turn_back_to_egypt',
    icon: '✕',
    text: '차라리 돌아가 목숨을 구하자고 외친다',
    effects: { fear: 2, scatter: 1, trust: -1 },
    ending: 'bad_return_to_egypt',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '그 외침이 퍼지면 사람들의 발이 뒤로 돌아섭니다. 몸은 광야에 있어도 마음은 다시 애굽으로 묶일 수 있습니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '두려움이 해방의 기억보다 커지는 순간, 노예의 질서는 다시 안전처럼 보입니다.' }
    ]
  });

  // 3. Red Sea: make the sea-front crisis branch into care, discernment, or bad endings.
  setNodeText('exodus_10_redsea', {
    prompt: '당신은 바다와 병거 사이에서 무엇을 붙드시겠습니까?'
  });

  appendChoice('exodus_10_redsea', {
    key: 'stand_and_watch',
    icon: '✦',
    text: '두려워하지 말고 여호와의 구원을 보자고 말한다',
    effects: { trust: 1, memory: 1 },
    next: 'exodus_10c_discern_branch',
    companions: [
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '이 말은 현실을 부정하는 말이 아닙니다. 병거보다 크신 분을 바라보자는 고백입니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '오늘의 두려움은 기록될 것입니다. 그러나 두려움만 기록되게 하지는 맙시다.' }
    ]
  });

  appendChoice('exodus_10_redsea', {
    key: 'check_the_weak',
    icon: '🤝',
    text: '아이들과 노인들이 흩어지지 않았는지 먼저 살핀다',
    effects: { community: 1, discernment: 1 },
    next: 'exodus_10b_care_branch',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 위기의 순간에 가장 약한 사람이 어디 있는지 살피는 것이 공동체의 방향을 정합니다.' },
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '대열의 뒤쪽이 흔들립니다. 그곳을 붙들면 길이 열릴 때 함께 움직일 수 있습니다.' }
    ]
  });

  appendChoice('exodus_10_redsea', {
    key: 'run_ahead_alone',
    icon: '✕',
    text: '살 사람만 먼저 살자며 앞쪽으로 뛰쳐나간다',
    effects: { scatter: 2, fear: 1, community: -1 },
    ending: 'bad_scattered_people',
    companions: [
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '혼자 살겠다는 외침은 공동체를 찢습니다. 해방의 길은 서로를 버리는 길이 아닙니다.' },
      { name: '요나단', role: '보호자', portrait: 'p3', text: '사람들이 움직이기 시작했습니다. 두려움이 대열을 무너뜨리고 있습니다.' }
    ]
  });

  appendChoice('exodus_10_redsea', {
    key: 'wait_until_certain',
    icon: '☾',
    text: '물이 완전히 안정될 때까지 기다리자고 한다',
    effects: { delay: 2, fear: 1 },
    ending: 'bad_closed_sea',
    companions: [
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '확실함을 기다리는 동안 병거는 가까워집니다. 열린 길도 순종의 때를 놓치면 닫힐 수 있습니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '너무 늦은 확신은 믿음의 이름을 가질 수 없습니다. 이 밤은 기다림보다 걸음이 필요한 밤입니다.' }
    ]
  });

  appendChoice('exodus_10b_care_branch', {
    key: 'check_path_then_call',
    icon: '◎',
    text: '먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다',
    effects: { discernment: 1, delay: 1 },
    next: 'exodus_11_crossing',
    companions: [
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '길을 확인하는 것은 필요합니다. 그러나 확인이 길어지면 기다리는 사람들의 두려움도 커집니다.' },
      { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤처진 사람들을 붙들겠습니다. 너무 늦지 않게 신호를 보내야 합니다.' }
    ]
  });

  appendChoice('exodus_10c_discern_branch', {
    key: 'cross_in_pairs',
    icon: '🤝',
    text: '사람들을 둘씩 묶어 질서 있게 지나가게 한다',
    effects: { community: 1, discernment: 1 },
    next: 'exodus_11_crossing',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 서로를 놓치지 않게 하면 공포가 번지는 속도도 늦출 수 있습니다.' },
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '길은 좁고 물벽은 흔들립니다. 질서가 곧 속도입니다.' }
    ]
  });

  // 4. Crossing: make the final walk itself decisive before deliverance.
  setNodeText('exodus_11_crossing', {
    prompt: '당신은 바다 가운데 난 길에서 어떻게 걷겠습니까?'
  });

  appendChoice('exodus_11_crossing', {
    key: 'keep_walking_together',
    icon: '✦',
    text: '흔들려도 멈추지 말고 함께 걷자고 격려한다',
    effects: { trust: 1, community: 1 },
    next: 'exodus_12_deliverance',
    companions: [
      { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '믿음은 두려움이 사라진 뒤의 걸음이 아닙니다. 두려움 속에서도 멈추지 않는 걸음입니다.' },
      { name: '요나단', role: '보호자', portrait: 'p3', text: '대열이 다시 안정되고 있습니다. 서로의 손을 놓지 않으면 끝까지 건널 수 있습니다.' }
    ]
  });

  appendChoice('exodus_11_crossing', {
    key: 'name_the_memory',
    icon: '▤',
    text: '지금 보고 있는 일을 잊지 말자고 말한다',
    effects: { memory: 1, trust: 1 },
    next: 'exodus_12_deliverance',
    companions: [
      { name: '미라', role: '기록자', portrait: 'p2', text: '바다의 길은 지나가면 사라질 길입니다. 그래서 기억으로 붙들어야 합니다.' },
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '뒤에서는 병거가 흔들리고 앞에는 새벽빛이 보입니다. 이 순간을 잊지 마십시오.' }
    ]
  });

  appendChoice('exodus_11_crossing', {
    key: 'freeze_between_walls',
    icon: '☾',
    text: '물벽이 두려워 중간에서 걸음을 멈춘다',
    effects: { fear: 2, delay: 2 },
    ending: 'bad_closed_sea',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '멈추면 뒤따르는 사람들까지 막힙니다. 두려움은 이해되지만, 지금은 발을 떼야 합니다.' },
      { name: '미라', role: '기록자', portrait: 'p2', text: '길 한가운데서 멈춘 확신은 결국 길을 잃게 만들 수 있습니다.' }
    ]
  });

  // 5. Deliverance: three final responses, all resolved by accumulated choices.
  const deliverance = nodes.exodus_12_deliverance;
  if (deliverance && Array.isArray(deliverance.choices) && !hasChoice(deliverance, 'remember_for_children')) {
    deliverance.prompt = '당신은 해방의 새벽 앞에서 무엇을 남기시겠습니까?';
    deliverance.choices = [
      {
        key: 'remember_for_children',
        icon: '▤',
        text: '이 밤을 자녀들에게 전하겠다고 다짐한다',
        effects: { memory: 1 },
        endingResolver: 'exodus',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기억은 살아남은 사람의 의무입니다. 이 밤은 우리만의 감격으로 끝나지 않을 것입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '자녀들이 묻게 될 때, 우리는 이 길이 어떻게 열렸는지 말해야 합니다.' }
        ]
      },
      {
        key: 'remain_in_relief',
        icon: '☾',
        text: '살아남았다는 안도감에만 머문다',
        effects: { fear: -1 },
        endingResolver: 'exodus',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '숨을 돌리는 것도 필요합니다. 다만 안도감만 남으면 이 길의 의미를 잊을 수 있습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '병거 소리는 멀어졌지만, 광야의 길은 이제 시작입니다.' }
        ]
      },
      {
        key: 'remember_names',
        icon: '🤝',
        text: '함께 건넌 이들의 이름을 기억한다',
        effects: { community: 1, memory: 1 },
        endingResolver: 'exodus',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '이름 없는 사람들의 이름을 잊지 않겠습니다. 해방은 숫자가 아니라 얼굴들의 이야기입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '함께 건넌 사람들을 기억하는 공동체는 다시 노예의 방식으로 돌아가지 않습니다.' }
        ]
      }
    ];
  }
})();
