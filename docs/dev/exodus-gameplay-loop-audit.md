# Exodus Gameplay Loop Audit

이 문서는 2장 여리고로 확장하기 전에 1장 「출애굽」 안에서 게임의 기본 구조와 기능을 완성하기 위한 검수 문서이다.

현재 목표는 새 챕터 추가가 아니라, 1장 출애굽기 챕터를 기준으로 BibleRogue2의 표준 게임 루프를 고정하는 것이다.

---

## 1. 현재 완료된 핵심 루프

### 1.1 홈에서 1장 진입

현재 홈 화면의 1장 카드에서 플레이 화면으로 진입할 수 있다.

검수 기준:

- 홈 화면에서 1장 출애굽 카드 클릭
- 기존 저장 데이터가 없으면 새 게임 시작
- 기존 저장 데이터가 있으면 이어하기 흐름으로 진입

주의:

- 프로젝트 결정상 저장 기능은 본편 완성 후 마지막에 확장한다.
- 현재 코드에는 로컬 저장 관련 함수가 남아 있으므로, 다음 패치에서 저장 기능을 확장하지 말고 임시 상태를 정리해야 한다.

### 1.2 장면 렌더링

각 노드는 다음 정보를 플레이 화면에 표시한다.

- chapter
- location
- bible
- title
- day
- place
- progress
- copy
- prompt
- choices

검수 기준:

- 모든 노드에서 제목과 본문이 비어 있지 않아야 한다.
- progress.current / progress.total이 UI에 표시되어야 한다.
- 본문 마지막 문단 앞에 구분선이 들어가고, 마지막에 prompt가 표시되어야 한다.

### 1.3 선택 전/후 UX

현재 선택 전에는 다음 버튼이 비활성화되고, 선택 후에는 선택 진행 버튼으로 바뀐다.

검수 기준:

- 선택 전 버튼 문구: 선택지를 고르세요
- 선택 전 버튼 disabled 상태
- 선택 후 버튼 문구: 이 선택으로 나아가기
- 선택한 선택지는 active 상태
- 오른쪽 패널에 동행자 반응 표시
- 선택의 흔적 표시

### 1.4 상태값 누적

현재 사용되는 상태값은 다음과 같다.

- trust: 신뢰
- fear: 두려움
- community: 공동체
- discernment: 분별
- memory: 기억
- time: 시간
- clues: 단서
- delay: 지체
- scatter: 흩어짐

검수 기준:

- 선택지 effects가 상태값에 반영되어야 한다.
- 화면 상단에는 신뢰, 공동체, 분별이 표시된다.
- 오른쪽 패널에는 선택의 흔적이 표시된다.
- 엔딩 화면에서는 신뢰, 공동체, 기억과 분별 합산이 표시된다.

주의:

- time, clues는 현재 1장에서 거의 사용되지 않는 값으로 보인다.
- 실제 1장 구조 안에서 사용하지 않는다면 2장 전까지 제거하거나 보류 상태로 문서화해야 한다.

### 1.5 배드엔딩 진입

현재 선택지에서 직접 ending으로 이동하는 구조가 있다.

검수 기준:

- bad_bricks_forever
- bad_unmarked_door
- bad_stayed_in_egypt
- bad_return_to_egypt
- bad_scattered_people
- bad_closed_sea

각 배드엔딩은 다음을 만족해야 한다.

- 성경 본문 자체를 바꾸지 않는다.
- 플레이어와 주변 공동체의 잘못된 반응으로 발생한다.
- 단순한 실패가 아니라 왜 실패했는지 신학적·서사적 설득력이 있어야 한다.

### 1.6 최종 엔딩 판정

최종 노드는 `endingResolver: 'exodus'`를 통해 엔딩을 판정한다.

현재 기준:

