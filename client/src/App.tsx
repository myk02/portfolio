import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { LightboxProvider } from "@/components/Lightbox";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { FontSizeProvider } from "./contexts/FontSizeContext";
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
  return <div className="min-h-screen bg-background" aria-hidden />;
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
  return (
    <ErrorBoundary>
      {/* Respect the user's OS reduced-motion preference across all Framer animations */}
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="dark" switchable>
          <FontSizeProvider>
            <LightboxProvider>
              <TooltipProvider>
                <NavigateBridge />
                <ScrollToTop />
                <Toaster />
                <Router />
              </TooltipProvider>
            </LightboxProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
