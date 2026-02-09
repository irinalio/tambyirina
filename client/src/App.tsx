import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Configurator from "@/pages/Configurator";
import CustomRequest from "@/pages/CustomRequest";
import Collection from "@/pages/Collection";
import Reviews from "@/pages/Reviews";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/configurator" component={Configurator} />
        <Route path="/custom" component={CustomRequest} />
        <Route path="/collection" component={Collection} />
        <Route path="/reviews" component={Reviews} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
