import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Search, Filter, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Trending Designs",
  "Cartoons", 
  "Anime",
  "Car Designs",
  "K-Pop",
  "Streetwear",
  "Casuals",
  "Abstract Art",
  "Nature",
  "Sports",
  "Music",
  "Typography"
];

// Generate placeholder images for the gallery
const generateGalleryImages = () => {
  const images = [];
  for (let i = 1; i <= 60; i++) {
    images.push({
      id: i,
      src: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop&crop=center`,
      title: `Design ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      likes: Math.floor(Math.random() * 1000) + 50,
      rating: (Math.random() * 2 + 3).toFixed(1)
    });
  }
  return images;
};

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("Trending Designs");
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryImages] = useState(generateGalleryImages());

  const filteredImages = galleryImages.filter(image => 
    (selectedCategory === "Trending Designs" || image.category === selectedCategory) &&
    (searchQuery === "" || image.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     image.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-secondary/20 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explore
                <span className="gradient-primary bg-clip-text text-transparent mx-3">
                  Creative
                </span>
                Designs
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover thousands of unique designs from our creative community
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-full border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Category Strip */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="h-6 w-px bg-border shrink-0"></div>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full px-4 transition-smooth ${
                    selectedCategory === category 
                      ? "gradient-primary text-primary-foreground shadow-glow" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredImages.length} designs in "{selectedCategory}"
            </p>
            <Button variant="outline" size="sm">
              Sort by Popular
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-card rounded-lg overflow-hidden shadow-creative hover-lift hover-glow transition-smooth cursor-pointer animate-scale-in"
                style={{ animationDelay: `${(index % 12) * 0.05}s` }}
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth"></div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth space-y-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 truncate">{image.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {image.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {image.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover-lift">
              Load More Designs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}