import { Footer, Nav } from './components/Shell';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { System } from './components/System';
import { ProductCodeWitness } from './components/ProductCodeWitness';
import { ProductMimir } from './components/ProductMimir';
import { ProductBeacon } from './components/ProductBeacon';
import { Methodology } from './components/Methodology';
import { Evidence } from './components/Evidence';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />
      <main>
        <Hero />
        <Vision />
        <System />
        <ProductCodeWitness />
        <ProductMimir />
        <ProductBeacon />
        <Methodology />
        <Evidence />
      </main>
      <Footer />
    </div>
  );
}
