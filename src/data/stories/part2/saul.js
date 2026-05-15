// BibleRogue2 Part II. 1장 「사울의 불순종」 story data.
// This file only extends window.STORY_NODES and window.STORY_ENDINGS.

(function () {
  window.SAUL_START_NODE_ID = 'saul_01_gilgal_waiting';

  const saulCompanions = {
    eliyabet: { name: '엘리야벳', role: '인도자', portrait: 'p1' },
    mira: { name: '미라', role: '기록자', portrait: 'p2' },
    jonathan: { name: '요나단', role: '보호자', portrait: 'p3' },
    asar: { name: '아사르', role: '탐색자', portrait: 'p4' }
  };

  function line(companion, text) {
    return { ...companion, text };
  }

  const saulNodes = {
    saul_01_gilgal_waiting: {
      id: 'saul_01_gilgal_waiting',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '길갈 진영',
      bible: '사무엘상 13:5–8',
      title: '길어진 기다림',
      day: '전쟁 전의 날',
      place: '길갈',
      progress: { current: 1, total: 16 },
      copy: [
        '블레셋의 병거와 마병 소식이 길갈의 먼지 속으로 밀려옵니다. 사람들은 낮은 목소리로 군대의 수를 말하다가 곧 입을 닫습니다.',
        '사울은 사무엘을 기다리고 있습니다. 그러나 기다림이 길어질수록 백성의 얼굴에서는 용기가 빠져나갑니다.',
        '당신은 왕의 명령권 안에 있지만, 동시에 말씀을 기다려야 하는 백성 가운데 서 있습니다.'
      ],
      prompt: '길갈의 두려움 앞에서 당신은 어떻게 반응하시겠습니까?',
      choices: [
        { key: 'encourage_waiting', icon: '✦', text: '흩어지는 사람들을 붙들며 기다림을 권한다', effects: { community: 1, trust: 1 }, next: 'saul_02_people_scattering', companions: [line(saulCompanions.eliyabet, '기다림은 아무것도 하지 않는 시간이 아닙니다. 무너지는 사람을 붙드는 것도 순종의 일부입니다.'), line(saulCompanions.mira, '두려움이 진영의 첫 기록이 되지 않도록, 오늘의 말을 조심히 남기겠습니다.')] },
        { key: 'urge_action', icon: '⚠', text: '백성을 붙들려면 왕이 빨리 결단해야 한다고 말한다', effects: { fear: 1, compromise: 1 }, next: 'saul_02_people_scattering', companions: [line(saulCompanions.jonathan, '두려움은 실제입니다. 그러나 두려움이 말씀보다 먼저 명령하게 두면 더 큰 균열이 생깁니다.'), line(saulCompanions.asar, '사람들의 발이 뒤로 밀리고 있습니다. 지금 진영은 쉽게 선동될 수 있습니다.')] },
        { key: 'watch_quietly', icon: '◎', text: '아무 말 없이 왕과 백성의 표정을 살핀다', effects: { discernment: 1 }, next: 'saul_02_people_scattering', companions: [line(saulCompanions.asar, '말하지 않는 눈도 많은 것을 봅니다. 다만 오래 침묵하면 두려움의 편에 선 것처럼 보일 수 있습니다.')] }
      ]
    },

    saul_02_people_scattering: {
      id: 'saul_02_people_scattering',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '길갈 주변의 바위틈',
      bible: '사무엘상 13:6–8',
      title: '흩어지는 백성',
      day: '기다림의 일곱째 날',
      place: '요단 근처의 진영',
      progress: { current: 2, total: 16 },
      copy: [
        '어떤 사람들은 굴과 수풀과 바위틈으로 숨어듭니다. 남은 사람들도 왕 곁에 서 있지만, 그 발은 이미 흔들리고 있습니다.',
        '두려움은 적의 칼보다 먼저 진영 안으로 들어왔습니다. 사람들은 사무엘의 약속보다 눈앞의 병거를 더 크게 봅니다.',
        '왕도 백성을 붙들고 싶어 하지만, 그 마음 안에는 기다림을 견디지 못하는 조급함이 번집니다.'
      ],
      prompt: '흩어지는 사람들 사이에서 무엇을 택하시겠습니까?',
      choices: [
        { key: 'care_scattered', icon: '🤝', text: '두려움이 퍼지지 않도록 조용히 사람들을 돌본다', effects: { community: 1 }, next: 'saul_03_pressure_before_battle', companions: [line(saulCompanions.eliyabet, '공동체는 큰 구호보다 작은 돌봄으로 버틸 때가 있습니다.'), line(saulCompanions.jonathan, '숨은 사람들을 꾸짖기보다 다시 돌아올 길을 남겨 두어야 합니다.')] },
        { key: 'say_waiting_kills', icon: '⚠', text: '“기다리다가는 모두 죽는다”고 말한다', effects: { fear: 1, compromise: 1 }, next: 'saul_03_pressure_before_battle', companions: [line(saulCompanions.mira, '그 말은 현실처럼 들리지만, 공동체의 두려움에 기름을 부을 수 있습니다.')] },
        { key: 'doubt_samuel', icon: '☾', text: '사무엘이 정말 올지 마음속으로 의심한다', effects: { fear: 1, memory: -1 }, next: 'saul_03_pressure_before_battle', companions: [line(saulCompanions.asar, '의심은 조용히 시작되지만, 곧 다른 기준을 찾게 만듭니다.')] }
      ]
    },

    saul_03_pressure_before_battle: {
      id: 'saul_03_pressure_before_battle',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '번제물 앞',
      bible: '사무엘상 13:8–9',
      title: '왕의 명령',
      day: '사무엘을 기다리던 날',
      place: '길갈 제단 곁',
      progress: { current: 3, total: 16 },
      copy: [
        '정한 날은 거의 지나갔고, 사무엘은 아직 보이지 않습니다. 사울은 흩어지는 백성을 바라보다가 번제물과 화목제물을 가져오라고 명합니다.',
        '그 명령은 예배의 언어를 입고 있습니다. 그러나 그 언어 아래에는 기다림을 포기한 두려움이 숨 쉬고 있습니다.',
        '당신은 왕의 명령을 들었지만, 그 명령이 말씀의 자리를 대신할 수 있는지 알지 못합니다.'
      ],
      prompt: '번제물 앞에서 당신은 어떤 마음을 품으시겠습니까?',
      choices: [
        { key: 'whisper_wait', icon: '✦', text: '왕의 명령 앞에서도 사무엘의 말을 기다려야 한다고 속삭인다', effects: { trust: 1, discernment: 1 }, next: 'saul_04_unlawful_offering', companions: [line(saulCompanions.eliyabet, '작은 속삭임이라도 진영 안에 다른 기준이 있음을 남깁니다.'), line(saulCompanions.mira, '오늘의 문제는 제물이 없는 것이 아니라 말씀보다 앞서려는 마음일지도 모릅니다.')] },
        { key: 'accept_ritual_need', icon: '▤', text: '백성을 붙들려면 지금 제사가 필요하다고 생각한다', effects: { compromise: 1, fear: 1 }, next: 'saul_04_unlawful_offering', companions: [line(saulCompanions.jonathan, '제사가 백성을 붙들 수 있을지는 몰라도, 불순종을 거룩하게 만들 수는 없습니다.')] },
        { key: 'ritual_is_good', icon: '◇', text: '제사는 좋은 일이니 문제없다고 여긴다', effects: { memory: -1, compromise: 1 }, next: 'saul_04_unlawful_offering', companions: [line(saulCompanions.asar, '좋은 형식이 언제나 바른 순종은 아닙니다. 지금은 그 차이를 보아야 합니다.')] }
      ]
    },

    saul_04_unlawful_offering: {
      id: 'saul_04_unlawful_offering',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '타오르는 제단',
      bible: '사무엘상 13:9',
      title: '예배처럼 보인 불순종',
      day: '불길이 오른 때',
      place: '길갈 제단',
      progress: { current: 4, total: 16 },
      copy: [
        '사울이 번제를 드립니다. 불은 제단 위에서 타오르고, 사람들은 잠시 숨을 고릅니다.',
        '그러나 그 불길은 진영에 평안을 가져오지 못합니다. 기다림은 무너졌고, 예배의 형식은 왕의 조급함을 가리고 있습니다.',
        '당신은 불빛 너머로 드러나는 첫 균열을 봅니다.'
      ],
      prompt: '타오르는 제단 앞에서 무엇을 깨닫습니까?',
      choices: [
        { key: 'grieve_fire', icon: '☉', text: '불길을 보며 마음이 무너진다', effects: { discernment: 1, trust: 1 }, next: 'saul_05_samuel_arrives', companions: [line(saulCompanions.mira, '이 장면은 예배의 성공이 아니라 기다림의 실패로 기록되어야 합니다.')] },
        { key: 'relieved_people_stay', icon: '▤', text: '그래도 왕이 백성을 붙들었다고 안도한다', effects: { compromise: 1 }, next: 'saul_05_samuel_arrives', companions: [line(saulCompanions.jonathan, '사람이 남았다고 해서 길이 보존된 것은 아닙니다. 무엇으로 붙들었는지가 중요합니다.')] },
        { key: 'victory_matters', icon: '♕', text: '이제 전쟁만 이기면 된다고 생각한다', effects: { pride: 1, memory: -1 }, next: 'saul_05_samuel_arrives', companions: [line(saulCompanions.asar, '전쟁의 승리로 덮을 수 없는 패배가 있습니다. 그 패배는 마음에서 시작됩니다.')] }
      ]
    },

    saul_05_samuel_arrives: {
      id: 'saul_05_samuel_arrives',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '길갈 진영 입구',
      bible: '사무엘상 13:10–14',
      title: '늦지 않았던 도착',
      day: '사무엘이 온 날',
      place: '길갈',
      progress: { current: 5, total: 16 },
      copy: [
        '사울이 번제를 마치자마자 사무엘이 도착합니다. 왕은 맞으러 나가 인사하지만, 공기는 이미 달라져 있습니다.',
        '사무엘은 묻습니다. “왕이 행한 것이 무엇이냐.” 사울은 백성이 흩어지고 블레셋이 가까웠으며 당신이 오지 않았다고 말합니다.',
        '상황 설명은 길지만, 그 안에서 순종은 점점 작아집니다.'
      ],
      prompt: '사울의 변명과 사무엘의 책망 사이에서 어디에 서겠습니까?',
      choices: [
        { key: 'receive_rebuke', icon: '✦', text: '사무엘의 책망을 하나님의 말씀으로 받아들인다', effects: { trust: 1, memory: 1 }, next: 'saul_06_kingdom_crack', companions: [line(saulCompanions.eliyabet, '책망은 왕을 무너뜨리려는 말이 아니라, 말씀 앞에서 왕도 낮아져야 함을 드러내는 말입니다.')] },
        { key: 'understand_excuse', icon: '☾', text: '사울의 변명이 현실적으로 들린다고 생각한다', effects: { compromise: 1, fear: 1 }, next: 'saul_06_kingdom_crack', companions: [line(saulCompanions.jonathan, '현실은 중요합니다. 그러나 현실이 말씀을 재단하기 시작하면 왕국의 중심이 바뀝니다.')] },
        { key: 'pity_king_image', icon: '♕', text: '왕의 체면이 무너지는 장면만 안타까워한다', effects: { pride: 1 }, next: 'saul_06_kingdom_crack', companions: [line(saulCompanions.mira, '체면의 상처보다 깊은 것은 순종의 상처입니다. 기록은 그 차이를 놓치지 않아야 합니다.')] }
      ]
    },

    saul_06_kingdom_crack: {
      id: 'saul_06_kingdom_crack',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '왕의 장막 뒤편',
      bible: '사무엘상 13:13–14',
      title: '왕국의 첫 균열',
      day: '책망 이후의 저녁',
      place: '길갈 진영',
      progress: { current: 6, total: 16 },
      copy: [
        '사무엘은 사울의 왕국이 길지 않을 것이라고 말합니다. 블레셋은 여전히 앞에 있지만, 더 깊은 전투는 왕의 마음에서 이미 패배했습니다.',
        '백성은 아직 이 말을 다 이해하지 못합니다. 왕은 계속 서 있고, 진영도 움직입니다.',
        '그러나 당신은 왕국의 빛 아래 처음으로 길게 드리운 균열의 그림자를 봅니다.'
      ],
      prompt: '이 균열 앞에서 무엇을 기억하시겠습니까?',
      choices: [
        { key: 'fear_word_more', icon: '✦', text: '왕국보다 말씀을 두려워해야 함을 기억한다', effects: { memory: 1, trust: 1 }, next: 'saul_07_amalek_command', companions: [line(saulCompanions.mira, '왕국은 기록될 수 있지만, 말씀을 떠난 왕국은 증언이 아니라 경고가 됩니다.')] },
        { key: 'survival_first', icon: '⚠', text: '그래도 지금은 전쟁에서 살아남는 게 먼저라고 생각한다', effects: { fear: 1, compromise: 1 }, next: 'saul_07_amalek_command', companions: [line(saulCompanions.jonathan, '살아남는 일은 가볍지 않습니다. 그러나 살아남기 위해 무엇을 버리는지도 보아야 합니다.')] },
        { key: 'fear_for_people', icon: '🤝', text: '왕이 흔들리면 백성도 무너질까 두려워한다', effects: { fear: 1, community: 1 }, next: 'saul_07_amalek_command', companions: [line(saulCompanions.eliyabet, '백성을 향한 염려는 귀합니다. 하지만 공동체를 지키는 길도 말씀 밖에 있을 수 없습니다.')] }
      ]
    },

    saul_07_amalek_command: {
      id: 'saul_07_amalek_command',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '출정 전 진영',
      bible: '사무엘상 15:1–3',
      title: '분명한 명령',
      day: '아말렉을 향한 출정 전',
      place: '이스라엘 진영',
      progress: { current: 7, total: 16 },
      copy: [
        '시간이 흐르고 사무엘은 다시 사울에게 하나님의 명령을 전합니다. 아말렉을 치라는 명령은 분명하고 무겁습니다.',
        '전쟁의 함성은 아직 시작되지 않았지만, 시험은 이미 시작되었습니다. 승리 뒤에 무엇을 남길 것인가가 마음속에서 자라납니다.',
        '당신은 명령의 무게와 전쟁의 열기 사이에 서 있습니다.'
      ],
      prompt: '분명한 명령 앞에서 당신은 무엇을 먼저 보시겠습니까?',
      choices: [
        { key: 'record_command', icon: '◎', text: '명령의 무게를 기록하고 기억한다', effects: { memory: 1, discernment: 1 }, next: 'saul_08_battlefield_vow', companions: [line(saulCompanions.mira, '전쟁의 기록보다 먼저 명령의 기록이 있어야 합니다. 그래야 승리도 바르게 해석됩니다.')] },
        { key: 'see_chance', icon: '♕', text: '전쟁 명령보다 승리의 기회를 먼저 본다', effects: { pride: 1 }, next: 'saul_08_battlefield_vow', companions: [line(saulCompanions.asar, '승리의 기회만 보면 명령의 경계가 흐려질 수 있습니다.')] },
        { key: 'distance_from_hard_word', icon: '☾', text: '너무 엄한 명령이라고 마음속으로 거리를 둔다', effects: { compromise: 1 }, next: 'saul_08_battlefield_vow', companions: [line(saulCompanions.eliyabet, '이해하기 어려운 말씀 앞에서도 마음이 먼저 물러서면, 순종의 자리도 멀어집니다.')] }
      ]
    },

    saul_08_battlefield_vow: {
      id: 'saul_08_battlefield_vow',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '아말렉 전장',
      bible: '사무엘상 15:4–7',
      title: '승리의 소음',
      day: '전투의 날',
      place: '하윌라로 가는 길',
      progress: { current: 8, total: 16 },
      copy: [
        '이스라엘 군대가 아말렉을 칩니다. 먼지와 함성과 쇠붙이의 소리가 골짜기를 채웁니다.',
        '전투는 이스라엘 쪽으로 기울고, 진영에는 승리의 흥분이 번집니다. 사람들은 명령보다 전리품을 먼저 말하기 시작합니다.',
        '당신의 눈앞에도 좋아 보이는 것들이 남습니다.'
      ],
      prompt: '승리의 소음 속에서 무엇을 붙드시겠습니까?',
      choices: [
        { key: 'remember_first_command', icon: '✦', text: '승리의 순간에도 처음 명령을 떠올린다', effects: { memory: 1, trust: 1 }, next: 'saul_09_spared_plunder', companions: [line(saulCompanions.mira, '처음 들은 말씀을 마지막 순간까지 기억하는 것이 순종입니다.')] },
        { key: 'swept_by_shouts', icon: '♕', text: '군사들의 환호에 휩쓸린다', effects: { pride: 1 }, next: 'saul_09_spared_plunder', companions: [line(saulCompanions.jonathan, '환호는 공동체를 하나로 묶지만, 때로는 분별을 덮어 버립니다.')] },
        { key: 'pity_good_animals', icon: '◇', text: '좋은 가축과 전리품을 보며 아깝다고 느낀다', effects: { compromise: 1, pride: 1 }, next: 'saul_09_spared_plunder', companions: [line(saulCompanions.asar, '좋아 보이는 것이 늘 남겨야 할 것은 아닙니다. 지금은 아까움이 시험이 됩니다.')] }
      ]
    },

    saul_09_spared_plunder: {
      id: 'saul_09_spared_plunder',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '전리품이 모인 진영',
      bible: '사무엘상 15:8–9',
      title: '남겨진 좋은 것들',
      day: '전투 이후',
      place: '아말렉 진영',
      progress: { current: 9, total: 16 },
      copy: [
        '사울은 아각을 사로잡고, 좋은 양과 소와 기름진 것들을 남깁니다. 가치 없어 보이는 것만 버려집니다.',
        '사람들은 그것을 지혜로운 판단이라고 부릅니다. 어떤 이는 하나님께 제사드리기 위한 것이라고 말합니다.',
        '그러나 당신은 “좋은 것”이라는 말이 말씀의 경계를 얼마나 쉽게 넘어서는지 봅니다.'
      ],
      prompt: '남겨진 좋은 것들 앞에서 무엇을 분별하시겠습니까?',
      choices: [
        { key: 'good_outside_command', icon: '◎', text: '좋은 것이라도 명령 밖에 있으면 위험하다고 여긴다', effects: { discernment: 1, memory: 1 }, next: 'saul_10_victory_camp', companions: [line(saulCompanions.eliyabet, '순종은 남길 만한 것을 고르는 일이 아니라 말씀의 경계 안에 머무는 일입니다.')] },
        { key: 'sacrifice_excuse', icon: '▤', text: '하나님께 제사드릴 것이라면 괜찮다고 생각한다', effects: { compromise: 1 }, next: 'saul_10_victory_camp', companions: [line(saulCompanions.mira, '예배의 이름이 불순종을 덮는 순간, 기록은 가장 어두워집니다.')] },
        { key: 'king_deserves_honor', icon: '♕', text: '승리한 왕에게 이 정도 영광은 필요하다고 여긴다', effects: { pride: 1, compromise: 1 }, next: 'saul_10_victory_camp', companions: [line(saulCompanions.asar, '왕의 영광이 말씀의 자리를 차지하면, 승리는 곧 우상이 됩니다.')] }
      ]
    },

    saul_10_victory_camp: {
      id: 'saul_10_victory_camp',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '갈멜로 가는 길',
      bible: '사무엘상 15:12',
      title: '승리의 기념비',
      day: '승리 이후의 아침',
      place: '갈멜 부근',
      progress: { current: 10, total: 16 },
      copy: [
        '사울은 자기를 위하여 기념비를 세웁니다. 군사들은 승리를 말하고, 백성은 왕의 이름을 높입니다.',
        '그러나 기념비가 높아질수록 처음 명령은 낮아집니다. 전리품의 소리와 왕의 이름이 진영을 채웁니다.',
        '당신은 왕국의 빛이 말씀을 가릴 수도 있음을 깨닫습니다.'
      ],
      prompt: '승리의 기념비 앞에서 무엇을 보시겠습니까?',
      choices: [
        { key: 'fear_lost_obedience', icon: '✦', text: '승리보다 순종을 잃은 것을 두려워한다', effects: { trust: 1, discernment: 1 }, next: 'saul_11_samuel_confronts', companions: [line(saulCompanions.mira, '이 기념비는 승리의 증거일 수 있지만, 동시에 잃어버린 순종의 표식이 될 수 있습니다.')] },
        { key: 'honor_lifts_people', icon: '♕', text: '왕의 명예가 백성의 사기를 높인다고 생각한다', effects: { pride: 1 }, next: 'saul_11_samuel_confronts', companions: [line(saulCompanions.jonathan, '사기는 높아질 수 있습니다. 그러나 왕의 명예가 하나님 경외를 대신하면 위험합니다.')] },
        { key: 'plunder_helps_community', icon: '🤝', text: '전리품이 공동체에 도움이 될 수 있다고 여긴다', effects: { compromise: 1, community: 1 }, next: 'saul_11_samuel_confronts', companions: [line(saulCompanions.eliyabet, '공동체를 위한 말이라도 말씀 밖의 것을 정당화하는 데 쓰이면 공동체를 살리지 못합니다.')] }
      ]
    },

    saul_11_samuel_confronts: {
      id: 'saul_11_samuel_confronts',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '사무엘 앞의 진영',
      bible: '사무엘상 15:13–15',
      title: '양과 소의 소리',
      day: '책망이 시작된 날',
      place: '길갈로 돌아온 진영',
      progress: { current: 11, total: 16 },
      copy: [
        '사무엘이 사울에게 옵니다. 사울은 자신이 여호와의 명령을 행했다고 말합니다.',
        '그때 진영 뒤편에서 양과 소의 소리가 들립니다. 사울의 말과 남겨진 것들의 소리가 서로 맞지 않습니다.',
        '말씀을 행했다는 선언은 크지만, 들리는 소리는 그 선언을 반박합니다.'
      ],
      prompt: '양과 소의 소리 앞에서 무엇을 외면하지 않겠습니까?',
      choices: [
        { key: 'hear_animals', icon: '◎', text: '들리는 짐승의 소리를 외면하지 않는다', effects: { discernment: 1, memory: 1 }, next: 'saul_12_better_than_sacrifice', companions: [line(saulCompanions.asar, '증거는 멀리 있지 않습니다. 때로는 진영 뒤편의 소리가 가장 정직한 기록입니다.')] },
        { key: 'repeat_sacrifice_excuse', icon: '▤', text: '사울처럼 “제사드리기 위해 남겼다”고 변명한다', effects: { compromise: 1, pride: 1 }, next: 'saul_12_better_than_sacrifice', companions: [line(saulCompanions.mira, '그 변명은 경건하게 들립니다. 바로 그래서 더 위험합니다.')] },
        { key: 'silent_for_king', icon: '☾', text: '왕의 말을 믿고 싶어 침묵한다', effects: { fear: 1 }, next: 'saul_12_better_than_sacrifice', companions: [line(saulCompanions.jonathan, '왕을 향한 충성은 진실을 지우는 침묵이 되어서는 안 됩니다.')] }
      ]
    },

    saul_12_better_than_sacrifice: {
      id: 'saul_12_better_than_sacrifice',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '사무엘의 책망 앞',
      bible: '사무엘상 15:22–23',
      title: '순종이 제사보다 낫다',
      day: '말씀이 드러난 순간',
      place: '길갈',
      progress: { current: 12, total: 16 },
      copy: [
        '사무엘의 말이 진영을 가릅니다. “순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니.”',
        '사울이 붙든 제사의 명분은 더 이상 숨을 곳을 찾지 못합니다. 하나님은 예배의 형식보다 말씀에 대한 들음을 요구하십니다.',
        '당신은 이 말이 왕에게만이 아니라, 진영 전체와 자신에게도 향하고 있음을 느낍니다.'
      ],
      prompt: '이 말씀 앞에서 당신은 무엇을 받아들이시겠습니까?',
      choices: [
        { key: 'obedience_over_form', icon: '✦', text: '예배의 형식보다 순종이 먼저임을 마음에 새긴다', effects: { trust: 1, memory: 1 }, next: 'saul_13_torn_robe', companions: [line(saulCompanions.eliyabet, '이 말씀은 왕국 전체가 오래 기억해야 할 기준입니다.')] },
        { key: 'good_intention_defense', icon: '◇', text: '그래도 제사를 드리려는 마음은 좋지 않았냐고 생각한다', effects: { compromise: 1 }, next: 'saul_13_torn_robe', companions: [line(saulCompanions.mira, '좋은 의도라는 말은 자주 순종하지 않은 사실을 흐리게 만듭니다.')] },
        { key: 'rebuke_too_hard', icon: '⚠', text: '책망이 너무 가혹하다고 느낀다', effects: { pride: 1, fear: 1 }, next: 'saul_13_torn_robe', companions: [line(saulCompanions.jonathan, '말씀이 가혹하게 느껴질 때, 우리는 그 말이 무엇을 지키려 하는지 보아야 합니다.')] }
      ]
    },

    saul_13_torn_robe: {
      id: 'saul_13_torn_robe',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '찢어진 겉옷자락 곁',
      bible: '사무엘상 15:24–29',
      title: '찢어진 왕국',
      day: '체면과 회개의 갈림길',
      place: '길갈',
      progress: { current: 13, total: 16 },
      copy: [
        '사울은 죄를 인정합니다. 그러나 곧 백성의 장로들 앞에서 자신을 높여 달라고 사무엘에게 요청합니다.',
        '사무엘이 돌아서려 할 때, 사울은 그의 겉옷자락을 붙잡고 그것은 찢어집니다. 사무엘은 여호와께서 왕국을 찢어 더 나은 이에게 주셨다고 말합니다.',
        '회개의 말과 체면의 욕망이 한 장면 안에서 뒤엉킵니다.'
      ],
      prompt: '찢어진 겉옷자락 앞에서 무엇을 분별하시겠습니까?',
      choices: [
        { key: 'discern_image_in_repentance', icon: '◎', text: '회개처럼 보이는 말 속의 체면 욕망을 분별한다', effects: { discernment: 1, memory: 1 }, next: 'saul_14_after_silence', companions: [line(saulCompanions.asar, '말은 죄를 인정했지만, 손은 여전히 체면을 붙잡고 있습니다.')] },
        { key: 'king_needs_face', icon: '♕', text: '왕도 사람들 앞에서 체면이 필요하다고 생각한다', effects: { pride: 1, compromise: 1 }, next: 'saul_14_after_silence', companions: [line(saulCompanions.jonathan, '체면을 지키는 말은 공동체를 잠시 안정시킬 수 있지만, 회개를 지연시킬 수 있습니다.')] },
        { key: 'too_afraid_to_judge', icon: '☾', text: '너무 두려워 아무 판단도 하지 못한다', effects: { fear: 1 }, next: 'saul_14_after_silence', companions: [line(saulCompanions.eliyabet, '두려움 때문에 판단을 멈출 때에도, 말씀은 이미 판단을 내리고 있습니다.')] }
      ]
    },

    saul_14_after_silence: {
      id: 'saul_14_after_silence',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '사무엘이 떠난 길',
      bible: '사무엘상 15:30–35',
      title: '다시 보지 않은 슬픔',
      day: '사무엘이 떠난 뒤',
      place: '길갈의 침묵',
      progress: { current: 14, total: 16 },
      copy: [
        '사무엘은 사울을 다시 보러 가지 않습니다. 사울은 여전히 왕이지만, 왕국의 중심에는 깊은 균열이 남았습니다.',
        '진영은 다시 일상을 찾으려 하지만, “순종이 제사보다 낫다”는 말은 조용히 사람들의 마음을 흔듭니다.',
        '당신에게도 선택이 남았습니다. 이 일을 무엇으로 남길 것인가.'
      ],
      prompt: '사무엘이 떠난 뒤, 당신은 이 사건을 어떻게 남기시겠습니까?',
      choices: [
        { key: 'record_for_next_generation', icon: '✦', text: '이 사건을 다음 세대가 기억하도록 기록한다', effects: { memory: 1, trust: 1 }, next: 'saul_15_witness_record', companions: [line(saulCompanions.mira, '기록은 왕을 조롱하기 위한 것이 아니라, 다음 세대가 같은 불순종을 예배로 착각하지 않게 하기 위한 것입니다.')] },
        { key: 'cover_for_stability', icon: '▤', text: '왕국의 안정을 위해 이 일을 덮어 두려 한다', effects: { compromise: 1, fear: 1 }, next: 'saul_16_compromise_record', companions: [line(saulCompanions.jonathan, '덮어 두는 안정은 오래가지 못합니다. 균열은 기록되지 않아도 사라지지 않습니다.')] },
        { key: 'remember_only_victory', icon: '♕', text: '승리와 체면만 남기고 불편한 말씀은 잊으려 한다', effects: { pride: 1, memory: -1 }, next: 'saul_16_compromise_record', companions: [line(saulCompanions.asar, '불편한 말씀을 지우면, 남는 것은 승리의 껍데기뿐입니다.')] }
      ]
    },

    saul_15_witness_record: {
      id: 'saul_15_witness_record',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '기록자의 작은 등불 아래',
      bible: '사무엘상 15:22–23',
      title: '증인의 기록',
      day: '밤의 기록',
      place: '길갈의 장막',
      progress: { current: 15, total: 16 },
      copy: [
        '밤이 내려오고, 진영의 소음은 잦아듭니다. 당신은 오늘 들은 말씀을 다시 떠올립니다.',
        '왕의 실패를 조롱하려는 마음도, 왕을 무조건 감싸려는 마음도 당신 안에서 싸웁니다.',
        '이제 당신의 증언은 어떤 결론으로 남을지 결정됩니다.'
      ],
      prompt: '당신의 기록은 어디로 향합니까?',
      choices: [
        { key: 'obedient_witness', icon: '✦', text: '“순종이 제사보다 낫다”는 말씀을 공동체의 기준으로 남긴다', effects: { trust: 1, memory: 1, discernment: 1 }, ending: 'true_saul_obedient_witness', companions: [line(saulCompanions.eliyabet, '이 증언은 왕의 실패를 넘어, 공동체가 말씀 앞에 다시 서도록 부를 것입니다.')] },
        { key: 'waiting_remnant', icon: '◇', text: '흔들렸지만 기다림과 말씀을 다시 배우겠다고 기록한다', effects: { trust: 1, community: 1, fear: 1 }, ending: 'faithful_saul_waiting_remnant', companions: [line(saulCompanions.mira, '완전한 증언은 아니어도, 다시 배우려는 기록은 남은 자의 시작입니다.')] },
        { key: 'silent_wounded', icon: '☾', text: '잘못을 보았지만 말하지 못한 침묵까지 정직하게 남긴다', effects: { discernment: 1, fear: 1 }, ending: 'wounded_saul_silent_witness', companions: [line(saulCompanions.jonathan, '침묵도 기록될 때 다음 선택의 경고가 될 수 있습니다.')] }
      ]
    },

    saul_16_compromise_record: {
      id: 'saul_16_compromise_record',
      chapter: 'Part II · 1장 · 사울의 불순종',
      location: '덮어 둔 전리품 곁',
      bible: '사무엘상 15:13–23',
      title: '덮어 둔 균열',
      day: '승리로 포장된 밤',
      place: '왕의 진영',
      progress: { current: 16, total: 16 },
      copy: [
        '사람들은 왕의 승리를 말하고, 불편한 책망은 점점 낮은 목소리로 밀려납니다.',
        '남겨진 전리품은 제사의 이름을 얻고, 왕의 체면은 공동체의 안정이라는 말로 보호됩니다.',
        '그러나 덮어 둔 균열은 사라지지 않습니다. 당신의 마지막 선택이 그 균열의 이름을 정합니다.'
      ],
      prompt: '당신은 무엇으로 이 사건을 덮으려 합니까?',
      choices: [
        { key: 'religious_excuse', icon: '▤', text: '제사의 이름으로 남겨진 것들을 정당화한다', effects: { compromise: 1, memory: -1 }, ending: 'bad_saul_religious_excuse', companions: [line(saulCompanions.mira, '예배의 언어가 불순종의 가림막이 될 때, 가장 위험한 기록이 됩니다.')] },
        { key: 'kingdom_pride', icon: '♕', text: '왕의 체면과 승리의 기념비를 더 크게 남긴다', effects: { pride: 1, compromise: 1 }, ending: 'bad_saul_kingdom_pride', companions: [line(saulCompanions.asar, '왕의 이름이 높아질수록 말씀의 자리가 낮아진다면, 그 기념비는 균열의 표지입니다.')] },
        { key: 'fearful_compromise', icon: '⚠', text: '두려움 때문에 말씀보다 상황 논리를 따른다', effects: { fear: 1, compromise: 1 }, ending: 'bad_saul_fearful_compromise', companions: [line(saulCompanions.jonathan, '두려움은 공동체를 지키는 듯 보이지만, 말씀을 흐리게 만들면 결국 아무도 지키지 못합니다.')] }
      ]
    }
  };

  const saulEndings = {
    true_saul_obedient_witness: {
      id: 'true_saul_obedient_witness',
      type: 'true',
      title: '순종을 기억한 증인',
      bannerLeft: '당신은 왕의 실패를 조롱하지 않았습니다',
      bannerRight: '말씀 앞에서 공동체가 두려워해야 할 것을 기록했습니다',
      grade: '순종의 증인',
      scripture: '순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니',
      reference: '사무엘상 15:22',
      image: 'true_saul_obedient_witness.png',
      description: [
        '당신은 두려움과 승리의 분위기에 휩쓸리지 않고, 하나님의 말씀을 공동체의 기준으로 남겼습니다.',
        '사울의 실패는 조롱거리가 아니라 경고가 되었고, 예배의 형식보다 순종이 먼저라는 증언으로 기록되었습니다.',
        '왕국의 빛 아래 생긴 첫 균열 앞에서 당신은 말씀을 기억한 증인으로 남았습니다.'
      ]
    },
    faithful_saul_waiting_remnant: {
      id: 'faithful_saul_waiting_remnant',
      type: 'good',
      title: '기다림의 남은 자',
      bannerLeft: '당신은 완전하지 않았지만 말씀의 방향을 놓지 않았습니다',
      bannerRight: '두려움 속에서도 다시 기다림을 배우려 했습니다',
      grade: '기다림을 배운 자',
      scripture: '왕이 왕의 하나님 여호와께서 왕에게 내리신 명령을 지키지 아니하였도다',
      reference: '사무엘상 13:13',
      image: 'faithful_saul_waiting_remnant.png',
      description: [
        '당신은 길갈의 두려움과 아말렉의 승리 앞에서 여러 번 흔들렸습니다.',
        '그러나 불순종을 완전히 정당화하지 않았고, 말씀을 다시 배워야 한다는 사실을 놓지 않았습니다.',
        '당신의 증언은 완전한 승리가 아니라, 기다림을 다시 배우는 남은 자의 기록입니다.'
      ]
    },
    wounded_saul_silent_witness: {
      id: 'wounded_saul_silent_witness',
      type: 'mixed',
      title: '침묵한 증인',
      bannerLeft: '당신은 잘못을 보았습니다',
      bannerRight: '그러나 왕의 권위와 백성의 분위기 앞에서 말하지 못했습니다',
      grade: '침묵한 목격자',
      scripture: '여호와께서 오늘 이스라엘 나라를 왕에게서 떼어',
      reference: '사무엘상 15:28',
      image: 'wounded_saul_silent_witness.png',
      description: [
        '당신은 제사의 이름으로 덮인 불순종과 왕의 체면을 붙든 회개를 분별했습니다.',
        '하지만 두려움은 당신의 입을 닫았고, 증언은 마음속 기록으로만 남았습니다.',
        '이 결말은 완전한 실패가 아니라, 다음 선택에서 침묵을 넘어설 것을 요구하는 상처 입은 기록입니다.'
      ]
    },
    bad_saul_religious_excuse: {
      id: 'bad_saul_religious_excuse',
      type: 'bad',
      title: '제사의 이름으로 덮은 불순종',
      bannerLeft: '제사의 말은 남았습니다',
      bannerRight: '그러나 순종은 그 말 아래 묻혔습니다',
      grade: '종교적 변명을 택한 자',
      scripture: '여호와께 제사하려 하여 양과 소의 가장 좋은 것을 남김이요',
      reference: '사무엘상 15:15',
      image: 'bad_saul_religious_excuse.png',
      description: [
        '당신은 하나님께 드리기 위한 것이라는 말로 명령 밖에 남겨진 것들을 정당화했습니다.',
        '예배의 언어는 불순종을 거룩하게 만들지 못했습니다.',
        '제사의 이름은 남았지만, 말씀을 듣는 마음은 사라졌습니다.'
      ]
    },
    bad_saul_kingdom_pride: {
      id: 'bad_saul_kingdom_pride',
      type: 'bad',
      title: '왕의 체면을 붙든 사람',
      bannerLeft: '기념비는 높아졌습니다',
      bannerRight: '그러나 왕국의 중심은 찢어졌습니다',
      grade: '권력의 체면을 택한 자',
      scripture: '사울이 갈멜에 이르러 자기를 위하여 기념비를 세우고',
      reference: '사무엘상 15:12',
      image: 'bad_saul_kingdom_pride.png',
      description: [
        '당신은 하나님의 말씀보다 왕의 위신과 승리의 기념비를 더 크게 보았습니다.',
        '왕국은 겉으로 빛났지만, 그 빛은 순종의 균열을 가리지 못했습니다.',
        '체면을 지킨 선택은 회개의 길을 좁히고, 왕국의 마음을 더 깊이 갈라놓았습니다.'
      ]
    },
    bad_saul_fearful_compromise: {
      id: 'bad_saul_fearful_compromise',
      type: 'bad',
      title: '두려움이 만든 타협',
      bannerLeft: '당신은 백성을 지키려 했습니다',
      bannerRight: '그러나 두려움이 말씀보다 먼저 결정하게 했습니다',
      grade: '두려움에 밀린 자',
      scripture: '내가 백성을 두려워하여 그들의 말을 청종하였음이니이다',
      reference: '사무엘상 15:24',
      image: 'bad_saul_fearful_compromise.png',
      description: [
        '당신은 상황이 급하다는 이유로 기다림을 포기했고, 공동체의 압박을 말씀보다 크게 들었습니다.',
        '두려움은 잠시 안전을 약속했지만, 결국 순종의 기준을 흐리게 만들었습니다.',
        '왕국의 첫 균열은 거대한 반역이 아니라, 두려움 앞에서 타협을 선택한 작은 말들에서 시작되었습니다.'
      ]
    }
  };

  window.STORY_NODES = {
    ...(window.STORY_NODES || {}),
    ...saulNodes
  };

  window.STORY_ENDINGS = {
    ...(window.STORY_ENDINGS || {}),
    ...saulEndings
  };
})();
