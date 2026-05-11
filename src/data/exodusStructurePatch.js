(function applyExodusStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  const TOTAL_PROGRESS = 21;

  const profiles = {
    eli: { name: '엘리야벳', role: '인도자', portrait: 'p1' },
    mira: { name: '미라', role: '기록자', portrait: 'p2' },
    yona: { name: '요나단', role: '보호자', portrait: 'p3' },
    asar: { name: '아사르', role: '탐색자', portrait: 'p4' }
  };

  function line(profileKey, text) {
    return { ...profiles[profileKey], text };
  }

  function choice(key, icon, text, effects, route, companions) {
    return {
      key,
      icon,
      text,
      effects: effects || {},
      ...route,
      companions
    };
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

  function replaceChoices(nodeId, choices) {
    const node = nodes[nodeId];
    if (!node) return;
    node.choices = choices;
  }

  function setProgress(nodeId, current) {
    if (!nodes[nodeId]) return;
    nodes[nodeId].progress = { current, total: TOTAL_PROGRESS };
  }

  // Progress normalization for the 21-scene Exodus route.
  setProgress('exodus_01_slave_day', 1);
  setProgress('exodus_02_whisper', 2);
  setProgress('exodus_03_pharaoh', 3);
  setProgress('exodus_04_plague_begin', 4);
  setProgress('exodus_05_set_apart', 6);
  setProgress('exodus_06_darkness', 8);
  setProgress('exodus_07_passover', 10);
  setProgress('exodus_08_departure', 12);
  setProgress('exodus_09_wilderness_edge', 13);
  setProgress('exodus_10_redsea', 15);
  setProgress('exodus_10b_care_branch', 16);
  setProgress('exodus_10c_discern_branch', 17);
  setProgress('exodus_11_crossing', 19);
  setProgress('exodus_12_deliverance', 21);

  // 1. Pharaoh's refusal: preserve the existing node but route into the expanded plague arc.
  replaceChoices('exodus_03_pharaoh', [
    choice('blame_moses', '☾', '모세를 탓하기보다 더 지켜보자고 말한다', { fear: 1, discernment: 1 }, { next: 'exodus_04_plague_begin' }, [
      line('mira', '원망이 완전히 사라진 것은 아니지만, 말을 멈추고 지켜보는 일도 기록될 만합니다.'),
      line('eli', '고통이 커질수록 약속을 오해하기 쉽습니다. 그래도 아직 이야기는 끝나지 않았습니다.')
    ]),
    choice('endure', '✦', '지금은 괴로워도 끝을 알 수 없다고 버틴다', { trust: 1 }, { next: 'exodus_04_plague_begin' }, [
      line('mira', '버틴다는 것은 아무것도 하지 않는 일이 아닙니다. 아직 끝나지 않았다고 믿는 태도입니다.'),
      line('asar', '상황은 악화되었지만 흐름이 움직이기 시작했습니다. 애굽도 흔들릴 것입니다.')
    ]),
    choice('gather_people', '🤝', '흔들리는 사람들을 모아 서로의 사정을 살핀다', { community: 1 }, { next: 'exodus_04_plague_begin' }, [
      line('yona', '좋습니다. 모두가 흩어지기 전에 서로의 얼굴을 보게 해야 합니다.'),
      line('eli', '공동체가 무너지면 약속을 들을 귀도 사라집니다. 먼저 사람들을 세워야 합니다.')
    ]),
    choice('submit_to_egypt', '◇', '지금은 애굽의 질서 안에서 버티는 편이 낫다고 말한다', { fear: 2, trust: -1 }, { ending: 'bad_bricks_forever' }, [
      line('mira', '그 말은 고통을 줄이는 것처럼 들리지만, 사실은 벽돌 곁에 더 오래 머물자는 말이 될 수 있습니다.'),
      line('eli', '해방의 길이 처음부터 편안할 것이라고 생각하면 다시 노예의 질서가 안전해 보입니다.')
    ])
  ]);

  // 2. Plague expansion.
  replaceChoices('exodus_04_plague_begin', [
    choice('record_signs', '▤', '강과 땅이 흔들린 일을 우연으로 넘기지 않고 기록한다', { memory: 1, discernment: 1 }, { next: 'exodus_04b_plague_witness' }, [
      line('mira', '기록하겠습니다. 오늘 흔들린 것은 강물만이 아니라 애굽이 영원하다는 믿음입니다.'),
      line('eli', '하나님의 일을 기억하는 사람은 다음 두려움 앞에서도 완전히 무너지지 않습니다.')
    ]),
    choice('discern_more', '◎', '백성이 너무 들뜨지 않게 조심스럽게 살핀다', { discernment: 1 }, { next: 'exodus_04b_plague_witness' }, [
      line('asar', '좋습니다. 그러나 계속 지켜보기만 하다가 때를 놓치지는 않아야 합니다.'),
      line('yona', '백성에게 섣부른 말은 삼가되, 두려움이 퍼지지 않게 하겠습니다.')
    ]),
    choice('spread_fear', '☾', '이 일이 더 큰 재난으로 번질까 두려워 사람들을 재촉한다', { fear: 1, delay: 1 }, { next: 'exodus_04b_plague_witness' }, [
      line('yona', '공포는 재앙보다 빠르게 번집니다. 사람들의 숨이 가빠지고 있습니다.'),
      line('mira', '두려움이 이야기를 지배하면 하나님이 하시는 일도 위협으로만 보입니다.')
    ])
  ]);

  upsertNode('exodus_04b_plague_witness', {
    chapter: '1장 · 출애굽',
    location: '재앙을 목격한 고센의 길목',
    bible: '출애굽기 8:20–32; 9:8–12',
    title: '무너지는 신들의 밤',
    day: '재앙이 깊어진 날',
    place: '고센과 애굽의 경계',
    progress: { current: 5, total: TOTAL_PROGRESS },
    image: 'exodus_04b_plague_witness.png',
    copy: [
      '파리 떼가 애굽의 집과 뜰을 덮었다는 소식이 끊이지 않습니다. 이어 악성 종기의 고통이 사람과 짐승의 몸에 번졌다는 말도 들려옵니다.',
      '애굽이 의지하던 질서가 하나씩 흔들립니다. 강과 땅과 몸과 집이 더 이상 바로의 말에 복종하지 않는 것처럼 보입니다.',
      '그러나 고통을 보는 일은 쉬운 일이 아닙니다. 해방의 징조를 보면서도, 사람의 마음은 승리감과 두려움 사이에서 갈라집니다.'
    ],
    prompt: '당신은 재앙을 목격한 증인으로서 무엇을 붙드시겠습니까?',
    choices: [
      choice('read_the_signs_humbly', '◎', '재앙을 승리감이 아니라 분별의 표지로 받아들인다', { discernment: 1, memory: 1 }, { next: 'exodus_05_set_apart' }, [
        line('asar', '지금 무너지는 것은 단순한 생활의 질서가 아닙니다. 애굽이 절대적이라고 믿었던 기반이 흔들리고 있습니다.'),
        line('mira', '분별 없이 기뻐하면 우리는 고통을 구경한 사람이 됩니다. 오늘의 표지는 겸손하게 기록되어야 합니다.')
      ]),
      choice('comfort_frightened_neighbors', '🤝', '두려워하는 이웃을 진정시키고 함께 기다린다', { community: 1, fear: -1 }, { next: 'exodus_05_set_apart' }, [
        line('eli', '좋습니다. 하나님이 일하시는 때에도 사람은 무너질 수 있습니다. 누군가는 곁을 지켜야 합니다.'),
        line('yona', '공포가 퍼지기 전에 모여 있게 하겠습니다. 서로의 목소리가 들리면 백성은 쉽게 흩어지지 않습니다.')
      ]),
      choice('call_it_disorder', '☾', '아직은 애굽 전체가 흔들린 혼란일 뿐이라고 말한다', { fear: 1, trust: -1 }, { next: 'exodus_05_set_apart' }, [
        line('mira', '그럴 수도 있습니다. 그러나 모든 표지를 우연으로만 부르면 기억해야 할 순간을 놓칠 수 있습니다.'),
        line('asar', '혼란을 혼란으로 보는 눈도 필요합니다. 다만 이 흔들림이 어디로 향하는지는 계속 보아야 합니다.')
      ])
    ]
  });

  replaceChoices('exodus_05_set_apart', [
    choice('remember_set_apart', '✦', '우리를 구별하시는 하나님을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_05b_hail_and_livestock' }, [
      line('eli', '구별은 자랑이 아니라 책임입니다. 하나님께 속했다는 사실을 기억해야 합니다.'),
      line('mira', '이 기억은 훗날 광야에서도 필요할 것입니다. 우리는 애굽의 소유가 아니었습니다.')
    ]),
    choice('still_doubt', '◎', '표지를 보았지만 아직 더 살펴야 한다고 말한다', { discernment: 1 }, { next: 'exodus_05b_hail_and_livestock' }, [
      line('asar', '의심은 완전히 나쁜 것이 아닙니다. 그러나 보이는 표지 앞에서도 계속 물러서면 길을 잃습니다.'),
      line('mira', '의심이 질문으로 남으면 분별이 되지만, 냉소가 되면 기억을 지웁니다.')
    ]),
    choice('mock_egyptians', '☾', '애굽의 고통을 보며 우리 쪽은 안전하다고 들뜬다', { community: -1, fear: 1 }, { next: 'exodus_05b_hail_and_livestock' }, [
      line('eli', '구별받았다는 사실이 교만으로 변하면 우리도 애굽의 마음을 닮게 됩니다.'),
      line('yona', '조롱은 사람들을 들뜨게 하지만, 곧 불필요한 위험을 부를 수 있습니다.')
    ])
  ]);

  upsertNode('exodus_05b_hail_and_livestock', {
    chapter: '1장 · 출애굽',
    location: '애굽의 들판 너머',
    bible: '출애굽기 9:1–7; 9:13–35; 10:1–20',
    title: '우박과 죽은 가축의 들판',
    day: '하늘과 들이 흔들린 날',
    place: '고센 바깥 들판',
    progress: { current: 7, total: TOTAL_PROGRESS },
    image: 'exodus_05b_hail_and_livestock.png',
    copy: [
      '가축의 죽음이 애굽의 들판을 지나갔고, 이어 우박과 불이 하늘에서 쏟아졌다는 말이 들립니다. 남은 곡식마저 메뚜기 떼가 삼켜 버립니다.',
      '바로는 잠시 굽히는 듯하다가 다시 마음을 굳힙니다. 백성은 그 완고함이 한 왕의 성격이 아니라 한 제국의 방식임을 느끼기 시작합니다.',
      '재앙은 길어지고, 기다림도 길어집니다. 구원은 가까워 보이지만 아직 끝나지 않았습니다.'
    ],
    prompt: '당신은 길어진 재앙과 완고한 바로 앞에서 어떻게 반응하시겠습니까?',
    choices: [
      choice('keep_watch_with_patience', '✦', '늦어 보여도 하나님이 일을 끝내실 때까지 기다린다', { trust: 1, memory: 1 }, { next: 'exodus_06_darkness' }, [
        line('eli', '기다림이 길어질수록 신뢰는 더 구체적인 선택이 됩니다. 끝을 하나님께 맡겨야 합니다.'),
        line('mira', '바로의 완고함도 기록하겠습니다. 해방은 우연한 양보가 아니라 강한 손으로 이루어질 것입니다.')
      ]),
      choice('organize_supplies', '🤝', '혹시 모를 떠남을 위해 집집마다 필요한 것을 확인한다', { community: 1, discernment: 1 }, { next: 'exodus_06_darkness' }, [
        line('yona', '좋습니다. 기다림은 멈춤이 아닙니다. 떠날 수 있도록 손과 발을 준비시키겠습니다.'),
        line('asar', '곡식과 짐승과 길을 확인하겠습니다. 준비된 공동체는 갑작스러운 명령에도 덜 흔들립니다.')
      ]),
      choice('hide_from_retaliation', '☾', '애굽이 더 거칠게 보복할까 두려워 집 안에 숨는다', { delay: 1, fear: 1 }, { next: 'exodus_06_darkness' }, [
        line('mira', '숨고 싶은 마음은 이해됩니다. 그러나 두려움이 길어지면 떠날 준비도 함께 늦어집니다.'),
        line('eli', '끝나지 않은 시간도 구원의 일부일 수 있습니다. 마음을 완전히 놓아버리지는 마십시오.')
      ])
    ]
  });

  // 3. Passover instruction and meal.
  replaceChoices('exodus_06_darkness', [
    choice('prepare_family', '🤝', '가족과 함께 조용히 준비한다', { community: 1 }, { next: 'exodus_06b_passover_instruction' }, [
      line('yona', '좋습니다. 모두가 불안할 때 가장 가까운 사람들을 먼저 붙드는 것이 필요합니다.'),
      line('eli', '조용한 준비가 큰 결단을 가능하게 합니다. 이 밤을 가볍게 보내면 안 됩니다.')
    ]),
    choice('seek_more_signs', '◎', '더 많은 징조를 확인하려고 주변을 살핀다', { discernment: 1, delay: 1 }, { next: 'exodus_06b_passover_instruction' }, [
      line('asar', '확인하려는 마음은 이해합니다. 그러나 어둠 속에서 너무 멀리 움직이면 돌아오는 길이 늦어집니다.'),
      line('mira', '모든 표지를 더 확인해야만 순종할 수 있다면, 순종의 때는 늘 늦어질 수 있습니다.')
    ]),
    choice('spread_rumors', '☾', '불안한 소식을 모아 사람들에게 미리 경고한다', { fear: 1, scatter: 1 }, { next: 'exodus_06b_passover_instruction' }, [
      line('yona', '사람들이 술렁이기 시작했습니다. 소문은 어둠보다 더 많은 길을 막습니다.'),
      line('eli', '공동체가 두려움으로 움직이면, 곧 각자 살 길만 찾게 됩니다.')
    ])
  ]);

  upsertNode('exodus_06b_passover_instruction', {
    chapter: '1장 · 출애굽',
    location: '문 안쪽의 낮은 방',
    bible: '출애굽기 12:1–13',
    title: '어린 양을 준비하라',
    day: '유월절 준비의 날',
    place: '히브리인의 집',
    progress: { current: 9, total: TOTAL_PROGRESS },
    image: 'exodus_06b_passover_instruction.png',
    copy: [
      '명령은 추상적이지 않습니다. 어린 양을 고르고, 피를 문설주와 인방에 바르고, 허리에 띠를 띠고, 신을 신고, 지팡이를 손에 잡아야 합니다.',
      '누군가는 왜 이렇게 급히 먹어야 하느냐고 묻고, 누군가는 피가 정말 표지가 되겠느냐고 속삭입니다.',
      '이 밤의 순종은 마음속 결심만으로 끝나지 않습니다. 집과 문과 식탁과 몸의 자세가 모두 말씀 앞에 놓입니다.'
    ],
    prompt: '당신은 유월절 준비를 어떻게 이끌겠습니까?',
    choices: [
      choice('prepare_by_the_word', '✦', '말씀의 순서를 하나씩 확인하며 집안을 준비시킨다', { trust: 1, discernment: 1 }, { next: 'exodus_07_passover' }, [
        line('eli', '좋습니다. 오늘의 순종은 막연한 열심이 아니라 말씀의 순서를 따라가는 일입니다.'),
        line('asar', '문과 식탁과 짐을 확인하겠습니다. 준비가 분명할수록 밤의 혼란이 줄어듭니다.')
      ]),
      choice('ask_and_obey', '◎', '이유를 묻되, 준비를 늦추지 않고 따른다', { discernment: 1, trust: 1 }, { next: 'exodus_07_passover' }, [
        line('mira', '질문은 순종을 막기 위한 것이 아니라 더 깊이 기억하기 위한 것이어야 합니다.'),
        line('eli', '묻는 마음과 따르는 발이 함께 있으면 공동체는 성급함과 불신을 모두 피할 수 있습니다.')
      ]),
      choice('delay_the_marking', '☾', '사람들이 납득할 때까지 표지를 잠시 미루자고 한다', { delay: 1, fear: 1 }, { next: 'exodus_07_passover' }, [
        line('yona', '설명은 필요하지만 시간이 많지 않습니다. 망설임이 길어지면 집집마다 불안이 커질 것입니다.'),
        line('mira', '이해를 기다리다 순종의 때를 놓칠 수 있습니다. 오늘 밤은 마음만이 아니라 문도 준비되어야 합니다.')
      ])
    ]
  });

  replaceChoices('exodus_07_passover', [
    choice('mark_door', '✦', '말씀대로 문설주에 피를 바르고 가족을 준비시킨다', { trust: 1, community: 1, memory: 1 }, { next: 'exodus_07b_passover_meal' }, [
      line('eli', '말씀은 모호하지 않습니다. 오늘 밤의 순종은 공동체를 살리는 표지가 될 것입니다.'),
      line('mira', '피의 표지를 기록하겠습니다. 이 밤은 훗날 절기로 기억될 것입니다.')
    ]),
    choice('obey_without_understanding', '▤', '이해되지 않지만 말씀의 순서대로 따른다', { trust: 1 }, { next: 'exodus_07b_passover_meal' }, [
      line('mira', '모든 순종이 완전한 이해 뒤에 오는 것은 아닙니다. 때로는 말씀을 따라 걷는 중에 의미가 열립니다.'),
      line('asar', '지금은 오래 따질 시간이 없습니다. 필요한 것은 준비와 이동입니다.')
    ]),
    choice('hesitate_mark', '☾', '굳이 이렇게까지 해야 하느냐며 잠시 망설인다', { delay: 1, fear: 1 }, { next: 'exodus_07b_passover_meal' }, [
      line('yona', '망설임이 길어지면 가족들이 불안해합니다. 결정해야 할 시간이 가까워졌습니다.'),
      line('eli', '구원의 표지는 마음속 생각이 아니라 문 위에 남아야 합니다.')
    ]),
    choice('ignore_mark', '◇', '가정마다 형편껏 표시해도 충분하지 않겠느냐고 말한다', { trust: -2, delay: 1 }, { ending: 'bad_unmarked_door' }, [
      line('mira', '표지를 가볍게 여기는 것은 이 밤의 의미를 가볍게 여기는 일입니다.'),
      line('eli', '말씀이 지나치게 보이는 순간, 우리는 자신이 더 안전한 판단을 한다고 착각합니다.')
    ])
  ]);

  upsertNode('exodus_07b_passover_meal', {
    chapter: '1장 · 출애굽',
    location: '표시된 문 안의 식탁',
    bible: '출애굽기 12:8–14; 12:21–28',
    title: '서서 먹는 식탁',
    day: '유월절의 밤',
    place: '문 안쪽 식탁',
    progress: { current: 11, total: TOTAL_PROGRESS },
    image: 'exodus_07b_passover_meal.png',
    copy: [
      '가족들은 무교병과 쓴 나물을 앞에 두고 서둘러 식탁에 둘러섭니다. 허리띠와 신과 지팡이가 식사의 분위기를 바꿉니다.',
      '밖에서는 낮고 긴 침묵이 흐르고, 안에서는 아이들이 왜 이 밤이 다른 밤과 다른지 묻습니다.',
      '이 식사는 배를 채우는 시간이 아니라 떠남을 몸에 새기는 시간입니다. 먹는 일조차 해방의 준비가 됩니다.'
    ],
    prompt: '당신은 표시된 문 안의 식탁에서 무엇을 하시겠습니까?',
    choices: [
      choice('teach_the_children', '▤', '아이들에게 이 밤의 뜻을 짧게 설명한다', { memory: 1, community: 1 }, { next: 'exodus_08_departure' }, [
        line('mira', '자녀들이 묻는 밤은 기억이 시작되는 밤입니다. 이 식탁은 훗날의 증언이 될 것입니다.'),
        line('eli', '좋습니다. 떠남은 세대가 이어 받을 이야기와 함께 시작되어야 합니다.')
      ]),
      choice('keep_ready_to_move', '✦', '식사를 마치되 짐과 대열을 바로 움직일 수 있게 둔다', { trust: 1, discernment: 1 }, { next: 'exodus_08_departure' }, [
        line('asar', '문 곁에 짐을 모아두겠습니다. 명령이 떨어지면 오래 머뭇거리지 않아야 합니다.'),
        line('yona', '아이들과 노인들의 위치도 확인하겠습니다. 급한 떠남일수록 질서가 필요합니다.')
      ]),
      choice('eat_in_silence_fear', '☾', '두려움 때문에 아무 말 없이 식탁만 바라본다', { fear: 1 }, { next: 'exodus_08_departure' }, [
        line('yona', '침묵이 필요한 때도 있지만, 공포가 식탁 전체를 붙들고 있습니다. 누군가는 숨을 돌리게 해야 합니다.'),
        line('mira', '말하지 않은 기억은 쉽게 흐려집니다. 이 밤을 두려움만으로 남기지 마십시오.')
      ])
    ]
  });

  // 4. Departure and pursuit.
  replaceChoices('exodus_08_departure', [
    choice('help_children_depart', '🤝', '아이들과 노인들이 먼저 대열에 설 수 있게 돕는다', { community: 1, memory: 1 }, { next: 'exodus_09_wilderness_edge' }, [
      line('yona', '좋습니다. 떠남은 빠른 사람만의 일이 아닙니다. 가장 느린 사람도 함께 나가야 공동체가 살아납니다.'),
      line('mira', '해방의 밤은 발 빠른 사람들의 탈출이 아니라, 함께 떠난 이름들의 기록으로 남아야 합니다.')
    ]),
    choice('carry_unleavened_memory', '▤', '부풀지 못한 빵을 보며 이 밤을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_09_wilderness_edge' }, [
      line('mira', '좋습니다. 급히 떠난 흔적은 부끄러운 흔적이 아니라 구원의 속도를 기억하게 하는 표지입니다.'),
      line('eli', '기억하는 백성은 광야에서도 자신들이 왜 떠났는지 잊지 않을 수 있습니다.')
    ]),
    choice('stay_for_safety', '◇', '아직 위험하니 조금 더 남아 상황을 보자고 한다', { fear: 2, delay: 2, trust: -1 }, { ending: 'bad_stayed_in_egypt' }, [
      line('asar', '안전을 확인하고 싶은 마음은 이해합니다. 그러나 오늘 밤의 문은 오래 열려 있지 않습니다.'),
      line('eli', '부름이 왔을 때 남는 것은 신중함이 아니라 애굽을 마지막 피난처로 삼는 일일 수 있습니다.')
    ])
  ]);

  replaceChoices('exodus_09_wilderness_edge', [
    choice('hold_line_forward', '✦', '대열을 붙들고 앞으로 나아가자고 말한다', { trust: 1, community: 1 }, { next: 'exodus_09b_people_panic' }, [
      line('yona', '대열이 무너지지 않으면 아직 길을 볼 수 있습니다. 먼저 사람들의 발걸음을 붙들겠습니다.'),
      line('eli', '두려움은 뒤를 보게 하지만, 부르심은 앞으로 걷게 합니다. 지금은 흩어지지 않는 것이 중요합니다.')
    ]),
    choice('count_pursuers', '◎', '추격대의 거리와 대열의 상태를 살핀다', { discernment: 1 }, { next: 'exodus_09b_people_panic' }, [
      line('asar', '병거는 빠르지만 대열은 아직 무너지지 않았습니다. 두려움을 사실로 바꾸어 살피면 다음 판단이 선명해집니다.'),
      line('mira', '분별은 공포를 부정하는 일이 아닙니다. 공포가 전부가 아니라고 기록하는 일입니다.')
    ]),
    choice('turn_back_to_egypt', '◇', '차라리 애굽과 다시 협상해 목숨을 구하자고 말한다', { fear: 2, scatter: 1, trust: -1 }, { ending: 'bad_return_to_egypt' }, [
      line('yona', '그 말이 퍼지면 사람들의 발이 뒤로 돌아섭니다. 몸은 광야에 있어도 마음은 다시 애굽으로 묶일 수 있습니다.'),
      line('mira', '두려움이 해방의 기억보다 커지는 순간, 노예의 질서는 다시 안전처럼 보입니다.')
    ])
  ]);

  upsertNode('exodus_09b_people_panic', {
    chapter: '1장 · 출애굽',
    location: '바다로 밀려가는 대열',
    bible: '출애굽기 14:10–12',
    title: '살아난 노예의 목소리',
    day: '추격의 밤',
    place: '바다 앞 광야',
    progress: { current: 14, total: TOTAL_PROGRESS },
    image: 'exodus_09b_people_panic.png',
    copy: [
      '뒤에서는 병거 바퀴 소리가 점점 커지고, 앞에서는 바다의 검은 면이 길을 막습니다. 백성의 숨이 한꺼번에 무너집니다.',
      '누군가 애굽에 매장지가 없어서 우리를 이곳으로 데려왔느냐고 외칩니다. 오래 눌려 있던 노예의 언어가 다시 살아납니다.',
      '두려움은 단순한 감정이 아닙니다. 두려움은 방금 떠난 애굽을 다시 그리워하게 만드는 기억의 왜곡입니다.'
    ],
    prompt: '당신은 공포에 흔들리는 백성 사이에서 어떻게 서겠습니까?',
    choices: [
      choice('answer_panic_with_memory', '▤', '유월절의 밤과 열린 문을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_10_redsea' }, [
        line('mira', '기억이 없으면 공포가 역사를 다시 씁니다. 방금 지나온 밤을 다시 말해야 합니다.'),
        line('eli', '맞습니다. 하나님이 여기까지 이끄셨다면, 바다 앞에서도 이야기가 끝난 것은 아닙니다.')
      ]),
      choice('steady_the_panic_line', '🤝', '소리치는 사람들 사이에 서서 숨을 고르게 돕는다', { community: 1, fear: -1 }, { next: 'exodus_10_redsea' }, [
        line('yona', '좋습니다. 지금 필요한 것은 큰 말보다 무너지지 않는 대열입니다. 사람들의 사이를 막겠습니다.'),
        line('asar', '앞쪽에 아직 공간이 있습니다. 질서가 유지되면 다음 신호를 받을 수 있습니다.')
      ]),
      choice('join_the_complaint', '◇', '애굽에 있을 때가 차라리 안정적이었다는 말에 동조한다', { fear: 2, trust: -1, scatter: 1 }, { ending: 'bad_return_to_egypt' }, [
        line('mira', '그 말은 단순한 불평이 아닙니다. 해방의 기억을 애굽의 안전으로 바꾸는 말입니다.'),
        line('eli', '공포가 공동체의 입이 되면 모두가 뒤를 향하게 됩니다. 지금 그 방향은 너무 위험합니다.')
      ])
    ]
  });

  // 5. Red Sea branches and pillar buffer.
  replaceChoices('exodus_10_redsea', [
    choice('stand_and_watch', '✦', '두려워하지 말고 여호와의 구원을 보자고 말한다', { trust: 1, memory: 1 }, { next: 'exodus_10c_discern_branch' }, [
      line('eli', '이 말은 현실을 부정하는 말이 아닙니다. 병거보다 크신 분을 바라보자는 고백입니다.'),
      line('mira', '오늘의 두려움은 기록될 것입니다. 그러나 두려움만 기록되게 하지는 맙시다.')
    ]),
    choice('check_the_weak', '🤝', '아이들과 노인들이 흩어지지 않았는지 먼저 살핀다', { community: 1, discernment: 1 }, { next: 'exodus_10b_care_branch' }, [
      line('yona', '좋습니다. 위기의 순간에 가장 약한 사람이 어디 있는지 살피는 것이 공동체의 방향을 정합니다.'),
      line('asar', '대열의 뒤쪽이 흔들립니다. 그곳을 붙들면 길이 열릴 때 함께 움직일 수 있습니다.')
    ]),
    choice('run_ahead_alone', '◇', '먼저 안전한 곳을 확인하겠다며 앞쪽으로 뛰쳐나간다', { scatter: 2, fear: 1, community: -1 }, { ending: 'bad_scattered_people' }, [
      line('eli', '혼자 살겠다는 외침처럼 들리지 않아도, 그 움직임은 공동체를 찢을 수 있습니다.'),
      line('yona', '사람들이 움직이기 시작했습니다. 두려움이 대열을 무너뜨리고 있습니다.')
    ]),
    choice('wait_until_certain', '☾', '물이 완전히 안정될 때까지 기다리자고 한다', { delay: 2, fear: 1 }, { ending: 'bad_closed_sea' }, [
      line('asar', '확실함을 기다리는 동안 병거는 가까워집니다. 열린 길도 순종의 때를 놓치면 닫힐 수 있습니다.'),
      line('mira', '너무 늦은 확신은 믿음의 이름을 가질 수 없습니다. 이 밤은 기다림보다 걸음이 필요한 밤입니다.')
    ])
  ]);

  setNodeText('exodus_10b_care_branch', {
    progress: { current: 16, total: TOTAL_PROGRESS },
    prompt: '당신은 뒤처진 사람들 곁에서 어떻게 움직이시겠습니까?'
  });
  replaceChoices('exodus_10b_care_branch', [
    choice('hold_the_rear', '🤝', '뒤쪽 대열을 붙들며 함께 건널 준비를 시킨다', { community: 1, trust: 1 }, { next: 'exodus_10d_pillar_between' }, [
      line('yona', '좋습니다. 뒤를 지키는 사람이 있어야 앞의 길도 공동체의 길이 됩니다.'),
      line('eli', '가장 느린 사람을 기준으로 삼을 때, 해방은 숫자가 아니라 얼굴의 이야기가 됩니다.')
    ]),
    choice('check_path_then_call', '◎', '먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다', { discernment: 1, delay: 1 }, { next: 'exodus_10d_pillar_between' }, [
      line('asar', '길을 확인하는 것은 필요합니다. 그러나 확인이 길어지면 기다리는 사람들의 두려움도 커집니다.'),
      line('yona', '제가 뒤처진 사람들을 붙들겠습니다. 너무 늦지 않게 신호를 보내야 합니다.')
    ]),
    choice('send_each_family', '☾', '각 가정이 자기 식구부터 챙기게 하자고 한다', { scatter: 1, community: -1 }, { next: 'exodus_10d_pillar_between' }, [
      line('eli', '그 말은 현실적입니다. 그러나 공동체가 가정 단위로만 쪼개지면 약한 사람은 더 쉽게 놓입니다.'),
      line('mira', '해방의 길이 각자의 생존 기록으로만 남지 않기를 바랍니다.')
    ])
  ]);

  setNodeText('exodus_10c_discern_branch', {
    progress: { current: 17, total: TOTAL_PROGRESS },
    prompt: '당신은 열리는 길 앞에서 어떤 질서를 세우시겠습니까?'
  });
  replaceChoices('exodus_10c_discern_branch', [
    choice('cross_in_pairs', '🤝', '사람들을 둘씩 묶어 질서 있게 지나가게 한다', { community: 1, discernment: 1 }, { next: 'exodus_10d_pillar_between' }, [
      line('yona', '좋습니다. 서로를 놓치지 않게 하면 공포가 번지는 속도도 늦출 수 있습니다.'),
      line('asar', '길은 좁고 물벽은 흔들립니다. 질서가 곧 속도입니다.')
    ]),
    choice('watch_the_timing', '◎', '기둥과 바람의 움직임을 살피며 이동 신호를 기다린다', { discernment: 1, trust: 1 }, { next: 'exodus_10d_pillar_between' }, [
      line('asar', '좋습니다. 무작정 뛰는 것보다 움직임의 때를 보는 것이 중요합니다.'),
      line('mira', '분별은 머무는 핑계가 아니라 걸어야 할 때를 알아보는 눈입니다.')
    ]),
    choice('argue_about_order', '☾', '누가 먼저 갈지 정해야 한다며 논쟁을 시작한다', { delay: 1, fear: 1 }, { next: 'exodus_10d_pillar_between' }, [
      line('yona', '논쟁이 길어지면 뒤쪽부터 무너집니다. 지금은 자리를 다투기보다 길을 붙들어야 합니다.'),
      line('eli', '질서는 필요하지만, 두려움 속의 질서 다툼은 공동체를 더 느리게 만듭니다.')
    ])
  ]);

  upsertNode('exodus_10d_pillar_between', {
    chapter: '1장 · 출애굽',
    location: '이스라엘과 애굽 사이',
    bible: '출애굽기 14:19–20',
    title: '사이에 선 구름 기둥',
    day: '바다 앞의 밤',
    place: '진영 사이의 어둠과 빛',
    progress: { current: 18, total: TOTAL_PROGRESS },
    image: 'exodus_10d_pillar_between.png',
    copy: [
      '하나님의 사자가 움직이고, 구름 기둥이 뒤로 옮겨갑니다. 기둥은 애굽과 이스라엘 사이에 서서 한쪽에는 어둠을, 한쪽에는 밤을 밝힙니다.',
      '백성은 처음으로 추격대와 자신들 사이에 선 보호의 장벽을 봅니다. 아직 바다는 완전히 건너지 않았지만, 하나님은 이미 사이에 서 계십니다.',
      '이 장면은 사람들을 조용하게 만듭니다. 두려움이 사라진 것은 아니지만, 두려움만이 전부는 아니게 됩니다.'
    ],
    prompt: '당신은 구름 기둥이 사이에 선 밤에 무엇을 하시겠습니까?',
    choices: [
      choice('name_the_pillar', '✦', '하나님이 우리와 애굽 사이에 서셨다고 말한다', { trust: 1, memory: 1 }, { next: 'exodus_11_crossing' }, [
        line('eli', '이 고백은 사람들을 다시 숨 쉬게 합니다. 하나님이 사이에 서신 밤을 잊지 말아야 합니다.'),
        line('mira', '하나님이 사이에 서셨다는 사실을 기록하겠습니다. 이 밤의 보호는 설명보다 선명합니다.')
      ]),
      choice('reorder_the_line', '🤝', '밤이 길어질 것을 생각해 대열을 다시 정비한다', { community: 1, discernment: 1 }, { next: 'exodus_11_crossing' }, [
        line('yona', '좋습니다. 보호가 주어졌을 때 우리가 할 일은 서로를 다시 세우는 것입니다.'),
        line('asar', '뒤쪽과 앞쪽의 간격을 줄이겠습니다. 길이 열리면 모두가 함께 움직여야 합니다.')
      ]),
      choice('hide_until_morning', '☾', '기둥이 막아주니 아침까지 숨어 기다리자고 한다', { delay: 2, fear: 1 }, { ending: 'bad_closed_sea' }, [
        line('asar', '보호는 멈추라는 신호가 아닐 수 있습니다. 길이 열릴 때 숨어 있으면 때를 놓칩니다.'),
        line('eli', '하나님이 사이에 서신 이유는 우리를 다시 애굽 앞에 머물게 하시려는 것이 아닙니다.')
      ])
    ]
  });

  // 6. Crossing and final dawn.
  replaceChoices('exodus_11_crossing', [
    choice('keep_walking_together', '✦', '흔들려도 멈추지 말고 함께 걷자고 격려한다', { trust: 1, community: 1 }, { next: 'exodus_11b_last_steps' }, [
      line('eli', '믿음은 두려움이 사라진 뒤의 걸음이 아닙니다. 두려움 속에서도 멈추지 않는 걸음입니다.'),
      line('yona', '대열이 다시 안정되고 있습니다. 서로의 손을 놓지 않으면 끝까지 건널 수 있습니다.')
    ]),
    choice('name_the_memory', '▤', '지금 보고 있는 일을 잊지 말자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_11b_last_steps' }, [
      line('mira', '바다의 길은 지나가면 사라질 길입니다. 그래서 기억으로 붙들어야 합니다.'),
      line('asar', '뒤에서는 병거가 흔들리고 앞에는 새벽빛이 보입니다. 이 순간을 잊지 마십시오.')
    ]),
    choice('freeze_between_walls', '☾', '물벽이 두려워 중간에서 걸음을 멈춘다', { fear: 2, delay: 2 }, { ending: 'bad_closed_sea' }, [
      line('yona', '멈추면 뒤따르는 사람들까지 막힙니다. 두려움은 이해되지만, 지금은 발을 떼야 합니다.'),
      line('mira', '길 한가운데서 멈춘 확신은 결국 길을 잃게 만들 수 있습니다.')
    ])
  ]);

  upsertNode('exodus_11b_last_steps', {
    chapter: '1장 · 출애굽',
    location: '바다 길의 끝',
    bible: '출애굽기 14:24–31',
    title: '새벽 직전의 마지막 걸음',
    day: '해방의 새벽 직전',
    place: '맞은편 해변',
    progress: { current: 20, total: TOTAL_PROGRESS },
    image: 'exodus_11b_last_steps.png',
    copy: [
      '바다 길의 끝이 가까워질수록 뒤쪽의 소리는 더 거칠어집니다. 병거 바퀴가 흔들리고, 애굽의 대열이 어둠 속에서 어그러집니다.',
      '앞선 사람들은 이미 젖은 모래 위에 무릎을 꿇고 숨을 고릅니다. 그러나 아직 모두가 다 건넌 것은 아닙니다.',
      '새벽은 거의 왔지만, 마지막 걸음은 여전히 남아 있습니다. 구원은 끝까지 함께 건너야 완성됩니다.'
    ],
    prompt: '당신은 새벽 직전의 마지막 걸음 앞에서 무엇을 하시겠습니까?',
    choices: [
      choice('wait_for_the_last', '🤝', '마지막 사람까지 건너왔는지 확인한다', { community: 1, trust: 1 }, { next: 'exodus_12_deliverance' }, [
        line('yona', '좋습니다. 해방은 먼저 도착한 사람의 안도가 아니라 마지막 사람까지 건너는 일입니다.'),
        line('eli', '공동체는 끝에서 드러납니다. 마지막 사람을 기다리는 선택이 이 길의 의미를 지킵니다.')
      ]),
      choice('bow_in_silence', '✦', '말없이 무릎을 꿇고 하나님이 여신 길을 바라본다', { trust: 1, memory: 1 }, { next: 'exodus_12_deliverance' }, [
        line('mira', '말이 닿지 않는 순간이 있습니다. 그러나 이 침묵은 잊음이 아니라 경외에 가깝습니다.'),
        line('asar', '바다는 아직 움직이고 있습니다. 새벽이 오면 이 길의 의미가 더 분명해질 것입니다.')
      ]),
      choice('rush_without_looking_back', '☾', '거의 다 왔다며 각자 먼저 해변으로 오르게 한다', { fear: 1, scatter: 1, community: -1 }, { next: 'exodus_12_deliverance' }, [
        line('yona', '살고 싶은 마음은 이해합니다. 그러나 뒤를 보지 않는 안도는 곁의 사람을 놓치게 할 수 있습니다.'),
        line('mira', '두려움이 너무 크면 구원도 개인의 도망으로만 남습니다. 이 장면을 그렇게 끝내지 않았으면 합니다.')
      ])
    ]
  });

  replaceChoices('exodus_12_deliverance', [
    choice('remember_for_children', '▤', '이 밤을 자녀들에게 전하겠다고 다짐한다', { memory: 1 }, { endingResolver: 'exodus' }, [
      line('mira', '기억은 살아남은 사람의 의무입니다. 이 밤은 우리만의 감격으로 끝나지 않을 것입니다.'),
      line('eli', '자녀들이 묻게 될 때, 우리는 이 길이 어떻게 열렸는지 말해야 합니다.')
    ]),
    choice('remain_in_relief', '☾', '살아남았다는 안도감에만 잠시 머문다', { fear: -1 }, { endingResolver: 'exodus' }, [
      line('yona', '숨을 돌리는 것도 필요합니다. 다만 안도감만 남으면 이 길의 의미를 잊을 수 있습니다.'),
      line('asar', '병거 소리는 멀어졌지만, 광야의 길은 이제 시작입니다.')
    ]),
    choice('remember_names', '🤝', '함께 건넌 이들의 이름을 기억한다', { community: 1, memory: 1 }, { endingResolver: 'exodus' }, [
      line('mira', '이름 없는 사람들의 이름을 잊지 않겠습니다. 해방은 숫자가 아니라 얼굴들의 이야기입니다.'),
      line('eli', '함께 건넌 사람들을 기억하는 공동체는 다시 노예의 방식으로 돌아가지 않습니다.')
    ])
  ]);
})();
