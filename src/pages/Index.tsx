import { useState } from "react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Publications from "@/components/Publications";
import Skills from "@/components/Skills";
import Community from "@/components/Community";
import BootLoader from "@/components/BootLoader";

const Index = () => {
  const [booted, setBooted] = useState(false);
  return (
    <>
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Publications />
      <Skills />
      <Community />
    </>
  );
};

export default Index;
