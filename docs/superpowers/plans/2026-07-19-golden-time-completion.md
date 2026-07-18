# Golden Time Demo Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete every visible Golden Time demo interaction with honest local feedback, consistent records, accessible state changes, documentation, and a verified production deployment.

**Architecture:** Keep the current React Router route tree and Figma-derived page layouts. Add one shared demo-data module and one shared feedback module, then update each route to consume those interfaces and expose local dialog, toast, and completion states without backend calls.

**Tech Stack:** TypeScript 7, React 19, React Router 8, Vite 8, Tailwind CSS 4, React Icons 5, Vitest 4, Testing Library, npm 11

## Global Constraints

- Work directly on `main`; do not create another branch or worktree.
- Do not add a backend, external API, persistence, device permission, microphone access, location access, financial transaction, report submission, phone call, or real document download.
- Do not claim that iM Ready executed a payment stop, police report, security setting, document submission, or refund.
- Do not use a financial-immunity score, security score, or equivalent single-number evaluation.
- Preserve the bottom navigation labels `홈 / 상품 / 백신 / 골든 / 전체`.
- Preserve existing routes and logical back navigation.
- Use npm and commit `package-lock.json`; remove the pnpm lockfile.
- Do not deploy until all automated and browser checks pass.

---

### Task 1: Shared Golden Time data and feedback primitives

**Files:**
- Create: `src/features/golden-time/goldenTimeDemoData.ts`
- Create: `src/features/golden-time/GoldenFeedback.tsx`
- Modify: `src/features/golden-time/GoldenTimeShell.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Produces: `currentIncident`, `historyRecords`, `completedRefundRecord`, `recentDetectionExamples`
- Produces: `GoldenActionSheet`, `GoldenToast`, `useGoldenToast`
- Produces: `GoldenFixedAction({ completed?: boolean })`

- [ ] **Step 1: Write failing shared-feedback and shared-data tests**

Add tests that render a route using `GoldenActionSheet`, close it with its secondary button, verify a toast dismisses after 3,000 ms, and assert the same completed-refund amount appears in history and detail.

```tsx
expect(screen.getByRole("dialog", { name: "지급정지 절차 안내" })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "닫기" }));
expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

expect(screen.getByText("4,250,000원 환급 완료")).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL because the dialog behavior and shared record values are not implemented.

- [ ] **Step 3: Implement shared data and feedback**

Define typed records and stable 2026 demo values. Implement a modal action sheet using a portal-free fixed overlay with `role="dialog"`, `aria-modal="true"`, Escape handling, initial focus, backdrop dismissal, and trigger-focus restoration. Implement a toast hook that clears existing timers, dismisses after 3,000 ms, and removes its outside-pointer listener on cleanup.

```ts
export type GoldenSheetState = {
  title: string;
  description: string;
  primaryLabel?: string;
  onPrimary?: () => void;
} | null;
```

- [ ] **Step 4: Run focused and full tests and verify GREEN**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: all app tests pass.

- [ ] **Step 5: Commit the shared foundation**

```bash
git add src/features/golden-time/goldenTimeDemoData.ts \
  src/features/golden-time/GoldenFeedback.tsx \
  src/features/golden-time/GoldenTimeShell.tsx \
  src/app/App.test.tsx
git commit -m "feat: add golden time feedback foundation"
```

### Task 2: Complete the urgent-response flow

**Files:**
- Modify: `src/features/golden-time/GoldenTimeHomePage.tsx`
- Modify: `src/features/golden-time/EmergencyStartPage.tsx`
- Modify: `src/features/golden-time/SituationAssessmentPage.tsx`
- Modify: `src/features/golden-time/PaymentStopPage.tsx`
- Modify: `src/features/golden-time/FollowUpPage.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `currentIncident`, `recentDetectionExamples`
- Consumes: `GoldenActionSheet`, `GoldenToast`, `useGoldenToast`
- Produces: a payment-stop acknowledgement gate before follow-up

- [ ] **Step 1: Write failing response-flow tests**

Add tests proving:

```tsx
expect(screen.getByText("필요한 보호·신고 절차를 순서대로 안내합니다.")).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "전체보기" }));
expect(screen.getByRole("dialog", { name: "최근 보안 안내 예시" })).toBeInTheDocument();

