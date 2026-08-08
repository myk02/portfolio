import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import CaseStudyPage from "@/pages/CaseStudyPage";
import PrototypePage from "@/pages/PrototypePage";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { FontSizeProvider } from "./contexts/FontSizeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { registerNavigator } from "./lib/navigation";
import Home from "./pages/Home";
import Work from "./pages/Work";

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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/work"} component={Work} />
      <Route path={"/work/:slug"} component={CaseStudyPage} />
      <Route path={"/work/:slug/prototype"} component={PrototypePage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <FontSizeProvider>
          <TooltipProvider>
            <NavigateBridge />
            <ScrollToTop />
            <Toaster />
            <Router />
          </TooltipProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
