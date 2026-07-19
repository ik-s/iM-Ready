import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { HiCheck, HiXMark } from "react-icons/hi2";

import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";
import { CheckMark } from "../../components/CheckMark";

const initialSelections = {
  collection: false,
  provision: false,
  channelGroup: false,
  sms: false,
  phone: false,
  mail: false,
};

const safeTrainingTerms = [
  "본 서비스는 금융사기 대응 능력을 높이기 위한 안전한 모의훈련입니다. 실제 송금, 앱 설치, 원격제어 또는 금융거래는 발생하지 않습니다.",
  "동의 시 매월 최대 1회, 예고 없이 모의 피싱 문자가 발송될 수 있습니다. 링크 클릭, 중단 지점, 공식 앱 확인 여부 등 대응 행동만 기록합니다.",
  "계좌번호, 비밀번호, 인증번호 등 사용자가 입력한 실제 정보는 저장하지 않으며, 훈련 종료 후 개인별 복기 리포트를 제공합니다.",
  "훈련은 언제든 일시정지하거나 철회할 수 있으며, 실제 피해가 의심되면 반드시 iM뱅크 공식 앱이나 고객센터를 통해 확인해 주세요.",
] as const;

type SelectionKey = keyof typeof initialSelections;
type TermsKey = "collection" | "provision" | "channelGroup";

type TermsDocument = {
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

const termsDocuments: Record<TermsKey, TermsDocument> = {
  collection: {
    title: "개인정보 수집이용에 관한 사항 [마케팅]",
    summary:
      "마케팅 목적의 상품·서비스 안내를 위해 아래 개인정보를 수집·이용합니다.",
    sections: [
      {
        heading: "1. 수집·이용 목적",
        body: "금융상품·서비스 안내, 이벤트·프로모션 안내, AI 사기 백신 훈련 관련 선택형 안내 발송을 위해 개인정보를 수집·이용합니다.",
      },
      {
        heading: "2. 수집·이용 항목",
        body: "성명, 휴대전화번호, 이메일 주소, 고객 구분 정보, 서비스 이용 기록(안내 수신·열람 여부)을 수집·이용할 수 있습니다. 계좌번호, 비밀번호, 인증번호 등 민감 금융정보는 수집하지 않습니다.",
      },
      {
        heading: "3. 보유 및 이용 기간",
        body: "동의일로부터 마케팅 동의 철회 또는 회원 탈퇴 시까지 보유·이용합니다. 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.",
      },
      {
        heading: "4. 동의 거부 권리 및 불이익",
        body: "본 동의는 선택 사항입니다. 동의하지 않아도 AI 사기 백신 훈련의 기본 참여는 가능하며, 다만 마케팅 목적의 상품·서비스 안내는 제공되지 않을 수 있습니다.",
      },
      {
        heading: "5. 철회 방법",
        body: "iM뱅크 공식 앱 또는 고객센터를 통해 언제든지 마케팅 목적 수집·이용 동의를 철회할 수 있습니다.",
      },
    ],
  },
  provision: {
    title: "개인정보 제공에 관한 사항",
    summary:
      "마케팅 및 제휴 안내를 위해 필요한 범위에서 개인정보를 제3자에게 제공할 수 있습니다.",
    sections: [
      {
        heading: "1. 제공 목적",
        body: "제휴 금융상품·서비스 안내, 공동 프로모션 운영, 고객 맞춤형 안내 제공을 위해 개인정보를 제공합니다.",
      },
      {
        heading: "2. 제공 받는 자",
        body: "iM뱅크와 제휴 계약을 체결한 금융·비금융 제휴사(보험, 카드, 투자상품 관련 제휴사 등)에 한해 제공합니다. 실제 제공 시 공식 앱에서 제공받는 자를 확인할 수 있습니다.",
      },
      {
        heading: "3. 제공 항목",
        body: "성명, 휴대전화번호, 이메일 주소, 고객 구분 정보 등 안내에 필요한 최소한의 항목만 제공합니다. 비밀번호·인증번호·계좌 비밀번호는 제공하지 않습니다.",
      },
      {
        heading: "4. 제공 및 보유 기간",
        body: "제공 목적 달성 또는 동의 철회 시까지 보유·이용하며, 이후에는 지체 없이 파기합니다. 법령상 보관 의무가 있는 경우 해당 기간 동안 보관할 수 있습니다.",
      },
      {
        heading: "5. 동의 거부 권리",
        body: "본 제공 동의는 선택 사항이며, 거부하셔도 서비스 이용에 필수적인 불이익은 없습니다. 다만 제휴 상품·서비스 안내는 제한될 수 있습니다.",
      },
    ],
  },
  channelGroup: {
    title: "상품서비스 안내 수단 [통합]",
    summary:
      "선택하신 안내 수단(문자, 전화, 우편)으로 상품·서비스 및 훈련 관련 안내를 받을 수 있습니다.",
    sections: [
      {
        heading: "1. 안내 수단",
        body: "문자(SMS/LMS), 전화(ARS·상담 통화), 우편(등기·일반 우편) 중 고객이 선택한 수단으로 상품·서비스 안내 및 이벤트 정보를 발송할 수 있습니다.",
      },
      {
        heading: "2. 안내 내용",
        body: "예·적금, 대출, 카드, 보험 등 금융상품 안내와 AI 사기 백신 훈련 관련 선택형 안내가 포함될 수 있습니다. 실제 송금 요청이나 앱 설치를 요구하는 안내는 발송하지 않습니다.",
      },
      {
        heading: "3. 발송 빈도",
        body: "과도한 안내를 방지하기 위해 합리적인 범위 내에서 발송하며, 수신 거부 시 해당 수단의 안내를 즉시 중단합니다.",
      },
      {
        heading: "4. 개별 수단 선택",
        body: "통합 동의 후에도 문자·전화·우편 중 원하는 수단만 따로 선택할 수 있습니다. 선택하지 않은 수단으로는 안내를 발송하지 않습니다.",
      },
      {
        heading: "5. 수신 거부",
        body: "안내 문자 내 수신 거부, 공식 앱 설정, 또는 고객센터를 통해 언제든지 안내 수단별 수신을 거부하거나 동의를 철회할 수 있습니다.",
      },
    ],
  },
};

const primaryButtonClassName =
  "h-[51px] w-[300px] rounded-[10px] border border-[#087C6E] bg-[#08A78F] font-['Jua'] text-[22px] tracking-[-0.5px] text-white shadow-[0_4px_6px_rgba(27,57,51,0.22)] transition disabled:cursor-not-allowed disabled:border-[#A7B1AF] disabled:bg-[#B9C3C1] active:translate-y-0.5";

type ConsentOptionProps = {
  name: TermsKey;
  label: string;
  checked: boolean;
  onToggle: (name: TermsKey) => void;
  onOpenTerms: (name: TermsKey) => void;
};

function ConsentOption({
  name,
  label,
  checked,
  onToggle,
  onOpenTerms,
}: ConsentOptionProps) {
  return (
    <div className="flex min-h-[55px] items-center gap-[9px] px-[11px]">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onToggle(name)}
        className="shrink-0"
      >
        <CheckMark checked={checked} />
      </button>
      <button
        type="button"
        onClick={() => onOpenTerms(name)}
        className="flex-1 py-2 text-left text-[14px] leading-[19px] tracking-[-0.3px] text-[#3C3C3C]"
      >
        {label}
      </button>
    </div>
  );
}

