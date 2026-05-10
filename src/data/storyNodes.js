window.STORY_NODES = {
  exodus_01_slave_day: {
    id: 'exodus_01_slave_day',
    chapter: '1장 · 출애굽',
    location: '고센의 벽돌터',
    bible: '출애굽기 1:8–14',
    title: '끝나지 않는 벽돌',
    day: '억압의 날',
    place: '애굽의 벽돌터',
    progress: { current: 1, total: 12 },
    copy: [
      '새벽이 오기도 전에 벽돌터의 불이 피어오릅니다. 진흙과 짚 냄새가 무거운 공기 속에 엉겨 붙습니다.',
      '감독관의 목소리는 오늘도 백성의 이름보다 먼저 들려옵니다. 사람들은 말없이 벽돌을 들고, 또 벽돌을 쌓습니다.',
      '누군가 쓰러졌지만 일은 멈추지 않습니다. 이 땅에서 히브리인의 하루는 끝나는 법을 잊은 것 같습니다.'
    ],
    prompt: '당신은 이 벽돌터에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'carry_neighbor', icon: '🤝', text: '지친 이웃의 짐을 함께 든다',
        effects: { community: 1 }, next: 'exodus_02_whisper',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '가장 약한 사람이 무너지면 공동체 전체가 흔들립니다. 오늘의 작은 도움도 기억될 것입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '벽돌의 수는 애굽이 기록하지만, 서로를 붙든 손은 하나님 앞에 남습니다.' }
        ]
      },
      {
        key: 'work_silently', icon: '▤', text: '말없이 내 몫의 일만 한다',
        effects: {}, next: 'exodus_02_whisper',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '살아남기 위해 침묵할 때도 있습니다. 그러나 침묵이 마음까지 굳게 만들지는 않도록 해야 합니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '감독관들의 시선이 날카롭습니다. 지금은 조용히 주변을 살피는 것도 필요합니다.' }
        ]
      },
      {
        key: 'rage_at_overseer', icon: '⚠', text: '감독관에게 분노를 터뜨린다',
        effects: { fear: 1, delay: 1 }, next: 'exodus_02_whisper',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '분노는 이해됩니다. 그러나 지금의 충돌은 더 약한 사람들에게 되돌아갈 수 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '억압은 사람을 불태우지만, 불이 방향을 잃으면 공동체도 함께 다칩니다.' }
        ]
      }
    ]
  },

  exodus_02_whisper: {
    id: 'exodus_02_whisper',
    chapter: '1장 · 출애굽',
    location: '고센의 숙소',
    bible: '출애굽기 2:23–25; 4:29–31',
    title: '돌아온 이름',
    day: '소문이 번진 밤',
    place: '히브리인의 거처',
    progress: { current: 2, total: 12 },
    copy: [
      '일이 끝난 뒤, 사람들은 작은 불빛 곁에 모입니다. 낮에는 말하지 못했던 이름 하나가 밤의 틈으로 흘러나옵니다.',
      '모세가 돌아왔다는 말이 들립니다. 하나님이 자기 백성을 기억하셨다는 소식도 함께 퍼집니다.',
      '그러나 오래 눌려 있던 사람들에게 희망은 기쁨이면서 동시에 두려움입니다.'
    ],
    prompt: '당신은 이 소문을 어떻게 받아들이시겠습니까?',
    choices: [
      {
        key: 'receive_hope', icon: '✦', text: '소문을 귀담아듣고 희망을 품는다',
        effects: { trust: 1 }, next: 'exodus_03_pharaoh',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '희망은 아직 증명되지 않았지만, 완전히 닫힌 마음으로는 길을 볼 수 없습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '하나님이 기억하셨다는 말은 단순한 소문이 아닐지도 모릅니다. 이 밤을 기록해 두겠습니다.' }
        ]
      },
      {
        key: 'wait_and_watch', icon: '◎', text: '섣불리 기대하지 않고 더 지켜본다',
        effects: { discernment: 1 }, next: 'exodus_03_pharaoh',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '조심스러움이 곧 불신은 아닙니다. 다만 징조가 오면 놓치지 말아야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '사람들이 너무 빨리 들뜨면 상처도 커집니다. 질서를 지키며 살피겠습니다.' }
        ]
      },
      {
        key: 'cynical', icon: '☾', text: '괜한 기대는 더 아프게 한다고 냉소한다',
        effects: { memory: -1, fear: 1 }, next: 'exodus_03_pharaoh',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '상처가 큰 사람일수록 희망을 조롱하게 됩니다. 그러나 기억을 잃으면 기다림도 사라집니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '마음이 닫히면 고통은 익숙해지고, 익숙한 고통은 감옥처럼 변합니다.' }
        ]
      }
    ]
  },

  exodus_03_pharaoh: {
    id: 'exodus_03_pharaoh',
    chapter: '1장 · 출애굽',
    location: '더 무거워진 노동',
    bible: '출애굽기 5:1–21',
    title: '더 무거워진 짐',
    day: '바로의 거절 이후',
    place: '벽돌터',
    progress: { current: 3, total: 12 },
    copy: [
      '모세와 아론은 바로에게 여호와의 말씀을 전했습니다. 그러나 왕의 대답은 해방이 아니라 더 무거운 짐이었습니다.',
      '짚은 주지 않으면서 벽돌 수는 줄이지 말라는 명령이 내려옵니다. 백성의 등은 더 휘고, 마음은 모세를 향해 흔들립니다.',
      '약속이 시작되었는데 고통은 더 커졌습니다. 이 모순 앞에서 사람들의 입술은 쉽게 원망으로 기울어집니다.'
    ],
    prompt: '당신은 더 무거워진 짐 앞에서 어떻게 말하시겠습니까?',
    choices: [
      {
        key: 'blame_moses', icon: '⚠', text: '모세를 원망한다',
        effects: { trust: -1, fear: 1 }, next: 'exodus_04_plague_begin',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '원망은 이해되지만 방향을 잃으면 약속을 전한 사람까지 적으로 보이게 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '고통이 커지는 순간, 사람은 하나님이 시작하신 일을 가장 쉽게 오해합니다.' }
        ]
      },
      {
        key: 'endure', icon: '✦', text: '지금은 괴로워도 끝을 알 수 없다고 버틴다',
        effects: { trust: 1 }, next: 'exodus_04_plague_begin',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '버틴다는 것은 아무것도 하지 않는 일이 아닙니다. 아직 끝나지 않았다고 믿는 태도입니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '상황은 악화되었지만 흐름이 움직이기 시작했습니다. 애굽도 흔들릴 것입니다.' }
        ]
      },
      {
        key: 'gather_people', icon: '🤝', text: '백성들을 모아 흔들리지 말자고 말한다',
        effects: { community: 1 }, next: 'exodus_04_plague_begin',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 모두가 흩어지기 전에 서로의 얼굴을 보게 해야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '공동체가 무너지면 약속을 들을 귀도 사라집니다. 먼저 사람들을 세워야 합니다.' }
        ]
      },
      {
        key: 'submit_to_egypt', icon: '✕', text: '차라리 애굽의 질서에 순응하자고 선동한다',
        effects: { fear: 2, trust: -1 }, ending: 'bad_bricks_forever',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '그 말은 고통을 줄이는 것처럼 들리지만, 사실은 벽돌 곁에 영원히 머물자는 말입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '해방의 길이 처음부터 편안할 것이라고 생각하면 다시 노예의 질서가 안전해 보입니다.' }
        ]
      }
    ]
  },

  exodus_04_plague_begin: {
    id: 'exodus_04_plague_begin',
    chapter: '1장 · 출애굽',
    location: '흔들리는 애굽',
    bible: '출애굽기 7:14–8:19',
    title: '흔들리는 애굽',
    day: '재앙의 시작',
    place: '나일 강가',
    progress: { current: 4, total: 12 },
    copy: [
      '강이 붉게 변했다는 소식이 고센까지 밀려옵니다. 애굽의 자랑이던 물은 더 이상 생명의 상징처럼 보이지 않습니다.',
      '개구리와 이가 집과 들을 뒤덮고, 사람들은 익숙했던 애굽의 질서가 흔들리는 것을 봅니다.',
      '백성은 두려움과 놀라움 사이에 서 있습니다. 이것은 우연입니까, 아니면 하나님이 움직이기 시작하신 것입니까?'
    ],
    prompt: '당신은 재앙의 시작을 어떻게 해석하시겠습니까?',
    choices: [
      {
        key: 'record_signs', icon: '▤', text: '이 일이 우연이 아니라고 기록해 둔다',
        effects: { memory: 1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기록하겠습니다. 오늘 흔들린 것은 강물만이 아니라 애굽이 영원하다는 믿음입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '하나님의 일을 기억하는 사람은 다음 두려움 앞에서도 완전히 무너지지 않습니다.' }
        ]
      },
      {
        key: 'discern_more', icon: '◎', text: '아직은 더 지켜봐야 한다고 말한다',
        effects: { discernment: 1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '좋습니다. 그러나 계속 지켜보기만 하다가 때를 놓치지는 않아야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '백성에게 섣부른 말은 삼가되, 두려움이 퍼지지 않게 하겠습니다.' }
        ]
      },
      {
        key: 'spread_fear', icon: '⚠', text: '두려움에 휩싸여 백성을 불안하게 만든다',
        effects: { fear: 1 }, next: 'exodus_05_set_apart',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '공포는 재앙보다 빠르게 번집니다. 사람들의 숨이 가빠지고 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '두려움이 이야기를 지배하면 하나님이 하시는 일도 위협으로만 보입니다.' }
        ]
      }
    ]
  },

  exodus_05_set_apart: {
    id: 'exodus_05_set_apart',
    chapter: '1장 · 출애굽',
    location: '구별된 땅',
    bible: '출애굽기 8:20–9:7',
    title: '구별된 땅',
    day: '고센이 남은 날',
    place: '고센',
    progress: { current: 5, total: 12 },
    copy: [
      '재앙은 애굽을 덮치지만, 고센의 땅은 이상하리만큼 보존됩니다. 백성은 처음으로 구별이라는 말을 몸으로 느낍니다.',
      '이 구별은 우월함의 표식이 아니라 부르심의 표식입니다. 하나님은 자기 백성이 누구에게 속했는지를 드러내고 계십니다.',
      '그러나 구별받았다는 사실은 사람을 겸손하게 만들 수도, 교만하게 만들 수도 있습니다.'
    ],
    prompt: '당신은 구별의 표지를 어떻게 받아들이시겠습니까?',
    choices: [
      {
        key: 'remember_set_apart', icon: '✦', text: '우리를 구별하시는 하나님을 기억하자고 말한다',
        effects: { memory: 1, trust: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '구별은 자랑이 아니라 책임입니다. 하나님께 속했다는 사실을 기억해야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '이 기억은 훗날 광야에서도 필요할 것입니다. 우리는 애굽의 소유가 아니었습니다.' }
        ]
      },
      {
        key: 'still_doubt', icon: '◎', text: '아직도 의심스럽다고 말한다',
        effects: { discernment: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '의심은 완전히 나쁜 것이 아닙니다. 그러나 보이는 표지 앞에서도 계속 물러서면 길을 잃습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '의심이 질문으로 남으면 분별이 되지만, 냉소가 되면 기억을 지웁니다.' }
        ]
      },
      {
        key: 'mock_egyptians', icon: '✕', text: '애굽 사람들을 조롱한다',
        effects: { community: -1, fear: 1 }, next: 'exodus_06_darkness',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '구별받았다는 사실이 교만으로 변하면 우리도 애굽의 마음을 닮게 됩니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '조롱은 사람들을 들뜨게 하지만, 곧 불필요한 위험을 부를 수 있습니다.' }
        ]
      }
    ]
  },

  exodus_06_darkness: {
    id: 'exodus_06_darkness',
    chapter: '1장 · 출애굽',
    location: '어둠의 재앙',
    bible: '출애굽기 10:21–29',
    title: '손으로 만질 듯한 어둠',
    day: '마지막 밤 전',
    place: '애굽의 어둠',
    progress: { current: 6, total: 12 },
    copy: [
      '애굽 전역에 어둠이 내려앉습니다. 단순히 빛이 사라진 것이 아니라, 사람들의 마음까지 멈춰 버린 것 같습니다.',
      '불안한 소문들이 작은 방과 골목을 오갑니다. 마지막 밤이 가까워지고 있다는 것을 모두가 느낍니다.',
      '준비해야 할 때와 흔들릴 때는 늘 비슷한 얼굴로 찾아옵니다.'
    ],
    prompt: '당신은 짙은 어둠 속에서 무엇을 하시겠습니까?',
    choices: [
      {
        key: 'prepare_family', icon: '🤝', text: '가족과 함께 조용히 준비한다',
        effects: { community: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 모두가 불안할 때 가장 가까운 사람들을 먼저 붙드는 것이 필요합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '조용한 준비가 큰 결단을 가능하게 합니다. 이 밤을 가볍게 보내면 안 됩니다.' }
        ]
      },
      {
        key: 'seek_more_signs', icon: '◎', text: '더 많은 징조를 확인하려고 돌아다닌다',
        effects: { discernment: 1, delay: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '확인하려는 마음은 이해합니다. 그러나 어둠 속에서 너무 멀리 움직이면 돌아오는 길이 늦어집니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '모든 표지를 더 확인해야만 순종할 수 있다면, 순종의 때는 늘 늦어질 수 있습니다.' }
        ]
      },
      {
        key: 'spread_rumors', icon: '⚠', text: '불안이 커져 불필요한 소문을 퍼뜨린다',
        effects: { fear: 1, scatter: 1 }, next: 'exodus_07_passover',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '사람들이 술렁이기 시작했습니다. 소문은 어둠보다 더 많은 길을 막습니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '공동체가 두려움으로 움직이면, 곧 각자 살 길만 찾게 됩니다.' }
        ]
      }
    ]
  },

  exodus_07_passover: {
    id: 'exodus_07_passover',
    chapter: '1장 · 출애굽',
    location: '유월절의 밤',
    bible: '출애굽기 12:1–14',
    title: '표시된 문',
    day: '유월절의 밤',
    place: '문설주 앞',
    progress: { current: 7, total: 12 },
    copy: [
      '말씀은 구체적입니다. 어린 양, 피, 문설주, 급히 먹을 음식. 이 밤은 생각보다 몸으로 순종해야 하는 밤입니다.',
      '문 하나를 사이에 두고 안과 밖이 나뉩니다. 표지는 장식이 아니라 생명의 경계가 됩니다.',
      '이해할 수 있는 만큼만 따를 것인지, 말씀하신 그대로 준비할 것인지 결정해야 합니다.'
    ],
    prompt: '당신은 유월절의 표지 앞에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'mark_door', icon: '✦', text: '말씀대로 문설주에 피를 바르고 가족을 준비시킨다',
        effects: { trust: 1, community: 1, memory: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '말씀은 모호하지 않습니다. 오늘 밤의 순종은 공동체를 살리는 표지가 될 것입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '피의 표지를 기록하겠습니다. 이 밤은 훗날 절기로 기억될 것입니다.' }
        ]
      },
      {
        key: 'obey_without_understanding', icon: '▤', text: '이해되지 않지만 그대로 따른다',
        effects: { trust: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '모든 순종이 완전한 이해 뒤에 오는 것은 아닙니다. 때로는 말씀을 따라 걷는 중에 의미가 열립니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '지금은 오래 따질 시간이 없습니다. 필요한 것은 준비와 이동입니다.' }
        ]
      },
      {
        key: 'hesitate_mark', icon: '☾', text: '굳이 이렇게까지 해야 하느냐며 망설인다',
        effects: { delay: 1, fear: 1 }, next: 'exodus_08_departure',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '망설임이 길어지면 가족들이 불안해합니다. 결정해야 할 시간이 가까워졌습니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '구원의 표지는 마음속 생각이 아니라 문 위에 남아야 합니다.' }
        ]
      },
      {
        key: 'ignore_mark', icon: '✕', text: '이 표지는 지나친 일이라며 무시한다',
        effects: { trust: -2, delay: 1 }, ending: 'bad_unmarked_door',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '표지를 가볍게 여기는 것은 이 밤의 의미를 가볍게 여기는 일입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '말씀이 지나치게 보이는 순간, 우리는 자신이 더 안전한 판단을 한다고 착각합니다.' }
        ]
      }
    ]
  },

  exodus_08_departure: {
    id: 'exodus_08_departure',
    chapter: '1장 · 출애굽',
    location: '떠나는 밤',
    bible: '출애굽기 12:31–42',
    title: '급히 떠나는 사람들',
    day: '떠남의 밤',
    place: '애굽의 문밖',
    progress: { current: 8, total: 12 },
    copy: [
      '마침내 떠날 시간이 왔습니다. 빵은 부풀 틈도 없고, 사람들의 손은 떨리지만 발은 움직이기 시작합니다.',
      '오래 살던 땅을 떠난다는 것은 단순히 장소를 옮기는 일이 아닙니다. 익숙한 두려움과도 결별하는 일입니다.',
      '그러나 떠나는 순간에도 사람은 붙잡고 싶은 것을 찾습니다. 무엇을 챙기고 무엇을 내려놓을지 선택해야 합니다.'
    ],
    prompt: '당신은 떠나는 밤에 무엇을 우선하시겠습니까?',
    choices: [
      {
        key: 'care_weak', icon: '🤝', text: '약한 자들과 아이들을 먼저 챙긴다',
        effects: { community: 1 }, next: 'exodus_09_wilderness_edge',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '아이들과 노인들을 한가운데 세우겠습니다. 함께 떠나야 진짜 출발입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '해방의 길은 가장 빠른 사람만의 길이 아닙니다. 함께 걷는 질서가 필요합니다.' }
        ]
      },
      {
        key: 'take_only_needed', icon: '◎', text: '필요한 것만 챙기고 즉시 이동한다',
        effects: { discernment: 1 }, next: 'exodus_09_wilderness_edge',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '좋은 판단입니다. 짐이 가벼울수록 방향을 잃지 않고 움직일 수 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '급히 먹은 떡도 기억이 됩니다. 이 밤은 넉넉함보다 떠남의 표지로 남을 것입니다.' }
        ]
      },
      {
        key: 'pack_more', icon: '⚠', text: '아까워서 더 많은 물건을 챙기려 한다',
        effects: { delay: 1 }, next: 'exodus_09_wilderness_edge',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '짐이 늘어나면 걸음이 늦어집니다. 지금 붙드는 것이 나중에 발목을 잡을 수 있습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '떠남은 무엇을 가지고 가는가보다 무엇을 놓고 나오는가로 드러납니다.' }
        ]
      },
      {
        key: 'stay_in_egypt', icon: '✕', text: '떠나는 대신 남겠다고 한다',
        effects: { trust: -2, fear: 2 }, ending: 'bad_stayed_in_egypt',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '부름이 왔는데도 남는다면, 새벽은 다른 사람들의 이야기가 됩니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '문이 열렸습니다. 지금 남는 것은 안전이 아니라 다시 닫히는 밤입니다.' }
        ]
      }
    ]
  },

  exodus_09_wilderness_edge: {
    id: 'exodus_09_wilderness_edge',
    chapter: '1장 · 출애굽',
    location: '광야의 경계',
    bible: '출애굽기 13:17–22; 14:5–9',
    title: '먼지 속의 소리',
    day: '추격의 소식',
    place: '광야의 끝',
    progress: { current: 9, total: 12 },
    copy: [
      '구름기둥과 불기둥은 백성 앞에 있지만, 뒤편에서는 먼지가 일어납니다. 애굽의 병거가 따라오고 있다는 소식이 퍼집니다.',
      '떠났다고 끝난 것이 아니었습니다. 노예의 땅은 백성을 쉽게 놓아주지 않습니다.',
      '두려움은 다시 사람들의 마음을 붙잡습니다. 이제 공동체는 흩어질 것인지, 함께 설 것인지 시험받습니다.'
    ],
    prompt: '당신은 추격의 소식 앞에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'calm_people', icon: '🤝', text: '사람들을 진정시키고 질서를 세운다',
        effects: { community: 1 }, next: 'exodus_10_redsea',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '사람들이 뛰기 시작하면 더 큰 혼란이 옵니다. 줄을 세우고 아이들을 가운데 두겠습니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '질서는 두려움을 없애지는 못해도, 두려움이 공동체를 찢지 못하게 합니다.' }
        ]
      },
      {
        key: 'remember_guidance', icon: '✦', text: '하나님이 여기까지 인도하셨음을 상기시킨다',
        effects: { memory: 1, trust: 1 }, next: 'exodus_10_redsea',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기억은 뒤쫓아오는 소리보다 앞서 걷는 표지를 보게 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '우리가 여기까지 온 것은 우연이 아닙니다. 백성에게 그 사실을 다시 들려주어야 합니다.' }
        ]
      },
      {
        key: 'scatter_escape', icon: '⚠', text: '흩어져 각자 도망칠 길을 찾자고 말한다',
        effects: { fear: 1, scatter: 1 }, next: 'exodus_10_redsea',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '각자 흩어지면 약한 사람들이 먼저 사라집니다. 지금 필요한 것은 빠른 발이 아니라 함께 설 중심입니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '사방이 열린 것처럼 보여도, 흩어진 길은 병거에게 더 쉬운 표적이 됩니다.' }
        ]
      }
    ]
  },

  exodus_10_redsea: {
    id: 'exodus_10_redsea',
    chapter: '1장 · 출애굽',
    location: '홍해 앞',
    bible: '출애굽기 14:10–14',
    title: '바다 앞에 선 밤',
    day: '앞에는 바다, 뒤에는 병거',
    place: '홍해 앞',
    progress: { current: 10, total: 12 },
    copy: [
      '앞에는 바다가 검게 누워 있고, 뒤에서는 병거의 소리가 가까워집니다. 백성의 입에서는 탄식과 원망이 터져 나옵니다.',
      '모세는 두려워하지 말고 여호와께서 행하시는 구원을 보라고 말합니다.',
      '그러나 말씀이 들려도 발은 쉽게 움직이지 않습니다. 지금 선택은 공동체의 방향을 바꿀 것입니다.'
    ],
    prompt: '당신은 바다 앞에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'move_forward', icon: '✦', text: '하나님을 신뢰하며 앞으로 나아간다',
        effects: { trust: 1 }, next: 'exodus_11_crossing',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '길이 보이지 않을 때도 말씀은 방향이 됩니다. 백성에게 앞으로 나아가야 한다고 전하겠습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '두려움보다 먼저 발을 내딛는 순간이 기억으로 남을 것입니다.' }
        ]
      },
      {
        key: 'care_branch', icon: '🤝', text: '뒤처진 사람들을 돌아본다',
        effects: { community: 1 }, next: 'exodus_10b_care_branch',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '뒤쪽이 흔들립니다. 아이들과 노인들이 밀리지 않도록 함께 가야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '함께 건너지 못하면 해방의 기쁨도 온전하지 않습니다.' }
        ]
      },
      {
        key: 'discern_branch', icon: '◎', text: '상황을 살피며 안전한 길을 찾는다',
        effects: { discernment: 1 }, next: 'exodus_10c_discern_branch',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '물길이 열릴 조짐이 있습니다. 바람의 방향과 땅의 움직임을 살펴야 합니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '분별은 두려움이 아니라 열린 길을 더 정확히 보는 일입니다.' }
        ]
      },
      {
        key: 'return_egypt', icon: '✕', text: '애굽으로 돌아가자고 외친다',
        effects: { fear: 2, trust: -1 }, ending: 'bad_return_to_egypt',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '그 말은 생존처럼 들리지만, 마음이 다시 노예의 집으로 향하는 말입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '열린 길 앞에서 돌아서면, 해방은 눈앞에 있어도 자신의 이야기가 되지 못합니다.' }
        ]
      }
    ]
  },

  exodus_10b_care_branch: {
    id: 'exodus_10b_care_branch',
    chapter: '1장 · 출애굽',
    location: '홍해 앞',
    bible: '출애굽기 14:15–22',
    title: '뒤처진 사람들',
    day: '물길이 열리기 전',
    place: '백성의 뒤편',
    progress: { current: 11, total: 12 },
    copy: [
      '바람이 강해지고 물이 움직이기 시작합니다. 그러나 뒤편에서는 어린아이와 노인들이 사람들 사이에 밀립니다.',
      '길은 열리고 있지만 모두가 같은 속도로 걸을 수 있는 것은 아닙니다.',
      '지금 공동체는 빠른 탈출과 함께 건넘 사이에서 선택해야 합니다.'
    ],
    prompt: '당신은 뒤처진 사람들 앞에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'pace_together', icon: '🤝', text: '함께 속도를 맞춰 이동한다',
        effects: { community: 1, trust: 1 }, next: 'exodus_11_crossing',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤를 막겠습니다. 천천히 가더라도 함께 가는 길을 지켜야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '좋습니다. 해방의 길은 공동체를 버리는 길이 아닙니다.' }
        ]
      },
      {
        key: 'abandon_weak', icon: '✕', text: '몇 명은 버리고 먼저 가야 한다고 말한다',
        effects: { community: -2, scatter: 2 }, ending: 'bad_scattered_people',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '그 순간 공동체는 찢어집니다. 살아남아도 함께 건넌 백성은 아닐 것입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '해방을 위해 사람을 버린다면, 그 해방은 애굽의 방식과 무엇이 다르겠습니까.' }
        ]
      }
    ]
  },

  exodus_10c_discern_branch: {
    id: 'exodus_10c_discern_branch',
    chapter: '1장 · 출애굽',
    location: '홍해 앞',
    bible: '출애굽기 14:21–22',
    title: '흔들리는 물벽',
    day: '물길이 열린 밤',
    place: '바다의 입구',
    progress: { current: 11, total: 12 },
    copy: [
      '바람이 밤새도록 바다를 밀어냅니다. 물은 양옆으로 갈라지고 마른 땅이 드러납니다.',
      '그러나 물벽은 살아 있는 것처럼 흔들립니다. 백성은 열린 길을 보면서도 그 길을 두려워합니다.',
      '더 확실해질 때까지 기다릴 것인지, 열린 길이 닫히기 전에 들어갈 것인지 결정해야 합니다.'
    ],
    prompt: '당신은 흔들리는 물벽 앞에서 어떻게 하시겠습니까?',
    choices: [
      {
        key: 'lead_open_path', icon: '◎', text: '열린 길이 닫히기 전에 백성을 인도한다',
        effects: { discernment: 1, trust: 1 }, next: 'exodus_11_crossing',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '중앙 길이 가장 안정적입니다. 지금 움직이면 통과할 수 있습니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '분별은 기다림만이 아닙니다. 때를 알아보고 움직이는 것도 분별입니다.' }
        ]
      },
      {
        key: 'wait_too_long', icon: '✕', text: '확실해질 때까지 더 기다린다',
        effects: { delay: 2, fear: 1 }, ending: 'bad_closed_sea',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '너무 오래 머물고 있습니다. 열린 길은 무한히 기다려 주지 않습니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '확실함을 기다리다 순종의 때를 놓치는 밤도 있습니다.' }
        ]
      }
    ]
  },

  exodus_11_crossing: {
    id: 'exodus_11_crossing',
    chapter: '1장 · 출애굽',
    location: '홍해 도하',
    bible: '출애굽기 14:21–29',
    title: '바다 가운데 난 길',
    day: '바다 사이를 걷는 밤',
    place: '바다 한가운데',
    progress: { current: 12, total: 12 },
    copy: [
      '바다는 양옆으로 벽이 되고, 발 아래에는 마른 땅이 드러납니다. 백성은 불빛과 숨소리 사이를 지나갑니다.',
      '뒤에서는 애굽의 병거가 흔들리고, 앞에서는 아직 끝이 보이지 않는 길이 이어집니다.',
      '이 길의 마지막까지 무엇을 붙들고 걸을지가 당신의 증언이 됩니다.'
    ],
    prompt: '당신은 바다 가운데서 어떻게 걷겠습니까?',
    choices: [
      {
        key: 'cross_together', icon: '✦', text: '끝까지 공동체와 함께 건넌다',
        effects: { community: 1, trust: 1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '이 길은 함께 건널 때 비로소 백성의 길이 됩니다. 끝까지 서로를 놓지 맙시다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '바다 사이를 걷는 이 밤을 기록하겠습니다. 이것은 도망이 아니라 해방의 길입니다.' }
        ]
      },
      {
        key: 'save_self', icon: '⚠', text: '자신의 안전만 먼저 챙긴다',
        effects: { community: -1, scatter: 1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '혼자 앞서가면 뒤의 사람들은 더 크게 흔들립니다. 아직 함께 건너는 중입니다.' },
          { name: '미라', role: '기록자', portrait: 'p2', text: '자기 보존은 이해되지만, 해방의 기억은 공동체를 통해 남습니다.' }
        ]
      },
      {
        key: 'look_back', icon: '☾', text: '멈춰서 뒤를 본다',
        effects: { fear: 1, delay: 1 }, next: 'exodus_12_deliverance',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '뒤를 보는 순간 발이 느려집니다. 병거의 소리가 마음을 붙잡게 두지 마십시오.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '지금은 뒤가 아니라 앞의 길을 보아야 합니다.' }
        ]
      }
    ]
  },

  exodus_12_deliverance: {
    id: 'exodus_12_deliverance',
    chapter: '1장 · 출애굽',
    location: '해방의 새벽',
    bible: '출애굽기 14:30–31',
    title: '해방의 새벽',
    day: '바다가 닫힌 뒤',
    place: '홍해 건너편',
    progress: { current: 12, total: 12 },
    copy: [
      '새벽빛이 바다 위로 번집니다. 뒤쫓아오던 소리는 멈추고, 백성은 자신들이 건너온 길을 바라봅니다.',
      '벽돌의 땅에서 시작된 이야기는 바다 건너편에서 새로운 이름을 얻습니다.',
      '이제 남은 것은 당신이 이 밤을 어떻게 기억하고 증언할 것인가입니다.'
    ],
    prompt: '당신의 여정은 어떤 결말로 기록되겠습니까?',
    choices: [
      {
        key: 'finish_exodus', icon: '✦', text: '해방의 새벽을 기억한다',
        effects: { memory: 1 }, endingResolver: 'exodus',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '이제 기록은 끝이 아니라 시작입니다. 이 해방은 다음 세대에게 전해져야 합니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '우리는 바다를 건넜습니다. 그러나 앞으로도 이 밤을 잊지 않아야 합니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '살아남은 것만이 아니라 함께 건넌 것이 중요합니다.' }
        ]
      }
    ]
  }
};

window.START_NODE_ID = 'exodus_01_slave_day';
