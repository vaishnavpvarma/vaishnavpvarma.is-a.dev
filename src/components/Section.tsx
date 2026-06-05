import { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, eyebrow, title, description, children }: SectionProps) => (
  <section id={id} className="py-24 md:py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-4">◦ {eyebrow}</p>
        <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-tight">{title}</h2>
        {description && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{description}</p>}
      </div>
      {children}
    </div>
  </section>
);

export default Section;
