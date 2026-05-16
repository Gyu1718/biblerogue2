# 출애굽 1장 10재앙 완전 구현 루트 QA 체크리스트

이 문서는 1장 「출애굽」의 10재앙 전체 구현 루트, 이미지 연결, 엔딩 도달 가능성, 즉시 배드엔딩 설계, 보이지 않는 위험도 시스템을 검수하기 위한 기준 문서이다.

검수 대상:

- `src/data/exodusStructurePatch.js`
- `src/data/endings.js`
- `tools/validate-story.js`

검수 제외:

- `src/main.js`
- `src/responsive.js`
- `src/post-cleanup.js`
- `index.html`
- CSS 파일 전체
- `assets/images/**`
- `assets/ui/**`

---

## 1. 필수 사전 검수

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

---

## 2. 전체 흐름 체크

아래 순서가 실제 플레이에서 유지되는지 확인한다.

```text
exodus_01_slave_day
→ exodus_02_whisper
→ exodus_03_pharaoh
→ exodus_03b_crushed_workers
→ exodus_04_plague_begin
→ exodus_04a_water_to_blood
→ exodus_04b_frogs
→ exodus_04c_gnats
→ exodus_04d_flies
→ exodus_05_set_apart
→ exodus_05a_livestock_death
→ exodus_05b_boils
→ exodus_05c_hail
→ exodus_05d_locusts
→ exodus_06a_darkness
→ exodus_06_darkness
→ exodus_06b_firstborn_warning
→ exodus_06c_passover_instruction
→ exodus_07_passover
→ exodus_07b_passover_meal
→ exodus_08_departure
→ exodus_08b_hasty_departure
→ exodus_09_wilderness_edge
→ exodus_09c_chariots_approach
→ exodus_09b_people_panic
→ exodus_10_redsea
→ exodus_10b_care_branch 또는 exodus_10c_discern_branch
→ exodus_10d_pillar_between
→ exodus_10e_night_of_fear
→ exodus_11_crossing
→ exodus_11b_last_steps
→ exodus_12b_song_of_shore
→ exodus_12_deliverance
→ endingResolver: exodus
```

---

## 3. 10재앙 구현 체크

| 재앙 | 노드 ID | 이미지 파일 | 체크 기준 |
|---:|---|---|---|
| 1 | `exodus_04a_water_to_blood` | `exodus_04a_water_to_blood.png` | 나일이 피로 변하는 첫 표지가 체감되는가 |
| 2 | `exodus_04b_frogs` | `exodus_04b_frogs.png` | 개구리가 생활공간 안으로 들어오는 압박이 드러나는가 |
| 3 | `exodus_04c_gnats` | `exodus_04c_gnats.png` | 애굽 술객의 한계와 하나님의 권능이 드러나는가 |
| 4 | `exodus_04d_flies` | `exodus_04d_flies.png` | 고센의 구별이 체감되는가 |
| 5 | `exodus_05a_livestock_death` | `exodus_05a_livestock_death.png` | 가축 죽음이 경제·생존 기반 붕괴로 드러나는가 |
| 6 | `exodus_05b_boils` | `exodus_05b_boils.png` | 몸에 닿은 재앙의 고통이 드러나는가 |
| 7 | `exodus_05c_hail` | `exodus_05c_hail.png` | 우박과 불의 장엄한 심판이 드러나는가 |
| 8 | `exodus_05d_locusts` | `exodus_05d_locusts.png` | 남은 것마저 사라지는 위기가 드러나는가 |
| 9 | `exodus_06a_darkness` | `exodus_06a_darkness.png` | 빛과 어둠의 분리가 드러나는가 |
| 10 | `exodus_06b_firstborn_warning` | `exodus_06b_firstborn_warning.png` | 장자 재앙 전 마지막 경고와 유월절 준비가 연결되는가 |

---

## 4. 보이지 않는 위험도 시스템 검수

`main.js`에는 이미 다음 상태값이 존재한다.

```text
trust
fear
community
discernment
memory
delay
scatter
```

