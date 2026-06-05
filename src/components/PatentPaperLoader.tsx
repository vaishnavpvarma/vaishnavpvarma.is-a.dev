import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const treeImg = "/assets/date-palm-tree.jpg";

type Mode = "loading" | "reloading";

interface PatentPaperLoaderProps {
  mode?: Mode;
  duration?: number;
  onDone?: () => void;
}

const LoadingScene = () => (
  <div className="loading-scene">
    {/* Leaf ring (flat, behind) */}
    <div className="leaf-spinner">
      <span className="leaf top">🌿</span>
      <span className="leaf bottom">🌿</span>
      <span className="leaf left">🌿</span>
      <span className="leaf right">🌿</span>
    </div>

    {/* Tree (center) */}
    <img className="tree-image" src={treeImg} alt="Date Palm Tree" />

    {/* LEO 3D orbit — bat passes behind the tree on top half, in front on bottom */}
    <div className="orbit-stage">
      <div className="orbit-track track-a">
        <div className="bat-anchor">
          <div className="bat">🦇</div>
        </div>
      </div>
      <div className="orbit-track track-b">
        <div className="bat-anchor">
          <div className="bat">🦇</div>
        </div>
      </div>
    </div>

    <style>{`
      .loading-scene {
        position: relative;
        width: 340px;
        height: 340px;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 900px;
        perspective-origin: 50% 50%;
      }
      .tree-image {
        position: relative;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        object-fit: cover;
        z-index: 5;
        box-shadow: 0 12px 28px rgba(0,0,0,0.45);
        border: 2px solid hsl(var(--border));
      }
      .leaf-spinner {
        position: absolute;
        width: 240px;
        height: 240px;
        border: 4px dashed hsl(var(--primary));
        border-radius: 50%;
        z-index: 1;
        animation: spinClockwise 5s linear infinite;
      }
      .leaf {
        position: absolute;
        font-size: 26px;
        filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));
      }
      .leaf.top { top: -16px; left: 50%; transform: translateX(-50%); }
      .leaf.bottom { bottom: -16px; left: 50%; transform: translateX(-50%); }
      .leaf.left { left: -16px; top: 50%; transform: translateY(-50%) rotate(-90deg); }
      .leaf.right { right: -16px; top: 50%; transform: translateY(-50%) rotate(90deg); }

      /* 3D orbit stage */
      .orbit-stage {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        pointer-events: none;
      }
      .orbit-track {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 240px;
        height: 240px;
        margin: -120px 0 0 -120px;
        transform-style: preserve-3d;
      }
      /* Tilt the orbital plane diagonally (LEO-style, tight + tilted) */
      .track-a {
        transform: rotateX(70deg) rotateZ(-20deg);
        animation: orbitSpin 2.4s linear infinite;
      }
      .track-b {
        width: 280px;
        height: 280px;
        margin: -140px 0 0 -140px;
        transform: rotateX(68deg) rotateZ(35deg);
        animation: orbitSpinReverse 3.2s linear infinite;
      }
      /* Anchor sits on the orbit ring; rides the rotation */
      .bat-anchor {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 0;
        transform-style: preserve-3d;
      }
      /* Counter-rotate so bat stays upright facing the camera.
         Undo plane tilt (rotateZ then rotateX inverse) */
      .track-a .bat-anchor { animation: counterUprightA 2.4s linear infinite; }
      .track-b .bat-anchor { animation: counterUprightB 3.2s linear infinite; }

      .bat {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 30px;
        transform: translate(-50%, -50%);
        animation: flapWings 0.28s ease-in-out infinite alternate;
        filter: drop-shadow(0 6px 6px rgba(0,0,0,0.45));
      }

      @keyframes spinClockwise {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      /* Orbit rotates around the tilted plane's local Z axis */
      @keyframes orbitSpin {
        0% { transform: rotateX(70deg) rotateZ(-20deg) rotate(0deg); }
        100% { transform: rotateX(70deg) rotateZ(-20deg) rotate(360deg); }
      }
      @keyframes orbitSpinReverse {
        0% { transform: rotateX(68deg) rotateZ(35deg) rotate(360deg); }
        100% { transform: rotateX(68deg) rotateZ(35deg) rotate(0deg); }
      }
      /* Keep bat upright: invert the plane tilt + spin so the sprite faces camera */
      @keyframes counterUprightA {
        0% { transform: rotate(0deg) rotateX(-70deg) rotateZ(20deg); }
        100% { transform: rotate(-360deg) rotateX(-70deg) rotateZ(20deg); }
      }
      @keyframes counterUprightB {
        0% { transform: rotate(-360deg) rotateX(-68deg) rotateZ(-35deg); }
        100% { transform: rotate(0deg) rotateX(-68deg) rotateZ(-35deg); }
      }
      @keyframes flapWings {
        0% { transform: translate(-50%, -50%) scaleY(1); }
        100% { transform: translate(-50%, -50%) scaleY(0.55); }
      }
    `}</style>
  </div>
);

const PatentPaperLoader = ({ mode = "loading", duration = 1800, onDone }: PatentPaperLoaderProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={mode}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <LoadingScene />
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              {mode === "loading" ? "growing schematic · IN/520964" : "re-rendering schematic"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PatentPaperLoader;
