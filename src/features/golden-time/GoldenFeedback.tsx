import {
  type MutableRefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PiCheckCircle, PiX } from "react-icons/pi";

type GoldenActionSheetProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  onClose: () => void;
};

export function GoldenActionSheet({
  open,
  title,
  description,
  children,
  primaryLabel,
  onPrimary,
  onClose,
}: GoldenActionSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 px-3 pb-3"
      onPointerDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="golden-sheet-title"
        aria-describedby="golden-sheet-description"
        className="w-full max-w-[366px] rounded-[20px] bg-white px-5 pt-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_18px_50px_rgba(13,45,38,0.25)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F8F4] text-[#029C82]">
              <PiCheckCircle className="h-6 w-6" />
            </span>
            <h2
              id="golden-sheet-title"
              className="mt-3 text-[20px] leading-7 font-bold"
            >
              {title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="안내 닫기"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F3F6F5] text-[#3C4A45]"
          >
            <PiX className="h-5 w-5" />
          </button>
        </div>
        <div
          id="golden-sheet-description"
          className="mt-3 text-[14px] leading-[22px] text-[#3C4A45]"
        >
          {description}
        </div>
        {children ? <div className="mt-4">{children}</div> : null}
        <div className="mt-5 grid gap-2">
          {primaryLabel && onPrimary ? (
            <button
              type="button"
              onClick={onPrimary}
              className="h-[52px] rounded-[10px] bg-[#029C82] font-['Jua'] text-[18px] text-white"
            >
              {primaryLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-[10px] border border-[#DDE5E2] bg-white text-[15px] font-semibold text-[#3C4A45]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

type ToastState = {
  id: number;
  message: string;
} | null;

export function useGoldenToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nextIdRef = useRef(0);

  const dismissToast = useCallback(() => setToast(null), []);
  const showToast = useCallback((message: string) => {
    nextIdRef.current += 1;
    setToast({ id: nextIdRef.current, message });
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(dismissToast, 3_000);
    const dismissOnOutsidePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        (toastRef.current?.contains(event.target) ||
          triggerRef.current?.contains(event.target))
      ) {
        return;
      }

      dismissToast();
    };
    const listenerTimeoutId = window.setTimeout(() => {
      document.addEventListener(
        "pointerdown",
        dismissOnOutsidePointerDown,
      );
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(listenerTimeoutId);
      document.removeEventListener(
        "pointerdown",
        dismissOnOutsidePointerDown,
      );
    };
  }, [dismissToast, toast]);

  return {
    dismissToast,
    message: toast?.message ?? "",
    showToast,
    toastId: toast?.id ?? 0,
    toastRef,
    triggerRef,
  };
}

type GoldenToastProps = {
  id?: number;
  message: string;
  onClose: () => void;
  toastRef?: MutableRefObject<HTMLDivElement | null>;
};

export function GoldenToast({
  id,
  message,
  onClose,
  toastRef,
}: GoldenToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      key={id}
      ref={toastRef}
      role="status"
      aria-live="polite"
      className="fixed bottom-[96px] left-1/2 z-[90] flex max-w-[350px] -translate-x-1/2 items-center gap-2 rounded-full bg-[#20312D] py-2 pr-2 pl-4 text-xs text-white shadow-lg"
    >
      <span>{message}</span>
      <button
        type="button"
        aria-label="알림 닫기"
        onClick={onClose}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/80"
      >
        <PiX className="h-4 w-4" />
      </button>
    </div>
  );
}
