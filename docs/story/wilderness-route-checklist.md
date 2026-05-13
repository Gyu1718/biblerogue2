# Part I. 2장 「광야」 Route Checklist

## 구현 범위

- 성경 범위: 출애굽기 15:22–17:7
- 플레이어 위치: 모세가 아닌 광야 공동체 안의 이름 없는 증인
- 구현 파일: `src/data/wildernessStructurePatch.js`
- 엔딩 추가 파일: `src/data/endings.js`
- UI, CSS, `main.js`, `responsive.js`는 수정하지 않음

## 노드 구성

총 16개 노드로 구성함.

1. `wilderness_01_marah_thirst` — 물이 없는 사흘 / 출 15:22–23
2. `wilderness_02_bitter_water` — 쓴 물 앞에서 / 출 15:23–24
3. `wilderness_03_tree_healing` — 나무가 던져진 물 / 출 15:25–26
4. `wilderness_04_elim_rest` — 열두 샘과 일흔 종려 / 출 15:27
5. `wilderness_05_sin_hunger` — 고기 가마의 기억 / 출 16:1–3
6. `wilderness_06_promised_bread` — 하늘에서 내릴 양식 / 출 16:4–12
7. `wilderness_07_quail_evening` — 저녁의 메추라기 / 출 16:13
8. `wilderness_08_manna_morning` — 이것이 무엇이냐 / 출 16:14–18
9. `wilderness_09_measure_test` — 남지도 모자라지도 않게 / 출 16:16–21
10. `wilderness_10_sabbath_instruction` — 두 배로 거두는 날 / 출 16:22–26
11. `wilderness_11_sabbath_morning` — 아무것도 없는 들판 / 출 16:27–30
12. `wilderness_12_rephidim_thirst` — 르비딤의 물 없음 / 출 17:1
13. `wilderness_13_quarrel_rises` — 왜 우리를 올라오게 했느냐 / 출 17:2–4
14. `wilderness_14_before_rock` — 반석 앞에 선 장로들 / 출 17:5–6
15. `wilderness_15_water_from_rock` — 반석에서 흐른 물 / 출 17:6
16. `wilderness_16_massah_memory` — 우리 중에 계신가 / 출 17:7

## 핵심 사건 반영 여부

- 마라의 쓴 물: 1–3번 노드
- 엘림의 쉼: 4번 노드
- 만나와 메추라기: 5–9번 노드
- 안식일과 만나: 10–11번 노드
- 르비딤의 물 없음: 12–13번 노드
- 반석의 물: 14–16번 노드

## 선택지 구조

- 모든 노드는 선택지 3개를 가짐.
- 대부분의 선택지는 누적 위험형으로 구성함.
- 일부 선택지는 즉시 배드엔딩으로 연결함.

## 즉시 배드엔딩

1. `wilderness_02_bitter_water`
   - 선택지: `turn_crowd_against_moses`
   - 엔딩: `bad_wilderness_bitter_murmur`
   - 의미: 쓴 물 앞에서 질문이 원망과 공동체 분열로 굳어짐.

2. `wilderness_08_manna_morning`
   - 선택지: `secretly_overgather`
   - 엔딩: `bad_rotten_manna`
   - 의미: 날마다 공급하시는 하나님보다 저장과 불안을 신뢰함.

3. `wilderness_11_sabbath_morning`
   - 선택지: `lead_sabbath_search`
   - 엔딩: `bad_sabbath_rebellion`
   - 의미: 안식일의 말씀을 듣고도 빈 들판을 뒤지는 불순종.

4. `wilderness_13_quarrel_rises`
   - 선택지: `pick_up_stones`
   - 엔딩: `bad_massah_meribah`
   - 의미: 물 없음의 시험이 폭력과 하나님 시험으로 굳어짐.

## 누적 위험형 선택

다음 효과를 누적 위험으로 사용함.

- `fear`: 결핍 앞에서 공포가 커짐
- `delay`: 말씀 앞에서 지체함
- `scatter`: 공동체가 흩어짐
- `trust`: 하나님 공급에 대한 신뢰
- `community`: 약한 사람을 돌보고 함께 걷는 힘
- `discernment`: 사건을 분별하는 힘
- `memory`: 이전 은혜를 현재 결핍 앞에서 기억하는 힘

## 최종 엔딩 구조

최종 노드 `wilderness_16_massah_memory`에서 다음 세 엔딩으로 직접 연결함.

- True: `true_wilderness_daily_trust`
- Good: `faithful_wilderness_witness`
- Mixed: `wounded_wilderness_witness`

즉시 배드엔딩은 위 4개를 사용함.

## 도달 가능성

- 시작 노드: `wilderness_01_marah_thirst`
- 마지막 분기 노드: `wilderness_16_massah_memory`
- True / Good / Mixed 엔딩은 마지막 노드의 각 선택지로 직접 도달 가능함.
- Bad 엔딩은 중간 위험 선택지에서 즉시 도달 가능함.

## 주의 사항

현재 `main.js`는 `START_NODE_ID`를 기본적으로 `exodus_01_slave_day`로 사용하고, `endingResolver: 'exodus'`만 처리함. 따라서 광야는 다음 UI/라우팅 패치에서 홈 카드 또는 별도 시작 루틴을 통해 `window.WILDERNESS_START_NODE_ID` 또는 `wilderness_01_marah_thirst`로 진입하도록 연결해야 함.

이번 작업에서는 요청 범위에 따라 홈 카드 진입, `main.js` resolver 확장, 이미지 매핑은 수정하지 않음.
