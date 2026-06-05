import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import data from "@/data.json";

const TweetEmbed = ({ tweetId }: { tweetId: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = window as unknown as { twttr?: { widgets: { createTweet: (id: string, el: HTMLElement, opts?: Record<string, unknown>) => void } } };
    const render = () => {
      if (ref.current && w.twttr) {
        ref.current.innerHTML = "";
        w.twttr.widgets.createTweet(tweetId, ref.current, { theme: "dark", dnt: true });
      }
    };
    if (w.twttr) {
      render();
    } else {
      const existing = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", render);
      } else {
        const s = document.createElement("script");
        s.src = "https://platform.twitter.com/widgets.js";
        s.async = true;
        s.onload = render;
        document.body.appendChild(s);
      }
    }
  }, [tweetId]);
  return <div ref={ref} className="min-h-[200px] p-3" />;
};

const sample = `# Pseudocode — phase methylation by allele
for read in bam.fetch(chrom):
    if read.has_haplotag():
        ht = read.get_tag("HP")  # 1 or 2
        for cpg in cpg_sites:
            mod = methylation_call(read, cpg)
            buckets[ht][cpg].append(mod)`;

const Blog = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
        ◦ Research blog · cat ~/notes/*.md
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
        Notes from the <span className="gradient-text italic">bench.</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        Working notes on long-read sequencing, workflow tooling, and the occasional rant about LIMS.
      </p>

      <div className="mt-12 space-y-12">
        {data.blog.map((post) => (
          <article
            key={post.id}
            className="border-b border-border pb-10 last:border-b-0"
          >
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3" /> {post.date}
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-primary"
                >
                  <Tag className="size-3" />
                  {t}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-3">
              {post.title}
            </h2>
            <p className="text-foreground/85 leading-relaxed text-lg">
              {post.excerpt}
            </p>

            {post.id === "haplotype-methylation" || post.id === "ont-basecalling-2025" ? (
              <pre className="mt-5 rounded-md border border-border bg-[#0d1117] text-[#c9d1d9] p-4 overflow-x-auto font-mono text-xs leading-relaxed">
                <code>{sample}</code>
              </pre>
            ) : null}

            {post.tweetId && (
              <div className="mt-6 rounded-md border border-border bg-card overflow-hidden">
                <TweetEmbed tweetId={post.tweetId} />
              </div>
            )}
          </article>
        ))}
      </div>

      <Link
        to="/"
        className="mt-16 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-smooth"
      >
        <ArrowLeft className="size-3.5" /> cd ~
      </Link>
    </section>
  );
};

export default Blog;
