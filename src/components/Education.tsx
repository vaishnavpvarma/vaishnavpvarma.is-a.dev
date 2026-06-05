import Section from "./Section";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "M.Sc. in Bioinformatics",
    institute: "Alagappa University",
    period: "Postgraduate",
  },
  {
    degree: "B.Sc. in Biotechnology",
    institute: "Bharathiar University",
    period: "Undergraduate",
  },
];

const Education = () => (
  <Section
    id="education"
    eyebrow="Education"
    title={<>Academic <span className="gradient-text italic">foundations.</span></>}
  >
    <div className="divide-y divide-border border-y border-border">
      {education.map((e) => (
        <div key={e.degree} className="grid md:grid-cols-12 gap-4 py-7 group hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-smooth">
          <div className="md:col-span-1">
            <div className="size-10 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center">
              <GraduationCap className="size-5" />
            </div>
          </div>
          <div className="md:col-span-8">
            <h3 className="font-display text-xl font-medium text-foreground">{e.degree}</h3>
            <p className="text-muted-foreground">{e.institute}</p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{e.period}</span>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Education;
