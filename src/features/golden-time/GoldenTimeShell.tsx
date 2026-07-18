import type { ReactNode } from "react";

import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";
import { GoldenToast, useGoldenToast } from "./GoldenFeedback";

type GoldenTimeShellProps = {
  backTo: string;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  topBanner?: ReactNode;
};

export function GoldenTimeShell({
  backTo,
  children,
  className = "",
  mainClassName = "",
  topBanner,
}: GoldenTimeShellProps) {
  const navigationNotice = useGoldenToast();

  return (
    <div
      className={`mobile-prototype bg-[#F7F8F8] text-[#1B1C1C] ${className}`}
    >
      {topBanner}
      <AppHeader
        backTo={backTo}
        onNotice={navigationNotice.showToast}
      />
      <main className={`pb-[98px] ${mainClassName}`}>{children}</main>
      <BottomTabBar
        activeTab="golden"
        onNotice={navigationNotice.showToast}
      />
      <GoldenToast
        id={navigationNotice.toastId}
        message={navigationNotice.message}
        onClose={navigationNotice.dismissToast}
        toastRef={navigationNotice.toastRef}
      />
    </div>
  );
}

type FixedActionProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  completed?: boolean;
};

export function GoldenFixedAction({
  children,
  onClick,
  disabled = false,
  completed = false,
}: FixedActionProps) {
  return (
    <div className="fixed bottom-[82px] left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 bg-gradient-to-t from-[#F7F8F8] via-[#F7F8F8] to-transparent px-5 pt-6 pb-4">
      <button
        type="button"
        disabled={disabled || completed}
        aria-disabled={disabled || completed}
        onClick={onClick}
        className={[
          "h-14 w-full rounded-[10px] font-['Jua'] text-[18px] text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
          completed
            ? "bg-[#46655E]"
            : "bg-[#029C82] disabled:bg-[#A8BDB8]",
        ].join(" ")}
      >
        {children}
      </button>
    </div>
  );
}

export function GoldenDivider() {
  return <div aria-hidden="true" className="h-2 border-y border-[#E8ECEB] bg-[#F7F8F8]" />;
}
