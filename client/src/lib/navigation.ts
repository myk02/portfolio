type NavigateFn = (
  to: string | URL,
  options?: { replace?: boolean; state?: unknown },
) => void;

let navigateRef: NavigateFn | null = null;
let pendingSection: string | null = null;

export function registerNavigator(navigate: NavigateFn) {
  navigateRef = navigate;
}

function safeNavigate(to: string) {
  if (navigateRef) {
    navigateRef(to);
  } else {
    window.location.assign(to);
  }
}

export function goHomeToSection(id: string) {
  pendingSection = id;
  safeNavigate("/");
}

export function consumePendingSection(): string | null {
  const id = pendingSection;
  pendingSection = null;
  return id;
}
