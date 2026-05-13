(function applyWildernessStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  window.WILDERNESS_START_NODE_ID = 'wilderness_01_marah_thirst';

  const TOTAL_PROGRESS = 26;

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
    return { key, icon, text, effects: effects || {}, ...route, companions };
  }

  function node(nodeId, current, data) {
    nodes[nodeId] = {
      id: nodeId,
      chapter: '2장 · 광야',
      progress: { current, total: TOTAL_PROGRESS },
      ...data
    };
  }

  node('wilderness_01_marah_thirst', 1, {
    location: '수르 광야의 사흘 길',
    bible: '출애굽기 15:22–23',
    title: '물이 없는 사흘',
    day: '홍해 이후 사흘째',
    place: '수르 광야',
    copy: [
      '바다의 노래가 아직 사람들의 입술에 남아 있지만, 사흘 동안 물을 얻지 못하자 노래는 점점 낮아집니다.',
      '아이들의 입술은 마르고 짐승들의 걸음도 느려집니다. 해방의 길이 곧바로 풍요의 길은 아니라는 사실이 공동체를 짓누릅니다.',
      '당신은 모세가 아니라 목마른 사람들 사이에서 흔들리는 이름 없는 증인입니다.'
    ],
    prompt: '목마름이 공동체를 흔들 때 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('steady_the_thirsty', '🤝', '가장 지친 사람들 곁에 서서 물을 나누어 마시게 한다', { community: 1, fear: -1 }, { next: 'wilderness_02_bitter_water' }, [
        line('yona', '물이 부족할수록 먼저 무너지는 사람을 살펴야 합니다. 공동체는 가장 약한 걸음에서 드러납니다.'),
        line('eli', '목마름은 사람의 말도 거칠게 만듭니다. 누군가 곁에 서면 원망이 조금 늦춰질 수 있습니다.')
      ]),
      choice('count_the_signs', '▤', '홍해에서 보았던 일을 떠올리며 지금의 상황을 기록한다', { memory: 1, discernment: 1 }, { next: 'wilderness_02_bitter_water' }, [
        line('mira', '바다를 건넌 공동체도 사흘 만에 마를 수 있다는 사실을 기록해야 합니다.'),
        line('asar', '기억은 감상이 아닙니다. 다음 판단을 지키는 표지가 됩니다.')
      ]),
      choice('say_we_will_die', '☾', '이 광야에서 모두 죽을 것이라고 불안을 퍼뜨린다', { fear: 1, scatter: 1 }, { next: 'wilderness_02_bitter_water' }, [
        line('yona', '그 말은 사실처럼 들리지만 사람들의 숨을 더 빠르게 만듭니다.'),
        line('mira', '공포가 첫 해석이 되면 방금 지나온 구원도 멀어집니다.')
      ])
    ]
  });

  node('wilderness_02_bitter_water', 2, {
    location: '마라의 물가',
    bible: '출애굽기 15:23–24',
    title: '쓴 물 앞에서',
    day: '마라에 이른 날',
    place: '마라',
    copy: [
      '마침내 물이 보입니다. 그러나 사람들이 달려가 마신 물은 쓴 물입니다.',
      '기대는 곧 실망으로 바뀌고, 실망은 곧 원망의 언어를 찾습니다.',
      '해방받은 공동체는 이제 애굽의 채찍이 아니라 광야의 결핍 앞에서 시험을 받습니다.'
    ],
    prompt: '쓴 물 앞에서 당신은 어떤 말을 선택하시겠습니까?',
    choices: [
      choice('ask_without_poison', '◎', '무엇을 마셔야 하는지 묻되 원망으로 몰아가지 않는다', { discernment: 1, trust: 1 }, { next: 'wilderness_03_tree_healing' }, [
        line('eli', '질문은 믿음의 반대말이 아닙니다. 다만 질문이 공동체를 찢는 말이 되지 않아야 합니다.'),
        line('mira', '쓴 물 앞에서도 말의 방향을 지킨 일을 기록하겠습니다.')
      ]),
      choice('hold_children_back', '🤝', '성급히 마시려는 아이들과 약한 사람들을 먼저 막아 세운다', { community: 1, discernment: 1 }, { next: 'wilderness_03_tree_healing' }, [
        line('yona', '물이 있다고 곧 생명은 아닙니다. 조급함이 더 큰 위험을 부를 수 있습니다.'),
        line('asar', '물의 상태를 살피겠습니다. 지금은 속도보다 분별입니다.')
      ]),
      choice('turn_crowd_against_moses', '◇', '모세가 우리를 속였다고 사람들을 몰아붙인다', { fear: 2, scatter: 1, trust: -1 }, { ending: 'bad_wilderness_bitter_murmur' }, [
        line('eli', '그 말은 갈증을 해석하는 방식이 아니라 공동체를 찢는 방식입니다.'),
        line('mira', '쓴 물보다 더 쓰게 남는 것은 하나님이 이끄시는 길을 조롱한 기억입니다.')
      ])
    ]
  });

  node('wilderness_03_tree_healing', 3, {
    location: '마라의 물가',
    bible: '출애굽기 15:25–26',
    title: '나무가 던져진 물',
    day: '쓴 물이 단물이 된 날',
    place: '마라',
    copy: [
      '모세가 여호와께 부르짖자, 하나님은 한 나무를 보이십니다.',
      '나무가 물에 던져지자 쓴 물은 마실 수 있는 물이 됩니다.',
      '치유된 물 앞에서 공동체는 무엇을 기억해야 할지 결정해야 합니다.'
    ],
    prompt: '단물이 된 마라에서 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('remember_healer', '✦', '하나님이 치료하시는 분임을 기억하자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('mira', '치료하시는 하나님이라는 기억은 광야의 다음 결핍 앞에서도 필요할 것입니다.'),
        line('eli', '물이 달아진 것보다 중요한 것은 백성이 누구께 속했는지를 다시 배운 일입니다.')
      ]),
      choice('teach_the_test', '▤', '이 사건을 시험과 가르침으로 정리해 공동체에 전한다', { discernment: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('asar', '광야의 사건은 우연한 위기가 아니라 길 위의 수업일 수 있습니다.'),
        line('mira', '사건을 해석하는 말이 있어야 다음 세대가 믿음의 기록으로 듣습니다.')
      ]),
      choice('drink_and_forget', '☾', '물을 마셨으니 된 일이라며 조용히 지나간다', { memory: -1, delay: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('mira', '마신 물은 몸을 살리지만 잊힌 사건은 공동체를 살리지 못합니다.'),
        line('eli', '기억하지 않은 은혜는 다음 결핍 앞에서 쉽게 사라집니다.')
      ])
    ]
  });

  node('wilderness_04_elim_rest', 4, {
    location: '엘림의 샘과 종려나무',
    bible: '출애굽기 15:27',
    title: '열두 샘과 일흔 종려',
    day: '엘림에 머문 날',
    place: '엘림',
    copy: [
      '마라를 지나 엘림에 이르자 열두 샘과 일흔 그루의 종려나무가 백성을 맞이합니다.',
      '광야에도 쉼의 자리가 있습니다. 그러나 쉼은 목적지가 아니라 다음 길을 준비하는 은혜입니다.',
      '풍성한 물과 그늘 앞에서 마음은 감사로 열릴 수도 있고, 여기가 끝이라고 착각할 수도 있습니다.'
    ],
    prompt: '엘림의 쉼 앞에서 당신은 어떻게 머무시겠습니까?',
    choices: [
      choice('rest_with_gratitude', '✦', '쉼을 감사로 받고 다음 길을 준비한다', { trust: 1, memory: 1 }, { next: 'wilderness_05_sin_hunger' }, [
        line('eli', '쉼은 멈추라는 허락이면서 다시 걸으라는 준비입니다.'),
        line('mira', '엘림의 물도 기록하겠습니다. 광야는 결핍만이 아니라 공급의 장소이기도 합니다.')
      ]),
      choice('organize_camp', '🤝', '각 장막의 필요를 살피고 질서 있게 쉬게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_05_sin_hunger' }, [
        line('yona', '쉼에도 질서가 필요합니다. 약한 사람부터 회복되어야 전체가 다시 걸을 수 있습니다.'),
        line('asar', '다음 이동을 위해 물과 짐을 확인하겠습니다.')
      ]),
      choice('refuse_to_move_again', '☾', '이제 더는 움직이고 싶지 않다고 말한다', { delay: 1, trust: -1 }, { next: 'wilderness_05_sin_hunger' }, [
        line('asar', '그늘이 좋다고 길을 잊으면 광야는 곧 다시 감옥이 됩니다.'),
        line('eli', '쉼이 목적지가 되면 부르심의 방향이 흐려집니다.')
      ])
    ]
  });

  node('wilderness_05_sin_hunger', 5, {
    location: '신 광야의 진영',
    bible: '출애굽기 16:1–3',
    title: '고기 가마의 기억',
    day: '둘째 달 보름',
    place: '신 광야',
    copy: [
      '엘림을 떠난 뒤 공동체는 신 광야에 이릅니다. 먹을 것이 줄어들자 사람들의 기억은 애굽의 고기 가마와 떡으로 돌아갑니다.',
      '노예의 땅이 갑자기 풍요로운 식탁처럼 말해집니다.',
      '고통의 기억은 굶주림 앞에서 쉽게 미화됩니다.'
    ],
    prompt: '배고픔이 애굽의 기억을 바꿀 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('name_the_distortion', '▤', '애굽의 기억이 미화되고 있음을 조심스럽게 짚는다', { memory: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, [
        line('mira', '배고픔은 과거를 편집합니다. 노예의 식탁을 풍요로만 기억하면 해방의 의미가 흐려집니다.'),
        line('eli', '진실을 말하되 굶주린 사람을 정죄하지 않는 태도가 필요합니다.')
      ]),
      choice('listen_to_hunger', '🤝', '원망을 꾸짖기 전에 실제 배고픔을 살핀다', { community: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, [
        line('yona', '배고픔은 실제입니다. 실제 결핍을 외면하면 바른 말도 사람을 더 아프게 합니다.'),
        line('eli', '긍휼 없는 교훈은 공동체를 세우지 못합니다.')
      ]),
      choice('join_egypt_longing', '☾', '차라리 애굽에 있었으면 나았다고 함께 말한다', { fear: 1, trust: -1, memory: -1 }, { next: 'wilderness_06_promised_bread' }, [
        line('mira', '그 말은 배고픔의 언어이지만 기억을 거꾸로 돌리는 말이기도 합니다.'),
        line('asar', '애굽을 안전으로 부르기 시작하면 다음 위기에서 발걸음이 뒤로 향할 수 있습니다.')
      ])
    ]
  });

  node('wilderness_06_promised_bread', 6, {
    location: '저녁을 기다리는 진영',
    bible: '출애굽기 16:4–12',
    title: '하늘에서 내릴 양식',
    day: '약속이 선포된 저녁',
    place: '신 광야 진영',
    copy: [
      '하나님은 하늘에서 양식을 비같이 내리겠다고 말씀하십니다.',
      '백성은 날마다 나가서 그날 먹을 만큼 거두어야 합니다.',
      '양식의 약속은 동시에 시험입니다. 많이 쌓아두는 방식이 아니라 날마다 받는 방식으로 살아야 합니다.'
    ],
    prompt: '하늘 양식의 약속 앞에서 당신은 무엇을 준비하시겠습니까?',
    choices: [
      choice('prepare_daily_trust', '✦', '날마다 거두라는 말씀을 믿고 사람들에게 차분히 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('eli', '날마다 받는 훈련은 광야의 중심 수업입니다. 많이 쌓는 마음보다 매일 믿는 마음이 필요합니다.'),
        line('mira', '양식은 공급이면서 시험입니다. 이 말씀을 분명히 기록하겠습니다.')
      ]),
      choice('make_orderly_groups', '🤝', '아침에 각 장막이 질서 있게 나가도록 무리를 나눈다', { community: 1, discernment: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('yona', '모두가 굶주릴수록 공평한 질서가 필요합니다.'),
        line('asar', '해 뜨기 전 동선을 살펴두겠습니다.')
      ]),
      choice('plan_extra_storage', '☾', '혹시 모르니 몰래 더 많이 저장할 계획을 세운다', { fear: 1, delay: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('mira', '두려움은 준비처럼 보일 때가 있습니다. 그러나 말씀과 다른 준비는 곧 불신의 흔적이 됩니다.'),
        line('eli', '미리 쌓아두려는 마음은 이해되지만 이번 시험은 바로 그 마음을 겨눕니다.')
      ])
    ]
  });

  node('wilderness_07_quail_evening', 7, {
    location: '메추라기가 덮인 저녁',
    bible: '출애굽기 16:13',
    title: '저녁의 메추라기',
    day: '양식이 온 첫 저녁',
    place: '신 광야 진영',
    copy: [
      '저녁이 되자 메추라기가 진영을 덮습니다.',
      '굶주린 사람들의 눈에 놀라움과 안도감이 동시에 떠오릅니다.',
      '공급 앞에서도 사람의 마음은 감사와 탐욕 사이에서 흔들립니다.'
    ],
    prompt: '첫 공급을 본 당신은 어떻게 행동하시겠습니까?',
    choices: [
      choice('share_evening_food', '🤝', '약한 사람들에게 먼저 돌아가도록 나눔을 돕는다', { community: 1, trust: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('yona', '공급이 왔을 때 누가 먼저 먹는지가 공동체의 성격을 드러냅니다.'),
        line('eli', '은혜는 독점될 때 곧 탐욕으로 변합니다.')
      ]),
      choice('give_thanks', '✦', '하나님이 들으셨음을 고백하며 감사한다', { trust: 1, memory: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('mira', '원망을 들으셨음에도 먹이신 하나님을 기록하겠습니다.'),
        line('eli', '감사는 다음 아침의 순종을 준비시킵니다.')
      ]),
      choice('grab_first', '☾', '사람들이 몰리기 전에 내 몫부터 챙긴다', { community: -1, fear: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('yona', '조급함이 번지면 공급 앞에서도 싸움이 납니다.'),
        line('mira', '두려움이 손을 빠르게 만들었지만 그 손이 이웃의 몫을 가릴 수 있습니다.')
      ])
    ]
  });

  node('wilderness_08_manna_morning', 8, {
    location: '이슬이 걷힌 광야',
    bible: '출애굽기 16:14–18',
    title: '이것이 무엇이냐',
    day: '만나가 내린 아침',
    place: '진영 바깥',
    copy: [
      '아침 이슬이 걷히자 작고 둥글며 서리 같이 가는 것이 광야 지면에 놓여 있습니다.',
      '사람들은 묻습니다. 이것이 무엇이냐.',
      '많이 거둔 사람도 남지 않고 적게 거둔 사람도 부족하지 않습니다.'
    ],
    prompt: '만나를 거두는 아침, 당신은 어떤 기준을 따르시겠습니까?',
    choices: [
      choice('gather_as_commanded', '✦', '먹을 만큼만 거두라는 말씀을 따른다', { trust: 1, discernment: 1 }, { next: 'wilderness_09_measure_test' }, [
        line('asar', '말씀의 기준이 분명합니다. 필요만큼 거두는 것이 오늘의 분별입니다.'),
        line('eli', '순종은 때로 양을 조절하는 일처럼 아주 실제적인 모습으로 나타납니다.')
      ]),
      choice('help_equal_measure', '🤝', '적게 거둔 집이 부족하지 않도록 살핀다', { community: 1, memory: 1 }, { next: 'wilderness_09_measure_test' }, [
        line('yona', '만나의 기적은 개인의 바구니뿐 아니라 공동체의 균형에서도 드러납니다.'),
        line('mira', '많고 적음이 은혜 안에서 조정되는 장면을 기록하겠습니다.')
      ]),
      choice('secretly_overgather', '◇', '가족을 위해 몰래 더 많이 거두어 숨겨 둔다', { fear: 2, trust: -1, delay: 1 }, { ending: 'bad_rotten_manna' }, [
        line('mira', '두려움은 사랑처럼 위장될 수 있습니다. 그러나 말씀을 거슬러 숨긴 것은 아침까지 견디지 못할 것입니다.'),
        line('eli', '쌓아 둔 양식이 썩으면 마음속 불신도 함께 드러납니다.')
      ])
    ]
  });

  node('wilderness_09_measure_test', 9, {
    location: '오멜을 재는 자리',
    bible: '출애굽기 16:16–21',
    title: '남지도 모자라지도 않게',
    day: '만나를 재는 날',
    place: '각 장막 앞',
    copy: [
      '사람들은 오멜로 만나를 잽니다.',
      '그러나 몇 사람은 다음 날까지 남겨 둡니다. 아침이 되자 그것은 벌레가 생기고 냄새가 납니다.',
      '하루치 양식은 하루치 신뢰를 요구합니다.'
    ],
    prompt: '하루치 양식의 시험 앞에서 당신은 무엇을 말하시겠습니까?',
    choices: [
      choice('teach_daily_dependence', '▤', '오늘 받은 양식으로 오늘을 살자고 가르친다', { memory: 1, trust: 1 }, { next: 'wilderness_10_sabbath_instruction' }, [
        line('mira', '날마다 받는 삶은 광야의 언어입니다. 이 말은 오래 남겨야 합니다.'),
        line('eli', '내일을 부정하는 것이 아니라 내일도 하나님께 속했다는 고백입니다.')
      ]),
      choice('remove_rotten_food', '🤝', '썩은 것을 치우고 사람들이 부끄러움에 갇히지 않게 돕는다', { community: 1, fear: -1 }, { next: 'wilderness_10_sabbath_instruction' }, [
        line('yona', '실패한 사람도 공동체 안에서 다시 배워야 합니다.'),
        line('eli', '책망보다 회복이 먼저 필요한 순간입니다.')
      ]),
      choice('mock_the_failed', '☾', '말씀을 어긴 사람들을 조롱하며 우월감을 드러낸다', { community: -1, memory: -1 }, { next: 'wilderness_10_sabbath_instruction' }, [
        line('mira', '조롱은 교훈을 남기지 못합니다. 실패가 드러난 자리에도 겸손이 필요합니다.'),
        line('eli', '다른 사람의 불신을 비웃는 마음도 또 다른 시험입니다.')
      ])
    ]
  });

  node('wilderness_10_sabbath_instruction', 10, {
    location: '여섯째 날의 진영',
    bible: '출애굽기 16:22–26',
    title: '안식을 위한 두 배의 양식',
    day: '여섯째 날',
    place: '진영의 장막들',
    copy: [
      '여섯째 날에는 두 배의 양식이 거두어집니다.',
      '이번에는 남겨 두어도 썩지 않습니다. 안식일에는 들판에 만나가 없을 것입니다.',
      '광야의 공급은 노동의 리듬까지 새롭게 가르칩니다.'
    ],
    prompt: '안식일의 양식 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('honor_sabbath_rhythm', '✦', '안식일에는 거두러 나가지 말라고 분명히 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_11_sabbath_field' }, [
        line('eli', '안식은 아무것도 없는 날이 아니라 하나님이 이미 준비하신 날입니다.'),
        line('mira', '광야의 달력에 신뢰가 새겨지고 있습니다.')
      ]),
      choice('help_prepare_double', '🤝', '각 장막이 두 배의 양식을 질서 있게 준비하도록 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_11_sabbath_field' }, [
        line('yona', '안식도 준비가 필요합니다. 약한 집이 빠지지 않게 살피겠습니다.'),
        line('asar', '내일 나가지 않아도 되도록 오늘 필요한 것을 확인하겠습니다.')
      ]),
      choice('doubt_empty_field', '☾', '혹시 모르니 안식일에도 들판을 확인하자고 말한다', { fear: 1, trust: -1 }, { next: 'wilderness_11_sabbath_field' }, [
        line('mira', '확인은 분별처럼 보이지만, 말씀을 거슬러 움직이면 불신이 됩니다.'),
        line('eli', '안식일의 빈 들판은 실패가 아니라 약속의 질서입니다.')
      ])
    ]
  });

  node('wilderness_11_sabbath_field', 11, {
    location: '안식일 아침의 빈 들판',
    bible: '출애굽기 16:27–30',
    title: '빈 들판을 향한 발',
    day: '첫 안식일',
    place: '진영 바깥',
    copy: [
      '안식일 아침에도 몇 사람이 들판으로 나갑니다.',
      '그러나 그들이 찾은 것은 만나가 아니라 빈 땅입니다.',
      '빈 들판은 공급의 실패가 아니라 말씀을 신뢰하지 못한 마음을 드러냅니다.'
    ],
    prompt: '빈 들판에서 돌아온 사람들을 보며 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('call_back_to_rest', '✦', '쉼의 명령으로 다시 돌아오자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_12_rephidim_no_water' }, [
        line('eli', '안식은 게으름이 아니라 하나님의 공급 안에 머무는 믿음입니다.'),
        line('mira', '빈 들판의 의미를 기록하겠습니다. 없는 날도 은혜의 질서 안에 있습니다.')
      ]),
      choice('restore_without_shame', '🤝', '나갔던 사람들을 비난보다 회복으로 맞이한다', { community: 1, fear: -1 }, { next: 'wilderness_12_rephidim_no_water' }, [
        line('yona', '공개적인 수치심은 다음 순종을 더 어렵게 만듭니다.'),
        line('eli', '공동체는 실패한 사람을 다시 배움의 자리로 불러야 합니다.')
      ]),
      choice('lead_more_searching', '◇', '아직 남은 곳이 있을지 모른다며 더 멀리 찾아 나선다', { fear: 2, trust: -1, delay: 1 }, { ending: 'bad_sabbath_rebellion' }, [
        line('asar', '더 멀리 가도 만나가 없는 것은 같습니다. 문제는 들판의 거리가 아니라 말씀을 믿지 못하는 마음입니다.'),
        line('mira', '안식일의 빈 들판을 거부한 발걸음으로 기록될 것입니다.')
      ])
    ]
  });

  node('wilderness_12_rephidim_no_water', 12, {
    location: '르비딤의 마른 진영',
    bible: '출애굽기 17:1',
    title: '다시 물이 없는 곳',
    day: '르비딤에 장막을 친 날',
    place: '르비딤',
    copy: [
      '공동체는 르비딤에 장막을 칩니다. 그러나 그곳에도 마실 물은 없습니다.',
      '마라를 지나고 만나를 먹었지만, 결핍은 다시 찾아옵니다.',
      '반복되는 부족함 앞에서 이전의 기억은 쉽게 흐려집니다.'
    ],
    prompt: '다시 물이 없을 때 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('recall_marah_and_manna', '▤', '마라와 만나의 일을 떠올리며 성급한 원망을 막는다', { memory: 1, trust: 1 }, { next: 'wilderness_13_massah_meribah' }, [
        line('mira', '반복되는 결핍 앞에서 반복되는 기억이 필요합니다.'),
        line('eli', '어제의 은혜가 오늘 자동으로 믿음이 되지는 않습니다. 다시 기억해야 합니다.')
      ]),
      choice('guard_the_vulnerable', '🤝', '아이와 노인의 갈증을 먼저 살피며 대열을 안정시킨다', { community: 1, discernment: 1 }, { next: 'wilderness_13_massah_meribah' }, [
        line('yona', '갈증이 심할수록 가장 약한 사람부터 무너집니다.'),
        line('asar', '진영의 불안을 살피겠습니다. 말보다 먼저 물을 찾는 손들이 필요합니다.')
      ]),
      choice('spread_absence_question', '☾', '여호와가 우리 중에 계시다면 왜 물이 없느냐고 퍼뜨린다', { fear: 1, trust: -1, scatter: 1 }, { next: 'wilderness_13_massah_meribah' }, [
        line('mira', '질문은 필요하지만, 질문이 곧 조롱이 되면 공동체를 흔듭니다.'),
        line('eli', '하나님의 임재를 결핍 하나로 판정하려는 마음이 위험합니다.')
      ])
    ]
  });

  node('wilderness_13_massah_meribah', 13, {
    location: '다툼이 번진 르비딤',
    bible: '출애굽기 17:2–4',
    title: '맛사와 므리바의 소리',
    day: '다툼이 일어난 날',
    place: '르비딤 진영',
    copy: [
      '사람들은 모세와 다투며 물을 요구합니다.',
      '원망은 점점 거칠어지고, 누군가는 돌을 손에 쥐기 시작합니다.',
      '목마름은 실제이지만, 공동체는 이제 하나님을 시험하는 자리 가까이 서 있습니다.'
    ],
    prompt: '다툼이 폭력으로 번지려 할 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('lower_the_stones', '🤝', '돌을 든 사람들 사이에 서서 폭력을 늦춘다', { community: 1, fear: -1 }, { next: 'wilderness_14_rock_command' }, [
        line('yona', '폭력이 시작되면 물의 문제는 더 깊은 상처로 번집니다.'),
        line('eli', '몸으로 사이에 서는 일도 증인의 선택입니다.')
      ]),
      choice('name_testing_god', '▤', '우리가 하나님을 시험하는 자리에 서 있다고 말한다', { discernment: 1, memory: 1 }, { next: 'wilderness_14_rock_command' }, [
        line('mira', '맛사와 므리바라는 이름은 그냥 지명이 아니라 마음의 기록이 될 것입니다.'),
        line('asar', '지금 필요한 것은 더 큰 소리가 아니라 바른 이름 붙이기입니다.')
      ]),
      choice('join_stone_crowd', '◇', '돌을 든 무리에 섞여 모세를 몰아세운다', { fear: 2, scatter: 1, trust: -2 }, { ending: 'bad_massah_meribah' }, [
        line('eli', '그 선택은 물 없음보다 깊은 불신을 드러냅니다.'),
        line('mira', '맛사와 므리바는 폭력으로 하나님을 시험한 기억으로 남을 것입니다.')
      ])
    ]
  });

  node('wilderness_14_rock_command', 14, {
    location: '호렙의 반석 앞',
    bible: '출애굽기 17:5–6',
    title: '반석 앞에 선 장로들',
    day: '하나님이 길을 보이신 날',
    place: '호렙의 반석',
    copy: [
      '하나님은 모세에게 지팡이를 들고 장로들과 함께 반석 앞으로 가라고 말씀하십니다.',
      '바다를 쳤던 지팡이가 이번에는 마른 반석 앞에 섭니다.',
      '백성은 멀리서 그 장면을 바라보며 물 없음의 끝을 기다립니다.'
    ],
    prompt: '반석 앞의 기다림에서 당신은 무엇을 선택하시겠습니까?',
    choices: [
      choice('wait_with_elders', '✦', '장로들의 증언을 신뢰하며 공동체를 기다리게 한다', { trust: 1, discernment: 1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('eli', '하나님은 은밀히만 일하지 않으시고 증인들 앞에서 일하십니다.'),
        line('mira', '장로들이 본 일을 공동체가 기억하게 될 것입니다.')
      ]),
      choice('hold_the_camp', '🤝', '진영이 우르르 몰려가지 않도록 질서를 잡는다', { community: 1, discernment: 1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('yona', '공급을 기다리는 순간에도 질서가 필요합니다.'),
        line('asar', '사람들이 반석 쪽으로 밀려가면 더 큰 혼란이 생길 수 있습니다.')
      ]),
      choice('demand_proof_now', '☾', '지금 당장 보이지 않으면 믿을 수 없다고 말한다', { fear: 1, trust: -1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('mira', '증거를 요구하는 말이 계속 커지면, 기다림은 곧 시험이 됩니다.'),
        line('eli', '보이기 전에는 믿지 못하겠다는 마음은 광야의 반복되는 위험입니다.')
      ])
    ]
  });

  node('wilderness_15_water_from_rock', 15, {
    location: '물이 터진 반석',
    bible: '출애굽기 17:6',
    title: '반석에서 흐르는 물',
    day: '물이 터진 날',
    place: '호렙',
    copy: [
      '지팡이가 반석을 치자 물이 흘러나옵니다.',
      '목마른 진영은 물을 마시고 숨을 돌립니다.',
      '그러나 이 물은 단순한 해결이 아니라 여호와께서 공동체 가운데 계신가라는 질문에 대한 응답입니다.'
    ],
    prompt: '반석의 물 앞에서 당신은 어떻게 증언하시겠습니까?',
    choices: [
      choice('testify_presence', '✦', '여호와께서 우리 가운데 계심을 증언한다', { trust: 1, memory: 1 }, { next: 'wilderness_16_wilderness_memory' }, [
        line('mira', '이 물은 목을 축인 사건이면서 임재의 증언입니다.'),
        line('eli', '하나님은 결핍 속에서도 자기 백성을 버리지 않으셨습니다.')
      ]),
      choice('serve_the_thirsty', '🤝', '약한 사람들에게 물이 먼저 닿도록 돕는다', { community: 1, trust: 1 }, { next: 'wilderness_16_wilderness_memory' }, [
        line('yona', '물은 흘러나왔지만 나눔의 질서가 필요합니다.'),
        line('eli', '은혜가 공동체 안에서 바르게 흐르게 하는 것도 중요한 순종입니다.')
      ]),
      choice('drink_and_move_on', '☾', '물을 마시고도 이 사건의 의미를 깊이 생각하지 않는다', { memory: -1, delay: 1 }, { next: 'wilderness_16_wilderness_memory' }, [
        line('mira', '마신 물만 남고 기억이 사라지면 다음 두려움은 다시 처음처럼 찾아옵니다.'),
        line('asar', '광야에서는 지나간 사건을 해석하지 않으면 같은 자리로 돌아옵니다.')
      ])
    ]
  });

  node('wilderness_16_wilderness_memory', 16, {
    location: '호렙을 향한 길목',
    bible: '출애굽기 17:7; 19:1–2',
    title: '질문을 지나 산으로',
    day: '시내산을 향해 나아가는 날',
    place: '시내 광야 길목',
    copy: [
      '그곳은 맛사와 므리바라 불리게 됩니다. 여호와께서 우리 중에 계신가 안 계신가라는 질문이 진영에 깊이 남았습니다.',
      '그러나 여정은 거기서 끝나지 않습니다. 공동체는 르비딤을 떠나 시내 광야로 나아갑니다.',
      '물을 주신 하나님은 이제 산 아래에서 백성을 언약의 자리로 부르실 것입니다.'
    ],
    prompt: '반석의 물 이후, 당신은 이 길을 어떻게 기억하시겠습니까?',
    choices: [
      choice('carry_memory_to_sinai', '✦', '마라와 만나와 반석의 물을 기억하며 산 아래로 나아간다', { memory: 1, trust: 1 }, { next: 'wilderness_17_sinai_arrival' }, [
        line('mira', '광야의 전반부는 시내산 언약을 듣기 위한 기억의 길이 됩니다.'),
        line('eli', '은혜를 기억하는 백성만이 언약의 무게를 들을 준비를 합니다.')
      ]),
      choice('help_people_move', '🤝', '지친 사람들을 살피며 함께 시내산으로 이동한다', { community: 1, discernment: 1 }, { next: 'wilderness_17_sinai_arrival' }, [
        line('yona', '산 아래로 가는 길도 공동체의 길입니다. 느린 사람도 함께 가야 합니다.'),
        line('asar', '진영이 흩어지지 않게 길과 물을 확인하겠습니다.')
      ]),
      choice('keep_question_as_grudge', '☾', '여호와께서 계신지 아직도 모르겠다며 의심을 원망으로 품는다', { fear: 1, trust: -1, memory: -1 }, { next: 'wilderness_17_sinai_arrival' }, [
        line('mira', '질문은 남을 수 있습니다. 그러나 질문이 원망으로 굳으면 언약의 말씀도 멀게 들립니다.'),
        line('eli', '흔들림이 곧 실패는 아니지만, 흔들림을 붙들고 가면 다음 자리에서 더 큰 시험이 됩니다.')
      ])
    ]
  });

  node('wilderness_17_sinai_arrival', 17, {
    location: '시내산 아래 진영',
    bible: '출애굽기 19:1–2',
    title: '산 아래에 장막을 치다',
    day: '셋째 달의 도착',
    place: '시내 광야',
    copy: [
      '이스라엘은 시내 광야에 이르고 산 앞에 장막을 칩니다.',
      '바다와 광야의 결핍을 지나온 공동체가 이제 하나님의 산 아래에 섭니다.',
      '증인인 당신은 산을 올려다보며 이 길이 단순한 탈출이 아니라 부르심의 길이었음을 느낍니다.'
    ],
    prompt: '시내산 아래에서 당신은 어떤 마음으로 진영에 서시겠습니까?',
    choices: [
      choice('remember_deliverance_path', '▤', '해방과 공급의 길을 정리해 공동체에 들려준다', { memory: 1, trust: 1 }, { next: 'wilderness_18_covenant_offer' }, [
        line('mira', '출애굽과 광야의 기억은 언약의 자리에서 다시 해석되어야 합니다.'),
        line('eli', '구원받은 백성은 이제 어떻게 살아야 하는지를 들어야 합니다.')
      ]),
      choice('settle_the_camp', '🤝', '산 아래 진영이 두려움에 흩어지지 않도록 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_18_covenant_offer' }, [
        line('yona', '새 장소에 도착하면 불안도 함께 움직입니다. 진영을 안정시키겠습니다.'),
        line('asar', '산과 진영 사이의 경계를 살펴야 합니다.')
      ]),
      choice('treat_as_destination', '☾', '드디어 도착했으니 이제 어려운 명령은 끝났다고 말한다', { delay: 1, memory: -1 }, { next: 'wilderness_18_covenant_offer' }, [
        line('eli', '도착은 끝이 아닙니다. 하나님은 산 아래에서 백성을 다시 부르실 것입니다.'),
        line('mira', '쉼을 결말로 착각하면 언약의 부름을 놓칠 수 있습니다.')
      ])
    ]
  });

  node('wilderness_18_covenant_offer', 18, {
    location: '언약의 말씀이 전해진 진영',
    bible: '출애굽기 19:3–8',
    title: '내 소유가 되리라',
    day: '언약의 제안이 들린 날',
    place: '시내산 아래',
    copy: [
      '모세는 산에 올라 하나님의 말씀을 듣고 내려옵니다.',
      '하나님은 백성이 그의 말을 잘 듣고 언약을 지키면 모든 민족 중에서 그의 소유가 되며 제사장 나라와 거룩한 백성이 될 것이라고 말씀하십니다.',
      '백성은 “여호와께서 명령하신 대로 우리가 다 행하리이다”라고 응답합니다.'
    ],
    prompt: '언약의 제안 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_covenant_weight', '✦', '구원받은 백성답게 말씀을 듣고 살겠다고 응답한다', { trust: 1, memory: 1 }, { next: 'wilderness_19_thunder_and_fear' }, [
        line('eli', '언약은 구원을 얻기 위한 거래가 아니라 구원받은 백성의 삶입니다.'),
        line('mira', '이 응답은 가볍게 기록될 수 없습니다. 산 아래의 말은 훗날 시험을 받을 것입니다.')
      ]),
      choice('teach_identity', '▤', '제사장 나라와 거룩한 백성의 의미를 함께 되새긴다', { discernment: 1, memory: 1 }, { next: 'wilderness_19_thunder_and_fear' }, [
        line('mira', '정체성을 모르면 명령은 짐으로만 들립니다.'),
        line('asar', '이 말씀은 산 아래 공동체가 누구인지 새롭게 정하는 말입니다.')
      ]),
      choice('answer_too_lightly', '☾', '무슨 말이든 다 하겠다고 쉽게 따라 외친다', { delay: 1, discernment: -1 }, { next: 'wilderness_19_thunder_and_fear' }, [
        line('eli', '응답은 필요하지만 가벼운 입술은 오래 버티지 못합니다.'),
        line('mira', '오늘의 말이 진짜 기억이 되려면 그 무게를 알아야 합니다.')
      ])
    ]
  });

  node('wilderness_19_thunder_and_fear', 19, {
    location: '우레와 번개가 덮은 산 아래',
    bible: '출애굽기 19:16–20; 20:18–21',
    title: '두려운 계시',
    day: '셋째 날 아침',
    place: '시내산 경계',
    copy: [
      '우레와 번개와 빽빽한 구름이 산 위에 있고 나팔 소리가 크게 울립니다.',
      '백성은 떨며 멀리 섭니다. 하나님을 경외하는 두려움과 달아나고 싶은 공포가 뒤섞입니다.',
      '말씀은 가까이 오지만, 사람의 마음은 그 거룩함 앞에서 흔들립니다.'
    ],
    prompt: '두려운 계시 앞에서 당신은 어떤 두려움을 선택하시겠습니까?',
    choices: [
      choice('fear_with_reverence', '✦', '공포로 도망치지 않고 거룩하신 하나님을 경외한다', { trust: 1, discernment: 1 }, { next: 'wilderness_20_waiting_for_moses' }, [
        line('eli', '경외는 도망이 아니라 하나님 앞에 바로 서는 두려움입니다.'),
        line('mira', '산의 소리와 백성의 떨림을 함께 기록하겠습니다.')
      ]),
      choice('keep_boundary', '🤝', '두려워하는 사람들을 진정시키고 산의 경계를 지키게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_20_waiting_for_moses' }, [
        line('yona', '경계를 지키는 것은 두려움의 질서입니다.'),
        line('asar', '사람들이 밀려가거나 흩어지지 않도록 길목을 보겠습니다.')
      ]),
      choice('want_distance_only', '☾', '하나님의 음성은 너무 두렵다며 멀어지는 것만 원한다', { fear: 1, trust: -1 }, { next: 'wilderness_20_waiting_for_moses' }, [
        line('mira', '두려움이 경외가 아니라 거리두기만 되면 말씀은 점점 남의 일이 됩니다.'),
        line('eli', '거룩함 앞에서 떨 수 있지만, 떨림이 거절이 되어서는 안 됩니다.')
      ])
    ]
  });

  node('wilderness_20_waiting_for_moses', 20, {
    location: '모세가 올라간 뒤의 진영',
    bible: '출애굽기 24:12–18; 32:1',
    title: '기다림이 길어질 때',
    day: '사십 일이 가까워지는 날들',
    place: '시내산 아래 진영',
    copy: [
      '모세는 산 위로 올라가고 구름은 산을 덮습니다.',
      '날이 지나도 모세는 내려오지 않습니다. 처음의 경외는 점점 불안으로 바뀝니다.',
      '기다림이 길어지자 사람들은 보이는 인도자를 원하기 시작합니다.'
    ],
    prompt: '기다림이 불안으로 변할 때 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('guard_waiting', '✦', '모세가 늦어 보여도 언약의 말씀을 기억하며 기다리자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_21_pressure_for_visible_god' }, [
        line('eli', '기다림은 언약의 첫 시험이 될 수 있습니다.'),
        line('mira', '말씀을 받은 직후에도 기다림에 실패할 수 있다는 사실을 기록해야 합니다.')
      ]),
      choice('listen_to_anxiety', '🤝', '불안한 사람들의 말을 듣되 결론을 우상으로 몰지 않는다', { community: 1, discernment: 1 }, { next: 'wilderness_21_pressure_for_visible_god' }, [
        line('yona', '불안을 무시하면 군중은 더 거칠어집니다. 그러나 불안이 곧 결정권자가 되어서는 안 됩니다.'),
        line('asar', '진영의 분위기가 빠르게 움직이고 있습니다. 말을 잘 골라야 합니다.')
      ]),
      choice('say_he_is_gone', '☾', '모세는 사라졌다고 단정하며 다른 길을 찾자고 말한다', { fear: 1, scatter: 1, trust: -1 }, { next: 'wilderness_21_pressure_for_visible_god' }, [
        line('mira', '기다림의 빈자리를 성급한 결론으로 채우면 다음 선택은 더 위험해집니다.'),
        line('eli', '보이지 않는 시간에 무엇을 붙드는지가 언약의 무게를 드러냅니다.')
      ])
    ]
  });

  node('wilderness_21_pressure_for_visible_god', 21, {
    location: '아론의 장막 앞 군중',
    bible: '출애굽기 32:1–2',
    title: '우리를 인도할 신을 만들라',
    day: '군중이 몰려든 날',
    place: '진영 중앙',
    copy: [
      '백성은 아론에게 몰려와 말합니다. 우리를 위하여 우리를 인도할 신을 만들라.',
      '보이지 않는 하나님을 기다리는 일보다 손에 잡히는 형상을 가지는 일이 더 안전해 보이기 시작합니다.',
      '당신은 군중의 압력 속에서 쉽게 밀려갈 수 있는 자리에 서 있습니다.'
    ],
    prompt: '보이는 신을 요구하는 압력 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('refuse_visible_substitute', '✦', '보이는 형상이 하나님을 대신할 수 없다고 말한다', { trust: 1, discernment: 1 }, { next: 'wilderness_22_golden_calf_made' }, [
        line('eli', '그 말은 군중 속에서 작게 들릴 수 있지만, 언약의 중심을 지키는 말입니다.'),
        line('mira', '하나님을 형상으로 대체하려는 순간을 기록하겠습니다.')
      ]),
      choice('pull_back_neighbors', '🤝', '가까운 사람들만이라도 군중의 흐름에서 물러서게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_22_golden_calf_made' }, [
        line('yona', '전체를 막을 수 없어도 곁의 사람을 붙드는 일은 가능합니다.'),
        line('asar', '군중의 중심에서 한 걸음 물러서는 것만으로도 판단이 달라질 수 있습니다.')
      ]),
      choice('organize_the_demand', '◇', '사람들을 모아 형상을 만들 요구를 더 강하게 밀어붙인다', { fear: 2, scatter: 1, trust: -2 }, { ending: 'bad_golden_calf_leader' }, [
        line('mira', '당신은 불안을 우상 제작의 동력으로 바꾸었습니다.'),
        line('eli', '군중을 이끄는 힘이 언약을 거스르는 방향으로 쓰였습니다.')
      ])
    ]
  });

  node('wilderness_22_golden_calf_made', 22, {
    location: '금이 모이는 진영',
    bible: '출애굽기 32:2–4',
    title: '금송아지가 만들어지다',
    day: '귀고리가 모인 날',
    place: '시내산 아래',
    copy: [
      '사람들은 금 귀고리를 빼어 모읍니다. 금은 녹고 형상은 점점 송아지의 모습이 됩니다.',
      '누군가는 이것이 우리를 애굽에서 인도해 낸 신이라고 말합니다.',
      '해방의 하나님을 보이는 형상으로 바꾸는 말이 진영 안에 퍼집니다.'
    ],
    prompt: '금송아지가 만들어지는 장면 앞에서 당신은 무엇을 하시겠습니까?',
    choices: [
      choice('name_the_false_memory', '▤', '이 형상이 우리를 구원한 것이 아니라고 기억을 바로잡는다', { memory: 1, discernment: 1 }, { next: 'wilderness_23_feast_before_calf' }, [
        line('mira', '우상은 금으로만 만들어지지 않습니다. 왜곡된 기억으로도 만들어집니다.'),
        line('eli', '해방의 주체를 바꾸는 말은 공동체의 중심을 무너뜨립니다.')
      ]),
      choice('hide_the_vulnerable', '🤝', '두려워 휩쓸리는 사람들을 축제의 중심에서 멀리 데려간다', { community: 1, fear: -1 }, { next: 'wilderness_23_feast_before_calf' }, [
        line('yona', '지금은 논쟁보다 거리를 두는 일이 먼저일 수 있습니다.'),
        line('asar', '진영의 열기가 위험합니다. 물러날 길을 확보하겠습니다.')
      ]),
      choice('give_gold_willingly', '◇', '내 금도 내어놓고 모두와 함께 형상 제작을 돕는다', { trust: -2, memory: -2, fear: 1 }, { ending: 'bad_return_to_idols' }, [
        line('mira', '당신의 손이 해방의 기억을 우상의 재료로 넘겼습니다.'),
        line('eli', '보이는 안정이 언약의 하나님을 대신하는 순간입니다.')
      ])
    ]
  });

  node('wilderness_23_feast_before_calf', 23, {
    location: '송아지 앞의 제단',
    bible: '출애굽기 32:5–6',
    title: '우상 앞의 축제',
    day: '다음 날 아침',
    place: '금송아지 앞',
    copy: [
      '아론은 제단을 쌓고 여호와의 절일이라고 선포합니다.',
      '사람들은 번제를 드리고 먹고 마시며 뛰놉니다.',
      '종교의 언어가 우상 앞에 붙자, 많은 사람은 그것을 예배라고 착각합니다.'
    ],
    prompt: '우상 앞의 축제에서 당신은 어떤 선택을 하시겠습니까?',
    choices: [
      choice('withdraw_from_feast', '✦', '축제의 중심에서 물러나 이것은 예배가 아니라고 말한다', { trust: 1, discernment: 1 }, { next: 'wilderness_24_broken_tablets' }, [
        line('eli', '여호와의 이름을 붙였다고 모두 참 예배가 되는 것은 아닙니다.'),
        line('mira', '우상 숭배가 예배의 말로 포장되는 장면을 기록하겠습니다.')
      ]),
      choice('protect_the_uncertain', '🤝', '흔들리는 사람들을 모아 축제에서 떨어져 있게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_24_broken_tablets' }, [
        line('yona', '모든 사람을 막지는 못해도 휩쓸리는 사람을 붙드는 일은 필요합니다.'),
        line('asar', '진영의 소리가 커집니다. 물러선 사람들의 자리를 지키겠습니다.')
      ]),
      choice('join_the_feast', '◇', '여호와의 절기라면 괜찮다며 축제에 참여한다', { trust: -2, memory: -1, scatter: 1 }, { ending: 'bad_idol_feast' }, [
        line('mira', '하나님의 이름을 붙였지만 그 중심에는 우상이 서 있습니다.'),
        line('eli', '종교적 명분이 우상 숭배를 깨끗하게 만들지는 못합니다.')
      ])
    ]
  });

  node('wilderness_24_broken_tablets', 24, {
    location: '산 아래로 내려오는 길',
    bible: '출애굽기 32:7–20',
    title: '깨진 돌판',
    day: '모세가 내려온 날',
    place: '시내산 아래',
    copy: [
      '모세가 산에서 내려옵니다. 그의 손에는 증거의 두 돌판이 있습니다.',
      '그러나 진영의 춤과 송아지를 본 모세는 돌판을 산 아래에서 깨뜨립니다.',
      '언약의 말씀이 손에 있었지만, 산 아래의 공동체는 이미 언약을 깨뜨린 자리에 서 있었습니다.'
    ],
    prompt: '깨진 돌판 앞에서 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('confess_breach', '✦', '돌판이 깨진 것은 우리가 언약을 깬 표지임을 인정한다', { memory: 1, trust: 1 }, { next: 'wilderness_25_intercession_after_judgment' }, [
        line('mira', '깨진 돌판은 분노의 장면만이 아니라 언약 파기의 표지입니다.'),
        line('eli', '인정하는 것이 회개의 시작입니다.')
      ]),
      choice('gather_the_shaken', '🤝', '두려움에 떠는 사람들을 모아 회개의 자리로 이끈다', { community: 1, discernment: 1 }, { next: 'wilderness_25_intercession_after_judgment' }, [
        line('yona', '심판의 순간에도 사람을 회개의 자리로 모으는 일이 필요합니다.'),
        line('eli', '흩어지면 죄는 변명으로 남고, 모이면 회개의 말이 시작될 수 있습니다.')
      ]),
      choice('blame_only_leaders', '☾', '이 일은 지도자들 탓일 뿐 내 책임은 없다고 말한다', { memory: -1, trust: -1 }, { next: 'wilderness_25_intercession_after_judgment' }, [
        line('mira', '책임을 모두 밖으로 밀어내면 회개는 시작되지 않습니다.'),
        line('asar', '군중 속에 있었다는 사실도 가볍지 않습니다.')
      ])
    ]
  });

  node('wilderness_25_intercession_after_judgment', 25, {
    location: '심판 이후의 침묵',
    bible: '출애굽기 32:21–35',
    title: '중보와 상처',
    day: '죄가 드러난 뒤',
    place: '시내산 아래 진영',
    copy: [
      '모세는 백성의 죄를 책망하고 다시 여호와께 올라가 중보합니다.',
      '진영에는 상처와 두려움이 남습니다. 우상 숭배는 끝났지만 그 흔적은 쉽게 사라지지 않습니다.',
      '증인인 당신은 심판 이후에도 공동체가 어떻게 다시 언약 앞에 설 수 있는지를 보아야 합니다.'
    ],
    prompt: '심판과 중보의 시간에 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('stand_in_repentance', '✦', '핑계보다 회개가 먼저라고 고백한다', { trust: 1, memory: 1 }, { next: 'wilderness_26_covenant_remembered' }, [
        line('eli', '회개는 자기 방어를 내려놓고 하나님 앞에 서는 일입니다.'),
        line('mira', '중보의 시간은 죄를 가볍게 만드는 시간이 아니라 은혜의 무게를 배우는 시간입니다.')
      ]),
      choice('tend_the_wounded_camp', '🤝', '무너진 진영을 돌보며 다시 말씀을 들을 준비를 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_26_covenant_remembered' }, [
        line('yona', '상처 입은 공동체는 돌봄 없이는 다시 말씀 앞에 서기 어렵습니다.'),
        line('asar', '우상 숭배의 흔적이 남은 자리를 살피겠습니다.')
      ]),
      choice('minimize_the_sin', '☾', '모두 불안해서 그런 것이니 큰 죄는 아니었다고 넘긴다', { trust: -1, memory: -1, delay: 1 }, { next: 'wilderness_26_covenant_remembered' }, [
        line('mira', '상처를 줄이려는 말이 죄를 가볍게 만들 수 있습니다.'),
        line('eli', '불안은 이유가 될 수 있지만 우상 숭배를 의롭게 만들 수는 없습니다.')
      ])
    ]
  });

  node('wilderness_26_covenant_remembered', 26, {
    location: '다시 언약을 기억하는 진영',
    bible: '출애굽기 32:31–35',
    title: '다시 기억해야 할 언약',
    day: '산 아래의 마지막 밤',
    place: '시내산 아래',
    copy: [
      '시내산 아래의 광야는 쓴 물과 만나와 반석의 물만이 아니라 언약과 우상 숭배의 기억까지 품게 되었습니다.',
      '하나님은 백성의 죄를 가볍게 넘기지 않으시지만, 모세의 중보와 함께 길은 완전히 끝나지 않습니다.',
      '당신의 증언은 이제 결핍 앞의 신뢰를 넘어, 기다림과 두려움 속에서도 우상을 거부하고 언약을 기억하는 자리로 나아갑니다.'
    ],
    prompt: '광야의 증언을 어떻게 마무리하시겠습니까?',
    choices: [
      choice('testify_covenant_witness', '✦', '우상보다 언약을 기억하는 증언으로 남긴다', { trust: 1, memory: 1 }, { ending: 'true_wilderness_covenant_witness' }, [
        line('mira', '광야의 기록은 결핍의 기록을 넘어 언약의 기록이 되었습니다.'),
        line('eli', '당신은 하나님이 먹이시고 마시게 하실 뿐 아니라 거룩한 백성으로 부르신다는 사실을 증언했습니다.')
      ]),
      choice('keep_memory_with_wounds', '▤', '흔들린 공동체의 상처까지 함께 기록한다', { discernment: 1, memory: 1 }, { ending: 'faithful_wilderness_covenant_memory' }, [
        line('mira', '상처를 지우지 않는 기억도 신실한 증언입니다.'),
        line('asar', '다음 길은 이 기억을 품고 걸어야 합니다.')
      ]),
      choice('remain_wounded_but_follow', '☾', '두려움과 후회가 남지만 언약의 길을 떠나지 않는다', { trust: 1, fear: 1 }, { ending: 'wounded_wilderness_covenant_witness' }, [
        line('eli', '완전한 확신은 아니어도 돌아서지 않는 발걸음이 있습니다.'),
        line('yona', '상처가 남은 사람도 공동체와 함께 다시 걸을 수 있습니다.')
      ])
    ]
  });
})();
