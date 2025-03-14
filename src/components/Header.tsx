
import { Shield, Sparkles, Command, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  // Get current path to determine active tab
  const path = window.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-surface/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <Command className="w-7 h-7 text-gaming-blue" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-gaming-pink" />
          </div>
          <span className="text-xl font-bold gaming-gradient-text">NeoNick Pro</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/nicknames">
            <Button 
              variant="ghost" 
              className={path === "/nicknames" 
                ? "text-gaming-blue bg-dark-surface-3/50" 
                : "text-foreground/60 hover:text-foreground hover:bg-dark-surface-3/30"
              }
            >
              Nick Üretici
            </Button>
          </Link>
          <Link to="/logos">
            <Button 
              variant="ghost" 
              className={path === "/logos" 
                ? "text-gaming-blue bg-dark-surface-3/50" 
                : "text-foreground/60 hover:text-foreground hover:bg-dark-surface-3/30"
              }
            >
              Logo Oluşturucu
            </Button>
          </Link>
          <Link to="/emojis">
            <Button 
              variant="ghost" 
              className={path === "/emojis" 
                ? "text-gaming-blue bg-dark-surface-3/50" 
                : "text-foreground/60 hover:text-foreground hover:bg-dark-surface-3/30"
              }
            >
              Emojiler
            </Button>
          </Link>
        </nav>
        
        <div className="md:flex items-center gap-4 hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-foreground/60 border border-white/5 px-2 py-1 rounded-full bg-dark-surface-3/80">
                <Shield className="h-3 w-3 text-gaming-cyan" />
                <span>Uçtan Uca Güvenli</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Tüm veriler uçtan uca şifrelidir</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <button 
          className="md:hidden text-foreground/60 hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-dark-surface border-b border-white/5 animate-slide-in md:hidden">
            <div className="container py-4 flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg ${path === "/" ? "bg-dark-surface-3/50 text-gaming-blue" : "hover:bg-dark-surface-3/30"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                to="/nicknames" 
                className={`px-4 py-2 rounded-lg ${path === "/nicknames" ? "bg-dark-surface-3/50 text-gaming-blue" : "hover:bg-dark-surface-3/30"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Nick Üretici
              </Link>
              <Link 
                to="/logos" 
                className={`px-4 py-2 rounded-lg ${path === "/logos" ? "bg-dark-surface-3/50 text-gaming-blue" : "hover:bg-dark-surface-3/30"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Logo Oluşturucu
              </Link>
              <Link 
                to="/emojis" 
                className={`px-4 py-2 rounded-lg ${path === "/emojis" ? "bg-dark-surface-3/50 text-gaming-blue" : "hover:bg-dark-surface-3/30"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Emojiler
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
