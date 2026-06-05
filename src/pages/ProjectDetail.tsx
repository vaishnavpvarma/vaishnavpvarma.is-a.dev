import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Star, GitFork } from "lucide-react";
import data from "@/data.json";

interface RepoMeta {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = data.projects.find((p) => p.id === id);
  const [repo, setRepo] = useState<RepoMeta | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project?.githubRepo) return;
    setLoading(true);
    fetch(`https://api.github.com/repos/${project.githubRepo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setRepo(d))
      .catch(() => setRepo(null))
      .finally(() => setLoading(false));
  }, [project?.githubRepo]);

  if (!project) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-32">
        <p className="font-mono text-sm text-muted-foreground">
          [ ERR ] Project <span className="text-destructive">{id}</span> not found.
        </p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to projects
        </Link>
      </section>
    );
  }

  const githubUrl = project.githubRepo
    ? `https://github.com/${project.githubRepo}`
    : data.profile.social.github;

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 md:py-20">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-smooth mb-10"
      >
        <ArrowLeft className="size-3.5" /> cd ../projects
      </Link>

      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
        ◦ {project.tagline}
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
        {project.title}
      </h1>
      <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
        {project.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2.5 py-1 rounded border border-primary/30 text-primary bg-primary/5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-mono text-sm hover:shadow-glow transition-smooth"
        >
          <Github className="size-4" />
          View on GitHub
          <ExternalLink className="size-3.5" />
        </a>
        {repo && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5"><Star className="size-3.5" /> {repo.stargazers_count}</span>
            <span className="inline-flex items-center gap-1.5"><GitFork className="size-3.5" /> {repo.forks_count}</span>
            {repo.language && <span className="text-primary">{repo.language}</span>}
          </div>
        )}
      </div>

      {project.readme && (
        <section className="mt-14 rounded-md border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              README.md
            </span>
          </div>
          <div className="p-7 prose prose-invert max-w-none">
            {project.readme.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-display text-2xl font-medium mt-6 mb-3">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
                return (
                  <p key={i} className="text-muted-foreground leading-relaxed pl-4">
                    {line}
                  </p>
                );
              }
              if (!line.trim()) return <div key={i} className="h-2" />;
              return (
                <p key={i} className="text-foreground/85 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </section>
      )}

      {loading && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          $ git fetch origin/{id} ...
        </p>
      )}
    </article>
  );
};

export default ProjectDetail;
