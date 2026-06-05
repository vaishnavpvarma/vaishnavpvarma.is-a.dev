import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Download, Github, Linkedin, GraduationCap, Mail, ArrowDown } from "lucide-react";
import data from "@/data.json";
import NanoporeSignal from "./NanoporeSignal";
import DecryptedText from "./DecryptedText";
import portrait from "/assets/vaishnav.jpg";

const FRAME_CLASSES =
  "relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[340px] md:h-[460px]";

const spring = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };

const PortraitFrame = ({ centered }: { centered: boolean }) => (
  <motion.div layoutId="portrait-frame" transition={spring} className={FRAME_CLASSES}>
    <div className="absolute inset-0 rounded-md border-2 border-primary/70 shadow-elegant" />
    <div className="absolute -inset-2 rounded-md border border-border/60 pointer-events-none" />
    {[
      "top-0 left-0 border-t-2 border-l-2",
      "top-0 right-0 border-t-2 border-r-2",
      "bottom-0 left-0 border-b-2 border-l-2",
      "bottom-0 right-0 border-b-2 border-r-2",
    ].map((cls) => (
      <span key={cls} className={`absolute size-4 border-primary ${cls}`} />
    ))}
    <img
      src={portrait}
      alt="Vaishnav P Varma — Computational Biologist at CSIR-IGIB"
      className={`absolute inset-0 w-full h-full object-cover rounded-sm transition-all duration-500 ${
        centered ? "" : "grayscale hover:grayscale-0"
      }`}
      loading="eager"
      draggable={false}
    />
    <span className="absolute -bottom-7 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      {centered ? "click to return" : "click to focus"}
    </span>
  </motion.div>
);

const Hero = () => {
  const { profile } = data;
  const [centered, setCentered] = useState(false);
  const fullName = `${profile.firstName} ${profile.lastName}`;

  useEffect(() => {
    if (!centered) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCentered(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [centered]);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center bg-hero overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-contrib-dots opacity-30" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 w-[340px] h-[340px] rounded-full border border-border/60 [border-right-color:transparent] [border-top-color:transparent]" />
      <div className="pointer-events-none absolute -right-36 top-0 w-[320px] h-[320px] rounded-full border border-border/60 [border-left-color:transparent] [border-bottom-color:transparent]" />

      {/* Background nanopore signal — horizontal band, ~60% of hero height */}
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[60%] opacity-40 z-0">
        <NanoporeSignal />
      </div>

      <ul className="hidden xl:grid absolute left-3 2xl:left-6 top-1/2 -translate-y-1/2 gap-3 z-20">
        {[
          { Icon: Github, href: profile.social.github, label: "GitHub" },
          { Icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
          { Icon: GraduationCap, href: profile.social.scholar, label: "Google Scholar" },
          { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
        ].map(({ Icon, href, label }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="size-9 grid place-items-center rounded-full border border-border bg-background/60 backdrop-blur text-muted-foreground hover:text-primary hover:border-primary transition-smooth"
            >
              <Icon className="size-4" />
            </a>
          </li>
        ))}
      </ul>

      <LayoutGroup>
        <div className="relative max-w-7xl mx-auto px-6 xl:pl-20 w-full grid md:grid-cols-2 gap-10 items-center z-10">
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground animate-fade-in">
              {profile.subtitle}
            </p>

            <h1 className="mt-4 font-mono font-semibold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              <span className="text-primary">&gt;</span>{" "}
              <DecryptedText
                text={fullName}
                animateOn="view"
                clickMode="toggle"
                sequential={true}
                revealDirection="start"
                speed={50}
                maxIterations={15}
                className="gradient-text"
                encryptedClassName="text-muted-foreground"
              />
              <span className="inline-block w-[0.6ch] -mb-1 bg-primary animate-pulse ml-1 h-[0.9em] align-middle" />
            </h1>

            <p
              className="mt-6 mx-auto md:mx-0 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {profile.tagline}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={profile.cv}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-medium shadow-elegant hover:shadow-glow transition-smooth"
              >
                <Download className="size-4 group-hover:-translate-y-0.5 transition-smooth" />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border hover:border-primary hover:text-primary font-mono text-sm font-medium transition-smooth"
              >
                <Mail className="size-4" />
                Get in touch
              </a>
            </div>
          </div>

          {/* RIGHT slot — keeps layout space; portrait lives here when not centered */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <button
              type="button"
              onClick={() => setCentered(true)}
              aria-label="Bring portrait to center"
              className="cursor-zoom-in"
            >
              {!centered && <PortraitFrame centered={false} />}
              {centered && <div className={FRAME_CLASSES} aria-hidden />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {centered && (
            <>
              <motion.button
                key="backdrop"
                type="button"
                aria-label="Close"
                onClick={() => setCentered(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              />
              <div className="fixed inset-0 z-50 grid place-items-center pointer-events-none">
                <button
                  type="button"
                  onClick={() => setCentered(false)}
                  className="pointer-events-auto cursor-zoom-out"
                  aria-label="Return portrait to frame"
                >
                  <PortraitFrame centered />
                </button>
              </div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <a
        href="#experience"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-smooth animate-fade-in z-10"
        style={{ animationDelay: "0.6s" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