await user.click(screen.getByRole("button", { name: "음성으로 답하기" }));
await vi.advanceTimersByTimeAsync(800);
expect(screen.getByRole("radio", { name: /방금/ })).toBeChecked();

await user.click(screen.getByRole("button", { name: "지급정지 절차 확인하기" }));
expect(screen.getByRole("heading", { name: "후속 절차 가이드" })).not.toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "안내를 확인하고 계속하기" }));
expect(screen.getByRole("heading", { name: "후속 절차 가이드" })).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL on the new copy, dialog, voice-resolution, and acknowledgement assertions.

- [ ] **Step 3: Implement response-flow behavior**

Use shared data on home, use sheets for detection history and payment guidance, resolve voice simulation in 800 ms with timer cleanup, add progress semantics, and replace external-execution claims. Replace follow-up document generation with a preview sheet and honest example-prepared toast.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: all app tests pass with no fake-timer leaks.

- [ ] **Step 5: Commit the response flow**

```bash
git add src/features/golden-time/GoldenTimeHomePage.tsx \
  src/features/golden-time/EmergencyStartPage.tsx \
  src/features/golden-time/SituationAssessmentPage.tsx \
  src/features/golden-time/PaymentStopPage.tsx \
  src/features/golden-time/FollowUpPage.tsx \
  src/app/App.test.tsx
git commit -m "feat: complete golden time response flow"
```

### Task 3: Complete incidents, timeline, history, and review modes

**Files:**
- Modify: `src/features/golden-time/ActiveIncidentPage.tsx`
- Modify: `src/features/golden-time/IncidentTimelinePage.tsx`
- Modify: `src/features/golden-time/HistoryPage.tsx`
- Modify: `src/features/golden-time/RecordDetailPage.tsx`
- Modify: `src/features/golden-time/TrainingReviewPage.tsx`
- Modify: `src/features/golden-time/GoldenTimeHomePage.tsx`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: all shared record types and feedback primitives
- Produces: query modes `training`, `education`, and `settings`

- [ ] **Step 1: Write failing incident and record tests**

Add tests proving:

```tsx
await user.click(screen.getByRole("button", { name: "피해구제 신청서 안내 보기" }));
expect(screen.getByRole("dialog", { name: "피해구제 신청서 안내" })).toBeInTheDocument();

await user.click(screen.getByRole("button", { name: "가까운 경찰서 찾기" }));
expect(screen.getByText("현재 위치는 사용하지 않았습니다.")).toBeInTheDocument();

await user.click(screen.getByRole("button", { name: "이 단계 완료 표시" }));
await user.click(screen.getByRole("button", { name: "완료로 표시하기" }));
expect(screen.getByRole("button", { name: "완료 표시됨" })).toBeDisabled();

expect(screen.queryByText(/보안 등급|\\+5pt|사건 발생 위치/)).not.toBeInTheDocument();
expect(screen.getByRole("heading", { name: "대출사기 예방 교육 복기" })).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL because document, police, support, completion, data, and record-mode behavior is missing.

- [ ] **Step 3: Implement incident and record behavior**

Render shared data across list and detail. Open sheets for document, police, and support guidance. Confirm timeline completion once, expose semantic progress values, replace the location map with processing institutions, and use `useSearchParams()` to render training, education, or settings content.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: all app tests pass and no prohibited copy remains.

- [ ] **Step 5: Commit incident and history completion**

```bash
git add src/features/golden-time/ActiveIncidentPage.tsx \
  src/features/golden-time/IncidentTimelinePage.tsx \
  src/features/golden-time/HistoryPage.tsx \
  src/features/golden-time/RecordDetailPage.tsx \
  src/features/golden-time/TrainingReviewPage.tsx \
  src/features/golden-time/GoldenTimeHomePage.tsx \
  src/app/App.test.tsx
