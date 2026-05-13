# BibleRogue2 공식 프로젝트 상태 문서

이 문서는 BibleRogue2의 현재 개발 상태를 새 채팅, 새 작업자, 새 패치 담당자가 동일한 기준으로 이어받기 위한 공식 상태 문서이다.

마지막 기준 상태: Part I. 1장 「출애굽」 및 Part I. 2장 「광야」 구현·라우팅·이미지 반영 단계 완료 후 최종 QA 준비 단계.

---

## 1. 프로젝트 정체성

BibleRogue2는 성경 사건을 직접 바꾸는 게임이 아니라, 성경 사건 앞에 선 이름 없는 증인의 반응을 선택하는 텍스트 기반 선택형 서사 게임이다.

핵심 원칙은 다음과 같다.

1. 플레이어는 성경의 직접 주인공이 아니다.
2. 플레이어는 사건을 목격하고 공동체 안에서 반응하는 이름 없는 증인이다.
3. 성경 사건 자체는 바꾸지 않는다.
4. 선택지는 사건의 결과를 바꾸는 것이 아니라, 사건 앞에서 증인의 태도와 공동체의 방향을 드러낸다.
5. 선택지는 단순 정답/오답이 아니라 신뢰, 두려움, 기억, 공동체, 분별, 지체, 흩어짐 같은 hidden risk를 누적한다.
6. 명백한 생명 조건 거부, 우상 숭배 주도, 공동체 붕괴, 말씀 정면 거부는 즉시 배드엔딩으로 연결할 수 있다.

---

## 2. 현재 전체 구조

홈 화면은 6개 Part 구조를 사용한다.

1. Part I. 해방과 정착
2. Part II. 왕국의 빛과 균열
3. Part III. 예언자의 밤
4. Part IV. 포로와 귀환
5. Part V. 메시아의 새벽
6. Part VI. 증언의 시대

각 Part는 6개 챕터 카드로 구성된다. 현재 모든 홈 카드 썸네일 36개는 `assets/images/home/chapters/` 경로에 반영된 상태로 본다.

---

## 3. 현재 플레이 가능 챕터

### Part I. 1장 「출애굽」

상태: 플레이 가능.

구현 범위:

- 압제와 벽돌
- 모세와 바로 앞의 긴장
- 열 재앙
- 유월절
- 출애굽
- 추격
- 홍해
- 해방의 노래

이미지 상태:

- 플레이 장면 이미지 경로: `assets/images/story/exodus/play_left_520x650/`
- 엔딩 이미지 경로: `assets/images/story/exodus/original_16x9/`
- 주요 노드 및 엔딩 이미지가 연결된 상태로 본다.

주요 엔딩:

- `true_exodus_deliverance`
- `faithful_exodus_witness`
- `wounded_exodus_witness`
- `bad_bricks_forever`
- `bad_unmarked_door`
- `bad_stayed_in_egypt`
- `bad_return_to_egypt`
- `bad_scattered_people`
- `bad_closed_sea`

### Part I. 2장 「광야」

상태: 플레이 가능. 시내산 언약과 금송아지 사건까지 확장됨.

구현 범위:

- 출애굽기 15:22–17:7
- 출애굽기 19–32장 핵심 사건

주요 사건:

- 마라의 쓴 물
- 엘림의 쉼
- 만나와 메추라기
- 안식일과 만나
- 르비딤의 물 없음
- 반석의 물
- 시내산 도착
- 언약의 제안
- 두려운 계시
- 모세를 기다리는 시간
- 보이는 신을 요구하는 압력
- 금송아지 제작
- 우상 앞의 축제
- 깨진 돌판
- 회개와 중보
- 언약의 기억

노드 수:

- `TOTAL_PROGRESS = 26`
- 시작 노드: `wilderness_01_marah_thirst`
- 최종 노드: `wilderness_26_covenant_remembered`

이미지 상태:

- 플레이 장면 이미지 경로: `assets/images/story/wilderness/play_left_520x650/`
- 엔딩 이미지 경로: `assets/images/story/wilderness/original_16x9/`
- 전반부 및 후반부 광야 일러스트가 업로드된 상태로 본다.
- 후반부 시내산/금송아지 플레이 이미지 10개와 확장 엔딩 이미지 7개가 업로드된 상태로 본다.

