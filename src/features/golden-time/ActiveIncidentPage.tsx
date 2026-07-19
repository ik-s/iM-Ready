import {
  PiBank,
  PiCaretRight,
  PiCheck,
  PiDownloadSimple,
  PiFileText,
  PiMagnifyingGlass,
  PiMapTrifold,
} from "react-icons/pi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { GoldenActionSheet } from "./GoldenFeedback";
import { GoldenDivider, GoldenTimeShell } from "./GoldenTimeShell";
import { currentIncident } from "./goldenTimeDemoData";

const statusIcons = [
  PiCheck,
  PiMagnifyingGlass,
  PiFileText,
  PiBank,
];

export function ActiveIncidentPage() {
  const [sheet, setSheet] = useState<
    "relief" | "certificate" | "police" | null
  >(null);
  const location = useLocation();
  const navigate = useNavigate();
  const requestedBackTo = (
    location.state as { backTo?: unknown } | null
  )?.backTo;
  const backTo =
    requestedBackTo === "/golden-time/follow-up"
      ? requestedBackTo
      : "/golden-time";

  return (
    <GoldenTimeShell
      backTo={backTo}
      mainClassName="bg-[#F7F8F8]"
    >
      <section className="px-5 pt-6 pb-4">
        <h1 className="text-[24px] leading-[33px] font-bold">진행 중 사건</h1>
        <p className="mt-1 text-[14px] text-[#3C4A45]">
          피해 회복을 위한 진행 현황입니다.
        </p>
      </section>

      <section className="border-y border-[#E8ECEB] bg-white px-5 py-5">
        <button
          type="button"
          onClick={() =>
            navigate("/golden-time/incidents/current")
          }
          className="w-full text-left"
        >
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#029C82]">
              {currentIncident.status}
            </span>
            <span className="font-semibold text-[#BA1A1A]">
              {currentIncident.dueLabel}
            </span>
          </div>
          <p className="mt-4 text-[16px] text-[#3C4A45]">
            {currentIncident.occurredAtCompact}
          </p>
          <p className="mt-1 text-[27px] font-bold tracking-[-0.3px]">
            {currentIncident.amount}
            <span className="ml-1 text-[16px]">원</span>
          </p>
          <div className="mt-4 flex items-center justify-between rounded-[12px] border border-[#E8ECEB] bg-[#F7F8F8] p-4">
            <span>
              <span className="block text-[11px] font-semibold tracking-[0.5px] text-[#029C82]">
                다음 단계
              </span>
              <span className="mt-1 block text-[15px] font-semibold">
                경찰서 방문 상담
              </span>
            </span>
            <PiCaretRight className="h-5 w-5" />
          </div>
        </button>
      </section>

      <GoldenDivider />

      <section className="m-5 grid grid-cols-4 rounded-[12px] border border-[#E8ECEB] bg-white px-2 py-4">
        {currentIncident.statusSteps.map(({ label, state }, index) => {
          const Icon = statusIcons[index];
          return (
          <div
            key={label}
            className={[
              "flex flex-col items-center",
              state === "pending" ? "opacity-35" : "",
            ].join(" ")}
          >
            <span
              className={[
                "grid h-8 w-8 place-items-center rounded-full",
                state === "active"
                  ? "bg-[#029C82] text-white"
                  : state === "done"
                    ? "bg-[#E5F7F3] text-[#029C82]"
                    : "border border-[#E8ECEB] bg-[#F7F8F8]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span
              className={[
                "mt-2 text-[11px]",
                state === "active"
                  ? "font-semibold text-[#029C82]"
                  : "",
              ].join(" ")}
            >
              {label}
            </span>
          </div>
          );
        })}
      </section>

      <section className="pt-1">
        <h2 className="px-5 pb-3 text-[15px] font-semibold tracking-[0.5px] text-[#3C4A45]">
          필요 서류 안내
        </h2>
        {[
          [
            "피해구제 신청서 안내 보기",
            "피해구제 신청서 (서면)",
            PiFileText,
            "relief",
          ],
          [
            "사건사고사실확인원 안내 보기",
            "사건사고사실확인원",
            PiBank,
            "certificate",
          ],
        ].map(([ariaLabel, label, Icon, id]) => {
          const DocumentIcon = Icon;
          return (
            <button
              key={label as string}
              type="button"
              aria-label={ariaLabel as string}
              onClick={() =>
                setSheet(id as "relief" | "certificate")
              }
              className="flex h-14 w-full items-center justify-between border-y border-[#E8ECEB] bg-white px-5 text-left not-first:border-t-0"
            >
              <span className="flex items-center gap-3 text-[15px]">
                <DocumentIcon className="h-5 w-5" />
                {label as string}
              </span>
              <PiDownloadSimple className="h-5 w-5" />
            </button>
          );
        })}
      </section>

      <div className="px-5 pt-8 pb-4">
        <button
          type="button"
          onClick={() => setSheet("police")}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-[#029C82] font-['Jua'] text-[18px] text-white"
        >
          <PiMapTrifold className="h-5 w-5" />
          담당 경찰서 확인하기
        </button>
      </div>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "relief"
            ? "피해구제 신청서 안내"
            : sheet === "certificate"
              ? "사건사고사실확인원 안내"
              : "경찰서 방문 안내"
        }
        description={
          sheet === "relief"
            ? "피해구제 신청서는 지급정지를 요청한 금융회사 영업점에서 공식 양식을 받아 작성한 뒤, 요청받은 증빙서류와 함께 제출해 주세요."
            : sheet === "certificate"
              ? "사건사고사실확인원은 경찰 신고 후 관할 경찰서의 안내에 따라 발급받습니다. 신분증과 송금·대화 기록을 준비하세요."
              : "사건을 접수한 경찰서와 방문 정보를 확인해 주세요. 방문 전 민원실 운영 시간과 필요한 서류를 확인하면 빠르게 처리할 수 있습니다."
        }
        onClose={() => setSheet(null)}
      >
        {sheet === "police" ? (
          <div className="rounded-[10px] bg-[#F4F8F7] p-3">
            <p className="text-[12px] font-semibold text-[#029C82]">
              사건 담당 경찰서
            </p>
            <p className="mt-1 text-[15px] font-bold text-[#1B1C1C]">
              대구 수성경찰서
            </p>
            <p className="mt-1 text-[12px] leading-[18px]">
              방문 전 신분증과 피해 계좌 이체 내역을 준비해 주세요.
            </p>
          </div>
        ) : null}
      </GoldenActionSheet>
    </GoldenTimeShell>
  );
}
