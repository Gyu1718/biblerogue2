# Part I. 6장 「사무엘의 부르심」 마무리 체크 문서

이 문서는 Part I. 6장 「사무엘의 부르심」의 story data 1차 구현 이후, 이미지 제작·UI 연동·QA 기준을 정리한다.

> 완료 판정 문서가 아니다. validator와 브라우저 QA를 직접 통과하기 전까지 사무엘 챕터는 최종 완료로 보지 않는다.

---

## 1. 현재 구현 상태

```text
챕터명: Part I. 6장 · 사무엘의 부르심
chapterKey: samuel
nodePrefix: samuel_
시작 노드: samuel_01_siloh_dim_lamp
총 노드 수: 18
엔딩 수: 7
성경 범위: 사무엘상 1:1–4:1
```

반영 파일:

```text
src/data/samuelStructurePatch.js
src/data/samuelEndingsPatch.js
src/chapter-runtime.js
tools/validate-story.js
```

현재 사무엘은 `chapter-runtime.js`에서 동적 patch 로드 대상으로 등록되어 있으며, 홈 카드의 `.home-chapter-art.samuel` 요소가 있으면 런타임에서 플레이 가능 상태로 전환된다.

---

## 2. 사무엘 스토리 핵심 기준

사무엘의 부르심은 Part I의 마지막 장이다. 사사시대의 반복과 룻기의 작은 헤세드 이후, 왕정 시대로 넘어가기 직전 “말씀의 회복”을 다룬다.

핵심은 다음이다.

```text
말씀이 희귀한 시대
한나의 통곡과 서원
받은 아이를 다시 드리는 신실함
성소 가까이에서 벌어진 타락
어린 사무엘의 작은 섬김
밤중의 부르심
듣는 귀의 회복
두려운 말씀의 전달
온 이스라엘이 선지자로 알게 됨
```

주의:

- 플레이어는 사무엘, 한나, 엘리가 아니다.
- 플레이어는 실로 성소 곁에서 통곡의 기도, 성소의 타락, 어린 섬김, 밤중의 부르심을 목격하는 이름 없는 증인이다.
- 한나의 고통을 단순한 결핍이나 실패로 소비하지 않는다.
- 사무엘의 부르심은 영웅 탄생이 아니라 “말씀이 희귀한 시대에 듣는 귀가 열리는 사건”으로 다룬다.
- 엘리 집안의 심판은 자극적 처벌이 아니라 성소의 거룩함과 책임의 문제로 다룬다.
- 처음 받은 말씀이 위로가 아니라 심판이었다는 무게를 유지한다.

---

## 3. 구현된 노드 목록

```text
1. samuel_01_siloh_dim_lamp
2. samuel_02_hannahs_barrenness
3. samuel_03_bitter_prayer
4. samuel_04_misread_prayer
5. samuel_05_child_given
6. samuel_06_weaned_and_brought
7. samuel_07_hannah_song
8. samuel_08_corrupt_priests
9. samuel_09_small_linen_ephod
10. samuel_10_eli_warning
11. samuel_11_man_of_god
12. samuel_12_word_was_rare
13. samuel_13_first_call
14. samuel_14_second_call
15. samuel_15_speak_lord
16. samuel_16_hard_word
17. samuel_17_morning_fear
18. samuel_18_prophet_known
```

---

## 4. 구현된 엔딩 목록

```text
true_samuel_listening_witness
faithful_samuel_lamp_keeper
wounded_samuel_trembling_word
bad_samuel_mocked_prayer
bad_samuel_stolen_offering
bad_samuel_silenced_call
bad_samuel_hidden_word
```

엔딩 구조:

```text
true 1개
good 1개
mixed 1개
bad 4개
```

---

## 5. 이미지 필요 목록

### 플레이 이미지 경로

```text
assets/images/story/samuel/play_left_520x650/
```

필요 파일:

```text
samuel_01_siloh_dim_lamp.png
samuel_02_hannahs_barrenness.png
samuel_03_bitter_prayer.png
samuel_04_misread_prayer.png
samuel_05_child_given.png
samuel_06_weaned_and_brought.png
samuel_07_hannah_song.png
samuel_08_corrupt_priests.png
samuel_09_small_linen_ephod.png
samuel_10_eli_warning.png
samuel_11_man_of_god.png
samuel_12_word_was_rare.png
samuel_13_first_call.png
samuel_14_second_call.png
samuel_15_speak_lord.png
samuel_16_hard_word.png
samuel_17_morning_fear.png
samuel_18_prophet_known.png
```

