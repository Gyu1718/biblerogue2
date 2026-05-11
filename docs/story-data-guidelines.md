# BibleRogue2 Story Data Guidelines

이 문서는 `src/data/storyNodes.js`와 `src/data/endings.js`를 수정할 때 지켜야 할 기준이다.
런타임은 `src/main.js`가 담당하며, 스토리 PR에서는 원칙적으로 런타임 파일을 수정하지 않는다.

## 1. 수정 범위

### 허용

- `src/data/storyNodes.js`
- `src/data/endings.js`
- `assets/images/story/...`
- `assets/images/endings/...`

### 주의

- `src/main.js`
- `index.html`
- `src/post-cleanup.js`
- CSS 파일

위 파일은 구조나 기능을 바꾸는 파일이다. 스토리 문구 수정 PR에서는 건드리지 않는 것을 원칙으로 한다.

### 금지

- `navigation-fallback.js` 재생성
- `index.html`에 inline `onclick` 추가
- `post-cleanup.js`에 이벤트 처리 추가
- `main.js`에 임시 우회 로직 추가

## 2. 노드 작성 규칙

각 장면은 하나의 node이다.

```js
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
    '본문 문장 1',
    '본문 문장 2',
    '본문 문장 3'
  ],
  prompt: '당신은 어떻게 하시겠습니까?',
  choices: []
}
```

### 필수 필드

- `id`
- `chapter`
- `location`
- `bible`
- `title`
- `day`
- `place`
- `progress`
- `copy`
- `prompt`
- `choices`

`id`는 객체 key와 반드시 같아야 한다.

## 3. 선택지 작성 규칙

```js
{
  key: 'carry_neighbor',
  icon: '🤝',
  text: '지친 이웃의 짐을 함께 든다',
  effects: { community: 1 },
  next: 'exodus_02_whisper',
  companions: [
    { name: '엘리야벳', role: '인도자', portrait: 'p1', text: '대사' }
  ]
}
```

각 선택지는 반드시 다음 중 하나를 가져야 한다.

- `next`
- `ending`
- `endingResolver`

### 허용 상태값

- `trust` — 신뢰
- `fear` — 두려움
- `community` — 공동체
- `discernment` — 분별
- `memory` — 기억
- `time` — 시간
- `clues` — 단서
- `delay` — 지체
- `scatter` — 흩어짐

새 상태값을 임의로 만들지 않는다.

## 4. 동행자 대사 기준

### 엘리야벳 — 인도자

- 공동체의 방향
- 신앙적 해석
- 흔들리는 백성 세움

### 미라 — 기록자

- 기억
- 기록
- 사건의 의미
- 후대의 증언

### 요나단 — 보호자

- 약자 보호
- 질서 유지
- 두려움 확산 방지

### 아사르 — 탐색자

- 길 탐색
- 위험 감지
- 타이밍 판단
- 분별

## 5. 엔딩 작성 규칙

`choices`에서 `ending: 'bad_return_to_egypt'`를 사용하면 `src/data/endings.js`에 같은 id가 있어야 한다.

```js
bad_return_to_egypt: {
  id: 'bad_return_to_egypt',
  type: 'bad',
  title: '돌아선 발걸음',
  bannerLeft: '바다는 앞에 있었습니다',
  bannerRight: '그러나 마음은 다시 애굽을 향했습니다',
  grade: '돌아선 자',
  scripture: '애굽 사람을 섬기는 것이 광야에서 죽는 것보다 낫겠노라',
  reference: '출애굽기 14:12',
  description: [
    '설명 문장 1',
    '설명 문장 2'
  ]
}
```

허용 엔딩 타입은 다음이다.

- `true`
- `good`
- `mixed`
- `bad`

## 6. 이미지 매핑 규칙

현재 `main.js`는 다음 순서로 이미지를 찾는다.

### 플레이 장면

1. `node.image`
2. `node.id` 기준 매핑
3. `node.title` 기준 매핑
4. 기본 이미지

따라서 새 장을 추가할 때는 장기적으로 node에 `image`를 넣는 것이 가장 안정적이다.

```js
image: 'exodus_01_slave_labor.png'
```

### 엔딩 장면

1. `ending.image`
2. `ending.id` 기준 매핑
3. `ending.title` 기준 매핑
4. 기본 이미지

## 7. 검증 방법

스토리 데이터를 수정한 뒤 아래 명령을 실행한다.

```bash
node tools/validate-story.js
```

검증 대상은 다음이다.

- 필수 필드 누락
- `id`와 객체 key 불일치
- 끊긴 `next`
- 존재하지 않는 `ending`
- 허용되지 않은 상태값
- 잘못된 `endingResolver`
- 동행자 대사 필드 누락

## 8. PR 전 테스트 루트

최소한 아래를 확인한다.

1. 홈 → 1장 진입
2. 첫 장면 표시
3. 선택지 클릭
4. 동행자 대화 변경
5. 다음 이야기 이동
6. 배드엔딩 이동
7. 최종 엔딩 이동
8. 처음으로 복귀

## 9. 스토리 PR 원칙

스토리 PR은 작게 만든다.

좋은 PR:

- 1차 문구 개선
- 선택지 1–2개 추가
- 엔딩 설명 보강

나쁜 PR:

- 스토리 데이터, 런타임, CSS를 한 번에 수정
- 전체 `storyNodes.js` 덮어쓰기
- 파일 구조 우회 추가

작게 나누면 충돌이 줄고, 문제 발생 시 원인을 빠르게 찾을 수 있다.
