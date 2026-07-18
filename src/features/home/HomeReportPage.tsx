import { useEffect, useRef, useState } from "react";
import {
  PiArrowClockwise,
  PiCheck,
  PiShareNetwork,
  PiShieldCheck,
} from "react-icons/pi";

import reportCase from "../../assets/figma/home/report-case.png";
import reportCharacter from "../../assets/figma/home/report-character.png";
import reportHero from "../../assets/figma/home/report-hero.png";
import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";

const preventionTips = [
  {
    title: "출처가 불분명한 채용 공고는 의심하기",
    description: "공식 채용 사이트가 아닌 SNS, 메신저를 통한 제안은 주의하세요.",
  },
  {
    title: '"계좌로 돈을 보내주고 다시 보내주세요"는 100% 사기!',
    description: "공식 채용 사이트가 아닌 SNS, 메신저를 통한 제안은 주의하세요.",
  },
  {
    title: "AI 탐지, 고수익 알바 제안도 방심 금물",
    description: "AI를 활용한 정교한 사기 수법이 증가하고 있어요.",
  },
  {
    title: "의심된다면 즉시 확인!",
    description: "의심된다면 즉시 확인!",
  },
];

const NOTICE_DURATION_MS = 3_000;

export function HomeReportPage() {
  const [notice, setNotice] = useState("");
  const noticeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNotice("");
    }, NOTICE_DURATION_MS);
    const dismissOnOutsidePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        noticeRef.current?.contains(event.target)
      ) {
        return;
      }

      setNotice("");
    };

    document.addEventListener(
      "pointerdown",
      dismissOnOutsidePointerDown,
    );

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener(
        "pointerdown",
        dismissOnOutsidePointerDown,
      );
    };
  }, [notice]);

  return (
    <div className="mobile-prototype bg-white text-[#1B1C1C]">
      <div
        aria-hidden="true"
        data-testid="home-background-gradient"
        className="pointer-events-none absolute inset-x-0 top-0 h-[653px] bg-gradient-to-b from-[#D9F0EB] to-white"
      />
      <AppHeader sticky={false} transparent />
      <main className="relative z-10 px-5 pt-3">
        <section className="relative h-[110px] overflow-hidden rounded-[22px] border border-[#D7E7E3] bg-gradient-to-br from-white to-[#D6FFF6] px-5 pt-[18px] shadow-[0_3px_5px_rgba(45,88,78,0.12)]">
          <h1 className="relative z-10 text-[15px] leading-[21px] font-bold tracking-[-0.3px]">
            이번 달도 AI 사기범이
            <br />
            예고 없이 찾아옵니다
          </h1>
          <p className="relative z-10 mt-[7px] text-[10px] leading-[15px] text-[#3C4A45]">
            계속되는 신종 AI 피싱,
            <br />
            함께 대비해요!
          </p>
          <img
            src={reportHero}
            alt=""
            className="absolute top-[-32px] right-[-8px] h-[174px] w-[116px] object-contain"
          />
        </section>

        <article className="relative mt-[22px] min-h-[644px] rounded-[24px] bg-white px-5 pt-4 pb-6 shadow-[0_4px_7px_rgba(34,62,56,0.17)]">
          <div className="flex items-start justify-between">
            <h2 className="text-[16px] leading-6 font-bold">
              이번달 피싱 예방 결과
            </h2>
            <span className="pt-[2px] text-[11px] font-bold">2026.08</span>
          </div>

          <div className="relative mt-[19px] min-h-[111px]">
            <p className="text-[14px] leading-5 font-semibold">홍길동님,</p>
            <p className="mt-1 text-[20px] leading-[27px] font-bold tracking-[-0.55px]">
              이번 달 훈련에서는
              <br />
              <span className="text-[#F52E2E]">개인정보를 노출</span>{" "}
              하셨어요.
            </p>
            <p className="mt-[7px] text-[10px] leading-[15px] text-[#6D7773]">
              한 번의 방심이 큰 피해로 이어질 수 있어요.
              <br />
              다음 달엔 꼭 성공해요!
            </p>
            <img
              src={reportCharacter}
              alt=""
              className="absolute right-[-3px] bottom-[-2px] h-[114px] w-[76px] object-contain"
            />
          </div>

          <section className="mt-2 rounded-[22px] bg-[#FFF0F1] px-4 pt-4 pb-3">
            <p className="text-[10px] text-[#5F6664]">
              이번 달 진행된 훈련은
            </p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <h3 className="text-[14px] leading-5 font-bold">
                AI 채용 위장 자금 세탁 유도 사기
              </h3>
              <span className="shrink-0 rounded-full bg-[#FF5C67] px-3 py-1 text-[9px] font-semibold text-white">
                청년 타겟 최신 사례
              </span>
            </div>
            <div className="mt-2 flex gap-[10px]">
              <img
                src={reportCase}
                alt=""
                className="h-[66px] w-[82px] shrink-0 object-contain"
              />
              <p className="text-[10px] leading-[15px] text-[#3C4A45]">
                “AI 에이전트 성능 검수 업무”라는 그럴싸한 직무로
                청년을 채용한 뒤, 본인 계좌를 통해 테스트 자금을
                송금하게 하여 범죄 자금 인출책으로 악용하는
                사기입니다.
              </p>
            </div>
            <div className="mt-[6px] flex items-center gap-[9px] rounded-[12px] border border-[#E1B6BB] bg-white/50 px-3 py-[9px]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-[#00BFA6]">
                <PiShieldCheck className="h-8 w-8" />
              </span>
              <div>
                <p className="text-[10px] font-bold">훈련 매칭 포인트</p>
                <p className="mt-[2px] text-[9px] leading-[14px] text-[#3C4A45]">
                  어떠한 경우에도 개인 계좌를 이용한 송금/자금
                  테스트는 100% 불법 범죄임을 인지시키는 원타임 교육!
                </p>
              </div>
            </div>
          </section>

          <section className="mt-[14px]">
            <h3 className="flex items-center gap-1 text-[17px] leading-6 font-bold">
              <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[#00BFA6] text-white">
                <PiCheck className="h-3 w-3" />
              </span>
              예방법
            </h3>
            <ol className="mt-1 rounded-[20px] border border-[#AAB1AF] px-4 py-3">
              {preventionTips.map((tip, index) => (
                <li key={tip.title} className={index === 0 ? "" : "mt-[7px]"}>
                  <p className="text-[10px] leading-[15px] font-bold">
                    {index + 1}. {tip.title}
                  </p>
                  <p className="mt-[1px] text-[8px] leading-[12px] text-[#5D6562]">
                    {tip.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </article>

        <section
          aria-label="리포트 작업"
          className="mt-[22px] flex gap-2 pb-[106px]"
        >
          <button
            type="button"
            onClick={() =>
              setNotice("같은 수법의 훈련을 다시 준비했어요.")
            }
            className="flex h-8 flex-1 items-center justify-center gap-1 rounded-[10px] border border-[#00A990] bg-white text-[12px] font-bold shadow-[-2px_4px_4px_rgba(0,0,0,0.15)]"
          >
            <PiArrowClockwise className="h-3 w-3" />
            같은 수법 다시 훈련하기
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice("가족·친구 공유 링크를 준비했어요.")
            }
            className="flex h-8 flex-1 items-center justify-center gap-1 rounded-[10px] border border-[#008C77] bg-[#00BFA6] text-[12px] font-bold shadow-[-2px_4px_4px_rgba(0,0,0,0.15)]"
          >
            <PiShareNetwork className="h-3 w-3" />
            가족·친구한테 공유하기
          </button>
        </section>
      </main>
      <p
        ref={noticeRef}
        aria-live="polite"
        className="fixed bottom-[168px] left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#20312D] px-4 py-2 text-xs whitespace-nowrap text-white empty:hidden"
      >
        {notice}
      </p>
      <BottomTabBar activeTab="home" />
    </div>
  );
}
