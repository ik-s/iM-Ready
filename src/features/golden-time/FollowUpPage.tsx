import { useState } from "react";
import {
  PiBank,
  PiCaretRight,
  PiCheck,
  PiFileText,
  PiInfo,
  PiShieldCheck,
} from "react-icons/pi";
import { useNavigate } from "react-router";

import {
  GoldenActionSheet,
  GoldenToast,
  useGoldenToast,
} from "./GoldenFeedback";
import { GoldenDivider, GoldenTimeShell } from "./GoldenTimeShell";

const checklist = [
  { id: "police", label: "경찰 신고", meta: "즉시 완료" },
  {
    id: "certificate",
    label: "사건사고사실확인원 발급",
    meta: "안내 보기",
  },
  { id: "written", label: "서면 신청", meta: "3영업일 이내 필수" },
];

export function FollowUpPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [sheet, setSheet] = useState<
    "certificate" | "written" | "document" | null
  >(null);
  const documentNotice = useGoldenToast();
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <GoldenTimeShell
      backTo="/golden-time/payment-stop"
      mainClassName="bg-[#F7F8F8] pb-[102px]"
    >
      <section className="border-b border-[#E8ECEB] bg-white px-5 pt-8 pb-8">
        <h1 className="text-[24px] leading-8 font-bold">후속 절차 가이드</h1>
        <p className="mt-2 text-[15px] leading-6 text-[#3C4A45]">
          금융사기 피해 회복을 위해
          <br />
          아래 절차를 차례대로 신속히 진행해 주세요.
        </p>
      </section>

      <GoldenDivider />

      <section className="border-b border-[#E8ECEB] bg-white pt-3">
        <p className="px-5 pb-3 text-[12px] tracking-[0.6px] text-[#66736E]">
          체크리스트
        </p>
        {checklist.map((item) => {
          const selected = checked.includes(item.id);

          return (
            <div
              key={item.id}
              className="flex min-h-[58px] items-center justify-between gap-3 border-t border-[#E8ECEB] px-5 first:border-t-0"
            >
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => toggle(item.id)}
                className="flex min-w-0 flex-1 items-center gap-4 py-3 text-left"
              >
                <span
                  aria-hidden="true"
                  className={[
                    "grid h-5 w-5 place-items-center rounded-[4px] border",
                    selected
                      ? "border-[#029C82] bg-[#029C82] text-white"
                      : "border-[#D1D5DB] bg-white",
                  ].join(" ")}
                >
                  {selected ? <PiCheck className="h-3 w-3" /> : null}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold">
                    {item.label}
                  </span>
                  {item.id === "written" ? (
                    <span className="text-[11px] text-[#E53935]">
                      3영업일 이내 필수
                    </span>
                  ) : null}
                </span>
              </button>
              {item.id === "certificate" ? (
                <button
                  type="button"
                  aria-label="사건사고사실확인원 발급 안내"
                  onClick={() => setSheet("certificate")}
                  className="grid h-10 w-10 place-items-center rounded-full text-[#98A4A0]"
                >
                  <PiInfo className="h-5 w-5" />
                </button>
              ) : item.id === "written" ? (
                <button
                  type="button"
                  aria-label="서면 신청 안내"
                  onClick={() => setSheet("written")}
                  className="grid h-10 w-10 place-items-center rounded-full text-[#98A4A0]"
                >
                  <PiCaretRight className="h-6 w-6" />
                </button>
              ) : (
                <span className="text-[12px] text-[#3C4A45]">
                  {item.meta}
                </span>
              )}
            </div>
          );
        })}
      </section>

      <GoldenDivider />

      <section className="border-b border-[#E8ECEB] bg-white px-5 py-4">
        <p className="text-[12px] tracking-[0.6px] text-[#66736E]">
          제출 필요 서류
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["신분증", "사건사고사실확인원", "송금내역", "대화기록"].map(
            (document) => (
              <span
                key={document}
                className="rounded-[4px] bg-[#F0F4F3] px-[10px] py-1 text-[12px] text-[#3C4A45]"
              >
                {document}
              </span>
            ),
          )}
        </div>
        <button
          ref={documentNotice.triggerRef}
          type="button"
          onClick={() => {
            setSheet("document");
            documentNotice.showToast(
              "피해경위서 초안을 작성했습니다.",
            );
          }}
          className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#029C82] font-['Jua'] text-[18px] text-white"
        >
          <PiFileText className="h-5 w-5" />
          피해경위서 자동 작성
        </button>
      </section>

      <button
        type="button"
        aria-label="진행 중인 사건 진행 중인 피싱 대응 조회"
        onClick={() =>
          navigate("/golden-time/incidents", {
            state: { backTo: "/golden-time/follow-up" },
          })
        }
        className="flex w-full items-center justify-between border-b border-[#E8ECEB] bg-white px-5 py-5 text-left"
      >
        <span className="flex items-center gap-3">
          <PiBank className="h-6 w-6" />
          <span>
            <span className="block text-[15px] font-semibold">
              진행 중인 사건
            </span>
            <span className="block text-[12px] text-[#3C4A45]">
              진행 중인 피싱 대응 조회
            </span>
          </span>
        </span>
        <PiCaretRight className="text-[#98A4A0]" />
      </button>

      <div className="p-5">
        <section className="rounded-[14px] border border-[#CDE7E1] bg-gradient-to-br from-[#ECFBF7] to-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#029C82] shadow-sm">
              <PiShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-[16px] font-bold">
                추가 피해 예방 체크
              </h2>
              <p className="mt-1 text-[12px] leading-[18px] text-[#3C4A45]">
                완료 표시가 아니라, 공식 채널에서 계속 확인해야 할
                항목입니다.
              </p>
            </div>
          </div>
          <ul className="mt-4 grid gap-2 text-[13px]">
            {[
              "악성 앱·원격제어 권한 확인",
              "명의도용·신규 대출 여부 확인",
              "금융회사 공식 고객센터 재확인",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-[8px] bg-white px-3 py-2"
              >
                <PiCheck className="h-4 w-4 text-[#029C82]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <GoldenActionSheet
        open={sheet !== null}
        title={
          sheet === "certificate"
            ? "사건사고사실확인원 발급 안내"
            : sheet === "written"
              ? "서면 신청 안내"
              : "피해경위서 초안"
        }
        description={
          sheet === "certificate"
            ? "관할 경찰서에서 사건 접수 후 발급 절차와 필요한 신분증·이체내역을 확인하세요."
            : sheet === "written"
              ? "지급정지 요청 후 안내받은 기한 안에 금융회사 영업점에서 피해구제 서면 신청을 진행하세요."
              : "확인된 사건 내용을 바탕으로 사건 시점, 사칭 유형, 송금 여부를 정리했습니다. 내용을 확인하고 필요한 증빙서류를 함께 준비해 주세요."
        }
        onClose={() => setSheet(null)}
      >
        {sheet === "document" ? (
          <dl className="grid gap-2 rounded-[10px] bg-[#F4F8F7] p-3 text-[13px]">
            <div className="flex justify-between gap-3">
              <dt className="text-[#66736E]">사칭 유형</dt>
              <dd className="font-semibold">기관사칭</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-[#66736E]">대응 상태</dt>
              <dd className="font-semibold">서면 신청 준비 중</dd>
            </div>
          </dl>
        ) : null}
      </GoldenActionSheet>

      <GoldenToast
        id={documentNotice.toastId}
        message={documentNotice.message}
        onClose={documentNotice.dismissToast}
        toastRef={documentNotice.toastRef}
      />
    </GoldenTimeShell>
  );
}
