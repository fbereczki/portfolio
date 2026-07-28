import { About } from './components/About';
import { AIStack } from './components/AIStack';
import { Blockchain } from './components/Blockchain';
import { CodeWitnessSpotlight } from './components/CodeWitnessSpotlight';
import { Compliance } from './components/Compliance';
import { Contact } from './components/Contact';
import { CV } from './components/CV';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Shell';
import { Projects } from './components/Projects';
import { SIL } from './components/SIL';
import { Skills } from './components/Skills';

// Section order mirrors src/data/nav.ts — the single source of §-numbering.
export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <CodeWitnessSpotlight />
        <SIL />
        <Projects />
        <AIStack />
        <Blockchain />
        <Compliance />
        <Contact />
      </main>
      <Footer />
      <CV />
    </div>
  );
}
