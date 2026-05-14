# BibleRogue2 QA Release Checklist

이 문서는 챕터를 완료 판정하기 전 반드시 확인해야 하는 QA 체크리스트이다.

---

## 1. 공통 validator

아래 명령을 실행한다.

```bash
node tools/validate-story.js
```

완료 기준:

```text
error 0개
```

warning이 있을 경우 반드시 기록한다.

---

## 2. 홈 화면 QA

확인 항목:

- 홈 화면 정상 로드.
- 좌측 Part I–VI 버튼 표시.
- Part I 버튼 클릭 시 Part I 카드 6개 표시.
- Part II–VI 버튼 클릭 시 각 Part 카드 6개 표시.
- 우측 상단 아이콘 3개 표시.
- 동행자 패널 열림.
- 엔딩 패널 열림.
- 설정 패널 열림.
- 각 패널에서 장 선택 화면으로 복귀 가능.
- Part I. 1장 출애굽 카드가 플레이로 진입함.
- Part I. 2장 광야 카드가 플레이로 진입함.
- Part I. 3장 여리고 카드가 플레이로 진입함.
- Part I. 4–6장 및 Part II–VI 카드가 플레이로 진입하지 않음.
- 준비 중 패널이 정상 표시됨.

---

## 3. Part I. 1장 출애굽 QA

### 진입

- 홈 → Part I → 1장 출애굽 클릭.
- 첫 노드가 출애굽 첫 장면으로 시작.
- 출애굽 이미지가 표시.
- 광야/여리고 이미지가 나오지 않음.

### 플레이 진행

주요 구간 확인:

- 압제/벽돌 구간.
- 재앙 구간.
- 유월절 구간.
- 출애굽 구간.
- 추격 구간.
- 홍해 구간.
- 해방의 노래 구간.

### 즉시 배드엔딩 확인

- `bad_bricks_forever`
- `bad_unmarked_door`
- `bad_stayed_in_egypt`
- `bad_return_to_egypt`
- `bad_scattered_people`
- `bad_closed_sea`

### 최종 엔딩 확인

- `true_exodus_deliverance`
- `faithful_exodus_witness`
- `wounded_exodus_witness`

### 이미지 확인

- 재앙별 이미지가 출애굽 경로에서 표시.
- 엔딩별 와이드 이미지가 표시.
- 콘솔 404 오류 없음.

---

## 4. Part I. 2장 광야 QA

### 진입

- 홈 → Part I → 2장 광야 클릭.
- 첫 노드가 `wilderness_01_marah_thirst`로 시작.
- 광야 이미지가 표시.
- 출애굽/여리고 이미지가 나오지 않음.

### 전체 진행 확인

아래 노드가 정상적으로 진행되는지 확인한다.

1. `wilderness_01_marah_thirst`
2. `wilderness_02_bitter_water`
3. `wilderness_03_tree_healing`
4. `wilderness_04_elim_rest`
5. `wilderness_05_sin_hunger`
6. `wilderness_06_promised_bread`
7. `wilderness_07_quail_evening`
8. `wilderness_08_manna_morning`
9. `wilderness_09_measure_test`
10. `wilderness_10_sabbath_instruction`
11. `wilderness_11_sabbath_field`
12. `wilderness_12_rephidim_no_water`
13. `wilderness_13_massah_meribah`
14. `wilderness_14_rock_command`
15. `wilderness_15_water_from_rock`
16. `wilderness_16_wilderness_memory`
17. `wilderness_17_sinai_arrival`
18. `wilderness_18_covenant_offer`
19. `wilderness_19_thunder_and_fear`
20. `wilderness_20_waiting_for_moses`
21. `wilderness_21_pressure_for_visible_god`
22. `wilderness_22_golden_calf_made`
23. `wilderness_23_feast_before_calf`
24. `wilderness_24_broken_tablets`
25. `wilderness_25_intercession_after_judgment`
26. `wilderness_26_covenant_remembered`

### 기존 광야 배드엔딩 확인

- `bad_wilderness_bitter_murmur`
- `bad_rotten_manna`
- `bad_sabbath_rebellion`
- `bad_massah_meribah`

### 확장 광야 배드엔딩 확인

- `bad_golden_calf_leader`
- `bad_idol_feast`
- `bad_covenant_broken`
- `bad_return_to_idols`

### 기존 광야 엔딩 확인

기존 16노드 엔딩이 직접 노출되지 않도록 구조가 바뀌었다면, 사용하지 않아도 된다. 다만 엔딩 데이터가 남아 있어도 오류를 내지 않아야 한다.

