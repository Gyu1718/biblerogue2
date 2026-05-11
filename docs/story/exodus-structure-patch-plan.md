# 1장 출애굽 2차 구조 패치 계획

이 문서는 `src/data/storyNodes.js`의 1장 「출애굽」 구조 패치를 위한 기준 문서이다.
현재 저장소 구조상 `storyNodes.js` 전체 덮어쓰기는 위험하므로, 이 문서는 검색/삽입/교체 기준으로 적용한다.

## 적용 원칙

수정 대상:

- `src/data/storyNodes.js`

수정 금지:

- `src/main.js`
- `index.html`
- `src/post-cleanup.js`
- CSS 파일
- `navigation-fallback.js`

적용 순서:

1. 1차 문자열 패치가 실제 반영되었는지 확인한다.
2. `node tools/validate-story.js`를 실행한다.
3. 아래 구조 패치를 하나씩 적용한다.
4. 각 패치 후 홈 → 1장 → 해당 노드까지 실제 이동을 확인한다.
5. 마지막에 다시 `node tools/validate-story.js`를 실행한다.

---

## 패치 1. `exodus_10b_care_branch` 선택지 추가

목표:

- 뒤처진 사람들을 돌보는 선택지가 단순 정답/오답이 되지 않도록 한다.
- 분별은 있지만 지체가 생기는 선택지를 추가한다.

삽입 위치:

- `exodus_10b_care_branch` 노드 내부의 `choices: [` 배열 안
- 기존 마지막 선택지 뒤에 쉼표를 확인한 후 아래 블록을 추가한다.

추가 블록:

```js
      {
        key: 'check_path_then_call',
        icon: '◎',
        text: '먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다',
        effects: { discernment: 1, delay: 1 },
        next: 'exodus_11_crossing',
        companions: [
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '길을 확인하는 것은 필요합니다. 그러나 확인이 길어지면 기다리는 사람들의 두려움도 커집니다.' },
          { name: '요나단', role: '보호자', portrait: 'p3', text: '제가 뒤처진 사람들을 붙들겠습니다. 너무 늦지 않게 신호를 보내야 합니다.' }
        ]
      }
```

주의:

- 기존 마지막 선택지 뒤에 넣을 때는 기존 마지막 선택지 끝에 쉼표가 필요하다.
- 추가 블록이 배열의 마지막이면 블록 끝에는 쉼표를 붙이지 않아도 된다.

---

## 패치 2. `exodus_10c_discern_branch` 선택지 추가

목표:

- 물벽 사이를 지나는 장면에서 공동체성과 질서의 선택지를 강화한다.
- 단순히 앞으로 가기보다, 함께 지나가는 방식의 게임성을 추가한다.

삽입 위치:

- `exodus_10c_discern_branch` 노드 내부의 `choices: [` 배열 안
- 기존 마지막 선택지 뒤에 쉼표를 확인한 후 아래 블록을 추가한다.

추가 블록:

```js
      {
        key: 'cross_in_pairs',
        icon: '🤝',
        text: '사람들을 둘씩 묶어 질서 있게 지나가게 한다',
        effects: { community: 1, discernment: 1 },
        next: 'exodus_11_crossing',
        companions: [
          { name: '요나단', role: '보호자', portrait: 'p3', text: '좋습니다. 서로를 놓치지 않게 하면 공포가 번지는 속도도 늦출 수 있습니다.' },
          { name: '아사르', role: '탐색자', portrait: 'p4', text: '길은 좁고 물벽은 흔들립니다. 질서가 곧 속도입니다.' }
        ]
      }
```

---

## 패치 3. `exodus_12_deliverance` 마지막 선택지 확장

목표:

- 마지막 장면이 단일 선택지로 끝나지 않게 한다.
- 해방 이후의 반응을 세 방향으로 나눈다.
- `endingResolver: 'exodus'`는 유지한다.

교체 위치:

- `exodus_12_deliverance` 노드 내부의 `choices: [` 전체 블록
- 기존 `choices` 배열 전체를 아래 블록으로 교체한다.

교체 블록:

```js
    choices: [
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
    ]
```

---

## 검수 루트

### 루트 A. 공동체/기억 루트

```text
끝나지 않는 벽돌
→ 지친 이웃의 짐을 함께 든다
→ 소문을 귀담아듣고 희망을 품는다
→ 백성들을 모아 흔들리지 말자고 말한다
→ 이 일이 우연이 아니라고 기록해 둔다
→ 우리를 구별하시는 하나님을 기억하자고 말한다
→ 가족과 함께 조용히 준비한다
→ 말씀대로 문설주에 피를 바르고 가족을 준비시킨다
→ 뒤처진 사람들을 살핀다
→ 사람들을 둘씩 묶어 질서 있게 지나가게 한다
→ 함께 건넌 이들의 이름을 기억한다
```

예상 결과:

- 공동체, 기억, 신뢰가 높아진다.
- `endingResolver: 'exodus'`가 트루/굿 계열 엔딩으로 이어진다.

### 루트 B. 지체/두려움 루트

```text
유월절의 밤 이후
→ 굳이 이렇게까지 해야 하느냐며 망설인다
→ 길을 확인한다며 지체한다
→ 병거 소리에 붙잡혀 걸음을 멈춘다
```

예상 결과:

- 지체와 두려움 수치가 상승한다.
- 최종적으로 `wounded_exodus_witness` 계열로 흐를 수 있다.

---

## 적용 후 필수 명령

```bash
node tools/validate-story.js
```

오류가 없어야 한다. 경고는 의도된 단일 선택지나 아직 도달하지 않는 미래 장 엔딩에서 나올 수 있으나, 1장 출애굽 노드의 `next`/`ending` 오류는 없어야 한다.