최종 `endingResolver: 'exodus'`는 이 상태값을 기준으로 엔딩을 판정한다.

```text
trust >= 4 && community >= 3 && memory >= 3
→ true_exodus_deliverance

fear >= 4 || scatter >= 3 || delay >= 3
→ wounded_exodus_witness

그 외
→ faithful_exodus_witness
```

검수 기준:

- 좋은 선택은 `trust`, `memory`, `community`를 충분히 쌓아야 한다.
- 흔들림 선택은 `fear`, `delay`, `scatter`를 누적해야 한다.
- 재앙 관찰/해석 구간의 나쁜 선택은 즉시 배드엔딩이 아니라 위험도 누적으로 처리한다.
- 유월절 표지 거부, 애굽 회귀, 공동체 붕괴, 열린 홍해 길 앞 최종 지체는 즉시 배드엔딩으로 처리한다.

위험도 누적형 선택 예시:

| 선택지 key | 기대 effects | 의도 |
|---|---|---|
| `wait_in_fear` | `fear +1`, `delay +1` | 두려움과 지체 누적 |
| `stop_hoping` | `fear +1`, `delay +1`, 가능하면 `trust -1` | 희망 포기 누적 |
| `boast_goshen` | `fear +1`, `delay +1`, 가능하면 `memory -1` | 구별을 교만으로 왜곡 |
| `mock_egyptians` | `community -1`, `fear +1` | 공동체성과 기억 손상 |
| `rumor_in_dark` | `fear +1`, `scatter +1` 또는 `delay +1` | 소문으로 공동체 분산 |
| `soften_warning` | `fear +1`, `delay +1` | 경고의 무게 약화 |
| `each_family_first` | `scatter +1`, `fear +1`, `community -1` | 각자도생 성향 누적 |
| `send_each_family` | `scatter +1`, `community -1` | 공동체 결속 약화 |
| `rush_without_looking_back` | `fear +1`, `scatter +1`, `community -1` | 해방을 개인 도망으로 축소 |
| `only_catch_breath` | `fear +1`, `delay +1` | 기억 없는 안도감 누적 |

테스트 루트 A — true 엔딩 기대:

```text
remember_and_trust 반복
→ teach_the_children
→ keep_households_together
→ answer_panic_with_memory
→ stand_and_watch
→ name_the_pillar
→ walk_by_word
→ name_the_memory
→ sing_the_lord
→ remember_for_children
```

기대 상태:

```text
trust >= 4
memory >= 3
community >= 3
```

테스트 루트 B — wounded 엔딩 기대:

```text
wait_in_fear 반복
→ rumor_in_dark
→ soften_warning
→ eat_in_silence_fear
→ each_family_first
→ send_each_family
→ rush_without_looking_back
→ only_catch_breath
→ remain_in_relief
```

기대 상태 중 하나 이상:

```text
fear >= 4
또는 delay >= 3
또는 scatter >= 3
```

테스트 루트 C — faithful 엔딩 기대:

```text
steady_the_people 중심
→ watch_darkness
→ ask_and_obey
→ keep_ready_to_move
→ read_distance
→ cross_in_pairs
→ wait_for_the_last
→ name_the_people
→ remember_names
```

기대 상태:

```text
true 조건에는 조금 부족하지만 wounded 조건에도 걸리지 않음
→ faithful_exodus_witness
```

---

## 5. 즉시 배드엔딩과 누적형 실패 구분

설계 원칙:

- 재앙 관찰/해석 구간의 두려움, 지체, 냉소 선택은 누적형 실패로 둔다.
- 생존 조건, 언약 표지, 해방 거부, 공동체 붕괴, 열린 길 앞 지체는 즉시 배드엔딩으로 보낸다.
- 모든 나쁜 선택을 즉시 배드엔딩으로 보내지 않는다.

즉시 배드엔딩이어야 하는 선택:

