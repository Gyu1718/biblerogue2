(function applyRuthEndingsPatch() {
  if (!window.STORY_ENDINGS) window.STORY_ENDINGS = {};

  Object.assign(window.STORY_ENDINGS, {
    true_ruth_hesed_witness: {
      id: 'true_ruth_hesed_witness',
      type: 'true',
      title: '헤세드를 증언한 사람',
      bannerLeft: '사사시대의 그늘 속에서도 작은 신실함은 꺼지지 않았습니다',
      bannerRight: '빈손의 귀향은 다윗의 계보로 이어지는 은혜가 되었습니다',
      grade: '헤세드의 참된 증인',
      scripture: '보아스가 룻을 맞이하여 아내로 삼고 그에게 들어갔더니 여호와께서 그에게 임신하게 하시므로 그가 아들을 낳은지라',
      reference: '룻기 4:13',
      description: [
        '당신은 룻의 신실함과 보아스의 책임 있는 기업 무름 속에서 하나님이 조용히 일하시는 방식을 보았습니다.',
        '전쟁도 기적의 불도 없었지만, 밭의 이삭과 성문의 증언과 한 아이의 이름 안에서 은혜는 깊게 이어졌습니다.',
        '사사시대의 어둠 속에서도 헤세드는 다윗의 계보를 향해 길을 열었습니다.'
      ]
    },
    faithful_ruth_bethlehem_witness: {
      id: 'faithful_ruth_bethlehem_witness',
      type: 'good',
      title: '베들레헴의 회복을 본 자',
      bannerLeft: '나오미는 빈손으로 돌아왔습니다',
      bannerRight: '그러나 공동체 안에서 다시 품을 이름을 얻었습니다',
      grade: '회복을 본 증인',
      scripture: '나오미가 아기를 받아 품에 품고 그의 양육자가 되니',
      reference: '룻기 4:16',
      description: [
        '당신은 나오미의 쓴 고백을 가볍게 덮지 않았고, 베들레헴으로 돌아온 이를 공동체 안에서 맞이했습니다.',
        '룻의 노동과 보아스의 보호, 성문의 증언을 통해 빈손의 이름이 다시 채워지는 것을 보았습니다.',
        '이 결말은 조용하지만 신실한 회복의 기록입니다.'
      ]
    },
    wounded_ruth_empty_to_full: {
      id: 'wounded_ruth_empty_to_full',
      type: 'mixed',
      title: '빈손에서 회복을 본 증인',
      bannerLeft: '상실은 쉽게 사라지지 않았습니다',
      bannerRight: '그러나 빈손 위에 작은 은혜가 놓였습니다',
      grade: '상처 입은 회복의 증인',
      scripture: '내가 풍족하게 나갔더니 여호와께서 내게 비어 돌아오게 하셨느니라',
      reference: '룻기 1:21',
      description: [
        '당신은 상실의 무게를 보았고, 빈손으로 돌아온 사람의 수치를 쉽게 지우지 못했습니다.',
        '그러나 이삭을 줍는 낮은 자리와 기업 무름의 책임 속에서 회복의 시작을 목격했습니다.',
        '상처는 남았지만, 하나님은 작은 신실함을 통해 닫힌 계보를 다시 여셨습니다.'
      ]
    },
    bad_ruth_left_widows: {
      id: 'bad_ruth_left_widows',
      type: 'bad',
      title: '길 위에 버려진 과부들',
      bannerLeft: '상실한 사람들이 돌아오고 있었습니다',
      bannerRight: '그러나 당신은 그들을 공동체 밖으로 밀어냈습니다',
      grade: '빈손을 외면한 자',
      scripture: '온 성읍이 그들로 말미암아 떠들며 이르기를 이이가 나오미냐 하는지라',
      reference: '룻기 1:19',
      description: [
        '당신은 남겨진 나오미와 룻의 슬픔을 짐으로만 보았습니다.',
        '돌아온 이를 맞아야 할 공동체의 문은 차갑게 닫혔고, 빈손의 귀향은 더 깊은 수치가 되었습니다.',
        '헤세드가 시작될 수 있었던 길은 외면과 배제로 막혔습니다.'
      ]
    },
    bad_ruth_field_exploitation: {
      id: 'bad_ruth_field_exploitation',
      type: 'bad',
      title: '빼앗긴 이삭',
      bannerLeft: '밭에는 약자를 위한 이삭이 남아 있었습니다',
      bannerRight: '그러나 당신은 그 작은 길마저 빼앗았습니다',
      grade: '약자의 밭을 짓밟은 자',
      scripture: '그가 이르되 청하건대 나로 베는 자를 따라 단 사이에서 이삭을 줍게 하소서 하였고',
      reference: '룻기 2:7',
      description: [
        '당신은 이삭 줍는 사람의 낮은 자리를 방해와 손해로만 보았습니다.',
        '율법이 남겨 둔 약자의 길은 조롱과 착취로 좁아졌고, 밭은 은혜의 자리가 아니라 배제의 자리가 되었습니다.',
        '보아스의 밭에서 배워야 할 헤세드는 당신의 손에서 사라졌습니다.'
      ]
    },
    bad_ruth_redeemer_refused: {
      id: 'bad_ruth_redeemer_refused',
      type: 'bad',
      title: '거절된 기업 무름',
      bannerLeft: '성문에서 이름을 보존할 길이 열렸습니다',
      bannerRight: '그러나 당신은 책임의 길을 조롱했습니다',
      grade: '이름을 끊은 자',
      scripture: '죽은 자의 이름을 그의 기업 위에 세워 이스라엘 중에서 그 이름이 끊어지지 아니하게 하려 함이니',
      reference: '룻기 4:10',
      description: [
        '당신은 기업 무름을 오래된 관습으로 조롱하며 약자의 이름이 보존될 길을 막았습니다.',
        '성문은 공의와 책임의 자리가 될 수 있었지만, 당신의 선택은 그 문을 계산과 회피의 자리로 만들었습니다.',
        '이름을 살리는 은혜는 책임을 거부한 말 앞에서 닫혔습니다.'
      ]
    },
    bad_ruth_closed_gate: {
      id: 'bad_ruth_closed_gate',
      type: 'bad',
      title: '닫힌 성문',
      bannerLeft: '성문은 증언의 자리가 되어야 했습니다',
      bannerRight: '그러나 당신은 이방 여인과 약자의 권리를 막았습니다',
      grade: '회복의 문을 닫은 자',
      scripture: '오늘 너희가 증인이 되었느니라 하니 성문에 있는 모든 백성과 장로들이 이르되 우리가 증인이 되노니',
      reference: '룻기 4:9–11',
      description: [
        '당신은 룻의 이름을 끝까지 외부인의 이름으로만 남기려 했습니다.',
        '성문에 선 증인들은 회복을 선포해야 했지만, 당신의 말은 소문과 배제로 그 문을 닫았습니다.',
        '다윗의 계보로 이어질 작은 길은 닫힌 성문 앞에서 어두워졌습니다.'
      ]
    }
  });
})();
