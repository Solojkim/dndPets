import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ExamplesGallery from "./components/ExamplesGallery";
import PortraitGenerator from "./components/PortraitGenerator";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <HowItWorks />
      <ExamplesGallery />
      <PortraitGenerator />
      <FAQ />
      <Footer />
    </main>
  );
}
