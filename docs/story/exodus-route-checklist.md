# 출애굽 1장 루트 QA 체크리스트

이 문서는 2장 여리고로 넘어가기 전에 1장 「출애굽」의 스토리 루트, 엔딩 도달 가능성, 선택지 효과, 배드엔딩 설득력을 수동 검수하기 위한 기준 문서이다.

현재 이 문서의 검수 범위는 스토리 데이터에 한정한다.

검수 대상:

- `src/data/storyNodes.js`
- `src/data/exodusStructurePatch.js`
- `src/data/endings.js`
- `tools/validate-story.js`

검수 제외:

- `index.html`
- `src/main.js`
- `src/post-cleanup.js`
- `src/responsive.js`
- CSS 파일
- 홈 화면 구조
- 반응형 UI

---

## 1. 필수 사전 검수

### 1.1 validator 실행

로컬에서 다음 명령을 실행한다.

```bash
node tools/validate-story.js
```

성공 기준:

- error 0개
- unknown effect key 없음
- missing next target 없음
- missing ending target 없음
- unknown endingResolver 없음
- duplicate choice key 없음

허용 가능한 warning:

- 의도된 단일 선택지 노드 경고
- 아직 구조상 직접 탐색하지 않은 엔딩의 reachability 경고

허용하지 않는 warning:

- 출애굽 1장 주요 노드가 START_NODE_ID에서 도달 불가능하다는 경고
- 출애굽 배드엔딩이 데이터에는 있으나 실제 선택지에서 전혀 연결되지 않는 경고

---

## 2. 전체 노드 흐름 체크

아래 순서가 유지되는지 확인한다.

```text
exodus_01_slave_day
→ exodus_02_whisper
→ exodus_03_pharaoh
→ exodus_04_plague_begin
→ exodus_05_set_apart
→ exodus_06_darkness
→ exodus_07_passover
→ exodus_08_departure
→ exodus_09_wilderness_edge
→ exodus_10_redsea
→ exodus_10b_care_branch
→ exodus_10c_discern_branch
→ exodus_11_crossing
→ exodus_12_deliverance
→ endingResolver: exodus
```

체크 항목:

- 각 노드에 `id`, `chapter`, `location`, `bible`, `title`, `day`, `place`, `progress`, `copy`, `prompt`, `choices`가 있는가
- 각 선택지에 `key`, `text`, `effects`, `companions`, 그리고 `next` 또는 `ending` 또는 `endingResolver`가 있는가
- `exodusStructurePatch.js`의 추가 선택지가 실제 런타임에서 반영되는가
- `exodus_12_deliverance`가 단일 선택지로 끝나지 않고 세 선택지를 보여주는가

---

## 3. 루트 A: 공동체/기억/신뢰 루트

목표:

- 트루엔딩 또는 굿엔딩 도달 가능성을 확인한다.
- 출애굽의 신학적 흐름이 “해방의 목격”으로 자연스럽게 이어지는지 확인한다.

권장 선택 흐름:

```text
1. exodus_01_slave_day
   - 지친 이웃의 짐을 함께 든다
   - 기대 효과: community +1

2. exodus_02_whisper
   - 소문을 귀담아듣고 희망을 품는다
   - 기대 효과: trust +1

3. exodus_03_pharaoh
   - 백성들을 모아 흔들리지 말자고 말한다
   - 기대 효과: community +1

4. exodus_04_plague_begin
   - 이 일이 우연이 아니라고 기록해 둔다
   - 기대 효과: memory +1

5. exodus_05_set_apart
   - 우리를 구별하시는 하나님을 기억하자고 말한다
   - 기대 효과: memory +1, trust +1

6. exodus_06_darkness
   - 가족과 함께 조용히 준비한다
   - 기대 효과: community +1

7. exodus_07_passover
   - 말씀대로 문설주에 피를 바르고 가족을 준비시킨다
   - 기대 효과: trust +1, community +1, memory +1

8. exodus_10b_care_branch 또는 관련 후반 분기
   - 뒤처진 사람들을 돌보는 선택을 우선한다

9. exodus_10c_discern_branch
   - 사람들을 둘씩 묶어 질서 있게 지나가게 한다
   - 기대 효과: community +1, discernment +1

10. exodus_12_deliverance
   - 함께 건넌 이들의 이름을 기억한다
   - 기대 효과: community +1, memory +1
```

