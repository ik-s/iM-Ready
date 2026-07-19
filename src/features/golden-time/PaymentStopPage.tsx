import {
  PiCaretRight,
  PiQuestion,
  PiWarning,
} from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router";

import paymentStopBanner from "../../assets/figma/golden-time/payment-stop-banner.jpg";
import { GoldenActionSheet } from "./GoldenFeedback";
import {
  GoldenDivider,
  GoldenFixedAction,
  GoldenTimeShell,
} from "./GoldenTimeShell";

export function PaymentStopPage() {
  const [sheet, setSheet] = useState<"details" | "confirm" | null>(
    null,
  );
  const navigate = useNavigate();

  return (
    <GoldenTimeShell
      backTo="/golden-time/assessment"
      mainClassName="bg-white pb-[176px]"
    >
      <section className="border-b border-[#E8ECEB] px-5 pt-8 pb-6">
        <h1 className="text-[24px] leading-8 font-bold">
          상황을 파악했습니다.
        </h1>
        <p className="mt-2 text-[16px] leading-6 text-[#3C4A45]">
          피해 확산을 막기 위해 즉시 조치합니다.
        </p>
      </section>

      <GoldenDivider />

      <section className="border-b border-[#E8ECEB] px-5 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold">1순위 - 지급정지</h2>
          <span className="rounded-[4px] bg-[#E6F6F3] px-2 py-1 text-[12px] font-semibold text-[#029C82]">
            필수 조치
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSheet("details")}
          className="mt-4 flex w-full items-center justify-between rounded-[12px] border border-[#E8ECEB] bg-[#F7F8F8] p-4 text-left"
        >
          <div>
            <p className="text-[14px] font-semibold">
              계좌 및 카드 즉시 차단
            </p>
            <p className="mt-1 text-[12px] text-[#3C4A45]">
              앱에서 바로 신청 가능
            </p>
          </div>
          <PiCaretRight className="h-5 w-5 text-[#3C4A45]" />
        </button>
      </section>

      <section className="border-b border-[#E8ECEB]">
        <div className="flex gap-4 border-b border-[#E8ECEB] px-5 py-5">
          <PiQuestion className="mt-[2px] h-5 w-5 shrink-0" />
          <div>
            <h2 className="text-[16px] font-bold">왜 전화가 아닌가요?</h2>
            <p className="mt-1 text-[14px] leading-[23px] text-[#3C4A45]">
              악성 앱은 112, 은행 등 모든 통화를 가로챌 수 있습니다.
              <br />
              앱 보안망을 통한 신청이 가장 안전합니다.
            </p>
          </div>
        </div>
        <div className="flex gap-4 px-5 py-5">
          <PiWarning className="mt-[2px] h-6 w-6 shrink-0 text-[#BA1A1A]" />
          <div>
            <h2 className="text-[16px] font-bold text-[#BA1A1A]">
              법적 주의사항
            </h2>
            <p className="mt-1 text-[14px] leading-[23px] text-[#3C4A45]">
              <strong className="text-[#1B1C1C]">
                거짓 신청은 3년 이하 징역
              </strong>
              입니다. 부당한 목적으로 지급정지 신청 시 형사 처벌을
              받을 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="p-5">
        <img
          src={paymentStopBanner}
          alt="iM Shield 실시간 보호 안내"
          className="h-[160px] w-full rounded-[12px] border border-[#DDE6E3] object-cover"
        />
      </section>

      <GoldenFixedAction
        onClick={() => setSheet("confirm")}
      >
        즉시 지급정지 신청하기
      </GoldenFixedAction>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "details"
            ? "지급정지 신청 방법"
            : "지급정지 신청 안내"
        }
        description={
          sheet === "details"
            ? "iM뱅크 공식 앱의 보안 메뉴에서 지급정지를 선택하고 계좌와 카드를 확인한 뒤 신청해 주세요."
            : "iM뱅크 공식 앱에서 계좌 및 카드 지급정지를 신청해 주세요. 신청을 마친 뒤 후속 절차를 이어갈 수 있습니다."
        }
        primaryLabel={
          sheet === "confirm"
            ? "신청 완료 후 계속하기"
            : undefined
        }
        onPrimary={
          sheet === "confirm"
            ? () => navigate("/golden-time/follow-up")
            : undefined
        }
        onClose={() => setSheet(null)}
      >
        {sheet === "confirm" ? (
          <div className="rounded-[10px] bg-[#FFF5F5] p-3 text-[13px] leading-5 font-bold text-[#7A2424]">
            지급정지 신청이 완료되지 않았다면 iM뱅크 공식 앱에서
            먼저 신청해 주세요.
          </div>
        ) : null}
      </GoldenActionSheet>
    </GoldenTimeShell>
  );
}
