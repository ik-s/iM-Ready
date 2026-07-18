import { useState } from "react";
import { PiCaretRight } from "react-icons/pi";
import { useNavigate } from "react-router";

import {
  historyRecords,
  type HistoryRecordType,
} from "./goldenTimeDemoData";
import { GoldenTimeShell } from "./GoldenTimeShell";

export function HistoryPage() {
  const [filter, setFilter] = useState<
    "all" | HistoryRecordType
  >("all");
  const navigate = useNavigate();
  const visible =
    filter === "all"
      ? historyRecords
      : historyRecords.filter((record) => record.type === filter);

  return (
    <GoldenTimeShell
      backTo="/golden-time"
      mainClassName="min-h-[829px] bg-white"
    >
      <section className="px-5 pt-4 pb-2">
        <h1 className="text-[24px] leading-[33px] font-bold">지난 기록</h1>
        <p className="mt-1 text-[14px] text-[#3C4A45]">
          보안 활동 및 교육 이력을 확인하세요.
        </p>
      </section>

      <div
        role="tablist"
        aria-label="기록 유형"
        className="mx-5 mt-4 grid grid-cols-3 gap-1 rounded-[8px] bg-[#F2F4F5] p-1"
      >
        {[
          ["all", "전체"],
          ["real", "실전"],
          ["training", "훈련"],
        ].map(([id, label]) => {
          const selected = filter === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() =>
                setFilter(id as "all" | HistoryRecordType)
              }
              className={[
                "h-9 rounded-[7px] text-[14px]",
                selected
                  ? "bg-white text-[#1B1C1C] shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                  : "text-[#3C4A45]",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>

      <section className="mt-4 border-t border-[#E8ECEB]">
        {visible.map((record) => (
          <button
            key={record.id}
            type="button"
            onClick={() => navigate(record.route)}
            className="block w-full border-b border-[#E8ECEB] px-5 py-5 text-left"
          >
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#3C4A45]">{record.date}</span>
              <span
                className={
                  record.type === "real"
                    ? "font-semibold text-[#00BFA6]"
                    : "font-semibold text-[#3C4A45]"
                }
              >
                {record.badge}
              </span>
            </div>
            <h2 className="mt-1 text-[16px] font-bold">{record.title}</h2>
            <p className="mt-1 text-[14px] leading-[20px] text-[#3C4A45]">
              {record.description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span
                className={[
                  "text-[15px] font-bold",
                  record.type === "real"
                    ? "text-[#00BFA6]"
                    : "text-[#1B1C1C]",
                ].join(" ")}
              >
                {record.result}
              </span>
              <PiCaretRight className="h-4 w-4 text-[#98A4A0]" />
            </div>
          </button>
        ))}
      </section>
    </GoldenTimeShell>
  );
}