### 엔딩 이미지 경로

```text
assets/images/story/samuel/original_16x9/
```

필요 파일:

```text
true_samuel_listening_witness.png
faithful_samuel_lamp_keeper.png
wounded_samuel_trembling_word.png
bad_samuel_mocked_prayer.png
bad_samuel_stolen_offering.png
bad_samuel_silenced_call.png
bad_samuel_hidden_word.png
```

---

## 6. 플레이 이미지 제작 프롬프트

```text
BibleRogue2 사무엘의 부르심편(Part I. 6장 「사무엘의 부르심」) 플레이 장면 일러스트 제작 작업.

역할:
너는 이미지/에셋 제작 전담이다.
코드, story data, CSS, JS는 수정하지 않는다.
오직 게임 플레이 화면 왼쪽 패널에 들어갈 PNG 장면 이미지들만 제작한다.

목표:
Part I. 6장 「사무엘의 부르심」의 실제 플레이용 세로 일러스트 18장을 제작한다.

성경 범위:
사무엘상 1:1–4:1

챕터 방향:
이 장은 Part I의 마지막 장으로, 사사시대의 혼란과 룻기의 작은 헤세드 이후 왕정 시대로 넘어가기 직전 “말씀이 희귀한 시대에 듣는 귀가 열리는 사건”을 다룬다.
플레이어는 사무엘, 한나, 엘리가 아니라 실로 성소 곁에서 한나의 통곡, 성소의 타락, 어린 사무엘의 섬김, 밤중의 부르심을 목격하는 이름 없는 증인이다.

공통 스타일:
- BibleRogue2의 성경 기반 고풍스러운 시네마틱 다크 판타지 톤
- 실로 성소, 희미한 등불, 밤, 제단, 세마포, 고대 이스라엘 예배 공간의 분위기
- 사사시대의 어둠과 룻기의 따뜻함 사이에서, 더 거룩하고 침묵이 깊은 분위기
- 어둡기만 하지 않고, 희미한 등불과 말씀의 빛이 아름답게 살아 있어야 함
- 현대풍, 만화풍, SF풍 금지
- 선정적 표현 금지
- 직접 고어 금지
- 인물을 영웅 포스터처럼 과장하지 말 것
- UI 안에서 focal subject가 분명해야 함
- 같은 챕터 안에서 톤과 색감 통일
- 핵심 정서는 “침묵, 통곡, 거룩함, 부르심, 듣는 귀, 두려운 말씀”이다

출력 규격:
- 세로형 PNG
- 플레이용 비율
- 파일별 개별 저장
- 파일명은 아래 지정명을 정확히 따를 것

저장 경로:
assets/images/story/samuel/play_left_520x650/

제작 대상:

1. samuel_01_siloh_dim_lamp.png
장면: 말씀이 희귀한 시대의 실로 성소 밤. 하나님의 등불이 아직 꺼지지 않았고, 어둠 속에 희미한 불빛과 여호와의 궤가 느껴지는 장면.

2. samuel_02_hannahs_barrenness.png
장면: 실로로 올라가는 가족의 길 또는 식탁 주변에서 한나가 고통받는 장면. 브닌나의 조롱은 직접적 과장보다 분위기로 표현.

3. samuel_03_bitter_prayer.png
장면: 한나가 성소 문 곁에서 통곡하며 조용히 기도하는 장면. 입술만 움직이는 깊은 기도, 절박함과 거룩함.

4. samuel_04_misread_prayer.png
장면: 엘리가 앉은 자리에서 한나의 기도를 오해하는 순간. 한나의 슬픔과 엘리의 오해, 성소 입구의 긴장.

5. samuel_05_child_given.png
장면: 사무엘이 태어난 뒤 한나가 아이를 품고 있는 장면. 응답의 기쁨과 다시 드려야 할 서원의 무게가 함께 느껴져야 함.

6. samuel_06_weaned_and_brought.png
장면: 젖 뗀 사무엘을 실로 성소로 데려와 여호와께 드리는 장면. 한나의 신실함과 아픔이 함께 느껴지는 장면.

7. samuel_07_hannah_song.png
장면: 한나의 노래. 낮은 자를 높이시는 하나님을 찬양하는 장엄하고 예언적인 분위기. 개인의 기쁨을 넘어 하나님의 통치가 느껴져야 함.

8. samuel_08_corrupt_priests.png
장면: 엘리의 아들들이 성소의 제물을 가볍게 여기는 분위기. 탐욕과 거룩함의 훼손을 상징적으로 표현하되 과한 폭력성 금지.

9. samuel_09_small_linen_ephod.png
장면: 어린 사무엘이 작은 세마포 에봇을 입고 성소에서 섬기는 장면. 한나가 매년 가져오는 작은 겉옷의 정서도 암시.

10. samuel_10_eli_warning.png
장면: 늙은 엘리가 아들들의 악행을 듣고 무겁게 책망하는 분위기. 늦은 경고와 책임의 무게.

11. samuel_11_man_of_god.png
장면: 하나님의 사람이 엘리 집에 심판의 말씀을 전하는 장면. 거룩하고 엄중한 분위기, 성소의 어두운 배경.

12. samuel_12_word_was_rare.png
장면: 말씀이 희귀한 밤의 실로 성소. 의식은 남아 있지만 듣는 귀가 사라진 시대의 침묵. 희미한 등불 중심.

13. samuel_13_first_call.png
장면: 밤중에 이름을 듣고 엘리에게 달려가는 어린 사무엘. 부르심의 시작이 착각처럼 다가오는 장면.

14. samuel_14_second_call.png
장면: 반복되는 부르심 뒤 엘리가 깨닫는 장면. 어두운 방, 늙은 엘리, 어린 사무엘, 늦은 분별의 순간.

15. samuel_15_speak_lord.png
장면: 사무엘이 다시 누워 “말씀하옵소서”라고 응답하는 거룩한 밤. 빛은 희미하지만 하나님의 임재가 느껴져야 함.

16. samuel_16_hard_word.png
장면: 사무엘이 엘리 집에 대한 두려운 말씀을 듣는 장면. 위로가 아니라 심판의 무게를 듣는 어린 증인의 긴장.

17. samuel_17_morning_fear.png
장면: 아침에 성소 문을 여는 사무엘. 엘리에게 말씀을 전하기 전의 두려움, 새벽빛과 무거운 침묵.

18. samuel_18_prophet_known.png
장면: 사무엘이 자라 온 이스라엘이 그를 선지자로 알게 되는 장면. 단에서 브엘세바까지 퍼지는 말씀의 회복을 상징적으로 표현.

중요:
- 사무엘을 영웅화하기보다 “말씀이 희귀한 시대에 듣는 귀가 열리는 사건”으로 표현한다
- 한나의 통곡은 숭고하고 조심스럽게 표현한다
- 엘리 집안의 타락은 선정적/폭력적으로 표현하지 말고 성소의 거룩함 훼손으로 표현한다
- 파일명과 저장 경로를 정확히 맞춘다
- 최종 결과물은 ZIP 패키징 가능한 구조로 정리한다
```

