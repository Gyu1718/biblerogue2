(function applyExodusStructurePatch() {
  const nodes = window.STORY_NODES;
  if (!nodes) return;

  function hasChoice(node, key) {
    return Array.isArray(node?.choices) && node.choices.some((choice) => choice?.key === key);
  }

  function appendChoice(nodeId, choice) {
    const node = nodes[nodeId];
    if (!node || !Array.isArray(node.choices) || hasChoice(node, choice.key)) return;
    node.choices.push(choice);
  }

  appendChoice('exodus_10b_care_branch', {
    key: 'check_path_then_call',
    icon: '◎',
    text: '먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다',
    effects: { discernment: 1, delay: 1 },
    next: 'exodus_11_crossing',
    companions: [
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '길을 확인하는 것은 필요합니다. 그러나 확인이 길어지면 기다리는 사람들의 두려움도 커집니다.' },
      { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤처진 사람들을 붙들겠습니다. 너무 늦지 않게 신호를 보내야 합니다.' }
    ]
  });

  appendChoice('exodus_10c_discern_branch', {
    key: 'cross_in_pairs',
    icon: '🤝',
    text: '사람들을 둘씩 묶어 질서 있게 지나가게 한다',
    effects: { community: 1, discernment: 1 },
    next: 'exodus_11_crossing',
    companions: [
      { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 서로를 놓치지 않게 하면 공포가 번지는 속도도 늦출 수 있습니다.' },
      { name: '아사르', role: '탐색자', portrait: 'p4', text: '길은 좁고 물벽은 흔들립니다. 질서가 곧 속도입니다.' }
    ]
  });

  const deliverance = nodes.exodus_12_deliverance;
  if (deliverance && Array.isArray(deliverance.choices) && !hasChoice(deliverance, 'remember_for_children')) {
    deliverance.choices = [
      {
        key: 'remember_for_children',
        icon: '▤',
        text: '이 밤을 자녀들에게 전하겠다고 다짐한다',
        effects: { memory: 1 },
        endingResolver: 'exodus',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '기억은 살아남은 사람의 의무입니다. 이 밤은 우리만의 감격으로 끝나지 않을 것입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '자녀들이 묻게 될 때, 우리는 이 길이 어떻게 열렸는지 말해야 합니다.' }
        ]
      },
      {
        key: 'remain_in_relief',
        icon: '☾',
        text: '살아남았다는 안도감에만 머문다',
        effects: { fear: -1 },
        endingResolver: 'exodus',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '숨을 돌리는 것도 필요합니다. 다만 안도감만 남으면 이 길의 의미를 잊을 수 있습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '병거 소리는 멀어졌지만, 광야의 길은 이제 시작입니다.' }
        ]
      },
      {
        key: 'remember_names',
        icon: '🤝',
        text: '함께 건넌 이들의 이름을 기억한다',
        effects: { community: 1, memory: 1 },
        endingResolver: 'exodus',
        companions: [
          { name: '미라', role: '기록자', portrait: 'p2', text: '이름 없는 사람들의 이름을 잊지 않겠습니다. 해방은 숫자가 아니라 얼굴들의 이야기입니다.' },
          { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '함께 건넌 사람들을 기억하는 공동체는 다시 노예의 방식으로 돌아가지 않습니다.' }
        ]
      }
    ];
  }
})();
