(function applyExodusStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  const TOTAL = 32;
  const P = {
    eli: ['엘리야벳', '인도자', 'p1'],
    mira: ['미라', '기록자', 'p2'],
    yona: ['요나단', '보호자', 'p3'],
    asar: ['아사르', '탐색자', 'p4']
  };

  function c(key, text) {
    const [name, role, portrait] = P[key];
    return { name, role, portrait, text };
  }

  function choice(key, icon, text, effects, route, companions) {
    return { key, icon, text, effects: effects || {}, ...route, companions };
  }

  function setNode(id, data) {
    nodes[id] = { ...(nodes[id] || {}), id, ...data };
  }

  function setChoices(id, choices) {
    if (!nodes[id]) return;
    nodes[id].choices = choices;
  }

  function node(id, current, title, location, bible, day, place, image, copy, prompt, choices) {
    setNode(id, {
      chapter: '1장 · 출애굽',
      title,
      location,
      bible,
      day,
      place,
      progress: { current, total: TOTAL },
      image,
      copy: Array.isArray(copy) ? copy : [copy],
      prompt,
      choices
    });
  }

  function progress(id, current) {
    if (nodes[id]) nodes[id].progress = { current, total: TOTAL };
  }

  function observeChoices(next) {
    return [
      choice('remember_and_trust', '▤', '이 일을 우연으로 넘기지 않고 기억해 두자고 말한다', { memory: 1, trust: 1 }, { next }, [
        c('mira', '기억하겠습니다. 재앙은 단순한 사건이 아니라 애굽의 질서가 흔들린 흔적입니다.'),
        c('eli', '기억하는 사람은 다음 두려움 앞에서도 완전히 길을 잃지 않습니다.')
      ]),
      choice('steady_the_people', '🤝', '놀란 사람들을 진정시키며 함께 상황을 살핀다', { community: 1, discernment: 1 }, { next }, [
        c('yona', '공포는 재앙보다 빠르게 번집니다. 사람들을 한곳에 모으겠습니다.'),
        c('asar', '두려움을 사실로 나누어 보면 다음 걸음이 보입니다.')
      ]),
      choice('wait_in_fear', '☾', '더 확실해질 때까지 아무 말도 하지 말자고 한다', { fear: 1, delay: 1 }, { next }, [
        c('mira', '침묵이 신중함이 될 때도 있지만, 오래 이어지면 기억해야 할 일을 놓칠 수 있습니다.'),
        c('eli', '두려움 때문에 멈추는 시간이 길어지면 부르심의 방향도 희미해집니다.')
      ])
    ];
  }

  [
    ['exodus_01_slave_day', 1], ['exodus_02_whisper', 2], ['exodus_03_pharaoh', 3],
    ['exodus_04_plague_begin', 5], ['exodus_05_set_apart', 10], ['exodus_06_darkness', 16],
    ['exodus_07_passover', 19], ['exodus_08_departure', 21], ['exodus_09_wilderness_edge', 23],
    ['exodus_10_redsea', 26], ['exodus_10b_care_branch', 27], ['exodus_10c_discern_branch', 27],
    ['exodus_11_crossing', 29], ['exodus_12_deliverance', 32]
  ].forEach(([id, current]) => progress(id, current));

  setChoices('exodus_03_pharaoh', [
    choice('watch_the_burden', '◎', '분노를 삼키고 더 무거워진 노동의 의미를 지켜본다', { discernment: 1, fear: 1 }, { next: 'exodus_03b_crushed_workers' }, [
      c('mira', '멈추어 바라보는 일도 기록될 만합니다.'),
      c('eli', '고통이 커질수록 약속을 오해하기 쉽습니다. 그래도 이야기는 끝나지 않았습니다.')
    ]),
    choice('gather_people', '🤝', '흔들리는 사람들을 모아 서로의 사정을 살핀다', { community: 1 }, { next: 'exodus_03b_crushed_workers' }, [
      c('yona', '모두가 흩어지기 전에 서로의 얼굴을 보게 해야 합니다.'),
      c('eli', '공동체가 무너지면 약속을 들을 귀도 사라집니다.')
    ]),
    choice('submit_to_egypt', '◇', '지금은 애굽의 질서 안에서 버티는 편이 낫다고 말한다', { fear: 2, trust: -1 }, { ending: 'bad_bricks_forever' }, [
      c('mira', '그 말은 벽돌 곁에 더 오래 머물자는 말이 될 수 있습니다.'),
      c('eli', '익숙한 억압을 안전으로 오해하면 해방의 길이 보이지 않습니다.')
    ])
  ]);

  node('exodus_03b_crushed_workers', 4, '희망 뒤의 무거운 벽돌', '짚 없는 벽돌터', '출애굽기 5:6–21', '바로의 거절 이후', '벽돌터', 'exodus_03b_crushed_workers.png', [
    '짚은 주지 않으면서 벽돌 수는 그대로 채우라는 명령이 내려옵니다.',
    '희망이 왔다고 들었는데, 노동은 더 무거워졌습니다.',
    '증인은 해방의 첫걸음이 왜 고통처럼 보이는지 몸으로 겪습니다.'
  ], '당신은 더 무거워진 노동 앞에서 무엇을 붙드시겠습니까?', [
    choice('hold_promise', '✦', '고통이 커졌지만 약속이 끝난 것은 아니라고 말한다', { trust: 1, memory: 1 }, { next: 'exodus_04_plague_begin' }, [c('eli', '약속은 때로 더 깊은 어둠을 지나 드러납니다.'), c('mira', '이 모순도 기록하겠습니다.')]),
    choice('care_for_workers', '🤝', '지친 노동자들을 살피고 무너진 사람을 일으킨다', { community: 1 }, { next: 'exodus_04_plague_begin' }, [c('yona', '오늘 무너진 사람을 붙드는 일이 내일의 대열을 지킬 것입니다.'), c('asar', '조용히 움직여야 합니다.')]),
    choice('stop_hoping', '☾', '지금은 희망을 말하기보다 더 지켜보자고 한다', { fear: 1, delay: 1 }, { next: 'exodus_04_plague_begin' }, [c('mira', '희망을 완전히 접으면 보아야 할 표지도 보이지 않을 수 있습니다.'), c('eli', '마음이 닫히지 않게 해야 합니다.')])
  ]);

  setNode('exodus_04_plague_begin', {
    chapter: '1장 · 출애굽',
    title: '재앙의 시작',
    location: '흔들리는 애굽',
    bible: '출애굽기 7:14–18',
    day: '첫 재앙의 아침',
    place: '나일 강가',
    progress: { current: 5, total: TOTAL },
    image: 'exodus_04a_water_to_blood.png',
    copy: ['모세와 아론이 다시 바로 앞에 섭니다.', '애굽의 강과 신들과 권세가 심판의 무대가 됩니다.', '당신은 이름 없는 증인으로 이 일을 보고 기억해야 합니다.'],
    prompt: '당신은 재앙의 시작 앞에서 어떻게 서겠습니까?',
    choices: observeChoices('exodus_04a_water_to_blood')
  });

  node('exodus_04a_water_to_blood', 6, '피로 변한 강', '나일 강가', '출애굽기 7:14–25', '첫째 재앙', '나일 강', 'exodus_04a_water_to_blood.png', ['애굽의 생명줄이던 강이 붉게 변합니다.', '물고기가 죽고 강가의 냄새가 고센까지 전해집니다.', '첫 재앙은 애굽이 의지하던 근원이 흔들리는 장면입니다.'], '당신은 피로 변한 강을 어떻게 해석하시겠습니까?', observeChoices('exodus_04b_frogs'));
  node('exodus_04b_frogs', 7, '집 안까지 올라온 개구리', '애굽의 집과 뜰', '출애굽기 8:1–15', '둘째 재앙', '애굽의 거리', 'exodus_04b_frogs.png', ['개구리들이 강에서 올라와 집과 침상과 그릇까지 덮습니다.', '왕궁과 평민의 집이 같은 혼란 속에 놓입니다.', '익숙한 삶의 경계가 무너집니다.'], '당신은 일상의 경계를 무너뜨린 재앙 앞에서 무엇을 하시겠습니까?', observeChoices('exodus_04c_gnats'));
  node('exodus_04c_gnats', 8, '먼지에서 일어난 이', '마른 흙먼지의 길', '출애굽기 8:16–19', '셋째 재앙', '애굽의 길목', 'exodus_04c_gnats.png', ['아론이 땅의 티끌을 치자 작은 벌레들이 일어납니다.', '애굽의 요술사들은 더는 흉내 내지 못합니다.', '작고 하찮아 보이는 것이 제국의 자신감을 무너뜨립니다.'], '당신은 요술사들의 한계를 본 뒤 어떻게 반응하시겠습니까?', observeChoices('exodus_04d_flies'));
  node('exodus_04d_flies', 9, '고센을 비껴간 파리 떼', '고센과 애굽의 경계', '출애굽기 8:20–32', '넷째 재앙', '고센 경계', 'exodus_04d_flies.png', ['파리 떼가 애굽의 집과 뜰을 덮지만 고센은 보존됩니다.', '백성은 구별이라는 말을 몸으로 느낍니다.', '구별은 누구에게 속했는지를 드러내는 표지입니다.'], '당신은 고센의 구별을 어떻게 받아들이시겠습니까?', [
    choice('remember_distinction', '✦', '구별받았다는 사실을 겸손히 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_05_set_apart' }, [c('eli', '구별은 자랑이 아니라 책임입니다.'), c('mira', '이 기억은 광야에서도 필요할 것입니다.')]),
    choice('steady_goshen', '🤝', '고센 사람들이 들뜨지 않도록 서로를 진정시킨다', { community: 1, discernment: 1 }, { next: 'exodus_05_set_apart' }, [c('yona', '조롱과 들뜸은 위험을 부릅니다.'), c('asar', '길은 아직 끝나지 않았습니다.')]),
    choice('boast_goshen', '☾', '우리 쪽은 안전하다고 들뜬 말을 퍼뜨린다', { fear: 1, delay: 1 }, { next: 'exodus_05_set_apart' }, [c('eli', '구별이 교만으로 변하면 애굽의 마음을 닮게 됩니다.'), c('mira', '증언은 조롱이 아닙니다.')])
  ]);

  setChoices('exodus_05_set_apart', [
    choice('remember_set_apart', '✦', '우리를 구별하시는 하나님을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_05a_livestock_death' }, [c('eli', '구별은 자랑이 아니라 책임입니다.'), c('mira', '고센의 보존을 기록하겠습니다.')]),
    choice('still_doubt', '◎', '표지를 보았지만 아직 더 살펴야 한다고 말한다', { discernment: 1 }, { next: 'exodus_05a_livestock_death' }, [c('asar', '질문은 분별이 될 수 있습니다.'), c('mira', '냉소가 되면 기억을 지웁니다.')]),
    choice('mock_egyptians', '☾', '애굽의 고통을 보며 우리 쪽은 안전하다고 들뜬다', { community: -1, fear: 1 }, { next: 'exodus_05a_livestock_death' }, [c('eli', '고통을 조롱하는 마음은 해방된 백성의 마음이 아닙니다.'), c('yona', '들뜬 말이 충돌을 부를 수 있습니다.')])
  ]);

  node('exodus_05a_livestock_death', 11, '쓰러진 애굽의 가축', '애굽의 들판', '출애굽기 9:1–7', '다섯째 재앙', '고센 바깥 들판', 'exodus_05a_livestock_death.png', ['애굽의 가축에게 죽음이 지나갑니다.', '고센의 가축은 보존되지만 애굽의 들판에는 침묵이 남습니다.', '생존의 기반이 흔들리자 자신감이 사라집니다.'], '당신은 죽은 가축의 들판을 보며 무엇을 붙드시겠습니까?', observeChoices('exodus_05b_boils'));
  node('exodus_05b_boils', 12, '몸에 번진 악성 종기', '재가 날리는 광장', '출애굽기 9:8–12', '여섯째 재앙', '애굽의 광장', 'exodus_05b_boils.png', ['화덕의 재가 하늘로 흩어지고 악성 종기가 돋습니다.', '요술사들도 모세 앞에 서지 못합니다.', '제국의 힘은 사람의 피부 위에서 무력하게 드러납니다.'], '당신은 몸의 고통까지 번진 재앙 앞에서 어떻게 하시겠습니까?', observeChoices('exodus_05c_hail'));
  node('exodus_05c_hail', 13, '불 섞인 우박', '부서진 들판', '출애굽기 9:13–35', '일곱째 재앙', '애굽의 들판', 'exodus_05c_hail.png', ['하늘에서 우박과 불이 쏟아집니다.', '바로는 잠시 죄를 인정하는 듯하지만 다시 마음을 굳힙니다.', '심판의 소리가 하늘에서 울립니다.'], '당신은 다시 굳어지는 바로를 보며 무엇을 배우시겠습니까?', observeChoices('exodus_05d_locusts'));
  node('exodus_05d_locusts', 14, '남은 것을 삼킨 메뚜기', '황폐해진 밭', '출애굽기 10:1–20', '여덟째 재앙', '애굽의 밭', 'exodus_05d_locusts.png', ['메뚜기 떼가 우박 뒤에 남은 것까지 삼켜 버립니다.', '땅은 어두워지고 마지막 기대마저 사라집니다.', '바로는 또 흔들리는 듯하지만 해방의 문을 열지 않습니다.'], '당신은 사라진 들판 앞에서 어떻게 서겠습니까?', observeChoices('exodus_06a_darkness'));
  node('exodus_06a_darkness', 15, '손으로 만질 듯한 어둠', '애굽의 어둠', '출애굽기 10:21–29', '아홉째 재앙', '애굽 전역', 'exodus_06a_darkness.png', ['애굽 전역에 손으로 만질 듯한 어둠이 내려앉습니다.', '그러나 이스라엘 자손이 있는 곳에는 빛이 있습니다.', '빛과 어둠의 경계가 삶의 현실이 됩니다.'], '당신은 짙은 어둠 속에서 무엇을 하시겠습니까?', [
    choice('prepare_in_light', '🤝', '빛이 있는 곳에서 가족과 이웃을 조용히 준비시킨다', { community: 1, trust: 1 }, { next: 'exodus_06_darkness' }, [c('yona', '가까운 사람을 붙드는 것이 필요합니다.'), c('eli', '빛이 주어진 곳에서 준비해야 합니다.')]),
    choice('watch_darkness', '◎', '어둠이 무엇을 드러내는지 더 살핀다', { discernment: 1, memory: 1 }, { next: 'exodus_06_darkness' }, [c('asar', '애굽의 어둠과 고센의 빛이 갈라졌습니다.'), c('mira', '기록하겠습니다.')]),
    choice('rumor_in_dark', '☾', '마지막 재앙이 올까 두려워 불안한 소문을 퍼뜨린다', { fear: 1, scatter: 1 }, { next: 'exodus_06_darkness' }, [c('yona', '소문은 어둠보다 더 많은 길을 막습니다.'), c('eli', '두려움으로 움직이면 각자 살 길만 찾게 됩니다.')])
  ]);

  setNode('exodus_06_darkness', {
    chapter: '1장 · 출애굽', title: '어둠 뒤의 경고', location: '어둠의 재앙', bible: '출애굽기 10:21–29', day: '마지막 밤 전', place: '히브리인의 거처', progress: { current: 16, total: TOTAL }, image: 'exodus_06b_firstborn_warning.png',
    copy: ['어둠이 지나간 뒤에도 마음은 쉽게 밝아지지 않습니다.', '마지막 경고가 고센까지 흘러옵니다.', '준비해야 할 때와 흔들릴 때는 비슷한 얼굴로 찾아옵니다.'],
    prompt: '당신은 마지막 경고가 다가오는 밤에 어떻게 준비하시겠습니까?', choices: observeChoices('exodus_06b_firstborn_warning')
  });

  node('exodus_06b_firstborn_warning', 17, '마지막 밤의 경고', '문 앞의 낮은 방', '출애굽기 11:1–10', '열째 재앙 전야', '히브리인의 거처', 'exodus_06b_firstborn_warning.png', ['마지막 재앙에 대한 경고가 전해집니다.', '애굽의 집마다 큰 울음이 있을 것이라는 말이 사람들의 숨을 멎게 합니다.', '이제 순종은 집의 문과 식탁 위에 남아야 합니다.'], '당신은 장자 재앙의 경고 앞에서 어떻게 반응하시겠습니까?', [
    choice('receive_warning', '✦', '경고를 가볍게 여기지 않고 말씀의 순서를 확인한다', { trust: 1, discernment: 1 }, { next: 'exodus_06c_passover_instruction' }, [c('eli', '말씀의 순서를 붙들어야 합니다.'), c('mira', '경고의 무게도 기록하겠습니다.')]),
    choice('steady_households', '🤝', '각 집이 두려움에 무너지지 않도록 조용히 돕는다', { community: 1, memory: 1 }, { next: 'exodus_06c_passover_instruction' }, [c('yona', '집집마다 차분히 살피겠습니다.'), c('asar', '문과 짐과 대열을 확인해야 합니다.')]),
    choice('soften_warning', '☾', '사람들이 놀라지 않게 경고를 조금 부드럽게 전한다', { fear: 1, delay: 1 }, { next: 'exodus_06c_passover_instruction' }, [c('mira', '경고의 무게까지 지우면 안 됩니다.'), c('eli', '순종을 흐리게 만드는 위로는 위험합니다.')])
  ]);

  node('exodus_06c_passover_instruction', 18, '어린 양을 준비하라', '문 안쪽의 낮은 방', '출애굽기 12:1–13', '유월절 준비의 날', '히브리인의 집', 'exodus_06c_passover_instruction.png', ['어린 양을 고르고 피를 문설주와 인방에 발라야 합니다.', '허리에 띠를 띠고 신을 신고 지팡이를 손에 잡아야 합니다.', '순종은 마음속 결심만으로 끝나지 않습니다.'], '당신은 유월절 준비를 어떻게 이끌겠습니까?', [
    choice('prepare_by_the_word', '✦', '말씀의 순서를 하나씩 확인하며 집안을 준비시킨다', { trust: 1, discernment: 1 }, { next: 'exodus_07_passover' }, [c('eli', '순종은 말씀의 순서를 따라가는 일입니다.'), c('asar', '문과 식탁과 짐을 확인하겠습니다.')]),
    choice('ask_and_obey', '◎', '이유를 묻되 준비를 늦추지 않고 따른다', { discernment: 1, trust: 1 }, { next: 'exodus_07_passover' }, [c('mira', '질문은 더 깊이 기억하기 위한 것이어야 합니다.'), c('eli', '묻는 마음과 따르는 발이 함께 있어야 합니다.')]),
    choice('delay_the_marking', '◇', '사람들이 납득할 때까지 표지를 잠시 미루자고 한다', { delay: 2, fear: 1, trust: -1 }, { ending: 'bad_unmarked_door' }, [c('yona', '시간이 많지 않습니다. 표지를 미루면 집 전체가 위험해집니다.'), c('mira', '문 위의 표지는 마음속 결심으로 대체될 수 없습니다.')])
  ]);

  setChoices('exodus_07_passover', [
    choice('mark_door', '✦', '말씀대로 문설주에 피를 바르고 가족을 준비시킨다', { trust: 1, community: 1, memory: 1 }, { next: 'exodus_07b_passover_meal' }, [c('eli', '오늘 밤의 순종은 공동체를 살리는 표지가 될 것입니다.'), c('mira', '피의 표지를 기록하겠습니다.')]),
    choice('obey_without_understanding', '▤', '이해되지 않지만 말씀의 순서대로 따른다', { trust: 1 }, { next: 'exodus_07b_passover_meal' }, [c('mira', '말씀을 따라 걷는 중에 의미가 열립니다.'), c('asar', '필요한 것은 준비와 이동입니다.')]),
    choice('ignore_mark', '◇', '가정마다 형편껏 표시해도 충분하지 않겠느냐고 말한다', { trust: -2, delay: 1 }, { ending: 'bad_unmarked_door' }, [c('mira', '표지를 가볍게 여기는 것은 이 밤의 의미를 가볍게 여기는 일입니다.'), c('eli', '말씀의 표지는 문 위에 남아야 합니다.')])
  ]);

  node('exodus_07b_passover_meal', 20, '서서 먹는 식탁', '표시된 문 안의 식탁', '출애굽기 12:8–14; 12:21–30', '유월절의 밤', '문 안쪽 식탁', 'exodus_07b_passover_meal.png', ['가족들은 무교병과 쓴 나물을 앞에 두고 서둘러 식탁에 둘러섭니다.', '문밖 어딘가에서 낮은 울음이 밤을 가릅니다.', '이 식사는 떠남을 몸에 새기는 시간입니다.'], '당신은 표시된 문 안의 식탁에서 무엇을 하시겠습니까?', [
    choice('teach_the_children', '▤', '아이들에게 이 밤의 뜻을 짧게 설명한다', { memory: 1, community: 1 }, { next: 'exodus_08_departure' }, [c('mira', '자녀들이 묻는 밤은 기억이 시작되는 밤입니다.'), c('eli', '떠남은 이야기와 함께 시작되어야 합니다.')]),
    choice('keep_ready_to_move', '✦', '짐과 대열을 바로 움직일 수 있게 둔다', { trust: 1, discernment: 1 }, { next: 'exodus_08_departure' }, [c('asar', '문 곁에 짐을 모아두겠습니다.'), c('yona', '급한 떠남일수록 질서가 필요합니다.')]),
    choice('eat_in_silence_fear', '☾', '두려움 때문에 아무 말 없이 식탁만 바라본다', { fear: 1 }, { next: 'exodus_08_departure' }, [c('yona', '누군가는 숨을 돌리게 해야 합니다.'), c('mira', '이 밤을 두려움만으로 남기지 마십시오.')])
  ]);

  setChoices('exodus_08_departure', [
    choice('help_children_depart', '🤝', '아이들과 노인들이 먼저 대열에 설 수 있게 돕는다', { community: 1, memory: 1 }, { next: 'exodus_08b_hasty_departure' }, [c('yona', '가장 느린 사람도 함께 나가야 공동체가 살아납니다.'), c('mira', '함께 떠난 이름들의 기록으로 남아야 합니다.')]),
    choice('carry_unleavened_memory', '▤', '부풀지 못한 빵을 보며 이 밤을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_08b_hasty_departure' }, [c('mira', '급히 떠난 흔적은 구원의 속도를 기억하게 합니다.'), c('eli', '기억하는 백성은 길 위에서 이유를 잊지 않습니다.')]),
    choice('stay_for_safety', '◇', '아직 위험하니 조금 더 남아 상황을 보자고 한다', { fear: 2, delay: 2, trust: -1 }, { ending: 'bad_stayed_in_egypt' }, [c('asar', '오늘 밤의 문은 오래 열려 있지 않습니다.'), c('eli', '남는 것은 애굽을 마지막 피난처로 삼는 일일 수 있습니다.')])
  ]);

  node('exodus_08b_hasty_departure', 22, '부풀지 못한 빵', '애굽의 문밖', '출애굽기 12:31–42', '떠남의 밤', '애굽의 거리', 'exodus_08b_hasty_departure.png', ['애굽의 집들에서 통곡이 번져 나오는 동안 히브리인들은 문밖으로 나섭니다.', '손에는 짐이 있고 발에는 먼지가 묻습니다.', '해방은 급한 떠남에 가깝습니다.'], '당신은 급히 떠나는 밤에 어떻게 움직이시겠습니까?', [
    choice('keep_households_together', '🤝', '가정들이 서로 떨어지지 않게 대열을 맞춘다', { community: 1, discernment: 1 }, { next: 'exodus_09_wilderness_edge' }, [c('yona', '흩어진 해방은 곧 두려움이 됩니다.'), c('asar', '길은 아직 끝나지 않았습니다.')]),
    choice('remember_the_cry', '▤', '애굽의 통곡과 표시된 문을 함께 기억한다', { memory: 1, trust: 1 }, { next: 'exodus_09_wilderness_edge' }, [c('mira', '구원과 심판이 같은 어둠 안에 있었습니다.'), c('eli', '기억은 승리감보다 깊어야 합니다.')]),
    choice('each_family_first', '◇', '약한 사람은 각자 따라오게 하고, 각 가정이 자기 식구부터 데리고 나가자고 한다', { scatter: 2, fear: 1, community: -1 }, { ending: 'bad_scattered_people' }, [c('yona', '흩어진 사람은 함께 건널 수 없습니다.'), c('eli', '가장 느린 사람을 버리는 순간, 해방의 길은 공동체의 길이 아니게 됩니다.')])
  ]);

  setChoices('exodus_09_wilderness_edge', [
    choice('hold_line_forward', '✦', '대열을 붙들고 앞으로 나아가자고 말한다', { trust: 1, community: 1 }, { next: 'exodus_09c_chariots_approach' }, [c('yona', '대열이 무너지지 않으면 아직 길을 볼 수 있습니다.'), c('eli', '부르심은 앞으로 걷게 합니다.')]),
    choice('count_pursuers', '◎', '뒤쪽 먼지와 대열의 상태를 살핀다', { discernment: 1 }, { next: 'exodus_09c_chariots_approach' }, [c('asar', '멀리 먼지가 일어납니다.'), c('mira', '공포가 전부가 아니라고 기록하겠습니다.')]),
    choice('turn_back_to_egypt', '◇', '차라리 애굽과 다시 협상해 목숨을 구하자고 말한다', { fear: 2, scatter: 1, trust: -1 }, { ending: 'bad_return_to_egypt' }, [c('yona', '그 말이 퍼지면 발이 뒤로 돌아섭니다.'), c('mira', '노예의 질서가 다시 안전처럼 보입니다.')])
  ]);

  node('exodus_09c_chariots_approach', 24, '다가오는 병거 소리', '광야의 끝', '출애굽기 14:5–9', '추격의 날', '바다 앞 광야', 'exodus_09c_chariots_approach.png', ['바로의 병거가 먼지를 일으키며 따라옵니다.', '앞에는 바다가 있고 뒤에는 애굽의 속도가 있습니다.', '해방의 길은 갑자기 덫처럼 보입니다.'], '당신은 다가오는 병거 소리 앞에서 무엇을 하시겠습니까?', [
    choice('steady_the_rear', '🤝', '뒤쪽 대열이 무너지지 않게 사람들을 붙든다', { community: 1, trust: 1 }, { next: 'exodus_09b_people_panic' }, [c('yona', '뒤쪽이 무너지면 전체가 흩어집니다.'), c('eli', '해방의 길은 두려워하는 사람을 버리지 않는 길이어야 합니다.')]),
    choice('read_distance', '◎', '병거의 거리와 바람의 방향을 살핀다', { discernment: 1 }, { next: 'exodus_09b_people_panic' }, [c('asar', '공포를 사실로 나누어야 합니다.'), c('mira', '무작정 뛰지 않아야 합니다.')]),
    choice('run_before_others', '◇', '먼저 안전한 길을 확인하겠다며 앞쪽으로 뛰쳐나간다', { scatter: 2, fear: 1 }, { ending: 'bad_scattered_people' }, [c('yona', '그 움직임을 보고 사람들이 따라 흩어집니다.'), c('eli', '그 선택은 공동체를 무너뜨릴 수 있습니다.')])
  ]);

  node('exodus_09b_people_panic', 25, '살아난 노예의 목소리', '바다로 밀려가는 대열', '출애굽기 14:10–12', '추격의 밤', '바다 앞 광야', 'exodus_09b_people_panic.png', ['병거 바퀴 소리가 커지고 바다가 길을 막습니다.', '누군가 애굽에 매장지가 없어서 이곳으로 데려왔느냐고 외칩니다.', '두려움은 방금 떠난 애굽을 다시 그리워하게 만듭니다.'], '당신은 공포에 흔들리는 백성 사이에서 어떻게 서겠습니까?', [
    choice('answer_panic_with_memory', '▤', '유월절의 밤과 열린 문을 기억하자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_10_redsea' }, [c('mira', '기억이 없으면 공포가 역사를 다시 씁니다.'), c('eli', '바다 앞에서도 이야기가 끝난 것은 아닙니다.')]),
    choice('steady_the_panic_line', '🤝', '소리치는 사람들 사이에 서서 숨을 고르게 돕는다', { community: 1, fear: -1 }, { next: 'exodus_10_redsea' }, [c('yona', '무너지지 않는 대열이 필요합니다.'), c('asar', '질서가 유지되면 다음 신호를 받을 수 있습니다.')]),
    choice('join_the_complaint', '◇', '애굽에 있을 때가 차라리 안정적이었다는 말에 동조한다', { fear: 2, trust: -1, scatter: 1 }, { ending: 'bad_return_to_egypt' }, [c('mira', '해방의 기억을 애굽의 안전으로 바꾸는 말입니다.'), c('eli', '지금 그 방향은 위험합니다.')])
  ]);

  setChoices('exodus_10_redsea', [
    choice('stand_and_watch', '✦', '두려워하지 말고 여호와의 구원을 보자고 말한다', { trust: 1, memory: 1 }, { next: 'exodus_10c_discern_branch' }, [c('eli', '병거보다 크신 분을 바라보자는 고백입니다.'), c('mira', '두려움만 기록되게 하지는 맙시다.')]),
    choice('check_the_weak', '🤝', '아이들과 노인들이 흩어지지 않았는지 먼저 살핀다', { community: 1, discernment: 1 }, { next: 'exodus_10b_care_branch' }, [c('yona', '가장 약한 사람이 어디 있는지 살피는 것이 공동체의 방향을 정합니다.'), c('asar', '뒤쪽을 붙들면 함께 움직일 수 있습니다.')]),
    choice('wait_until_certain', '◇', '물이 완전히 안정될 때까지 기다리자고 한다', { delay: 2, fear: 1 }, { ending: 'bad_closed_sea' }, [c('asar', '열린 길도 때를 놓치면 닫힐 수 있습니다.'), c('mira', '길이 열렸을 때 걷지 않으면, 길은 오래 기다려주지 않습니다.')])
  ]);

  setChoices('exodus_10b_care_branch', [
    choice('hold_the_rear', '🤝', '뒤쪽 대열을 붙들며 함께 건널 준비를 시킨다', { community: 1, trust: 1 }, { next: 'exodus_10d_pillar_between' }, [c('yona', '뒤를 지키는 사람이 있어야 앞의 길도 공동체의 길이 됩니다.'), c('eli', '가장 느린 사람을 기준으로 삼아야 합니다.')]),
    choice('send_each_family', '◇', '각 가정이 자기 식구부터 챙기고, 뒤처진 사람은 스스로 따라오게 하자고 한다', { scatter: 2, community: -1, fear: 1 }, { ending: 'bad_scattered_people' }, [c('eli', '약한 사람을 각자에게 맡기는 순간, 공동체는 이미 흩어집니다.'), c('mira', '흩어진 사람은 함께 건널 수 없습니다.')])
  ]);

  setChoices('exodus_10c_discern_branch', [
    choice('cross_in_pairs', '🤝', '사람들을 둘씩 묶어 질서 있게 지나가게 한다', { community: 1, discernment: 1 }, { next: 'exodus_10d_pillar_between' }, [c('yona', '서로를 놓치지 않게 해야 합니다.'), c('asar', '질서가 곧 속도입니다.')]),
    choice('watch_the_timing', '◎', '기둥과 바람의 움직임을 살피며 이동 신호를 기다린다', { discernment: 1, trust: 1 }, { next: 'exodus_10d_pillar_between' }, [c('asar', '움직임의 때를 보는 것이 중요합니다.'), c('mira', '분별은 걸어야 할 때를 알아보는 눈입니다.')])
  ]);

  node('exodus_10d_pillar_between', 28, '사이에 선 구름 기둥', '이스라엘과 애굽 사이', '출애굽기 14:19–20', '바다 앞의 밤', '진영 사이의 어둠과 빛', 'exodus_10d_pillar_between.png', ['하나님의 사자가 움직이고 구름 기둥이 뒤로 옮겨갑니다.', '기둥은 애굽과 이스라엘 사이에 섭니다.', '두려움이 사라진 것은 아니지만 두려움만이 전부는 아니게 됩니다.'], '당신은 구름 기둥이 사이에 선 밤에 무엇을 하시겠습니까?', [
    choice('name_the_pillar', '✦', '하나님이 우리와 애굽 사이에 서셨다고 말한다', { trust: 1, memory: 1 }, { next: 'exodus_10e_night_of_fear' }, [c('eli', '이 고백은 사람들을 다시 숨 쉬게 합니다.'), c('mira', '이 밤의 보호를 기록하겠습니다.')]),
    choice('reorder_the_line', '🤝', '밤이 길어질 것을 생각해 대열을 다시 정비한다', { community: 1, discernment: 1 }, { next: 'exodus_10e_night_of_fear' }, [c('yona', '서로를 다시 세워야 합니다.'), c('asar', '모두가 함께 움직여야 합니다.')]),
    choice('hide_until_morning', '◇', '기둥이 막아주니 아침까지 숨어 기다리자고 한다', { delay: 2, fear: 1 }, { ending: 'bad_closed_sea' }, [c('asar', '보호는 멈추라는 신호가 아닐 수 있습니다.'), c('eli', '길이 열릴 때 숨어 있으면, 보호는 순종의 핑계가 아니라 지체의 핑계가 됩니다.')])
  ]);

  node('exodus_10e_night_of_fear', 29, '물벽 사이의 밤', '열린 바다 앞', '출애굽기 14:21–22', '바다가 갈라진 밤', '홍해 길목', 'exodus_10e_night_of_fear.png', ['바람이 밤새 바다를 물러가게 합니다.', '길은 열렸지만 물벽은 두렵습니다.', '해방의 길은 말씀을 따라 걷는 길처럼 보입니다.'], '당신은 열린 길 앞에서 어떻게 움직이시겠습니까?', [
    choice('walk_by_word', '✦', '두려워도 말씀을 따라 걸음을 내딛는다', { trust: 1, memory: 1 }, { next: 'exodus_11_crossing' }, [c('eli', '믿음은 두려움 속에서도 멈추지 않는 걸음입니다.'), c('mira', '바다의 길은 기억으로 붙들어야 합니다.')]),
    choice('walk_with_weak', '🤝', '약한 사람들과 보폭을 맞추며 들어간다', { community: 1, discernment: 1 }, { next: 'exodus_11_crossing' }, [c('yona', '서로의 손을 놓지 않으면 끝까지 건널 수 있습니다.'), c('asar', '보폭을 맞추는 일이 흩어짐을 막습니다.')]),
    choice('freeze_before_walls', '◇', '물벽이 두려워 입구에서 더 기다리자고 한다', { fear: 2, delay: 1 }, { ending: 'bad_closed_sea' }, [c('yona', '멈추면 뒤따르는 사람들까지 막힙니다.'), c('mira', '길이 열린 뒤의 멈춤은 오래 버틸 수 없습니다.')])
  ]);

  setChoices('exodus_11_crossing', [
    choice('keep_walking_together', '✦', '흔들려도 멈추지 말고 함께 걷자고 격려한다', { trust: 1, community: 1 }, { next: 'exodus_11b_last_steps' }, [c('eli', '두려움 속에서도 멈추지 않는 걸음입니다.'), c('yona', '대열이 안정되고 있습니다.')]),
    choice('name_the_memory', '▤', '지금 보고 있는 일을 잊지 말자고 말한다', { memory: 1, trust: 1 }, { next: 'exodus_11b_last_steps' }, [c('mira', '바다의 길은 기억으로 붙들어야 합니다.'), c('asar', '앞에는 새벽빛이 보입니다.')]),
    choice('freeze_between_walls', '◇', '물벽이 두려워 중간에서 걸음을 멈춘다', { fear: 2, delay: 2 }, { ending: 'bad_closed_sea' }, [c('yona', '멈추면 뒤따르는 사람들까지 막힙니다.'), c('mira', '길 한가운데서 멈춘 확신은 길을 잃게 만들 수 있습니다.')])
  ]);

  node('exodus_11b_last_steps', 30, '새벽 직전의 마지막 걸음', '바다 길의 끝', '출애굽기 14:24–31', '해방의 새벽 직전', '맞은편 해변', 'exodus_11b_last_steps.png', ['바다 길의 끝이 가까워집니다.', '아직 모두가 다 건넌 것은 아닙니다.', '구원은 끝까지 함께 건너야 완성됩니다.'], '당신은 마지막 걸음 앞에서 무엇을 하시겠습니까?', [
    choice('wait_for_the_last', '🤝', '마지막 사람까지 건너왔는지 확인한다', { community: 1, trust: 1 }, { next: 'exodus_12b_song_of_shore' }, [c('yona', '마지막 사람까지 건너는 일입니다.'), c('eli', '마지막 사람을 기다리는 선택이 이 길의 의미를 지킵니다.')]),
    choice('bow_in_silence', '✦', '말없이 무릎을 꿇고 하나님이 여신 길을 바라본다', { trust: 1, memory: 1 }, { next: 'exodus_12b_song_of_shore' }, [c('mira', '이 침묵은 경외에 가깝습니다.'), c('asar', '새벽이 오면 의미가 더 분명해질 것입니다.')]),
    choice('rush_without_looking_back', '◇', '거의 다 왔다며 뒤처진 사람은 두고 각자 먼저 해변으로 오르게 한다', { fear: 1, scatter: 2, community: -1 }, { ending: 'bad_scattered_people' }, [c('yona', '뒤를 보지 않는 안도는 곁의 사람을 놓치게 합니다.'), c('eli', '마지막 사람을 버리는 순간, 함께 건넌 길은 흩어진 도망이 됩니다.')])
  ]);

  node('exodus_12b_song_of_shore', 31, '해변의 첫 노래', '맞은편 해변', '출애굽기 15:1–2', '해방의 새벽', '홍해 건너편', 'exodus_12b_song_of_shore.png', ['새벽빛 아래에서 바다는 다시 닫히고 백성은 맞은편 해변에 섭니다.', '처음에는 숨소리만 들리다가 곧 노래가 시작됩니다.', '증인은 무엇을 기억하고 전할지 선택해야 합니다.'], '당신은 해방의 새벽에 무엇을 남기시겠습니까?', [
    choice('sing_the_lord', '✦', '여호와께서 높고 영화로우시다고 노래한다', { trust: 1, memory: 1 }, { next: 'exodus_12_deliverance' }, [c('eli', '노래는 해방의 주인이 누구인지 밝히는 고백입니다.'), c('mira', '새벽은 노래로 기억될 것입니다.')]),
    choice('name_the_people', '🤝', '함께 건넌 이들의 이름을 하나씩 확인한다', { community: 1, memory: 1 }, { next: 'exodus_12_deliverance' }, [c('yona', '해방은 얼굴들의 이야기입니다.'), c('mira', '이름 없는 사람들의 이름을 잊지 않겠습니다.')]),
    choice('only_catch_breath', '☾', '아직 아무 말도 하지 못하고 숨만 고른다', { fear: 1 }, { next: 'exodus_12_deliverance' }, [c('asar', '숨을 고르는 것도 필요합니다.'), c('eli', '다만 이 새벽을 잊지는 마십시오.')])
  ]);

  setChoices('exodus_12_deliverance', [
    choice('remember_for_children', '▤', '이 밤을 자녀들에게 전하겠다고 다짐한다', { memory: 1 }, { endingResolver: 'exodus' }, [c('mira', '기억은 살아남은 사람의 의무입니다.'), c('eli', '이 길이 어떻게 열렸는지 말해야 합니다.')]),
    choice('remain_in_relief', '☾', '살아남았다는 안도감에만 잠시 머문다', { fear: -1 }, { endingResolver: 'exodus' }, [c('yona', '안도감만 남으면 의미를 잊을 수 있습니다.'), c('asar', '광야의 길은 이제 시작입니다.')]),
    choice('remember_names', '🤝', '함께 건넌 이들의 이름을 기억한다', { community: 1, memory: 1 }, { endingResolver: 'exodus' }, [c('mira', '해방은 숫자가 아니라 얼굴들의 이야기입니다.'), c('eli', '함께 건넌 사람들을 기억해야 합니다.')])
  ]);
})();