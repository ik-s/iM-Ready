import { useEffect, useRef, useState } from "react";
import { PiMicrophone } from "react-icons/pi";
import { useNavigate } from "react-router";

import { GoldenFixedAction, GoldenTimeShell } from "./GoldenTimeShell";

const options = [
  {
    id: "now",
    label: "방금 (30분 이내)",
    description: "골든타임 대응 가능",
  },
  {
    id: "today",
    label: "몇 시간 전",
    description: "오늘 중 송금 건",
  },
  {
    id: "past",
    label: "어제 이후",
    description: "24시간 이상 경과",
  },
];

export function SituationAssessmentPage() {
  const [selected, setSelected] = useState("");
  const [voiceState, setVoiceState] = useState<
    "idle" | "processing" | "done"
  >("idle");
  const voiceTimerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      if (voiceTimerRef.current !== null) {
        window.clearTimeout(voiceTimerRef.current);
      }
    },
    [],
  );

  const simulateVoiceAnswer = () => {
    if (voiceState === "processing") {
      return;
    }

    setVoiceState("processing");
    voiceTimerRef.current = window.setTimeout(() => {
      setSelected("now");
      setVoiceState("done");
      voiceTimerRef.current = null;
    }, 800);
  };

  return (
    <GoldenTimeShell
      backTo="/golden-time/start"
      mainClassName="min-h-[838px] bg-white pb-[174px]"
    >
      <section className="border-b border-[#E8ECEB] px-5 pt-6 pb-5">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-semibold">상황 파악</span>
          <span className="text-[#029C82]">1/3</span>
        </div>
        <div
          role="progressbar"
          aria-label="상황 파악 진행률"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={1}
          className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#E8ECEB]"
        >
          <span className="block h-full w-1/3 rounded-full bg-[#029C82]" />
        </div>
      </section>

      <section className="border-b border-[#E8ECEB] px-5 pt-7 pb-7">
        <h1 className="text-[25px] leading-[34px] font-bold tracking-[-0.5px]">
          언제 송금하셨나요?
        </h1>
        <p className="mt-2 text-[14px] leading-[21px] text-[#3C4A45]">
          정확한 분석을 위해 송금 시점을 알려주세요.
        </p>
      </section>

      <fieldset className="bg-[#F7F8F8]">
        <legend className="sr-only">송금 시점</legend>
        {options.map((option) => {
          const checked = selected === option.id;

          return (
            <label
              key={option.id}
              className={[
                "flex min-h-[88px] cursor-pointer items-center justify-between border-b border-[#E8ECEB] px-5 py-4",
                checked
                  ? "bg-[#F0FBF8]"
                  : option.id === "now"
                    ? "bg-[#F5FCFA]"
                    : "bg-white",
              ].join(" ")}
            >
              <input
                type="radio"
                name="transfer-time"
                value={option.id}
                checked={checked}
                onChange={() => setSelected(option.id)}
                aria-label={`${option.label}, ${option.description}`}
                className="sr-only"
              />
              <span>
                <span className="block text-[16px] font-semibold">
                  {option.label}
                </span>
                <span
                  className={[
                    "mt-1 block text-[12px]",
                    option.id === "now"
                      ? "text-[#029C82]"
                      : "text-[#3C4A45]",
                  ].join(" ")}
                >
                  {option.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={[
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
                  checked
                    ? "border-[#029C82]"
                    : "border-[#D8DEDC]",
                ].join(" ")}
              >
                {checked ? (
                  <span className="h-3 w-3 rounded-full bg-[#029C82]" />
                ) : null}
              </span>
            </label>
          );
        })}
      </fieldset>

      <section className="bg-[#F7F8F8] px-5 pt-8 pb-20">
        <button
          type="button"
          disabled={voiceState === "processing"}
          onClick={simulateVoiceAnswer}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[8px] border border-[#E1E6E4] bg-white text-[14px] font-semibold text-[#3C4A45]"
        >
          <PiMicrophone className="h-5 w-5 text-[#029C82]" />
          {voiceState === "processing"
            ? "답변을 확인하고 있어요"
            : voiceState === "done"
              ? "음성 답변 다시 선택하기"
              : "음성으로 답하기"}
        </button>
        <p
          aria-live="polite"
          className="mt-3 min-h-5 text-center text-[12px] text-[#029C82]"
        >
          {voiceState === "done"
            ? "‘방금’으로 답변을 선택했습니다."
            : voiceState === "processing"
              ? "데모 음성 답변을 처리하고 있습니다."
              : ""}
        </p>
      </section>

      <GoldenFixedAction
        disabled={!selected}
        onClick={() => navigate("/golden-time/payment-stop")}
      >
        다음 단계로
      </GoldenFixedAction>
    </GoldenTimeShell>
  );
}
