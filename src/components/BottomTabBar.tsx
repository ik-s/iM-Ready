import type { IconType } from "react-icons";
import {
  PiBagSimple,
  PiHouse,
  PiList,
  PiPill,
  PiShieldCheck,
} from "react-icons/pi";
import { useNavigate } from "react-router";

export type BottomTabId =
  | "home"
  | "product"
  | "vaccine"
  | "golden"
  | "all";

type TabItem = {
  id: BottomTabId;
  label: string;
  icon: IconType;
  route?: string;
};

const tabs: TabItem[] = [
  { id: "home", label: "홈", icon: PiHouse, route: "/home" },
  { id: "product", label: "상품", icon: PiBagSimple },
  {
    id: "vaccine",
    label: "백신",
    icon: PiPill,
    route: "/events/phishing-challenge/setup",
  },
  {
    id: "golden",
    label: "골든",
    icon: PiShieldCheck,
    route: "/golden-time",
  },
  { id: "all", label: "전체", icon: PiList },
];

type BottomTabBarProps = {
  activeTab?: BottomTabId;
  bottomOffset?: number;
  onNotice?: (message: string) => void;
};

export function BottomTabBar({
  activeTab = "vaccine",
  bottomOffset = 0,
  onNotice,
}: BottomTabBarProps) {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="주요 메뉴"
      style={{ bottom: `${bottomOffset}px` }}
      className="bottom-tabs h-[82px] rounded-t-[14px] bg-white shadow-[0_-5px_18px_rgba(35,58,53,0.07)]"
    >
      <ul className="grid h-full grid-cols-5 px-[14px] pt-[8px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeTab;

          return (
            <li key={tab.label} className="flex justify-center">
              <button
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (tab.route) {
                    navigate(tab.route);
                    return;
                  }

                  onNotice?.(
                    tab.id === "product"
                      ? "상품 메뉴는 준비 중입니다."
                      : "전체 메뉴는 준비 중입니다.",
                  );
                }}
                className={[
                  "flex h-[58px] min-w-[52px] flex-col items-center justify-center gap-[4px] rounded-[24px] px-[8px]",
                  active
                    ? "min-w-[64px] bg-[#D1E4E1] text-[#00BFA6]"
                    : "text-[#3C4A45]",
                ].join(" ")}
              >
                <Icon aria-hidden="true" className="h-6 w-6" />
                <span className="text-[12px] leading-none font-medium">
                  {tab.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
