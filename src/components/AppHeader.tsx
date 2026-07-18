import brandMark from "../assets/figma/share-character-left.png";
import bellIcon from "../assets/figma/header-logo.svg";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-white pr-[8px] pl-[22px]">
      <div className="flex items-center gap-[11px]">
        <span className="brand-mark" aria-hidden="true">
          <img src={brandMark} alt="" />
        </span>
        <span className="text-[22px] font-bold tracking-[-0.35px] text-[#00BFA6]">
          iM Shield
        </span>
      </div>

      <button
        type="button"
        aria-label="알림"
        className="grid h-10 w-10 place-items-center rounded-full"
      >
        <img src={bellIcon} alt="" className="h-5 w-4" />
      </button>
    </header>
  );
}
