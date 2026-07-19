import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PiX } from "react-icons/pi";

type ToastState = {
  id: number;
  message: string;
} | null;

export function useNoticeToast() {
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

type NoticeToastProps = {
  id?: number;
  message: string;
  onClose: () => void;
  toastRef?: MutableRefObject<HTMLDivElement | null>;
};

export function NoticeToast({
  id,
  message,
  onClose,
  toastRef,
}: NoticeToastProps) {
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
