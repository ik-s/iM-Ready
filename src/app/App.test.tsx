import {
  act,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { App } from "./App";

describe("challenge onboarding routes", () => {
  it("renders the shared challenge landing with a brand link to home", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/invites/phishing-challenge/demo"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "AI 피싱 예방 챌린지" }),
    ).toBeInTheDocument();
    const homeButton = screen.getByRole("button", {
      name: "홈으로 이동",
    });
    expect(homeButton).toHaveTextContent("iM Ready");
    expect(screen.queryByText("iM Shield")).not.toBeInTheDocument();

    const navigation = screen.getByRole("navigation", {
      name: "주요 메뉴",
    });
    for (const label of ["홈", "상품", "백신", "골든", "전체"]) {
      expect(within(navigation).getByText(label)).toBeInTheDocument();
    }
    expect(
      within(navigation).getByRole("button", { name: "백신" }),
    ).toHaveAttribute("aria-current", "page");
    expect(navigation.querySelectorAll("svg")).toHaveLength(5);
    expect(navigation.querySelectorAll("img")).toHaveLength(0);

    await user.click(homeButton);
    expect(
      screen.getByRole("heading", { name: "이번달 피싱 예방 결과" }),
    ).toBeInTheDocument();
  });

  it("moves from the shared challenge page to the service introduction", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollTo,
    });

    render(
      <MemoryRouter initialEntries={["/invites/phishing-challenge/demo"]}>
        <App />
      </MemoryRouter>,
    );

    scrollTo.mockClear();
    await user.click(
      screen.getByRole("button", {
        name: "가족 · 친구랑 챌린지 시작!",
      }),
    );

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    expect(
      screen.getByRole("heading", { name: "함께하면 더 안전해져요!" }),
    ).toBeInTheDocument();
  });

  it("requires the local acknowledgement before opening consent", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/intro"]}
      >
        <App />
      </MemoryRouter>,
    );

    const acknowledgement = screen.getByRole("checkbox", {
      name: "개인정보 활용 및 훈련 안내를 확인했습니다.",
    });
    const continueButton = screen.getByRole("button", {
      name: "동의하고 시작하기",
    });

    expect(acknowledgement).toBeChecked();
    expect(continueButton).toBeEnabled();

    await user.click(acknowledgement);
    expect(continueButton).toBeDisabled();

    await user.click(acknowledgement);
    await user.click(continueButton);

    expect(
      screen.getByRole("heading", {
        name: "개인 정보 수신 동의 여부 확인",
      }),
    ).toBeInTheDocument();
  });

  it("keeps the service introduction scroll reserve inside the white action section", () => {
    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/intro"]}
      >
        <App />
      </MemoryRouter>,
    );

    const acknowledgement = screen.getByRole("checkbox", {
      name: "개인정보 활용 및 훈련 안내를 확인했습니다.",
    });
    const actionSection = acknowledgement.closest("section");

    expect(actionSection).toHaveClass("bg-white", "pb-[96px]");
    expect(screen.getByRole("main")).not.toHaveClass("pb-[136px]");
  });

  it("shows the consent controls and the replacement safe-training terms", () => {
    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/consent"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "개인 정보 수신 동의 여부 확인",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "개인(신용)정보 활용동의",
      }),
    ).toBeInTheDocument();

    for (const label of [
      "개인정보 수집이용에 관한 사항 [마케팅]",
      "개인정보 제공에 관한 사항",
      "상품서비스 안내 수단 [통합]",
      "문자",
      "전화",
      "우편",
    ]) {
      expect(
        screen.getByRole("checkbox", { name: label }),
      ).toBeChecked();
    }

    expect(
      screen.getByText(
        "본 서비스는 금융사기 대응 능력을 높이기 위한 안전한 모의훈련입니다. 실제 송금, 앱 설치, 원격제어 또는 금융거래는 발생하지 않습니다.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "동의 시 매월 최대 1회, 예고 없이 모의 피싱 문자가 발송될 수 있습니다. 링크 클릭, 중단 지점, 공식 앱 확인 여부 등 대응 행동만 기록합니다.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "계좌번호, 비밀번호, 인증번호 등 사용자가 입력한 실제 정보는 저장하지 않으며, 훈련 종료 후 개인별 복기 리포트를 제공합니다.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "훈련은 언제든 일시정지하거나 철회할 수 있으며, 실제 피해가 의심되면 반드시 iM뱅크 공식 앱이나 고객센터를 통해 확인해 주세요.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/약관약관/)).not.toBeInTheDocument();
  });

  it("keeps the consent training notice compact above the bottom navigation", () => {
    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/consent"]}
      >
        <App />
      </MemoryRouter>,
    );

    const noticeSection = screen
      .getByRole("heading", { name: "꼭 기억해주세요" })
      .closest("section");

    expect(noticeSection).toHaveClass("min-h-[450px]", "pb-[36px]");
  });

  it("moves from consent to the challenge training settings", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/consent"]}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "챌린지 하러가기" }),
    );

    expect(
      screen.getByRole("heading", { name: "나의 정보" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "훈련 설정" }),
    ).toBeInTheDocument();
  });

  it("lets the user configure training and confirms completion in a popup", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/setup"]}
      >
        <App />
      </MemoryRouter>,
    );

    const noNotice = screen.getByRole("radio", {
      name: "알림 없이 진행",
    });
    const advanceNotice = screen.getByRole("radio", {
      name: "미리 알림 받기",
    });
    expect(noNotice).toBeChecked();

    await user.click(advanceNotice);
    expect(advanceNotice).toBeChecked();

    const levelTwo = screen.getByRole("button", {
      name: /Level 2 실전형/,
    });
    const levelThree = screen.getByRole("button", {
      name: /Level 3 고난도형/,
    });
    expect(levelTwo).toHaveAttribute("aria-pressed", "true");

    await user.click(levelThree);
    expect(levelThree).toHaveAttribute("aria-pressed", "true");

    const guardianMonitoring = screen.getByRole("checkbox", {
      name: "보호자 모니터링",
    });
    expect(guardianMonitoring).toBeChecked();

    await user.click(guardianMonitoring);
    expect(guardianMonitoring).not.toBeChecked();

    await user.click(
      screen.getByRole("button", { name: "설정 완료하기" }),
    );

    const dialog = screen.getByRole("dialog", {
      name: "설정 완료",
    });
    expect(dialog).toHaveTextContent(
      "설정이 완료됐습니다! 훈련 기간동안 무작위 문자 혹은 전화가 발송될 예정입니다.",
    );

    await user.click(
      within(dialog).getByRole("button", { name: "확인" }),
    );
    expect(
      screen.queryByRole("dialog", { name: "설정 완료" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the setup header fixed and centers only the profile identity", () => {
    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/setup"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("banner")).toHaveClass("fixed", "top-0");
    expect(screen.queryByText("어쩌구 저쩌구")).not.toBeInTheDocument();

    const profile = screen.getByRole("region", {
      name: "사용자 정보",
    });
    expect(
      within(profile).getByText("홍길동 님").parentElement,
    ).toHaveClass("flex", "items-center");
  });

  it("renders the SMS-only phishing warning without app chrome", () => {
    render(
      <MemoryRouter initialEntries={["/training/phishing/demo"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "잠깐!" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("당신은 피싱에 걸릴 뻔했어요!"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("이 링크는 iM의 피싱 예방 훈련 링크입니다."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("main", { name: "피싱 훈련 안내" }),
    ).toHaveClass("justify-center");
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it.each([
    ["/events/phishing-challenge/intro", "AI 피싱 예방 챌린지"],
    [
      "/events/phishing-challenge/consent",
      "함께하면 더 안전해져요!",
    ],
    [
      "/events/phishing-challenge/setup",
      "개인 정보 수신 동의 여부 확인",
    ],
  ])(
    "moves back from %s to its logical parent",
    async (path, destinationHeading) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );

      await user.click(
        screen.getByRole("button", { name: "이전 화면" }),
      );
      expect(
        screen.getByRole("heading", {
          name: destinationHeading,
        }),
      ).toBeInTheDocument();
    },
  );

  it.each([
    "/invites/phishing-challenge/demo",
    "/training/phishing/demo",
  ])("does not add app back navigation to %s", (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.queryByRole("button", { name: "이전 화면" }),
    ).not.toBeInTheDocument();
  });
});

describe("home report and golden time routes", () => {
  it("lets the home report header scroll away with the page", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("banner")).toHaveClass("relative");
    expect(screen.getByRole("banner")).not.toHaveClass("fixed");
    expect(screen.getByRole("banner")).not.toHaveClass("sticky");
  });

  it("fades the home background from mint to white over 653 pixels", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-background-gradient")).toHaveClass(
      "h-[653px]",
      "from-[#D9F0EB]",
      "to-white",
    );
  });

  it("keeps the report actions in the document flow", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    const reportActions = screen.getByRole("region", {
      name: "리포트 작업",
    });
    expect(reportActions).not.toHaveClass("fixed");
    expect(screen.getByRole("main")).toContainElement(reportActions);
  });

  it("dismisses the report notice when the user clicks elsewhere", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "가족·친구한테 공유하기",
      }),
    );
    expect(
      screen.getByText("가족·친구 공유 링크를 준비했어요."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("heading", {
        name: "이번달 피싱 예방 결과",
      }),
    );
    expect(
      screen.queryByText("가족·친구 공유 링크를 준비했어요."),
    ).not.toBeInTheDocument();
  });

  it("automatically dismisses the report notice after three seconds", () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>,
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "가족·친구한테 공유하기",
        }),
      );
      expect(
        screen.getByText("가족·친구 공유 링크를 준비했어요."),
      ).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3_000);
      });
      expect(
        screen.queryByText("가족·친구 공유 링크를 준비했어요."),
      ).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("uses the same bottom navigation position on home and vaccine", () => {
    const home = render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );
    const homeNavigation = screen.getByRole("navigation", {
      name: "주요 메뉴",
    });
    expect(homeNavigation).toHaveStyle({ bottom: "0px" });

    home.unmount();

    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/setup"]}
      >
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("navigation", { name: "주요 메뉴" }),
    ).toHaveStyle({ bottom: "0px" });
  });

  it("opens the monthly report from the setup home tab", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/events/phishing-challenge/setup"]}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(
      within(
        screen.getByRole("navigation", { name: "주요 메뉴" }),
      ).getByRole("button", { name: "홈" }),
    );

    expect(
      screen.getByRole("heading", { name: "이번달 피싱 예방 결과" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "홈" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("opens golden time from the report bottom tab", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      within(
        screen.getByRole("navigation", { name: "주요 메뉴" }),
      ).getByRole("button", { name: "골든" }),
    );

    expect(
      screen.getByRole("heading", { name: "보이스피싱 긴급 대응" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "골든" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("uses service-facing guidance copy and opens recent security notices", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("필요한 보호·신고 절차를 순서대로 안내합니다."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("실시간 골든타임 보호 중"),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "긴급 대응 시작하기" }),
    );
    await user.click(screen.getByRole("button", { name: "전체보기" }));

    expect(
      screen.getByRole("dialog", { name: "최근 보안 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /최근 주의가 필요한 금융사기 유형/,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모|예시/)).not.toBeInTheDocument();
  });

  it("resolves the local voice answer simulation and selects an answer", () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={["/golden-time/assessment"]}>
          <App />
        </MemoryRouter>,
      );

      fireEvent.click(
        screen.getByRole("button", { name: "음성으로 답하기" }),
      );
      expect(
        screen.getByRole("button", { name: "답변을 확인하고 있어요" }),
      ).toBeDisabled();
      expect(
        screen.getByText("음성 답변을 확인하고 있습니다."),
      ).toBeInTheDocument();
      expect(screen.queryByText(/데모/)).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(800);
      });

      expect(
        screen.getByRole("radio", { name: /방금 \(30분 이내\)/ }),
      ).toBeChecked();
      expect(
        screen.getByText("‘방금’으로 답변을 선택했습니다."),
      ).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("requires payment-stop guidance acknowledgement before follow-up", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/payment-stop"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "즉시 지급정지 신청하기",
      }),
    );

    expect(
      screen.getByRole("dialog", { name: "지급정지 신청 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /iM뱅크 공식 앱에서 계좌 및 카드 지급정지를 신청해 주세요/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "iM Shield 실시간 보호 안내",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "후속 절차 가이드" }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "신청 완료 후 계속하기",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "후속 절차 가이드" }),
    ).toBeInTheDocument();
  });

  it("opens the official payment-stop method from the information card", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/payment-stop"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /계좌 및 카드 즉시 차단/,
      }),
    );
    expect(
      screen.getByRole("dialog", {
        name: "지급정지 신청 방법",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/iM뱅크 공식 앱의 보안 메뉴/),
    ).toBeInTheDocument();
  });

  it("opens follow-up checklist guidance and shows an honest prevention card", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "사건사고사실확인원 발급 안내",
      }),
    );
    expect(
      screen.getByRole("dialog", {
        name: "사건사고사실확인원 발급 안내",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "추가 피해 예방 체크" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: "보안 설정이 완료되었습니다",
      }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "닫기" }));
    await user.click(
      screen.getByRole("button", { name: "피해경위서 자동 작성" }),
    );
    expect(
      screen.getByRole("dialog", { name: "피해경위서 초안" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/확인된 사건 내용을 바탕으로/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모|예시|실제 제출 전/)).not.toBeInTheDocument();
  });

  it("provides production-facing document and police guidance", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/incidents"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "피해구제 신청서 안내 보기",
      }),
    );
    expect(
      screen.getByRole("dialog", { name: "피해구제 신청서 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/공식 양식을 받아 작성한 뒤/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "닫기" }));

    await user.click(
      screen.getByRole("button", { name: "담당 경찰서 확인하기" }),
    );
    expect(
      screen.getByRole("dialog", { name: "경찰서 방문 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("사건 담당 경찰서"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/방문 전 신분증과 피해 계좌 이체 내역/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모|예시|현재 위치/)).not.toBeInTheDocument();
  });

  it("confirms timeline completion once and exposes semantic progress", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/golden-time/incidents/current"]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "57",
    );
    await user.click(
      screen.getByRole("button", { name: "이 단계 완료 표시" }),
    );
    expect(
      screen.getByRole("dialog", { name: "단계 완료 확인" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/다음 단계인 금융회사 서면 신청 준비/),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/현재 기기에만 임시로 반영/),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "완료로 표시하기" }),
    );

    expect(
      screen.getByRole("button", { name: "완료 표시됨" }),
    ).toBeDisabled();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "71",
    );
    expect(
      screen.getByText("사건사고사실확인원 단계를 완료로 표시했습니다."),
    ).toBeInTheDocument();
  });

  it("opens official support guidance from the incident timeline", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={["/golden-time/incidents/current"]}
      >
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "문의하기" }),
    );
    expect(
      screen.getByRole("dialog", { name: "공식 상담 채널 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "피해 상담은 경찰청 112, 금융감독원 1332 또는 이용 중인 금융회사의 공식 고객센터를 이용해 주세요.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/실제 피해 상담|데모/)).not.toBeInTheDocument();
  });

  it("keeps completed refund data consistent and removes score and location copy", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/history"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("4,250,000원 환급 완료"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/보안 등급|인상 \+5pt/)).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /기관사칭 피싱 방어/ }),
    );
    expect(screen.getByText("4,250,000")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "접수 및 처리 기관" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("사건 발생 위치")).not.toBeInTheDocument();
    expect(screen.queryByText("대구광역시 수성구")).not.toBeInTheDocument();
  });

  it("opens record-specific education and settings review modes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/history"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: /대출사기 예방 교육/ }),
    );
    expect(
      screen.getByRole("heading", { name: "대출사기 예방 교육 복기" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("원격제어 요구까지 진행됐습니다."),
    ).not.toBeInTheDocument();
  });

  it("keeps the training review free of legacy branding and security scores", () => {
    render(
      <MemoryRouter
        initialEntries={[
          "/golden-time/history/training-review?record=training",
        ]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: "공식 앱에서 직접 확인할 설정",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: "보안 강화 리포트 작성 중",
      }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/보안 점수|98점/)).not.toBeInTheDocument();
  });

  it("keeps security settings as guidance-only local interactions", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={[
          "/golden-time/history/training-review?record=settings",
        ]}
      >
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "사전 방어 설정 안내" }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", {
        name: "지연이체 설정 안내 보기",
      }),
    );
    expect(
      screen.getByRole("dialog", { name: "지연이체 설정 안내" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/적용 조건과 시간을 확인한 뒤 설정해 주세요/),
    ).toBeInTheDocument();
    expect(screen.queryByText(/데모/)).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "안내 확인 완료" }),
    );
    expect(
      screen.getByText("지연이체 설정 안내를 확인했습니다."),
    ).toBeInTheDocument();
  });

  it("gives feedback for shared placeholder navigation controls", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "알림" }));
    expect(
      screen.getByText("새로운 알림은 아직 없습니다."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "상품" }));
    expect(
      screen.getByText("상품 메뉴는 준비 중입니다."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "전체" }));
    expect(
      screen.getByText("전체 메뉴는 준비 중입니다."),
    ).toBeInTheDocument();
  });

  it("does not show the training banner on the golden time start page", () => {
    render(
      <MemoryRouter initialEntries={["/golden-time/start"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.queryByText("이것은 훈련입니다."),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "괜찮습니다." }),
    ).toBeInTheDocument();
  });

  it("dismisses the follow-up document notice when the user clicks elsewhere", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "피해경위서 자동 작성" }),
    );
    expect(
      screen.getByText("피해경위서 초안을 작성했습니다."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("데모용 피해경위서를 자동으로 작성했습니다."),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("heading", { name: "후속 절차 가이드" }),
    );
    expect(
      screen.queryByText("피해경위서 초안을 작성했습니다."),
    ).not.toBeInTheDocument();
  });

  it("keeps the follow-up document notice visible through its trigger pointer sequence", () => {
    render(
      <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
        <App />
      </MemoryRouter>,
    );

    const createDocumentButton = screen.getByRole("button", {
      name: "피해경위서 자동 작성",
    });
    fireEvent.click(createDocumentButton);
    fireEvent.pointerDown(createDocumentButton);

    expect(
      screen.getByText("피해경위서 초안을 작성했습니다."),
    ).toBeInTheDocument();
  });

  it("arms follow-up notice outside dismissal after the trigger gesture completes", () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
          <App />
        </MemoryRouter>,
      );

      const createDocumentButton = screen.getByRole("button", {
        name: "피해경위서 자동 작성",
      });
      const pageHeading = screen.getByRole("heading", {
        name: "후속 절차 가이드",
      });

      fireEvent.click(createDocumentButton);
      fireEvent.pointerDown(pageHeading);
      expect(
        screen.getByText("피해경위서 초안을 작성했습니다."),
      ).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(0);
      });
      fireEvent.pointerDown(pageHeading);
      expect(
        screen.queryByText("피해경위서 초안을 작성했습니다."),
      ).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("automatically dismisses the follow-up document notice after three seconds", () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
          <App />
        </MemoryRouter>,
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "피해경위서 자동 작성",
        }),
      );
      expect(
        screen.getByText("피해경위서 초안을 작성했습니다."),
      ).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(3_000);
      });
      expect(
        screen.queryByText("피해경위서 초안을 작성했습니다."),
      ).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("labels the follow-up incident entry as an active phishing response", () => {
    render(
      <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: "진행 중인 사건 진행 중인 피싱 대응 조회",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("명의도용 확인 (payinfo)"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("내 명의 계좌 통합 조회"),
    ).not.toBeInTheDocument();
  });

  it("returns from incidents to follow-up when opened from follow-up", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time/follow-up"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "진행 중인 사건 진행 중인 피싱 대응 조회",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "진행 중 사건" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "이전 화면" }),
    );
    expect(
      screen.getByRole("heading", { name: "후속 절차 가이드" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["/golden-time", "이번달 피싱 예방 결과"],
    ["/golden-time/start", "보이스피싱 긴급 대응"],
    ["/golden-time/assessment", "괜찮습니다."],
    ["/golden-time/payment-stop", "언제 송금하셨나요?"],
    ["/golden-time/follow-up", "상황을 파악했습니다."],
    ["/golden-time/incidents", "보이스피싱 긴급 대응"],
    ["/golden-time/incidents/current", "진행 중 사건"],
    ["/golden-time/history", "보이스피싱 긴급 대응"],
    ["/golden-time/history/refund-report", "지난 기록"],
    ["/golden-time/history/training-review", "지난 기록"],
  ])(
    "moves back from %s to its logical parent",
    async (path, parentHeading) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );

      await user.click(
        screen.getByRole("button", { name: "이전 화면" }),
      );
      expect(
        screen.getByRole("heading", { name: parentHeading }),
      ).toBeInTheDocument();
    },
  );

  it("traverses the primary golden time response flow", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/golden-time"]}>
        <App />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "긴급 대응 시작하기" }),
    );
    expect(
      screen.getByRole("heading", { name: "괜찮습니다." }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "대응 프로세스 시작하기",
      }),
    );
    expect(
      screen.getByRole("heading", {
        name: "언제 송금하셨나요?",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("radio", { name: /방금 \(30분 이내\)/ }),
    );
    await user.click(
      screen.getByRole("button", { name: "다음 단계로" }),
    );
    expect(
      screen.getByRole("heading", { name: "상황을 파악했습니다." }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "즉시 지급정지 신청하기",
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "신청 완료 후 계속하기",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "후속 절차 가이드" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["/golden-time/incidents", "진행 중 사건"],
    ["/golden-time/incidents/current", "보이스피싱 피해 회복 중"],
    ["/golden-time/history", "지난 기록"],
    ["/golden-time/history/refund-report", "피해 환급 상세 보고서"],
    ["/golden-time/history/training-review", "Analysis Report"],
  ])("renders %s directly", (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: heading }),
    ).toBeInTheDocument();
  });
});
