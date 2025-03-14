
import { Command } from "lucide-react";
import { Button } from "./ui/button";

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
      </div>
    </header>
  );
};

export default Header;
