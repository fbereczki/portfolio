import { useState } from 'react';
import { About } from './components/About';
import { AIStack } from './components/AIStack';
import { Background } from './components/Background';
import { Blockchain } from './components/Blockchain';
import { CodeWitnessSpotlight } from './components/CodeWitnessSpotlight';
import { Compliance } from './components/Compliance';
import { Contact } from './components/Contact';
import { CV } from './components/CV';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Sidebar } from './components/Sidebar';
import { SIL } from './components/SIL';
import { Skills } from './components/Skills';
import { TopBar } from './components/TopBar';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Background />
      <TopBar onMenuClick={() => setDrawerOpen(true)} />
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="pt-14 lg:pl-[260px]">
        <main className="min-h-[calc(100vh-3.5rem)]">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <CodeWitnessSpotlight />
          <AIStack />
          <SIL />
          <Blockchain />
          <Compliance />
          <Contact />
        </main>
        <Footer />
      </div>
      <CV />
    </>
  );
}
