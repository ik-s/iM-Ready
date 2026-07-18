import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { App } from "./App";

describe("challenge onboarding routes", () => {
  it("renders the shared challenge landing from an invite URL", () => {
    render(
      <MemoryRouter initialEntries={["/invites/phishing-challenge/demo"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "AI 피싱 예방 챌린지" }),
    ).toBeInTheDocument();
    expect(screen.getByText("iM Shield")).toBeInTheDocument();

    const navigation = screen.getByRole("navigation", {
      name: "주요 메뉴",
    });
    for (const label of ["홈", "면역력", "이벤트", "가족", "마이"]) {
      expect(within(navigation).getByText(label)).toBeInTheDocument();
    }
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
});