주요 엔딩:

기존 광야 엔딩:

- `true_wilderness_daily_trust`
- `faithful_wilderness_witness`
- `wounded_wilderness_witness`
- `bad_wilderness_bitter_murmur`
- `bad_rotten_manna`
- `bad_sabbath_rebellion`
- `bad_massah_meribah`

확장 광야 엔딩:

- `true_wilderness_covenant_witness`
- `faithful_wilderness_covenant_memory`
- `wounded_wilderness_covenant_witness`
- `bad_golden_calf_leader`
- `bad_idol_feast`
- `bad_covenant_broken`
- `bad_return_to_idols`

---

## 4. 런타임 구조

현재 핵심 런타임 파일은 다음과 같다.

- `src/main.js`: 기본 게임 진행, 렌더링, 선택지 처리, 저장, 엔딩 표시 담당.
- `src/chapter-runtime.js`: 챕터별 시작 노드와 챕터별 이미지 경로를 보정하는 어댑터.
- `src/responsive.js`: 화면 크기와 모바일 가로 대응만 담당해야 한다.

중요한 구조 원칙:

1. `responsive.js`에는 챕터 라우팅, 이미지 경로 보정, 스토리 로직을 넣지 않는다.
2. 챕터별 시작 노드와 챕터별 이미지 경로는 `chapter-runtime.js`가 담당한다.
3. 장기적으로는 `main.js`에 `startChapter(chapterId)`, `getPlayArtBase(node)`, `getEndingArtBase(profile)` 구조를 정식 반영하는 것이 이상적이다.
4. 단기적으로는 `chapter-runtime.js`를 통해 다중 챕터 구조를 안정적으로 유지한다.

---

## 5. 이미지 경로 규칙

각 챕터는 다음 규칙을 따른다.

플레이 화면 세로 이미지:

```text
assets/images/story/{chapterKey}/play_left_520x650/{node.image 또는 node.id + .png}
```

엔딩 와이드 이미지:

```text
assets/images/story/{chapterKey}/original_16x9/{ending.image 또는 ending.id + .png}
```

현재 적용 중인 chapterKey:

- 출애굽: `exodus`
- 광야: `wilderness`

새 챕터를 추가할 때는 `src/chapter-runtime.js`의 `CHAPTERS`에 새 prefix와 경로를 추가한다.

예시:

```js
jericho: {
  startNodeId: 'jericho_01_jordan_edge',
  nodePrefix: 'jericho_',
  playArtBase: 'assets/images/story/jericho/play_left_520x650',
  endingArtBase: 'assets/images/story/jericho/original_16x9'
}
```

---

## 6. 현재 최종 QA 필요 항목

Part I. 1장 「출애굽」과 Part I. 2장 「광야」는 최종 완료 판정 전에 반드시 아래를 확인해야 한다.

1. `node tools/validate-story.js` 실행.
2. error 0개 확인.
3. 홈 → 출애굽 진입 확인.
4. 홈 → 광야 진입 확인.
5. 출애굽 주요 배드엔딩 및 최종 엔딩 진입 확인.
6. 광야 1–26번 노드 진행 확인.
7. 광야 전반부 이미지 표시 확인.
8. 광야 후반부 시내산/금송아지 이미지 표시 확인.
9. 광야 확장 엔딩 7개 이미지 표시 확인.
10. 콘솔 404 오류 확인.
11. Part II–VI 카드가 아직 플레이로 진입하지 않는지 확인.
12. 홈 기능 패널 동행자/엔딩/설정이 깨지지 않았는지 확인.

---

## 7. 현재 잠정 판정

현재 상태는 다음과 같이 본다.

```text
Part I. 1장 출애굽: 구현 완료, 최종 QA 대상.
Part I. 2장 광야: 확장 구현 및 이미지 업로드 완료, 최종 QA 대상.
홈 화면: Part I–VI 탐색 구조 구현 완료.
챕터 런타임: 다중 챕터 구조 1차 적용 완료.
다음 구현 후보: Part I. 3장 여리고.
```

최종 완료 판정은 `QA_RELEASE_CHECKLIST.md` 기준을 통과한 뒤에만 내린다.
