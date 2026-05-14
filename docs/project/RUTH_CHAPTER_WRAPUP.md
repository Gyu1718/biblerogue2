# Part I. 5장 「룻」 마무리 체크 문서

이 문서는 Part I. 5장 「룻」의 story data 1차 구현 이후, 사무엘 챕터로 넘어가기 전 확인해야 할 보완·QA 기준을 정리한다.

> 완료 판정 문서가 아니다. validator와 브라우저 QA를 직접 통과하기 전까지 룻기 챕터는 최종 완료로 보지 않는다.

---

## 1. 현재 구현 상태

```text
챕터명: Part I. 5장 · 룻
chapterKey: ruth
nodePrefix: ruth_
시작 노드: ruth_01_famine_in_bethlehem
총 노드 수: 18
엔딩 수: 7
```

반영 파일:

```text
src/data/ruthStructurePatch.js
src/data/ruthEndingsPatch.js
src/chapter-runtime.js
tools/validate-story.js
```

현재 룻기는 `chapter-runtime.js`에서 동적 patch 로드 대상으로 등록되어 있으며, 홈 카드의 `.home-chapter-art.ruth` 요소가 있으면 런타임에서 플레이 가능 상태로 전환된다.

---

## 2. 룻기 스토리 핵심 기준

룻기는 사사시대의 혼란 뒤에 배치되는 작은 헤세드의 이야기다.

핵심은 다음이다.

```text
상실
귀향
이방 여인의 신실함
이삭 줍기
보아스의 보호
기업 무름
성문 증언
오벳의 출생
다윗 계보로 이어지는 은혜
```

주의:

- 플레이어는 룻, 나오미, 보아스가 아니다.
- 플레이어는 베들레헴 공동체 안에서 사건을 목격하고 반응하는 이름 없는 증인이다.
- 룻기 후반부는 현대적 로맨스가 아니라 기업 무름과 공동체적 책임 중심으로 해석한다.
- 타작마당 장면은 선정적으로 표현하지 않고, 보호 요청과 기업 무름의 책임으로 표현한다.
- 룻의 모압 출신성은 배제의 이유가 아니라 하나님의 은혜가 밖에서 들어오는 증언으로 다룬다.

---

## 3. 구현된 노드 목록

```text
1. ruth_01_famine_in_bethlehem
2. ruth_02_road_to_moab
3. ruth_03_house_of_losses
4. ruth_04_news_from_bethlehem
5. ruth_05_three_women_road
6. ruth_06_ruth_clings
7. ruth_07_return_to_bethlehem
8. ruth_08_barley_harvest
9. ruth_09_field_of_boaz
10. ruth_10_boaz_greeting
11. ruth_11_handfuls_left
12. ruth_12_naomi_hears_boaz
13. ruth_13_threshing_floor_plan
14. ruth_14_feet_uncovered
15. ruth_15_six_measures
16. ruth_16_city_gate
17. ruth_17_sandals_and_witnesses
18. ruth_18_obed_is_born
```

---

## 4. 구현된 엔딩 목록

```text
true_ruth_hesed_witness
faithful_ruth_bethlehem_witness
wounded_ruth_empty_to_full
bad_ruth_left_widows
bad_ruth_field_exploitation
bad_ruth_redeemer_refused
bad_ruth_closed_gate
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
assets/images/story/ruth/play_left_520x650/
```

필요 파일:

```text
ruth_01_famine_in_bethlehem.png
ruth_02_road_to_moab.png
ruth_03_house_of_losses.png
ruth_04_news_from_bethlehem.png
ruth_05_three_women_road.png
ruth_06_ruth_clings.png
ruth_07_return_to_bethlehem.png
ruth_08_barley_harvest.png
ruth_09_field_of_boaz.png
ruth_10_boaz_greeting.png
ruth_11_handfuls_left.png
ruth_12_naomi_hears_boaz.png
ruth_13_threshing_floor_plan.png
ruth_14_feet_uncovered.png
ruth_15_six_measures.png
ruth_16_city_gate.png
ruth_17_sandals_and_witnesses.png
ruth_18_obed_is_born.png
```

### 엔딩 이미지 경로

```text
assets/images/story/ruth/original_16x9/
```

필요 파일:

```text
true_ruth_hesed_witness.png
faithful_ruth_bethlehem_witness.png
wounded_ruth_empty_to_full.png
bad_ruth_left_widows.png
bad_ruth_field_exploitation.png
bad_ruth_redeemer_refused.png
bad_ruth_closed_gate.png
```

---

## 6. 룻기 QA 체크리스트

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

- 홈 화면에서 Part I 5장 「룻」 카드가 플레이 가능 상태로 전환되는지 확인.
- 클릭 또는 Enter 입력 시 `ruth_01_famine_in_bethlehem`로 진입하는지 확인.
- 출애굽, 광야, 여리고, 사사시대 카드 진입이 기존대로 유지되는지 확인.
- Part II–VI 카드는 아직 플레이로 진입하지 않는지 확인.

### 노드 진행

아래 노드를 순서대로 진행할 수 있는지 확인한다.

```text
ruth_01_famine_in_bethlehem
ruth_02_road_to_moab
ruth_03_house_of_losses
ruth_04_news_from_bethlehem
ruth_05_three_women_road
ruth_06_ruth_clings
ruth_07_return_to_bethlehem
ruth_08_barley_harvest
ruth_09_field_of_boaz
ruth_10_boaz_greeting
ruth_11_handfuls_left
ruth_12_naomi_hears_boaz
ruth_13_threshing_floor_plan
ruth_14_feet_uncovered
ruth_15_six_measures
ruth_16_city_gate
ruth_17_sandals_and_witnesses
ruth_18_obed_is_born
```

### 배드엔딩 진입

- `bad_ruth_left_widows`
- `bad_ruth_field_exploitation`
- `bad_ruth_redeemer_refused`
- `bad_ruth_closed_gate`

### 최종 엔딩 진입

- `true_ruth_hesed_witness`
- `faithful_ruth_bethlehem_witness`
- `wounded_ruth_empty_to_full`

### 이미지 확인

- 18개 플레이 이미지가 `assets/images/story/ruth/play_left_520x650/`에서 표시되는지 확인.
- 7개 엔딩 이미지가 `assets/images/story/ruth/original_16x9/`에서 표시되는지 확인.
- 출애굽/광야/여리고/사사시대 이미지가 룻기 노드에서 잘못 나오지 않는지 확인.
- 콘솔 404 오류가 없는지 확인.

### 텍스트/연출 확인

- 타작마당 장면이 선정적으로 느껴지지 않는지 확인.
- 룻과 보아스가 현대 로맨스 주인공처럼 보이지 않는지 확인.
- 나오미의 상실을 지나치게 쉽게 해결하거나 감정적으로 소비하지 않는지 확인.
- 모압 여인 룻의 위치가 배제와 환대의 선택축으로 분명히 드러나는지 확인.
- 오벳의 출생과 다윗 계보 연결이 최종 노드에서 분명히 드러나는지 확인.

---

## 7. 사무엘 챕터 착수 전 남은 TODO

```text
1. 룻기 이미지 25개 업로드.
2. node tools/validate-story.js 실행.
3. 룻기 브라우저 QA.
4. QA 결과를 QA_RELEASE_CHECKLIST.md 또는 별도 QA 기록에 반영.
5. 공식 상태 문서에 사사시대/룻기 구현 1차 반영 및 QA 전 상태를 기록.
6. 그 뒤 Part I. 6장 「사무엘의 부르심」 구현 착수.
```