예상 결과:

- `true_exodus_deliverance` 또는 `faithful_exodus_witness`

검수 질문:

- 트루엔딩 조건이 실제로 도달 가능한가
- 공동체와 기억 선택이 플레이어에게 충분히 매력적인가
- 선택지가 정답처럼 너무 노골적으로 보이지 않는가
- 마지막 선택이 엔딩 판정에 의미 있게 기여하는가

---

## 4. 루트 B: 지체/두려움/흔들림 루트

목표:

- `wounded_exodus_witness` 도달 가능성을 확인한다.
- 흔들림이 단순 실패가 아니라 “미완의 증언”으로 설득력 있게 남는지 확인한다.

권장 선택 흐름:

```text
1. 냉소하거나 두려움을 퍼뜨리는 선택을 일부 선택한다
2. 더 많은 징조를 확인하려고 돌아다닌다
3. 유월절 표지 앞에서 망설인다
4. 길을 확인한다며 지체한다
5. 바다 앞에서 두려움이 큰 선택을 고른다
6. 마지막에는 살아남았다는 안도감에만 머문다
```

기대 효과:

- fear 상승
- delay 상승
- scatter 일부 상승 가능

예상 결과:

- `wounded_exodus_witness`

검수 질문:

- wounded 엔딩이 너무 쉽게 발동하지 않는가
- 반대로 거의 도달 불가능하지는 않은가
- 이 엔딩이 실패가 아니라 흔들린 증언으로 이해되는가
- 선택 과정에서 플레이어가 자기 선택의 결과를 납득할 수 있는가

---

## 5. 루트 C: 직접 배드엔딩 루트

목표:

- 직접 `ending`으로 연결되는 배드엔딩들이 정상 진입하는지 확인한다.
- 배드엔딩이 성경 사건 자체를 바꾸지 않고, 플레이어의 응답 실패로 처리되는지 확인한다.

### 5.1 bad_bricks_forever

진입 선택:

```text
exodus_03_pharaoh
→ 차라리 애굽의 질서에 순응하자고 선동한다
```

성공 기준:

- 엔딩 id: `bad_bricks_forever`
- 제목: 끝나지 않는 벽돌
- 실패 이유가 “익숙한 억압을 안전으로 오해함”으로 전달되는가

### 5.2 bad_unmarked_door

진입 선택:

```text
exodus_07_passover
→ 이 표지는 지나친 일이라며 무시한다
```

성공 기준:

- 엔딩 id: `bad_unmarked_door`
- 제목: 표시 없는 문
- 실패 이유가 “말씀의 표지를 가볍게 여김”으로 전달되는가

### 5.3 bad_stayed_in_egypt

검수 기준:

- 떠남의 명령 앞에서 애굽에 남는 선택지가 실제로 존재하는가
- 존재한다면 `bad_stayed_in_egypt`로 연결되는가
- 존재하지 않는다면 해당 엔딩은 현재 데이터상 미사용 엔딩으로 분류한다

### 5.4 bad_return_to_egypt

검수 기준:

- 바다 앞 위기에서 애굽으로 돌아서려는 선택지가 실제로 존재하는가
- 존재한다면 `bad_return_to_egypt`로 연결되는가
- 두려움의 설득력이 충분한가

### 5.5 bad_scattered_people

검수 기준:

- 뒤처진 사람을 버리거나 공동체를 흩어지게 하는 선택지가 실제로 존재하는가
- 존재한다면 `bad_scattered_people`로 연결되는가
- 공동체성 상실이 배드엔딩 사유로 분명한가

### 5.6 bad_closed_sea

검수 기준:

