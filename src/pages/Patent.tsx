import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Center, Bounds } from "@react-three/drei";
import { Award, FileText, Download } from "lucide-react";
import data from "@/data.json";
import PatentPaperLoader from "@/components/PatentPaperLoader";

interface ModelViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
  environmentPreset?:
    | "studio"
    | "city"
    | "sunset"
    | "dawn"
    | "night"
    | "warehouse"
    | "forest"
    | "apartment"
    | "park"
    | "lobby";
  ambientIntensity?: number;
}

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ModelFallback = () => (
  <Center>
    <mesh>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#39d353" wireframe />
    </mesh>
  </Center>
);

const ModelViewer = ({
  modelUrl,
  autoRotate = true,
  environmentPreset = "studio",
  ambientIntensity = 0.5,
}: ModelViewerProps) => {
  const [hasModel, setHasModel] = useState(true);

  return (
    <Canvas
      camera={{ position: [3, 2, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={<ModelFallback />}>
        <Bounds fit clip observe margin={1.2}>
          {hasModel ? (
            <ErrorBoundary onError={() => setHasModel(false)}>
              <Model url={modelUrl} />
            </ErrorBoundary>
          ) : (
            <ModelFallback />
          )}
        </Bounds>
        <Environment preset={environmentPreset} />
      </Suspense>
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        enablePan={false}
        minDistance={2}
        maxDistance={10}
      />
    </Canvas>
  );
};

// Lightweight error boundary to fall back when GLB fails to load
import { Component, ReactNode } from "react";
class ErrorBoundary extends Component<{ children: ReactNode; onError: () => void }> {
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.props.children;
  }
}

const Patent = () => {
  const { patent } = data;
  const [loaderMode, setLoaderMode] = useState<"loading" | "reloading" | null>(() => {
    if (typeof window === "undefined") return "loading";
    return sessionStorage.getItem("patent:visited") ? "reloading" : "loading";
  });

  useEffect(() => {
    sessionStorage.setItem("patent:visited", "1");
  }, []);

  return (
    <section className="relative">
      {loaderMode && (
        <PatentPaperLoader
          mode={loaderMode}
          duration={loaderMode === "loading" ? 4200 : 1800}
          onDone={() => setLoaderMode(null)}
        />
      )}
      {/* Lab grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1.3fr_1fr] gap-10">
        {/* 3D Viewer */}
        <div className="rounded-md border border-border bg-card overflow-hidden shadow-elegant">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                schematic.glb · WebGL2
              </span>
            </div>
            <span className="font-mono text-[10px] text-primary animate-pulse">● live</span>
          </div>
          <div className="h-[480px] md:h-[560px] bg-gradient-to-br from-background to-muted/40">
            <ModelViewer
              modelUrl={patent.modelUrl}
              autoRotate={true}
              environmentPreset="studio"
              ambientIntensity={0.5}
            />
          </div>
          <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
            <span>autoRotate=true · env=studio · ambient=0.5</span>
            <span>drag to orbit · scroll to zoom</span>
          </div>
        </div>

        {/* Metadata panel */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent">
            <Award className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {patent.office} · {patent.status}
            </span>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-2">
              ◦ Patent No. {patent.number}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-light leading-tight">
              {patent.title}
            </h1>
          </div>

          <p className="text-muted-foreground leading-relaxed">{patent.abstract}</p>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
              ◦ Independent claims
            </h2>
            <ol className="space-y-2.5">
              {patent.claims.map((c, i) => (
                <li
                  key={i}
                  className="pl-7 relative text-sm text-foreground/85 leading-relaxed"
                >
                  <span className="absolute left-0 top-0 font-mono text-xs text-primary">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  {c}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`https://search.ipindia.gov.in/IPOJournal/Journal/Patent`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-primary hover:text-primary font-mono text-xs transition-smooth"
            >
              <FileText className="size-3.5" /> View on IP India
            </a>
            <a
              href={data.patent.modelUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-primary hover:text-primary font-mono text-xs transition-smooth"
            >
              <Download className="size-3.5" /> Download GLB
            </a>
          </div>

          <div className="rounded-md border border-border bg-muted/30 p-4 font-mono text-[10px] text-muted-foreground">
            <div className="text-primary mb-1">$ patent --inspect 520964</div>
            <div>jurisdiction : IN</div>
            <div>filing_date  : 2023-XX-XX</div>
            <div>grant_date   : 2024-XX-XX</div>
            <div>inventor     : Vaishnav P Varma et al.</div>
            <div>status       : <span className="text-primary">{patent.status}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

if (typeof window !== "undefined") {
  try {
    useGLTF.preload?.(data.patent.modelUrl);
  } catch (e) {
    console.warn("Could not preload GLB:", e);
  }
}

export default Patent;
