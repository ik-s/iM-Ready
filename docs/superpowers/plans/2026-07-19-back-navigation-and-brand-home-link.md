# Back Navigation and Brand Home Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add predictable back navigation to every internal Vaccine and Golden Time screen, rename the shared brand to `iM Ready`, and make the brand return to `/home`.

**Architecture:** Extend the existing `AppHeader` with a typed optional `backTo` route and keep routing explicit rather than depending on browser history. Pass the logical parent route from Vaccine pages and through `GoldenTimeShell` for all Golden Time pages, leaving external-entry screens without a back button.

**Tech Stack:** React 19, TypeScript, React Router 7, Tailwind CSS 4, Phosphor React Icons, Vitest, Testing Library

## Global Constraints

- Work on the existing `main` branch.
- Keep the current screen content, bottom navigation, fixed/sticky behavior, and primary CTA behavior unchanged.
- Use the existing Phosphor icon library; do not add an asset or dependency.
- Back controls use the accessible name `이전 화면` and a minimum 40 × 40 px touch target.
- The brand control uses the accessible name `홈으로 이동`, displays `iM Ready`, and routes to `/home`.
- Use explicit logical parent paths so direct URL entry remains predictable.
- Do not add a back button to the external share entry or SMS-only training warning page.

---

### Task 1: Shared Header Navigation API

**Files:**
- Modify: `src/components/AppHeader.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: React Router `useNavigate`, existing fixed/sticky/transparent header flags.
- Produces: `AppHeaderProps.backTo?: string`, brand home action, and optional `이전 화면` control.

- [ ] **Step 1: Write the failing shared-header tests**

Add tests that render an internal screen and verify the new header contract:

```tsx
it("uses the iM Ready brand as a home button", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/events/phishing-challenge/intro"]}>
      <App />
    </MemoryRouter>,
  );

  const brandHome = screen.getByRole("button", { name: "홈으로 이동" });
  expect(brandHome).toHaveTextContent("iM Ready");
  expect(screen.queryByText("iM Shield")).not.toBeInTheDocument();

  await user.click(brandHome);
  expect(
    screen.getByRole("heading", { name: "이번달 피싱 예방 결과" }),
  ).toBeInTheDocument();
});

