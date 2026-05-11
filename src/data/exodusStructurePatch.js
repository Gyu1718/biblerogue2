(function applyExodusStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  const TOTAL_PROGRESS = 21;

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

  function upsertNode(nodeId, node) {
    nodes[nodeId] = {
      ...(nodes[nodeId] || {}),
      ...node,
      id: nodeId
    };
  }

  function updateChoiceNext(nodeId, updates) {
    const node = nodes[nodeId];
    if (!node || !Array.isArray(node.choices)) return;
    node.choices = node.choices.map((choice) => {
      if (!choice || !updates[choice.key]) return choice;
      return { ...choice, ...updates[choice.key] };
    });
  }

  function setProgress(nodeId, current) {
    if (!nodes[nodeId]) return;
    nodes[nodeId].progress = { current, total: TOTAL_PROGRESS };
  }

  // Existing spine: keep the original chapter, but expand the middle into a real playable Exodus arc.
  setNodeText('exodus_01_slave_day', { progress: { current: 1, total: TOTAL_PROGRESS } });
  setNodeText('exodus_02_whisper', { progress: { current: 2, total: TOTAL_PROGRESS } });
  setNodeText('exodus_03_pharaoh', { progress: { current: 3, total: TOTAL_PROGRESS } });
  setNodeText('exodus_04_plague_begin', { progress: { current: 4, total: TOTAL_PROGRESS } });
  setNodeText('exodus_05_set_apart', { progress: { current: 6, total: TOTAL_PROGRESS } });
  setNodeText('exodus_06_darkness', { progress: { current: 8, total: TOTAL_PROGRESS } });
  setNodeText('exodus_07_passover', { progress: { current: 10, total: TOTAL_PROGRESS } });
  setNodeText('exodus_08_departure', { progress: { current: 12, total: TOTAL_PROGRESS } });
  setNodeText('exodus_09_wilderness_edge', { progress: { current: 13, total: TOTAL_PROGRESS } });
  setNodeText('exodus_10_redsea', { progress: { current: 15, total: TOTAL_PROGRESS } });
  setNodeText('exodus_10b_care_branch', { progress: { current: 17, total: TOTAL_PROGRESS } });
  setNodeText('exodus_10c_discern_branch', { progress: { current: 17, total: TOTAL_PROGRESS } });
  setNodeText('exodus_11_crossing', { progress: { current: 18, total: TOTAL_PROGRESS } });
  setNodeText('exodus_12_deliverance', { progress: { current: 21, total: TOTAL_PROGRESS } });

  // 1. Plagues: slow down the original jump from early signs to Goshen's distinction.
  updateChoiceNext('exodus_04_plague_begin', {
    record_signs: { next: 'exodus_04b_plague_witness' },
    discern_more: { next: 'exodus_04b_plague_witness' },
    spread_fear: { next: 'exodus_04b_plague_witness' }
  });

  upsertNode('exodus_04b_plague_witness', {
    chapter: '1장 · 출애굽',
    title: '무너지는 신들의 밤',
    location: '재앙을 목격한 고센의 길목',
    bible: '출애굽기 8:20–32; 9:8–12',
    day: '재앙이 깊어진 날',
    place: '고센과 애굽의 경계',
    progress: { current: 5, total: TOTAL_PROGRESS },
    image: 'exodus_03_first_plague_blood_river.png',
    copy: [
      '파리 떼가 애굽의 집과 뜰을 덮었다는 소식이 끊이지 않습니다. 이어 악성 종기의 고통이 사람과 짐승의 몸에 번졌다는 말도 들려옵니다.',
      '애굽이 의지하던 질서가 하나씩 흔들립니다. 강과 땅과 몸과 집이 더 이상 바로의 말에 복종하지 않는 것처럼 보입니다.',
      '그러나 고통을 보는 일은 쉬운 일이 아닙니다. 해방의 징조를 보면서도, 사람의 마음은 승리감과 두려움 사이에서 갈라집니다.'
    ],
    prompt: '당신은 재앙을 목격한 증인으로서 무엇을 붙드시겠습니까?',
    choices: [
      {
        key: 'read_the_signs_humbly', icon: '◎', text: '재앙을 승리감이 아니라 분별의 표지로 받아들인다',
        effects: { discernment: 1, memory: 1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '지금 무너지는 것은 단순한 생활의 질서가 아닙니다. 애굽이 절대적이라고 믿었던 기반이 흔들리고 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '분별 없이 기뻐하면 우리는 고통을 구경한 사람이 됩니다. 오늘의 표지는 겸손하게 기록되어야 합니다.' }
        ]
      },
      {
        key: 'comfort_frightened_neighbors', icon: '🤝', text: '두려워하는 이웃을 진정시키고 함께 기다린다',
        effects: { community: 1, fear: -1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '좋습니다. 하나님이 일하시는 때에도 사람은 무너질 수 있습니다. 누군가는 곁을 지켜야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '공포가 퍼지기 전에 모여 있게 하겠습니다. 서로의 목소리가 들리면 백성은 쉽게 흩어지지 않습니다.' }
        ]
      },
      {
        key: 'boast_over_egypt', icon: '⚠', text: '애굽이 무너진다며 들뜬 말을 퍼뜨린다',
        effects: { fear: 1, community: -1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '들뜬 말은 두려움만큼 위험합니다. 하나님이 하시는 일을 우리의 우월감으로 바꾸면 길을 잘못 보게 됩니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '증언은 조롱과 다릅니다. 애굽의 고통을 보며 우리 마음도 시험받고 있습니다.' }
        ]
      }
    ]
  });

  updateChoiceNext('exodus_05_set_apart', {
    remember_set_apart: { next: 'exodus_05b_hail_and_livestock' },
    still_doubt: { next: 'exodus_05b_hail_and_livestock' },
    mock_egyptians: { next: 'exodus_05b_hail_and_livestock' }
  });

  upsertNode('exodus_05b_hail_and_livestock', {
    chapter: '1장 · 출애굽',
    title: '우박과 죽은 가축의 들판',
    location: '애굽의 들판 너머',
    bible: '출애굽기 9:1–7; 9:13–35; 10:1–20',
    day: '하늘과 들이 흔들린 날',
    place: '고센 바깥 들판',
    progress: { current: 7, total: TOTAL_PROGRESS },
    image: 'exodus_03_first_plague_blood_river.png',
    copy: [
      '가축의 죽음이 애굽의 들판을 지나갔고, 이어 우박과 불이 하늘에서 쏟아졌다는 말이 들립니다. 남은 곡식마저 메뚜기 떼가 삼켜 버립니다.',
      '바로는 잠시 굽히는 듯하다가 다시 마음을 굳힙니다. 백성은 그 완고함이 한 왕의 성격이 아니라 한 제국의 방식임을 느끼기 시작합니다.',
      '재앙은 길어지고, 기다림도 길어집니다. 구원은 가까워 보이지만 아직 끝나지 않았습니다.'
    ],
    prompt: '당신은 길어진 재앙과 완고한 바로 앞에서 어떻게 반응하시겠습니까?',
    choices: [
      {
        key: 'keep_watch_with_patience', icon: '✦', text: '늦어 보여도 하나님이 일을 끝내실 때까지 기다린다',
        effects: { trust: 1, memory: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '기다림이 길어질수록 신뢰는 더 구체적인 선택이 됩니다. 끝을 하나님께 맡겨야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '바로의 완고함도 기록하겠습니다. 해방은 우연한 양보가 아니라 강한 손으로 이루어질 것입니다.' }
        ]
      },
      {
        key: 'organize_supplies', icon: '🤝', text: '혹시 모를 떠남을 위해 집집마다 필요한 것을 확인한다',
        effects: { community: 1, discernment: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 기다림은 멈춤이 아닙니다. 떠날 수 있도록 손과 발을 준비시키겠습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '곡식과 짐승과 길을 확인하겠습니다. 준비된 공동체는 갑작스러운 명령에도 덜 흔들립니다.' }
        ]
      },
      {
        key: 'complain_about_delay', icon: '☾', text: '왜 아직 끝나지 않느냐며 지친 말을 쏟아낸다',
        effects: { delay: 1, fear: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '지친 말은 이해됩니다. 그러나 지침이 기억을 지우면 우리는 처음의 약속까지 의심하게 됩니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '끝나지 않은 시간도 구원의 일부일 수 있습니다. 마음을 완전히 놓아버리지는 마십시오.' }
        ]
      }
    ]
  });

  // 2. Passover: split instruction from meal so obedience is not reduced to one click.
  updateChoiceNext('exodus_06_darkness', {
    prepare_family: { next: 'exodus_06b_passover_instruction' },
    seek_more_signs: { next: 'exodus_06b_passover_instruction' },
    spread_rumors: { next: 'exodus_06b_passover_instruction' }
  });

  upsertNode('exodus_06b_passover_instruction', {
    chapter: '1장 · 출애굽',
    title: '어린 양을 준비하라',
    location: '문 안쪽의 낮은 방',
    bible: '출애굽기 12:1–13',
    day: '유월절 준비의 날',
    place: '히브리인의 집',
    progress: { current: 9, total: TOTAL_PROGRESS },
    image: 'exodus_04_passover_marked_door.png',
    copy: [
      '명령은 추상적이지 않습니다. 어린 양을 고르고, 피를 문설주와 인방에 바르고, 허리에 띠를 띠고, 신을 신고, 지팡이를 손에 잡아야 합니다.',
      '누군가는 왜 이렇게 급히 먹어야 하느냐고 묻고, 누군가는 피가 정말 표지가 되겠느냐고 속삭입니다.',
      '이 밤의 순종은 마음속 결심만으로 끝나지 않습니다. 집과 문과 식탁과 몸의 자세가 모두 말씀 앞에 놓입니다.'
    ],
    prompt: '당신은 유월절 준비를 어떻게 이끌겠습니까?',
    choices: [
      {
        key: 'prepare_by_the_word', icon: '✦', text: '말씀의 순서를 하나씩 확인하며 집안을 준비시킨다',
        effects: { trust: 1, discernment: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '좋습니다. 오늘의 순종은 막연한 열심이 아니라 말씀의 순서를 따라가는 일입니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '문과 식탁과 짐을 확인하겠습니다. 준비가 분명할수록 밤의 혼란이 줄어듭니다.' }
        ]
      },
      {
        key: 'ask_and_obey', icon: '◎', text: '이유를 묻되, 준비를 늦추지 않고 따른다',
        effects: { discernment: 1, trust: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '질문은 순종을 막기 위한 것이 아니라 더 깊이 기억하기 위한 것이어야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '묻는 마음과 따르는 발이 함께 있으면 공동체는 성급함과 불신을 모두 피할 수 있습니다.' }
        ]
      },
      {
        key: 'delay_the_marking', icon: '☾', text: '사람들이 납득할 때까지 표지를 잠시 미루자고 한다',
        effects: { delay: 1, fear: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '설명은 필요하지만 시간이 많지 않습니다. 망설임이 길어지면 집집마다 불안이 커질 것입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '이해를 기다리다 순종의 때를 놓칠 수 있습니다. 오늘 밤은 마음만이 아니라 문도 준비되어야 합니다.' }
        ]
      }
    ]
  });

  updateChoiceNext('exodus_07_passover', {
    mark_door: { next: 'exodus_07b_passover_meal' },
    obey_without_understanding: { next: 'exodus_07b_passover_meal' },
    hesitate_mark: { next: 'exodus_07b_passover_meal' }
  });

  upsertNode('exodus_07b_passover_meal', {
    chapter: '1장 · 출애굽',
    title: '서서 먹는 식탁',
    location: '표시된 문 안의 식탁',
    bible: '출애굽기 12:8–14; 12:21–28',
    day: '유월절의 밤',
    place: '문 안쪽 식탁',
    progress: { current: 11, total: TOTAL_PROGRESS },
    image: 'exodus_04_passover_marked_door.png',
    copy: [
      '가족들은 무교병과 쓴 나물을 앞에 두고 서둘러 식탁에 둘러섭니다. 허리띠와 신과 지팡이가 식사의 분위기를 바꿉니다.',
      '밖에서는 낮고 긴 침묵이 흐르고, 안에서는 아이들이 왜 이 밤이 다른 밤과 다른지 묻습니다.',
      '이 식사는 배를 채우는 시간이 아니라 떠남을 몸에 새기는 시간입니다. 먹는 일조차 해방의 준비가 됩니다.'
    ],
    prompt: '당신은 표시된 문 안의 식탁에서 무엇을 하시겠습니까?',
    choices: [
      {
        key: 'teach_the_children', icon: '▤', text: '아이들에게 이 밤의 뜻을 짧게 설명한다',
        effects: { memory: 1, community: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '자녀들이 묻는 밤은 기억이 시작되는 밤입니다. 이 식탁은 훗날의 증언이 될 것입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '좋습니다. 떠남은 세대가 이어 받을 이야기와 함께 시작되어야 합니다.' }
        ]
      },
      {
        key: 'keep_ready_to_move', icon: '✦', text: '식사를 마치되 짐과 대열을 바로 움직일 수 있게 둔다',
        effects: { trust: 1, discernment: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '문 곁에 짐을 모아두겠습니다. 명령이 떨어지면 오래 머뭇거리지 않아야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '아이들과 노인들의 위치도 확인하겠습니다. 급한 떠남일수록 질서가 필요합니다.' }
        ]
      },
      {
        key: 'eat_in_silence_fear', icon: '☾', text: '두려움 때문에 아무 말 없이 식탁만 바라본다',
        effects: { fear: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '침묵이 필요한 때도 있지만, 공포가 식탁 전체를 붙들고 있습니다. 누군가는 숨을 돌리게 해야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '말하지 않은 기억은 쉽게 흐려집니다. 이 밤을 두려움만으로 남기지 마십시오.' }
        ]
      }
    ]
  });

  // 3. Departure and pursuit: keep existing bad endings, but insert panic before the sea-front crisis.
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

  setNodeText('exodus_09_wilderness_edge', {
    prompt: '당신은 광야 끝에서 들려오는 병거 소리에 어떻게 반응하시겠습니까?'
  });

  appendChoice('exodus_09_wilderness_edge', {
    key: 'hold_line_forward',
    icon: '✦',
    text: '대열을 붙들고 앞으로 나아가자고 말한다',
    effects: { trust: 1, community: 1 },
    next: 'exodus_09b_people_panic',
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
    next: 'exodus_09b_people_panic',
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

  updateChoiceNext('exodus_09_wilderness_edge', {
    hold_line_forward: { next: 'exodus_09b_people_panic' },
    count_pursuers: { next: 'exodus_09b_people_panic' }
  });

  upsertNode('exodus_09b_people_panic', {
    chapter: '1장 · 출애굽',
    title: '살아난 노예의 목소리',
    location: '바다로 밀려가는 대열',
    bible: '출애굽기 14:10–12',
    day: '추격의 밤',
    place: '바다 앞 광야',
    progress: { current: 14, total: TOTAL_PROGRESS },
    image: 'exodus_06_egyptian_pursuit.png',
    copy: [
      '뒤에서는 병거 바퀴 소리가 점점 커지고, 앞에서는 바다의 검은 면이 길을 막습니다. 백성의 숨이 한꺼번에 무너집니다.',
      '누군가 애굽에 매장지가 없어서 우리를 이곳으로 데려왔느냐고 외칩니다. 오래 눌려 있던 노예의 언어가 다시 살아납니다.',
      '두려움은 단순한 감정이 아닙니다. 두려움은 방금 떠난 애굽을 다시 그리워하게 만드는 기억의 왜곡입니다.'
    ],
    prompt: '당신은 공포에 흔들리는 백성 사이에서 어떻게 서겠습니까?',
    choices: [
      {
        key: 'answer_panic_with_memory', icon: '▤', text: '유월절의 밤과 열린 문을 기억하자고 말한다',
        effects: { memory: 1, trust: 1 }, next: 'exodus_10_redsea',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기억이 없으면 공포가 역사를 다시 씁니다. 방금 지나온 밤을 다시 말해야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '맞습니다. 하나님이 여기까지 이끄셨다면, 바다 앞에서도 이야기가 끝난 것은 아닙니다.' }
        ]
      },
      {
        key: 'steady_the_panic_line', icon: '🤝', text: '소리치는 사람들 사이에 서서 대열이 무너지지 않게 한다',
        effects: { community: 1, fear: -1 }, next: 'exodus_10_redsea',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 지금 필요한 것은 큰 말보다 무너지지 않는 대열입니다. 사람들의 사이를 막겠습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '앞쪽에 아직 공간이 있습니다. 질서가 유지되면 다음 신호를 받을 수 있습니다.' }
        ]
      },
      {
        key: 'join_the_complaint', icon: '☾', text: '차라리 애굽에 남았어야 했다는 말에 휩쓸린다',
        effects: { fear: 2, trust: -1, scatter: 1 }, ending: 'bad_return_to_egypt',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '그 말은 단순한 불평이 아닙니다. 해방의 기억을 애굽의 안전으로 바꾸는 말입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '공포가 공동체의 입이 되면 모두가 뒤를 향하게 됩니다. 지금 그 방향은 너무 위험합니다.' }
        ]
      }
    ]
  });

  // 4. Red Sea: put the pillar between panic and crossing, then rejoin through existing branches.
  setNodeText('exodus_10_redsea', {
    prompt: '당신은 바다와 병거 사이에서 무엇을 붙드시겠습니까?'
  });

  appendChoice('exodus_10_redsea', {
    key: 'stand_and_watch',
    icon: '✦',
    text: '두려워하지 말고 여호와의 구원을 보자고 말한다',
    effects: { trust: 1, memory: 1 },
    next: 'exodus_10d_pillar_between',
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
    next: 'exodus_10d_pillar_between',
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

  updateChoiceNext('exodus_10_redsea', {
    stand_and_watch: { next: 'exodus_10d_pillar_between' },
    check_the_weak: { next: 'exodus_10d_pillar_between' }
  });

  upsertNode('exodus_10d_pillar_between', {
    chapter: '1장 · 출애굽',
    title: '사이에 선 구름 기둥',
    location: '이스라엘과 애굽 사이',
    bible: '출애굽기 14:19–20',
    day: '바다 앞의 밤',
    place: '진영 사이의 어둠과 빛',
    progress: { current: 16, total: TOTAL_PROGRESS },
    image: 'exodus_08_sea_parted_night.png',
    copy: [
      '하나님의 사자가 움직이고, 구름 기둥이 뒤로 옮겨갑니다. 기둥은 애굽과 이스라엘 사이에 서서 한쪽에는 어둠을, 한쪽에는 밤을 밝힙니다.',
      '백성은 처음으로 추격대와 자신들 사이에 선 보호의 장벽을 봅니다. 아직 바다는 완전히 건너지 않았지만, 하나님은 이미 사이에 서 계십니다.',
      '이 장면은 사람들을 조용하게 만듭니다. 두려움이 사라진 것은 아니지만, 두려움만이 전부는 아니게 됩니다.'
    ],
    prompt: '당신은 구름 기둥이 사이에 선 밤에 무엇을 하시겠습니까?',
    choices: [
      {
        key: 'guard_the_rear', icon: '🤝', text: '뒤쪽 대열을 붙들며 약한 사람들이 길을 놓치지 않게 한다',
        effects: { community: 1, trust: 1 }, next: 'exodus_10b_care_branch',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 하나님이 뒤를 막으셨다면 우리는 서로의 뒤를 돌보아야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '보호받은 공동체는 다시 누군가를 보호하는 공동체가 되어야 합니다.' }
        ]
      },
      {
        key: 'read_the_pillar', icon: '◎', text: '기둥의 이동을 보며 지금이 건널 때임을 분별한다',
        effects: { discernment: 1, memory: 1 }, next: 'exodus_10c_discern_branch',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '기둥은 단순히 막는 것만이 아니라 방향을 알려줍니다. 이제 앞을 보아야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '하나님이 사이에 서셨다는 사실을 기록하겠습니다. 이 밤의 보호는 설명보다 선명합니다.' }
        ]
      },
      {
        key: 'hide_until_morning', icon: '☾', text: '기둥이 막아주니 아침까지 숨어 기다리자고 한다',
        effects: { delay: 2, fear: 1 }, ending: 'bad_closed_sea',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '보호는 멈추라는 신호가 아닐 수 있습니다. 길이 열릴 때 숨어 있으면 때를 놓칩니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '하나님이 사이에 서신 이유는 우리를 다시 애굽 앞에 머물게 하시려는 것이 아닙니다.' }
        ]
      }
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

  // 5. Crossing: add a final buffer before the deliverance dawn.
  setNodeText('exodus_11_crossing', {
    prompt: '당신은 바다 가운데 난 길에서 어떻게 걷겠습니까?'
  });

  appendChoice('exodus_11_crossing', {
    key: 'keep_walking_together',
    icon: '✦',
    text: '흔들려도 멈추지 말고 함께 걷자고 격려한다',
    effects: { trust: 1, community: 1 },
    next: 'exodus_11b_last_steps',
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
    next: 'exodus_11b_last_steps',
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

  updateChoiceNext('exodus_11_crossing', {
    keep_walking_together: { next: 'exodus_11b_last_steps' },
    name_the_memory: { next: 'exodus_11b_last_steps' }
  });

  upsertNode('exodus_11b_last_steps', {
    chapter: '1장 · 출애굽',
    title: '새벽 직전의 마지막 걸음',
    location: '바다 길의 끝',
    bible: '출애굽기 14:24–31',
    day: '해방의 새벽 직전',
    place: '맞은편 해변',
    progress: { current: 20, total: TOTAL_PROGRESS },
    image: 'exodus_09_crossing_the_sea.png',
    copy: [
      '바다 길의 끝이 가까워질수록 뒤쪽의 소리는 더 거칠어집니다. 병거 바퀴가 흔들리고, 애굽의 대열이 어둠 속에서 어그러집니다.',
      '앞선 사람들은 이미 젖은 모래 위에 무릎을 꿇고 숨을 고릅니다. 그러나 아직 모두가 다 건넌 것은 아닙니다.',
      '새벽은 거의 왔지만, 마지막 걸음은 여전히 남아 있습니다. 구원은 끝까지 함께 건너야 완성됩니다.'
    ],
    prompt: '당신은 새벽 직전의 마지막 걸음 앞에서 무엇을 하시겠습니까?',
    choices: [
      {
        key: 'wait_for_the_last', icon: '🤝', text: '마지막 사람까지 건너왔는지 확인한다',
        effects: { community: 1, trust: 1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 해방은 먼저 도착한 사람의 안도가 아니라 마지막 사람까지 건너는 일입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '공동체는 끝에서 드러납니다. 마지막 사람을 기다리는 선택이 이 길의 의미를 지킵니다.' }
        ]
      },
      {
        key: 'bow_in_silence', icon: '✦', text: '말없이 무릎을 꿇고 하나님이 여신 길을 바라본다',
        effects: { trust: 1, memory: 1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '말이 닿지 않는 순간이 있습니다. 그러나 이 침묵은 잊음이 아니라 경외에 가깝습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '바다는 아직 움직이고 있습니다. 새벽이 오면 이 길의 의미가 더 분명해질 것입니다.' }
        ]
      },
      {
        key: 'rush_without_looking_back', icon: '☾', text: '뒤를 보지 않고 먼저 해변 위로 달려간다',
        effects: { fear: 1, community: -1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '살고 싶은 마음은 이해합니다. 그러나 뒤를 보지 않는 안도는 곁의 사람을 놓치게 할 수 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '두려움이 너무 크면 구원도 개인의 도망으로만 남습니다. 이 장면을 그렇게 끝내지 않았으면 합니다.' }
        ]
      }
    ]
  });

  // 6. Deliverance: three final responses, all resolved by accumulated choices.
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

  setProgress('exodus_04b_plague_witness', 5);
  setProgress('exodus_05b_hail_and_livestock', 7);
  setProgress('exodus_06b_passover_instruction', 9);
  setProgress('exodus_07b_passover_meal', 11);
  setProgress('exodus_09b_people_panic', 14);
  setProgress('exodus_10d_pillar_between', 16);
  setProgress('exodus_11b_last_steps', 20);
})();
