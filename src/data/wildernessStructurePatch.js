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

  const steady = [line('eli', '기억을 잃지 않는 말이 광야의 발걸음을 붙듭니다.')];
  const care = [line('yona', '공동체가 무너지지 않도록 약한 사람 곁에 서겠습니다.')];
  const record = [line('mira', '이 선택은 광야의 증언으로 기록될 것입니다.')];
  const warn = [line('asar', '지금의 말과 발걸음이 다음 길의 방향을 정합니다.')];

  node('wilderness_01_marah_thirst', 1, {
    location: '수르 광야의 사흘 길',
    bible: '출애굽기 15:22–23',
    title: '물이 없는 사흘',
    day: '홍해 이후 사흘째',
    place: '수르 광야',
    copy: [
      '바다의 노래가 아직 입술에 남아 있지만, 사흘 동안 물을 얻지 못하자 노래는 점점 낮아집니다.',
      '당신은 모세가 아니라 목마른 사람들 사이에서 흔들리는 이름 없는 증인입니다.'
    ],
    prompt: '목마름이 공동체를 흔들 때 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('steady_the_thirsty', '🤝', '가장 지친 사람들 곁에 선다', { community: 1, fear: -1 }, { next: 'wilderness_02_bitter_water' }, care),
      choice('count_the_signs', '▤', '홍해에서 보았던 일을 떠올리며 기록한다', { memory: 1, discernment: 1 }, { next: 'wilderness_02_bitter_water' }, record),
      choice('say_we_will_die', '☾', '이 광야에서 모두 죽을 것이라고 불안을 퍼뜨린다', { fear: 1, scatter: 1 }, { next: 'wilderness_02_bitter_water' }, warn)
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
      '질문은 필요하지만, 질문의 끝이 원망으로 굳어지려 합니다.'
    ],
    prompt: '쓴 물 앞에서 당신은 어떤 말을 선택하시겠습니까?',
    choices: [
      choice('ask_without_poison', '◎', '무엇을 마셔야 하는지 묻되 원망으로 몰아가지 않는다', { discernment: 1, trust: 1 }, { next: 'wilderness_03_tree_healing' }, steady),
      choice('hold_children_back', '🤝', '성급히 마시려는 아이들과 약한 사람들을 먼저 막아 세운다', { community: 1, discernment: 1 }, { next: 'wilderness_03_tree_healing' }, care),
      choice('turn_crowd_against_moses', '◇', '모세가 우리를 속였다고 사람들을 몰아붙인다', { fear: 2, scatter: 1, trust: -1 }, { ending: 'bad_wilderness_bitter_murmur' }, warn)
    ]
  });

  node('wilderness_03_tree_healing', 3, {
    location: '마라의 물가',
    bible: '출애굽기 15:25–26',
    title: '나무가 던져진 물',
    day: '쓴 물이 단물이 된 날',
    place: '마라',
    copy: [
      '모세가 여호와께 부르짖자, 하나님은 한 나무를 보이시고 쓴 물을 마실 수 있는 물로 바꾸십니다.',
      '치유된 물 앞에서 공동체는 무엇을 기억해야 할지 결정해야 합니다.'
    ],
    prompt: '단물이 된 마라에서 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('remember_healer', '✦', '하나님이 치료하시는 분임을 기억하자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, steady),
      choice('teach_the_test', '▤', '이 사건을 시험과 가르침으로 정리한다', { discernment: 1, memory: 1 }, { next: 'wilderness_04_elim_rest' }, record),
      choice('drink_and_forget', '☾', '물을 마셨으니 된 일이라며 지나간다', { memory: -1, delay: 1 }, { next: 'wilderness_04_elim_rest' }, warn)
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
      '광야에도 쉼의 자리가 있지만, 쉼은 목적지가 아니라 다음 길을 준비하는 은혜입니다.'
    ],
    prompt: '엘림의 쉼 앞에서 당신은 어떻게 머무시겠습니까?',
    choices: [
      choice('rest_with_gratitude', '✦', '쉼을 감사로 받고 다음 길을 준비한다', { trust: 1, memory: 1 }, { next: 'wilderness_05_sin_hunger' }, steady),
      choice('organize_camp', '🤝', '각 장막의 필요를 살피고 질서 있게 쉬게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_05_sin_hunger' }, care),
      choice('refuse_to_move_again', '☾', '이제 더는 움직이고 싶지 않다고 말한다', { delay: 1, trust: -1 }, { next: 'wilderness_05_sin_hunger' }, warn)
    ]
  });

  node('wilderness_05_sin_hunger', 5, {
    location: '신 광야의 진영',
    bible: '출애굽기 16:1–3',
    title: '고기 가마의 기억',
    day: '둘째 달 보름',
    place: '신 광야',
    copy: [
      '먹을 것이 줄어들자 사람들의 기억은 애굽의 고기 가마와 떡으로 돌아갑니다.',
      '노예의 땅이 굶주림 앞에서 갑자기 풍요로운 식탁처럼 말해집니다.'
    ],
    prompt: '배고픔이 애굽의 기억을 바꿀 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('name_the_distortion', '▤', '애굽의 기억이 미화되고 있음을 조심스럽게 짚는다', { memory: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, record),
      choice('listen_to_hunger', '🤝', '원망을 꾸짖기 전에 실제 배고픔을 살핀다', { community: 1, discernment: 1 }, { next: 'wilderness_06_promised_bread' }, care),
      choice('join_egypt_longing', '☾', '차라리 애굽에 있었으면 나았다고 함께 말한다', { fear: 1, trust: -1, memory: -1 }, { next: 'wilderness_06_promised_bread' }, warn)
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
      '백성은 날마다 그날 먹을 만큼 거두어야 합니다. 양식의 약속은 동시에 시험입니다.'
    ],
    prompt: '하늘 양식의 약속 앞에서 당신은 무엇을 준비하시겠습니까?',
    choices: [
      choice('prepare_daily_trust', '✦', '날마다 거두라는 말씀을 믿고 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_07_quail_evening' }, steady),
      choice('make_orderly_groups', '🤝', '각 장막이 질서 있게 나가도록 무리를 나눈다', { community: 1, discernment: 1 }, { next: 'wilderness_07_quail_evening' }, care),
      choice('plan_extra_storage', '☾', '혹시 모르니 몰래 더 많이 저장할 계획을 세운다', { fear: 1, delay: 1 }, { next: 'wilderness_07_quail_evening' }, warn)
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
      '공급 앞에서도 사람의 마음은 감사와 탐욕 사이에서 흔들립니다.'
    ],
    prompt: '첫 공급을 본 당신은 어떻게 행동하시겠습니까?',
    choices: [
      choice('share_evening_food', '🤝', '약한 사람들에게 먼저 돌아가도록 나눔을 돕는다', { community: 1, trust: 1 }, { next: 'wilderness_08_manna_morning' }, care),
      choice('give_thanks', '✦', '하나님이 들으셨음을 고백하며 감사한다', { trust: 1, memory: 1 }, { next: 'wilderness_08_manna_morning' }, steady),
      choice('grab_first', '☾', '사람들이 몰리기 전에 내 몫부터 챙긴다', { community: -1, fear: 1 }, { next: 'wilderness_08_manna_morning' }, warn)
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
      '많이 거둔 사람도 남지 않고 적게 거둔 사람도 부족하지 않습니다.'
    ],
    prompt: '만나를 거두는 아침, 당신은 어떤 기준을 따르시겠습니까?',
    choices: [
      choice('gather_as_commanded', '✦', '먹을 만큼만 거두라는 말씀을 따른다', { trust: 1, discernment: 1 }, { next: 'wilderness_09_measure_test' }, steady),
      choice('help_equal_measure', '🤝', '적게 거둔 집이 부족하지 않도록 살핀다', { community: 1, memory: 1 }, { next: 'wilderness_09_measure_test' }, care),
      choice('secretly_overgather', '◇', '가족을 위해 몰래 더 많이 거두어 숨겨 둔다', { fear: 2, trust: -1, delay: 1 }, { ending: 'bad_rotten_manna' }, warn)
    ]
  });

  node('wilderness_09_measure_test', 9, {
    location: '오멜을 재는 자리',
    bible: '출애굽기 16:16–21',
    title: '남지도 모자라지도 않게',
    day: '만나를 재는 날',
    place: '각 장막 앞',
    copy: [
      '몇 사람은 만나를 다음 날까지 남겨 둡니다. 아침이 되자 그것은 벌레가 생기고 냄새가 납니다.',
      '하루치 양식은 하루치 신뢰를 요구합니다.'
    ],
    prompt: '하루치 양식의 시험 앞에서 당신은 무엇을 말하시겠습니까?',
    choices: [
      choice('teach_daily_dependence', '▤', '오늘 받은 양식으로 오늘을 살자고 가르친다', { memory: 1, trust: 1 }, { next: 'wilderness_10_sabbath_instruction' }, record),
      choice('remove_rotten_food', '🤝', '썩은 것을 치우고 사람들이 부끄러움에 갇히지 않게 돕는다', { community: 1, fear: -1 }, { next: 'wilderness_10_sabbath_instruction' }, care),
      choice('mock_the_failed', '☾', '말씀을 어긴 사람들을 조롱하며 우월감을 드러낸다', { community: -1, memory: -1 }, { next: 'wilderness_10_sabbath_instruction' }, warn)
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
      '안식일에는 들판에 만나가 없을 것입니다. 광야의 공급은 노동의 리듬까지 새롭게 가르칩니다.'
    ],
    prompt: '안식일의 양식 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('honor_sabbath_rhythm', '✦', '안식일에는 거두러 나가지 말라고 전한다', { trust: 1, memory: 1 }, { next: 'wilderness_11_sabbath_field' }, steady),
      choice('help_prepare_double', '🤝', '각 장막이 두 배의 양식을 준비하도록 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_11_sabbath_field' }, care),
      choice('doubt_empty_field', '☾', '혹시 모르니 안식일에도 들판을 확인하자고 말한다', { fear: 1, trust: -1 }, { next: 'wilderness_11_sabbath_field' }, warn)
    ]
  });

  node('wilderness_11_sabbath_field', 11, {
    location: '안식일 아침의 빈 들판',
    bible: '출애굽기 16:27–30',
    title: '빈 들판을 향한 발',
    day: '첫 안식일',
    place: '진영 바깥',
    copy: [
      '안식일 아침에도 몇 사람이 들판으로 나갑니다. 그러나 그들이 찾은 것은 만나가 아니라 빈 땅입니다.',
      '빈 들판은 공급의 실패가 아니라 말씀을 신뢰하지 못한 마음을 드러냅니다.'
    ],
    prompt: '빈 들판에서 돌아온 사람들을 보며 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('call_back_to_rest', '✦', '쉼의 명령으로 다시 돌아오자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_12_rephidim_no_water' }, steady),
      choice('restore_without_shame', '🤝', '나갔던 사람들을 비난보다 회복으로 맞이한다', { community: 1, fear: -1 }, { next: 'wilderness_12_rephidim_no_water' }, care),
      choice('lead_more_searching', '◇', '아직 남은 곳이 있을지 모른다며 더 멀리 찾아 나선다', { fear: 2, trust: -1, delay: 1 }, { ending: 'bad_sabbath_rebellion' }, warn)
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
      '마라를 지나고 만나를 먹었지만, 결핍은 다시 찾아옵니다.'
    ],
    prompt: '다시 물이 없을 때 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('recall_marah_and_manna', '▤', '마라와 만나의 일을 떠올리며 성급한 원망을 막는다', { memory: 1, trust: 1 }, { next: 'wilderness_13_massah_meribah' }, record),
      choice('guard_the_vulnerable', '🤝', '아이와 노인의 갈증을 먼저 살핀다', { community: 1, discernment: 1 }, { next: 'wilderness_13_massah_meribah' }, care),
      choice('spread_absence_question', '☾', '여호와가 우리 중에 계시다면 왜 물이 없느냐고 퍼뜨린다', { fear: 1, trust: -1, scatter: 1 }, { next: 'wilderness_13_massah_meribah' }, warn)
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
      '목마름은 실제이지만, 공동체는 이제 하나님을 시험하는 자리 가까이 서 있습니다.'
    ],
    prompt: '다툼이 폭력으로 번지려 할 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('lower_the_stones', '🤝', '돌을 든 사람들 사이에 서서 폭력을 늦춘다', { community: 1, fear: -1 }, { next: 'wilderness_14_rock_command' }, care),
      choice('name_testing_god', '▤', '우리가 하나님을 시험하는 자리에 서 있다고 말한다', { discernment: 1, memory: 1 }, { next: 'wilderness_14_rock_command' }, record),
      choice('join_stone_crowd', '◇', '돌을 든 무리에 섞여 모세를 몰아세운다', { fear: 2, scatter: 1, trust: -2 }, { ending: 'bad_massah_meribah' }, warn)
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
      '백성은 멀리서 그 장면을 바라보며 물 없음의 끝을 기다립니다.'
    ],
    prompt: '반석 앞의 기다림에서 당신은 무엇을 선택하시겠습니까?',
    choices: [
      choice('wait_with_elders', '✦', '장로들의 증언을 신뢰하며 기다리게 한다', { trust: 1, discernment: 1 }, { next: 'wilderness_15_water_from_rock' }, steady),
      choice('hold_the_camp', '🤝', '진영이 몰려가지 않도록 질서를 잡는다', { community: 1, discernment: 1 }, { next: 'wilderness_15_water_from_rock' }, care),
      choice('demand_proof_now', '☾', '지금 당장 보이지 않으면 믿을 수 없다고 말한다', { fear: 1, trust: -1 }, { next: 'wilderness_15_water_from_rock' }, warn)
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
      '이 물은 단순한 해결이 아니라 여호와께서 공동체 가운데 계신가라는 질문에 대한 응답입니다.'
    ],
    prompt: '반석의 물 앞에서 당신은 어떻게 증언하시겠습니까?',
    choices: [
      choice('testify_presence', '✦', '여호와께서 우리 가운데 계심을 증언한다', { trust: 1, memory: 1 }, { next: 'wilderness_16_wilderness_memory' }, steady),
      choice('serve_the_thirsty', '🤝', '약한 사람들에게 물이 먼저 닿도록 돕는다', { community: 1, trust: 1 }, { next: 'wilderness_16_wilderness_memory' }, care),
      choice('drink_and_move_on', '☾', '물을 마시고도 이 사건의 의미를 깊이 생각하지 않는다', { memory: -1, delay: 1 }, { next: 'wilderness_16_wilderness_memory' }, warn)
    ]
  });

  node('wilderness_16_wilderness_memory', 16, {
    location: '호렙을 향한 길목',
    bible: '출애굽기 17:7; 19:1–2',
    title: '질문을 지나 산으로',
    day: '시내산을 향해 나아가는 날',
    place: '시내 광야 길목',
    copy: [
      '그곳은 맛사와 므리바라 불리게 됩니다. 그러나 여정은 거기서 끝나지 않습니다.',
      '공동체는 르비딤을 떠나 시내 광야로 나아갑니다.'
    ],
    prompt: '반석의 물 이후, 당신은 이 길을 어떻게 기억하시겠습니까?',
    choices: [
      choice('carry_memory_to_sinai', '✦', '마라와 만나와 반석의 물을 기억하며 산 아래로 나아간다', { memory: 1, trust: 1 }, { next: 'wilderness_17_sinai_arrival' }, steady),
      choice('help_people_move', '🤝', '지친 사람들을 살피며 함께 시내산으로 이동한다', { community: 1, discernment: 1 }, { next: 'wilderness_17_sinai_arrival' }, care),
      choice('keep_question_as_grudge', '☾', '여호와께서 계신지 아직도 모르겠다며 의심을 원망으로 품는다', { fear: 1, trust: -1, memory: -1 }, { next: 'wilderness_17_sinai_arrival' }, warn)
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
      '바다와 광야의 결핍을 지나온 공동체가 이제 하나님의 산 아래에 섭니다.'
    ],
    prompt: '시내산 아래에서 당신은 어떤 마음으로 진영에 서시겠습니까?',
    choices: [
      choice('remember_deliverance_path', '▤', '해방과 공급의 길을 정리해 들려준다', { memory: 1, trust: 1 }, { next: 'wilderness_18_covenant_offer' }, record),
      choice('settle_the_camp', '🤝', '산 아래 진영이 흩어지지 않도록 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_18_covenant_offer' }, care),
      choice('treat_as_destination', '☾', '드디어 도착했으니 어려운 명령은 끝났다고 말한다', { delay: 1, memory: -1 }, { next: 'wilderness_18_covenant_offer' }, warn)
    ]
  });

  node('wilderness_18_covenant_offer', 18, {
    location: '언약의 말씀이 전해진 진영',
    bible: '출애굽기 19:3–8',
    title: '내 소유가 되리라',
    day: '언약의 제안이 들린 날',
    place: '시내산 아래',
    copy: [
      '하나님은 백성이 그의 말을 듣고 언약을 지키면 제사장 나라와 거룩한 백성이 될 것이라고 말씀하십니다.',
      '백성은 여호와께서 명령하신 대로 다 행하겠다고 응답합니다.'
    ],
    prompt: '언약의 제안 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_covenant_weight', '✦', '구원받은 백성답게 말씀을 듣겠다고 응답한다', { trust: 1, memory: 1 }, { next: 'wilderness_19_thunder_and_fear' }, steady),
      choice('teach_identity', '▤', '제사장 나라와 거룩한 백성의 의미를 되새긴다', { discernment: 1, memory: 1 }, { next: 'wilderness_19_thunder_and_fear' }, record),
      choice('answer_too_lightly', '☾', '무슨 말이든 다 하겠다고 쉽게 따라 외친다', { delay: 1, discernment: -1 }, { next: 'wilderness_19_thunder_and_fear' }, warn)
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
      '백성은 떨며 멀리 섭니다. 거룩함 앞의 두려움과 도망치고 싶은 공포가 뒤섞입니다.'
    ],
    prompt: '두려운 계시 앞에서 당신은 어떤 두려움을 선택하시겠습니까?',
    choices: [
      choice('fear_with_reverence', '✦', '공포로 도망치지 않고 하나님을 경외한다', { trust: 1, discernment: 1 }, { next: 'wilderness_20_waiting_for_moses' }, steady),
      choice('keep_boundary', '🤝', '두려워하는 사람들을 진정시키고 경계를 지키게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_20_waiting_for_moses' }, care),
      choice('want_distance_only', '☾', '하나님의 음성은 너무 두렵다며 멀어지는 것만 원한다', { fear: 1, trust: -1 }, { next: 'wilderness_20_waiting_for_moses' }, warn)
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
      '날이 지나도 모세는 내려오지 않습니다. 처음의 경외는 점점 불안으로 바뀝니다.'
    ],
    prompt: '기다림이 불안으로 변할 때 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('guard_waiting', '✦', '언약의 말씀을 기억하며 기다리자고 말한다', { trust: 1, memory: 1 }, { next: 'wilderness_21_pressure_for_visible_god' }, steady),
      choice('listen_to_anxiety', '🤝', '불안한 사람들의 말을 듣되 결론을 우상으로 몰지 않는다', { community: 1, discernment: 1 }, { next: 'wilderness_21_pressure_for_visible_god' }, care),
      choice('say_he_is_gone', '☾', '모세는 사라졌다고 단정하며 다른 길을 찾자고 말한다', { fear: 1, scatter: 1, trust: -1 }, { next: 'wilderness_21_pressure_for_visible_god' }, warn)
    ]
  });

  node('wilderness_21_pressure_for_visible_god', 21, {
    location: '아론의 장막 앞 군중',
    bible: '출애굽기 32:1–2',
    title: '우리를 인도할 신을 만들라',
    day: '군중이 몰려든 날',
    place: '진영 중앙',
    copy: [
      '백성은 아론에게 몰려와 우리를 위하여 우리를 인도할 신을 만들라고 말합니다.',
      '보이지 않는 하나님을 기다리는 일보다 손에 잡히는 형상을 가지는 일이 더 안전해 보이기 시작합니다.'
    ],
    prompt: '보이는 신을 요구하는 압력 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('refuse_visible_substitute', '✦', '보이는 형상이 하나님을 대신할 수 없다고 말한다', { trust: 1, discernment: 1 }, { next: 'wilderness_22_golden_calf_made' }, steady),
      choice('pull_back_neighbors', '🤝', '가까운 사람들만이라도 군중의 흐름에서 물러서게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_22_golden_calf_made' }, care),
      choice('organize_the_demand', '◇', '형상을 만들 요구를 더 강하게 밀어붙인다', { fear: 2, scatter: 1, trust: -2 }, { ending: 'bad_golden_calf_leader' }, warn)
    ]
  });

  node('wilderness_22_golden_calf_made', 22, {
    location: '금이 모이는 진영',
    bible: '출애굽기 32:2–4',
    title: '금송아지가 만들어지다',
    day: '귀고리가 모인 날',
    place: '시내산 아래',
    copy: [
      '사람들은 금 귀고리를 빼어 모읍니다. 금은 녹고 형상은 송아지의 모습이 됩니다.',
      '누군가는 이것이 우리를 애굽에서 인도해 낸 신이라고 말합니다.'
    ],
    prompt: '금송아지가 만들어지는 장면 앞에서 당신은 무엇을 하시겠습니까?',
    choices: [
      choice('name_the_false_memory', '▤', '이 형상이 우리를 구원한 것이 아니라고 기억을 바로잡는다', { memory: 1, discernment: 1 }, { next: 'wilderness_23_feast_before_calf' }, record),
      choice('hide_the_vulnerable', '🤝', '휩쓸리는 사람들을 축제의 중심에서 멀리 데려간다', { community: 1, fear: -1 }, { next: 'wilderness_23_feast_before_calf' }, care),
      choice('give_gold_willingly', '◇', '내 금도 내어놓고 형상 제작을 돕는다', { trust: -2, memory: -2, fear: 1 }, { ending: 'bad_return_to_idols' }, warn)
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
      '사람들은 먹고 마시며 뛰놉니다. 종교의 언어가 우상 앞에 붙자, 많은 사람은 그것을 예배라고 착각합니다.'
    ],
    prompt: '우상 앞의 축제에서 당신은 어떤 선택을 하시겠습니까?',
    choices: [
      choice('withdraw_from_feast', '✦', '축제의 중심에서 물러나 이것은 예배가 아니라고 말한다', { trust: 1, discernment: 1 }, { next: 'wilderness_24_broken_tablets' }, steady),
      choice('protect_the_uncertain', '🤝', '흔들리는 사람들을 모아 축제에서 떨어져 있게 한다', { community: 1, discernment: 1 }, { next: 'wilderness_24_broken_tablets' }, care),
      choice('join_the_feast', '◇', '여호와의 절기라면 괜찮다며 축제에 참여한다', { trust: -2, memory: -1, scatter: 1 }, { ending: 'bad_idol_feast' }, warn)
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
      '진영의 춤과 송아지를 본 모세는 돌판을 산 아래에서 깨뜨립니다.'
    ],
    prompt: '깨진 돌판 앞에서 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('confess_breach', '✦', '돌판이 깨진 것은 우리가 언약을 깬 표지임을 인정한다', { memory: 1, trust: 1 }, { next: 'wilderness_25_intercession_after_judgment' }, steady),
      choice('gather_the_shaken', '🤝', '두려움에 떠는 사람들을 회개의 자리로 이끈다', { community: 1, discernment: 1 }, { next: 'wilderness_25_intercession_after_judgment' }, care),
      choice('minimize_broken_covenant', '◇', '돌판이 깨졌어도 큰 문제는 아니라며 죄를 가볍게 만든다', { memory: -2, trust: -1, delay: 1 }, { ending: 'bad_covenant_broken' }, warn)
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
      '진영에는 상처와 두려움이 남습니다. 우상 숭배는 끝났지만 그 흔적은 쉽게 사라지지 않습니다.'
    ],
    prompt: '심판과 중보의 시간에 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('stand_in_repentance', '✦', '핑계보다 회개가 먼저라고 고백한다', { trust: 1, memory: 1 }, { next: 'wilderness_26_covenant_remembered' }, steady),
      choice('tend_the_wounded_camp', '🤝', '무너진 진영을 돌보며 다시 말씀을 들을 준비를 돕는다', { community: 1, discernment: 1 }, { next: 'wilderness_26_covenant_remembered' }, care),
      choice('minimize_the_sin', '☾', '모두 불안해서 그런 것이니 큰 죄는 아니었다고 넘긴다', { trust: -1, memory: -1, delay: 1 }, { next: 'wilderness_26_covenant_remembered' }, warn)
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
      '당신의 증언은 결핍 앞의 신뢰를 넘어, 기다림과 두려움 속에서도 우상을 거부하고 언약을 기억하는 자리로 나아갑니다.'
    ],
    prompt: '광야의 증언을 어떻게 마무리하시겠습니까?',
    choices: [
      choice('testify_covenant_witness', '✦', '우상보다 언약을 기억하는 증언으로 남긴다', { trust: 1, memory: 1 }, { ending: 'true_wilderness_covenant_witness' }, steady),
      choice('keep_memory_with_wounds', '▤', '흔들린 공동체의 상처까지 함께 기록한다', { discernment: 1, memory: 1 }, { ending: 'faithful_wilderness_covenant_memory' }, record),
      choice('remain_wounded_but_follow', '☾', '두려움과 후회가 남지만 언약의 길을 떠나지 않는다', { trust: 1, fear: 1 }, { ending: 'wounded_wilderness_covenant_witness' }, care)
    ]
  });
})();
