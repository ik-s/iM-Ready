import { useState } from "react";
import { PiShieldCheck } from "react-icons/pi";
import { useSearchParams } from "react-router";

import {
  GoldenActionSheet,
  GoldenToast,
  useGoldenToast,
} from "./GoldenFeedback";
import { GoldenDivider, GoldenTimeShell } from "./GoldenTimeShell";

const reviewModes = {
  training: {
    eyebrow: "Analysis Report",
    title: (
      <>
        이번 훈련에서{" "}
        <span className="text-[#029C82]">원격제어 요구</span>까지
        진행됐습니다.
      </>
    ),
    description:
      "실제 상황이었다면 자산 탈취의 위험이 매우 높았던 단계입니다.",
    results: [
      ["초기 접근", "정상 대응"],
      ["피싱 시도", "정상 대응"],
      ["원격제어 요구", "위험 노출"],
    ],
  },
  education: {
    eyebrow: "대출사기 예방 교육 복기",
    title: (
      <>
        저금리 대출을 미끼로 한{" "}
        <span className="text-[#029C82]">선입금 요구</span>를
        확인했습니다.
      </>
    ),
    description:
      "공식 금융회사인지 확인하고 수수료·보증금 선입금을 거절하는 것이 핵심입니다.",
    results: [
      ["문자 속 링크", "누르지 않기"],
      ["대출 수수료 선입금", "거절하기"],
      ["대출 기관 확인", "공식 채널 이용"],
    ],
  },
  settings: {
    eyebrow: "사전 방어 설정 안내",
    title: (
      <>
        사고 전 확인할 수 있는{" "}
        <span className="text-[#029C82]">iM뱅크 보안 설정</span>을
        모았습니다.
      </>
    ),
    description:
      "아래 버튼에서 설정 방법을 확인하고 iM뱅크 공식 앱에서 적용할 수 있습니다.",
    results: [
      ["지연이체", "공식 앱에서 설정"],
      ["입금계좌 지정", "공식 앱에서 설정"],
      ["의심 연락 확인", "공식 번호 이용"],
    ],
  },
} as const;

export function TrainingReviewPage() {
  const [searchParams] = useSearchParams();
  const requestedMode = searchParams.get("record");
  const mode =
    requestedMode === "education" || requestedMode === "settings"
      ? requestedMode
      : "training";
  const review = reviewModes[mode];
  const [sheet, setSheet] = useState<"delay" | "account" | null>(
    null,
  );
  const notice = useGoldenToast();

  return (
    <GoldenTimeShell
      backTo={
        mode === "settings"
          ? "/golden-time"
          : "/golden-time/history"
      }
      mainClassName="bg-[#F7F8F8]"
    >
      <section className="border-b border-[#E8ECEB] bg-white px-5 pt-6 pb-6">
        <h1 className="text-[13px] font-semibold text-[#029C82]">
          {review.eyebrow}
        </h1>
        <h2 className="mt-2 text-[19px] leading-[25px] font-bold tracking-[-0.35px]">
          {review.title}
        </h2>
        <p className="mt-3 text-[14px] leading-[21px] text-[#3C4A45]">
          {review.description}
        </p>
        <div className="mt-8 border-t border-[#E8ECEB]">
          {review.results.map(([label, result], index) => (
            <div
              key={label}
              className={[
                "flex h-[46px] items-center justify-between border-b border-[#E8ECEB] text-[14px]",
                index === review.results.length - 1 &&
                mode === "training"
                  ? "mx-[-20px] bg-[#FFF8F8] px-5"
                  : "",
              ].join(" ")}
            >
              <span
                className={
                  index === review.results.length - 1 &&
                  mode === "training"
                    ? "text-[#DC2626]"
                    : "text-[#3C4A45]"
                }
              >
                {label}
              </span>
              <span
                className={
                  index === review.results.length - 1 &&
                  mode === "training"
                    ? "font-semibold text-[#DC2626]"
                    : "font-medium"
                }
              >
                {result}
              </span>
            </div>
          ))}
        </div>
      </section>

      <GoldenDivider />

      <section className="border-y border-[#E8ECEB] bg-white px-5 py-6">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[17px] font-bold">
              지연이체 서비스를 이용해 보세요.
            </h2>
            <p className="mt-2 text-[14px] leading-[23px] text-[#3C4A45]">
              iM뱅크 공식 앱에서 적용 조건과 시간을 직접 확인해 사고
              대응 시간을 확보하세요.
            </p>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[8px] border border-[#E8ECEB] bg-[#F9FAFB] text-[#029C82]">
            <PiShieldCheck className="h-7 w-7" />
          </span>
        </div>
        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={() => setSheet("delay")}
            className="h-[52px] w-full rounded-[8px] bg-[#029C82] font-['Jua'] text-[18px] text-white"
          >
            지연이체 설정 안내 보기
          </button>
          <button
            type="button"
            onClick={() => setSheet("account")}
            className="h-[52px] w-full rounded-[8px] border border-[#E5E7EB] bg-white font-['Jua'] text-[18px] text-[#029C82]"
          >
            입금계좌 지정 안내 보기
          </button>
        </div>
        <p className="mt-4 text-center text-[13px] leading-[20px] text-[#3C4A45]">
          지정되지 않은 계좌로의 이체를{" "}
          <span className="text-[#029C82]">3시간 동안 지연</span>시켜
          <br />
          금융 사고를 예방합니다.
        </p>
      </section>

      <section className="p-5">
        <div className="rounded-[16px] border border-[#CFE5E1] bg-[#EAF8F5] p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#029C82]">
              <PiShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-[#027B69]">
                안내 체크리스트
              </p>
              <h2 className="mt-0.5 text-[17px] font-bold">
                공식 앱에서 직접 확인할 설정
              </h2>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-[13px] leading-[19px] text-[#30443F]">
            <li>• 지연이체 적용 조건과 지연 시간</li>
            <li>• 입금계좌 지정 범위와 송금 제한</li>
            <li>• 금융회사 공식 고객센터 번호</li>
          </ul>
          <p className="mt-4 border-t border-[#CFE5E1] pt-4 text-[12px] leading-[18px] text-[#52706A]">
            설정 변경은 iM뱅크 공식 앱에서 진행됩니다.
          </p>
        </div>
      </section>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "delay"
            ? "지연이체 설정 안내"
            : "입금계좌 지정 안내"
        }
        description={
          sheet === "delay"
            ? "iM뱅크 공식 앱의 보안 설정에서 지연이체 적용 조건과 시간을 확인한 뒤 설정해 주세요."
            : "iM뱅크 공식 앱에서 자주 송금하는 계좌를 지정하고, 미지정 계좌 송금 제한 조건을 확인해 주세요."
        }
        primaryLabel="안내 확인 완료"
        onPrimary={() => {
          notice.showToast(
            sheet === "delay"
              ? "지연이체 설정 안내를 확인했습니다."
              : "입금계좌 지정 안내를 확인했습니다.",
          );
          setSheet(null);
        }}
        onClose={() => setSheet(null)}
      />

      <GoldenToast
        id={notice.toastId}
        message={notice.message}
        onClose={notice.dismissToast}
        toastRef={notice.toastRef}
      >
      </GoldenToast>
    </GoldenTimeShell>
  );
}
