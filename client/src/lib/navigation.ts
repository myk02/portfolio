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

/**
 * Header/footer nav:
 * - On `/`, Work/About/Contact scroll to section ids.
 * - Off home, Work goes to `/work` (shareable index). About/Contact return home then scroll.
 */
export function handleSiteNav(
  id: string,
  ctx: {
    location: string;
    onHomeSection?: (id: string) => void;
    navigate: (to: string) => void;
  },
) {
  const isHome = ctx.location === "/" || ctx.location === "";
  const isWorkIndex = ctx.location === "/work";

  if (id === "work") {
    if (isHome) {
      ctx.onHomeSection?.("work");
      return;
    }
    if (isWorkIndex) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    ctx.navigate("/work");
    return;
  }

  if (isHome) {
    ctx.onHomeSection?.(id);
    return;
  }

  if (id === "home") {
    ctx.navigate("/");
    return;
  }

  goHomeToSection(id);
}

/**
 * Single implementation of in-page scrolling on `/`.
 * Used by Home (header CTA + hero) and the footer nav so the
 * two can never drift apart.
 */
export function scrollToHomeSection(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
