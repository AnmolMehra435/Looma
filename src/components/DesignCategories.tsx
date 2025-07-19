import { useNavigate } from "react-router-dom";
import { Sparkles, Palette, Layers3, Heart } from "lucide-react";
import category1 from "@/assets/design-category-1.jpg";
import category2 from "@/assets/design-category-2.jpg";
import category3 from "@/assets/design-category-3.jpg";
import category4 from "@/assets/design-category-4.jpg";

const categories = [
  {
    id: 1,
    title: "Streetwear",
    description: "Urban and trendy designs",
    image: category1,
    icon: Sparkles,
    path: "/explore?category=streetwear"
  },
  {
    id: 2,
    title: "Anime & Art",
    description: "Creative character designs",
    image: category2,
    icon: Heart,
    path: "/explore?category=anime"
  },
  {
    id: 3,
    title: "Design Tools",
    description: "Professional design suite",
    image: category3,
    icon: Palette,
    path: "/studio"
  },
  {
    id: 4,
    title: "3D Studio",
    description: "Advanced 3D customization",
    image: category4,
    icon: Layers3,
    path: "/studio"
  }
];

export const DesignCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Explore
            <span className="gradient-primary bg-clip-text text-transparent mx-3">
              Design
            </span>
            Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover endless possibilities with our curated design categories and powerful tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(category.path)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-creative hover-lift hover-glow transition-smooth">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-primary/20 backdrop-blur-sm rounded-full text-white">
                    <category.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-smooth rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-smooth hover-lift"
          >
            <Palette className="h-5 w-5" />
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};