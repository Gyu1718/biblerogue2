# BibleRogue2 챕터 구현 프로토콜

이 문서는 새 챕터를 설계하고 실제 게임에 추가할 때 따라야 하는 공식 절차이다.

---

## 1. 새 챕터 구현 단계

새 챕터는 반드시 아래 순서로 진행한다.

1. 스토리 설계
2. story data 구현
3. 엔딩 추가
4. 이미지 목록 확정
5. 이미지 제작 및 업로드
6. `chapter-runtime.js` 챕터 등록
7. 홈 카드 상태 변경
8. validator 실행
9. 브라우저 QA
10. 총괄 완료 판정

이 순서를 건너뛰면 이미지 누락, 시작 노드 오류, 엔딩 이미지 오류, 경로 불일치가 발생할 수 있다.

---

## 2. 스토리 설계 기준

각 챕터는 다음 항목을 먼저 확정한다.

```text
챕터명:
성경 범위:
한 줄 주제:
플레이어 위치:
핵심 사건:
핵심 선택축:
즉시 배드엔딩 후보:
최종 엔딩 후보:
필요 이미지:
```

플레이어 위치는 항상 다음 원칙을 따른다.

```text
플레이어는 성경의 직접 주인공이 아니다.
플레이어는 사건을 목격하고 공동체 안에서 반응하는 이름 없는 증인이다.
```

---

## 3. Story Data 구조 원칙

기존 런타임 안정성을 위해 `window.STORY_NODES` 전역 진입점은 유지한다.

다만 장기적으로 챕터 수와 노드 수가 증가하므로, 모든 스토리 노드를 `src/data/storyNodes.js` 한 파일에 계속 누적하지 않는다.

권장 구조는 다음과 같다.

```text
src/data/stories/
  exodus.js
  wilderness.js
  jericho.js
  judges.js
  ruth.js
  samuelCall.js

src/data/storyNodes.js
```

각 챕터 파일은 해당 챕터의 노드만 정의한다.

예시:

```js
window.EXODUS_STORY_NODES = {
  // exodus nodes
};
```

`storyNodes.js`는 실제 스토리 본문을 길게 담는 파일이 아니라, 챕터별 노드를 병합하는 통합 진입점으로 사용한다.

예시:

```js
window.STORY_NODES = {
  ...window.EXODUS_STORY_NODES,
  ...window.WILDERNESS_STORY_NODES,
  ...window.JERICHO_STORY_NODES,
};
```

작업 원칙:

1. 새 챕터는 가능하면 챕터별 파일로 분리한다.
2. 기존 챕터는 무리하게 한 번에 리팩터링하지 않는다.
3. 기존 `main.js`, 플레이 UI, 엔딩 UI가 `window.STORY_NODES`를 참조하는 구조는 유지한다.
4. 분리 작업 시 `index.html`의 데이터 파일 로드 순서를 반드시 확인한다.
5. 통합 후 기존 챕터가 깨지지 않았는지 브라우저 QA 또는 실제 구동 확인을 해야 한다.
6. 검증하지 못했다면 완료로 보고하지 않는다.

---

## 4. Node ID 규칙

새 챕터는 고유 prefix를 사용한다.

예시:

```text
exodus_01_slave_day
wilderness_01_marah_thirst
jericho_01_jordan_edge
```

규칙:

1. 모든 노드는 `{chapterPrefix}_{number}_{short_slug}` 형식으로 작성한다.
2. 번호는 두 자리 숫자를 권장한다.
3. node ID와 이미지 파일명은 가능한 한 일치시킨다.
4. 이미지 파일명은 기본적으로 `{node.id}.png`로 한다.
5. 불가피하게 다르면 node 객체에 `image` 필드를 명시한다.

---

## 5. Progress 규칙

각 챕터 patch 파일에는 총 진행 수를 명시한다.

```js
const TOTAL_PROGRESS = 18;
```

각 노드는 다음 구조를 가진다.

```js
progress: { current, total: TOTAL_PROGRESS }
```

확장 중 노드 수가 변경되면 반드시 `TOTAL_PROGRESS`와 문서 체크리스트를 함께 갱신한다.

---

## 6. Choice 구조

각 노드는 보통 2–3개 선택지를 가진다. 현재 권장값은 3개이다.

선택지는 다음 중 하나를 가진다.

```js
{ next: '다음_노드_ID' }
{ ending: '엔딩_ID' }
```

주의:

