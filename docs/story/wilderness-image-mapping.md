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

## 현재 런타임 확인 결과

2026-05-13 확인 기준, `main.js`의 현재 이미지 처리 로직은 다음 상수를 사용한다.

```js
const PLAY_ART_BASE = 'assets/images/story/exodus/play_left_520x650';
const ENDING_ART_BASE = 'assets/images/story/exodus/original_16x9';
```

또한 `updateSceneArt(node)`는 `node.image`가 있을 때 다음 방식으로 경로를 만든다.

```js
const explicitImage = node.image ? `${PLAY_ART_BASE}/${node.image}` : null;
```

`updateEndingArt(profile)`도 `profile.image`가 있을 때 다음 방식으로 경로를 만든다.

```js
const explicitImage = profile.image ? `${ENDING_ART_BASE}/${profile.image}` : null;
```

따라서 현재 상태에서 광야 노드와 광야 엔딩에 단순히 `image` 필드만 추가하면 런타임은 다음처럼 잘못된 경로를 찾게 된다.

```text
assets/images/story/exodus/play_left_520x650/wilderness_01_marah_thirst.png
assets/images/story/exodus/original_16x9/true_wilderness_daily_trust.png
```

실제 광야 이미지 경로는 다음이어야 한다.

```text
assets/images/story/wilderness/play_left_520x650/wilderness_01_marah_thirst.png
assets/images/story/wilderness/original_16x9/true_wilderness_daily_trust.png
```

그러므로 `main.js` 수정이 금지된 현재 작업 범위에서는 `src/data/wildernessStructurePatch.js`와 `src/data/endings.js`에 `image` 필드를 추가하지 않는 것이 안전하다. 이미지 필드 연결은 `main.js`가 chapter별 image base를 지원하도록 별도 패치된 뒤 진행해야 한다.

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

## 이미지 존재 확인 기록

대표 파일 기준으로 다음 파일이 `main`에서 확인되었다.

- 플레이 이미지 시작 파일: `assets/images/story/wilderness/play_left_520x650/wilderness_01_marah_thirst.png`
- 플레이 이미지 중간 파일: `assets/images/story/wilderness/play_left_520x650/wilderness_02_bitter_water.png`
- 플레이 이미지 마지막 파일: `assets/images/story/wilderness/play_left_520x650/wilderness_16_massah_memory.png`
- 엔딩 이미지 시작 파일: `assets/images/story/wilderness/original_16x9/true_wilderness_daily_trust.png`
- 엔딩 이미지 마지막 파일: `assets/images/story/wilderness/original_16x9/bad_massah_meribah.png`

## 연결 작업 규칙

이미지 필드 연결은 다음 조건이 충족된 뒤 수행한다.

1. `main.js`가 출애굽 고정 경로가 아니라 chapter별 image base를 지원해야 한다.
2. 광야 플레이 노드는 `assets/images/story/wilderness/play_left_520x650/{node.image}`를 바라보아야 한다.
3. 광야 엔딩은 `assets/images/story/wilderness/original_16x9/{ending.image}`를 바라보아야 한다.
4. 그 이후 `src/data/wildernessStructurePatch.js`의 각 광야 노드 객체에 `image` 필드를 추가한다.
5. 그 이후 `src/data/endings.js`의 광야 엔딩 객체에 `image` 필드를 추가한다.
6. 기존 `choices`, `effects`, `next`, `ending` 구조는 수정하지 않는다.
7. 엔딩의 `type`, `title`, `scripture`, `reference`, `description`은 수정하지 않는다.
8. 이미지 경로 전체가 아니라 파일명만 입력한다.

## 보류 사유

이번 단계에서는 이미지 대표 파일이 업로드된 것을 확인했지만, `image` 필드는 아직 연결하지 않는다.

보류 사유는 이미지 존재 문제가 아니라 런타임 경로 문제이다. 현재 `main.js`는 `node.image`와 `ending.image`를 모두 출애굽 이미지 폴더 아래에서 찾는다. 그러므로 story data에 광야 이미지 파일명만 넣으면 잘못된 경로가 생성된다.

따라서 `main.js`의 chapter별 이미지 베이스 패치가 완료된 뒤, 본 문서의 매핑표를 기준으로 `image` 필드를 추가해야 한다.