---

## 7. 엔딩 이미지 제작 프롬프트

```text
BibleRogue2 사무엘의 부르심편(Part I. 6장 「사무엘의 부르심」) 엔딩 화면용 16:9 일러스트 제작 작업.

역할:
너는 이미지/에셋 제작 전담이다.
코드, story data, CSS, JS는 수정하지 않는다.
오직 엔딩 화면 배경용 PNG 일러스트만 제작한다.

목표:
사무엘의 부르심편 엔딩 7종의 16:9 배경 이미지를 제작한다.

공통 스타일:
- BibleRogue2의 고풍스럽고 성경적인 시네마틱 다크 판타지 톤
- 실로 성소, 희미한 등불, 말씀의 빛, 통곡의 기도, 어린 섬김, 두려운 말씀의 무게를 반영
- 엔딩 화면에 텍스트가 얹히므로 중앙부는 너무 복잡하지 않게
- 상징성과 감정이 한눈에 느껴져야 함
- 고어 금지
- 선정성 금지
- 플레이 장면과 색감 및 분위기 통일

출력 규격:
- 16:9 PNG
- 엔딩 배경용
- 파일별 개별 저장
- 파일명은 아래 지정명을 정확히 따를 것

저장 경로:
assets/images/story/samuel/original_16x9/

제작 대상:

1. true_samuel_listening_witness.png
장면: 말씀이 희귀한 밤, 희미한 등불 곁에서 듣는 귀가 열린 어린 사무엘과 성소의 빛. 새 말씀의 시대가 열리는 장엄한 분위기.

2. faithful_samuel_lamp_keeper.png
장면: 꺼지기 전 등불과 작은 세마포 에봇, 조용한 성소 섬김. 완전하지 않지만 신실하게 등불 곁을 지킨 증언의 분위기.

3. wounded_samuel_trembling_word.png
장면: 새벽 성소 문 앞에서 두려운 말씀을 품은 사무엘. 빛은 오지만 마음에는 떨림과 무게가 남은 장면.

4. bad_samuel_mocked_prayer.png
장면: 성소 문 곁에서 통곡하는 한나가 조롱과 오해 속에 외롭게 놓인 장면. 기도가 수치로 바뀐 차갑고 어두운 분위기.

5. bad_samuel_stolen_offering.png
장면: 성소의 제물이 탐욕의 손에 더럽혀지는 상징적 장면. 거룩함이 훼손된 어두운 제단, 직접 고어 없이 표현.

6. bad_samuel_silenced_call.png
장면: 밤중의 부르심이 막히고 다시 잠들게 되는 어린 사무엘. 희미한 빛이 꺼져가는 느낌, 듣는 문이 닫히는 분위기.

7. bad_samuel_hidden_word.png
장면: 두려운 말씀을 숨기려는 침묵. 닫힌 성소 문, 무거운 새벽, 말씀이 땅에 떨어지는 듯한 상징.

중요:
- true/good 엔딩은 희미하지만 따뜻한 등불과 말씀의 빛을 살린다
- mixed 엔딩은 새벽빛과 두려움이 공존해야 한다
- bad 엔딩은 성소의 빛이 닫히거나 왜곡되는 느낌으로 표현한다
- 파일명과 저장 경로를 정확히 맞춘다
- 최종 결과물은 ZIP 패키징 가능한 구조로 정리한다
```