- `next` target은 반드시 존재해야 한다.
- `ending` target은 반드시 `src/data/endings.js`에 존재해야 한다.
- endingResolver를 추가하려면 validator와 runtime 지원 여부를 먼저 확인한다.
- 새 챕터에서는 직접 ending 연결이 가장 안전하다.

---

## 7. Hidden Risk Effects 규칙

현재 기본 effects key는 다음을 우선 사용한다.

```text
trust
fear
community
discernment
memory
time
clues
delay
scatter
```

새 key를 추가하려면 다음을 모두 확인한다.

1. `main.js`의 `gameState` 초기값.
2. 저장 payload.
3. validator의 허용 key.
4. UI 표시 필요 여부.
5. 엔딩 조건에서 사용할지 여부.

이 확인 없이 `idolatry`, `covenant` 같은 새 key를 바로 넣지 않는다.

---

## 8. 즉시 배드엔딩 기준

즉시 배드엔딩은 남발하지 않는다. 아래 경우에만 사용한다.

1. 생명 조건 또는 구원 표지를 정면 거부.
2. 명백한 우상 숭배 주도.
3. 공동체를 폭력이나 붕괴로 몰아감.
4. 열린 길 앞에서 최종적으로 거부.
5. 성경 본문상 돌이킬 수 없는 불순종의 성격이 강함.

불안, 두려움, 망설임, 슬픔은 보통 hidden risk 누적으로 처리한다.

---

## 9. 엔딩 작성 규칙

각 챕터는 보통 다음 엔딩 구조를 가진다.

```text
true 엔딩 1개
good 엔딩 1개
mixed 엔딩 1개
bad 엔딩 여러 개
```

엔딩 객체는 다음 요소를 가진다.

```js
id
type
title
bannerLeft
bannerRight
grade
scripture
reference
description
image 선택 가능
```

주의:

- 새 엔딩 ID는 고유해야 한다.
- 이미지 파일명과 엔딩 ID는 가능한 일치시킨다.
- 엔딩 이미지가 다른 이름이면 `image` 필드를 추가한다.

---

## 10. 이미지 제작 규칙

플레이 이미지 경로:

```text
assets/images/story/{chapterKey}/play_left_520x650/
```

엔딩 이미지 경로:

```text
assets/images/story/{chapterKey}/original_16x9/
```

기본 파일명:

```text
{node.id}.png
{ending.id}.png
```

불일치가 있으면 story data에 `image` 필드를 사용한다.

---

## 11. chapter-runtime 등록 규칙

새 챕터가 실제 플레이 가능해질 때 `src/chapter-runtime.js`의 `CHAPTERS`에 등록한다.

예시:

```js
jericho: {
  startNodeId: 'jericho_01_jordan_edge',
  nodePrefix: 'jericho_',
  playArtBase: 'assets/images/story/jericho/play_left_520x650',
  endingArtBase: 'assets/images/story/jericho/original_16x9'
}
```

엔딩 이미지 자동 연결을 위해 필요한 경우 해당 챕터의 ending ID set도 추가한다.

단, 장기적으로는 `chapter-runtime.js`가 prefix 기반으로 모든 챕터 엔딩 이미지를 자동 판별하도록 개선하는 것이 바람직하다.

---

## 12. 홈 카드 연결 규칙

플레이 가능한 챕터 카드에는 다음을 넣는다.

```html
data-go="new-play"
data-start-node="해당_시작_노드_ID"
data-chapter="chapterKey"
```

아직 플레이 불가능한 챕터 카드에는 `data-go="new-play"`를 넣지 않는다.

준비 중 카드에는 다음을 사용한다.

```html
data-panel="chapter-coming-soon"
```

---

## 13. 검증 규칙

작업 완료 전 반드시 실행한다.

```bash
node tools/validate-story.js
```

통과 기준:

```text
error 0개
```

브라우저 QA 기준:

1. 홈에서 챕터 진입.
2. 첫 노드 정상 출력.
3. 모든 선택지 진행.
4. 주요 배드엔딩 진입.
5. true/good/mixed 엔딩 진입.
6. 이미지 404 없음.
7. 콘솔 오류 없음.

---

## 14. 새 챕터 착수 전 체크리스트

새 챕터를 시작하기 전 총괄은 다음을 확인한다.

```text
이전 챕터 QA 완료 여부:
스토리 설계 문서 존재 여부:
노드 prefix 확정 여부:
시작 노드 ID 확정 여부:
엔딩 ID 목록 확정 여부:
이미지 파일명 규칙 확정 여부:
수정 가능 파일 지정 여부:
수정 금지 파일 지정 여부:
```

이 체크리스트가 비어 있으면 구현을 시작하지 않는다.
