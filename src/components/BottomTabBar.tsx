import eventIcon from "../assets/figma/tab-event.svg";
import familyIcon from "../assets/figma/tab-family.svg";
import homeIcon from "../assets/figma/tab-home.svg";
import immunityIcon from "../assets/figma/tab-immunity.svg";
import myIcon from "../assets/figma/tab-my.svg";

const tabs = [
  { label: "홈", icon: homeIcon, active: false },
  { label: "면역력", icon: immunityIcon, active: false },
  { label: "이벤트", icon: eventIcon, active: true },
  { label: "가족", icon: familyIcon, active: false },
  { label: "마이", icon: myIcon, active: false },
] as const;

export function BottomTabBar() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="bottom-tabs h-[82px] rounded-t-[14px] bg-white shadow-[0_-5px_18px_rgba(35,58,53,0.07)]"
    >
      <ul className="grid h-full grid-cols-5 px-[14px] pt-[8px]">
        {tabs.map((tab) => (
          <li key={tab.label} className="flex justify-center">
            <button
              type="button"
              aria-current={tab.active ? "page" : undefined}
              className={[
                "flex h-[58px] min-w-[52px] flex-col items-center justify-center gap-[4px] rounded-[24px] px-[8px]",
                tab.active
                  ? "min-w-[64px] bg-[#D1E4E1] text-[#00BFA6]"
                  : "text-[#3C4A45]",
              ].join(" ")}
            >
              <img
                src={tab.icon}
                alt=""
                className="h-5 w-5 object-contain"
              />
              <span className="text-[12px] leading-none font-medium">
                {tab.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