---

## 8. UI/연동 요청 프롬프트

```text
BibleRogue2 사무엘의 부르심편(Part I. 6장 「사무엘의 부르심」) UI/연동 작업.

역할:
너는 UI/프론트 연동 전담이다.
story data의 큰 내용은 건드리지 않는다.
이미지 에셋 제작도 하지 않는다.
기존 BibleRogue2 홈 / 플레이 / 엔딩 UI 구조 안에서 사무엘의 부르심편이 자연스럽게 연결되도록 조정한다.

중요 원칙:
- 기존 출애굽, 광야, 여리고, 사사시대, 룻 챕터를 깨뜨리지 않는다
- main.js, responsive.js, 기존 플레이 화면 구조와 충돌나지 않게 한다
- 가능하면 최소 수정으로 연동한다
- 기존 게임의 미감과 구조를 유지한다
- responsive.js에는 챕터 라우팅, 이미지 경로 보정, 스토리 로직을 넣지 않는다
- 챕터별 시작 노드와 이미지 경로는 chapter-runtime.js가 담당한다

작업 목표:
Part I의 6장 「사무엘의 부르심」이 홈 화면에서 “플레이 가능” 상태로 보이고,
클릭 시 실제로 진입하며,
플레이 화면과 엔딩 화면에서 사무엘 전용 이미지 경로를 정상적으로 사용하도록 한다.

필수 요청사항:

1. 홈 화면 6장 사무엘의 부르심 카드 활성화
- “잠김” 상태를 “플레이 가능”으로 전환
- 클릭/엔터 입력 시 사무엘 시작 노드로 진입
- start node:
  samuel_01_siloh_dim_lamp
- chapter key:
  samuel

2. chapter-runtime 연동 확인
- samuel 챕터 등록
- nodePrefix:
  samuel_
- playArtBase:
  assets/images/story/samuel/play_left_520x650
- endingArtBase:
  assets/images/story/samuel/original_16x9

3. story patch 동적 로드 확인
- samuelStructurePatch.js
- samuelEndingsPatch.js
정상 로드 여부 확인

4. 플레이 화면 이미지 반영
- 각 노드에서
  assets/images/story/samuel/play_left_520x650/{nodeId}.png
  형식으로 장면 이미지 로드
- scene-art 배경 반영
- 다른 챕터와 충돌 없게 유지

5. 엔딩 화면 이미지 반영
- 아래 엔딩 ID를
  assets/images/story/samuel/original_16x9/{endingId}.png
  로 연결
  - true_samuel_listening_witness
  - faithful_samuel_lamp_keeper
  - wounded_samuel_trembling_word
  - bad_samuel_mocked_prayer
  - bad_samuel_stolen_offering
  - bad_samuel_silenced_call
  - bad_samuel_hidden_word

6. 진행률 표시
- 총 18 노드 기준
- progress.current / progress.total 정상 반영

7. 플레이 화면 가독성
- 제목/본문/선택지 겹침 없어야 함
- 긴 문단에서도 스크롤 자연스럽게
- 동행자 패널 유지

8. 엔딩 화면 가독성
- 텍스트가 배경 위에서 잘 읽혀야 함
- true/good 엔딩은 희미한 등불과 따뜻한 말씀의 빛
- mixed/bad 엔딩은 절제된 톤
- 기존 엔딩 구조 유지

9. QA 체크
- 홈 → 6장 사무엘의 부르심 진입 가능
- 첫 노드 samuel_01_siloh_dim_lamp 표시
- samuel_01~18 진행 정상
- 배드엔딩 4개 진입 정상
- true/good/mixed 엔딩 진입 정상
- 출애굽/광야/여리고/사사시대/룻 기존 진입 정상
- 콘솔 에러 없음
- 이미지 404 없음

출력 형식:
- 수정 파일 목록
- 각 수정 이유
- validator 실행 결과
- 브라우저 QA 결과
- 남은 TODO
```

