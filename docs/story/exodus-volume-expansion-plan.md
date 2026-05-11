# 1장 「출애굽」 볼륨 확장 설계서

이 문서는 BibleRogue2 1장 「출애굽」을 현재의 플레이 가능한 골격에서, 더 충분한 분기형 서사 챕터로 확장하기 위한 기준 문서이다.

## 1. 현재 판단

현재 1장 출애굽은 기본 플레이 흐름은 작동한다.

다만 현재 구조는 다음 한계가 있다.

- 10가지 재앙 구간이 요약적으로 지나간다.
- 유월절 준비와 식사 장면이 충분히 체감되지 않는다.
- 홍해 앞 위기는 강화되었지만, 분기 후 재합류가 빠르다.
- 선택지는 많아졌으나, 일부 선택은 실제 경로 변화보다 수치 변화에 가깝다.
- 배드엔딩은 존재하지만, 선택지가 다소 노골적으로 보일 수 있다.

따라서 1장은 “성경 이야기 요약형 선택 게임”에서 “분기형 성경 서사 게임”으로 한 단계 더 확장할 필요가 있다.

---

## 2. 확장 목표

### 목표 장면 수

현재 12~14개 수준의 활성 장면을 18~21개 장면으로 확장한다.

### 목표 구조

- 재앙 구간 확장
- 유월절 준비 구간 확장
- 병거 추격 직전 공포 구간 확장
- 홍해 분기 후 재합류 전 완충 장면 추가
- 마지막 새벽 직전 장면 추가

### 목표 플레이 감각

플레이어가 단순히 “다음 장면으로 이동한다”고 느끼지 않고, 다음을 체감해야 한다.

- 내가 어떤 방식으로 재앙을 해석하는가
- 내가 유월절 명령을 어떻게 받아들이는가
- 공동체의 공포 앞에서 무엇을 붙드는가
- 홍해 앞에서 누구를 돌보고 어떤 질서로 건너는가
- 해방의 새벽을 어떻게 기억하는가

---

## 3. 확장 후 권장 노드 맵

| 순서 | 노드 ID | 상태 | 역할 | 일러스트 |
|---:|---|---|---|---|
| 1 | `exodus_01_slave_day` | 기존 | 벽돌터와 억압의 시작 | 기존 |
| 2 | `exodus_02_whisper` | 기존 | 모세의 귀환과 희망의 소문 | 기존 |
| 3 | `exodus_03_pharaoh` | 기존 | 바로의 거절과 더 무거워진 짐 | 기존 |
| 4 | `exodus_04_plague_begin` | 기존 | 나일과 재앙의 시작 | 기존 |
| 5 | `exodus_04b_plague_witness` | 신규 | 재앙을 목격한 백성의 해석 | 신규 필요 |
| 6 | `exodus_05_set_apart` | 기존 | 고센의 구별 | 기존 |
| 7 | `exodus_05b_hail_and_livestock` | 신규 | 우박, 가축, 파괴를 통한 재앙의 체감 | 신규 필요 |
| 8 | `exodus_06_darkness` | 기존 | 손으로 만질 듯한 어둠 | 기존 |
| 9 | `exodus_06b_passover_instruction` | 신규 | 유월절 지시가 각 가정에 전달됨 | 신규 필요 |
| 10 | `exodus_07_passover` | 기존 | 문설주의 표지 | 기존 |
| 11 | `exodus_07b_passover_meal` | 신규 | 급히 먹는 식사와 떠날 준비 | 신규 필요 |
| 12 | `exodus_08_departure` | 기존/확장됨 | 애굽을 떠나는 밤 | 기존 |
| 13 | `exodus_09_wilderness_edge` | 기존/확장됨 | 병거 소리와 추격의 압박 | 기존 |
| 14 | `exodus_09b_people_panic` | 신규 | 공포, 원망, 공동체 흔들림 | 신규 필요 |
| 15 | `exodus_10_redsea` | 기존/확장됨 | 홍해 앞 위기 | 기존 |
| 16 | `exodus_10b_care_branch` | 기존/확장됨 | 약자 돌봄 분기 | 기존 |
| 17 | `exodus_10c_discern_branch` | 기존/확장됨 | 질서와 분별 분기 | 기존 |
| 18 | `exodus_10d_pillar_between` | 신규 | 구름기둥/불기둥이 양 진영 사이에 섬 | 신규 필요 |
| 19 | `exodus_11_crossing` | 기존/확장됨 | 바다 가운데 난 길 | 기존 |
| 20 | `exodus_11b_last_steps` | 신규 | 새벽 직전 마지막 걸음 | 신규 필요 |
| 21 | `exodus_12_deliverance` | 기존/확장됨 | 해방의 새벽과 최종 반응 | 기존 |

---

## 4. 신규 노드별 설계

### 4.1 `exodus_04b_plague_witness`

**위치:** `exodus_04_plague_begin` 다음, `exodus_05_set_apart` 이전

