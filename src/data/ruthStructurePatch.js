(function applyRuthStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  window.RUTH_START_NODE_ID = 'ruth_01_famine_in_bethlehem';
  const TOTAL_PROGRESS = 18;

  const profiles = {
    eli: { name: '엘리야벳', role: '인도자', portrait: 'p1' },
    mira: { name: '미라', role: '기록자', portrait: 'p2' },
    yona: { name: '요나단', role: '보호자', portrait: 'p3' },
    asar: { name: '아사르', role: '탐색자', portrait: 'p4' }
  };

  function line(profileKey, text) { return { ...profiles[profileKey], text }; }
  function choice(key, icon, text, effects, route, companions) { return { key, icon, text, effects: effects || {}, ...route, companions }; }
  function node(nodeId, current, data) { nodes[nodeId] = { id: nodeId, chapter: '5장 · 룻', progress: { current, total: TOTAL_PROGRESS }, ...data }; }

  const hesed = [line('eli', '작은 신실함은 때로 보이지 않는 계보를 붙듭니다.'), line('mira', '이 장면은 크게 외치지 않지만 오래 남을 증언입니다.')];
  const care = [line('yona', '빈손으로 돌아온 사람을 공동체 밖에 세워 두면 안 됩니다.'), line('eli', '약자를 부끄럽게 하지 않는 환대가 이 길을 엽니다.')];
  const discern = [line('asar', '성급한 말보다 질서 있는 책임이 필요합니다.'), line('mira', '우연처럼 보이는 길도 기록해 두어야 합니다.')];
  const warn = [line('asar', '배제는 때로 가장 조용하게 은혜의 문을 닫습니다.'), line('yona', '작은 이삭을 빼앗는 손은 결국 공동체의 밭을 메마르게 합니다.')];

  node('ruth_01_famine_in_bethlehem', 1, {
    location: '흉년이 든 베들레헴',
    bible: '룻기 1:1',
    title: '떡집의 흉년',
    day: '사사들이 다스리던 어느 날',
    place: '베들레헴',
    copy: [
      '사사들이 다스리던 때, 떡집이라 불리는 베들레헴에도 흉년이 듭니다.',
      '엘리멜렉의 가족은 양식을 찾아 모압 지방으로 떠날 준비를 합니다. 떠남은 믿음 없는 도피처럼만 보이지 않습니다. 굶주림 앞에서 사람은 살 길을 찾습니다.',
      '당신은 룻도 나오미도 아닙니다. 결핍 앞에서 떠나는 가족과 남겨진 공동체를 바라보는 이름 없는 증인입니다.'
    ],
    prompt: '흉년이 든 베들레헴에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('share_need_in_famine', '🤝', '흉년 속에서도 서로의 필요를 살피자고 말한다', { community: 1, fear: -1 }, { next: 'ruth_02_road_to_moab' }, care),
      choice('understand_leaving_fear', '◎', '떠나는 가족을 정죄하기보다 두려움을 이해한다', { discernment: 1, community: 1 }, { next: 'ruth_02_road_to_moab' }, discern),
      choice('cut_communal_burden', '☾', '각자 살 길을 찾으라며 공동체 책임을 끊는다', { scatter: 1, community: -1 }, { next: 'ruth_02_road_to_moab' }, warn)
    ]
  });

  node('ruth_02_road_to_moab', 2, {
    location: '모압으로 향하는 길',
    bible: '룻기 1:1–2',
    title: '모압으로 가는 길',
    day: '베들레헴을 떠난 날',
    place: '유다와 모압 사이의 길',
    copy: [
      '길은 유다 산지를 지나 모압을 향해 이어집니다. 익숙한 땅은 뒤로 멀어지고, 낯선 이름들이 앞에 놓입니다.',
      '생존을 위한 떠남이지만, 떠나는 길 위에서도 무엇을 기억할지는 여전히 남은 문제입니다.',
      '낯선 땅에서 배고픔은 잠시 해결될 수 있어도, 이름과 하나님을 잊는 일은 더 깊은 결핍이 될 수 있습니다.'
    ],
    prompt: '모압으로 가는 길에서 당신은 무엇을 붙드시겠습니까?',
    choices: [
      choice('remember_leavers_in_prayer', '✦', '떠나는 사람들의 불안을 기도로 기억한다', { memory: 1, trust: 1 }, { next: 'ruth_03_house_of_losses' }, hesed),
      choice('keep_name_in_foreign_land', '▤', '낯선 땅에서도 여호와의 이름을 잊지 말자고 말한다', { memory: 1, discernment: 1 }, { next: 'ruth_03_house_of_losses' }, discern),
      choice('live_as_moab', '☾', '모압에서는 모압의 신과 방식대로 살면 된다고 말한다', { memory: -1, trust: -1 }, { next: 'ruth_03_house_of_losses' }, warn)
    ]
  });

  node('ruth_03_house_of_losses', 3, {
    location: '모압의 빈집',
    bible: '룻기 1:3–5',
    title: '남겨진 세 여인',
    day: '상실이 겹친 뒤',
    place: '모압 땅의 집',
    copy: [
      '엘리멜렉이 죽고, 뒤이어 말론과 기룐도 죽습니다. 집에는 나오미와 룻과 오르바만 남습니다.',
      '베들레헴을 떠난 가족의 이름은 낯선 땅에서 더 작아지고, 세 여인은 남편과 아들과 보호의 이름을 잃습니다.',
      '상실 앞에서 설명은 너무 쉽게 잔인해집니다. 이제 곁에 남을 것인지, 밀어낼 것인지가 드러납니다.'
    ],
    prompt: '남겨진 세 여인 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('stay_with_loss', '🤝', '상실한 이들의 곁을 떠나지 않는다', { community: 1, trust: 1 }, { next: 'ruth_04_news_from_bethlehem' }, care),
      choice('keep_silence_with_grief', '◎', '슬픔을 설명하려 하기보다 함께 침묵한다', { discernment: 1, community: 1 }, { next: 'ruth_04_news_from_bethlehem' }, discern),
      choice('push_widows_away', '✕', '이제 각자 살 길을 찾으라며 세 여인을 밀어낸다', { community: -2, scatter: 1 }, { ending: 'bad_ruth_left_widows' }, warn)
    ]
  });

  node('ruth_04_news_from_bethlehem', 4, {
    location: '귀향의 소식이 들린 모압',
    bible: '룻기 1:6',
    title: '베들레헴의 소식',
    day: '양식의 소식이 온 날',
    place: '모압의 길목',
    copy: [
      '나오미는 여호와께서 자기 백성을 돌보셔서 양식을 주셨다는 소식을 듣습니다.',
      '그 소식은 큰 기적처럼 요란하지 않습니다. 그러나 빈집에 남은 사람에게는 돌아갈 수 있다는 작은 빛이 됩니다.',
      '돌아감은 쉬운 일이 아닙니다. 베들레헴은 고향이지만, 나오미에게는 빈손의 수치가 기다리는 곳이기도 합니다.'
    ],
    prompt: '베들레헴의 소식 앞에서 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('see_grace_in_news', '✦', '돌아갈 수 있다는 소식 속에서 은혜의 흔적을 본다', { trust: 1, memory: 1 }, { next: 'ruth_05_three_women_road' }, hesed),
      choice('consider_shame_return', '🤝', '빈손으로 돌아갈 사람의 수치를 함께 생각한다', { community: 1, discernment: 1 }, { next: 'ruth_05_three_women_road' }, care),
      choice('mock_return', '☾', '돌아가도 달라질 것이 없다고 냉소한다', { fear: 1, trust: -1 }, { next: 'ruth_05_three_women_road' }, warn)
    ]
  });

  node('ruth_05_three_women_road', 5, {
    location: '유다로 향하는 갈림길',
    bible: '룻기 1:7–14',
    title: '세 여인의 길',
    day: '이별이 놓인 길',
    place: '모압과 유다 사이의 길',
    copy: [
      '나오미와 두 며느리는 유다 땅을 향해 길을 나섭니다. 그러나 길 한복판에서 나오미는 며느리들에게 돌아가라고 말합니다.',
      '오르바는 울며 떠나고, 룻은 나오미를 붙듭니다.',
      '같은 슬픔 앞에서도 길은 갈라집니다. 떠남과 남음 모두 눈물의 무게를 가집니다.'
    ],
    prompt: '세 여인의 길에서 당신은 어떤 마음을 가지시겠습니까?',
    choices: [
      choice('honor_orpah_grief', '◎', '오르바의 떠남도 슬픔 속의 선택으로 존중한다', { discernment: 1, community: 1 }, { next: 'ruth_06_ruth_clings' }, discern),
      choice('watch_ruth_cling', '✦', '룻이 남으려는 마음을 조용히 지켜본다', { memory: 1, trust: 1 }, { next: 'ruth_06_ruth_clings' }, hesed),
      choice('drive_both_away', '✕', '두 며느리 모두 짐이 될 뿐이라고 몰아낸다', { community: -2, scatter: 1 }, { ending: 'bad_ruth_left_widows' }, warn)
    ]
  });

  node('ruth_06_ruth_clings', 6, {
    location: '룻이 붙든 길',
    bible: '룻기 1:15–18',
    title: '어머니의 하나님',
    day: '룻이 고백한 날',
    place: '귀향길의 먼지 위',
    copy: [
      '룻은 나오미를 붙들고 말합니다. 어머니의 백성이 나의 백성이 되고, 어머니의 하나님이 나의 하나님이 되실 것이라고.',
      '그 고백은 이방 여인의 입에서 나옵니다. 사사시대의 어둠 속에서 밖으로부터 신실함이 들어옵니다.',
      '룻의 헤세드는 혈통과 계산을 넘어 나오미의 길에 자신을 묶습니다.'
    ],
    prompt: '룻의 고백 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_outside_grace', '✦', '룻의 고백을 하나님의 은혜가 밖에서 들어오는 표지로 본다', { trust: 1, memory: 1 }, { next: 'ruth_07_return_to_bethlehem' }, hesed),
      choice('honor_loyal_love', '🤝', '나오미 곁을 지키려는 룻의 신실함을 존중한다', { community: 1, discernment: 1 }, { next: 'ruth_07_return_to_bethlehem' }, care),
      choice('reject_moabite_woman', '✕', '모압 여인이 이스라엘 공동체에 들어오는 것을 거부한다', { community: -2, memory: -1 }, { ending: 'bad_ruth_left_widows' }, warn)
    ]
  });

  node('ruth_07_return_to_bethlehem', 7, {
    location: '베들레헴 성읍',
    bible: '룻기 1:19–22',
    title: '빈손으로 돌아온 이름',
    day: '보리 추수 시작 무렵',
    place: '베들레헴',
    copy: [
      '나오미와 룻이 베들레헴에 이르자 온 성읍이 술렁입니다. 이이가 나오미냐고 묻는 소리가 퍼집니다.',
      '나오미는 자신을 나오미라 부르지 말고 마라라 부르라 말합니다. 풍족하게 나갔으나 비어 돌아왔다고 고백합니다.',
      '그들이 돌아온 때는 보리 추수가 시작될 무렵입니다. 빈손의 귀향 곁에 조용한 시작이 놓입니다.'
    ],
    prompt: '빈손으로 돌아온 이름 앞에서 당신은 무엇을 하시겠습니까?',
    choices: [
      choice('do_not_simplify_grief', '◎', '나오미의 쓴 고백을 가볍게 위로하지 않는다', { discernment: 1, community: 1 }, { next: 'ruth_08_barley_harvest' }, discern),
      choice('welcome_returned', '🤝', '돌아온 이를 공동체 안으로 맞아들인다', { community: 1, trust: 1 }, { next: 'ruth_08_barley_harvest' }, care),
      choice('shame_returned', '✕', '실패해서 돌아온 사람이라며 수치를 더한다', { community: -2, fear: 1 }, { ending: 'bad_ruth_left_widows' }, warn)
    ]
  });

  node('ruth_08_barley_harvest', 8, {
    location: '보리 추수의 밭',
    bible: '룻기 1:22; 2:1–3',
    title: '보리 추수의 시작',
    day: '룻이 밭으로 나간 날',
    place: '베들레헴의 밭',
    copy: [
      '보리 추수가 시작되고, 룻은 이삭을 주우러 밭으로 나가겠다고 말합니다.',
      '그가 찾는 것은 큰 기회가 아니라 하루를 잇게 할 작은 이삭입니다.',
      '낮은 자리에서 시작된 걸음은 우연히 보아스에게 속한 밭으로 향합니다.'
    ],
    prompt: '보리 추수의 시작에서 당신은 어떻게 돕겠습니까?',
    choices: [
      choice('remember_gleaning_law', '▤', '율법이 남겨 둔 이삭이 약자를 위한 길임을 기억한다', { memory: 1, discernment: 1 }, { next: 'ruth_09_field_of_boaz' }, hesed),
      choice('watch_ruth_safety', '🤝', '룻이 안전하게 밭으로 가도록 살핀다', { community: 1, clues: 1 }, { next: 'ruth_09_field_of_boaz' }, care),
      choice('drive_gleaner_out', '✕', '이삭 줍는 사람은 방해가 된다며 내쫓는다', { community: -2, trust: -1 }, { ending: 'bad_ruth_field_exploitation' }, warn)
    ]
  });

  node('ruth_09_field_of_boaz', 9, {
    location: '보아스의 밭',
    bible: '룻기 2:3–7',
    title: '보아스의 밭',
    day: '이삭을 주운 첫날',
    place: '보아스에게 속한 밭',
    copy: [
      '룻은 이 밭 저 밭을 지나 우연히 보아스에게 속한 밭에 이릅니다.',
      '일꾼들은 그가 모압 지방에서 나오미와 함께 돌아온 소녀라고 말합니다.',
      '우연처럼 보이는 길 위에서 이름 없는 환대의 가능성이 열리기 시작합니다.'
    ],
    prompt: '보아스의 밭에서 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('see_providence_in_field', '✦', '우연처럼 보이는 만남 속에서 조용한 인도를 본다', { trust: 1, memory: 1 }, { next: 'ruth_10_boaz_greeting' }, hesed),
      choice('help_work_without_shame', '🤝', '룻이 부끄러움 없이 일할 수 있게 곁에서 돕는다', { community: 1 }, { next: 'ruth_10_boaz_greeting' }, care),
      choice('question_moabite_presence', '☾', '모압 여인이 밭에 있다는 사실을 문제 삼는다', { community: -1, fear: 1 }, { next: 'ruth_10_boaz_greeting' }, warn)
    ]
  });

  node('ruth_10_boaz_greeting', 10, {
    location: '축복이 오간 밭',
    bible: '룻기 2:4–13',
    title: '여호와께서 너희와 함께하시기를',
    day: '보아스가 밭에 온 날',
    place: '보아스의 밭',
    copy: [
      '보아스가 밭에 이르러 일꾼들에게 여호와께서 너희와 함께하시기를 원한다고 인사합니다.',
      '그는 룻에게 다른 밭으로 가지 말고 이곳에 머물며, 소년들이 건드리지 못하게 하겠다고 말합니다.',
      '룻은 어찌하여 이방 여인인 자신에게 은혜를 베푸느냐고 묻습니다.'
    ],
    prompt: '보아스의 환대 앞에서 당신은 무엇을 배우시겠습니까?',
    choices: [
      choice('learn_boaz_hesed', '✦', '보아스의 환대를 공동체가 배워야 할 헤세드로 본다', { trust: 1, community: 1 }, { next: 'ruth_11_handfuls_left' }, hesed),
      choice('protect_water_and_work', '🤝', '룻이 안전하게 물을 마시고 일하도록 돕는다', { community: 1, discernment: 1 }, { next: 'ruth_11_handfuls_left' }, care),
      choice('resent_protection', '✕', '약자를 보호하라는 말을 귀찮게 여긴다', { community: -1, memory: -1 }, { ending: 'bad_ruth_field_exploitation' }, warn)
    ]
  });

  node('ruth_11_handfuls_left', 11, {
    location: '일부러 남긴 이삭 사이',
    bible: '룻기 2:14–17',
    title: '일부러 남겨 둔 이삭',
    day: '룻이 풍성히 주운 날',
    place: '곡식 단 사이',
    copy: [
      '보아스는 룻을 식탁에 가까이 앉게 하고 볶은 곡식을 건넵니다.',
      '그리고 일꾼들에게 곡식 단 사이에서도 줍게 하고, 일부러 조금씩 뽑아 버려 룻이 줍게 하라고 말합니다.',
      '룻이 얻은 것은 법이 허락한 최소치보다 넉넉한 은혜입니다.'
    ],
    prompt: '일부러 남겨 둔 이삭 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('see_abundant_kindness', '◎', '남겨 둔 이삭이 율법을 넘어선 친절임을 본다', { discernment: 1, trust: 1 }, { next: 'ruth_12_naomi_hears_boaz' }, discern),
      choice('learn_unshaming_care', '🤝', '약자를 부끄럽게 하지 않는 배려를 배운다', { community: 1, memory: 1 }, { next: 'ruth_12_naomi_hears_boaz' }, care),
      choice('steal_left_handfuls', '✕', '남겨 준 곡식까지 빼앗아 내 몫으로 삼는다', { community: -2, trust: -1 }, { ending: 'bad_ruth_field_exploitation' }, warn)
    ]
  });

  node('ruth_12_naomi_hears_boaz', 12, {
    location: '나오미의 집',
    bible: '룻기 2:18–23',
    title: '기업 무를 자의 이름',
    day: '룻이 보리를 가져온 저녁',
    place: '베들레헴의 작은 집',
    copy: [
      '룻이 가져온 보리를 보고 나오미는 그가 누구의 밭에서 일했는지 묻습니다.',
      '보아스라는 이름을 들은 나오미의 말이 달라집니다. 그는 우리 기업을 무를 자 중 하나라고 말합니다.',
      '빈손의 집 안에 이름 하나가 조용히 소망처럼 놓입니다.'
    ],
    prompt: '보아스의 이름이 들린 저녁, 당신은 무엇을 생각하시겠습니까?',
    choices: [
      choice('see_redeemer_hope', '✦', '나오미의 말 속에서 회복의 가능성을 본다', { trust: 1, memory: 1 }, { next: 'ruth_13_threshing_floor_plan' }, hesed),
      choice('respect_order', '◎', '성급히 결론 내리지 않고 공동체의 질서를 살핀다', { discernment: 1, community: 1 }, { next: 'ruth_13_threshing_floor_plan' }, discern),
      choice('mock_old_custom', '☾', '그런 제도는 오래된 관습일 뿐이라고 조롱한다', { memory: -1, discernment: -1 }, { next: 'ruth_13_threshing_floor_plan' }, warn)
    ]
  });

  node('ruth_13_threshing_floor_plan', 13, {
    location: '타작마당을 향한 준비',
    bible: '룻기 3:1–5',
    title: '타작마당으로 가는 밤',
    day: '나오미가 길을 알려 준 날',
    place: '나오미의 집과 타작마당 사이',
    copy: [
      '나오미는 룻에게 보아스가 밤에 타작마당에 있을 것이라고 말합니다.',
      '그 길은 가볍지 않습니다. 약자가 보호와 책임을 요청하는 길은 늘 오해와 위험을 동반합니다.',
      '그러나 나오미의 말 속에는 룻의 안식처를 찾으려는 마음이 담겨 있습니다.'
    ],
    prompt: '타작마당으로 가는 밤을 앞두고 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('see_request_as_rest', '◎', '약자의 요청이 부끄러움이 아니라 회복의 길일 수 있음을 본다', { discernment: 1, trust: 1 }, { next: 'ruth_14_feet_uncovered' }, discern),
      choice('guard_ruth_risk', '🤝', '룻이 위험에 노출되지 않도록 조심스럽게 살핀다', { community: 1, clues: 1 }, { next: 'ruth_14_feet_uncovered' }, care),
      choice('spread_gossip_plan', '✕', '이 일을 가십으로 퍼뜨려 룻을 위험하게 만든다', { community: -2, scatter: 1 }, { ending: 'bad_ruth_closed_gate' }, warn)
    ]
  });

  node('ruth_14_feet_uncovered', 14, {
    location: '밤의 타작마당',
    bible: '룻기 3:6–13',
    title: '당신의 옷자락을 펴소서',
    day: '타작마당의 밤',
    place: '타작마당',
    copy: [
      '룻은 조심스럽게 보아스의 발치에 눕고, 보아스가 놀라 묻자 자신이 룻이라고 밝힙니다.',
      '그는 당신의 옷자락을 펴 달라고 말합니다. 이것은 욕망의 속삭임이 아니라 기업 무를 자에게 보호와 책임을 요청하는 말입니다.',
      '보아스는 룻을 칭찬하고, 더 가까운 기업 무를 자의 권리를 먼저 존중하겠다고 말합니다.'
    ],
    prompt: '룻의 요청 앞에서 당신은 어떻게 분별하시겠습니까?',
    choices: [
      choice('discern_redeemer_request', '◎', '룻의 요청을 욕망이 아니라 기업 무름의 호소로 분별한다', { discernment: 1, memory: 1 }, { next: 'ruth_15_six_measures' }, discern),
      choice('notice_boaz_integrity', '✦', '보아스가 질서 있게 책임지려는 태도를 주목한다', { trust: 1, community: 1 }, { next: 'ruth_15_six_measures' }, hesed),
      choice('defame_ruth', '✕', '룻의 이름을 더럽히는 소문을 퍼뜨린다', { community: -2, scatter: 1 }, { ending: 'bad_ruth_closed_gate' }, warn)
    ]
  });

  node('ruth_15_six_measures', 15, {
    location: '새벽의 귀가길',
    bible: '룻기 3:14–18',
    title: '빈손으로 가지 말라',
    day: '타작마당 다음 새벽',
    place: '나오미의 집으로 가는 길',
    copy: [
      '보아스는 룻에게 보리 여섯 번을 되어 줍니다. 빈손으로 시어머니에게 가지 말라고 합니다.',
      '모든 일이 아직 끝난 것은 아닙니다. 그러나 나오미의 빈손 위에 작은 보증이 놓입니다.',
      '기다림은 다시 시작되지만, 이번 기다림은 완전히 빈손인 기다림이 아닙니다.'
    ],
    prompt: '새벽에 받은 보리 앞에서 당신은 무엇을 기억하시겠습니까?',
    choices: [
      choice('remember_not_empty', '▤', '빈손으로 돌아오지 않게 하신 작은 보증을 기억한다', { memory: 1, trust: 1 }, { next: 'ruth_16_city_gate' }, hesed),
      choice('wait_quietly', '◎', '아직 해결되지 않았으니 조용히 기다리자고 말한다', { discernment: 1, delay: -1 }, { next: 'ruth_16_city_gate' }, discern),
      choice('agitate_impatiently', '☾', '기다림이 싫어 성급히 사람들을 선동한다', { scatter: 1, fear: 1 }, { next: 'ruth_16_city_gate' }, warn)
    ]
  });

  node('ruth_16_city_gate', 16, {
    location: '베들레헴 성문',
    bible: '룻기 4:1–10',
    title: '성문에서 열린 문제',
    day: '기업 무름이 논의된 날',
    place: '성문',
    copy: [
      '보아스는 성문으로 올라가 가까운 기업 무를 자와 장로들을 부릅니다.',
      '엘리멜렉의 밭과 룻의 이름, 죽은 자의 기업이 공개적으로 다루어집니다.',
      '성문은 사적인 호의가 공동체의 책임과 공의로 세워지는 자리입니다.'
    ],
    prompt: '성문에서 열린 문제 앞에서 당신은 어떻게 서시겠습니까?',
    choices: [
      choice('support_name_and_land', '🤝', '약자의 이름과 기업이 성문에서 보존되는 것을 지지한다', { community: 1, memory: 1 }, { next: 'ruth_17_sandals_and_witnesses' }, care),
      choice('see_public_responsibility', '◎', '절차가 사사로운 감정이 아니라 공동체의 책임임을 본다', { discernment: 1, trust: 1 }, { next: 'ruth_17_sandals_and_witnesses' }, discern),
      choice('mock_redemption_law', '✕', '기업 무름의 책임을 조롱하며 성문 절차를 막는다', { community: -2, memory: -1 }, { ending: 'bad_ruth_redeemer_refused' }, warn)
    ]
  });

  node('ruth_17_sandals_and_witnesses', 17, {
    location: '증인들이 선 성문',
    bible: '룻기 4:7–12',
    title: '신을 벗은 증인들',
    day: '성문 증언의 날',
    place: '베들레헴 성문',
    copy: [
      '기업 무름의 증거로 신을 벗어 건네는 일이 성문 앞에서 이루어집니다.',
      '백성과 장로들은 자신들이 증인이라고 말하고, 룻이 라헬과 레아처럼 되기를 축복합니다.',
      '이방 여인의 이름은 이제 공동체의 축복 속에 놓입니다.'
    ],
    prompt: '성문에 선 증인들 사이에서 당신은 어떤 말을 남기시겠습니까?',
    choices: [
      choice('witness_recovery', '▤', '성문에 선 증인으로 이 회복을 기억한다', { memory: 1, community: 1 }, { next: 'ruth_18_obed_is_born' }, hesed),
      choice('welcome_ruth_blessing', '✦', '이방 여인이 공동체의 축복 안으로 들어오는 것을 기뻐한다', { trust: 1, community: 1 }, { next: 'ruth_18_obed_is_born' }, care),
      choice('keep_ruth_outsider', '✕', '룻을 끝까지 외부인으로 남겨 두자고 말한다', { community: -2, memory: -1 }, { ending: 'bad_ruth_closed_gate' }, warn)
    ]
  });

  node('ruth_18_obed_is_born', 18, {
    location: '오벳의 이름이 불린 집',
    bible: '룻기 4:13–22',
    title: '오벳의 이름',
    day: '아이가 태어난 날',
    place: '베들레헴의 집',
    copy: [
      '룻은 아들을 낳고, 여인들은 나오미에게 찬송을 전합니다. 나오미는 그 아이를 품에 품습니다.',
      '그 아이의 이름은 오벳입니다. 그는 이새의 아버지이고, 이새는 다윗의 아버지가 됩니다.',
      '사사시대의 작은 밭과 작은 헤세드는 다윗의 계보로 이어지는 길이 됩니다.'
    ],
    prompt: '오벳의 이름 앞에서 당신은 어떤 증언을 남기시겠습니까?',
    choices: [
      choice('testify_hesed_line', '✦', '작은 헤세드가 다윗의 계보로 이어졌음을 증언한다', { trust: 1, memory: 1 }, { ending: 'true_ruth_hesed_witness' }, hesed),
      choice('remember_naomi_restored', '🤝', '빈손으로 돌아온 나오미가 다시 품게 된 은혜를 기억한다', { community: 1, memory: 1 }, { ending: 'faithful_ruth_bethlehem_witness' }, care),
      choice('confess_wounded_recovery', '☾', '상실의 아픔은 남았지만 회복의 시작을 보았다고 고백한다', { fear: 1, discernment: 1 }, { ending: 'wounded_ruth_empty_to_full' }, discern)
    ]
  });
})();
