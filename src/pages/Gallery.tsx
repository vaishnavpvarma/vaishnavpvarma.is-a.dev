import { useEffect, useMemo, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
const who1 = "/assets/gallery/who-searo-1.jpg";
const who2 = "/assets/gallery/who-searo-2.jpg";
const imtech1 = "/assets/gallery/imtech-1.jpg";
const imtech2 = "/assets/gallery/imtech-2.jpg";
const igib1 = "/assets/gallery/igib-1.jpg";
const igib2 = "/assets/gallery/igib-2.jpg";
const conf1 = "/assets/gallery/conference-1.jpg";
const grad1 = "/assets/gallery/grad-1.jpg";
import data from "@/data.json";

interface Photo {
  src: string;
  caption: string;
  tag: "who-searo" | "imtech" | "igib" | "conference" | "grad";
}

const photos: Photo[] = [
  { src: who1, caption: "WHO SEARO Workshop · session in progress", tag: "who-searo" },
  { src: who2, caption: "WHO SEARO regional cohort group photo", tag: "who-searo" },
  { src: imtech1, caption: "IMTECH internship · biosafety cabinet", tag: "imtech" },
  { src: imtech2, caption: "IMTECH internship · culture plates", tag: "imtech" },
  { src: igib1, caption: "CSIR-IGIB · PromethION sequencer", tag: "igib" },
  { src: igib2, caption: "CSIR-IGIB · variant analysis bench", tag: "igib" },
  { src: conf1, caption: "Conference poster session", tag: "conference" },
  { src: grad1, caption: "M.Sc. Bioinformatics graduation", tag: "grad" },
];

const FILTERS: { key: Photo["tag"] | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "who-searo", label: "WHO SEARO" },
  { key: "imtech", label: "IMTECH" },
  { key: "igib", label: "CSIR-IGIB" },
  { key: "conference", label: "Conferences" },
  { key: "grad", label: "Academic" },
];

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
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.onload = render;
      document.body.appendChild(s);
    }
  }, [tweetId]);
  return <div ref={ref} className="min-h-[200px] p-3" />;
};

const Gallery = () => {
  const [params, setParams] = useSearchParams();
  const active = (params.get("event") as Photo["tag"] | null) ?? "all";

  const filtered = useMemo(
    () => (active === "all" ? photos : photos.filter((p) => p.tag === active)),
    [active]
  );

  const setFilter = (key: string) => {
    if (key === "all") setParams({});
    else setParams({ event: key });
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
        ◦ Gallery · /var/photos
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
        Research <span className="gradient-text italic">journey.</span>
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Workshops, lab work, and conferences — placeholder imagery for now, swap with real photos in{" "}
        <code className="font-mono text-xs text-primary">src/assets/gallery</code>.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-smooth ${
              active === f.key
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
        <Link
          to="/experience"
          className="ml-auto px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest border border-border text-muted-foreground hover:border-primary hover:text-primary transition-smooth"
        >
          ← back to experience
        </Link>
      </div>

      {/* CSS columns masonry */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filtered.map((p) => (
          <figure
            key={p.src}
            className="mb-4 break-inside-avoid rounded-md overflow-hidden border border-border bg-card group"
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <figcaption className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-t border-border bg-muted/40">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Social embeds */}
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            ◦ From the timeline
          </h2>
          <div className="rounded-md border border-border bg-card overflow-hidden">
            <TweetEmbed tweetId="1581752329005490177" />
          </div>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            ◦ LinkedIn
          </h2>
          <div className="rounded-md border border-border bg-card p-4">
            {data.linkedinPosts[0] && !data.linkedinPosts[0].includes("7000000000000000000") ? (
              <iframe
                title="LinkedIn embed"
                src={`https://www.linkedin.com/embed/feed/update/${data.linkedinPosts[0].split("/").pop()}`}
                height="500"
                width="100%"
                frameBorder={0}
                allowFullScreen
                className="rounded"
              />
            ) : (
              <div className="h-[500px] flex items-center justify-center rounded border border-dashed border-border bg-muted/20 text-muted-foreground font-mono text-xs">
                [ LinkedIn Feed Placeholder ]
              </div>
            )}
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              [ note ] swap urn:li:share:… in <code>data.json → linkedinPosts</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