it("exposes an accessible back control on an internal screen", () => {
  render(
    <MemoryRouter initialEntries={["/events/phishing-challenge/intro"]}>
      <App />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("button", { name: "이전 화면" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: FAIL because `홈으로 이동`, `iM Ready`, and `이전 화면` do not exist yet.

- [ ] **Step 3: Implement the minimal shared header behavior**

Update `AppHeader`:

```tsx
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router";

type AppHeaderProps = {
  backTo?: string;
  fixed?: boolean;
  sticky?: boolean;
  transparent?: boolean;
};

export function AppHeader({ backTo, fixed = false, sticky = true, transparent = false }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={[
          "top-0 z-40 flex h-14 items-center justify-between pr-[8px]",
          backTo ? "pl-1" : "pl-5",
          fixed
            ? "fixed left-1/2 w-full max-w-[390px] -translate-x-1/2"
            : sticky
              ? "sticky"
              : "relative",
          transparent
            ? fixed
              ? "bg-[#E6F8F4]"
              : "bg-transparent"
            : "bg-white",
        ].join(" ")}
      >
        <div className="flex min-w-0 items-center">
          {backTo ? (
            <button
              type="button"
              aria-label="이전 화면"
              onClick={() => navigate(backTo)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#3C4A45]"
            >
              <PiCaretLeft aria-hidden="true" className="h-6 w-6" />
            </button>
          ) : null}

          <button
            type="button"
            aria-label="홈으로 이동"
            onClick={() => navigate("/home")}
            className="flex min-w-0 items-center gap-2"
          >
            <span className="brand-mark" aria-hidden="true">
              <img src={brandMark} alt="" />
            </span>
            <span className="truncate text-[22px] font-bold tracking-[-0.35px] text-[#00BFA6]">
              iM Ready
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label="알림"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
        >
          <img src={bellIcon} alt="" className="h-5 w-4" />
        </button>
      </header>
      {fixed ? <div aria-hidden="true" className="h-14" /> : null}
    </>
  );
}
```

Keep the existing `brandMark` and `bellIcon` imports with the code above.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: the new shared-header tests pass.

### Task 2: Vaccine Logical Back Routes

**Files:**
- Modify: `src/features/challenge/ServiceIntroPage.tsx`
- Modify: `src/features/challenge/ConsentPage.tsx`
- Modify: `src/features/challenge/TrainingSetupPage.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `AppHeaderProps.backTo?: string`.
- Produces: explicit Vaccine route hierarchy without changing the external entry screens.

- [ ] **Step 1: Write the failing Vaccine route tests**

Add a table-driven test:

```tsx
it.each([
  ["/events/phishing-challenge/intro", "AI 피싱 예방 챌린지"],
  ["/events/phishing-challenge/consent", "함께하면 더 안전해져요!"],
  ["/events/phishing-challenge/setup", "개인 정보 수신 동의 여부 확인"],
])("moves back from %s to its logical parent", async (path, destinationHeading) => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

  await user.click(screen.getByRole("button", { name: "이전 화면" }));
  expect(
    screen.getByRole("heading", { name: destinationHeading }),
  ).toBeInTheDocument();
});

it.each([
  "/invites/phishing-challenge/demo",
  "/training/phishing/demo",
])("does not add app back navigation to %s", (path) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

  expect(
    screen.queryByRole("button", { name: "이전 화면" }),
  ).not.toBeInTheDocument();
});
```

If a destination phrase differs from the rendered copy, use its existing unique heading or button name rather than changing product copy.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: FAIL because the Vaccine pages have not supplied their parent paths.

- [ ] **Step 3: Pass explicit parent routes**

Use:

```tsx
<AppHeader backTo="/invites/phishing-challenge/demo" />
<AppHeader backTo="/events/phishing-challenge/intro" />
<AppHeader fixed backTo="/events/phishing-challenge/consent" />
```

Apply them respectively to Service Intro, Consent, and Training Setup. Leave Share Landing and the SMS-only training warning unchanged.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: all Vaccine route tests pass and existing onboarding tests remain green.

### Task 3: Golden Time Logical Back Routes

**Files:**
- Modify: `src/features/golden-time/GoldenTimeShell.tsx`
- Modify: `src/features/golden-time/GoldenTimeHomePage.tsx`
- Modify: `src/features/golden-time/EmergencyStartPage.tsx`
- Modify: `src/features/golden-time/SituationAssessmentPage.tsx`
- Modify: `src/features/golden-time/PaymentStopPage.tsx`
- Modify: `src/features/golden-time/FollowUpPage.tsx`
- Modify: `src/features/golden-time/ActiveIncidentPage.tsx`
- Modify: `src/features/golden-time/IncidentTimelinePage.tsx`
- Modify: `src/features/golden-time/HistoryPage.tsx`
- Modify: `src/features/golden-time/RecordDetailPage.tsx`
- Modify: `src/features/golden-time/TrainingReviewPage.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `AppHeaderProps.backTo?: string`.
- Produces: required `GoldenTimeShellProps.backTo: string` and explicit Golden Time route hierarchy.

- [ ] **Step 1: Write the failing Golden Time route tests**

Add table-driven coverage:

```tsx
it.each([
  ["/golden-time", "이번달 피싱 예방 결과"],
  ["/golden-time/start", "보이스피싱 긴급 대응"],
  ["/golden-time/assessment", "괜찮습니다."],
  ["/golden-time/payment-stop", "언제 송금하셨나요?"],
  ["/golden-time/follow-up", "상황을 파악했습니다."],
  ["/golden-time/incidents", "보이스피싱 긴급 대응"],
  ["/golden-time/incidents/current", "진행 중 사건"],
  ["/golden-time/history", "보이스피싱 긴급 대응"],
  ["/golden-time/history/refund-report", "지난 기록"],
  ["/golden-time/history/training-review", "지난 기록"],
])("moves back from %s to its logical parent", async (path, parentHeading) => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

  await user.click(screen.getByRole("button", { name: "이전 화면" }));
  expect(
    screen.getByRole("heading", { name: parentHeading }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: FAIL because `GoldenTimeShell` does not yet render a back control.

- [ ] **Step 3: Require and forward `backTo` in the shell**

```tsx
type GoldenTimeShellProps = {
  backTo: string;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  topBanner?: ReactNode;
};

export function GoldenTimeShell({ backTo, children, className = "", mainClassName = "", topBanner }: GoldenTimeShellProps) {
  return (
    <div className={`mobile-prototype bg-[#F7F8F8] text-[#1B1C1C] ${className}`}>
      {topBanner}
      <AppHeader backTo={backTo} />
      <main className={`pb-[98px] ${mainClassName}`}>{children}</main>
      <BottomTabBar activeTab="golden" />
    </div>
  );
}
```

- [ ] **Step 4: Pass each Golden Time parent route**

Use the exact mappings:

```text
/golden-time                                  -> /home
/golden-time/start                            -> /golden-time
/golden-time/assessment                       -> /golden-time/start
/golden-time/payment-stop                     -> /golden-time/assessment
/golden-time/follow-up                        -> /golden-time/payment-stop
/golden-time/incidents                        -> /golden-time
/golden-time/incidents/current                -> /golden-time/incidents
/golden-time/history                          -> /golden-time
/golden-time/history/refund-report             -> /golden-time/history
/golden-time/history/training-review           -> /golden-time/history
```

Each page passes its mapped value:

```tsx
<GoldenTimeShell
  backTo="/golden-time"
  mainClassName="bg-white pb-[174px]"
>
```

Only add the `backTo` prop to each existing opening tag; do not alter its current children or other props.

- [ ] **Step 5: Run the focused tests and verify GREEN**

Run:

```bash
npm test -- --run src/app/App.test.tsx
```

Expected: all Golden Time route tests pass, including the existing full response-flow test.

### Task 4: Visual and Build Verification

**Files:**
- Modify: `design-qa.md`
- Create: `design-references/back-navigation-vaccine.png`
- Create: `design-references/back-navigation-golden.png`

**Interfaces:**
- Consumes: completed header and route changes.
- Produces: visual proof and final verification evidence.

- [ ] **Step 1: Verify the Vaccine screen in the in-app browser**

Open `/events/phishing-challenge/setup` and confirm:

```text
header label: iM Ready
back button accessible name: 이전 화면
brand button accessible name: 홈으로 이동
back destination: /events/phishing-challenge/consent
brand destination: /home
horizontal overflow: none
```

- [ ] **Step 2: Verify the Golden Time screen in the in-app browser**

Open `/golden-time/start` and confirm:

```text
header label: iM Ready
back button accessible name: 이전 화면
back destination: /golden-time
brand destination: /home
horizontal overflow: none
```

- [ ] **Step 3: Update the design QA record**

Append the verified routes, screenshots, accessible labels, and responsive findings to `design-qa.md`.

- [ ] **Step 4: Run all automated checks**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
git diff --check
```

Expected: all tests pass, typecheck and production build exit 0, and `git diff --check` produces no output.
