import { PiWarningBold } from "react-icons/pi";

export function PhishingTrainingWarningPage() {
  return (
    <main
      aria-label="피싱 훈련 안내"
      className="mx-auto flex min-h-[100dvh] w-full max-w-[390px] flex-col items-center justify-center bg-white px-5 text-center shadow-[0_0_32px_rgba(31,54,49,0.08)]"
    >
      <PiWarningBold
        aria-hidden="true"
        className="h-[136px] w-[136px] shrink-0 text-[#EF443D]"
      />

      <h1 className="mt-[18px] text-[70px] leading-[80px] font-bold tracking-[-2.2px] text-[#EF443D]">
        잠깐!
      </h1>

      <p className="mt-[30px] text-[40px] leading-[55px] font-bold tracking-[-1.2px] text-[#EF443D]">
        당신은 피싱에 <br />
        걸릴 뻔했어요!
      </p>

      <p className="mt-[25px] text-[24px] leading-[44px] font-semibold tracking-[-0.65px] text-[#292929]">
        이 링크는 iM의 피싱 예방 <br />
        훈련 링크입니다.
      </p>
    </main>
  );
}
