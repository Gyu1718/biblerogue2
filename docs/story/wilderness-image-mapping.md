# Part I. 2장 「광야」 Image Mapping

## 목적

이 문서는 Part I. 2장 「광야」의 story node와 ending에 연결할 이미지 파일명을 관리하기 위한 매핑표이다.

- 플레이 노드 이미지는 `node.image` 필드에 파일명만 기록한다.
- 엔딩 이미지는 `ending.image` 필드에 파일명만 기록한다.
- 실제 경로 조합은 런타임의 이미지 베이스 경로 규칙을 따른다.
- UI, CSS, `main.js`, `responsive.js`는 수정하지 않는다.

## 경로 규칙

플레이 노드 이미지 기준 경로:

```text
assets/images/story/wilderness/play_left_520x650/{node.image}
```

엔딩 이미지 기준 경로:

```text
assets/images/story/wilderness/original_16x9/{ending.image}
```

## 플레이 노드 이미지 매핑

| Node ID | Image filename | Expected path |
|---|---|---|
| `wilderness_01_marah_thirst` | `wilderness_01_marah_thirst.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_01_marah_thirst.png` |
| `wilderness_02_bitter_water` | `wilderness_02_bitter_water.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_02_bitter_water.png` |
| `wilderness_03_tree_healing` | `wilderness_03_tree_healing.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_03_tree_healing.png` |
| `wilderness_04_elim_rest` | `wilderness_04_elim_rest.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_04_elim_rest.png` |
| `wilderness_05_sin_hunger` | `wilderness_05_sin_hunger.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_05_sin_hunger.png` |
| `wilderness_06_promised_bread` | `wilderness_06_promised_bread.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_06_promised_bread.png` |
| `wilderness_07_quail_evening` | `wilderness_07_quail_evening.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_07_quail_evening.png` |
| `wilderness_08_manna_morning` | `wilderness_08_manna_morning.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_08_manna_morning.png` |
| `wilderness_09_measure_test` | `wilderness_09_measure_test.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_09_measure_test.png` |
| `wilderness_10_sabbath_instruction` | `wilderness_10_sabbath_instruction.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_10_sabbath_instruction.png` |
| `wilderness_11_sabbath_morning` | `wilderness_11_sabbath_morning.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_11_sabbath_morning.png` |
| `wilderness_12_rephidim_thirst` | `wilderness_12_rephidim_thirst.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_12_rephidim_thirst.png` |
| `wilderness_13_quarrel_rises` | `wilderness_13_quarrel_rises.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_13_quarrel_rises.png` |
| `wilderness_14_before_rock` | `wilderness_14_before_rock.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_14_before_rock.png` |
| `wilderness_15_water_from_rock` | `wilderness_15_water_from_rock.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_15_water_from_rock.png` |
| `wilderness_16_massah_memory` | `wilderness_16_massah_memory.png` | `assets/images/story/wilderness/play_left_520x650/wilderness_16_massah_memory.png` |

## 엔딩 이미지 매핑

| Ending ID | Image filename | Expected path |
|---|---|---|
| `true_wilderness_daily_trust` | `true_wilderness_daily_trust.png` | `assets/images/story/wilderness/original_16x9/true_wilderness_daily_trust.png` |
| `faithful_wilderness_witness` | `faithful_wilderness_witness.png` | `assets/images/story/wilderness/original_16x9/faithful_wilderness_witness.png` |
| `wounded_wilderness_witness` | `wounded_wilderness_witness.png` | `assets/images/story/wilderness/original_16x9/wounded_wilderness_witness.png` |
| `bad_wilderness_bitter_murmur` | `bad_wilderness_bitter_murmur.png` | `assets/images/story/wilderness/original_16x9/bad_wilderness_bitter_murmur.png` |
| `bad_rotten_manna` | `bad_rotten_manna.png` | `assets/images/story/wilderness/original_16x9/bad_rotten_manna.png` |
| `bad_sabbath_rebellion` | `bad_sabbath_rebellion.png` | `assets/images/story/wilderness/original_16x9/bad_sabbath_rebellion.png` |
| `bad_massah_meribah` | `bad_massah_meribah.png` | `assets/images/story/wilderness/original_16x9/bad_massah_meribah.png` |

## 연결 작업 규칙

이미지가 `main`에 반영된 것이 확인된 뒤 다음 작업을 수행한다.

1. `src/data/wildernessStructurePatch.js`의 각 광야 노드 객체에 `image` 필드를 추가한다.
2. `src/data/endings.js`의 광야 엔딩 객체에 `image` 필드를 추가한다.
3. 기존 `choices`, `effects`, `next`, `ending` 구조는 수정하지 않는다.
4. 엔딩의 `type`, `title`, `scripture`, `reference`, `description`은 수정하지 않는다.
5. 이미지 경로 전체가 아니라 파일명만 입력한다.

## 이미지 존재 확인 기록

대표 파일 기준으로 다음 파일이 `main`에서 확인되었다.

- 플레이 이미지 시작 파일: `assets/images/story/wilderness/play_left_520x650/wilderness_01_marah_thirst.png`
- 플레이 이미지 마지막 파일: `assets/images/story/wilderness/play_left_520x650/wilderness_16_massah_memory.png`
- 엔딩 이미지 시작 파일: `assets/images/story/wilderness/original_16x9/true_wilderness_daily_trust.png`
- 엔딩 이미지 마지막 파일: `assets/images/story/wilderness/original_16x9/bad_massah_meribah.png`

따라서 본 문서 작성 이후 `image` 필드 연결을 진행할 수 있다.
