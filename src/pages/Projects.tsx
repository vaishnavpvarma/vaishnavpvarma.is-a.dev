import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star, GitFork, Github } from "lucide-react";
import data from "@/data.json";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const Projects = () => {
  const curated = data.projects;
  const curatedByRepo = new Map(
    curated.filter((p) => p.githubRepo).map((p) => [p.githubRepo!.split("/")[1].toLowerCase(), p])
  );

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${data.profile.githubUsername}/repos?per_page=100&sort=updated`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((d: Repo[]) => {
        setRepos(d.filter((r) => !r.fork && !r.archived));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
        ◦ Projects · git remote
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
        Repository <span className="gradient-text italic">index.</span>
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Featured work is curated below. Live data syncs from{" "}
        <a
          href={data.profile.social.github}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          @{data.profile.githubUsername}
        </a>{" "}
        on GitHub.
      </p>

      {/* Curated featured grid */}
      <h2 className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
        ★ Featured
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {curated.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="group p-6 rounded-md border border-border bg-card hover:border-primary/60 hover:shadow-elegant transition-smooth"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {p.tagline}
              </p>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
            </div>
            <h3 className="font-display text-2xl font-medium text-foreground mb-2">
              {p.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Live GitHub list */}
      <h2 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <Github className="size-3.5" /> All public repositories
        {loading && <span className="text-primary">· loading…</span>}
      </h2>
      {error && (
        <p className="font-mono text-sm text-destructive">
          [ ERR ] {error}. GitHub rate limit may be reached.
        </p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((r) => {
          const overrideId = curatedByRepo.get(r.name.toLowerCase())?.id;
          const Inner = (
            <div className="group h-full p-5 rounded-md border border-border bg-card hover:border-primary/60 hover:shadow-elegant transition-smooth flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono text-sm font-semibold text-primary truncate">
                  {r.name}
                </h3>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
                {r.description || "No description provided."}
              </p>
              <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                {r.language && <span className="text-primary">{r.language}</span>}
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3" /> {r.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3" /> {r.forks_count}
                </span>
              </div>
            </div>
          );
          return overrideId ? (
            <Link key={r.id} to={`/projects/${overrideId}`}>
              {Inner}
            </Link>
          ) : (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer">
              {Inner}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