---

## 9. 사무엘 QA 체크리스트

### validator

```bash
node tools/validate-story.js
```

완료 기준:

```text
error 0개
```

warning이 있으면 기록한다.

### 홈 진입

- 홈 화면에서 Part I 6장 「사무엘의 부르심」 카드가 플레이 가능 상태로 전환되는지 확인.
- 클릭 또는 Enter 입력 시 `samuel_01_siloh_dim_lamp`로 진입하는지 확인.
- 출애굽, 광야, 여리고, 사사시대, 룻 카드 진입이 기존대로 유지되는지 확인.

### 노드 진행

아래 노드를 순서대로 진행할 수 있는지 확인한다.

```text
samuel_01_siloh_dim_lamp
samuel_02_hannahs_barrenness
samuel_03_bitter_prayer
samuel_04_misread_prayer
samuel_05_child_given
samuel_06_weaned_and_brought
samuel_07_hannah_song
samuel_08_corrupt_priests
samuel_09_small_linen_ephod
samuel_10_eli_warning
samuel_11_man_of_god
samuel_12_word_was_rare
samuel_13_first_call
samuel_14_second_call
samuel_15_speak_lord
samuel_16_hard_word
samuel_17_morning_fear
samuel_18_prophet_known
```

### 배드엔딩 진입

- `bad_samuel_mocked_prayer`
- `bad_samuel_stolen_offering`
- `bad_samuel_silenced_call`
- `bad_samuel_hidden_word`

### 최종 엔딩 진입

- `true_samuel_listening_witness`
- `faithful_samuel_lamp_keeper`
- `wounded_samuel_trembling_word`

### 이미지 확인

- 18개 플레이 이미지가 `assets/images/story/samuel/play_left_520x650/`에서 표시되는지 확인.
- 7개 엔딩 이미지가 `assets/images/story/samuel/original_16x9/`에서 표시되는지 확인.
- 다른 Part I 챕터 이미지가 사무엘 노드에서 잘못 나오지 않는지 확인.
- 콘솔 404 오류가 없는지 확인.

### 텍스트/연출 확인

- 한나의 통곡이 조롱이나 과장된 감정 소비로 보이지 않는지 확인.
- 성소 타락 장면이 자극적으로 보이지 않고 거룩함 훼손으로 읽히는지 확인.
- 사무엘의 부르심이 영웅 탄생보다 듣는 귀의 회복으로 보이는지 확인.
- 두려운 말씀 전달 장면이 충분히 무겁게 느껴지는지 확인.

---

## 10. Part I 마무리 전 남은 TODO

```text
1. 사무엘 이미지 25개 업로드.
2. node tools/validate-story.js 실행.
3. 사무엘 브라우저 QA.
4. Part I 전체 챕터 진입 QA.
5. QA 결과를 QA_RELEASE_CHECKLIST.md 또는 별도 QA 기록에 반영.
6. 공식 상태 문서에 Part I 1–6장 구현 1차 완료 및 QA 상태 기록.
7. 그 뒤 Part II. 왕정 시대 구현으로 넘어간다.
```
