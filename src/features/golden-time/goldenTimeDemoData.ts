export type DetectionKind = "account" | "message" | "call";

export type DetectionExample = {
  id: string;
  kind: DetectionKind;
  title: string;
  time: string;
  description: string;
};

export type IncidentStatusStep = {
  label: string;
  state: "done" | "active" | "pending";
};

export type IncidentTimelineStep = {
  title: string;
  date: string;
  description: string;
};

export type HistoryRecordType = "real" | "training";

export type HistoryRecord = {
  id: "refund" | "training" | "education";
  type: HistoryRecordType;
  date: string;
  badge: string;
  title: string;
  description: string;
  result: string;
  route: string;
};

export const recentDetectionExamples: DetectionExample[] = [
  {
    id: "account",
    kind: "account",
    title: "의심 거래 안내",
    time: "오후 2:30",
    description:
      "해외 IP 로그인처럼 확인이 필요한 상황을 예시로 보여드립니다.",
  },
  {
    id: "message",
    kind: "message",
    title: "스미싱 의심 문자",
    time: "오전 11:15",
    description:
      "출처가 불분명한 URL이 포함된 문자의 대응 예시입니다.",
  },
  {
    id: "call",
    kind: "call",
    title: "보이스피싱 의심 전화",
    time: "어제",
    description:
      "기관을 사칭하며 송금을 재촉하는 전화의 대응 예시입니다.",
  },
];

export const currentIncident = {
  id: "current",
  occurredAt: "2026.07.17 14:20",
  occurredAtShort: "7월 17일 발생",
  occurredAtCompact: "7/17 기관사칭 피싱",
  title: "기관사칭 보이스피싱",
  amount: "3,200,000",
  dueLabel: "서면 신청 D-2",
  status: "조사 중",
  nextStep: "경찰서 방문 및 확인원 발급",
  progress: 57,
  completedProgress: 71,
  statusSteps: [
    { label: "신고접수", state: "done" },
    { label: "사실확인", state: "active" },
    { label: "서면심사", state: "pending" },
    { label: "환급결정", state: "pending" },
  ] satisfies IncidentStatusStep[],
  completedSteps: [
    {
      title: "지급정지 요청 안내 확인",
      date: "2026.07.17 14:20",
      description: "공식 은행 채널을 통한 지급정지 요청 절차 확인",
    },
    {
      title: "본인 명의 계좌 확인",
      date: "2026.07.17 15:05",
      description: "공식 계좌정보통합관리서비스 확인 절차 안내",
    },
    {
      title: "경찰 신고 안내 확인",
      date: "2026.07.17 16:30",
      description: "112 신고 및 관할 경찰서 방문 절차 확인",
    },
  ] satisfies IncidentTimelineStep[],
} as const;

export const completedRefundRecord = {
  id: "refund",
  historyDate: "2026.05.12 14:20",
  eventDateText: "2026년 5월 12일",
  title: "기관사칭 피싱 방어",
  description:
    "검찰 사칭 의심 연락 이후 공식 절차를 따라 피해구제를 진행했습니다.",
  refundAmount: "4,250,000",
  refundResult: "4,250,000원 환급 완료",
  damageAmount: "4,500,000원",
  duration: "42일",
  processSteps: [
    {
      title: "지급정지 요청",
      date: "05.12 14:20",
      description: "공식 은행 채널을 통한 지급정지 요청 접수",
    },
    {
      title: "신고 접수",
      date: "05.12 15:05",
      description: "경찰청 및 금융감독원 공식 창구 접수",
    },
    {
      title: "서면 신청",
      date: "05.14",
      description: "피해구제 신청서와 증빙 서류 제출",
    },
    {
      title: "채권 소멸 절차",
      date: "06.18",
      description: "금융감독원 채권 소멸 절차 진행",
    },
    {
      title: "환급 결과 확인",
      date: "06.23",
      description: "공식 금융기관을 통한 최종 환급 결과 확인",
    },
  ] satisfies IncidentTimelineStep[],
  institutions: [
    "iM뱅크 공식 고객센터",
    "경찰청 112",
    "금융감독원 1332",
  ],
} as const;

export const historyRecords: HistoryRecord[] = [
  {
    id: "refund",
    type: "real",
    date: completedRefundRecord.historyDate,
    badge: "실전 대응",
    title: completedRefundRecord.title,
    description: completedRefundRecord.description,
    result: completedRefundRecord.refundResult,
    route: "/golden-time/history/refund-report",
  },
  {
    id: "training",
    type: "training",
    date: "2026.07.05 10:15",
    badge: "훈련 복기",
    title: "기관사칭 모의 훈련",
    description:
      "원격제어 요구까지 진행한 행동을 바탕으로 위험 신호를 복기했습니다.",
    result: "위험 신호 3개 복기",
    route: "/golden-time/history/training-review?record=training",
  },
  {
    id: "education",
    type: "training",
    date: "2026.06.18 16:45",
    badge: "교육 완료",
    title: "대출사기 예방 교육",
    description:
      "저금리 대출 유도 문자의 특징과 공식 확인 원칙을 학습했습니다.",
    result: "대출 유도 문자 대응 원칙 확인",
    route: "/golden-time/history/training-review?record=education",
  },
];
