import { Moon, Sun } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/patent", label: "Patent" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
];

const SiteNavbar = () => {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="h-[2px] w-full stripe-racing" />
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-primary">~/</span>vaishnav<span className="text-primary">.varma</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `transition-smooth hover:text-primary ${isActive ? "text-primary" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="size-10 inline-flex items-center justify-center rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>
    </header>
  );
};

export default SiteNavbar;
