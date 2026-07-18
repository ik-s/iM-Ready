# iM Ready

iM Ready는 금융사기를 당하기 전에 안전한 모의 피싱을 경험하고, 수상한 연락에 반응했거나 피해가 발생했을 때 필요한 공식 대응 절차를 빠르게 확인하도록 돕는 모바일 웹 데모입니다.

현재 데모는 두 가지 흐름을 제공합니다.

- **피싱 백신**: 공유 페이지 → 서비스 소개 → 개인정보·훈련 안내 동의 → 훈련 설정 → 안전한 모의 피싱 경고
- **골든타임**: 긴급 대응 안내 → 상황 파악 → 지급정지 절차 확인 → 후속 절차 → 진행 중 사건·타임라인 → 지난 기록·훈련 복기

## 데모 범위와 안전 원칙

이 저장소는 프론트엔드 데모이며 백엔드와 실제 금융 기능이 연결되어 있지 않습니다.

- 실제 송금, 지급정지, 경찰 신고, 전화 연결, 문서 제출 또는 보안 설정을 실행하지 않습니다.
- 외부 앱을 설치하거나 휴대전화 권한을 요청하지 않습니다.
- 계좌번호, 비밀번호, 인증번호, 연락처, 위치정보, 음성 원본을 수집하거나 저장하지 않습니다.
- 금융 면역력 점수나 단일 보안 점수를 사용하지 않습니다.
- 골든타임은 공식 절차와 공식 채널을 순서대로 안내합니다.
- 실제 피해가 의심되면 경찰청 `112`, 금융감독원 `1332`, 이용 중인 금융회사의 공식 앱·고객센터를 이용해야 합니다.

## 기술 스택

- TypeScript 7
- React 19
- React Router 8
- Vite 8
- Tailwind CSS 4
- React Icons 5
- Vitest 4
- Testing Library
- npm 11

## 시작하기

Node.js 24 이상과 npm 11을 권장합니다.

```bash
git clone https://github.com/ik-s/iM-Ready.git
cd iM-Ready
npm ci
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)을 엽니다. 다른 기기에서 같은 개발 서버에 접속하려면 다음 명령을 사용합니다.

```bash
npm run dev -- --host 0.0.0.0
```

## 명령어

```bash
npm run dev        # Vite 개발 서버
npm test           # Vitest 감시 모드
npm run test:run   # 전체 테스트 1회 실행
npm run typecheck  # TypeScript 검사
npm run build      # 프로덕션 빌드
```

## 주요 라우트

| 경로 | 역할 |
| --- | --- |
| `/invites/phishing-challenge/demo` | 가족·친구 공유 초대 페이지 |
| `/events/phishing-challenge/intro` | 서비스 소개 |
| `/events/phishing-challenge/consent` | 개인정보 활용 및 훈련 안내 |
| `/events/phishing-challenge/setup` | 피싱 백신 훈련 설정 |
| `/training/phishing/demo` | 문자 링크에서 진입하는 안전한 훈련 경고 |
| `/home` | 월간 피싱 예방 리포트 |
| `/golden-time` | 골든타임 홈 |
| `/golden-time/start` | 긴급 대응 시작 |
| `/golden-time/assessment` | 송금 시점 상황 파악 |
| `/golden-time/payment-stop` | 공식 지급정지 절차 안내 |
| `/golden-time/follow-up` | 신고·서류 후속 절차 체크리스트 |
| `/golden-time/incidents` | 진행 중인 피싱 대응 |
| `/golden-time/incidents/current` | 사건 처리 타임라인 |
| `/golden-time/history` | 지난 실전 대응·훈련 기록 |
| `/golden-time/history/refund-report` | 피해 환급 상세 보고서 |
| `/golden-time/history/training-review?record=training` | 기관사칭 훈련 복기 |
| `/golden-time/history/training-review?record=education` | 대출사기 예방 교육 복기 |
| `/golden-time/history/training-review?record=settings` | 사전 방어 설정 안내 |

정의되지 않은 경로는 공유 초대 데모로 이동합니다.

## 프로젝트 구조

```text
src/
├── app/                    # 라우팅과 앱 테스트
├── assets/figma/           # Figma에서 추출한 데모 에셋
├── components/             # 공통 헤더·하단 탭·아이콘
├── features/
│   ├── challenge/          # 피싱 백신 온보딩·설정·경고
│   ├── golden-time/        # 긴급 대응·사건·기록·복기
│   └── home/               # 월간 리포트
├── styles/                 # 전역 스타일과 폰트
└── test/                   # Vitest 설정
```

Golden Time의 기록 데이터는 `src/features/golden-time/goldenTimeDemoData.ts`에서 일관되게 관리합니다. 안내 시트와 자동으로 사라지는 상태 메시지는 `GoldenFeedback.tsx`의 공통 컴포넌트를 사용합니다.

## 검증

커밋 또는 배포 전 다음 명령을 모두 실행합니다.

```bash
npm run test:run
npm run typecheck
npm run build
```

자동화 테스트는 라우팅, 뒤로가기, 지급정지 안내 확인, 음성 답변 시뮬레이션, 안내 시트, 토스트 해제, 사건 진행률, 기록 일관성, 위치·점수 미수집 원칙을 검증합니다.

## Vercel 배포

프로젝트는 Vite 정적 빌드로 배포됩니다. `vercel.json`은 React Router의 직접 경로 접속을 `index.html`로 연결합니다.

Vercel CLI를 사용하는 경우:

```bash
npx vercel
npx vercel --prod
```

Git 연동을 사용하면 `main` 푸시를 프로덕션 배포 대상으로 설정할 수 있습니다. 배포 후 `/golden-time`처럼 중첩된 경로를 직접 열어 SPA rewrite가 정상 동작하는지 확인해야 합니다.

## 향후 MVP 방향

본격적인 MVP는 AWS 기반으로 검토합니다.

- API Gateway: 훈련 행동 이벤트 수신
- Lambda: 훈련 세션 확인과 최소 행동 정보 정리
- DynamoDB: 클릭, 승인, 중단 지점 등 행동 이벤트 저장

AWS 구성은 아직 확정 인프라 명세가 아닙니다. MVP에서도 민감정보 대신 필요한 행동 이벤트만 저장하고, 실제 발송·신고·금융 기능은 정식 권한과 검증된 공식 채널을 통해 별도로 설계해야 합니다.
