(function applyWildernessStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  window.WILDERNESS_START_NODE_ID = 'wilderness_01_marah_thirst';

  const TOTAL_PROGRESS = 16;

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
      '아이들의 입술은 마르고, 짐승들의 걸음도 느려집니다. 해방의 길이 곧바로 풍요의 길은 아니라는 사실이 공동체를 짓누릅니다.',
      '당신은 모세가 아니라, 목마른 사람들 사이에서 흔들리는 이름 없는 증인입니다.'
    ],
    prompt: '목마름이 공동체를 흔들 때 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('steady_the_thirsty', '🤝', '가장 지친 사람들 곁에 서서 물을 나누어 마시게 한다', { community: 1, fear: -1 }, { next: 'wilderness_02_bitter_water' }, [
        line('yona', '좋습니다. 물이 부족할수록 먼저 무너지는 사람을 살펴야 합니다. 공동체는 가장 약한 걸음에서 드러납니다.'),
        line('eli', '목마름은 사람의 말도 거칠게 만듭니다. 누군가 곁에 서면 원망이 조금 늦춰질 수 있습니다.')
      ]),
      choice('count_the_signs', '▤', '홍해에서 보았던 일을 떠올리며 지금의 상황을 기록한다', { memory: 1, discernment: 1 }, { next: 'wilderness_02_bitter_water' }, [
        line('mira', '기억하겠습니다. 바다를 건넌 공동체도 사흘 만에 마를 수 있다는 사실을 기록해야 합니다.'),
        line('asar', '기억은 감상이 아닙니다. 다음 판단을 지키는 표지가 됩니다.')
      ]),
      choice('say_we_will_die', '☾', '이 광야에서 모두 죽을 것이라고 불안을 퍼뜨린다', { fear: 1, scatter: 1 }, { next: 'wilderness_02_bitter_water' }, [
        line('yona', '그 말은 사실처럼 들리지만 사람들의 숨을 더 빠르게 만듭니다. 두려움은 물보다 먼저 바닥날 수 있습니다.'),
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
      '마침내 물이 보입니다. 그러나 사람들이 달려가 마신 물은 쓴 물입니다. 기대는 곧 실망으로 바뀌고, 실망은 곧 원망의 언어를 찾습니다.',
      '누군가 모세를 향해 묻습니다. 우리가 무엇을 마실 것인가. 질문은 필요하지만, 질문의 끝이 원망으로 굳어지려 합니다.',
      '해방받은 공동체는 이제 애굽의 채찍이 아니라 광야의 결핍 앞에서 시험을 받습니다.'
    ],
    prompt: '쓴 물 앞에서 당신은 어떤 말을 선택하시겠습니까?',
    choices: [
      choice('ask_without_poison', '◎', '무엇을 마셔야 하는지 묻되 원망으로 몰아가지 않는다', { discernment: 1, trust: 1 }, { next: 'wilderness_03_tree_healing' }, [
        line('eli', '좋습니다. 질문은 믿음의 반대말이 아닙니다. 다만 질문이 공동체를 찢는 말이 되지 않아야 합니다.'),
        line('mira', '쓴 물 앞에서도 말의 방향을 지킨 일을 기록하겠습니다.')
      ]),
      choice('hold_children_back', '🤝', '성급히 마시려는 아이들과 약한 사람들을 먼저 막아 세운다', { community: 1, discernment: 1 }, { next: 'wilderness_03_tree_healing' }, [
        line('yona', '잘 보셨습니다. 물이 있다고 곧 생명은 아닙니다. 조급함이 더 큰 위험을 부를 수 있습니다.'),
        line('asar', '물의 상태를 살피겠습니다. 지금은 속도보다 분별입니다.')
      ]),
      choice('turn_crowd_against_moses', '◇', '모세가 우리를 속였다고 사람들을 몰아붙인다', { fear: 2, scatter: 1, trust: -1 }, { ending: 'bad_wilderness_bitter_murmur' }, [
        line('eli', '그 말은 갈증을 해석하는 방식이 아니라 공동체를 찢는 방식입니다. 원망이 지도자를 삼키면 백성도 함께 무너집니다.'),
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
      '모세가 여호와께 부르짖자, 하나님은 한 나무를 보이십니다. 나무가 물에 던져지자 쓴 물은 마실 수 있는 물이 됩니다.',
      '사람들은 물을 마시지만, 사건은 물에서 끝나지 않습니다. 하나님은 거기서 법도와 율례를 정하시고 백성을 시험하십니다.',
      '치유된 물 앞에서 공동체는 무엇을 기억해야 할지 결정해야 합니다.'
    ],
    prompt: '단물이 된 마라에서 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('remember_healer', '✦', '하나님이 치료하시는 분임을 기억하자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('mira', '“치료하시는 하나님”이라는 기억은 광야의 다음 결핍 앞에서도 필요할 것입니다.'),
        line('eli', '물이 달아진 것보다 중요한 것은 백성이 누구께 속했는지를 다시 배운 일입니다.')
      ]),
      choice('teach_the_test', '▤', '이 사건을 시험과 가르침으로 정리해 공동체에 전한다', { discernment: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('asar', '광야의 사건은 우연한 위기가 아니라 길 위의 수업일 수 있습니다.'),
        line('mira', '사건을 해석하는 말이 있어야 다음 세대가 단순한 생존담이 아니라 믿음의 기록으로 듣습니다.')
      ]),
      choice('drink_and_forget', '☾', '물을 마셨으니 된 일이라며 조용히 지나간다', { memory: -1, delay: 1 }, { next: 'wilderness_04_elim_rest' }, [
        line('mira', '마신 물은 몸을 살리지만, 잊힌 사건은 공동체를 살리지 못합니다.'),
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
      '마라를 지나 엘림에 이르자 열두 샘과 일흔 그루의 종려나무가 백성을 맞이합니다. 광야에도 쉼의 자리가 있습니다.',
      '사람들은 숨을 고르고 짐을 내려놓습니다. 그러나 쉼은 목적지가 아니라 다음 길을 준비하는 은혜입니다.',
      '풍성한 물과 그늘 앞에서 마음은 감사로 열릴 수도 있고, 여기가 끝이라고 착각할 수도 있습니다.'
    ],
    prompt: '엘림의 쉼 앞에서 당신은 어떻게 머무시겠습니까?',
    choices: [
      choice('rest_with_gratitude', '✦', '쉼을 감사로 받고 다음 길을 준비한다', { trust: 1, memory: 1 }, { next: 'wilderness_05_sin_hunger' }, [
        line('eli', '좋습니다. 쉼은 멈추라는 허락이면서 다시 걸으라는 준비입니다.'),
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
      '노예의 땅이 갑자기 풍요로운 식탁처럼 말해집니다. 고통의 기억은 굶주림 앞에서 쉽게 미화됩니다.',
      '당신은 배고픈 사람들 사이에서 애굽을 그리워하는 목소리를 듣습니다.'
    ],
    prompt: '배고픔이 애굽의 기억을 바꿀 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('name_the_distortion', '▤', '애굽의 기억이 미화되고 있음을 조심스럽게 짚는다', { memory: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, [
        line('mira', '배고픔은 과거를 편집합니다. 노예의 식탁을 풍요로만 기억하면 해방의 의미가 흐려집니다.'),
        line('eli', '진실을 말하되 굶주린 사람을 정죄하지 않는 태도가 필요합니다.')
      ]),
      choice('listen_to_hunger', '🤝', '원망을 꾸짖기 전에 실제 배고픔을 살핀다', { community: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, [
        line('yona', '맞습니다. 배고픔은 실제입니다. 실제 결핍을 외면하면 바른 말도 사람을 더 아프게 합니다.'),
        line('eli', '긍휼 없는 교훈은 공동체를 세우지 못합니다.')
      ]),
      choice('join_egypt_longing', '☾', '차라리 애굽에 있었으면 나았다고 함께 말한다', { fear: 1, trust: -1, memory: -1 }, { next: 'wilderness_06_promised_bread' }, [
        line('mira', '그 말은 배고픔의 언어이지만, 기억을 거꾸로 돌리는 말이기도 합니다.'),
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
      '하나님은 하늘에서 양식을 비같이 내리겠다고 말씀하십니다. 백성은 날마다 나가서 그날 먹을 만큼 거두어야 합니다.',
      '양식의 약속은 동시에 시험입니다. 많이 쌓아두는 방식이 아니라, 날마다 받는 방식으로 살아야 합니다.',
      '저녁에는 메추라기가 오고, 아침에는 광야의 이슬 위에 낯선 양식이 놓일 것입니다.'
    ],
    prompt: '하늘 양식의 약속 앞에서 당신은 무엇을 준비하시겠습니까?',
    choices: [
      choice('prepare_daily_trust', '✦', '날마다 거두라는 말씀을 믿고 사람들에게 차분히 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('eli', '날마다 받는 훈련은 광야의 중심 수업입니다. 많이 쌓는 마음보다 매일 믿는 마음이 필요합니다.'),
        line('mira', '양식은 공급이면서 시험입니다. 이 말씀을 분명히 기록하겠습니다.')
      ]),
      choice('make_orderly_groups', '🤝', '아침에 각 장막이 질서 있게 나가도록 무리를 나눈다', { community: 1, discernment: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('yona', '혼란을 줄이는 좋은 선택입니다. 모두가 굶주릴수록 공평한 질서가 필요합니다.'),
        line('asar', '해 뜨기 전 동선을 살펴두겠습니다.')
      ]),
      choice('plan_extra_storage', '☾', '혹시 모르니 몰래 더 많이 저장할 계획을 세운다', { fear: 1, delay: 1 }, { next: 'wilderness_07_quail_evening' }, [
        line('mira', '두려움은 준비처럼 보일 때가 있습니다. 그러나 말씀과 다른 준비는 곧 불신의 흔적이 됩니다.'),
        line('eli', '미리 쌓아두려는 마음은 이해되지만, 이번 시험은 바로 그 마음을 겨눕니다.')
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
      '저녁이 되자 메추라기가 진영을 덮습니다. 굶주린 사람들의 눈에 놀라움과 안도감이 동시에 떠오릅니다.',
      '배고픔은 여전히 기억나지만, 하나님이 들으셨다는 사실도 이제 몸으로 보입니다.',
      '공급 앞에서도 사람의 마음은 감사와 탐욕 사이에서 흔들립니다.'
    ],
    prompt: '첫 공급을 본 당신은 어떻게 행동하시겠습니까?',
    choices: [
      choice('share_evening_food', '🤝', '약한 사람들에게 먼저 돌아가도록 나눔을 돕는다', { community: 1, trust: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('yona', '공급이 왔을 때 누가 먼저 먹는지가 공동체의 성격을 드러냅니다.'),
        line('eli', '좋습니다. 은혜는 독점될 때 곧 탐욕으로 변합니다.')
      ]),
      choice('give_thanks', '✦', '하나님이 들으셨음을 고백하며 감사한다', { trust: 1, memory: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('mira', '원망을 들으셨음에도 먹이신 하나님을 기록하겠습니다. 이것은 자격의 문제가 아니라 은혜의 문제입니다.'),
        line('eli', '감사는 다음 아침의 순종을 준비시킵니다.')
      ]),
      choice('grab_first', '☾', '사람들이 몰리기 전에 내 몫부터 챙긴다', { community: -1, fear: 1 }, { next: 'wilderness_08_manna_morning' }, [
        line('yona', '조급함이 번지면 공급 앞에서도 싸움이 납니다.'),
        line('mira', '두려움이 손을 빠르게 만들었지만, 그 손이 이웃의 몫을 가릴 수 있습니다.')
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
      '아침 이슬이 걷히자 작고 둥글며 서리 같이 가는 것이 광야 지면에 놓여 있습니다. 사람들은 묻습니다. “이것이 무엇이냐.”',
      '모세는 이것이 여호와께서 먹으라고 주신 양식이라고 말합니다. 각 사람은 먹을 만큼만 거두어야 합니다.',
      '많이 거둔 사람도 남지 않고, 적게 거둔 사람도 부족하지 않습니다.'
    ],
    prompt: '만나를 거두는 아침, 당신은 어떤 기준을 따르시겠습니까?',
    choices: [
      choice('gather_as_commanded', '✦', '먹을 만큼만 거두라는 말씀을 따른다', { trust: 1, discernment: 1 }, { next: 'wilderness_09_measure_test' }, [
        line('asar', '말씀의 기준이 분명합니다. 필요만큼 거두는 것이 오늘의 분별입니다.'),
        line('eli', '순종은 때로 양을 조절하는 일처럼 아주 실제적인 모습으로 나타납니다.')
      ]),
      choice('help_equal_measure', '🤝', '적게 거둔 집이 부족하지 않도록 살핀다', { community: 1, memory: 1 }, { next: 'wilderness_09_measure_test' }, [
        line('yona', '좋습니다. 만나의 기적은 개인의 바구니뿐 아니라 공동체의 균형에서도 드러납니다.'),
        line('mira', '많고 적음이 은혜 안에서 조정되는 장면을 기록하겠습니다.')
      ]),
      choice('secretly_overgather', '◇', '가족을 위해 몰래 더 많이 거두어 숨겨 둔다', { fear: 2, trust: -1, delay: 1 }, { ending: 'bad_rotten_manna' }, [
        line('mira', '두려움은 사랑처럼 위장될 수 있습니다. 그러나 말씀을 거슬러 숨긴 것은 아침까지 견디지 못할 것입니다.'),
        line('eli', '쌓아 둔 양식이 썩으면, 마음속 불신도 함께 드러납니다.')
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
      '사람들은 오멜로 만나를 잽니다. 많이 거둔 사람도 남지 않고, 적게 거둔 사람도 모자라지 않습니다.',
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
        line('yona', '실패한 사람도 공동체 안에서 다시 배워야 합니다. 수치심만 남기면 다음 순종은 더 어려워집니다.'),
        line('eli', '좋습니다. 책망보다 회복이 먼저 필요한 순간입니다.')
      ]),
      choice('mock_the_failed', '☾', '말씀을 어긴 사람들을 조롱하며 우월감을 드러낸다', { community: -1, memory: -1 }, { next: 'wilderness_10_sabbath_instruction' }, [
        line('mira', '조롱은 교훈을 남기지 못합니다. 실패를 구경거리로 만들면 공동체는 더 깊이 갈라집니다.'),
        line('yona', '사람들이 서로를 숨기기 시작하면 다음 위험은 더 늦게 드러납니다.')
      ])
    ]
  });

  node('wilderness_10_sabbath_instruction', 10, {
    location: '여섯째 날의 진영',
    bible: '출애굽기 16:22–26',
    title: '두 배로 거두는 날',
    day: '여섯째 날',
    place: '신 광야 진영',
    copy: [
      '여섯째 날에는 두 배의 만나가 거두어집니다. 모세는 내일이 여호와께 거룩한 안식일이라 말합니다.',
      '평소에는 남기면 썩었지만, 안식일을 위한 양식은 냄새도 나지 않고 벌레도 생기지 않습니다.',
      '광야의 양식은 노동의 리듬만이 아니라 쉼의 리듬도 가르칩니다.'
    ],
    prompt: '안식일을 앞둔 여섯째 날, 당신은 무엇을 선택하시겠습니까?',
    choices: [
      choice('prepare_for_sabbath', '✦', '말씀대로 두 배를 준비하고 내일은 쉬도록 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_11_sabbath_morning' }, [
        line('eli', '안식은 아무것도 하지 않는 방치가 아니라 말씀을 믿는 준비에서 시작됩니다.'),
        line('mira', '썩지 않는 양식은 쉼도 하나님이 책임지신다는 표지가 됩니다.')
      ]),
      choice('explain_rhythm', '▤', '왜 오늘은 두 배인지 사람들에게 차분히 설명한다', { discernment: 1, community: 1 }, { next: 'wilderness_11_sabbath_morning' }, [
        line('asar', '리듬을 이해하면 혼란이 줄어듭니다. 오늘 많이 거두는 것은 탐욕이 아니라 순종입니다.'),
        line('eli', '말씀의 맥락을 알려 주면 공동체가 불필요한 오해를 피할 수 있습니다.')
      ]),
      choice('ignore_sabbath_pattern', '☾', '내일도 나가면 되니 오늘은 평소처럼만 거두자고 말한다', { delay: 1, trust: -1 }, { next: 'wilderness_11_sabbath_morning' }, [
        line('mira', '평소와 같아 보이는 판단이 오늘은 불순종이 될 수 있습니다. 말씀의 때를 구별해야 합니다.'),
        line('yona', '준비하지 않은 쉼은 내일의 불안을 키울 수 있습니다.')
      ])
    ]
  });

  node('wilderness_11_sabbath_morning', 11, {
    location: '조용해야 할 아침',
    bible: '출애굽기 16:27–30',
    title: '아무것도 없는 들판',
    day: '안식일 아침',
    place: '진영 바깥',
    copy: [
      '안식일 아침, 몇 사람이 만나를 거두러 들판으로 나갑니다. 그러나 들판에는 아무것도 없습니다.',
      '하나님은 언제까지 내 계명과 율법을 지키지 않겠느냐고 말씀하십니다. 안식일은 단순한 휴식이 아니라 신뢰의 표지입니다.',
      '공동체는 들판으로 나가려는 마음과 장막에 머무르라는 말씀 사이에 서 있습니다.'
    ],
    prompt: '안식일 아침의 빈 들판 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('keep_the_camp_resting', '✦', '진영이 말씀대로 쉬도록 조용히 붙든다', { trust: 1, community: 1 }, { next: 'wilderness_12_rephidim_thirst' }, [
        line('eli', '좋습니다. 쉬는 것도 공동체적 순종입니다. 불안한 발을 멈추게 하는 사람이 필요합니다.'),
        line('mira', '광야에서 쉼을 배운 날로 기록하겠습니다.')
      ]),
      choice('bring_back_seekers', '🤝', '들판으로 나간 사람들을 비난보다 돌이킴으로 데려온다', { community: 1, discernment: 1 }, { next: 'wilderness_12_rephidim_thirst' }, [
        line('yona', '사람들을 데려오겠습니다. 실패한 사람을 버리지 않는 방식도 안식의 일부입니다.'),
        line('eli', '책망은 필요하지만 회복 없는 책망은 공동체를 건조하게 만듭니다.')
      ]),
      choice('lead_sabbath_search', '◇', '혹시 남은 것이 있을지 함께 들판을 더 뒤진다', { delay: 2, trust: -1 }, { ending: 'bad_sabbath_rebellion' }, [
        line('asar', '빈 들판은 정보 부족이 아니라 말씀의 확인입니다. 더 찾는다고 순종이 되지는 않습니다.'),
        line('mira', '아무것도 없는 들판에서 드러난 것은 양식의 부재가 아니라 신뢰의 부재입니다.')
      ])
    ]
  });

  node('wilderness_12_rephidim_thirst', 12, {
    location: '르비딤의 메마른 진영',
    bible: '출애굽기 17:1',
    title: '르비딤의 물 없음',
    day: '르비딤에 장막 친 날',
    place: '르비딤',
    copy: [
      '이스라엘 자손은 여호와의 명령대로 이동하여 르비딤에 장막을 칩니다. 그러나 거기에는 마실 물이 없습니다.',
      '말씀을 따라 도착한 자리에도 결핍이 있을 수 있습니다. 사람들은 다시 목마르고, 오래된 원망의 언어가 되살아납니다.',
      '마라에서 물을 마셨고 만나를 먹었지만, 새로운 결핍은 지난 기억을 다시 시험합니다.'
    ],
    prompt: '말씀을 따라 온 자리의 결핍 앞에서 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('recall_marah_manna', '▤', '마라와 만나의 기억을 꺼내어 공동체에 상기시킨다', { memory: 1, trust: 1 }, { next: 'wilderness_13_quarrel_rises' }, [
        line('mira', '기억을 연결해야 합니다. 사건들이 흩어지면 매 위기가 처음 겪는 절망처럼 보입니다.'),
        line('eli', '좋습니다. 광야의 믿음은 이전 은혜를 현재 결핍 앞에 세우는 일입니다.')
      ]),
      choice('guard_the_vulnerable', '🤝', '아이들과 노약자가 먼저 무너지지 않게 그늘과 대열을 정리한다', { community: 1, discernment: 1 }, { next: 'wilderness_13_quarrel_rises' }, [
        line('yona', '물이 없을 때는 질서가 생명입니다. 약한 사람들의 위치부터 살피겠습니다.'),
        line('asar', '주변 지형도 살펴보겠습니다. 그러나 먼저 공동체가 흩어지지 않아야 합니다.')
      ]),
      choice('say_command_led_to_death', '☾', '여호와의 명령을 따라왔는데 죽게 되었다고 말한다', { fear: 1, trust: -1, scatter: 1 }, { next: 'wilderness_13_quarrel_rises' }, [
        line('mira', '그 말은 고통 속에서 나온 말이지만, 말씀의 길 자체를 죽음의 길로 해석하게 만듭니다.'),
        line('eli', '결핍이 있다고 부르심이 거짓이 되는 것은 아닙니다.')
      ])
    ]
  });

  node('wilderness_13_quarrel_rises', 13, {
    location: '다툼이 이는 진영',
    bible: '출애굽기 17:2–4',
    title: '왜 우리를 올라오게 했느냐',
    day: '다툼이 커진 날',
    place: '르비딤 진영',
    copy: [
      '백성은 모세와 다투며 물을 달라고 요구합니다. 말은 점점 거칠어지고, 모세는 그들이 자신을 돌로 칠 듯하다고 하나님께 부르짖습니다.',
      '이 장면에서 목마름은 단순한 신체의 결핍을 넘어 하나님을 시험하는 말로 번집니다.',
      '당신은 분노한 사람들 사이에서 공동체가 어느 방향으로 기울고 있는지 봅니다.'
    ],
    prompt: '다툼이 폭력으로 번지려 할 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('stand_between', '🤝', '폭력으로 번지지 않도록 사람들 사이에 선다', { community: 1, fear: -1 }, { next: 'wilderness_14_before_rock' }, [
        line('yona', '위험하지만 필요한 자리입니다. 누군가 사이에 서지 않으면 말은 곧 돌이 됩니다.'),
        line('eli', '공동체를 지키는 일은 때로 분노의 한가운데 서는 일입니다.')
      ]),
      choice('turn_to_prayer', '✦', '원망을 키우기보다 하나님께 부르짖어야 한다고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_14_before_rock' }, [
        line('mira', '모세가 부르짖는 방향을 보아야 합니다. 원망은 옆으로 번지고 기도는 위로 향합니다.'),
        line('eli', '좋습니다. 목마름이 기도를 막는 것이 아니라 기도로 옮겨져야 합니다.')
      ]),
      choice('pick_up_stones', '◇', '모세에게 책임을 묻자며 돌을 드는 무리에 선다', { fear: 2, scatter: 2, trust: -2 }, { ending: 'bad_massah_meribah' }, [
        line('yona', '돌을 드는 순간 공동체는 더 이상 길을 묻는 백성이 아니라 서로를 치는 무리가 됩니다.'),
        line('mira', '이 선택은 물 없음보다 깊은 실패로 기록될 것입니다.')
      ])
    ]
  });

  node('wilderness_14_before_rock', 14, {
    location: '호렙의 반석 앞',
    bible: '출애굽기 17:5–6',
    title: '반석 앞에 선 장로들',
    day: '지팡이가 들린 날',
    place: '호렙의 반석',
    copy: [
      '하나님은 모세에게 이스라엘 장로들을 데리고 나일을 치던 지팡이를 손에 잡고 가라고 하십니다.',
      '그 지팡이는 심판의 기억이면서 구원의 기억입니다. 이제 그 지팡이는 광야의 반석 앞에 섭니다.',
      '몇몇 장로들이 함께 서고, 공동체는 숨을 죽인 채 반석을 바라봅니다.'
    ],
    prompt: '반석 앞의 증인으로서 당신은 무엇을 보아야 하겠습니까?',
    choices: [
      choice('see_same_staff', '▤', '나일을 치던 지팡이를 기억하며 하나님의 연속된 일을 본다', { memory: 1, discernment: 1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('mira', '좋습니다. 같은 지팡이가 다른 자리에서 하나님의 일을 증언합니다. 기억은 사건들을 연결합니다.'),
        line('asar', '애굽의 강과 광야의 반석이 하나의 이야기 안에 들어옵니다.')
      ]),
      choice('stand_with_elders', '🤝', '장로들이 두려워하지 않도록 함께 증인의 자리에 선다', { community: 1, trust: 1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('eli', '증인은 혼자 보지 않습니다. 공동체가 함께 보아야 훗날 함께 기억할 수 있습니다.'),
        line('yona', '사람들이 몰려들지 않도록 질서를 지키겠습니다.')
      ]),
      choice('demand_proof_now', '☾', '정말 물이 나오는지 빨리 증명하라고 재촉한다', { fear: 1, delay: 1 }, { next: 'wilderness_15_water_from_rock' }, [
        line('mira', '증거를 바라는 마음은 이해되지만, 재촉이 하나님을 시험하는 말로 변하지 않게 조심해야 합니다.'),
        line('eli', '기다림이 아주 짧아도, 그 짧은 기다림 안에서 마음이 드러납니다.')
      ])
    ]
  });

  node('wilderness_15_water_from_rock', 15, {
    location: '물이 흐르는 반석',
    bible: '출애굽기 17:6',
    title: '반석에서 흐른 물',
    day: '물이 솟은 날',
    place: '호렙',
    copy: [
      '모세가 반석을 치자 물이 나옵니다. 메마른 돌에서 흘러나온 물은 사람들의 손과 입술과 짐승들의 목을 적십니다.',
      '진영의 소리는 달라집니다. 다툼의 소리 대신 물을 받는 그릇의 소리와 안도의 숨이 들립니다.',
      '그러나 물을 마신 뒤에도 질문이 남습니다. 우리는 이 사건을 어떻게 기억할 것입니까?'
    ],
    prompt: '반석의 물 앞에서 당신은 무엇을 남기시겠습니까?',
    choices: [
      choice('confess_presence', '✦', '여호와께서 우리 가운데 계심을 고백한다', { trust: 1, memory: 1 }, { next: 'wilderness_16_massah_memory' }, [
        line('eli', '이 고백이 핵심입니다. 물이 나왔다는 사실보다 하나님이 우리 가운데 계신다는 사실을 붙들어야 합니다.'),
        line('mira', '그 문장을 기록하겠습니다. 광야의 가장 깊은 질문에 대한 답입니다.')
      ]),
      choice('serve_water_orderly', '🤝', '모두가 물을 마시도록 질서를 세운다', { community: 1, discernment: 1 }, { next: 'wilderness_16_massah_memory' }, [
        line('yona', '공급이 왔을 때도 질서가 필요합니다. 은혜가 다툼으로 소비되지 않게 하겠습니다.'),
        line('asar', '흐름과 대열을 확인하겠습니다. 모두가 마셔야 이 사건이 공동체의 기억이 됩니다.')
      ]),
      choice('forget_quarrel_quickly', '☾', '물이 생겼으니 다툼은 없던 일로 넘기자고 한다', { memory: -1, fear: 1 }, { next: 'wilderness_16_massah_memory' }, [
        line('mira', '빨리 덮는다고 치유되는 것은 아닙니다. 이름 붙이지 않은 실패는 다음 결핍에서 다시 나타납니다.'),
        line('eli', '은혜는 망각이 아니라 회개와 기억으로 이어져야 합니다.')
      ])
    ]
  });

  node('wilderness_16_massah_memory', 16, {
    location: '맛사와 므리바라 불린 자리',
    bible: '출애굽기 17:7',
    title: '우리 중에 계신가',
    day: '이름이 남은 날',
    place: '맛사와 므리바',
    copy: [
      '그곳의 이름은 맛사와 므리바가 됩니다. 이스라엘 자손이 다투었고, “여호와께서 우리 중에 계신가 안 계신가” 하며 하나님을 시험했기 때문입니다.',
      '광야의 길은 물과 양식의 이야기만이 아니라, 결핍 속에서 하나님을 어떻게 기억하는가의 이야기입니다.',
      '당신의 증언도 이제 하나의 이름을 갖게 됩니다. 원망으로 남을 것인지, 배운 신뢰로 남을 것인지 결정해야 합니다.'
    ],
    prompt: '광야 2장의 마지막 증언을 어떻게 남기시겠습니까?',
    choices: [
      choice('true_witness', '✦', '결핍 속에서도 하나님이 계셨음을 증언한다', { trust: 1, memory: 1, community: 1 }, { ending: 'true_wilderness_daily_trust' }, [
        line('mira', '이 증언은 마라와 만나와 반석을 하나로 묶습니다. 광야는 버림받은 장소가 아니라 배운 장소였습니다.'),
        line('eli', '당신은 결핍을 부정하지 않았지만, 결핍보다 하나님을 더 크게 기억했습니다.')
      ]),
      choice('good_witness', '◎', '많이 흔들렸지만 다시 신뢰를 배우고 싶다고 고백한다', { trust: 1, discernment: 1 }, { ending: 'faithful_wilderness_witness' }, [
        line('eli', '좋습니다. 완전하지 않은 고백도 하나님 앞에서는 길이 될 수 있습니다.'),
        line('yona', '흔들린 사람도 다시 대열 안에서 걸을 수 있어야 합니다.')
      ]),
      choice('mixed_witness', '☾', '물을 마셨지만 마음에는 아직 시험의 질문이 남았다고 말한다', { fear: 1, memory: 1 }, { ending: 'wounded_wilderness_witness' }, [
        line('mira', '그 질문도 숨기지 않고 기록하겠습니다. 다만 다음 장에서는 그 질문이 원망이 아니라 기도로 바뀌어야 합니다.'),
        line('asar', '미완의 증언입니다. 그러나 아직 길 위에 있습니다.')
      ])
    ]
  });
})();
