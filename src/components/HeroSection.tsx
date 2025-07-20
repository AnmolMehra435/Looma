import { Play, Sparkles, Palette, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroThumbnail from "@/assets/hero-video-thumbnail.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dark Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-primary/5" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-10 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:24px_24px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide">
              DESIGN YOUR DREAMS
            </span>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Create
            <span className="gradient-primary bg-clip-text text-transparent mx-3">
              Custom
            </span>
            <br />
            Clothing Designs
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your creativity into wearable art. Design, visualize, and order custom clothing 
            with our powerful 3D design platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/studio")}
              className="gradient-primary text-primary-foreground hover-lift text-lg px-8 py-6 h-auto"
            >
              <Layers3 className="mr-2 h-5 w-5" />
              Start Designing
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/explore")}
              className="border-primary/20 hover:bg-primary/10 text-lg px-8 py-6 h-auto"
            >
              <Palette className="mr-2 h-5 w-5" />
              Explore Gallery
            </Button>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center animate-float">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Designs Created</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Creators</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: "2s" }}>
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};