type ChannelOptionProps = {
  name: SelectionKey;
  label: string;
  shortLabel: string;
  checked: boolean;
  onChange: (name: SelectionKey, checked: boolean) => void;
};

function ChannelOption({
  name,
  label,
  shortLabel,
  checked,
  onChange,
}: ChannelOptionProps) {
  return (
    <label className="flex cursor-pointer items-center gap-[6px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(name, event.target.checked)}
        className="sr-only"
        aria-label={label}
      />
      <span
        aria-hidden="true"
        className={[
          "grid h-4 w-4 place-items-center",
          checked ? "text-[#00A58F]" : "text-[#B9C0BE]",
        ].join(" ")}
      >
        <HiCheck className="h-4 w-4" />
      </span>
      <span className="text-[14px] tracking-[-0.2px] text-[#494949]">
        {shortLabel}
      </span>
    </label>
  );
}

type TermsSheetProps = {
  termsKey: TermsKey;
  onAgree: (name: TermsKey) => void;
  onClose: () => void;
};

function TermsSheet({ termsKey, onAgree, onClose }: TermsSheetProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const terms = termsDocuments[termsKey];

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.document.addEventListener("keydown", handleKeyDown);
    return () =>
      window.document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40"
      onPointerDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="flex h-[min(86dvh,720px)] w-full max-w-[390px] flex-col rounded-t-[24px] bg-white shadow-[0_-12px_40px_rgba(13,45,38,0.2)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#E8ECEB] px-5 pt-5 pb-4">
          <div className="min-w-0 text-left">
            <p className="text-[12px] font-semibold tracking-[-0.2px] text-[#029C82]">
              약관 확인
            </p>
            <h2
              id={titleId}
              className="mt-1 text-[18px] leading-[26px] font-bold tracking-[-0.4px] text-black"
            >
              {terms.title}
            </h2>
            <p
              id={descriptionId}
              className="mt-2 text-[13px] leading-[19px] text-[#4A4A4A]"
            >
              {terms.summary}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="약관 닫기"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F3F6F5] text-[#3C4A45]"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-8 text-left">
          <div className="space-y-5">
            {terms.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-[15px] leading-[22px] font-bold text-[#1B1C1C]">
                  {section.heading}
                </h3>
                <p className="mt-2 text-[13px] leading-[20px] tracking-[-0.2px] text-[#3C4A45]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 flex justify-center pb-[max(12px,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => onAgree(termsKey)}
              className={primaryButtonClassName}
            >
              동의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConsentPage() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(initialSelections);
  const [openTerms, setOpenTerms] = useState<TermsKey | null>(null);

  const updateSelection = (name: SelectionKey, checked: boolean) => {
    setSelections((current) => ({ ...current, [name]: checked }));
  };

  const openTermsSheet = (name: TermsKey) => {
    setOpenTerms(name);
  };

  const toggleTermsOption = (name: TermsKey) => {
    if (selections[name]) {
      updateSelection(name, false);
      return;
    }

    openTermsSheet(name);
  };

  const agreeToTerms = (name: TermsKey) => {
    updateSelection(name, true);
    setOpenTerms(null);
  };

  const allSelected = Object.values(selections).every(Boolean);

  return (
    <div className="mobile-prototype bg-[#F7F8F8]">
      <AppHeader backTo="/events/phishing-challenge/intro" />

      <main className="bg-[#F7F8F8] pb-[82px] text-center">
        <section className="h-[661px] px-5 pt-[25px]">
          <h1 className="text-[26px] leading-[34px] font-bold tracking-[-1px] text-black">
            개인 정보 수신 동의 여부 확인
          </h1>
          <p className="mt-[18px] text-[15px] leading-[24px] font-medium tracking-[-0.4px] text-[#4A4A4A]">
            AI 사기 백신 훈련 참여를 위해 동의 여부를
            <br />
            꼭 확인해주세요
          </p>

          <article className="mt-[19px] h-[343px] rounded-[27px] bg-white px-[21px] pt-[15px] text-left shadow-[0_5px_7px_rgba(0,0,0,0.2)]">
            <h2 className="text-[23px] leading-[31px] font-medium tracking-[-0.7px] text-black">
              개인(신용)정보 활용동의
            </h2>
            <p className="mt-[2px] text-[15px] leading-[22px] tracking-[-0.3px] text-[#303030]">
              [선택] 마케팅목적 이용제공동의
            </p>

            <div className="mt-[9px] divide-y divide-[#AFAFAF] rounded-[10px] border border-[#AFAFAF]">
              <ConsentOption
                name="collection"
                label="개인정보 수집이용에 관한 사항 [마케팅]"
                checked={selections.collection}
                onToggle={toggleTermsOption}
                onOpenTerms={openTermsSheet}
              />
              <ConsentOption
                name="provision"
                label="개인정보 제공에 관한 사항"
                checked={selections.provision}
                onToggle={toggleTermsOption}
                onOpenTerms={openTermsSheet}
              />
            </div>

            <div className="mt-[24px] rounded-[10px] border border-[#AFAFAF]">
              <ConsentOption
                name="channelGroup"
                label="상품서비스 안내 수단 [통합]"
                checked={selections.channelGroup}
                onToggle={toggleTermsOption}
                onOpenTerms={openTermsSheet}
              />
              <div className="mx-[11px] flex h-[38px] items-center justify-center gap-[18px] border-t border-[#AFAFAF]">
                <ChannelOption
                  name="sms"
                  label="문자"
                  shortLabel="문자"
                  checked={selections.sms}
                  onChange={updateSelection}
                />
                <ChannelOption
                  name="phone"
                  label="전화"
                  shortLabel="전화"
                  checked={selections.phone}
                  onChange={updateSelection}
                />
                <ChannelOption
                  name="mail"
                  label="우편"
                  shortLabel="우편"
                  checked={selections.mail}
                  onChange={updateSelection}
                />
              </div>
            </div>
          </article>

          <button
            type="button"
            disabled={!allSelected}
            onClick={() => navigate("/events/phishing-challenge/setup")}
            className={`mt-[28px] ${primaryButtonClassName}`}
          >
            챌린지 하러가기
          </button>

          <button
            type="button"
            onClick={() => navigate("/events/phishing-challenge/intro")}
            className="mt-[32px] block w-full text-center text-[19px] leading-[28px] font-semibold tracking-[-0.5px] text-[#6A6A6A]"
          >
            <span className="mx-auto mb-[7px] block h-px w-[63px] bg-[#9D9D9D]" />
            나중에 할게요
          </button>
        </section>

        <section className="min-h-[450px] bg-[#4A4747] px-5 pt-[30px] pb-[36px] text-white">
          <h2 className="text-[21px] leading-[29px] font-bold tracking-[-0.6px]">
            꼭 기억해주세요
          </h2>
          <div className="mt-[8px] border-t border-white/80 pt-[16px] text-left">
            <h3 className="text-center text-[16px] leading-[22px] font-semibold">
              훈련 참여 안내
            </h3>
            <ul className="mt-[12px] list-disc space-y-[17px] pl-[23px] pr-[7px] text-[13px] leading-[18px] font-medium tracking-[-0.2px] text-white/95">
              {safeTrainingTerms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <BottomTabBar />

      {openTerms ? (
        <TermsSheet
          termsKey={openTerms}
          onAgree={agreeToTerms}
          onClose={() => setOpenTerms(null)}
        />
      ) : null}
    </div>
  );
}
