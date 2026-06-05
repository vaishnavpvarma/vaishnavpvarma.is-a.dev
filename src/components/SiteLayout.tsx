import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import SiteNavbar from "./SiteNavbar";
import SiteFooter from "./SiteFooter";
import RouteTransition from "./RouteTransition";

const SiteLayout = () => (
  <ThemeProvider>
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteNavbar />
      <RouteTransition />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  </ThemeProvider>
);

export default SiteLayout;
