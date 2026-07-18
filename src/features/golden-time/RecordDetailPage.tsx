import {
  PiBank,
  PiCheck,
  PiInfo,
  PiSealCheck,
} from "react-icons/pi";

import { completedRefundRecord } from "./goldenTimeDemoData";
import { GoldenDivider, GoldenTimeShell } from "./GoldenTimeShell";

export function RecordDetailPage() {
  return (
    <GoldenTimeShell
      backTo="/golden-time/history"
      mainClassName="bg-[#F7F8F8]"
    >
      <section className="border-b border-[#E8ECEB] bg-white px-5 pt-8 pb-6">
        <h1 className="text-[24px] leading-7 font-extrabold">
          피해 환급 상세 보고서
        </h1>
        <p className="mt-2 text-[14px] text-[#3C4A45]">
          {completedRefundRecord.eventDateText} 발생한 사건의 최종
          결과입니다.
        </p>
      </section>

      <section className="border-b border-[#E8ECEB] bg-white px-5 py-6">
        <p className="text-[14px] text-[#3C4A45]">총 환급금액</p>
        <p className="mt-1 flex items-center gap-1 text-[24px] font-bold text-[#029C82]">
          {completedRefundRecord.refundAmount}
          <span className="text-[14px] font-semibold">원</span>
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[12px] text-[#3C4A45]">총 피해금액</p>
            <p className="mt-1 text-[16px] font-bold">
              {completedRefundRecord.damageAmount}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#3C4A45]">처리 소요기간</p>
            <p className="mt-1 text-[16px] font-bold">
              {completedRefundRecord.duration}
            </p>
          </div>
        </div>
      </section>

      <GoldenDivider />

      <section className="border-y border-[#E8ECEB] bg-white pt-3">
        <h2 className="border-b border-[#E8ECEB] px-5 py-4 text-[16px] font-semibold">
          처리 절차
        </h2>
        <ol>
          {completedRefundRecord.processSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 border-b border-[#E8ECEB] px-5 py-5 last:border-b-0"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#029C82] text-white">
                {index ===
                completedRefundRecord.processSteps.length - 1 ? (
                  <PiSealCheck className="h-3 w-3" />
                ) : (
                  <PiCheck className="h-3 w-3" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={[
                      "text-[14px] font-semibold",
                      index ===
                      completedRefundRecord.processSteps.length - 1
                        ? "text-[#029C82]"
                        : "",
                    ].join(" ")}
                  >
                    {step.title}
                  </h3>
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
        </ol>
      </section>

      <GoldenDivider />

      <section className="border-y border-[#E8ECEB] bg-white px-5 py-6">
        <h2 className="text-[16px] font-semibold">접수 및 처리 기관</h2>
        <p className="mt-1 text-[12px] leading-[18px] text-[#66736E]">
          위치정보 없이 기록된 공식 대응 채널입니다.
        </p>
        <ul className="mt-4 overflow-hidden rounded-[10px] border border-[#E8ECEB]">
          {completedRefundRecord.institutions.map((institution) => (
            <li
              key={institution}
              className="flex items-center gap-3 border-b border-[#E8ECEB] px-4 py-3 last:border-b-0"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EAF8F5] text-[#029C82]">
                <PiBank className="h-4 w-4" />
              </span>
              <span className="text-[14px] font-semibold">
                {institution}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 py-6">
        <div className="flex gap-3 rounded-[8px] border border-[#E8ECEB] bg-white p-4">
          <PiInfo className="h-5 w-5 shrink-0 text-[#3C4A45]" />
          <p className="text-[12px] leading-[19px] text-[#3C4A45]">
            금융감독원 전기통신금융사기 피해 방지 및 피해금 환급에
            관한 특별법에 의거하여 처리되었습니다.
          </p>
        </div>
        <p className="pt-8 pb-2 text-center text-[12px] text-[#83908B]">
          환급 완료 후 1년간 보관됩니다
        </p>
      </div>
    </GoldenTimeShell>
  );
}
