import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const messageFor = (pathname: string): string[] => {
  if (pathname === "/") {
    return [
      "[ OK ] Mounting / ...",
      "[ OK ] Hydrating hero.tsx",
      "[ RUN ] Rendering portfolio shell ...",
    ];
  }
  if (pathname.startsWith("/projects/")) {
    const id = pathname.split("/").pop() ?? "unknown";
    return [
      `$ git fetch origin/${id}`,
      `[ OK ] Accessing repository [${id}] ...`,
      `[ OK ] Parsing README.md`,
      `[ RUN ] Rendering project view ...`,
    ];
  }
  if (pathname === "/projects") {
    return [
      "$ gh repo list vaishnavpvarma --limit 30",
      "[ OK ] Authenticated as @vaishnavpvarma",
      "[ RUN ] Hydrating repository index ...",
    ];
  }
  if (pathname === "/patent") {
    return [
      "[ OK ] Loading IN/520964.glb",
      "[ OK ] Initializing WebGL2 context",
      "[ RUN ] Rendering 3D schematics for Patent No. 520964 ...",
    ];
  }
  if (pathname === "/gallery") {
    return [
      "[ OK ] Mounting /var/photos",
      "[ RUN ] Decoding image manifest ...",
      "[ OK ] 8 frames ready",
    ];
  }
  if (pathname === "/blog") {
    return [
      "$ cat ~/notes/research/*.md",
      "[ OK ] Tokenizing markdown",
      "[ RUN ] Rendering blog ...",
    ];
  }
  if (pathname === "/experience") {
    return [
      "[ OK ] Loading CV.json",
      "[ RUN ] Rendering timeline ...",
    ];
  }
  return [
    `[ OK ] Resolving ${pathname}`,
    "[ RUN ] Rendering view ...",
  ];
};

const RouteTransition = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);
  const [lines, setLines] = useState<string[]>(messageFor(pathname));

  useEffect(() => {
    setLines(messageFor(pathname));
    setShow(true);
    const t = setTimeout(() => setShow(false), 850);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center pointer-events-none"
        >
          <div className="font-mono text-xs sm:text-sm max-w-xl w-full px-6 space-y-1.5">
            {lines.map((l, i) => (
              <motion.div
                key={l + i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={l.startsWith("$") ? "text-primary" : "text-muted-foreground"}
              >
                <span className="text-primary mr-2">{l.startsWith("$") ? "" : "›"}</span>
                {l}
              </motion.div>
            ))}
            <div className="text-primary terminal-cursor pt-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteTransition;