**기능:** 재앙이 단순 설명이 아니라 실제 목격 사건으로 느껴지게 한다.

**본문 범위:** 출애굽기 7:20–8:19 중심

**주요 감정:** 놀람, 불안, 해석의 갈림길

**추천 선택지:**

- 이 일이 애굽의 신들이 흔들리는 표지라고 말한다.
  - 효과: `trust +1`, `memory +1`
  - 다음: `exodus_05_set_apart`
- 백성이 너무 들뜨지 않게 조심스럽게 지켜보자고 한다.
  - 효과: `discernment +1`
  - 다음: `exodus_05_set_apart`
- 이것이 우연한 재난일 뿐이라고 말한다.
  - 효과: `trust -1`, `memory -1`, `fear +1`
  - 다음: `exodus_05_set_apart`

---

### 4.2 `exodus_05b_hail_and_livestock`

**위치:** `exodus_05_set_apart` 다음, `exodus_06_darkness` 이전

**기능:** 열 가지 재앙의 중후반부 무게감을 보강한다.

**본문 범위:** 출애굽기 9:1–35 중심

**주요 감정:** 심판의 확대, 구별의 무게, 두려움

**추천 선택지:**

- 고센이 보존된 것을 기억하며 하나님께 속한 백성임을 되새긴다.
  - 효과: `memory +1`, `trust +1`
  - 다음: `exodus_06_darkness`
- 재앙이 심해질수록 사람들을 진정시키며 질서를 세운다.
  - 효과: `community +1`, `discernment +1`
  - 다음: `exodus_06_darkness`
- 애굽이 더 거칠게 보복할까 두려워 숨어만 있으려 한다.
  - 효과: `fear +1`, `delay +1`
  - 다음: `exodus_06_darkness`

---

### 4.3 `exodus_06b_passover_instruction`

**위치:** `exodus_06_darkness` 다음, `exodus_07_passover` 이전

**기능:** 유월절이 갑자기 등장하지 않고, 명령을 듣고 준비하는 장면이 생긴다.

**본문 범위:** 출애굽기 12:1–11 중심

**주요 감정:** 긴장, 순종, 설명할 수 없는 명령 앞의 준비

**추천 선택지:**

- 각 가정에 명령을 정확히 전하고 준비를 돕는다.
  - 효과: `community +1`, `discernment +1`
  - 다음: `exodus_07_passover`
- 이해되지 않지만 말씀의 순서를 하나씩 확인한다.
  - 효과: `trust +1`, `memory +1`
  - 다음: `exodus_07_passover`
- 너무 복잡하다며 대충 해도 되지 않겠느냐고 말한다.
  - 효과: `delay +1`, `trust -1`
  - 다음: `exodus_07_passover`

---

### 4.4 `exodus_07b_passover_meal`

**위치:** `exodus_07_passover` 다음, `exodus_08_departure` 이전

**기능:** 피의 표지와 실제 떠남 사이의 긴장을 살린다.

**본문 범위:** 출애굽기 12:8–13, 12:29–36 중심

**주요 감정:** 급함, 침묵, 문밖의 울음, 떠날 준비

**추천 선택지:**

- 지팡이를 들고 떠날 준비를 마치도록 가족들을 세운다.
  - 효과: `trust +1`, `community +1`
  - 다음: `exodus_08_departure`
- 무교병과 쓴 나물을 보며 이 밤을 기억해야 한다고 말한다.
  - 효과: `memory +1`
  - 다음: `exodus_08_departure`
- 밤이 지나갈 때까지 움직이지 말고 더 기다리자고 한다.
  - 효과: `delay +1`, `fear +1`
  - 다음: `exodus_08_departure`

---

### 4.5 `exodus_09b_people_panic`

**위치:** `exodus_09_wilderness_edge` 다음, `exodus_10_redsea` 이전

**기능:** 홍해 앞 위기 직전에 공동체의 공포와 원망을 체감하게 한다.

**본문 범위:** 출애굽기 14:10–12 중심

**주요 감정:** 원망, 후회, 애굽 회귀 욕망, 공포

**추천 선택지:**

- 두려움에 빠진 사람들에게 지금까지의 표지를 기억하자고 말한다.
  - 효과: `memory +1`, `trust +1`
  - 다음: `exodus_10_redsea`
- 원망하는 사람들을 억누르기보다 먼저 숨을 고르게 돕는다.
  - 효과: `community +1`, `discernment +1`
  - 다음: `exodus_10_redsea`
- 애굽에 있을 때가 차라리 나았다는 말에 동조한다.
  - 효과: `fear +2`, `trust -1`
  - 엔딩: `bad_return_to_egypt`

---

### 4.6 `exodus_10d_pillar_between`

**위치:** `exodus_10b_care_branch` 또는 `exodus_10c_discern_branch` 다음, `exodus_11_crossing` 이전

