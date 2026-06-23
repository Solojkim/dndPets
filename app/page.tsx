import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ExamplesGallery from "./components/ExamplesGallery";
import LatestPosts from "./components/LatestPosts";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <HowItWorks />
      <ExamplesGallery />
      <LatestPosts />
      <FAQ />
      <Footer />
    </main>
  );
}
