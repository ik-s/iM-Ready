# 백신·골든타임 뒤로가기 및 브랜드 홈 링크 설계

## 목표

- 백신과 골든타임의 모든 앱 내부 화면에서 사용자가 현재 흐름의 이전 단계로 돌아갈 수 있게 한다.
- 공통 헤더 브랜드를 `iM Shield`에서 `iM Ready`로 변경한다.
- 로고와 브랜드명 전체를 홈 링크로 제공한다.
- 기존 화면 레이아웃, 하단 탭, 콘텐츠, 주요 CTA 동작은 유지한다.

## 공통 헤더

- `AppHeader`에 선택적 `backTo` 속성을 추가한다.
- `backTo`가 있으면 헤더 왼쪽에 Phosphor 아이콘 라이브러리의 왼쪽 화살표 버튼을 표시한다.
- 버튼의 접근 가능한 이름은 `이전 화면`으로 한다.
- 브랜드 마크와 `iM Ready` 텍스트를 하나의 버튼으로 묶고 누르면 `/home`으로 이동한다.
- 기존 알림 버튼은 오른쪽에 유지한다.
- 뒤로가기 버튼이 없는 홈 리포트에서도 브랜드 홈 링크는 동일하게 동작한다.

## 화면별 뒤로가기 경로

### 백신

| 현재 화면 | 뒤로가기 대상 |
| --- | --- |
| 공유 페이지 `/invites/phishing-challenge/:inviteCode` | 버튼 없음 — 외부 문자·초대 링크 진입점 |
| 서비스 소개 `/events/phishing-challenge/intro` | `/invites/phishing-challenge/demo` |
| 개인정보 동의 `/events/phishing-challenge/consent` | `/events/phishing-challenge/intro` |
| 훈련 설정 `/events/phishing-challenge/setup` | `/events/phishing-challenge/consent` |
| 문자 전용 훈련 경고 `/training/phishing/:trainingCode` | 버튼 없음 — 앱 외부 문자 링크 전용 화면 |

### 골든타임

| 현재 화면 | 뒤로가기 대상 |
| --- | --- |
| 골든타임 홈 `/golden-time` | `/home` |
| 대응 시작 `/golden-time/start` | `/golden-time` |
| 상황 파악 `/golden-time/assessment` | `/golden-time/start` |
| 지급정지 `/golden-time/payment-stop` | `/golden-time/assessment` |
| 후속절차 `/golden-time/follow-up` | `/golden-time/payment-stop` |
| 진행 중 사건 `/golden-time/incidents` | `/golden-time` |
| 사건 타임라인 `/golden-time/incidents/current` | `/golden-time/incidents` |
| 지난 기록 `/golden-time/history` | `/golden-time` |
| 기록 상세 `/golden-time/history/refund-report` | `/golden-time/history` |
| 훈련 복기 및 설정 `/golden-time/history/training-review` | `/golden-time/history` |

명시적 경로를 사용해 새 탭이나 직접 URL 접속에서도 예측 가능한 화면으로 이동하게 한다.

## 컴포넌트 구조

- `AppHeader`: 브랜드 홈 링크, 선택적 뒤로가기 버튼, 기존 알림 버튼을 담당한다.
- 백신 페이지: 각 페이지에서 `AppHeader backTo="..."`를 전달한다.
- `GoldenTimeShell`: 필수 `backTo`를 받아 내부 `AppHeader`에 전달한다.
- 개별 골든타임 페이지: 논리적 상위 경로를 `GoldenTimeShell`에 전달한다.

## 접근성과 상호작용

- 뒤로가기 버튼은 최소 40 × 40 px 터치 영역을 사용한다.
- 브랜드 홈 버튼은 `홈으로 이동`이라는 접근 가능한 이름을 제공한다.
- 아이콘은 장식 요소로 처리한다.
- 키보드와 스크린리더에서 버튼 역할과 목적을 확인할 수 있어야 한다.
- 경로 이동 시 기존 `ScrollToTop` 동작을 유지한다.

## 테스트

- 백신 소개·동의·설정 화면에 `이전 화면` 버튼이 존재하고 지정 경로로 이동하는지 검증한다.
- 골든타임 홈과 각 대표 분기 흐름에서 `이전 화면`이 논리적 상위 화면으로 이동하는지 검증한다.
- 공유 페이지와 문자 전용 경고 화면에는 앱 내부 뒤로가기 버튼이 없는지 검증한다.
- 모든 앱 헤더에 `iM Ready`가 표시되고 브랜드 버튼을 누르면 `/home`으로 이동하는지 검증한다.
- 기존 전체 테스트, 타입 검사, 프로덕션 빌드를 통과해야 한다.

## 범위 제외

- 브라우저 방문 기록 기반 `navigate(-1)` 동작
- 하단 탭 구성 변경
- 알림 화면 구현
- 상품·전체 탭 신규 페이지 구현
