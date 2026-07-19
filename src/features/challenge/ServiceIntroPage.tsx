import { useState } from "react";
import { useNavigate } from "react-router";
import { HiChartBar, HiCheck } from "react-icons/hi2";

import familyIcon from "../../assets/figma/intro-card-family.png";
import lockIcon from "../../assets/figma/intro-card-lock.png";
import phoneIcon from "../../assets/figma/intro-card-phone.png";
import heroImage from "../../assets/figma/intro-hero.png";
import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";

const introCards = [
  {
    title: "실제처럼 전화 · 문자 훈련",
    description: (
      <>
        AI가 실제 사기범처럼
        <br />
        예고없이 연락합니다.
      </>
    ),
    icon: phoneIcon,
  },
  {
    title: "나만의 금융 면역력 분석",
    description: (
      <>
        대응 과정을 분석하여
        <br />
        취약점을 알려드립니다.
      </>
    ),
    icon: null,
  },
  {
    title: "가족과 함께 예방",
    description: (
      <>
        부모님 · 친구와 함께
        <br />
        챌린지에 참여할 수 있습니다.
      </>
    ),
    icon: familyIcon,
  },
] as const;

export function ServiceIntroPage() {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="mobile-prototype bg-[#F7F8F8]">
      <AppHeader backTo="/invites/phishing-challenge/demo" />

      <main className="min-h-[786px] bg-[#F7F8F8] text-center">
        <section className="pt-[12px]">
          <p className="text-[18px] leading-[24px] font-bold tracking-[-0.5px] text-[#02B7AF]">
            AI 피싱 예방 챌린지
          </p>
          <h1 className="font-['Jua'] text-[27px] leading-[32px] tracking-[-0.7px] text-[#287C72]">
            함께하면 더 안전해져요!
          </h1>

          <img
            src={heroImage}
            alt="방패와 함께 금융사기를 예방하는 iM 캐릭터"
            className="mx-auto mt-[3px] h-[222px] w-[333px] object-contain"
          />

          <div className="mx-auto mt-[-25px] flex w-[291px] flex-col gap-[10px]">
            {introCards.map((card) => (
              <article
                key={card.title}
                className="flex h-[84px] items-center rounded-[25px] border border-[#B9B9B9] bg-white px-[12px] text-left"
              >
                <span className="grid h-[50px] w-[50px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#F7F7F7]">
                  {card.icon ? (
                    <img
                      src={card.icon}
                      alt=""
                      className="h-[27px] w-[27px] object-contain"
                    />
                  ) : (
                    <HiChartBar
                      aria-hidden="true"
                      className="h-[27px] w-[27px] text-black"
                    />
                  )}
                </span>
                <div className="ml-[13px]">
                  <h2 className="text-[15px] leading-[19px] font-bold tracking-[-0.3px] text-black">
                    {card.title}
                  </h2>
                  <p className="mt-[2px] text-[12px] leading-[16px] font-medium tracking-[-0.2px] text-[#454545]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <article className="mx-auto mt-[10px] flex h-[84px] w-[291px] items-center rounded-[25px] border border-[#7BCABB] bg-[#CFFFF5] px-[17px] text-left">
            <span className="grid h-[42px] w-[42px] shrink-0 place-items-center overflow-hidden rounded-full">
              <img
                src={lockIcon}
                alt=""
                className="h-[25px] w-[25px] object-contain"
              />
            </span>
            <p className="ml-[12px] text-[12px] leading-[17px] font-semibold tracking-[-0.25px] text-[#172C28]">
              실제 사기가 아닌 AI 모의훈련입니다
              <br />
              개인정보는 저장되지 않으며
              <br />
              훈련 종료 후 즉시 삭제됩니다.
            </p>
          </article>
        </section>

        <section className="mt-[16px] bg-white px-[39px] pt-[25px] pb-[96px]">
          <label className="flex cursor-pointer items-center gap-[9px] text-left">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
              className="peer sr-only"
            />
            <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[5px] bg-[#D0D6D4] text-white peer-checked:bg-[#00A58F]">
              <HiCheck className="h-[15px] w-[15px]" />
            </span>
            <span className="text-[14px] leading-[20px] font-semibold tracking-[-0.35px] text-[#222]">
              개인정보 활용 및 훈련 안내를 확인했습니다.
            </span>
          </label>

          <button
            type="button"
            disabled={!acknowledged}
            onClick={() => navigate("/events/phishing-challenge/consent")}
            className="mt-[14px] h-[50px] w-full rounded-[9px] border border-[#087C6E] bg-[#08A78F] font-['Jua'] text-[23px] tracking-[-0.5px] text-white shadow-[0_4px_6px_rgba(27,57,51,0.22)] transition disabled:cursor-not-allowed disabled:border-[#A7B1AF] disabled:bg-[#B9C3C1] active:translate-y-0.5"
          >
            동의하고 시작하기
          </button>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
