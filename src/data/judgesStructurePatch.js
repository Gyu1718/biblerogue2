(function applyJudgesStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  window.JUDGES_START_NODE_ID = 'judges_01_after_joshua';
  const TOTAL_PROGRESS = 20;

  const profiles = {
    eli: { name: '엘리야벳', role: '인도자', portrait: 'p1' },
    mira: { name: '미라', role: '기록자', portrait: 'p2' },
    yona: { name: '요나단', role: '보호자', portrait: 'p3' },
    asar: { name: '아사르', role: '탐색자', portrait: 'p4' }
  };

  function line(profileKey, text) { return { ...profiles[profileKey], text }; }
  function choice(key, icon, text, effects, route, companions) { return { key, icon, text, effects: effects || {}, ...route, companions }; }
  function node(nodeId, current, data) { nodes[nodeId] = { id: nodeId, chapter: '4장 · 사사 시대', progress: { current, total: TOTAL_PROGRESS }, ...data }; }

  const remember = [line('mira', '기억이 끊기면 같은 땅도 낯선 제단으로 가득 차게 됩니다.'), line('eli', '다음 세대에게 남길 말이 오늘의 선택에서 시작됩니다.')];
  const care = [line('yona', '흩어진 사람들을 다시 부르는 일이 먼저입니다.'), line('eli', '공동체가 무너지면 부르짖을 목소리도 약해집니다.')];
  const discern = [line('asar', '현실을 살피되 예배의 경계까지 흐리면 안 됩니다.'), line('mira', '지금 보는 일을 정확히 기록해야 반복을 알아볼 수 있습니다.')];
  const warn = [line('asar', '두려움이 말이 되면 곧 길이 되고, 그 길은 공동체를 흩을 수 있습니다.'), line('yona', '작은 타협이 사람들을 어느 제단 앞에 세우는지 보아야 합니다.')];

  node('judges_01_after_joshua', 1, {
    location: '여호수아 이후의 마을',
    bible: '사사기 2:6–10',
    title: '여호수아 이후의 땅',
    day: '정착 이후의 세월',
    place: '가나안의 한 마을',
    copy: [
      '여호수아와 그 세대가 지나간 뒤, 땅은 조용해진 듯 보입니다. 밭에는 싹이 오르고 집들은 흩어진 지파의 언덕마다 자리를 잡습니다.',
      '그러나 평온한 날들은 기억을 시험합니다. 홍해와 광야와 여리고의 이야기는 점점 먼 세대의 말처럼 들리기 시작합니다.',
      '당신은 사사가 아닙니다. 기억이 흐려지는 마을 안에서 무엇을 남길지 선택해야 하는 이름 없는 증인입니다.'
    ],
    prompt: '여호수아 이후의 땅에서 당신은 무엇을 먼저 하시겠습니까?',
    choices: [
      choice('tell_the_story', '▤', '출애굽과 여리고의 일을 아이들에게 들려준다', { memory: 1, community: 1 }, { next: 'judges_02_generation_forgets' }, remember),
      choice('work_the_land_first', '◎', '지금은 땅을 일구는 일이 먼저라고 말한다', { delay: 1, discernment: 1 }, { next: 'judges_02_generation_forgets' }, discern),
      choice('dismiss_old_story', '☾', '옛 이야기는 더 이상 필요 없다고 말한다', { memory: -1, trust: -1 }, { next: 'judges_02_generation_forgets' }, warn)
    ]
  });

  node('judges_02_generation_forgets', 2, {
    location: '기억이 흐려진 장터',
    bible: '사사기 2:10',
    title: '알지 못하는 세대',
    day: '다른 세대가 자라난 날',
    place: '마을 장터',
    copy: [
      '젊은 사람들은 여호와께서 이스라엘을 위하여 행하신 일을 조각난 이야기처럼 듣습니다.',
      '그들에게 애굽은 먼 나라의 이름이고, 광야는 노인들의 긴 회상이며, 여리고는 오래된 성터의 소문입니다.',
      '기억이 끊긴 공동체는 다른 목소리에 더 쉽게 귀를 기울입니다.'
    ],
    prompt: '알지 못하는 세대를 보며 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('name_memory_crisis', '▤', '기억이 끊긴 것을 공동체의 위기로 받아들인다', { memory: 1, discernment: 1 }, { next: 'judges_03_foreign_altars' }, remember),
      choice('teach_again', '🤝', '무관심을 꾸짖기보다 다시 가르치려 한다', { community: 1, memory: 1 }, { next: 'judges_03_foreign_altars' }, care),
      choice('each_way_is_fine', '☾', '각자 믿고 싶은 대로 살면 된다고 말한다', { memory: -1, scatter: 1 }, { next: 'judges_03_foreign_altars' }, warn)
    ]
  });

  node('judges_03_foreign_altars', 3, {
    location: '들판의 제단',
    bible: '사사기 2:11–13',
    title: '들판의 다른 제단',
    day: '풍요 제의가 들어온 날',
    place: '마을 밖 들판',
    copy: [
      '마을 가까운 들판에 낯선 제단이 세워집니다. 사람들은 그것을 풍요를 비는 오래된 풍습이라고 말합니다.',
      '비와 곡식과 가축의 안전을 바라는 마음은 이해되지만, 그 제단 앞에서 부르는 이름은 여호와가 아닙니다.',
      '정착의 땅은 은혜의 자리이지만, 곧 타협의 자리도 될 수 있습니다.'
    ],
    prompt: '들판의 다른 제단 앞에서 당신은 무엇을 말하시겠습니까?',
    choices: [
      choice('name_worship_problem', '◎', '단순한 풍습이 아니라 예배의 문제라고 말한다', { discernment: 1, trust: 1 }, { next: 'judges_04_pressure_to_blend' }, discern),
      choice('listen_to_livelihood_fear', '🤝', '생계 불안을 듣고 조심스럽게 설득한다', { community: 1, discernment: 1 }, { next: 'judges_04_pressure_to_blend' }, care),
      choice('gather_to_baal', '✕', '풍요를 위해 바알 제단 앞에 공동체를 모은다', { trust: -2, memory: -1 }, { ending: 'bad_judges_baal_altar' }, warn)
    ]
  });

  node('judges_04_pressure_to_blend', 4, {
    location: '가나안 사람들과 맞닿은 길목',
    bible: '사사기 2:12–13',
    title: '섞여 사는 법',
    day: '타협이 지혜처럼 들린 날',
    place: '마을 경계의 길',
    copy: [
      '사람들은 말합니다. 이 땅에서 살려면 이 땅의 방식도 알아야 한다고.',
      '이웃과 함께 살아가는 지혜는 필요합니다. 그러나 그 말은 어느새 다른 신 앞에 고개를 숙이는 핑계가 됩니다.',
      '경계를 모두 지우는 일은 평화처럼 보이지만, 예배의 방향까지 흐리게 만들 수 있습니다.'
    ],
    prompt: '섞여 사는 현실 앞에서 당신은 어떻게 구분하시겠습니까?',
    choices: [
      choice('separate_neighbor_from_idol', '◎', '이웃과 사는 것과 우상에 절하는 것은 다르다고 구분한다', { discernment: 1, memory: 1 }, { next: 'judges_05_oppression_begins' }, discern),
      choice('keep_boundary_without_hate', '🤝', '충돌을 피하되 예배의 경계는 지키자고 말한다', { community: 1, discernment: 1 }, { next: 'judges_05_oppression_begins' }, care),
      choice('blur_boundary', '☾', '신앙의 경계는 시대에 맞게 흐려져도 된다고 말한다', { trust: -1, memory: -1, delay: 1 }, { next: 'judges_05_oppression_begins' }, warn)
    ]
  });

  node('judges_05_oppression_begins', 5, {
    location: '약탈당한 밭',
    bible: '사사기 2:14–15; 6:1–6',
    title: '약탈의 계절',
    day: '미디안의 압제가 시작된 때',
    place: '수확이 사라진 들판',
    copy: [
      '수확의 때가 오자 미디안의 무리가 들판을 덮습니다. 곡식과 가축과 희망이 함께 사라집니다.',
      '어제까지 풍요를 약속하던 제단들은 침묵하고, 백성은 굴과 산성으로 숨어 들어갑니다.',
      '압제는 외부에서 왔지만, 공동체는 자기 안의 망각을 마주하게 됩니다.'
    ],
    prompt: '약탈의 계절이 시작될 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('share_hidden_food', '🤝', '숨은 사람들의 식량을 함께 나눈다', { community: 1, fear: -1 }, { next: 'judges_06_hidden_caves' }, care),
      choice('trace_the_cycle', '▤', '왜 이런 일이 반복되는지 기억을 더듬는다', { memory: 1, discernment: 1 }, { next: 'judges_06_hidden_caves' }, remember),
      choice('scatter_to_survive', '☾', '살아남으려면 각자 흩어져야 한다고 말한다', { scatter: 1, fear: 1 }, { next: 'judges_06_hidden_caves' }, warn)
    ]
  });

  node('judges_06_hidden_caves', 6, {
    location: '산굴과 산성',
    bible: '사사기 6:2',
    title: '산굴에 숨은 사람들',
    day: '숨은 생활이 길어진 날',
    place: '산속의 굴',
    copy: [
      '사람들은 밭이 아니라 산굴에서 서로의 얼굴을 확인합니다. 아이들의 울음은 낮아지고, 노인들의 숨은 길어집니다.',
      '살아남는 일은 필요하지만, 숨어 있는 시간이 길어질수록 공동체의 이름도 희미해집니다.',
      '두려움은 사람을 보호하기도 하지만, 오래 머물면 마음의 집이 됩니다.'
    ],
    prompt: '산굴에 숨은 사람들 사이에서 당신은 어떻게 행동하시겠습니까?',
    choices: [
      choice('keep_names', '🤝', '숨어 있어도 서로의 이름을 잊지 않게 한다', { community: 1, memory: 1 }, { next: 'judges_07_cry_rises' }, care),
      choice('watch_enemy_routes', '◎', '주변 움직임을 살피며 위험을 분별한다', { clues: 1, discernment: 1 }, { next: 'judges_07_cry_rises' }, discern),
      choice('leave_weak_behind', '⚠', '약한 사람을 두고 빠져나가자고 말한다', { community: -2, scatter: 1 }, { next: 'judges_07_cry_rises' }, warn)
    ]
  });

  node('judges_07_cry_rises', 7, {
    location: '부르짖음이 모인 굴 입구',
    bible: '사사기 6:6–10',
    title: '부르짖음이 올라가다',
    day: '압제가 깊어진 날',
    place: '산굴의 입구',
    copy: [
      '마침내 백성의 낮은 탄식이 여호와께 향한 부르짖음으로 바뀝니다.',
      '그 부르짖음은 강한 믿음의 선언이라기보다 더는 버틸 수 없다는 고백에 가깝습니다.',
      '그러나 사사시대의 회복은 바로 그 연약한 부르짖음에서 시작됩니다.'
    ],
    prompt: '부르짖음이 올라갈 때 당신은 어떤 자리에 서시겠습니까?',
    choices: [
      choice('cry_together', '✦', '압제 속에서 함께 여호와께 부르짖는다', { trust: 1, community: 1 }, { next: 'judges_08_prophet_rebuke' }, care),
      choice('remember_before_cry', '▤', '우리가 잊은 말씀을 먼저 돌아보자고 말한다', { memory: 1, discernment: 1 }, { next: 'judges_08_prophet_rebuke' }, remember),
      choice('silence_the_cry', '✕', '부르짖어 봐야 소용없다며 사람들을 침묵시킨다', { trust: -2, fear: 1 }, { ending: 'bad_judges_silenced_cry' }, warn)
    ]
  });

  node('judges_08_prophet_rebuke', 8, {
    location: '책망이 들린 자리',
    bible: '사사기 6:8–10',
    title: '잊은 언약의 책망',
    day: '선지자의 말이 온 날',
    place: '숨은 백성의 모임',
    copy: [
      '한 선지자가 백성에게 말합니다. 여호와께서 애굽에서 이끌어 내셨고, 이 땅을 주셨으나 너희는 그 목소리를 듣지 않았다고.',
      '구원의 응답은 먼저 위로가 아니라 기억을 깨우는 책망으로 옵니다.',
      '압제의 이유를 외부에서만 찾던 마음은 이제 자기 안의 잊음을 보아야 합니다.'
    ],
    prompt: '언약의 책망 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_rebuke', '✦', '책망을 변명하지 않고 받아들인다', { memory: 1, trust: 1 }, { next: 'judges_09_winepress_whisper' }, remember),
      choice('retell_rebuke', '▤', '공동체가 들을 수 있게 조용히 다시 전한다', { community: 1, memory: 1 }, { next: 'judges_09_winepress_whisper' }, care),
      choice('need_power_only', '☾', '지금 필요한 것은 책망이 아니라 힘뿐이라고 말한다', { discernment: -1, fear: 1 }, { next: 'judges_09_winepress_whisper' }, warn)
    ]
  });

  node('judges_09_winepress_whisper', 9, {
    location: '오브라의 포도주 틀',
    bible: '사사기 6:11–16',
    title: '포도주 틀의 밀 타작',
    day: '숨어 타작하던 날',
    place: '포도주 틀',
    copy: [
      '기드온은 미디안을 피해 포도주 틀에서 밀을 타작합니다. 영웅의 시작이라기보다 숨어 있는 생존의 장면에 가깝습니다.',
      '그 약한 자리에서 여호와의 사자는 큰 용사라고 부릅니다.',
      '하나님의 부르심은 공동체가 강해진 뒤에만 찾아오지 않습니다. 숨은 자리에서도 말씀은 사람을 일으킵니다.'
    ],
    prompt: '포도주 틀의 약한 부르심 앞에서 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('receive_weak_call', '✦', '약한 자리에서도 하나님이 부르실 수 있음을 받아들인다', { trust: 1, discernment: 1 }, { next: 'judges_10_tear_down_altar' }, remember),
      choice('stand_with_fearful', '🤝', '두려워하는 사람을 비웃지 않고 곁에 선다', { community: 1 }, { next: 'judges_10_tear_down_altar' }, care),
      choice('mock_weakness', '☾', '이런 약한 사람에게는 아무 일도 기대할 수 없다고 말한다', { fear: 1, community: -1 }, { next: 'judges_10_tear_down_altar' }, warn)
    ]
  });

  node('judges_10_tear_down_altar', 10, {
    location: '아버지 집의 바알 제단',
    bible: '사사기 6:25–32',
    title: '밤에 무너진 제단',
    day: '두려운 순종의 밤',
    place: '오브라의 제단 곁',
    copy: [
      '하나님은 기드온에게 아버지의 바알 제단을 헐고 여호와께 제단을 쌓으라고 명하십니다.',
      '이 순종은 적진보다 먼저 자기 마을의 제단을 향합니다. 싸움은 밖에서 시작되지 않고 예배의 자리에서 시작됩니다.',
      '밤은 두려움을 숨기지만, 동시에 오래된 우상을 무너뜨리는 시간이 됩니다.'
    ],
    prompt: '밤에 무너질 제단 앞에서 당신은 어디에 서시겠습니까?',
    choices: [
      choice('stand_against_baal', '✦', '두렵지만 바알 제단을 헐어야 한다는 뜻에 선다', { trust: 1, memory: 1 }, { next: 'judges_11_village_fury' }, remember),
      choice('prepare_for_fury', '🤝', '사람들의 분노를 예상하고 약한 이들을 보호한다', { community: 1, discernment: 1 }, { next: 'judges_11_village_fury' }, care),
      choice('defend_baal_altar', '✕', '바알 제단을 지키기 위해 사람들을 선동한다', { trust: -2, scatter: 1 }, { ending: 'bad_judges_baal_altar' }, warn)
    ]
  });

  node('judges_11_village_fury', 11, {
    location: '분노한 마을 광장',
    bible: '사사기 6:30–32',
    title: '마을의 분노',
    day: '제단이 무너진 아침',
    place: '오브라의 광장',
    copy: [
      '아침이 되자 마을 사람들은 제단이 무너진 것을 보고 분노합니다.',
      '그들은 기드온을 끌어내라 외칩니다. 우상이 무너진 자리에서 공동체의 마음이 얼마나 그 제단에 묶여 있었는지 드러납니다.',
      '요아스는 바알이 신이라면 스스로 다툴 것이라고 말합니다.'
    ],
    prompt: '분노한 마을 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('let_baal_contend', '◎', '바알이 신이라면 스스로 다툴 것이라는 말을 새긴다', { discernment: 1, trust: 1 }, { next: 'judges_12_spirit_clothes_gideon' }, discern),
      choice('stop_mob_violence', '🤝', '분노한 사람들 사이에서 폭력을 막는다', { community: 1, fear: -1 }, { next: 'judges_12_spirit_clothes_gideon' }, care),
      choice('join_mob_fury', '☾', '군중의 분노에 휩쓸려 기드온을 넘기자고 말한다', { fear: 2, community: -1 }, { next: 'judges_12_spirit_clothes_gideon' }, warn)
    ]
  });

  node('judges_12_spirit_clothes_gideon', 12, {
    location: '전쟁 소식이 모인 들',
    bible: '사사기 6:33–35',
    title: '여호와의 영이 임하다',
    day: '미디안이 모인 날',
    place: '이스르엘 골짜기 가까이',
    copy: [
      '미디안과 아말렉과 동방 사람들이 함께 모여 골짜기에 진을 칩니다.',
      '그때 여호와의 영이 기드온에게 임하고, 나팔 소리가 흩어진 사람들을 부릅니다.',
      '공동체는 여전히 작고 두렵지만, 구원의 움직임은 이미 시작되었습니다.'
    ],
    prompt: '전쟁의 부르심 앞에서 당신은 무엇을 기억하시겠습니까?',
    choices: [
      choice('remember_source_of_call', '✦', '이 싸움의 시작이 사람의 힘이 아님을 기억한다', { trust: 1, memory: 1 }, { next: 'judges_13_fleece_night' }, remember),
      choice('call_scattered_tribes', '🤝', '흩어진 지파들에게 조심스럽게 소식을 전한다', { community: 1, clues: 1 }, { next: 'judges_13_fleece_night' }, care),
      choice('declare_defeat_early', '☾', '수가 부족하다며 싸움 전부터 패배를 말한다', { fear: 1, scatter: 1 }, { next: 'judges_13_fleece_night' }, warn)
    ]
  });

  node('judges_13_fleece_night', 13, {
    location: '양털이 놓인 밤',
    bible: '사사기 6:36–40',
    title: '양털 위의 이슬',
    day: '표징을 기다린 밤',
    place: '밤이 내린 마당',
    copy: [
      '기드온은 양털 위의 이슬로 표징을 구합니다. 그 요청에는 믿음보다 두려움이 더 많이 섞여 있는 듯합니다.',
      '그러나 하나님은 연약한 확인의 자리까지 찾아오십니다.',
      '표징은 자랑할 만한 믿음의 증거가 아니라, 두려운 사람이 아직 완전히 돌아서지 않았다는 흔적입니다.'
    ],
    prompt: '양털 위의 이슬을 기다리는 밤, 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('wait_without_pride', '◎', '연약한 확인이 오만이 되지 않도록 조용히 기다린다', { discernment: 1, trust: 1 }, { next: 'judges_14_too_many_people' }, discern),
      choice('hold_fearful_people', '🤝', '두려워하는 사람들을 정죄하기보다 붙든다', { community: 1, fear: -1 }, { next: 'judges_14_too_many_people' }, care),
      choice('demand_endless_signs', '☾', '표징 없이는 결코 움직이지 않겠다고 고집한다', { delay: 1, trust: -1 }, { next: 'judges_14_too_many_people' }, warn)
    ]
  });

  node('judges_14_too_many_people', 14, {
    location: '하롯 샘 곁의 진영',
    bible: '사사기 7:1–3',
    title: '사람이 너무 많다',
    day: '군대가 줄어든 날',
    place: '하롯 샘 곁',
    copy: [
      '하나님은 백성이 너무 많다고 말씀하십니다. 이스라엘이 내 손이 나를 구원했다 말할까 염려하신 것입니다.',
      '두려워 떠는 자들은 돌아가게 됩니다. 대열은 단숨에 작아집니다.',
      '숫자가 줄어드는 일은 패배처럼 보이지만, 하나님은 그 작아짐 속에서 구원의 주체를 분명히 하십니다.'
    ],
    prompt: '사람이 너무 많다는 말씀 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('accept_smallness', '✦', '승리가 우리의 수에서 나오지 않음을 받아들인다', { trust: 1, discernment: 1 }, { next: 'judges_15_water_test' }, remember),
      choice('do_not_mock_returners', '🤝', '돌아가는 사람들을 조롱하지 않고 보내준다', { community: 1 }, { next: 'judges_15_water_test' }, care),
      choice('scatter_more', '✕', '두려움을 핑계로 더 많은 사람을 데리고 도망치자고 한다', { fear: 2, scatter: 1 }, { ending: 'bad_judges_fear_scattered' }, warn)
    ]
  });

  node('judges_15_water_test', 15, {
    location: '물가의 시험',
    bible: '사사기 7:4–8',
    title: '물가의 시험',
    day: '남은 자가 가려진 날',
    place: '물가',
    copy: [
      '하나님은 군사의 수를 다시 줄이십니다. 물가에서 사람들은 구별되고, 남은 수는 삼백 명이 됩니다.',
      '작아진 대열은 사람의 계산으로는 더 불안해 보입니다.',
      '그러나 사사시대의 구원은 종종 사람의 힘이 작아진 자리에서 하나님의 손을 드러냅니다.'
    ],
    prompt: '물가에서 대열이 더 작아질 때 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('trust_lesser_number', '✦', '작아지는 대열 속에서도 하나님의 뜻을 신뢰한다', { trust: 1, memory: 1 }, { next: 'judges_16_enemy_dream' }, remember),
      choice('steady_remaining', '🤝', '남은 사람들의 긴장을 살피고 질서를 세운다', { community: 1, discernment: 1 }, { next: 'judges_16_enemy_dream' }, care),
      choice('shake_remaining', '☾', '이제는 이길 수 없다고 남은 사람들을 흔든다', { fear: 1, scatter: 1 }, { next: 'judges_16_enemy_dream' }, warn)
    ]
  });

  node('judges_16_enemy_dream', 16, {
    location: '미디안 진영 가까이',
    bible: '사사기 7:9–15',
    title: '적진의 꿈',
    day: '밤에 들은 꿈',
    place: '미디안 진영의 가장자리',
    copy: [
      '밤에 적진 가까이 내려가자, 한 사람이 꿈 이야기를 합니다. 보리떡 하나가 미디안 장막을 무너뜨렸다는 꿈입니다.',
      '적의 입에서 두려움의 해석이 흘러나옵니다. 하나님은 이스라엘의 작은 대열뿐 아니라 적진의 마음도 흔들고 계십니다.',
      '두려움은 이제 다른 방향으로 움직이기 시작합니다.'
    ],
    prompt: '적진의 꿈을 들은 뒤 당신은 무엇을 전하시겠습니까?',
    choices: [
      choice('remember_enemy_fear', '✦', '적진의 두려움도 하나님 손 안에 있음을 기억한다', { trust: 1, memory: 1 }, { next: 'judges_17_jars_and_torches' }, remember),
      choice('tell_without_exaggeration', '◎', '들은 것을 과장하지 않고 필요한 만큼만 전한다', { discernment: 1, community: 1 }, { next: 'judges_17_jars_and_torches' }, discern),
      choice('boast_after_dream', '☾', '적도 두려워하니 우리가 마음대로 해도 된다고 말한다', { discernment: -1, fear: 1 }, { next: 'judges_17_jars_and_torches' }, warn)
    ]
  });

  node('judges_17_jars_and_torches', 17, {
    location: '항아리와 횃불의 밤',
    bible: '사사기 7:16–22',
    title: '항아리와 횃불',
    day: '미디안 진영이 무너진 밤',
    place: '미디안 진영 둘레',
    copy: [
      '삼백 명은 나팔과 빈 항아리와 횃불을 들고 적진을 둘러섭니다.',
      '항아리가 깨지고 횃불이 드러나며 나팔 소리가 밤을 가릅니다. 미디안 진영은 스스로 무너져 혼란에 빠집니다.',
      '작은 도구와 작은 대열을 통해 하나님은 압제자의 진영을 흔드십니다.'
    ],
    prompt: '항아리와 횃불의 밤, 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('trust_small_tools', '✦', '작은 도구로 일하시는 하나님을 신뢰한다', { trust: 1, memory: 1 }, { next: 'judges_18_victory_aftershock' }, remember),
      choice('keep_order_in_confusion', '🤝', '혼란 속에서도 공동체 대열을 지킨다', { community: 1, discernment: 1 }, { next: 'judges_18_victory_aftershock' }, care),
      choice('think_spoils_first', '☾', '혼란을 틈타 약탈을 먼저 생각한다', { community: -1, discernment: -1 }, { next: 'judges_18_victory_aftershock' }, warn)
    ]
  });

  node('judges_18_victory_aftershock', 18, {
    location: '승리 이후의 모임',
    bible: '사사기 7:23–25; 8:22–23',
    title: '승리 이후의 떨림',
    day: '미디안이 물러간 뒤',
    place: '전리품이 모인 진영',
    copy: [
      '미디안이 무너진 뒤 사람들은 기드온에게 다스려 달라고 말합니다. 당신과 당신의 아들과 손자가 우리를 다스리라 합니다.',
      '그러나 기드온은 여호와께서 너희를 다스리실 것이라고 대답합니다.',
      '승리 이후의 위험은 패배의 두려움과 다릅니다. 사람들은 하나님의 구원을 사람의 왕좌로 바꾸고 싶어 합니다.'
    ],
    prompt: '승리 이후 지도자를 높이려는 말 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('confess_lord_rules', '✦', '여호와께서 다스리신다는 고백을 붙든다', { trust: 1, discernment: 1 }, { next: 'judges_19_gold_ephod' }, remember),
      choice('honor_without_idol', '🤝', '승리한 사람을 높이되 하나님 자리를 넘기지 말자고 말한다', { memory: 1, community: 1 }, { next: 'judges_19_gold_ephod' }, care),
      choice('ask_for_human_king', '☾', '이제는 강한 지도자가 왕처럼 다스려야 한다고 말한다', { trust: -1, memory: -1 }, { next: 'judges_19_gold_ephod' }, warn)
    ]
  });

  node('judges_19_gold_ephod', 19, {
    location: '오브라에 모인 금',
    bible: '사사기 8:24–27',
    title: '금으로 만든 기억',
    day: '전리품이 모인 날',
    place: '오브라',
    copy: [
      '기드온은 사람들에게 전리품 중 귀고리를 달라고 합니다. 모인 금은 에봇이 되어 오브라에 놓입니다.',
      '처음에는 승리의 기억처럼 보였지만, 그것은 이스라엘에게 올무가 됩니다.',
      '하나님이 하신 일을 붙들려는 마음도 금과 형상에 묶이면 다시 우상으로 기울 수 있습니다.'
    ],
    prompt: '금으로 만든 기억 앞에서 당신은 무엇을 경계하시겠습니까?',
    choices: [
      choice('warn_ephod_snare', '◎', '승리의 기념이 우상이 될 수 있음을 경고한다', { discernment: 1, memory: 1 }, { next: 'judges_20_cycle_remains' }, discern),
      choice('record_god_act', '▤', '전리품보다 하나님이 하신 일을 기록한다', { memory: 1, trust: 1 }, { next: 'judges_20_cycle_remains' }, remember),
      choice('build_gold_symbol', '✕', '금을 모아 승리의 상징을 세우자고 부추긴다', { trust: -2, memory: -1 }, { ending: 'bad_judges_spoils_idol' }, warn)
    ]
  });

  node('judges_20_cycle_remains', 20, {
    location: '반복의 그늘이 남은 땅',
    bible: '사사기 2:16–19; 8:33–35',
    title: '반복의 그늘',
    day: '구원 이후의 세월',
    place: '다시 조용해진 마을',
    copy: [
      '압제는 물러가고 땅은 다시 조용해집니다. 그러나 사사시대의 조용함은 언제나 다음 망각의 문턱일 수 있습니다.',
      '사사가 죽은 후 사람들은 다시 돌이켜 더 타락하곤 했습니다. 기억하지 않는 구원은 쉽게 반복의 일부가 됩니다.',
      '당신은 이 시대의 끝에서 무엇을 증언으로 남길지 결정해야 합니다.'
    ],
    prompt: '반복의 그늘 앞에서 당신은 어떤 증언을 남기시겠습니까?',
    choices: [
      choice('keep_memory_next_generation', '✦', '다음 세대가 잊지 않도록 구원의 일을 기록하고 전한다', { memory: 1, community: 1 }, { ending: 'true_judges_memory_kept' }, remember),
      choice('testify_return', '▤', '흔들렸지만 부르짖고 돌아온 길을 증언한다', { trust: 1, memory: 1 }, { ending: 'faithful_judges_cry_and_return' }, care),
      choice('confess_wound', '☾', '구원을 보았지만 반복의 두려움이 아직 남았다고 고백한다', { fear: 1, discernment: 1 }, { ending: 'wounded_judges_trembling_generation' }, discern),
      choice('accept_cycle', '✕', '이 반복은 어쩔 수 없는 삶의 방식이라고 받아들인다', { memory: -2, trust: -1 }, { ending: 'bad_judges_cycle_hardened' }, warn)
    ]
  });
})();
