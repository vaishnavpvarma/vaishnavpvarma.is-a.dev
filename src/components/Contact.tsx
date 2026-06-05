import { Mail, Github, Linkedin, GraduationCap } from "lucide-react";
import data from "@/data.json";

const Contact = () => (
  <footer id="contact" className="border-t border-border bg-muted/30">
    <div className="max-w-6xl mx-auto px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">◦ Get in touch</p>
      <h2 className="font-display font-light text-4xl md:text-6xl tracking-tight leading-tight max-w-3xl">
        Let's collaborate on <span className="gradient-text italic">genomics.</span>
      </h2>
      <p className="mt-6 max-w-xl text-muted-foreground text-lg">
        Open to research collaborations, consulting on long-read sequencing pipelines, and academic partnerships.
      </p>

      <a
        href={`mailto:${data.profile.email}`}
        className="mt-8 inline-flex items-center gap-3 font-display text-2xl md:text-3xl font-medium text-foreground hover:text-primary transition-smooth"
      >
        <Mail className="size-6" />
        {data.profile.email}
      </a>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Vaishnav P Varma · All systems nominal.
        </p>
        <div className="flex items-center gap-2">
          {[
            { Icon: Github, href: data.profile.social.github, label: "GitHub" },
            { Icon: Linkedin, href: data.profile.social.linkedin, label: "LinkedIn" },
            { Icon: GraduationCap, href: data.profile.social.scholar, label: "Google Scholar" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className="size-10 inline-flex items-center justify-center rounded-md border border-border hover:border-primary hover:text-primary transition-smooth"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Simply Lovely sign-off */}
      <div className="mt-10 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          ./eof
        </span>
        <span className="font-mono text-sm tracking-[0.3em] uppercase">
          <span className="text-muted-foreground">simply</span>{" "}
          <span className="gradient-text font-semibold">lovely</span>
          <span className="terminal-cursor ml-1" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          v2.0.0
        </span>
      </div>
    </div>
  </footer>
);

export default Contact;
