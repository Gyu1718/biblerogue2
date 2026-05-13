(function applyJerichoEndingsPatch() {
  if (!window.STORY_ENDINGS) window.STORY_ENDINGS = {};

  Object.assign(window.STORY_ENDINGS, {
    true_jericho_faithful_witness: {
      id: 'true_jericho_faithful_witness',
      type: 'true',
      title: '성벽보다 크신 말씀',
      bannerLeft: '당신은 닫힌 성 앞에서 기다렸습니다',
      bannerRight: '침묵과 외침 사이에서 말씀의 때를 증언했습니다',
      grade: '여리고의 참된 증인',
      scripture: '이에 백성은 외치고 제사장들은 나팔을 불매 백성이 나팔 소리를 들을 때에 크게 소리 질러 외치니 성벽이 무너져 내린지라',
      reference: '여호수아 6:20',
      description: [
        '당신은 성벽의 크기보다 말씀의 때를 더 크게 보았습니다.',
        '기다림의 침묵과 명령의 외침을 혼동하지 않았고, 성벽이 무너진 뒤에도 승리의 주인이 하나님이심을 고백했습니다.',
        '여리고의 무너짐은 당신의 용맹이 아니라 하나님의 신실하심을 증언하는 기록으로 남았습니다.'
      ]
    },
    faithful_jericho_memory_keeper: {
      id: 'faithful_jericho_memory_keeper',
      type: 'good',
      title: '붉은 줄을 기억한 사람',
      bannerLeft: '성벽은 무너졌습니다',
      bannerRight: '그러나 약속의 표지는 잊히지 않았습니다',
      grade: '약속을 지킨 기억자',
      scripture: '여호수아가 기생 라합과 그의 아버지의 가족과 그에게 속한 모든 것을 살렸으므로',
      reference: '여호수아 6:25',
      description: [
        '당신은 승리의 함성 속에서도 붉은 줄의 약속을 잊지 않았습니다.',
        '라합의 집은 성 안의 작은 표지였지만, 그 표지를 기억하는 일은 공동체가 하나님의 구원을 어떻게 이해하는지를 드러냈습니다.',
        '완전한 확신으로만 걷지는 못했어도, 당신의 증언은 생명을 기억하는 신실한 기록이 되었습니다.'
      ]
    },
    wounded_jericho_trembling_witness: {
      id: 'wounded_jericho_trembling_witness',
      type: 'mixed',
      title: '떨며 따라간 증인',
      bannerLeft: '당신은 성벽 앞에서 흔들렸습니다',
      bannerRight: '그러나 완전히 돌아서지는 않았습니다',
      grade: '떨리는 여리고 증인',
      scripture: '여호와께서 여호수아와 함께 하시니 여호수아의 소문이 그 온 땅에 퍼지니라',
      reference: '여호수아 6:27',
      description: [
        '당신은 성벽 앞에서 자주 두려워했고, 반복되는 침묵의 행진 속에서 마음이 쉽게 지쳤습니다.',
        '그러나 마지막 순간에 완전히 돌아서지는 않았고, 무너진 성 뒤에서 하나님이 하신 일을 외면하지 않았습니다.',
        '이 결말은 실패가 아니라 미완의 증언입니다. 다음 길에서 당신은 승리 이후의 마음을 더 깊이 살펴야 합니다.'
      ]
    },
    bad_jericho_forgot_red_cord: {
      id: 'bad_jericho_forgot_red_cord',
      type: 'bad',
      title: '잊힌 붉은 줄',
      bannerLeft: '성벽은 무너졌습니다',
      bannerRight: '그러나 약속의 표지를 가볍게 여겼습니다',
      grade: '생명의 표지를 잊은 자',
      scripture: '너희는 그 붉은 줄을 매고 너와 네 부모와 형제와 네 아버지의 가족을 다 네 집에 모으라',
      reference: '여호수아 2:18',
      description: [
        '당신은 전쟁의 날에 붉은 줄의 약속을 불필요한 일로 여겼습니다.',
        '성벽 전체가 무너지는 날에도 하나님이 기억하신 집이 있었지만, 당신은 그 생명의 표지를 지우려 했습니다.',
        '승리를 말하면서도 약속을 잊은 선택은 여리고의 증언을 왜곡했습니다.'
      ]
    },
    bad_jericho_broken_silence: {
      id: 'bad_jericho_broken_silence',
      type: 'bad',
      title: '먼저 터진 함성',
      bannerLeft: '침묵의 때가 있었습니다',
      bannerRight: '그러나 조급함이 말씀의 때를 앞질렀습니다',
      grade: '때를 앞지른 자',
      scripture: '너희는 외치지 말며 너희 음성을 들리게 하지 말며 너희 입에서 아무 말도 내지 말라',
      reference: '여호수아 6:10',
      description: [
        '당신은 외침의 순간을 기다리지 못하고 먼저 소리치자고 사람들을 흔들었습니다.',
        '여리고의 순종은 용기만이 아니라 때를 지키는 침묵을 요구했습니다.',
        '말씀보다 앞선 열심은 공동체의 대열을 흐트러뜨리고, 기다림의 증언을 깨뜨렸습니다.'
      ]
    },
    bad_jericho_silent_retreat: {
      id: 'bad_jericho_silent_retreat',
      type: 'bad',
      title: '외침 앞에서 물러난 사람',
      bannerLeft: '기다림은 끝났습니다',
      bannerRight: '그러나 당신은 순종의 순간에 뒤로 물러났습니다',
      grade: '외침을 거절한 자',
      scripture: '외치라 여호와께서 너희에게 이 성을 주셨느니라',
      reference: '여호수아 6:16',
      description: [
        '당신은 침묵해야 할 때에는 흔들렸고, 외쳐야 할 때에는 물러났습니다.',
        '성벽은 아직 눈앞에 있었지만 명령은 이미 주어졌습니다. 그 순간 두려움은 당신의 입을 닫고 발을 뒤로 돌려놓았습니다.',
        '열린 순종의 순간을 거절한 선택은 여리고의 증언에서 당신을 멀어지게 했습니다.'
      ]
    },
    bad_jericho_devoted_things: {
      id: 'bad_jericho_devoted_things',
      type: 'bad',
      title: '무너진 성의 전리품',
      bannerLeft: '성벽은 무너졌습니다',
      bannerRight: '그러나 마음은 전리품 앞에서 무너졌습니다',
      grade: '바쳐진 것을 탐한 자',
      scripture: '너희는 온전히 바치고 그 바친 것 중에서 어떤 것이든지 취하지 말라',
      reference: '여호수아 6:18',
      description: [
        '당신은 성벽이 무너진 뒤 하나님께 바쳐진 것을 자신의 몫으로 삼으려 했습니다.',
        '두려움은 지나갔지만 탐욕이 찾아왔고, 승리의 순간은 또 다른 불순종의 문이 되었습니다.',
        '여리고의 무너짐을 자신의 획득으로 바꾸려 한 선택은 다음 길에 깊은 균열을 남겼습니다.'
      ]
    }
  });
})();
