import { useState } from "react";
import {
  PiBank,
  PiCheck,
  PiClock,
  PiFileText,
  PiIdentificationCard,
  PiInfo,
  PiSealCheck,
} from "react-icons/pi";

import { GoldenActionSheet } from "./GoldenFeedback";
import { GoldenFixedAction, GoldenTimeShell } from "./GoldenTimeShell";
import { currentIncident } from "./goldenTimeDemoData";

export function IncidentTimelinePage() {
  const [marked, setMarked] = useState(false);
  const [sheet, setSheet] = useState<"complete" | "support" | null>(
    null,
  );
  const progress = marked
    ? currentIncident.completedProgress
    : currentIncident.progress;

  return (
    <GoldenTimeShell
      backTo="/golden-time/incidents"
      mainClassName="bg-white pb-[184px]"
    >
      <section className="border-b border-[#E8ECEB] px-5 pt-6 pb-6">
        <h1 className="text-[24px] leading-[30px] font-extrabold">
          보이스피싱 피해 회복 중
        </h1>
        <p className="mt-1 text-[14px] text-[#3C4A45]">
          현재 사건 처리 절차를 확인하실 수 있습니다.
        </p>
        <div className="mt-5 flex items-center justify-between text-[13px] font-bold">
          <span className="text-[#3C4A45]">전체 진행률</span>
          <span className="text-[#029C82]">{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="사건 처리 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="mt-2 h-[6px] overflow-hidden rounded-full bg-[#F0F3F2]"
        >
          <span
            className="block h-full rounded-full bg-[#029C82] transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <h2 className="border-b border-[#E8ECEB] bg-[#FAFBFB] px-5 py-4 text-[15px] font-bold">
        사건 처리 상세 내역
      </h2>

      <ol>
        {currentIncident.completedSteps.map((step) => (
          <li
            key={step.title}
            className="relative flex gap-4 border-b border-[#E8ECEB] px-5 py-6"
          >
            <span className="absolute top-[42px] bottom-[-25px] left-[37px] w-[2px] bg-[#029C82]" />
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#029C82] text-white">
              <PiCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0 pt-[2px]">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-[16px] font-bold">{step.title}</h3>
                <span className="text-[11px] text-[#3C4A45]">
                  {step.date}
                </span>
              </div>
              <p className="mt-1 text-[14px] leading-[22px] text-[#3C4A45]">
                {step.description}
              </p>
            </div>
          </li>
        ))}

        <li className="relative flex gap-4 border-b border-[#E8ECEB] bg-[#F1FBF9] px-5 py-6">
          <span className="absolute top-[42px] bottom-[-25px] left-[37px] w-[2px] bg-[#E8ECEB]" />
          <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-[#029C82] bg-white text-[#029C82]">
            {marked ? (
              <PiCheck className="h-4 w-4" />
            ) : (
              <PiClock className="h-4 w-4" />
            )}
          </span>
          <div className="min-w-0 flex-1 pt-[2px]">
            <h3 className="text-[16px] font-bold text-[#029C82]">
              사건사고사실확인원
            </h3>
            <p className="mt-1 text-[14px] leading-[22px]">
              {marked
                ? "확인원 발급 완료 표시됨"
                : "관할 경찰서 방문 후 확인원 발급 대기 중"}
            </p>
            <div className="mt-3 rounded-[8px] border border-[#E8ECEB] bg-white p-4">
              <p className="flex items-center gap-1 text-[13px] font-bold">
                <PiInfo className="h-4 w-4" />
                필수 지참 서류
              </p>
              <ul className="mt-2 space-y-1 text-[13px] leading-[19px] text-[#3C4A45]">
                <li>· 신분증 (주민등록증, 면허증 등)</li>
                <li>· 피해 계좌 이체 내역서</li>
                <li>· 가해자와의 연락내역 (문자, 통화)</li>
              </ul>
            </div>
          </div>
        </li>

        <li className="relative flex gap-4 border-b border-[#E8ECEB] px-5 py-6 opacity-40">
          <span className="absolute top-[42px] bottom-[-25px] left-[37px] w-[2px] bg-[#E8ECEB]" />
          <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E8ECEB] bg-[#F7F8F8]">
            <PiFileText className="h-4 w-4" />
          </span>
          <div className="pt-[2px]">
            <h3 className="text-[16px] font-bold">서면 신청</h3>
            <p className="mt-1 text-[14px] text-[#3C4A45]">
              은행 영업점 방문 피해구제 신청서 제출
            </p>
          </div>
        </li>

        <li className="flex gap-4 px-5 py-6 opacity-40">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#E8ECEB] bg-[#F7F8F8]">
            <PiBank className="h-4 w-4" />
          </span>
          <div className="pt-[2px]">
            <h3 className="text-[16px] font-bold">채권소멸 공고</h3>
            <p className="mt-1 text-[14px] text-[#3C4A45]">
              금융감독원을 통한 채권소멸절차 개시
            </p>
          </div>
        </li>
      </ol>

      <section className="mx-5 mb-4 flex items-center justify-between rounded-[12px] border border-[#E8ECEB] bg-[#F7F8F8] p-5">
        <div>
          <h2 className="text-[15px] font-bold">도움이 필요하신가요?</h2>
          <p className="mt-1 text-[13px] text-[#3C4A45]">
            112·1332·공식 은행 고객센터
          </p>
        </div>
          <button
            type="button"
            onClick={() => setSheet("support")}
            className="rounded-[8px] border border-[#E0E6E4] bg-white px-3 py-2 text-[13px] font-semibold"
        >
          문의하기
        </button>
      </section>

      <div className="sr-only">
        <PiIdentificationCard />
        <PiSealCheck />
      </div>

      <p aria-live="polite" className="sr-only">
        {marked
          ? "사건사고사실확인원 단계를 완료로 표시했습니다."
          : ""}
      </p>

      <GoldenFixedAction
        completed={marked}
        onClick={() => setSheet("complete")}
      >
        {marked ? "완료 표시됨" : "이 단계 완료 표시"}
      </GoldenFixedAction>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "complete" ? "단계 완료 확인" : "공식 상담 채널 안내"
        }
        description={
          sheet === "complete"
            ? "사건사고사실확인원 발급을 마쳤다면 완료로 표시해 주세요. 다음 단계인 금융회사 서면 신청 준비로 이어집니다."
            : "피해 상담은 경찰청 112, 금융감독원 1332 또는 이용 중인 금융회사의 공식 고객센터를 이용해 주세요."
        }
        primaryLabel={
          sheet === "complete" ? "완료로 표시하기" : undefined
        }
        onPrimary={
          sheet === "complete"
            ? () => {
                setMarked(true);
                setSheet(null);
              }
            : undefined
        }
        onClose={() => setSheet(null)}
      />
    </GoldenTimeShell>
  );
}
