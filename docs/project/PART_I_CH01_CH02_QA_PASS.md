# Part I. 1장 「출애굽」 및 2장 「광야」 QA 통과 기록

이 문서는 BibleRogue2 Part I. 1장 「출애굽」과 Part I. 2장 「광야」의 최종 QA 통과 상태를 공식 기록하기 위한 문서이다.

---

## 1. 통과 판정

```text
Part I. 1장 「출애굽」: QA 통과
Part I. 2장 「광야」: QA 통과
```

총괄 판정:

```text
Part I. 1장과 2장은 현재 기준으로 플레이 가능한 완성 챕터로 인정한다.
다음 챕터 제작 착수 가능.
```

---

## 2. 기준 문서

본 QA 통과 판정은 다음 공식 문서를 기준으로 한다.

- `docs/project/OFFICIAL_PROJECT_STATE.md`
- `docs/project/CHAT_HANDOFF_PROTOCOL.md`
- `docs/project/CHAPTER_IMPLEMENTATION_PROTOCOL.md`
- `docs/project/QA_RELEASE_CHECKLIST.md`

---

## 3. 출애굽 QA 통과 범위

Part I. 1장 「출애굽」은 다음 항목을 통과한 것으로 기록한다.

- 홈 화면에서 출애굽 챕터 진입 가능.
- 출애굽 스토리 정상 출력.
- 출애굽 플레이 이미지 정상 출력.
- 출애굽 주요 루트 진행 가능.
- 출애굽 배드엔딩 진입 가능.
- 출애굽 최종 엔딩 진입 가능.
- 출애굽 엔딩 이미지 표시 가능.
- 광야 이미지가 출애굽 챕터에 잘못 출력되지 않음.

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

---

## 4. 광야 QA 통과 범위

Part I. 2장 「광야」는 다음 항목을 통과한 것으로 기록한다.

- 홈 화면에서 광야 챕터 진입 가능.
- 광야 시작 노드 `wilderness_01_marah_thirst` 정상 진입.
- 광야 26노드 확장 구조 정상 진행.
- 전반부 광야 이미지 정상 출력.
- 후반부 시내산/금송아지 이미지 정상 출력.
- 전반부 파일명 불일치 보정 이미지 정상 출력.
- 광야 배드엔딩 진입 가능.
- 광야 확장 최종 엔딩 진입 가능.
- 광야 엔딩 이미지 표시 가능.
- 출애굽 이미지가 광야 챕터에 잘못 출력되지 않음.

광야 노드 범위:

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

## 5. 현재 공식 완료 상태

```text
Part I. 1장 출애굽: 완료
Part I. 2장 광야: 완료
홈 Part I–VI 구조: 1차 완료
챕터 런타임 구조: 1차 완료
다음 제작 대상: Part I. 3장 여리고
```

---

## 6. 다음 챕터 착수 조건

Part I. 3장 「여리고」 제작은 다음 공식 문서를 기준으로 착수한다.

- `docs/project/CHAPTER_IMPLEMENTATION_PROTOCOL.md`
- `docs/project/CHAT_HANDOFF_PROTOCOL.md`
- `docs/project/OFFICIAL_PROJECT_STATE.md`

여리고 착수 시 우선 확정할 것:

```text
챕터명: Part I. 3장 「여리고」
node prefix: jericho_
chapterKey: jericho
시작 노드 예비명: jericho_01_jordan_edge 또는 jericho_01_before_jordan
플레이 이미지 경로: assets/images/story/jericho/play_left_520x650/
엔딩 이미지 경로: assets/images/story/jericho/original_16x9/
```

---

## 7. 주의 사항

1. 다음 챕터를 만들 때 출애굽과 광야 파일을 임의 수정하지 않는다.
2. 새 챕터는 반드시 고유 node prefix를 사용한다.
3. 새 챕터 이미지는 반드시 고유 chapterKey 폴더를 사용한다.
4. `responsive.js`에는 챕터 로직을 넣지 않는다.
5. 새 챕터 등록은 `chapter-runtime.js` 기준으로 한다.
6. 완료 판정은 항상 `QA_RELEASE_CHECKLIST.md` 기준으로 한다.
