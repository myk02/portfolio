import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { LightboxProvider } from "@/components/Lightbox";
import { Toaster } from "@/components/ui/sonner";
import Analytics from "@/components/Analytics";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { registerNavigator } from "./lib/navigation";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));

function NavigateBridge() {
  const [, navigate] = useLocation();
  useEffect(() => registerNavigator(navigate), [navigate]);
  return null;
}

/** Reset scroll to top on every route change */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function RouteFallback() {
  return (
    <div
      className="min-h-screen bg-background grid place-items-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
        Loading…
      </span>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/work"} component={Work} />
        <Route path={"/work/:slug"} component={CaseStudyPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const convexMissing =
    import.meta.env.DEV && !import.meta.env.VITE_CONVEX_URL;
  return (
    <ErrorBoundary>
      {/* Respect the user's OS reduced-motion preference across all Framer animations */}
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="dark" switchable>
          <LightboxProvider>
            <NavigateBridge />
            <ScrollToTop />
            <Toaster />
            <Analytics />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:z-[130] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-medium"
            >
              Skip to content
            </a>
            {convexMissing && (
              <p
                role="status"
                className="bg-accent text-accent-foreground text-center text-xs font-mono uppercase tracking-widest px-4 py-2"
              >
                Dev: VITE_CONVEX_URL not set — contact form and tips are disabled
              </p>
            )}
            <Router />
          </LightboxProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
