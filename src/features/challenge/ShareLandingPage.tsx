import { useNavigate } from "react-router";

import characters from "../../assets/figma/share-character-right.png";
import backgroundShield from "../../assets/figma/share-background-shield.svg";
import bubbleTail from "../../assets/figma/header-bell.svg";
import cloudLarge from "../../assets/figma/share-shield-left.svg";
import cloudMedium from "../../assets/figma/share-shield-right.svg";
import cloudSmall from "../../assets/figma/share-hero-mark.svg";
import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";

export function ShareLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="mobile-prototype bg-[#66FAD9]">
      <AppHeader />

      <main className="relative min-h-[calc(100dvh-56px)] overflow-x-hidden bg-[#66FAD9] text-center">
        <img
          src={backgroundShield}
          alt=""
          className="absolute top-[98px] left-[14.93%] h-[315px] w-[68.53%]"
        />

        <span
          aria-hidden="true"
          className="absolute top-[46px] left-[21.07%] z-[5] flex h-[41px] w-[65px] items-center justify-center"
        >
          <img
            src={bubbleTail}
            alt=""
            className="h-[65px] w-[41px] -rotate-90 -scale-y-100"
          />
        </span>

        <div className="relative z-10 pt-[24px]">
          <h1 className="ml-[19.47%] flex h-[49px] w-[64%] items-center justify-center rounded-[25px] bg-white font-['Jua'] text-[22px] leading-[30px] tracking-[-0.7px] text-[#16B3B4] shadow-[0_6px_14px_rgba(23,132,117,0.12)]">
            AI 피싱 예방 챌린지
          </h1>

          <p className="relative left-[1.47%] mt-[16px] font-['Jua'] text-[50px] leading-[55px] tracking-[-1.5px] text-white [text-shadow:-4px_4px_10px_#00C1A3]">
            함께하면
            <span className="block text-[#FFFB82]">
              더 강해집니다
            </span>
          </p>

          <p className="relative left-[2.8%] mt-[5px] text-[15px] leading-[20px] font-normal tracking-[-0.35px] text-[#1B1C1C]">
            가족, 친구와 함께 매달 금융 면역력을 키워보세요.
            <br />
            서로의 참여가 더 안전한 금융 생활을 만듭니다.
          </p>
        </div>

        <img
          src={cloudLarge}
          alt=""
          className="absolute top-[513px] left-[-75px] h-[118px] w-[231px]"
        />
        <img
          src={cloudMedium}
          alt=""
          className="absolute top-[416px] left-[220px] h-[77px] w-[183px]"
        />
        <img
          src={cloudSmall}
          alt=""
          className="absolute top-[251px] left-[-21px] h-[46px] w-[82px]"
        />

        <section className="relative z-10 mt-[18px] pb-[112px]">
          <div
            data-testid="share-characters"
            aria-hidden="true"
            className="relative left-1/2 h-[294px] w-[419px] -translate-x-1/2 overflow-hidden"
          >
            <img
              src={characters}
              alt=""
              className="absolute top-[-334px] left-0 w-[419px] max-w-none"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/events/phishing-challenge/intro")
            }
            className="relative z-20 mx-auto mt-[10px] block h-[55px] w-[80.27%] rounded-[25px] border border-black/35 font-['Jua'] text-[22px] leading-[30px] tracking-[-0.7px] text-black shadow-[-2px_4px_4px_rgba(0,0,0,0.15)] transition active:translate-y-0.5"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0%, rgba(102, 250, 217, 0.45) 100%), linear-gradient(90deg, rgb(0, 193, 163) 0%, rgb(0, 193, 163) 100%)",
            }}
          >
            가족 · 친구랑 챌린지 시작!
          </button>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}
