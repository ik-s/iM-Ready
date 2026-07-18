import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router";

import brandMark from "../assets/figma/share-character-left.png";
import bellIcon from "../assets/figma/header-logo.svg";

type AppHeaderProps = {
  backTo?: string;
  fixed?: boolean;
  onNotice?: (message: string) => void;
  sticky?: boolean;
  transparent?: boolean;
};

export function AppHeader({
  backTo,
  fixed = false,
  onNotice,
  sticky = true,
  transparent = false,
}: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={[
          "top-0 z-40 flex h-14 items-center justify-between pr-[8px]",
          backTo ? "pl-1" : "pl-5",
          fixed
            ? "fixed left-1/2 w-full max-w-[390px] -translate-x-1/2"
            : sticky
              ? "sticky"
              : "relative",
          transparent
            ? fixed
              ? "bg-[#E6F8F4]"
              : "bg-transparent"
            : "bg-white",
        ].join(" ")}
      >
        <div className="flex min-w-0 items-center">
          {backTo ? (
            <button
              type="button"
              aria-label="이전 화면"
              onClick={() => navigate(backTo)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#3C4A45]"
            >
              <PiCaretLeft
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>
          ) : null}

          <button
            type="button"
            aria-label="홈으로 이동"
            onClick={() => navigate("/home")}
            className="flex min-w-0 items-center gap-2"
          >
            <span className="brand-mark" aria-hidden="true">
              <img src={brandMark} alt="" />
            </span>
            <span className="truncate text-[22px] font-bold tracking-[-0.35px] text-[#00BFA6]">
              iM Ready
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label="알림"
          onClick={() =>
            onNotice?.("새로운 알림은 아직 없습니다.")
          }
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
        >
          <img src={bellIcon} alt="" className="h-5 w-4" />
        </button>
      </header>
      {fixed ? <div aria-hidden="true" className="h-14" /> : null}
    </>
  );
}
