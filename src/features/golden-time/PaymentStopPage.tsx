import {
  PiCaretRight,
  PiQuestion,
  PiShieldCheck,
  PiWarning,
} from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router";

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
          피해 확산을 막기 위한 공식 절차를 확인해 주세요.
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
              계좌 및 카드 지급정지 절차
            </p>
            <p className="mt-1 text-[12px] text-[#3C4A45]">
              공식 앱·고객센터에서 요청
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
              다른 안전한 기기에서 공식 앱이나 공식 번호를 직접
              확인하는 것이 안전합니다.
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
        <div className="rounded-[14px] border border-[#CDE7E1] bg-gradient-to-br from-[#EAFBF7] to-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#029C82] shadow-sm">
              <PiShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-[16px] font-bold">
                공식 채널로 직접 확인하세요
              </h2>
              <p className="mt-1 text-[12px] leading-[18px] text-[#3C4A45]">
                문자 속 링크나 전달받은 번호는 사용하지 않습니다.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px] font-semibold">
            {["iM뱅크 공식 앱", "경찰청 112", "금감원 1332"].map(
              (channel) => (
                <span
                  key={channel}
                  className="rounded-[8px] bg-white px-2 py-2"
                >
                  {channel}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <GoldenFixedAction
        onClick={() => setSheet("confirm")}
      >
        지급정지 절차 확인하기
      </GoldenFixedAction>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "details"
            ? "공식 지급정지 요청 방법"
            : "지급정지 절차 안내"
        }
        description={
          sheet === "details"
            ? "다른 안전한 기기에서 iM뱅크 공식 앱 또는 카드 뒷면·공식 홈페이지에 안내된 고객센터 번호를 직접 확인해 요청하세요."
            : "이 데모에서는 실제 지급정지 신청이나 금융거래가 발생하지 않습니다."
        }
        primaryLabel={
          sheet === "confirm"
            ? "안내를 확인하고 계속하기"
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
          <div className="rounded-[10px] bg-[#FFF5F5] p-3 text-[13px] leading-5 text-[#7A2424]">
            실제 피해가 의심되면 즉시 공식 은행 채널과 112를 이용해
            주세요. 이 버튼은 다음 안내 화면으로만 이동합니다.
          </div>
        ) : null}
      </GoldenActionSheet>
    </GoldenTimeShell>
  );
}
