import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DesignCategories } from "@/components/DesignCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DesignCategories />
    </div>
  );
};

export default Index;
