import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DesignCategories } from "@/components/DesignCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DesignCategories />
    </div>
  );
};

export default Index;
