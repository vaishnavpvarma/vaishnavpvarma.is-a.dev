import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * NanoporeSignal — horizontal "squiggle" step-plot that scrolls leftward,
 * with a central read-head reticle that base-calls A/C/G/T as steps pass.
 *
 * Designed as a background band: full width, parent height.
 */

type Base = "A" | "C" | "G" | "T";

interface Step {
  base: Base;
  /** normalized amplitude 0..1 (0 = bottom rail, 1 = top rail) */
  amp: number;
  /** horizontal length of this step in SVG units */
  len: number;
}

// Each base has a characteristic current amplitude band — mimics ONT k-mer means.
const BASE_AMP: Record<Base, [number, number]> = {
  A: [0.15, 0.30],
  C: [0.40, 0.55],
  G: [0.60, 0.75],
  T: [0.82, 0.95],
};

const BASES: Base[] = ["A", "C", "G", "T"];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateSteps(count: number): Step[] {
  const steps: Step[] = [];
  let prev: Base | null = null;
  for (let i = 0; i < count; i++) {
    let base: Base;
    do {
      base = BASES[Math.floor(Math.random() * 4)];
    } while (base === prev);
    prev = base;
    const [lo, hi] = BASE_AMP[base];
    steps.push({
      base,
      amp: rand(lo, hi),
      len: rand(28, 56), // varied dwell width
    });
  }
  return steps;
}

const VIEW_H = 220;          // SVG height (amplitude axis)
const PAD_Y = 28;            // vertical padding for the trace
const TRACE_H = VIEW_H - PAD_Y * 2;
const STEP_COUNT = 260;
const SCROLL_SECONDS = 60;   // slower drift
const BAND_H = 18;           // height of the ATGC band strip above the trace
const BAND_Y = 4;            // top offset of the band strip

