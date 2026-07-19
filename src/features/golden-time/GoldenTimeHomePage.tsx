import { useState } from "react";
import {
  PiCaretRight,
  PiGearSix,
  PiLightbulb,
  PiShieldCheck,
  PiSiren,
} from "react-icons/pi";
import { useNavigate } from "react-router";

import { currentIncident } from "./goldenTimeDemoData";
import { isEmergencyResponseComplete } from "./goldenTimeSession";
import { GoldenDivider, GoldenTimeShell } from "./GoldenTimeShell";

export function GoldenTimeHomePage() {
  const navigate = useNavigate();
  const [hasActiveIncident] = useState(() =>
    isEmergencyResponseComplete(),
  );

  return (
    <GoldenTimeShell backTo="/home" mainClassName="bg-white">
      {hasActiveIncident ? (
        <section className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold">진행 중인 사건</h2>
            <button
              type="button"
              onClick={() => navigate("/golden-time/incidents")}
              className="flex items-center gap-1 text-[12px] text-[#3C4A45]"
            >
              전체보기 <PiCaretRight />
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/golden-time/incidents")}
            className="mt-3 w-full border-b border-[#E8ECEB] bg-white py-3 text-left"
          >
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#3C4A45]">
                {currentIncident.occurredAtShort}
              </span>
              <span className="font-semibold text-[#BA1A1A]">
                {currentIncident.dueLabel}
              </span>
            </div>
            <div className="mt-[9px] flex items-end justify-between">
              <p className="text-[16px] font-bold">
                {currentIncident.title}
              </p>
              <PiCaretRight className="h-4 w-4 text-[#66736E]" />
            </div>
            <div className="mt-3 rounded-[8px] bg-[#F4F7F6] px-3 py-[10px]">
              <p className="text-[10px] font-semibold text-[#029C82]">
                다음 단계
              </p>
              <p className="mt-[2px] text-[13px] font-semibold">
                {currentIncident.nextStep}
              </p>
            </div>
            <div
              role="progressbar"
              aria-label="진행 중인 사건 진행률"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={currentIncident.progress}
              className="mt-3 h-1 overflow-hidden rounded-full bg-[#E8ECEB]"
            >
              <span
                className="block h-full rounded-full bg-[#029C82]"
                style={{ width: `${currentIncident.progress}%` }}
              />
            </div>
          </button>
        </section>
      ) : (
        <section className="px-5 pt-7 pb-6">
          <p className="flex items-center gap-1 text-[12px] font-semibold text-[#E53935]">
            <PiSiren className="h-4 w-4" />
            긴급 대응 절차 안내
          </p>
          <h1 className="mt-[6px] text-[25px] leading-[34px] font-extrabold tracking-[-0.6px]">
            보이스피싱 긴급 대응
          </h1>
          <p className="mt-1 text-[14px] leading-[21px] text-[#3C4A45]">
            필요한 보호·신고 절차를 순서대로 안내합니다.
          </p>
          <button
            type="button"
            onClick={() => navigate("/golden-time/start")}
            className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-[#E53935] font-['Jua'] text-[20px] text-white shadow-[0_2px_4px_rgba(186,26,26,0.18)]"
          >
            <PiSiren className="h-5 w-5" />
            긴급 대응 시작하기
          </button>
        </section>
      )}

      <GoldenDivider />

      <section className="grid grid-cols-2 gap-3 px-5 pb-4 pt-5">
        <button
          type="button"
          onClick={() => navigate("/golden-time/history")}
          className="min-h-[126px] border-r border-[#E8ECEB] bg-white pr-4 text-left"
        >
          <p className="text-[15px] font-bold">지난 기록</p>
          <p className="mt-4 flex items-center justify-between text-[13px] text-[#3C4A45]">
            실전 대응
            <strong className="text-[17px] text-[#BA1A1A]">2건</strong>
          </p>
          <p className="mt-2 flex items-center justify-between text-[13px] text-[#3C4A45]">
            모의 훈련
            <strong className="text-[17px] text-[#029C82]">3건</strong>
          </p>
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(
              "/golden-time/history/training-review?record=settings",
            )
          }
          className="relative min-h-[126px] bg-white pl-4 text-left"
        >
          <p className="text-[15px] font-bold">사전 방어 설정</p>
          <p className="mt-5 text-[13px] text-[#3C4A45]">
            AI 안심 사전
          </p>
          <PiGearSix className="absolute right-1 bottom-5 h-7 w-7 text-[#029C82]" />
        </button>
      </section>

      <div className="mx-5 mb-4 flex min-h-[88px] gap-3 rounded-[12px] bg-[#F3F8F7] px-4 py-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#029C82]">
          <PiLightbulb className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[14px] font-bold">
            지난 사칭 문자를 받으셨나요?
          </p>
          <p className="mt-1 text-[12px] leading-[18px] text-[#3C4A45]">
            문자 속 번호가 아닌 공식 앱이나 공식 고객센터 번호로
            확인하세요.
          </p>
        </div>
        <PiShieldCheck className="ml-auto h-5 w-5 text-[#029C82]" />
      </div>
    </GoldenTimeShell>
  );
}