git commit -m "feat: complete golden time records and incidents"
```

### Task 4: Shared navigation feedback and README

**Files:**
- Modify: `src/components/AppHeader.tsx`
- Modify: `src/components/BottomTabBar.tsx`
- Modify: `src/app/App.tsx`
- Create: `README.md`
- Test: `src/app/App.test.tsx`

**Interfaces:**
- Consumes: `GoldenToast` or equivalent shared app-level toast behavior
- Produces: honest placeholder feedback for notification, product, and all controls

- [ ] **Step 1: Write failing shared-navigation tests**

```tsx
await user.click(screen.getByRole("button", { name: "알림" }));
expect(screen.getByText("새로운 알림은 아직 없습니다.")).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: "상품" }));
expect(screen.getByText("상품 메뉴는 데모 준비 중입니다.")).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- --run src/app/App.test.tsx`

Expected: FAIL because the controls currently do nothing.

- [ ] **Step 3: Implement navigation feedback**

Add optional `onNotice` callbacks to header and bottom navigation, route notices through the shell/page owner, and ensure the toast does not obscure fixed actions.

- [ ] **Step 4: Write the README**

Document the service, limits, stack, npm commands, route table, Golden Time flow, source layout, verification commands, Vercel deployment, AWS MVP direction, and privacy/safety principles. Use only commands present in `package.json`.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `npm test -- --run`

Expected: every test file passes.

- [ ] **Step 6: Commit navigation and documentation**

```bash
git add src/components/AppHeader.tsx src/components/BottomTabBar.tsx \
  src/app/App.tsx src/app/App.test.tsx README.md
git commit -m "docs: finish demo navigation and setup guide"
```

### Task 5: Full verification, main push, and production deployment

**Files:**
- Verify: all intended tracked source, assets, docs, lockfile, and configuration
- Verify: `.gitignore`

**Interfaces:**
- Consumes: the completed application
- Produces: pushed `origin/main` and a verified Vercel production URL

- [ ] **Step 1: Verify prohibited copy and unresolved markers**

Run:

```bash
rg -n "보안 등급|\\+5pt|사건 발생 위치|실시간 골든타임 보호 중|즉시 지급정지 신청하기|준비 중입니다" src README.md
rg -n "TODO|FIXME|TBD" src README.md
```

Expected: no unresolved prohibited copy or markers, except README text that explicitly explains demo limitations.

- [ ] **Step 2: Run the complete automated gate**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
git diff --check
```

Expected: zero test failures, zero TypeScript errors, a successful Vite build, and no whitespace errors.

- [ ] **Step 3: Verify the local mobile flow**

Start: `npm run dev -- --host 0.0.0.0`

At a 390 px viewport, inspect every route from the design specification, click every primary control, confirm logical back behavior, verify no Vite error overlay, and capture final screenshots.

- [ ] **Step 4: Review and commit the complete intended worktree**

Run:

```bash
git status -sb
git diff --stat
git diff --check
git add -A
git diff --cached --stat
git commit -m "feat: ship im ready mobile demo"
```

Expected: only the iM Ready demo source, assets, npm migration, README, tests, and approved docs are staged.

- [ ] **Step 5: Push main**

Run: `git push origin main`

Expected: `origin/main` advances to the local `main` commit without force-push.

- [ ] **Step 6: Deploy production to Vercel**

Use the connected Vercel deployment tool from the repository root. If a new project must be created, name it `im-ready` under the connected personal team. Deploy the pushed main state to production.

- [ ] **Step 7: Verify production**

Inspect deployment status until `READY`, open `/golden-time`, confirm the mobile UI renders, click the urgent-response entry, and check for production console or runtime errors.

- [ ] **Step 8: Record final evidence**

Report the main commit SHA, GitHub repository, Vercel production URL, test count, build status, and production browser result.
