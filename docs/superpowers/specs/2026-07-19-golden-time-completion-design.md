# Golden Time Demo Completion Design

## Purpose

Complete the existing Golden Time mobile demo so every visible primary control has an honest, useful result and the complete response, incident, history, and training-review flows feel coherent without a backend.

The implementation must preserve the Figma-derived visual direction and the current route structure while correcting unfinished interactions, inconsistent records, accessibility gaps, and language that implies a real external action was executed.

## Product boundaries

- Golden Time guides users through existing official response procedures.
- The demo does not execute payment stops, police reports, calls, document submissions, downloads, security settings, maps, or financial transactions.
- The demo does not collect or infer location information.
- The demo does not use a financial-immunity score, security score, or comparable single-number evaluation.
- No backend, global store, authentication, external API, device permission, microphone access, or persistence is added.
- Interaction state remains local to each route.
- The bottom navigation remains `홈 / 상품 / 백신 / 골든 / 전체`.
- Existing app routes and browser back behavior remain available.

## Architecture

### Shared interaction components

Create two focused Golden Time components:

1. `GoldenToast`
   - Displays a polite status message above the bottom navigation.
   - Dismisses after three seconds.
   - Dismisses when the user interacts outside the toast and its trigger.
   - Supports an optional close button for keyboard and screen-reader users.
   - Replaces duplicated page-specific toast effects.

2. `GoldenActionSheet`
   - Uses an accessible modal dialog with a title, description, optional detail content, primary action, and secondary close action.
   - Traps focus by relying on native `<dialog>` semantics where available and restores focus to the trigger when closed.
   - Is used for payment-stop acknowledgement, document previews, police-station guidance, support information, detection history, and security-setting guidance.
   - Clearly labels all external actions as guidance or previews.

Extend `GoldenFixedAction` with a completed state so timeline completion cannot be submitted repeatedly and the current status is conveyed through visible copy and `aria-disabled`.

### Demo data

Create `goldenTimeDemoData.ts` as the single source for:

- the current incident;
- its timeline steps and progress;
- the completed refund record;
- training and education records;
- recent security-detection examples.

History lists, active incidents, timelines, and record details consume this data. The same incident or record must use the same title, date, amount, result, and description everywhere.

The current incident uses a 2026 date and remains in progress. The completed refund record uses one internally consistent 2026 date, damage amount, refund amount, and processing duration. Training and education records use action-based outcomes rather than scores.

## Route and page behavior

### `/golden-time`

- Replace `실시간 골든타임 보호 중` with language that does not imply active monitoring.
- Replace `피해 발생 즉시 모든 계좌를 보호하고 신고합니다` with `필요한 보호·신고 절차를 순서대로 안내합니다`.
- Render the active-incident summary from shared demo data.
- Keep urgent response, active incident, history, and prevention-setting entry points.
- Clarify that the lower advice card recommends checking through an official app or official customer-center number.

### `/golden-time/start`

- Label recent detections as demo examples rather than live detections.
- `전체보기` opens an action sheet containing all example detections and a statement that no device activity was read.
- Replace the 24-hour expert monitoring claim with official response-channel guidance.
- Keep the primary response CTA.

### `/golden-time/assessment`

- Give the visual progress indicator `role="progressbar"` and numeric values.
- The voice-answer control runs a short local simulation, changes to a processing state, selects `방금 (30분 이내)`, and announces the result.
- The simulation always resolves within one second and cannot remain listening indefinitely.
- Add enough bottom reserve so the voice control is not visually crowded by the fixed CTA.

### `/golden-time/payment-stop`

- Replace execution language with guidance language.
- Make the payment-stop information card interactive and open an official-procedure action sheet.
- Rename the fixed action to `지급정지 절차 확인하기`.
- The fixed action opens a confirmation sheet stating that the demo does not submit a real payment-stop request.
- The user explicitly chooses `안내를 확인하고 계속하기` before moving to follow-up.

