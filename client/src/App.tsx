import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import CaseStudyPage from "@/pages/CaseStudyPage";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { FontSizeProvider } from "./contexts/FontSizeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { registerNavigator } from "./lib/navigation";
import Home from "./pages/Home";

function NavigateBridge() {
  const [, navigate] = useLocation();
  useEffect(() => registerNavigator(navigate), [navigate]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/work/:slug"} component={CaseStudyPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
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
            <Toaster />
            <Router />
          </TooltipProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