| 노드 | 선택지 key | 엔딩 | 이유 |
|---|---|---|---|
| `exodus_03_pharaoh` | `submit_to_egypt` | `bad_bricks_forever` | 애굽의 질서에 머무는 선택 |
| `exodus_06c_passover_instruction` | `delay_the_marking` | `bad_unmarked_door` | 생명 표지인 유월절 표지를 미루는 선택 |
| `exodus_07_passover` | `ignore_mark` | `bad_unmarked_door` | 유월절 표지를 가볍게 여기는 선택 |
| `exodus_08_departure` | `stay_for_safety` | `bad_stayed_in_egypt` | 떠남의 부름을 거부하고 애굽에 남는 선택 |
| `exodus_09_wilderness_edge` | `turn_back_to_egypt` | `bad_return_to_egypt` | 애굽으로 돌아가려는 선택 |
| `exodus_09c_chariots_approach` | `run_before_others` | `bad_scattered_people` | 공동체를 흩뜨리고 각자도생하는 선택 |
| `exodus_09b_people_panic` | `join_the_complaint` | `bad_return_to_egypt` | 애굽의 안정이 낫다고 동조하는 선택 |
| `exodus_10_redsea` | `wait_until_certain` | `bad_closed_sea` | 열린 길 앞에서 순종의 때를 놓치는 선택 |
| `exodus_10d_pillar_between` | `hide_until_morning` | `bad_closed_sea` | 보호를 멈춤의 핑계로 바꾸는 선택 |
| `exodus_10e_night_of_fear` | `freeze_before_walls` | `bad_closed_sea` | 열린 바다 앞에서 움직이지 않는 선택 |
| `exodus_11_crossing` | `freeze_between_walls` | `bad_closed_sea` | 바다 길 한가운데서 멈추는 선택 |

누적형 실패로 남길 수 있는 선택:

- `wait_in_fear`
- `boast_goshen`
- `mock_egyptians`
- `rumor_in_dark`
- `soften_warning`
- `each_family_first`
- `send_each_family`
- `rush_without_looking_back`
- `only_catch_breath`

---

## 6. 직접 배드엔딩 루트 체크

아래 엔딩이 실제 선택지에서 바로 도달되어야 한다.

```text
bad_bricks_forever
bad_unmarked_door
bad_stayed_in_egypt
bad_return_to_egypt
bad_scattered_people
bad_closed_sea
```

특히 `bad_unmarked_door`는 두 곳에서 도달 가능해야 한다.

```text
exodus_06c_passover_instruction.delay_the_marking
exodus_07_passover.ignore_mark
```

---

## 7. 좋은/혼합 엔딩 루트 체크

최종 노드 `exodus_12_deliverance`의 선택지는 `endingResolver: 'exodus'`를 유지한다.

```text
remember_for_children → endingResolver: exodus
remain_in_relief → endingResolver: exodus
remember_names → endingResolver: exodus
```

기대 결과:

- `true_exodus_deliverance`
- `faithful_exodus_witness`
- `wounded_exodus_witness`

---

## 8. 엔딩 이미지 체크

`src/data/endings.js`의 각 엔딩 객체에 다음 `image` 필드가 있어야 한다.

```text
true_exodus_deliverance.png
faithful_exodus_witness.png
wounded_exodus_witness.png
bad_bricks_forever.png
bad_unmarked_door.png
bad_stayed_in_egypt.png
bad_return_to_egypt.png
bad_scattered_people.png
bad_closed_sea.png
```

---

## 9. 완료 판정

출애굽 1장은 다음 조건을 만족할 때 “10재앙 완전 구현 1차 완료”로 판정한다.

```text
1. node tools/validate-story.js error 0개
2. 10가지 재앙 전체가 실제 플레이에서 순서대로 표시됨
3. 루트 A에서 true 또는 good 엔딩 도달
4. 루트 B에서 mixed 엔딩 도달
5. 직접 배드엔딩 6종 정상 진입
6. 마지막 exodus_12_deliverance에서 endingResolver: exodus 정상 작동
7. UI 파일과 responsive.js를 건드리지 않음
8. 홈 → 1장 → 10재앙 → 유월절 → 홍해 → 엔딩 루프가 멈춤 없이 작동
```