```js
if (gameState.trust >= 4 && gameState.community >= 3 && gameState.memory >= 3) return 'true_exodus_deliverance';
if (gameState.fear >= 4 || gameState.scatter >= 3 || gameState.delay >= 3) return 'wounded_exodus_witness';
return 'faithful_exodus_witness';
```

검수 기준:

- 트루엔딩 조건이 너무 빡빡하지 않은지 확인한다.
- wounded 엔딩 조건이 너무 쉽게 발동하지 않는지 확인한다.
- faithful 엔딩이 기본 안전망으로 작동하는지 확인한다.

주의:

- 이번 구조 패치로 마지막 선택지에서 memory 또는 community가 추가로 올라갈 수 있다.
- 따라서 루트 A에서 true_exodus_deliverance에 실제 도달 가능한지 반드시 확인해야 한다.

---

## 2. 현재 발견된 구조적 이슈

### 이슈 1. 저장 기능 보류 원칙과 실제 코드의 불일치

프로젝트 결정:

- 저장 기능은 게임 본편 완성 후 마지막에 추가한다.
- 현재는 저장/이어하기 기능을 확장하지 않는다.

현재 코드 상태:

- SAVE_KEY 존재
- readSave 존재
- writeSave 존재
- clearSave 존재
- continueSavedOrStart 존재
- 홈 화면 기록/엔딩 패널도 저장 데이터 일부를 사용한다.

판단:

- 저장 기능은 이미 부분적으로 들어가 있다.
- 다만 지금 확장하면 게임 구조 검수가 흔들린다.
- 다음 기능 패치에서는 저장 기능을 삭제하기보다, “임시 저장 레이어”로 격리하고 새 기능 확장은 중단하는 방향이 안전하다.

추천 패치:

- `SAVE_FEATURE_ENABLED = false` 같은 플래그 도입
- 개발 중에는 항상 새 게임 흐름 기준으로 검수
- 기록/엔딩 해금은 추후 정식 저장 시스템에서 재정리

### 이슈 2. 런타임 패치 파일의 임시성

현재 `exodusStructurePatch.js`는 원본 `storyNodes.js`를 직접 덮어쓰지 않기 위해 만든 안전한 런타임 패치이다.

장점:

- 대형 storyNodes.js 파일 손상 위험을 줄인다.
- 원본 구조를 보존하면서 2차 구조 패치를 적용한다.
- validator도 해당 패치를 읽도록 보강했다.

단점:

- 장기적으로는 storyNodes.js 본문에 흡수하는 것이 더 명확하다.
- 1장 최종 확정 전까지는 임시 패치 파일로 유지한다.

추천 처리:

- 1장 구조가 확정되기 전까지 유지
- 1장 완성 선언 직전에 storyNodes.js에 통합
- 통합 후 exodusStructurePatch.js 제거

### 이슈 3. 엔딩 결과 설명의 부족

현재 엔딩 화면은 상태값 요약과 엔딩 문구를 보여준다.
그러나 플레이어가 왜 이 엔딩에 도달했는지 명시적으로 알기 어렵다.

추천 패치:

- 엔딩 화면에 “결정적 선택의 흔적” 섹션 추가
- 또는 ending description 안에 상태 기반 설명을 추가
- 예: 두려움과 지체가 커져 공동체가 흔들렸습니다.

### 이슈 4. 선택의 흔적은 즉시 표시되지만 누적 기록은 약하다

현재 오른쪽 패널에는 선택 직후의 효과가 표시된다.
하지만 플레이어가 이전 선택들의 누적 흐름을 보기 어렵다.

추천 패치:

- 현재는 “즉시 선택의 흔적”만 유지
- 누적 선택 기록은 저장 시스템 확정 후 도입
- 단, 개발자 검수를 위해 console 또는 debug panel은 고려 가능

---

## 3. 수동 검수 루트

### 루트 A. 공동체/기억/신뢰 루트

목표:

- true_exodus_deliverance 도달 가능성 확인

검수 선택 방향:

