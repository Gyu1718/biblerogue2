# biblerogue2 Play UI Asset Pack

이 ZIP은 플레이 화면에 바로 붙일 수 있도록 정리한 PNG 에셋 팩입니다.

## 폴더 구조
- assets/ui/play/icons : 개별 아이콘
- assets/ui/play/frames : 패널/버튼/프레임
- assets/ui/play/ornaments : 장식선/바/코너/마커
- assets/ui/play/portraits : 증인단 초상화 4종
- assets/ui/play/source : 원본 시트 보관
- assets/ui/play/css/play-ui-assets.css : 현재 프로젝트용 보조 CSS

## 바로 적용 방법
1. ZIP을 리포지토리 루트에 압축 해제합니다.
2. index.html에서 src/play.css 뒤에 아래 CSS를 추가합니다.
   <link rel="stylesheet" href="assets/ui/play/css/play-ui-assets.css" />
3. 필요하면 src/play.css 안의 문자 아이콘을 이 PNG로 교체합니다.

## 주의
- 원본이 시트 이미지였기 때문에 일부 자동 크롭 자산은 미세 여백 조정이 필요할 수 있습니다.
- play-ui-assets.css는 출발점용입니다. 위치/크기 미세 조정은 프로젝트 화면에서 확인 후 맞추는 것이 좋습니다.


## v2 업데이트
- 상단 네비 아이콘 PNG 치환
- 선택지 5종 아이콘 PNG 치환
- 증인단 직업 아이콘 PNG 치환
- 진행 점/하단 슬롯/달/텐트/화살표 치환
- 이야기 기록 줄 아이콘 장식 추가
