import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DesignCategories } from "@/components/DesignCategories";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DesignCategories />
      <ContactSection />
    </div>
  );
};

export default Index;
