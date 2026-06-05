import { Link } from "react-router-dom";
import { Camera, ArrowRight } from "lucide-react";
import data from "@/data.json";

const ExperiencePage = () => (
  <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
      ◦ Experience · /etc/cv.json
    </p>
    <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
      A timeline of <span className="gradient-text italic">scientific work.</span>
    </h1>
    <p className="mt-4 text-muted-foreground max-w-2xl">
      Translating long-read sequencing and computational pipelines into actionable insights for
      public-health genomics.
    </p>

    <ol className="mt-14 relative border-l border-border pl-8 space-y-12">
      {data.experience.map((it) => (
        <li key={it.id} className="relative">
          <span className="absolute -left-[41px] top-1 size-6 rounded-md bg-primary/15 border border-primary/40 grid place-items-center">
            <span className="size-2 rounded-full bg-primary" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-1">
            {it.period}
          </p>
          <h2 className="font-display text-2xl font-medium">{it.role}</h2>
          <p className="text-foreground/80 font-medium mb-3">{it.org}</p>
          <ul className="space-y-1.5 text-muted-foreground leading-relaxed mb-4">
            {it.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="text-primary mt-2 size-1 rounded-full bg-primary flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          {it.galleryTag && (
            <Link
              to={`/gallery?event=${it.galleryTag}`}
              className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary-glow transition-smooth border-b border-dashed border-primary/40 pb-0.5"
            >
              <Camera className="size-3.5" />
              View Photos
              <ArrowRight className="size-3" />
            </Link>
          )}
        </li>
      ))}
    </ol>
  </section>
);

export default ExperiencePage;
