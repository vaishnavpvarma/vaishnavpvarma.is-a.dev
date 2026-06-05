import Section from "./Section";
import { Award, BookOpen, ExternalLink } from "lucide-react";

const Publications = () => (
  <Section
    id="publications"
    eyebrow="Publications & Patents"
    title={<>Selected <span className="gradient-text italic">scholarly output.</span></>}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <article className="p-7 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-elegant transition-smooth">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-accent/15 text-accent inline-flex items-center justify-center">
            <Award className="size-5" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Patent</span>
        </div>
        <h3 className="font-display text-xl font-medium leading-snug mb-2">
          An Apparatus for Collecting Tree Sap
        </h3>
        <p className="text-muted-foreground text-sm">Patent No. <span className="font-mono text-foreground">520964</span></p>
      </article>

      <article className="p-7 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-elegant transition-smooth">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center">
            <BookOpen className="size-5" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary">Book Chapter</span>
        </div>
        <h3 className="font-display text-xl font-medium leading-snug mb-2">
          Evaluation of the periodicity and impact of consumption of convenience foods…
        </h3>
        <p className="text-muted-foreground text-sm">Contributed chapter on dietary patterns and health outcomes.</p>
      </article>
    </div>

    <div className="mt-8">
      <a
        href="https://scholar.google.com/"
        target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-primary transition-smooth border-b border-dashed border-accent/40 pb-0.5"
      >
        View Full List on Google Scholar <ExternalLink className="size-3.5" />
      </a>
    </div>
  </Section>
);

export default Publications;
