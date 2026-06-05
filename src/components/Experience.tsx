import { Timeline, ConfigProvider, theme as antdTheme } from "antd";
import { FlaskConical, Microscope } from "lucide-react";
import Section from "./Section";
import { useTheme } from "./ThemeProvider";
import data from "@/data.json";

const icons = [<FlaskConical className="size-4" />, <Microscope className="size-4" />];

const Experience = () => {
  const { theme } = useTheme();
  return (
    <Section
      id="experience"
      eyebrow="Research & Experience"
      title={<>A timeline of <span className="gradient-text italic">scientific work.</span></>}
      description="Translating long-read sequencing and computational pipelines into actionable insights for public-health genomics."
    >
      <ConfigProvider
        theme={{
          algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#39d353",
            colorBgContainer: "transparent",
            colorText: "hsl(var(--foreground))",
          },
        }}
      >
        <Timeline
          mode="left"
          items={data.experience.map((it, i) => ({
            dot: (
              <span className="inline-flex items-center justify-center size-8 rounded-md bg-primary text-primary-foreground shadow-elegant">
                {icons[i] ?? icons[0]}
              </span>
            ),
            children: (
              <div className="pb-6 pl-2">
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">{it.period}</p>
                <h3 className="font-display text-2xl font-medium text-foreground">{it.role}</h3>
                <p className="text-foreground/80 font-medium mb-3">{it.org}</p>
                <ul className="space-y-1.5 text-muted-foreground leading-relaxed">
                  {it.bullets.map(b => <li key={b} className="flex gap-2"><span className="text-primary mt-2 size-1 rounded-full bg-primary flex-shrink-0" />{b}</li>)}
                </ul>
              </div>
            ),
          }))}
        />
      </ConfigProvider>
    </Section>
  );
};

export default Experience;