- `true_wilderness_daily_trust`
- `faithful_wilderness_witness`
- `wounded_wilderness_witness`

### 확장 광야 최종 엔딩 확인

- `true_wilderness_covenant_witness`
- `faithful_wilderness_covenant_memory`
- `wounded_wilderness_covenant_witness`

### 이미지 확인

- 1–26번 모든 노드에서 빈 이미지가 나오지 않음.
- 1–26번 모든 노드에서 출애굽/여리고 이미지가 나오지 않음.
- 11/12/13/14/16번 노드의 파일명 불일치 보정이 작동.
- 17–26번 후반부 이미지 표시.
- 확장 엔딩 7개 이미지 표시.
- 콘솔 404 오류 없음.

---

## 5. Part I. 3장 여리고 QA

### 진입

- 홈 → Part I → 3장 여리고 클릭.
- 홈 카드 상태가 준비 중이 아니라 플레이 가능 상태로 전환되어 있음.
- 첫 노드가 `jericho_01_jordan_edge`로 시작.
- 여리고 이미지가 표시.
- 출애굽/광야 이미지가 나오지 않음.

### 전체 진행 확인

아래 노드가 정상적으로 진행되는지 확인한다.

1. `jericho_01_jordan_edge`
2. `jericho_02_spies_sent`
3. `jericho_03_waiting_news`
4. `jericho_04_rahab_report`
5. `jericho_05_red_cord_promise`
6. `jericho_06_report_to_joshua`
7. `jericho_07_before_wall`
8. `jericho_08_commander_presence`
9. `jericho_09_strange_command`
10. `jericho_10_first_march`
11. `jericho_11_second_to_fifth_days`
12. `jericho_12_sixth_day_weariness`
13. `jericho_13_seventh_day_dawn`
14. `jericho_14_seven_rounds`
15. `jericho_15_shout_command`
16. `jericho_16_wall_falls`
17. `jericho_17_red_cord_saved`
18. `jericho_18_memory_after_fall`

### 여리고 배드엔딩 확인

- `bad_jericho_forgot_red_cord`
- `bad_jericho_broken_silence`
- `bad_jericho_silent_retreat`
- `bad_jericho_devoted_things`

### 여리고 최종 엔딩 확인

- `true_jericho_faithful_witness`
- `faithful_jericho_memory_keeper`
- `wounded_jericho_trembling_witness`

### 이미지 확인

- 1–18번 모든 노드에서 빈 이미지가 나오지 않음.
- 1–18번 모든 노드에서 출애굽/광야 이미지가 나오지 않음.
- 플레이 이미지는 `assets/images/story/jericho/play_left_520x650/` 경로에서 표시됨.
- 엔딩 이미지는 `assets/images/story/jericho/original_16x9/` 경로에서 표시됨.
- 여리고 엔딩 7개 이미지 표시.
- 콘솔 404 오류 없음.

---

## 6. 플레이 화면 공통 QA

- 제목과 본문이 겹치지 않음.
- 본문이 패널 밖으로 넘치지 않음.
- 선택지 텍스트가 버튼 영역을 심하게 벗어나지 않음.
- 선택지 선택 전 진행 버튼 비활성.
- 선택지 선택 후 진행 버튼 활성.
- 다음 이야기 버튼 정상 작동.
- 홈 버튼 정상 작동.
- 좌측 일러스트가 지나치게 어둡거나 잘리지 않음.
- 모바일 가로 화면에서 주요 정보가 보임.

---

## 7. 엔딩 화면 공통 QA

- 엔딩 배경 이미지 표시.
- 엔딩 패널이 배경을 과도하게 가리지 않음.
- 제목, 설명, 결과 요약, 버튼이 읽힘.
- 다시 도전 버튼 작동.
- 처음으로 버튼 작동.
- 성경구절 영역이 화면 밖으로 나가지 않음.

---

## 8. 콘솔 오류 QA

브라우저 개발자도구에서 다음을 확인한다.

- JS 런타임 오류 없음.
- 이미지 404 없음.
- CSS 404 없음.
- 저장 관련 오류 없음.
- 무한 렌더링 또는 메모리 급증 없음.

---

## 9. 완료 판정 문구

모든 항목을 통과하면 다음 문구로 보고한다.

```text
Part I. 1장 출애굽, Part I. 2장 광야, Part I. 3장 여리고 최종 QA 통과.
validator error 0개.
주요 루트, 배드엔딩, 최종 엔딩, 이미지 표시, 홈 기능, 콘솔 오류 검수 완료.
다음 챕터 제작 착수 가능.
```

하나라도 실패하면 완료 판정을 내리지 않는다.
