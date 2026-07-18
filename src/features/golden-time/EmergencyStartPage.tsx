import {
  PiCheck,
  PiInfo,
  PiLink,
  PiPhoneCall,
  PiShieldCheck,
} from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router";

import { GoldenActionSheet } from "./GoldenFeedback";
import { GoldenFixedAction, GoldenTimeShell } from "./GoldenTimeShell";
import {
  type DetectionKind,
  recentDetectionExamples,
} from "./goldenTimeDemoData";

const detectionIcons = {
  account: PiShieldCheck,
  message: PiLink,
  call: PiPhoneCall,
} satisfies Record<DetectionKind, typeof PiShieldCheck>;

export function EmergencyStartPage() {
  const [showDetections, setShowDetections] = useState(false);
  const navigate = useNavigate();

  return (
    <GoldenTimeShell
      backTo="/golden-time"
      mainClassName="bg-white pb-[174px]"
    >
      <section className="flex min-h-[285px] flex-col items-center justify-center border-b border-[#E8ECEB] px-5 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#E2F6F1] text-[#029C82]">
          <PiCheck className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-[28px] leading-9 font-bold">
          괜찮습니다.
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-[#3C4A45]">
          지금부터 같이 하겠습니다.
          <br />
          당황하지 마세요. 순서대로 함께 처리하면 됩니다.
        </p>
      </section>

      <section className="border-b border-[#E8ECEB]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-[18px] font-bold">최근 보안 안내 예시</h2>
          <button
            type="button"
            onClick={() => setShowDetections(true)}
            className="text-[12px] text-[#3C4A45]"
          >
            전체보기
          </button>
        </div>
        <ul>
          {recentDetectionExamples
            .slice(0, 2)
            .map(({ id, kind, title, time, description }) => {
              const Icon = detectionIcons[kind];
              return (
            <li
              key={id}
              className="flex gap-3 border-t border-[#E8ECEB] px-5 py-4 first:border-t-0"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EAF8F5] text-[#029C82]">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold">{title}</h3>
                  <span className="text-[11px] text-[#60706A]">{time}</span>
                </div>
                <p className="mt-[3px] text-[12px] leading-[18px] text-[#3C4A45]">
                  {description}
                </p>
              </div>
            </li>
              );
            })}
        </ul>
      </section>

      <section className="m-5 rounded-[12px] border border-[#E8ECEB] bg-[#F7F8F8] p-4">
        <h2 className="flex items-center gap-2 text-[14px] font-bold">
          <PiInfo className="h-5 w-5 text-[#029C82]" />
          안내사항
        </h2>
        <p className="mt-2 text-[12px] leading-[19px] text-[#3C4A45]">
          이 화면은 대응 절차를 연습하기 위한 데모입니다.
          실제 피해가 의심되면 112, 금융감독원 1332 또는 이용 중인
          금융회사의 공식 고객센터로 바로 확인해 주세요.
        </p>
      </section>

      <GoldenFixedAction
        onClick={() => navigate("/golden-time/assessment")}
      >
        대응 프로세스 시작하기
      </GoldenFixedAction>

      <GoldenActionSheet
        open={showDetections}
        title="최근 보안 안내 예시"
        description="아래 항목은 긴급 대응 흐름을 이해하기 위한 데모 예시입니다. 휴대전화 활동이나 메시지를 읽지 않았습니다."
        onClose={() => setShowDetections(false)}
      >
        <ul className="space-y-2">
          {recentDetectionExamples.map((detection) => (
            <li
              key={detection.id}
              className="rounded-[10px] bg-[#F4F8F7] px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-[14px] text-[#1B1C1C]">
                  {detection.title}
                </strong>
                <span className="text-[11px] text-[#66736E]">
                  {detection.time}
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-[18px]">
                {detection.description}
              </p>
            </li>
          ))}
        </ul>
      </GoldenActionSheet>
    </GoldenTimeShell>
  );
}
