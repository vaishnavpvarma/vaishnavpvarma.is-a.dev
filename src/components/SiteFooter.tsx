import { Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import data from "@/data.json";

const SiteFooter = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <p className="font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {data.profile.name} · All systems nominal.
      </p>
      <div className="flex items-center gap-2">
        {[
          { Icon: Github, href: data.profile.social.github, label: "GitHub" },
          { Icon: Linkedin, href: data.profile.social.linkedin, label: "LinkedIn" },
          { Icon: GraduationCap, href: data.profile.social.scholar, label: "Google Scholar" },
          { Icon: Mail, href: `mailto:${data.profile.email}`, label: "Email" },
        ].map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="size-9 inline-flex items-center justify-center rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
      <span className="font-mono text-sm tracking-[0.3em] uppercase">
        <span className="text-muted-foreground">simply</span>{" "}
        <span className="gradient-text font-semibold">lovely</span>
        <span className="terminal-cursor ml-1" />
      </span>
    </div>
  </footer>
);

export default SiteFooter;