1. 지친 이웃의 짐을 함께 든다
2. 소문을 귀담아듣고 희망을 품는다
3. 백성들을 모아 흔들리지 말자고 말한다
4. 이 일이 우연이 아니라고 기록해 둔다
5. 우리를 구별하시는 하나님을 기억하자고 말한다
6. 가족과 함께 조용히 준비한다
7. 말씀대로 문설주에 피를 바르고 가족을 준비시킨다
8. 뒤처진 사람들을 살핀다
9. 사람들을 둘씩 묶어 질서 있게 지나가게 한다
10. 함께 건넌 이들의 이름을 기억한다

예상:

- trust, community, memory가 충분히 상승해야 한다.
- 최종 엔딩은 true_exodus_deliverance 또는 faithful_exodus_witness여야 한다.
- true에 도달하지 못하면 threshold 조정이 필요하다.

### 루트 B. 지체/두려움 루트

목표:

- wounded_exodus_witness 도달 가능성 확인

검수 선택 방향:

- 더 많은 징조를 확인하려고 돌아다닌다
- 굳이 이렇게까지 해야 하느냐며 망설인다
- 먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다
- 병거 소리에 붙잡혀 걸음을 멈춘다

예상:

- delay 또는 fear가 상승해야 한다.
- 최종 엔딩은 wounded_exodus_witness가 되어야 한다.

### 루트 C. 직접 배드엔딩 루트

목표:

- 직접 ending 이동이 정상 작동하는지 확인

검수 항목:

- 애굽의 질서에 순응하자고 선동한다 → bad_bricks_forever
- 유월절 표지를 무시한다 → bad_unmarked_door
- 떠남을 거부하거나 애굽에 남는 선택 → bad_stayed_in_egypt
- 돌아서거나 흩어지는 선택 → bad_return_to_egypt / bad_scattered_people
- 바다 앞에서 길을 거부하는 선택 → bad_closed_sea

---

## 4. 다음 패치 제안

### Patch 03. Disable save expansion during Exodus loop testing

목표:

- 저장 기능을 완전히 삭제하지 않는다.
- 그러나 개발 중 게임 루프 검수는 항상 새 게임 기준으로 흐르게 한다.
- 저장/이어하기 확장은 본편 완성 후로 보류한다.

작업 후보:

- `SAVE_FEATURE_ENABLED = false` 추가
- `readSave`, `writeSave`, `clearSave`는 플래그를 따른다.
- 홈의 “이야기 계속하기” 문구는 임시로 “이야기 시작하기”로 고정한다.
- `startNewGame()` 기준으로 1장 검수를 진행한다.

### Patch 04. Exodus ending result clarity

목표:

- 엔딩 화면에서 플레이어가 자신의 결과를 이해할 수 있게 한다.

작업 후보:

- 엔딩 설명에 상태 기반 결과 한 줄 추가
- `resolveExodusEnding()` 기준과 실제 ending description 정합성 검토
- true / faithful / wounded 간 차이를 더 명확히 만든다.

### Patch 05. Exodus manual route QA checklist

목표:

- 루트 A/B/C를 개발자가 체크할 수 있는 QA 체크리스트로 만든다.

작업 후보:

- `docs/qa/exodus-route-checklist.md` 추가
- 각 루트별 예상 상태값과 예상 엔딩 기록
- 모바일 가로모드 검수 항목 포함

---

## 5. 현재 결론

2장 여리고는 아직 착수하지 않는다.

출애굽기 챕터에서 먼저 확정해야 할 것은 다음이다.

1. 새 게임 시작 기준 루프
2. 선택지 UX
3. 동행자 반응
4. 상태값 누적
5. 배드엔딩 진입
6. 최종 엔딩 판정
7. 엔딩 결과 설명
8. 모바일 가로모드 안정성
9. 저장 기능 보류 상태 정리

이 아홉 가지가 안정화된 뒤에야 2장 여리고로 확장한다.