### `/golden-time/follow-up`

- Preserve the interactive checklist.
- Checklist information affordances open short guidance sheets instead of acting like unexplained checkboxes.
- The document-generation action opens a preview sheet and then provides a local `작성 예시를 준비했습니다` toast; it does not claim that a legal document was generated or submitted.
- Preserve the `진행 중인 사건 / 진행 중인 피싱 대응 조회` entry and its return-to-follow-up behavior.

### `/golden-time/incidents`

- Render the current incident and status steps from shared demo data.
- Document buttons open document preview sheets with required contents and official acquisition channels; they do not download files.
- `가까운 경찰서 찾기` opens a police-station guidance sheet with a fixed sample station and explains that location was not accessed.
- The incident card continues to the timeline.

### `/golden-time/incidents/current`

- Use shared incident dates and descriptions.
- Expose progress-bar semantics.
- `문의하기` opens official support-channel guidance.
- `이 단계 완료 표시` opens a confirmation sheet.
- After confirmation, progress updates once, an `aria-live` status announces completion, and the fixed action becomes `완료 표시됨` and cannot be activated again.

### `/golden-time/history`

- Use shared records with consistent 2026 dates.
- Replace `보안 등급 상승 +5pt` with an action-based result.
- Training descriptions must match their detail outcome.
- The loan-scam education record opens its own education detail mode instead of the remote-control analysis.

### `/golden-time/history/refund-report`

- Use the shared completed-refund record.
- Remove the exact incident-location map.
- Replace it with `접수 및 처리 기관`, listing the official channels used in the demo record.
- Use guidance language for every process step; do not imply that iM Ready itself froze an account, reported a case, or transferred a refund.

### `/golden-time/history/training-review`

- Accept a `record` query parameter with `training`, `education`, or `settings`.
- Render record-specific training or education content.
- The settings entry from Golden Time home uses `record=settings`.
- Security-setting buttons open guidance sheets and may mark the guidance as reviewed locally.
- They never claim that delayed transfer or designated-account settings were enabled.
- Any status toast automatically dismisses.

## Shared app navigation

- Header notification, bottom `상품`, and bottom `전체` controls display a reusable `준비 중` toast rather than silently doing nothing.
- Existing working routes for home, vaccine, and Golden Time are unchanged.
- The brand remains `iM Ready` and links to `/home`.

## Error and edge-state handling

- Opening a sheet while another is open replaces the current sheet rather than stacking dialogs.
- Closing a sheet makes no route or data change.
- Repeated timeline-completion attempts are ignored after the completed state is set.
- Voice simulation timers are cleared on unmount.
- Missing or unknown training record query values fall back to the general training review.
- All status feedback uses polite live regions; urgent copy is not announced repeatedly.

## Testing

Use Vitest, Testing Library, and `user-event`.

Automated coverage must prove:

- all existing Golden Time routes still render;
- the full urgent-response flow requires payment guidance acknowledgement;
- every previously inactive control produces a sheet or toast;
- voice simulation resolves and selects an answer;
- timeline completion confirms once and becomes disabled;
- shared records render consistent values across list and detail;
- no score or location language remains;
- education and settings modes render their own content;
- shared placeholder navigation gives feedback;
- logical back navigation still works.

Manual browser verification must cover every Golden Time route at a 390 px mobile viewport, all primary buttons, browser back behavior, no console error overlay, fixed-action spacing, and the production deployment.

## Documentation and deployment

Create a root `README.md` covering:

- service purpose and demo limitations;
- technology stack;
- npm setup and commands;
- route map and Golden Time flow;
- project structure;
- testing and build commands;
- Vercel deployment;
- future AWS MVP direction;
- safety and privacy principles.

After fresh tests, typecheck, production build, and browser verification pass:

1. commit the complete intended worktree on `main`;
2. push `main` to `origin`;
3. deploy the repository to Vercel production;
4. verify the production URL and Golden Time entry route.
