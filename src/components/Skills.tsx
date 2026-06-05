import Section from "./Section";
import { Code2, Workflow, Dna, Cpu } from "lucide-react";

const groups = [
  {
    icon: <Code2 className="size-5" />,
    title: "Programming",
    items: ["Python", "R", "Bash", "Perl", "C++", "Go"],
  },
  {
    icon: <Workflow className="size-5" />,
    title: "Workflows",
    items: ["Nextflow", "nf-core", "Snakemake"],
  },
  {
    icon: <Dna className="size-5" />,
    title: "Genomics",
    items: ["Oxford Nanopore", "MinION / PromethION", "Dorado", "minimap2", "Clair3"],
  },
  {
    icon: <Cpu className="size-5" />,
    title: "AI / Infrastructure",
    items: ["LLM-assisted coding (Claude)", "OpenRouter", "SLURM", "Linux / HPC"],
  },
];

const Skills = () => (
  <Section
    id="skills"
    eyebrow="Technical Skills"
    title={<>The <span className="gradient-text italic">toolkit.</span></>}
    description="A pragmatic mix of computational biology tooling, modern workflow managers, and HPC."
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {groups.map((g) => (
        <div key={g.title} className="p-6 rounded-2xl border border-border bg-card hover:bg-muted/40 transition-smooth">
          <div className="size-10 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center mb-4">
            {g.icon}
          </div>
          <h3 className="font-display text-lg font-medium mb-3">{g.title}</h3>
          <ul className="space-y-1.5">
            {g.items.map(i => (
              <li key={i} className="text-sm text-muted-foreground font-mono">{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
