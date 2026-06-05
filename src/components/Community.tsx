import Section from "./Section";
import { Users, GitBranch } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "./ThemeProvider";
import data from "@/data.json";

const items = [
  {
    icon: <Users className="size-5" />,
    title: "Bioinformatics Trainer",
    org: "WHO SEARO Workshop",
    body: "Delivered hands-on training on long-read sequencing analysis and surveillance workflows for South-East Asia regional public-health scientists.",
  },
  {
    icon: <GitBranch className="size-5" />,
    title: "Open-source Contributor",
    org: "Immunoinformatics tooling",
    body: "Maintain and contribute custom Perl scripts for epitope prediction and immunoinformatics workflows used by the broader research community.",
  },
];

const Community = () => {
  const { theme } = useTheme();
  // GitHub-like green palette
  const explicitTheme: { light: [string, string, string, string, string]; dark: [string, string, string, string, string] } = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <Section
      id="community"
      eyebrow="Contributions & Community"
      title={<>Beyond the <span className="gradient-text italic">bench.</span></>}
    >
      {/* GitHub contribution graph */}
      <div className="mb-10 p-6 rounded-md border border-border bg-card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">◦ git contributions</p>
          <a
            href={data.profile.social.github}
            target="_blank" rel="noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-smooth"
          >
            @{data.profile.githubUsername} ↗
          </a>
        </div>
        {(() => {
          const Calendar = (GitHubCalendar as any).default || GitHubCalendar;
          return (
            <Calendar
              username={data.profile.githubUsername}
              colorScheme={theme === "dark" ? "dark" : "light"}
              theme={explicitTheme}
              fontSize={12}
              blockSize={11}
              blockMargin={3}
            />
          );
        })()}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map(i => (
          <div key={i.title} className="p-7 rounded-md border border-border bg-card hover:border-primary/60 hover:shadow-elegant transition-smooth">
            <div className="size-12 rounded-md bg-primary/10 text-primary inline-flex items-center justify-center mb-5">
              {i.icon}
            </div>
            <h3 className="font-display text-xl font-medium mb-1">{i.title}</h3>
            <p className="text-primary font-mono text-xs uppercase tracking-widest mb-3">{i.org}</p>
            <p className="text-muted-foreground leading-relaxed">{i.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Community;