const NanoporeSignal = () => {
  const steps = useMemo(() => generateSteps(STEP_COUNT), []);

  // Build a horizontal step-plot path: vertical jump to new amplitude, then horizontal run.
  const { d, totalW, stepXs } = useMemo(() => {
    let x = 0;
    const xs: { x: number; base: Base }[] = [];
    let path = "";
    steps.forEach((s, i) => {
      // amplitude inverted so high amp draws toward top
      const y = PAD_Y + (1 - s.amp) * TRACE_H;
      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        path += `V ${y} `;
      }
      xs.push({ x: x + s.len / 2, base: s.base });
      x += s.len;
      path += `H ${x} `;
    });
    return { d: path.trim(), totalW: x, stepXs: xs };
  }, [steps]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [calledBase, setCalledBase] = useState<Base>("A");
  const [pulseKey, setPulseKey] = useState(0);
  const lastBaseRef = useRef<Base>("A");
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.clientWidth));
    ro.observe(el);
    setContainerW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // rAF loop: figure out which step is currently under the reticle.
  useEffect(() => {
    if (!totalW) return;
    let raf = 0;
    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      const progress = (elapsed % SCROLL_SECONDS) / SCROLL_SECONDS; // 0..1
      // Trace translates from x = 0 to x = -totalW over the loop.
      const translateX = -progress * totalW;
      const reticleX = containerW / 2 - translateX;
      let lo = 0, hi = stepXs.length - 1, idx = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (stepXs[mid].x < reticleX) { idx = mid; lo = mid + 1; }
        else hi = mid - 1;
      }
      const base = stepXs[idx]?.base ?? "A";
      if (base !== lastBaseRef.current) {
        lastBaseRef.current = base;
        setCalledBase(base);
        setPulseKey((k) => k + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalW, containerW, stepXs]);

  const baseColor: Record<Base, string> = {
    A: "hsl(140 80% 55%)",
    C: "hsl(195 95% 60%)",
    G: "hsl(45 95% 60%)",
    T: "hsl(350 90% 62%)",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      aria-hidden
    >
      {/* Top + bottom rails */}
      <div className="absolute left-0 right-0 top-[12.7%] h-px bg-border/40" />
      <div className="absolute left-0 right-0 bottom-[12.7%] h-px bg-border/40" />
      {/* faint amplitude grid */}
      {[0.25, 0.5, 0.75].map((p) => (
        <div
          key={p}
          className="absolute left-0 right-0 h-px bg-border/15"
          style={{ top: `calc(${PAD_Y}px + ${p * TRACE_H}px)` }}
        />
      ))}

      {/* Left + right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20" />

      {/* Scrolling squiggle */}
      <div className="absolute inset-0">
        <motion.svg
          width={totalW * 2}
          height={VIEW_H}
          viewBox={`0 0 ${totalW * 2} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="block absolute top-0 left-0"
          style={{ height: "100%", width: `${totalW * 2}px` }}
          initial={{ x: 0 }}
          animate={{ x: -totalW }}
          transition={{
            duration: SCROLL_SECONDS,
            ease: "linear",
            repeat: Infinity,
          }}
          shapeRendering="crispEdges"
        >
          <defs>
            <linearGradient id="trace-h" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(195 95% 65%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(140 80% 55%)" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow-h" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ATGC base bands above the signal — represents sequenced bases */}
          <g>
            {stepXs.map((s, i) => {
              const w = steps[i].len;
              const x = s.x - w / 2;
              return (
                <g key={`band-${i}`}>
                  <rect
                    x={x}
                    y={BAND_Y}
                    width={w}
                    height={BAND_H}
                    fill={baseColor[s.base]}
                    opacity={0.18}
                  />
                  <text
                    x={s.x}
                    y={BAND_Y + BAND_H / 2 + 3}
                    textAnchor="middle"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fontSize={9}
                    fontWeight={700}
                    fill={baseColor[s.base]}
                    opacity={0.95}
                  >
                    {s.base}
                  </text>
                  <g transform={`translate(${totalW} 0)`}>
                    <rect
                      x={x}
                      y={BAND_Y}
                      width={w}
                      height={BAND_H}
                      fill={baseColor[s.base]}
                      opacity={0.18}
                    />
                    <text
                      x={s.x}
                      y={BAND_Y + BAND_H / 2 + 3}
                      textAnchor="middle"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      fontSize={9}
                      fontWeight={700}
                      fill={baseColor[s.base]}
                      opacity={0.95}
                    >
                      {s.base}
                    </text>
                  </g>
                </g>
              );
            })}
            {/* baseline under the band */}
            <line x1={0} y1={BAND_Y + BAND_H + 1} x2={totalW * 2} y2={BAND_Y + BAND_H + 1} stroke="hsl(var(--border))" strokeOpacity={0.35} strokeWidth={0.5} />
          </g>

          {/* draw path twice, side by side, for seamless loop */}
          <g filter="url(#glow-h)">
            <path d={d} stroke="url(#trace-h)" strokeWidth={0.9} fill="none" />
            <g transform={`translate(${totalW} 0)`}>
              <path d={d} stroke="url(#trace-h)" strokeWidth={0.9} fill="none" />
            </g>
          </g>
        </motion.svg>
      </div>

      {/* Read-head reticle (centered horizontally) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-30">
        <div className="relative w-[44px] h-full">
          {/* vertical scan line */}
          <div className="absolute inset-y-1 left-1/2 -translate-x-1/2 w-px bg-primary/80 shadow-[0_0_8px_hsl(var(--primary))]" />
          {/* bracket corners */}
          {[
            "top-0 left-0 border-t-2 border-l-2",
            "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2",
          ].map((c) => (
            <span key={c} className={`absolute size-3 border-primary ${c}`} />
          ))}
          {/* base call readout */}
          <motion.div
            key={pulseKey}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] font-mono font-bold text-2xl"
            style={{
              color: baseColor[calledBase],
              textShadow: `0 0 12px ${baseColor[calledBase]}`,
            }}
          >
            {calledBase}
          </motion.div>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            read
          </span>
        </div>
      </div>

      {/* Side chrome labels */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground z-30">
        pA · ionic
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 origin-right font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground z-30">
        nanopore · live
      </div>
    </div>
  );
};

export default NanoporeSignal;
