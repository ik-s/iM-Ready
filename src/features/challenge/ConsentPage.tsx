import { useState } from "react";
import { useNavigate } from "react-router";
import { HiCheck } from "react-icons/hi2";

import { AppHeader } from "../../components/AppHeader";
import { BottomTabBar } from "../../components/BottomTabBar";
import { CheckMark } from "../../components/CheckMark";

const initialSelections = {
  collection: true,
  provision: true,
  channelGroup: true,
  sms: true,
  phone: true,
  mail: true,
};

const safeTrainingTerms = [
  "본 서비스는 금융사기 대응 능력을 높이기 위한 안전한 모의훈련입니다. 실제 송금, 앱 설치, 원격제어 또는 금융거래는 발생하지 않습니다.",
  "동의 시 매월 최대 1회, 예고 없이 모의 피싱 문자가 발송될 수 있습니다. 링크 클릭, 중단 지점, 공식 앱 확인 여부 등 대응 행동만 기록합니다.",
  "계좌번호, 비밀번호, 인증번호 등 사용자가 입력한 실제 정보는 저장하지 않으며, 훈련 종료 후 개인별 복기 리포트를 제공합니다.",
  "훈련은 언제든 일시정지하거나 철회할 수 있으며, 실제 피해가 의심되면 반드시 iM뱅크 공식 앱이나 고객센터를 통해 확인해 주세요.",
] as const;

type SelectionKey = keyof typeof initialSelections;

type ConsentOptionProps = {
  name: SelectionKey;
  label: string;
  checked: boolean;
  onChange: (name: SelectionKey, checked: boolean) => void;
};

function ConsentOption({
  name,
  label,
  checked,
  onChange,
}: ConsentOptionProps) {
  return (
    <label className="flex min-h-[55px] cursor-pointer items-center gap-[9px] px-[11px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(name, event.target.checked)}
        className="sr-only"
      />
      <CheckMark checked={checked} />
      <span className="text-[14px] leading-[19px] tracking-[-0.3px] text-[#3C3C3C]">
        {label}
      </span>
    </label>
  );
}

type ChannelOptionProps = ConsentOptionProps & {
  shortLabel: string;
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

export function ConsentPage() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(initialSelections);
  const [submitted, setSubmitted] = useState(false);

  const updateSelection = (name: SelectionKey, checked: boolean) => {
    setSelections((current) => ({ ...current, [name]: checked }));
    setSubmitted(false);
  };

  const allSelected = Object.values(selections).every(Boolean);

  return (
    <div className="mobile-prototype bg-[#F7F8F8]">
      <AppHeader />

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
                onChange={updateSelection}
              />
              <ConsentOption
                name="provision"
                label="개인정보 제공에 관한 사항"
                checked={selections.provision}
                onChange={updateSelection}
              />
            </div>

            <div className="mt-[24px] rounded-[10px] border border-[#AFAFAF]">
              <ConsentOption
                name="channelGroup"
                label="상품서비스 안내 수단 [통합]"
                checked={selections.channelGroup}
                onChange={updateSelection}
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
            onClick={() => setSubmitted(true)}
            className="mt-[28px] h-[51px] w-[300px] rounded-[10px] border border-[#087C6E] bg-[#08A78F] font-['Jua'] text-[22px] tracking-[-0.5px] text-white shadow-[0_4px_6px_rgba(27,57,51,0.22)] transition disabled:cursor-not-allowed disabled:border-[#A7B1AF] disabled:bg-[#B9C3C1] active:translate-y-0.5"
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

        <section className="min-h-[520px] bg-[#4A4747] px-5 pt-[30px] pb-[36px] text-white">
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

      {submitted ? (
        <p
          role="status"
          className="fixed bottom-[94px] left-1/2 z-[60] w-[calc(100%_-_40px)] max-w-[350px] -translate-x-1/2 rounded-xl bg-[#1F3E38] px-4 py-3 text-center text-[14px] font-medium text-white shadow-lg"
        >
          데모는 개인정보 동의 화면까지 제공됩니다.
        </p>
      ) : null}

      <BottomTabBar />
    </div>
  );
}
