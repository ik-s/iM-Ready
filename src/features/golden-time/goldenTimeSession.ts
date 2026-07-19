const EMERGENCY_COMPLETE_KEY =
  "im-ready.golden-time.emergency-complete";

export function isEmergencyResponseComplete(): boolean {
  try {
    return sessionStorage.getItem(EMERGENCY_COMPLETE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markEmergencyResponseComplete(): void {
  try {
    sessionStorage.setItem(EMERGENCY_COMPLETE_KEY, "1");
  } catch {
    // Ignore storage failures in private browsing demos.
  }
}

export function clearEmergencyResponseComplete(): void {
  try {
    sessionStorage.removeItem(EMERGENCY_COMPLETE_KEY);
  } catch {
    // Ignore storage failures in private browsing demos.
  }
}
