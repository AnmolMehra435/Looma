import { useState, useEffect } from "react";
import { Menu, User, ShoppingBag, Palette, Home, Layers3, Search, UserCircle, X, Moon, Sun } from "lucide-react";
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

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
        <div className="container mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
          {/* Left Side - Menu and Logo (Extreme Left) */}
          <div className="flex items-center gap-1 sm:gap-2 justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-glow h-8 w-8 sm:h-10 sm:w-10">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
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
            
            <button 
              onClick={() => navigate("/")}
              className="text-lg sm:text-2xl font-bold gradient-primary bg-clip-text text-transparent hover-lift ml-1 sm:ml-2"
            >
              Looma
            </button>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
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

          {/* Right Side (Extreme Right) */}
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 justify-end flex-wrap xs:flex-nowrap min-w-0">
            {/* Theme Switcher Button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover-glow"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {!isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsLoggedIn(true)}
                  className="text-xs xs:text-sm px-1 xs:px-2 sm:px-3 py-2 h-8 sm:h-10 min-w-0"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="gradient-primary text-primary-foreground hover-lift text-xs xs:text-sm px-1 xs:px-2 sm:px-3 py-2 h-8 sm:h-10 min-w-0"
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