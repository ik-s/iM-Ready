import { useState } from "react";
import {
  HiCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

import profileAvatar from "../../assets/figma/training-profile-avatar.png";
import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";

const notificationOptions = [
  {
    value: "advance",
    label: "미리 알림 받기",
    description: "훈련 3일 전, 1일 전에 미리 알려드려요.",
  },
  {
    value: "same-day",
    label: "당일 알림 받기",
    description: "훈련 당일 오전에 알림을 보내드려요.",
  },
  {
    value: "none",
    label: "알림 없이 진행",
    description: "예고 없이 실제처럼 훈련이 진행돼요.",
  },
] as const;

const trainingLevels = [
  {
    value: 1,
    name: "기본형",
    pressure: "낮은 압박 수준",
    description: "일반적인 피싱 상황을 경험할 수 있어요.",
    tone: "neutral",
  },
  {
    value: 2,
    name: "실전형",
    pressure: "보통 압박 수준",
    description: "실제 발생 사례와 유사한 상황으로 훈련해요",
    tone: "primary",
  },
  {
    value: 3,
    name: "고난도형",
    pressure: "높은 압박 수준",
    description: "강한 협박과 심리적 압박이 포함된 고난도 훈련입니다.",
    tone: "danger",
  },
] as const;

const completionMessage =
  "설정이 완료됐습니다! 훈련 기간동안 무작위 문자 혹은 전화가 발송될 예정입니다.";

type NotificationValue = (typeof notificationOptions)[number]["value"];

function StepHeading({
  step,
  children,
}: {
  step: number;
  children: string;
}) {
  return (
    <h3 className="text-[16px] leading-6 font-bold tracking-[-0.35px] text-[#029C82]">
      {step}. {children}
    </h3>
  );
}

export function TrainingSetupPage() {
  const [notification, setNotification] =
    useState<NotificationValue>("none");
  const [trainingLevel, setTrainingLevel] = useState(2);
  const [guardianMonitoring, setGuardianMonitoring] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");
  const [showCompletion, setShowCompletion] = useState(false);

  return (
    <div className="mobile-prototype bg-white">
      <AppHeader
        fixed
        backTo="/events/phishing-challenge/consent"
      />

      <main className="-mt-[9px] min-h-[1031px] bg-[#F5F7F6] pt-[31px] pb-[104px] text-[#1B1C1C]">
        <h1 className="mx-5 text-[25px] leading-[30px] font-bold tracking-[-0.8px] text-black">
          나의 정보
        </h1>

        <section
          aria-label="사용자 정보"
          className="mx-5 mt-[14px] flex h-[68px] items-center rounded-[25px] bg-white px-[13px] shadow-[0_5px_3px_rgba(0,0,0,0.22)]"
        >
          <img
            src={profileAvatar}
            alt=""
            className="h-[33px] w-[33px] shrink-0"
          />
          <div className="ml-[7px] flex min-w-0 items-center gap-[11px]">
            <p className="text-[15px] leading-5 font-bold text-black">
              홍길동 님
            </p>
            <span className="rounded-full bg-[#00C1A3] px-[12px] py-px text-[10px] leading-[14px] font-medium text-[#3C4A45]">
              만 23세
            </span>
          </div>
        </section>

        <article className="mt-6 mr-4 ml-[9px] rounded-[24px] bg-white px-6 pt-5 pb-6 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex h-6 items-center justify-between">
            <h2 className="text-[20px] leading-6 font-bold tracking-[-0.5px]">
              훈련 설정
            </h2>
            <span className="rounded-full bg-[#00C1A3] px-2 py-0.5 text-[10px] leading-[15px] font-medium text-[#3C4A45]">
              서비스 안내
            </span>
          </div>

          <fieldset className="mt-[10px]">
            <legend className="sr-only">알림 방식 선택</legend>
            <StepHeading step={1}>알림 방식 선택</StepHeading>
            <div className="mt-[10px] flex flex-col gap-4">
              {notificationOptions.map((option) => {
                const selected = notification === option.value;

                return (
                  <label
                    key={option.value}
                    className="flex h-12 cursor-pointer items-start gap-3"
                  >
                    <input
                      type="radio"
                      name="notification"
                      value={option.value}
                      aria-label={option.label}
                      checked={selected}
                      onChange={() => setNotification(option.value)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={[
                        "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                        selected
                          ? "border-[#12C7B5]"
                          : "border-[#BBCAC4]",
                      ].join(" ")}
                    >
                      {selected ? (
                        <span className="h-[10px] w-[10px] rounded-full bg-[#12C7B5]" />
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[16px] leading-6 font-semibold">
                        {option.label}
                      </span>
                      <span className="block whitespace-nowrap text-[14px] leading-6 text-[#3C4A45]">
                        {option.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-[10px] h-px bg-[rgba(187,202,196,0.3)]" />

          <section className="mt-[10px]">
            <StepHeading step={2}>훈련 난이도</StepHeading>
            <div className="mt-[11px] grid grid-cols-3 gap-2">
              {trainingLevels.map((level) => {
                const selected = trainingLevel === level.value;
                const isDanger = level.tone === "danger";

                return (
                  <button
                    key={level.value}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Level ${level.value} ${level.name}, ${level.pressure}`}
                    onClick={() => setTrainingLevel(level.value)}
                    className={[
                      "relative flex h-[107px] min-w-0 flex-col items-center rounded-[12px] px-[7px] pt-[12px] text-center transition active:scale-[0.98]",
                      selected
                        ? "border-2 border-[#12C7B5] bg-[rgba(18,199,181,0.05)]"
                        : isDanger
                          ? "border border-[rgba(186,26,26,0.3)] bg-[rgba(255,218,214,0.1)]"
                          : "border border-[rgba(187,202,196,0.3)] bg-[#FCF9F8]",
                    ].join(" ")}
                  >
                    {selected ? (
                      <HiCheckCircle
                        aria-hidden="true"
                        className="absolute top-[7px] right-[7px] h-3 w-3 text-[#12C7B5]"
                      />
                    ) : null}
                    <span
                      className={[
                        "text-[7px] leading-[15px] font-bold",
                        isDanger ? "text-[#BA1A1A]" : "text-[#1B1C1C]",
                      ].join(" ")}
                    >
                      Level {level.value}
                    </span>
                    <span className="text-[13px] leading-[15px] font-bold">
                      {level.name}
                    </span>
                    <span
                      className={[
                        "mt-1 rounded-full px-[8px] text-[8px] leading-[18px] font-bold whitespace-nowrap",
                        selected
                          ? "bg-[rgba(18,199,181,0.1)] text-[#12C7B5]"
                          : isDanger
                            ? "bg-[#FFDAD6] text-[#BA1A1A]"
                            : "bg-[#F0EDED] text-[#3C4A45]",
                      ].join(" ")}
                    >
                      {level.pressure}
                    </span>
                    <span className="mt-[6px] text-[7px] leading-[11px] text-[#3C4A45]">
                      {level.description}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-[10px] flex items-center gap-1 text-[11px] leading-[17px] font-medium text-[#BA1A1A]">
              <HiOutlineExclamationTriangle
                aria-hidden="true"
                className="h-[11px] w-[11px] shrink-0"
              />
              Level 3는 높은 심리적 압박을 포함할 수 있습니다.
            </p>
          </section>

          <div className="mt-[10px] h-px bg-[rgba(187,202,196,0.3)]" />

          <section className="mt-[10px]">
            <div className="flex items-center justify-between">
              <StepHeading step={3}>보호자 모니터링 설정</StepHeading>
              <label className="relative h-6 w-10 cursor-pointer">
                <input
                  type="checkbox"
                  aria-label="보호자 모니터링"
                  checked={guardianMonitoring}
                  onChange={(event) =>
                    setGuardianMonitoring(event.target.checked)
                  }
                  className="peer sr-only"
                />
                <span className="absolute inset-0 rounded-full bg-[#BBCAC4] transition peer-checked:bg-[#12C7B5]" />
                <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4" />
              </label>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-[14px] leading-5 font-semibold text-[#3C4A45]">
                모니터링 시간
              </p>
              <div className="flex items-center gap-2">
                <label>
                  <span className="sr-only">모니터링 시작 시간</span>
                  <select
                    aria-label="모니터링 시작 시간"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="h-[22px] w-[58px] appearance-none rounded-xl border border-[rgba(187,202,196,0.4)] bg-[#FCF9F8] px-2 text-center text-[10px] text-[#1B1C1C]"
                  >
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                  </select>
                </label>
                <span className="text-[16px] leading-6 text-[#3C4A45]">~</span>
                <label>
                  <span className="sr-only">모니터링 종료 시간</span>
                  <select
                    aria-label="모니터링 종료 시간"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    className="h-[22px] w-[58px] appearance-none rounded-xl border border-[rgba(187,202,196,0.4)] bg-[#FCF9F8] px-2 text-center text-[10px] text-[#1B1C1C]"
                  >
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                  </select>
                </label>
              </div>
            </div>
            <p className="mt-1 text-[10px] leading-5 text-[#3C4A45]">
              이 시간대에만 훈련이 진행됩니다.
            </p>
            <div className="mt-1 flex items-center justify-between text-[14px] leading-5">
              <p className="font-semibold text-[#3C4A45]">보호자</p>
              <p>김지훈(아들) 010-1234-5678</p>
            </div>

            <div className="mt-4 flex h-[52px] items-center rounded-[12px] bg-[rgba(0,107,89,0.05)] px-4 text-[#006B59]">
              <HiOutlineInformationCircle
                aria-hidden="true"
                className="mr-[7px] h-3 w-3 shrink-0"
              />
              <p className="text-[11px] leading-[14px] font-medium">
                레벨 2 이상 설정 시 보호자에게 즉시 알림이 전송됩니다.
              </p>
            </div>
          </section>
        </article>

        <button
          type="button"
          onClick={() => setShowCompletion(true)}
          className="mt-[30px] ml-[33px] block h-[50px] w-[calc(100%_-_75px)] rounded-[10px] border border-[rgba(0,0,0,0.35)] bg-[#029C82] font-['Jua'] text-[20px] text-white shadow-[-2px_4px_4px_rgba(0,0,0,0.15)] transition active:translate-y-0.5"
        >
          설정 완료하기
        </button>
      </main>

      <BottomTabBar />

      {showCompletion ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/35 px-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="completion-title"
            className="w-full max-w-[326px] rounded-[24px] bg-white px-6 pt-7 pb-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            <h2
              id="completion-title"
              className="text-[20px] leading-7 font-bold text-[#1B1C1C]"
            >
              설정 완료
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[#3C4A45]">
              {completionMessage}
            </p>
            <button
              type="button"
              onClick={() => setShowCompletion(false)}
              className="mt-6 h-11 w-full rounded-[12px] bg-[#029C82] text-[16px] font-semibold text-white"
            >
              확인
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}
