(function applySamuelStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  window.SAMUEL_START_NODE_ID = 'samuel_01_siloh_dim_lamp';
  const TOTAL_PROGRESS = 18;

  const profiles = {
    eli: { name: '엘리야벳', role: '인도자', portrait: 'p1' },
    mira: { name: '미라', role: '기록자', portrait: 'p2' },
    yona: { name: '요나단', role: '보호자', portrait: 'p3' },
    asar: { name: '아사르', role: '탐색자', portrait: 'p4' }
  };

  function line(profileKey, text) { return { ...profiles[profileKey], text }; }
  function choice(key, icon, text, effects, route, companions) { return { key, icon, text, effects: effects || {}, ...route, companions }; }
  function node(nodeId, current, data) { nodes[nodeId] = { id: nodeId, chapter: '6장 · 사무엘의 부르심', progress: { current, total: TOTAL_PROGRESS }, ...data }; }

  const listen = [line('eli', '말씀이 희귀한 시대일수록 먼저 들어야 합니다.'), line('mira', '작은 음성처럼 시작된 부르심도 기록해야 할 증언입니다.')];
  const care = [line('yona', '상한 마음을 쉽게 판단하면 성소의 문도 차갑게 닫힙니다.'), line('eli', '기도하는 사람 곁에 머무는 것도 섬김입니다.')];
  const discern = [line('asar', '성소 가까움이 곧 경외는 아닙니다. 익숙함 속의 타락을 살펴야 합니다.'), line('mira', '두려운 말씀도 왜곡하지 않고 남겨야 합니다.')];
  const warn = [line('asar', '말씀을 막는 선택은 조용해 보여도 시대 전체를 더 어둡게 만듭니다.'), line('yona', '거룩한 것을 자기 몫으로 삼으면 약한 사람들의 길이 먼저 무너집니다.')];

  node('samuel_01_siloh_dim_lamp', 1, {
    location: '실로 성소의 밤',
    bible: '사무엘상 3:1–3',
    title: '꺼지기 전 등불',
    day: '말씀이 희귀하던 밤',
    place: '실로의 성소',
    copy: [
      '사사시대의 마지막 그늘 속에서 실로의 성소는 조용합니다. 여호와의 말씀은 희귀하고 이상은 흔히 보이지 않습니다.',
      '그러나 하나님의 등불은 아직 꺼지지 않았습니다. 희미한 불빛 아래 어린 사무엘은 여호와의 궤 가까이에 누워 있습니다.',
      '당신은 사무엘도 엘리도 아닙니다. 말씀의 침묵과 꺼지기 전 등불을 지켜보는 이름 없는 증인입니다.'
    ],
    prompt: '말씀이 희귀한 밤, 당신은 어디에 서시겠습니까?',
    choices: [
      choice('keep_watch_by_lamp', '✦', '희미한 등불 곁에서 조용히 깨어 있는다', { memory: 1, trust: 1 }, { next: 'samuel_02_hannahs_barrenness' }, listen),
      choice('notice_silence', '◎', '성소가 조용하다는 사실을 이상하게 여기고 살핀다', { discernment: 1, clues: 1 }, { next: 'samuel_02_hannahs_barrenness' }, discern),
      choice('expect_nothing', '☾', '아무 말씀도 없으니 기대할 것도 없다고 말한다', { trust: -1, fear: 1 }, { next: 'samuel_02_hannahs_barrenness' }, warn)
    ]
  });

  node('samuel_02_hannahs_barrenness', 2, {
    location: '엘가나의 집과 실로의 길',
    bible: '사무엘상 1:1–8',
    title: '닫힌 태',
    day: '해마다 실로에 올라가던 때',
    place: '실로로 향하는 가족의 길',
    copy: [
      '한나는 자식이 없어 마음이 괴롭습니다. 브닌나는 그를 격분하게 하며 해마다 그의 상처를 깊게 만듭니다.',
      '엘가나는 한나를 사랑하지만, 사랑한다는 말만으로 그의 수치와 고통이 사라지지는 않습니다.',
      '상처 입은 사람 앞에서 공동체의 말은 약이 될 수도 있고 또 다른 칼이 될 수도 있습니다.'
    ],
    prompt: '한나의 고통 앞에서 당신은 어떤 말을 선택하시겠습니까?',
    choices: [
      choice('stay_with_hannah_pain', '🤝', '한나의 고통을 쉽게 설명하지 않고 곁에 머문다', { community: 1, discernment: 1 }, { next: 'samuel_03_bitter_prayer' }, care),
      choice('name_family_wound', '◎', '가족 안의 조롱이 상처를 깊게 한다고 말한다', { discernment: 1, community: 1 }, { next: 'samuel_03_bitter_prayer' }, discern),
      choice('treat_hannah_as_failure', '✕', '자식이 없다는 이유로 한나를 실패한 사람처럼 대한다', { community: -2, fear: 1 }, { ending: 'bad_samuel_mocked_prayer' }, warn)
    ]
  });

  node('samuel_03_bitter_prayer', 3, {
    location: '실로 성소의 문 곁',
    bible: '사무엘상 1:9–11',
    title: '통곡의 기도',
    day: '마음이 괴로워 기도한 날',
    place: '여호와의 전 문설주 곁',
    copy: [
      '한나는 마음이 괴로워 여호와께 기도하고 통곡합니다. 그의 입술은 움직이지만 소리는 들리지 않습니다.',
      '그는 아들을 주시면 평생 여호와께 드리겠다고 서원합니다.',
      '성소의 문 곁에서 들리는 것은 조용한 입술의 떨림뿐이지만, 그 침묵 안에는 한 사람의 전 생애가 담겨 있습니다.'
    ],
    prompt: '통곡의 기도 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_bitter_prayer', '✦', '통곡도 하나님 앞에 드릴 수 있는 기도임을 인정한다', { trust: 1, community: 1 }, { next: 'samuel_04_misread_prayer' }, care),
      choice('listen_to_vow', '◎', '한나의 서원을 함부로 판단하지 않고 조용히 듣는다', { discernment: 1, memory: 1 }, { next: 'samuel_04_misread_prayer' }, discern),
      choice('drive_prayer_out', '✕', '그런 기도는 성소의 분위기를 흐린다고 몰아낸다', { community: -2, trust: -1 }, { ending: 'bad_samuel_mocked_prayer' }, warn)
    ]
  });

  node('samuel_04_misread_prayer', 4, {
    location: '엘리가 앉은 자리',
    bible: '사무엘상 1:12–18',
    title: '오해받은 기도',
    day: '한나가 설명한 날',
    place: '실로 성소의 입구',
    copy: [
      '엘리는 한나의 입술만 움직이는 것을 보고 그가 술에 취했다고 생각합니다.',
      '한나는 자신이 마음이 슬픈 여자이며 여호와 앞에 심정을 통한 것이라고 설명합니다.',
      '오해는 깊은 기도를 수치로 만들 수 있습니다. 그러나 분별은 상한 마음이 다시 평안히 가도록 길을 엽니다.'
    ],
    prompt: '오해받은 기도 앞에서 당신은 무엇을 하시겠습니까?',
    choices: [
      choice('do_not_judge_appearance', '◎', '겉모습만 보고 판단하지 말아야 한다고 말한다', { discernment: 1, community: 1 }, { next: 'samuel_05_child_given' }, discern),
      choice('guard_hannah_voice', '🤝', '한나가 자신의 마음을 설명할 수 있도록 자리를 지킨다', { community: 1, trust: 1 }, { next: 'samuel_05_child_given' }, care),
      choice('join_eli_misread', '✕', '엘리의 오해에 동조해 한나를 부끄럽게 만든다', { community: -2, scatter: 1 }, { ending: 'bad_samuel_mocked_prayer' }, warn)
    ]
  });

  node('samuel_05_child_given', 5, {
    location: '라마의 집',
    bible: '사무엘상 1:19–20',
    title: '구하여 얻은 아이',
    day: '사무엘이 태어난 날',
    place: '한나의 집',
    copy: [
      '여호와께서 한나를 생각하셨고, 한나는 아들을 낳습니다.',
      '그는 그 이름을 사무엘이라 부르며 여호와께 구하여 얻었다고 말합니다.',
      '이 아이의 이름은 한나가 받은 응답을 기억하게 하지만, 동시에 다시 드려야 할 서원의 길을 열어 둡니다.'
    ],
    prompt: '구하여 얻은 아이 앞에서 당신은 무엇을 기억하시겠습니까?',
    choices: [
      choice('remember_answer_name', '▤', '사무엘의 이름이 기도의 응답을 기억하게 한다고 말한다', { memory: 1, trust: 1 }, { next: 'samuel_06_weaned_and_brought' }, listen),
      choice('hold_joy_with_wound', '🤝', '한나의 기쁨이 지난 상처를 지우는 말이 되지 않게 조심한다', { discernment: 1, community: 1 }, { next: 'samuel_06_weaned_and_brought' }, care),
      choice('forget_vow_after_gift', '☾', '응답받았으니 이제 서원은 잊어도 된다고 말한다', { memory: -1, trust: -1 }, { next: 'samuel_06_weaned_and_brought' }, warn)
    ]
  });

  node('samuel_06_weaned_and_brought', 6, {
    location: '다시 찾은 실로',
    bible: '사무엘상 1:21–28',
    title: '다시 드려진 아이',
    day: '젖을 뗀 뒤 실로에 오른 날',
    place: '실로 성소',
    copy: [
      '한나는 아이가 젖을 뗀 뒤 그를 데리고 실로로 올라갑니다.',
      '그는 엘리에게 자신이 전에 여기 서서 기도하던 여자라고 말하고, 이 아이를 평생 여호와께 드린다고 고백합니다.',
      '받은 은혜를 다시 드리는 일은 기쁨만이 아니라 아픔을 동반합니다.'
    ],
    prompt: '다시 드려진 아이 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('remember_giving_back', '✦', '받은 은혜를 다시 드리는 한나의 신실함을 기억한다', { memory: 1, trust: 1 }, { next: 'samuel_07_hannah_song' }, listen),
      choice('honor_costly_gift', '🤝', '아이를 드리는 일이 쉬운 결단이 아님을 함께 헤아린다', { community: 1, discernment: 1 }, { next: 'samuel_07_hannah_song' }, care),
      choice('mock_dedication', '☾', '아이를 성소에 두는 일을 손해라고 조롱한다', { trust: -1, memory: -1 }, { next: 'samuel_07_hannah_song' }, warn)
    ]
  });

  node('samuel_07_hannah_song', 7, {
    location: '한나의 찬양이 울린 자리',
    bible: '사무엘상 2:1–10',
    title: '낮은 자를 높이시는 노래',
    day: '한나가 노래한 날',
    place: '실로 성소 앞',
    copy: [
      '한나는 여호와로 말미암아 마음이 즐겁다고 노래합니다.',
      '그 노래는 개인의 기쁨에만 머물지 않습니다. 하나님은 낮은 자를 높이시고, 교만한 자를 낮추시며, 자기 왕에게 힘을 주신다고 선포합니다.',
      '한 여인의 기도에서 시작된 노래는 이제 하나님의 통치를 말하는 예언적 증언처럼 울립니다.'
    ],
    prompt: '한나의 노래를 들으며 당신은 무엇을 보시겠습니까?',
    choices: [
      choice('see_gods_rule_in_song', '◎', '한나의 노래가 개인의 기쁨을 넘어 하나님의 통치를 말한다고 본다', { discernment: 1, trust: 1 }, { next: 'samuel_08_corrupt_priests' }, discern),
      choice('remember_lowly_lifted', '▤', '낮은 자를 높이시는 하나님을 공동체가 기억하게 한다', { memory: 1, community: 1 }, { next: 'samuel_08_corrupt_priests' }, listen),
      choice('reduce_song_private', '☾', '한나의 노래를 사적인 감정으로만 축소한다', { memory: -1, discernment: -1 }, { next: 'samuel_08_corrupt_priests' }, warn)
    ]
  });

  node('samuel_08_corrupt_priests', 8, {
    location: '제물이 드려지는 성소',
    bible: '사무엘상 2:12–17',
    title: '성소를 가볍게 여긴 사람들',
    day: '제사가 멸시된 날',
    place: '실로의 제단 곁',
    copy: [
      '엘리의 아들들은 행실이 나빠 여호와를 알지 못했습니다.',
      '그들은 제사를 자기 몫처럼 다루고, 드려지기 전의 것을 강제로 요구합니다. 성소 가까이에 있었지만 거룩함은 멀리했습니다.',
      '말씀이 희귀한 시대는 단순히 침묵의 시대가 아닙니다. 거룩함을 멸시한 익숙함이 성소 안에 자리 잡은 시대입니다.'
    ],
    prompt: '성소를 가볍게 여기는 사람들 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('warn_nearness_not_reverence', '◎', '성소 가까움이 곧 경외는 아님을 경고한다', { discernment: 1, memory: 1 }, { next: 'samuel_09_small_linen_ephod' }, discern),
      choice('name_communal_damage', '🤝', '제사를 멸시하는 일이 공동체 전체를 병들게 한다고 말한다', { community: 1, discernment: 1 }, { next: 'samuel_09_small_linen_ephod' }, care),
      choice('take_offering_as_share', '✕', '성소의 제물을 자기 몫처럼 취급한다', { trust: -2, community: -1 }, { ending: 'bad_samuel_stolen_offering' }, warn)
    ]
  });

  node('samuel_09_small_linen_ephod', 9, {
    location: '어린 사무엘의 섬김 자리',
    bible: '사무엘상 2:18–21',
    title: '작은 세마포 에봇',
    day: '해마다 작은 겉옷이 온 날',
    place: '실로 성소',
    copy: [
      '어린 사무엘은 세마포 에봇을 입고 여호와 앞에서 섬깁니다.',
      '한나는 해마다 남편과 함께 제사를 드리러 올라올 때 작은 겉옷을 지어 가져옵니다.',
      '큰 소리로 드러나지 않는 신실함이 있습니다. 작은 옷, 반복되는 걸음, 어린 섬김이 꺼지기 전 등불 곁에 남아 있습니다.'
    ],
    prompt: '작은 세마포 에봇 앞에서 당신은 무엇을 기억하시겠습니까?',
    choices: [
      choice('honor_small_service', '✦', '작고 반복되는 섬김을 가볍게 여기지 않는다', { memory: 1, trust: 1 }, { next: 'samuel_10_eli_warning' }, listen),
      choice('remember_yearly_robe', '▤', '한나가 매년 가져오는 작은 겉옷을 기억한다', { community: 1, memory: 1 }, { next: 'samuel_10_eli_warning' }, care),
      choice('dismiss_child_service', '☾', '어린아이의 섬김은 별 의미 없다고 말한다', { memory: -1, trust: -1 }, { next: 'samuel_10_eli_warning' }, warn)
    ]
  });

  node('samuel_10_eli_warning', 10, {
    location: '엘리의 무거운 집',
    bible: '사무엘상 2:22–26',
    title: '늦은 경고',
    day: '엘리가 아들들을 책망한 날',
    place: '실로 성소 곁',
    copy: [
      '엘리는 아들들이 행한 모든 악을 듣고 그들을 책망합니다.',
      '그러나 경고는 늦었고, 그들의 마음은 듣지 않습니다. 아버지의 약한 말은 성소의 깊은 타락을 돌이키지 못합니다.',
      '사무엘은 점점 자라며 여호와와 사람들에게 은총을 받습니다. 같은 성소 안에서도 길은 갈라집니다.'
    ],
    prompt: '늦은 경고 앞에서 당신은 어떻게 분별하시겠습니까?',
    choices: [
      choice('do_not_cover_sin', '◎', '늦었어도 죄를 가볍게 덮지 말아야 한다고 말한다', { discernment: 1, trust: 1 }, { next: 'samuel_11_man_of_god' }, discern),
      choice('see_eli_weakness', '🤝', '엘리의 약함과 책임을 함께 바라본다', { discernment: 1, community: 1 }, { next: 'samuel_11_man_of_god' }, care),
      choice('cover_family_sin', '☾', '가족의 일이니 성소의 죄도 조용히 덮자고 말한다', { trust: -1, memory: -1 }, { next: 'samuel_11_man_of_god' }, warn)
    ]
  });

  node('samuel_11_man_of_god', 11, {
    location: '심판의 말씀이 전해진 자리',
    bible: '사무엘상 2:27–36',
    title: '하나님의 사람이 전한 말',
    day: '엘리 집에 말씀이 온 날',
    place: '실로 성소',
    copy: [
      '하나님의 사람이 엘리에게 와서 그의 집을 향한 심판을 전합니다.',
      '제사장의 집은 거룩한 직분을 받았지만, 하나님보다 자기 아들들을 더 중히 여겼다는 책망을 듣습니다.',
      '말씀은 위로만이 아니라 거룩함을 훼손한 집을 향한 심판으로도 옵니다.'
    ],
    prompt: '하나님의 사람이 전한 말 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('receive_weighty_word', '☾', '말씀의 엄중함을 두려움 속에서도 받아들인다', { fear: 1, discernment: 1 }, { next: 'samuel_12_word_was_rare' }, discern),
      choice('record_priestly_responsibility', '▤', '성소의 직분이 책임 없이 유지될 수 없음을 기록한다', { memory: 1, discernment: 1 }, { next: 'samuel_12_word_was_rare' }, listen),
      choice('bury_uncomfortable_word', '☾', '불편한 심판의 말은 공동체에 해롭다며 묻어 둔다', { trust: -1, scatter: 1 }, { next: 'samuel_12_word_was_rare' }, warn)
    ]
  });

  node('samuel_12_word_was_rare', 12, {
    location: '침묵이 깊어진 성소',
    bible: '사무엘상 3:1',
    title: '말씀이 희귀한 밤',
    day: '부르심이 오기 전의 밤',
    place: '실로 성소',
    copy: [
      '그때 여호와의 말씀이 희귀하여 이상이 흔히 보이지 않았습니다.',
      '성소에는 의식이 남아 있고 사람들은 오가지만, 듣는 귀는 무뎌져 있습니다.',
      '하나님의 침묵처럼 느껴지는 밤은 사실 듣는 자가 준비되는 밤일 수 있습니다.'
    ],
    prompt: '말씀이 희귀한 밤에 당신은 무엇을 선택하시겠습니까?',
    choices: [
      choice('make_place_to_listen', '✦', '말씀이 희귀한 시대일수록 듣는 자리가 필요하다고 말한다', { trust: 1, memory: 1 }, { next: 'samuel_13_first_call' }, listen),
      choice('stay_awake_in_silence', '◎', '침묵이 익숙함으로 굳어지지 않도록 깨어 있는다', { discernment: 1, clues: 1 }, { next: 'samuel_13_first_call' }, discern),
      choice('prefer_wordless_age', '☾', '말씀 없는 시대가 편하다고 말한다', { trust: -2, memory: -1 }, { next: 'samuel_13_first_call' }, warn)
    ]
  });

  node('samuel_13_first_call', 13, {
    location: '사무엘이 누운 자리',
    bible: '사무엘상 3:2–5',
    title: '밤중의 첫 부름',
    day: '이름이 불린 밤',
    place: '여호와의 궤 가까이',
    copy: [
      '밤에 사무엘은 자기 이름을 부르는 소리를 듣고 엘리에게 달려갑니다.',
      '그는 여호와를 아직 알지 못했고, 여호와의 말씀도 아직 그에게 나타난 적이 없었습니다.',
      '부르심의 시작은 언제나 분명한 확신처럼 오지 않습니다. 처음에는 착각처럼, 익숙한 이름처럼 들릴 수 있습니다.'
    ],
    prompt: '밤중의 첫 부름 앞에서 당신은 어떻게 도우시겠습니까?',
    choices: [
      choice('do_not_mock_first_call', '🤝', '사무엘의 착각을 조롱하지 않고 함께 살핀다', { community: 1, discernment: 1 }, { next: 'samuel_14_second_call' }, care),
      choice('hold_possibility_call', '◎', '익숙하지 않은 부르심일 수 있음을 마음에 둔다', { clues: 1, memory: 1 }, { next: 'samuel_14_second_call' }, discern),
      choice('scold_back_to_sleep', '☾', '헛들은 것이라며 다시 잠들라고 꾸짖는다', { trust: -1, fear: 1 }, { next: 'samuel_14_second_call' }, warn)
    ]
  });

  node('samuel_14_second_call', 14, {
    location: '반복되는 부르심의 밤',
    bible: '사무엘상 3:6–8',
    title: '다시 부르시는 음성',
    day: '두 번째와 세 번째 부름',
    place: '엘리와 사무엘의 잠자리 사이',
    copy: [
      '여호와께서 다시 사무엘을 부르십니다. 사무엘은 다시 엘리에게 갑니다.',
      '세 번째가 되어서야 엘리는 여호와께서 아이를 부르신 줄 깨닫습니다.',
      '분별은 늦게 올 수 있습니다. 그러나 늦게 깨달았을 때라도 듣는 자리로 인도해야 합니다.'
    ],
    prompt: '반복되는 부르심 앞에서 당신은 어떻게 반응하시겠습니까?',
    choices: [
      choice('do_not_dismiss_repeated_call', '◎', '반복되는 부르심을 가볍게 넘기지 않는다', { discernment: 1, trust: 1 }, { next: 'samuel_15_speak_lord' }, discern),
      choice('help_eli_discern', '🤝', '엘리가 늦게나마 깨달은 것을 따라 사무엘을 돕는다', { community: 1, memory: 1 }, { next: 'samuel_15_speak_lord' }, care),
      choice('silence_the_call', '✕', '더 이상 소란 피우지 말라며 부르심을 막는다', { trust: -2, scatter: 1 }, { ending: 'bad_samuel_silenced_call' }, warn)
    ]
  });

  node('samuel_15_speak_lord', 15, {
    location: '다시 누운 사무엘의 자리',
    bible: '사무엘상 3:9–10',
    title: '말씀하옵소서',
    day: '응답을 배운 밤',
    place: '실로 성소의 어둠 속',
    copy: [
      '엘리는 사무엘에게 다시 누웠다가 부르시거든 말씀하옵소서 주의 종이 듣겠나이다 하라고 알려 줍니다.',
      '여호와께서 다시 오셔서 사무엘을 부르십니다.',
      '사무엘은 이제 달려가지 않고 듣는 자리에서 응답합니다. 말씀이 희귀했던 밤에 한 아이의 귀가 열립니다.'
    ],
    prompt: '말씀하옵소서라는 응답 앞에서 당신은 무엇을 선택하시겠습니까?',
    choices: [
      choice('lead_to_listening', '✦', '말하기보다 듣는 자리로 나아가게 한다', { trust: 1, memory: 1 }, { next: 'samuel_16_hard_word' }, listen),
      choice('wait_with_fearful_child', '🤝', '사무엘의 두려움을 헤아리며 곁에서 기다린다', { community: 1, discernment: 1 }, { next: 'samuel_16_hard_word' }, care),
      choice('avoid_listening', '✕', '두려우면 듣지 않는 편이 낫다고 말한다', { trust: -2, fear: 1 }, { ending: 'bad_samuel_silenced_call' }, warn)
    ]
  });

  node('samuel_16_hard_word', 16, {
    location: '말씀을 들은 밤',
    bible: '사무엘상 3:11–14',
    title: '두려운 말씀',
    day: '처음 받은 말씀의 밤',
    place: '여호와의 궤 가까이',
    copy: [
      '사무엘이 처음 들은 말씀은 따뜻한 위로만이 아닙니다.',
      '여호와께서는 엘리의 집을 향한 심판을 말씀하십니다. 그의 집의 죄악은 제물로나 예물로나 영원히 속죄함을 받지 못하리라고 하십니다.',
      '말씀을 듣는다는 것은 원하는 말만 듣는 일이 아닙니다. 때로는 떨리는 심판의 무게를 그대로 받는 일입니다.'
    ],
    prompt: '두려운 말씀 앞에서 당신은 어떻게 하시겠습니까?',
    choices: [
      choice('accept_hard_first_word', '◎', '처음 들은 말씀이 위로가 아니라 심판일 수 있음을 받아들인다', { discernment: 1, fear: 1 }, { next: 'samuel_17_morning_fear' }, discern),
      choice('remember_without_distortion', '▤', '말씀의 무게를 왜곡하지 않고 기억한다', { memory: 1, trust: 1 }, { next: 'samuel_17_morning_fear' }, listen),
      choice('erase_hard_word', '✕', '이 말씀은 너무 불편하니 없던 일로 하자고 말한다', { trust: -2, memory: -1 }, { ending: 'bad_samuel_hidden_word' }, warn)
    ]
  });

  node('samuel_17_morning_fear', 17, {
    location: '성소의 아침',
    bible: '사무엘상 3:15–18',
    title: '아침의 두려움',
    day: '문을 연 아침',
    place: '여호와의 전 문',
    copy: [
      '사무엘은 아침까지 누웠다가 여호와의 전 문을 엽니다.',
      '그는 엘리에게 그 이상을 알리기를 두려워합니다. 엘리는 숨기지 말라고 말하고, 사무엘은 그 말씀을 하나도 숨기지 않습니다.',
      '말씀을 전하는 일은 두려움이 없는 사람만의 일이 아닙니다. 두려워도 숨기지 않는 사람이 증인이 됩니다.'
    ],
    prompt: '아침의 두려움 앞에서 당신은 사무엘을 어떻게 도우시겠습니까?',
    choices: [
      choice('help_not_hide_word', '✦', '두려워도 말씀을 숨기지 말아야 한다고 돕는다', { trust: 1, community: 1 }, { next: 'samuel_18_prophet_known' }, listen),
      choice('do_not_shame_fear', '🤝', '엘리 앞에서 떨리는 사무엘을 정죄하지 않는다', { community: 1, discernment: 1 }, { next: 'samuel_18_prophet_known' }, care),
      choice('hide_to_spare_eli', '✕', '엘리의 마음을 상하게 하지 않으려 말씀을 숨기자고 한다', { memory: -2, trust: -1 }, { ending: 'bad_samuel_hidden_word' }, warn)
    ]
  });

  node('samuel_18_prophet_known', 18, {
    location: '단에서 브엘세바까지',
    bible: '사무엘상 3:19–4:1',
    title: '한 말씀도 땅에 떨어지지 않다',
    day: '사무엘이 자라난 뒤',
    place: '온 이스라엘의 길',
    copy: [
      '사무엘이 자라매 여호와께서 그와 함께 계셔서 그의 말이 하나도 땅에 떨어지지 않게 하십니다.',
      '단에서 브엘세바까지 온 이스라엘은 사무엘이 여호와의 선지자로 세움을 받은 줄 알게 됩니다.',
      '말씀이 희귀하던 밤은 끝나고, 듣는 귀를 통해 새 증언의 시대가 열립니다.'
    ],
    prompt: '한 말씀도 땅에 떨어지지 않는 시대 앞에서 당신은 어떤 증언을 남기시겠습니까?',
    choices: [
      choice('testify_listening_age', '✦', '말씀이 희귀한 시대에 듣는 귀가 열렸음을 증언한다', { trust: 1, memory: 1 }, { ending: 'true_samuel_listening_witness' }, listen),
      choice('remember_dim_lamp_service', '▤', '꺼지기 전 등불 곁에서 작은 섬김을 지킨 길을 기억한다', { memory: 1, community: 1 }, { ending: 'faithful_samuel_lamp_keeper' }, care),
      choice('confess_trembling_word', '☾', '심판의 말씀은 두려웠지만 숨기지 않았다고 고백한다', { fear: 1, discernment: 1 }, { ending: 'wounded_samuel_trembling_word' }, discern)
    ]
  });
})();
