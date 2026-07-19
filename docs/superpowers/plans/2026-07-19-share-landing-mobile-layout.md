# Share Landing Mobile Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the phishing challenge CTA below the penguin artwork without overlap on iPhone Safari while preserving the existing visual design and navigation.

**Architecture:** Keep the current header, decorative assets, and fixed bottom tab bar. Replace the character and CTA's independent absolute positioning with a shared document-flow participation section: a responsive character crop followed by the CTA, plus bottom clearance for the fixed navigation.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Vitest, Testing Library

## Global Constraints

- Preserve the existing Figma assets, colors, typography, copy, routes, and interactions.
- The penguin artwork must appear before the CTA in document order.
- The CTA must not use absolute or fixed positioning.
- The page may scroll vertically on short iPhone Safari viewports.
- Keep the page free of horizontal scrolling at widths from 320px through 390px.
- Leave enough space below the CTA for the fixed 82px bottom tab bar.

---

### Task 1: Responsive participation section

**Files:**
- Modify: `src/app/App.test.tsx`
- Modify: `src/features/challenge/ShareLandingPage.tsx`
- Modify: `src/components/BottomTabBar.tsx`

**Interfaces:**
- Consumes: `characters` image asset and existing `BottomTabBar` component.
- Produces: `data-testid="share-characters"` character crop followed by the existing CTA in normal document flow.

- [ ] **Step 1: Write the failing layout regression test**

Add this assertion to the challenge onboarding route tests:

```tsx
it("places the share CTA after the penguin artwork in normal flow", () => {
  render(
    <MemoryRouter initialEntries={["/invites/phishing-challenge/demo"]}>
      <App />
    </MemoryRouter>,
  );

  const characters = screen.getByTestId("share-characters");
  const cta = screen.getByRole("button", {
    name: "가족 · 친구랑 챌린지 시작!",
  });

  expect(
    characters.compareDocumentPosition(cta) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(cta).not.toHaveClass("absolute", "fixed");
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
npm test -- --run src/app/App.test.tsx -t "places the share CTA after the penguin artwork in normal flow"
```

Expected: FAIL because the CTA currently has the `absolute` class and the character crop has no `share-characters` test id.

- [ ] **Step 3: Implement the normal-flow character and CTA layout**

In `ShareLandingPage`, keep the top content and decorations unchanged, then replace the absolute character block and CTA with:

```tsx
<section className="relative z-10 mt-[18px] pb-[112px]">
  <div
    data-testid="share-characters"
    aria-hidden="true"
    className="relative left-1/2 h-[294px] w-[419px] -translate-x-1/2 overflow-hidden"
  >
    <img
      src={characters}
      alt=""
      className="absolute top-[-334px] left-0 w-[419px] max-w-none"
    />
  </div>

  <button
    type="button"
    onClick={() => navigate("/events/phishing-challenge/intro")}
    className="relative z-20 mx-auto mt-[10px] block h-[55px] w-[80.27%] rounded-[25px] border border-black/35 font-['Jua'] text-[22px] leading-[30px] tracking-[-0.7px] text-black shadow-[-2px_4px_4px_rgba(0,0,0,0.15)] transition active:translate-y-0.5"
    style={{
      backgroundImage:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0%, rgba(102, 250, 217, 0.45) 100%), linear-gradient(90deg, rgb(0, 193, 163) 0%, rgb(0, 193, 163) 100%)",
    }}
  >
    가족 · 친구랑 챌린지 시작!
  </button>
</section>
```

Change the main element from a viewport-height absolute canvas to natural vertical flow:

```tsx
<main className="relative min-h-[calc(100dvh-56px)] overflow-x-hidden bg-[#66FAD9] text-center">
```

Reposition decorative clouds relative to the unchanged hero area so they remain decorative and do not affect layout.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run:

```bash
npm test -- --run src/app/App.test.tsx -t "places the share CTA after the penguin artwork in normal flow"
```

Expected: PASS.

- [ ] **Step 5: Run complete automated verification**

Run:

```bash
npm run test:run
npm run typecheck
npm run build
git diff --check
```

Expected: all tests pass, TypeScript reports no errors, Vite builds successfully, and `git diff --check` produces no output.

- [ ] **Step 6: Commit the responsive share entry changes**

```bash
git add src/app/App.test.tsx src/components/BottomTabBar.tsx src/features/challenge/ShareLandingPage.tsx
git commit -m "fix: improve phishing challenge mobile entry"
```

### Task 2: iPhone viewport design QA

**Files:**
- Create or update: `design-qa.md`
- Modify if required: `src/features/challenge/ShareLandingPage.tsx`

**Interfaces:**
- Consumes: the attached iPhone Safari screenshot and local `/invites/phishing-challenge/demo`.
- Produces: a passed visual QA result at mobile viewport sizes.

- [ ] **Step 1: Capture the updated page at 390×844**

Open the local share route in the in-app browser at a 390×844 viewport and capture the initial state plus the scrolled CTA state.

- [ ] **Step 2: Capture the short Safari-equivalent viewport**

Capture the same route at approximately 393×657, matching the webpage area visible inside the attached iPhone Safari screenshot.

- [ ] **Step 3: Compare the source and updated captures**

Verify:

```text
- Penguin artwork is not covered by the CTA.
- CTA begins below the penguin artwork.
- CTA remains fully visible when scrolled above the bottom tab bar.
- No horizontal scrolling or clipped text appears.
- Header, hero text, colors, assets, and bottom tabs remain unchanged.
```

- [ ] **Step 4: Record the QA result**

Write `design-qa.md` with the compared viewport, findings, fixes, and:

```text
final result: passed
```

If any overlap, clipping, or horizontal overflow remains, set `final result: blocked`, correct the layout, recapture, and repeat until passed.
