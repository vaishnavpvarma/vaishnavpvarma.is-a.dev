import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#skills", label: "Skills" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/75 border-b border-border/60">
      {/* Red Bull racing stripe */}
      <div className="h-[2px] w-full stripe-racing" />
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-primary">~/</span>vaishnav<span className="text-primary">.varma</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm font-mono text-muted-foreground">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-primary transition-smooth">{item.label}</a>
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

export default Navbar;
