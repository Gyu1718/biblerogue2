(function applySamuelEndingsPatch() {
  if (!window.STORY_ENDINGS) window.STORY_ENDINGS = {};

  Object.assign(window.STORY_ENDINGS, {
    true_samuel_listening_witness: {
      id: 'true_samuel_listening_witness',
      type: 'true',
      title: '듣는 시대의 증인',
      bannerLeft: '말씀이 희귀한 밤이 깊었습니다',
      bannerRight: '그러나 당신은 부르시는 음성 앞에 듣는 자리를 지켰습니다',
      grade: '듣는 시대의 참된 증인',
      scripture: '사무엘이 이르되 말씀하옵소서 주의 종이 듣겠나이다 하니',
      reference: '사무엘상 3:10',
      description: [
        '당신은 성소의 익숙함과 시대의 침묵 속에서도 하나님의 부르심을 가볍게 넘기지 않았습니다.',
        '한나의 통곡을 조롱하지 않았고, 작은 섬김을 기억했으며, 밤중에 들린 이름을 말씀 앞의 자리로 이끌었습니다.',
        '말씀이 희귀했던 시대에 당신의 증언은 듣는 귀가 다시 열렸음을 알리는 기록이 되었습니다.'
      ]
    },
    faithful_samuel_lamp_keeper: {
      id: 'faithful_samuel_lamp_keeper',
      type: 'good',
      title: '꺼지기 전 등불을 지킨 자',
      bannerLeft: '성소의 등불은 희미했습니다',
      bannerRight: '그러나 작은 섬김은 완전히 사라지지 않았습니다',
      grade: '등불 곁의 증인',
      scripture: '하나님의 등불은 아직 꺼지지 아니하였으며 사무엘은 하나님의 궤 있는 여호와의 전 안에 누웠더니',
      reference: '사무엘상 3:3',
      description: [
        '당신은 완전한 분별로 모든 순간을 지나지는 못했지만, 성소의 희미한 등불 곁에서 깨어 있으려 했습니다.',
        '어린 사무엘의 작은 세마포 에봇과 반복되는 섬김을 가볍게 여기지 않았고, 공동체가 다시 말씀을 기다릴 수 있도록 도왔습니다.',
        '이 결말은 조용한 신실함의 기록입니다.'
      ]
    },
    wounded_samuel_trembling_word: {
      id: 'wounded_samuel_trembling_word',
      type: 'mixed',
      title: '떨며 말씀을 들은 증인',
      bannerLeft: '처음 들은 말씀은 위로만이 아니었습니다',
      bannerRight: '심판의 무게 앞에서 당신은 떨며 침묵을 견뎠습니다',
      grade: '떨리는 말씀의 증인',
      scripture: '사무엘이 그 이상을 엘리에게 알게 하기를 두려워하더니',
      reference: '사무엘상 3:15',
      description: [
        '당신은 부르심을 알아보았지만, 그 말씀이 가진 무게 앞에서 오래 떨었습니다.',
        '엘리 집을 향한 두려운 심판의 말씀은 쉽게 전할 수 없는 말이었고, 당신의 마음에도 상처를 남겼습니다.',
        '그러나 끝내 말씀을 없던 일로 만들지는 않았습니다. 이 결말은 두려움 속의 순종입니다.'
      ]
    },
    bad_samuel_mocked_prayer: {
      id: 'bad_samuel_mocked_prayer',
      type: 'bad',
      title: '조롱당한 통곡',
      bannerLeft: '한 여인이 마음을 쏟아 기도했습니다',
      bannerRight: '그러나 당신은 그 통곡을 수치로 만들었습니다',
      grade: '기도를 조롱한 자',
      scripture: '한나가 마음이 괴로워서 여호와께 기도하고 통곡하며',
      reference: '사무엘상 1:10',
      description: [
        '당신은 한나의 깊은 고통을 보면서도 그 기도를 방해와 수치로 취급했습니다.',
        '성소는 상한 마음이 하나님 앞에 서는 자리가 되어야 했지만, 당신의 말은 그 자리를 닫았습니다.',
        '통곡의 기도를 조롱한 선택은 부르심의 시작을 보지 못하게 만들었습니다.'
      ]
    },
    bad_samuel_stolen_offering: {
      id: 'bad_samuel_stolen_offering',
      type: 'bad',
      title: '빼앗긴 제물',
      bannerLeft: '성소는 거룩한 자리였습니다',
      bannerRight: '그러나 당신은 제물을 자기 몫처럼 취급했습니다',
      grade: '제사를 멸시한 자',
      scripture: '이 소년들의 죄가 여호와 앞에 심히 큼은 그들이 여호와의 제사를 멸시함이었더라',
      reference: '사무엘상 2:17',
      description: [
        '당신은 성소 가까이에 있었지만, 거룩함을 익숙한 이익으로 바꾸었습니다.',
        '제물은 하나님께 드리는 예배의 자리였으나, 당신의 손에서는 탐욕의 몫이 되었습니다.',
        '성소의 타락은 공동체가 말씀을 듣지 못하는 밤을 더 깊게 만들었습니다.'
      ]
    },
    bad_samuel_silenced_call: {
      id: 'bad_samuel_silenced_call',
      type: 'bad',
      title: '막힌 부르심',
      bannerLeft: '밤중에 이름을 부르는 음성이 있었습니다',
      bannerRight: '그러나 당신은 듣는 자리를 닫고 다시 잠들게 했습니다',
      grade: '부르심을 막은 자',
      scripture: '여호와께서 사무엘을 부르시는지라 그가 대답하되 내가 여기 있나이다 하고',
      reference: '사무엘상 3:4',
      description: [
        '당신은 반복되는 부르심을 소란과 착각으로만 취급했습니다.',
        '어린 사무엘은 아직 그 음성을 분별하지 못했지만, 당신은 그가 들을 수 있는 자리로 나아가도록 돕지 않았습니다.',
        '말씀이 희귀한 시대에 부르심을 막은 선택은 밤을 더 깊게 만들었습니다.'
      ]
    },
    bad_samuel_hidden_word: {
      id: 'bad_samuel_hidden_word',
      type: 'bad',
      title: '숨겨진 말씀',
      bannerLeft: '두려운 말씀이 주어졌습니다',
      bannerRight: '그러나 당신은 그 무게를 피하려 침묵을 택했습니다',
      grade: '말씀을 숨긴 자',
      scripture: '그가 그 말씀을 하나도 숨기지 아니하니',
      reference: '사무엘상 3:18',
      description: [
        '당신은 엘리의 마음을 상하게 하지 않으려 한다는 이유로 말씀을 감추려 했습니다.',
        '그러나 신실한 증언은 듣기 편한 말만 남기는 일이 아닙니다.',
        '두려운 말씀을 숨긴 선택은 새 시대의 증언을 침묵으로 바꾸었습니다.'
      ]
    }
  });
})();
