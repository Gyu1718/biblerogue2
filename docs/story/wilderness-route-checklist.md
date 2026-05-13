# Wilderness Route Checklist

## Scope

Part I. 2장 「광야」는 하나의 챕터 안에서 기존 출애굽기 15:22–17:7 흐름을 유지하고, 출애굽기 19–32장의 시내산 언약과 금송아지 사건까지 확장한다.

## Node count

- Target total: 26 nodes
- Prefix: `wilderness_`
- Start node: `wilderness_01_marah_thirst`
- Final node: `wilderness_26_covenant_remembered`

## Existing front-half flow retained

1. `wilderness_01_marah_thirst` — 출애굽기 15:22–23, 물이 없는 사흘
2. `wilderness_02_bitter_water` — 출애굽기 15:23–24, 마라의 쓴 물
3. `wilderness_03_tree_healing` — 출애굽기 15:25–26, 쓴 물이 단물이 됨
4. `wilderness_04_elim_rest` — 출애굽기 15:27, 엘림의 쉼
5. `wilderness_05_sin_hunger` — 출애굽기 16:1–3, 애굽의 고기 가마 기억
6. `wilderness_06_promised_bread` — 출애굽기 16:4–12, 하늘 양식의 약속
7. `wilderness_07_quail_evening` — 출애굽기 16:13, 메추라기
8. `wilderness_08_manna_morning` — 출애굽기 16:14–18, 만나
9. `wilderness_09_measure_test` — 출애굽기 16:16–21, 하루치 양식
10. `wilderness_10_sabbath_instruction` — 출애굽기 16:22–26, 안식일 준비
11. `wilderness_11_sabbath_field` — 출애굽기 16:27–30, 빈 들판
12. `wilderness_12_rephidim_no_water` — 출애굽기 17:1, 르비딤의 물 없음
13. `wilderness_13_massah_meribah` — 출애굽기 17:2–4, 맛사와 므리바
14. `wilderness_14_rock_command` — 출애굽기 17:5–6, 반석 앞 명령
15. `wilderness_15_water_from_rock` — 출애굽기 17:6, 반석의 물
16. `wilderness_16_wilderness_memory` — 출애굽기 17:7; 19:1–2, 시내산으로 이어지는 기억

## New Sinai and golden calf flow

17. `wilderness_17_sinai_arrival` — 출애굽기 19:1–2, 시내산 도착
18. `wilderness_18_covenant_offer` — 출애굽기 19:3–8, 언약의 제안
19. `wilderness_19_thunder_and_fear` — 출애굽기 19:16–20; 20:18–21, 두려운 계시
20. `wilderness_20_waiting_for_moses` — 출애굽기 24:12–18; 32:1, 모세의 부재와 기다림
21. `wilderness_21_pressure_for_visible_god` — 출애굽기 32:1–2, 보이는 신을 요구하는 압력
22. `wilderness_22_golden_calf_made` — 출애굽기 32:2–4, 금송아지 제작
23. `wilderness_23_feast_before_calf` — 출애굽기 32:5–6, 우상 앞의 축제
24. `wilderness_24_broken_tablets` — 출애굽기 32:7–20, 모세의 하산과 돌판 파괴
25. `wilderness_25_intercession_after_judgment` — 출애굽기 32:21–35, 회개와 중보
26. `wilderness_26_covenant_remembered` — 출애굽기 32:31–35, 언약 기억의 마무리

## Key route requirement

`wilderness_16_wilderness_memory` has choices that route to `wilderness_17_sinai_arrival`, preserving the front-half route and extending the same chapter into the Sinai/golden calf sequence.

## Added bad endings

- `bad_golden_calf_leader`
- `bad_idol_feast`
- `bad_covenant_broken`
- `bad_return_to_idols`

## Added final endings

- `true_wilderness_covenant_witness`
- `faithful_wilderness_covenant_memory`
- `wounded_wilderness_covenant_witness`

## Story constraints

- The player is not Moses.
- The player does not stop the golden calf event as a hero.
- The player remains an unnamed witness in the camp below Sinai.
- Choices focus on community reaction: fear, waiting, pressure, visible-god desire, idolatry rationalization, repentance, and witness.
- Explicit leadership in idolatry or active idol-feast participation can trigger immediate bad endings.
- Hesitation, fear, and woundedness can continue into mixed/faithful paths instead of always causing immediate failure.
