(function applyJudgesEndingsPatch() {
  if (!window.STORY_ENDINGS) window.STORY_ENDINGS = {};

  Object.assign(window.STORY_ENDINGS, {
    true_judges_memory_kept: {
      id: 'true_judges_memory_kept',
      type: 'true',
      title: '기억을 지킨 증인',
      bannerLeft: '왕이 없는 시대가 흔들렸습니다',
      bannerRight: '그러나 당신은 구원의 기억을 다음 세대에 남겼습니다',
      grade: '기억을 지킨 증인',
      scripture: '그 후에 일어난 다른 세대는 여호와를 알지 못하며 여호와께서 이스라엘을 위하여 행하신 일도 알지 못하였더라',
      reference: '사사기 2:10',
      description: [
        '당신은 사사시대의 반복을 단순한 운명으로 받아들이지 않았습니다.',
        '압제와 부르짖음과 구원의 자리마다 하나님이 행하신 일을 기억으로 붙들었고, 다음 세대가 잊지 않도록 증언을 남겼습니다.',
        '왕이 없던 시대에도 기억은 공동체를 붙드는 작은 제단이 되었습니다.'
      ]
    },
    faithful_judges_cry_and_return: {
      id: 'faithful_judges_cry_and_return',
      type: 'good',
      title: '부르짖고 돌아온 자',
      bannerLeft: '당신은 흔들린 마을 안에 있었습니다',
      bannerRight: '그러나 압제 속에서 다시 여호와께 돌아섰습니다',
      grade: '돌아온 증인',
      scripture: '이스라엘 자손이 미디안으로 말미암아 여호와께 부르짖었으므로',
      reference: '사사기 6:7',
      description: [
        '당신의 선택은 늘 단단하지 않았고, 때로는 두려움과 현실의 압박에 흔들렸습니다.',
        '그러나 부르짖음을 침묵시키지 않았고, 책망을 완전히 밀어내지도 않았습니다.',
        '이 결말은 완전한 승리가 아니라 돌아섬의 증언입니다.'
      ]
    },
    wounded_judges_trembling_generation: {
      id: 'wounded_judges_trembling_generation',
      type: 'mixed',
      title: '떨리는 세대의 증인',
      bannerLeft: '구원은 보았습니다',
      bannerRight: '그러나 반복의 그늘도 깊게 남았습니다',
      grade: '상처 입은 세대의 증인',
      scripture: '사사가 죽은 후에는 그들이 돌이켜 그들의 조상들보다 더욱 타락하여',
      reference: '사사기 2:19',
      description: [
        '당신은 하나님이 약한 사람과 작은 도구로 구원하시는 장면을 보았습니다.',
        '그러나 공동체의 두려움과 타협은 쉽게 사라지지 않았고, 승리 이후의 마음도 온전히 지켜지지 않았습니다.',
        '이 결말은 실패가 아니라 미완의 경고입니다. 기억이 끊기면 반복은 다시 시작됩니다.'
      ]
    },
    bad_judges_baal_altar: {
      id: 'bad_judges_baal_altar',
      type: 'bad',
      title: '들판의 바알 제단',
      bannerLeft: '땅은 풍요를 약속하는 듯했습니다',
      bannerRight: '그러나 당신은 공동체를 다른 신 앞에 모았습니다',
      grade: '우상 제단을 세운 자',
      scripture: '이스라엘 자손이 여호와의 목전에 악을 행하여 바알들을 섬기며',
      reference: '사사기 2:11',
      description: [
        '당신은 생존과 풍요를 명분으로 바알의 제단 앞에 공동체를 모았습니다.',
        '그 선택은 단순한 풍습의 수용이 아니라, 여호와의 구원을 잊고 다른 신을 두려워하는 길이 되었습니다.',
        '기억을 잃은 예배는 곧 공동체의 방향을 잃게 만들었습니다.'
      ]
    },
    bad_judges_silenced_cry: {
      id: 'bad_judges_silenced_cry',
      type: 'bad',
      title: '막힌 부르짖음',
      bannerLeft: '압제는 깊어졌습니다',
      bannerRight: '그러나 당신은 돌아서려는 목소리를 막았습니다',
      grade: '부르짖음을 막은 자',
      scripture: '이스라엘 자손이 여호와께 부르짖었더라',
      reference: '사사기 6:6',
      description: [
        '당신은 하나님께 부르짖자는 사람들을 현실감 없는 자들로 몰아 침묵시켰습니다.',
        '압제 속의 부르짖음은 약함이 아니라 돌아섬의 시작이었지만, 당신은 그 길을 닫았습니다.',
        '공동체가 회개할 언어를 잃자 두려움은 더 깊은 굴이 되었습니다.'
      ]
    },
    bad_judges_fear_scattered: {
      id: 'bad_judges_fear_scattered',
      type: 'bad',
      title: '흩어진 대열',
      bannerLeft: '대열은 이미 작아졌습니다',
      bannerRight: '그러나 두려움은 남은 사람들마저 흩었습니다',
      grade: '공동체를 흩은 자',
      scripture: '누구든지 두려워 떠는 자는 길르앗 산을 떠나 돌아가라 하시니',
      reference: '사사기 7:3',
      description: [
        '당신은 두려움을 정직하게 고백하는 데서 멈추지 않고, 남은 사람들마저 흩어지게 했습니다.',
        '하나님은 많은 수가 아니라 신뢰를 통해 구원을 드러내려 하셨지만, 당신은 숫자의 불안을 공동체 전체에 퍼뜨렸습니다.',
        '흩어진 대열은 싸움보다 먼저 마음이 무너졌음을 보여 주었습니다.'
      ]
    },
    bad_judges_spoils_idol: {
      id: 'bad_judges_spoils_idol',
      type: 'bad',
      title: '금으로 만든 올무',
      bannerLeft: '승리는 주어졌습니다',
      bannerRight: '그러나 전리품은 기억이 아니라 올무가 되었습니다',
      grade: '승리를 우상화한 자',
      scripture: '기드온이 그것으로 에봇 하나를 만들어 자기의 성읍 오브라에 두었더니 온 이스라엘이 그것을 음란하게 위하므로',
      reference: '사사기 8:27',
      description: [
        '당신은 하나님이 하신 구원을 전리품과 상징물로 붙잡으려 했습니다.',
        '승리의 기념은 곧 우상적 올무가 되었고, 사람들은 하나님보다 금으로 만든 기억 앞에 모였습니다.',
        '두려움이 지나간 뒤 찾아온 탐욕은 사사시대의 반복을 다시 열었습니다.'
      ]
    },
    bad_judges_cycle_hardened: {
      id: 'bad_judges_cycle_hardened',
      type: 'bad',
      title: '반복을 받아들인 세대',
      bannerLeft: '구원은 여러 번 주어졌습니다',
      bannerRight: '그러나 당신은 반복을 회개가 아닌 질서로 받아들였습니다',
      grade: '반복에 굳어진 자',
      scripture: '그들이 속히 그들의 조상들이 행하던 길을 떠나서 여호와의 명령들을 순종하지 아니하며',
      reference: '사사기 2:17',
      description: [
        '당신은 우상과 압제와 부르짖음과 구원의 반복을 깨져야 할 비극으로 보지 않았습니다.',
        '그저 시대가 그렇다고 말하며 기억을 포기했고, 공동체의 상처를 익숙한 질서로 받아들였습니다.',
        '사사시대의 가장 깊은 실패는 넘어짐이 아니라, 넘어짐을 더 이상 슬퍼하지 않는 마음이었습니다.'
      ]
    }
  });
})();
