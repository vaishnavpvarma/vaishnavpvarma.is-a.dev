import { Card, ConfigProvider, theme as antdTheme } from "antd";
import { Dna, FileCode2, ArrowUpRight, Cloud, TerminalSquare } from "lucide-react";
import Section from "./Section";
import { useTheme } from "./ThemeProvider";
import data from "@/data.json";

const iconFor = (title: string) => {
  if (title.includes("Maxscriber")) return <FileCode2 className="size-5" />;
  if (title.includes("Methylation")) return <Dna className="size-5" />;
  if (title.includes("ScrapeMate")) return <Cloud className="size-5" />;
  return <TerminalSquare className="size-5" />;
};

const CliWindow = ({ title, lines }: { title: string; lines: string[] }) => (
  <div className="rounded-md border border-border bg-[#0d1117] text-[#c9d1d9] font-mono text-xs overflow-hidden shadow-elegant">
    <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border-b border-border">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-[#8b949e] text-[10px] uppercase tracking-widest">{title} — bash</span>
    </div>
    <div className="p-4 space-y-1.5">
      {lines.map((l, i) => (
        <div key={i} className={l.startsWith("$") ? "text-[#39d353]" : l.startsWith("✓") ? "text-[#39d353]" : "text-[#c9d1d9]"}>
          {l}
        </div>
      ))}
      <div className="text-[#39d353] terminal-cursor" />
    </div>
  </div>
);

const Projects = () => {
  const { theme } = useTheme();
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={<>Work I'm <span className="gradient-text italic">proud of.</span></>}
    >
      <ConfigProvider theme={{ algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }}>
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((p) => {
            if (p.type === "cli" && p.cli) {
              return (
                <div key={p.title} className="md:col-span-2 grid md:grid-cols-2 gap-6 items-stretch">
                  <Card
                    styles={{ body: { padding: 0, background: "transparent" } }}
                    className="!bg-card !border-border !rounded-md overflow-hidden"
                  >
                    <div className="p-7 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-5">
                        <div className="size-12 rounded-md bg-primary/10 text-primary inline-flex items-center justify-center">
                          {iconFor(p.title)}
                        </div>
                        <ArrowUpRight className="size-5 text-muted-foreground" />
                      </div>
                      <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{p.tagline}</p>
                      <h3 className="font-display text-2xl font-medium mb-3 text-foreground">{p.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tags.map(t => (
                          <span key={t} className="font-mono text-[10px] px-2 py-1 rounded border border-primary/30 text-primary bg-primary/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                  <CliWindow title={p.title} lines={p.cli} />
                </div>
              );
            }
            return (
              <Card
                key={p.title}
                styles={{ body: { padding: 0, background: "transparent" } }}
                className="!bg-card !border-border hover:!border-primary/60 group !rounded-md overflow-hidden transition-smooth hover:shadow-elegant"
              >
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="size-12 rounded-md bg-primary/10 text-primary inline-flex items-center justify-center">
                      {iconFor(p.title)}
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{p.tagline}</p>
                  <h3 className="font-display text-2xl font-medium mb-3 text-foreground">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="font-mono text-[10px] px-2 py-1 rounded border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ConfigProvider>
    </Section>
  );
};

export default Projects;