- 열린 바다 앞에서 지나치게 지체하거나 거부하는 선택지가 실제로 존재하는가
- 존재한다면 `bad_closed_sea`로 연결되는가
- “때를 놓침”이 납득 가능한가

---

## 6. 2차 구조 패치 반영 체크

`docs/story/exodus-structure-patch-plan.md` 기준으로 다음 세 항목을 확인한다.

### 6.1 exodus_10b_care_branch

필수 선택지:

```text
key: check_path_then_call
text: 먼저 길을 확인한 뒤 뒤처진 사람들을 부르자고 제안한다
effects: discernment +1, delay +1
next: exodus_11_crossing
```

현재 위치:

- `src/data/exodusStructurePatch.js`

### 6.2 exodus_10c_discern_branch

필수 선택지:

```text
key: cross_in_pairs
text: 사람들을 둘씩 묶어 질서 있게 지나가게 한다
effects: community +1, discernment +1
next: exodus_11_crossing
```

현재 위치:

- `src/data/exodusStructurePatch.js`

### 6.3 exodus_12_deliverance

필수 최종 선택지:

```text
remember_for_children
remain_in_relief
remember_names
```

필수 조건:

- 세 선택지 모두 `endingResolver: 'exodus'` 유지
- 마지막 장면이 단일 선택지로 끝나지 않음

현재 위치:

- `src/data/exodusStructurePatch.js`

---

## 7. 구현율 판정 기준

최종 구현율은 다음 항목으로 산정한다.

| 항목 | 확인 기준 |
|---|---|
| 성경 흐름 | 출애굽기 1–14장의 큰 흐름이 유지되는가 |
| 선택지 수와 분기성 | 각 노드가 고민 가능한 선택을 제공하는가 |
| 배드엔딩 설득력 | 실패가 단순 오답이 아니라 서사적으로 납득되는가 |
| 동행자 반응 | 선택 결과에 맞는 동행자 대사가 제공되는가 |
| 일러스트 매핑 | 노드 id 기준 이미지 연결이 가능한가 |
| 최종 엔딩 구조 | true/good/mixed/bad 구조가 분명한가 |
| 재플레이 가치 | 다른 선택을 시도할 이유가 있는가 |

---

## 8. 현재 우선 보완 후보

### 후보 1. 미사용 배드엔딩 연결 확인

`endings.js`에는 여러 배드엔딩이 존재한다.
그러나 일부 배드엔딩은 현재 `storyNodes.js` 안에서 실제 선택지와 연결되어 있는지 추가 확인이 필요하다.

우선 확인 대상:

- `bad_stayed_in_egypt`
- `bad_return_to_egypt`
- `bad_scattered_people`
- `bad_closed_sea`

### 후보 2. 엔딩 도달 사유 문구 보강

현재 엔딩 설명은 분위기와 신학적 의미는 좋지만, 플레이어가 자기 선택의 결과를 명확히 이해하기에는 조금 약할 수 있다.

보강 방향:

- 각 엔딩 description에 한 문장 추가
- “왜 이 엔딩에 도달했는지”를 직접 설명
- `src/main.js`는 수정하지 않고 `endings.js`의 데이터 문장만 보강

### 후보 3. 2차 구조 패치 통합 보류

현재 `exodusStructurePatch.js`는 안전한 임시 구조다.
출애굽 1장 최종 확정 전까지는 `storyNodes.js`에 흡수하지 않는다.

---

## 9. 완료 판정

출애굽 1장은 다음 조건을 만족할 때 “챕터 구조 완성”으로 판정한다.

```text
1. node tools/validate-story.js error 0개
2. 루트 A에서 true 또는 good 엔딩 도달
3. 루트 B에서 mixed 엔딩 도달
4. 루트 C에서 직접 배드엔딩 정상 진입
5. 2차 구조 패치 선택지 정상 표시
6. 마지막 장면 선택지 3개 정상 표시
7. 미사용 배드엔딩 여부 정리
8. 엔딩 설명이 선택 결과와 충분히 연결됨
```
