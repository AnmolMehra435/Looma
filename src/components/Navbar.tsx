import { useState, useEffect } from "react";
import { Menu, User, ShoppingBag, Palette, Home, Layers3, Search, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = isLoggedIn || isScrolled ? [
    { label: "Home", icon: Home, path: "/" },
    { label: "3D Studio", icon: Layers3, path: "/studio" },
    { label: "Explore", icon: Search, path: "/explore" },
    { label: "Profile", icon: UserCircle, path: "/profile" },
  ] : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-smooth">
      <div className={`transition-smooth ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b shadow-creative" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left Side - Logo and Dropdown */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/")}
              className="text-2xl font-bold gradient-primary bg-clip-text text-transparent hover-lift"
            >
              DesignCraft
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-glow">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card/95 backdrop-blur-sm">
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/studio")}>
                  <Layers3 className="mr-2 h-4 w-4" />
                  3D Studio
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/explore")}>
                  <Search className="mr-2 h-4 w-4" />
                  Explore Designs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Palette className="mr-2 h-4 w-4" />
                  Design Templates
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth hover:bg-primary/10 hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {!isLoggedIn && !isScrolled ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLoggedIn(true)}
                  className="hidden sm:flex"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="gradient-primary text-primary-foreground hover-lift"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover-glow">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-sm">
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Designs
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-smooth hover:bg-primary/10 hover:text-primary text-left"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};