import { useEffect, useRef, useState } from "react";
import data from "@/data.json";

const BootLoader = ({ onDone }: { onDone: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const all = data.boot as string[];
    const tick = setInterval(() => {
      idxRef.current += 1;
      const i = idxRef.current;
      setLines(all.slice(0, i));
      setProgress(Math.min(100, Math.round((i / all.length) * 100)));
      if (i >= all.length) {
        clearInterval(tick);
        setTimeout(() => setGlitching(true), 350);
        setTimeout(() => onDone(), 950);
      }
    }, 220);
    return () => clearInterval(tick);
  }, [onDone]);

  const skip = () => {
    setLines(data.boot as string[]);
    setProgress(100);
    setGlitching(true);
    setTimeout(() => onDone(), 400);
  };

  return (
    <div
      onClick={skip}
      onKeyDown={skip}
      role="button"
      tabIndex={0}
      aria-label="Boot sequence — click to skip"
      className={`fixed inset-0 z-[100] bg-black text-[#39d353] font-mono text-xs sm:text-sm cursor-pointer select-none ${glitching ? "glitch-out" : ""}`}
    >
      <div className="absolute inset-0 p-6 sm:p-10 overflow-hidden">
        <div className="mb-4 text-[#39d353]/60">
          vaishnav@igib:~$ ./boot_portfolio.sh
        </div>
        <div className="space-y-1">
          {lines.map((l, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-[#39d353]/50 mr-2">{String(i + 1).padStart(2, "0")}</span>
              {l}
            </div>
          ))}
          <div className="terminal-cursor" />
        </div>

        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
          <div className="flex items-center justify-between text-[#39d353]/60 mb-2">
            <span>loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-[#39d353]/15 overflow-hidden">
            <div
              className="h-full bg-[#39d353] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-[10px] text-[#39d353]/40 uppercase tracking-[0.3em]">
            press anywhere to skip
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
