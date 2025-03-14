
import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-white/5 bg-dark-surface/80 backdrop-blur-xl">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/60">
          © 2024 NickCraft. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <span>Oyuncular için</span>
          <HeartIcon className="w-4 h-4 text-gaming-blue" />
          <span>ile yapıldı</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
