
import { Command, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-surface/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Command className="w-6 h-6 text-gaming-blue" />
          <span className="text-xl font-bold gaming-gradient-text">NickCraft</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" className="text-foreground/60 hover:text-foreground">
            Nick Üretici
          </Button>
          <Button variant="ghost" className="text-foreground/60 hover:text-foreground">
            Metin Dönüştürücü
          </Button>
        </nav>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-xs text-foreground/60 border border-white/5 px-2 py-1 rounded-full">
              <Shield className="h-3 w-3 text-green-500" />
              <span className="hidden sm:inline">Güvenli</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Tüm veriler uçtan uca şifrelidir</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