**기능:** 분기 후 바로 합류하지 않고, 구름기둥/불기둥의 장엄함을 통해 서사적 완충을 준다.

**본문 범위:** 출애굽기 14:19–20 중심

**주요 감정:** 보호, 경계, 초월적 개입, 긴장 완화와 지속

**추천 선택지:**

- 하나님이 우리와 애굽 사이에 서셨다고 말한다.
  - 효과: `trust +1`, `memory +1`
  - 다음: `exodus_11_crossing`
- 아직 밤이 길다고 판단하고 대열을 다시 정비한다.
  - 효과: `discernment +1`, `community +1`
  - 다음: `exodus_11_crossing`
- 기둥이 있으니 더 기다려도 된다고 지체한다.
  - 효과: `delay +1`, `fear +1`
  - 다음: `exodus_11_crossing`

---

### 4.7 `exodus_11b_last_steps`

**위치:** `exodus_11_crossing` 다음, `exodus_12_deliverance` 이전

**기능:** 바다를 거의 다 건넌 새벽 직전, 마지막 선택을 추가한다.

**본문 범위:** 출애굽기 14:26–31 중심

**주요 감정:** 긴장, 새벽빛, 마지막 발걸음, 뒤따르는 위협

**추천 선택지:**

- 마지막까지 뒤처진 사람들을 돌아보며 함께 빠져나간다.
  - 효과: `community +1`, `trust +1`
  - 다음: `exodus_12_deliverance`
- 이 장면을 반드시 자녀들에게 전해야 한다고 말한다.
  - 효과: `memory +1`, `trust +1`
  - 다음: `exodus_12_deliverance`
- 거의 다 왔다며 각자 먼저 뛰어나가게 한다.
  - 효과: `scatter +1`, `community -1`
  - 다음: `exodus_12_deliverance`

---

## 5. 경로 재배치 제안

현재 주요 경로를 다음처럼 재배치한다.

```text
exodus_01_slave_day
→ exodus_02_whisper
→ exodus_03_pharaoh
→ exodus_04_plague_begin
→ exodus_04b_plague_witness
→ exodus_05_set_apart
→ exodus_05b_hail_and_livestock
→ exodus_06_darkness
→ exodus_06b_passover_instruction
→ exodus_07_passover
→ exodus_07b_passover_meal
→ exodus_08_departure
→ exodus_09_wilderness_edge
→ exodus_09b_people_panic
→ exodus_10_redsea
→ exodus_10b_care_branch 또는 exodus_10c_discern_branch
→ exodus_10d_pillar_between
→ exodus_11_crossing
→ exodus_11b_last_steps
→ exodus_12_deliverance
→ final ending
```

---

## 6. 일러스트 에셋 요구사항

신규 장면은 다음 파일명을 사용한다.

```text
assets/images/story/exodus/play_left_520x650/exodus_04b_plague_witness.png
assets/images/story/exodus/play_left_520x650/exodus_05b_hail_and_livestock.png
assets/images/story/exodus/play_left_520x650/exodus_06b_passover_instruction.png
assets/images/story/exodus/play_left_520x650/exodus_07b_passover_meal.png
assets/images/story/exodus/play_left_520x650/exodus_09b_people_panic.png
assets/images/story/exodus/play_left_520x650/exodus_10d_pillar_between.png
assets/images/story/exodus/play_left_520x650/exodus_11b_last_steps.png
```

선택 제작 가능 엔딩 에셋:

```text
assets/images/story/exodus/original_16x9/bad_hardened_heart_among_us.png
```

---

## 7. 스토리 구현 채팅 작업 범위

수정 가능:

```text
src/data/storyNodes.js
src/data/exodusStructurePatch.js
src/data/endings.js
```

수정 금지:

```text
index.html
src/main.js
src/post-cleanup.js
src/responsive.js
assets/ui/**
src/styles.css
src/play.css
src/ending.css
```

---

## 8. 일러스트 제작 채팅 작업 범위

해야 할 일:

- 신규 일러스트 제작
- 파일명을 위 요구사항과 일치시킴
- zip 내부 경로를 실제 프로젝트 경로와 동일하게 구성

하지 말아야 할 일:

- 게임 코드 수정
- storyNodes 수정
- CSS 수정
- index.html 수정

---

## 9. 완료 기준

1장 출애굽 확장은 다음 조건을 만족할 때 1차 완성으로 본다.

- 18개 이상의 의미 있는 플레이 장면이 있다.
- 재앙, 유월절, 떠남, 추격, 홍해, 해방의 새벽이 모두 체감된다.
- 최소 3개 이상의 실제 분기 클러스터가 있다.
- 배드엔딩이 최소 5개 이상 실제 도달 가능하다.
- 트루/굿/혼합 엔딩이 누적 선택값에 따라 갈린다.
- 신규 일러스트 에셋이 경로에 맞게 준비된다.
- 홈 → 1장 → 선택 → 분기 → 엔딩 루프가 멈춤 없이 작동한다.
