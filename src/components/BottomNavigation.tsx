
import { Link } from "react-router-dom";
import { Command, Type, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
}

const NavItem = ({ icon, label, active, to }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center px-2 py-1",
        "transition-colors",
        active
          ? "text-gaming-blue"
          : "text-foreground/60 hover:text-foreground"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

const BottomNavigation = () => {
  // Get current path to determine active tab
  const path = window.location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/5 bg-dark-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16">
        <NavItem
          icon={<Command className="w-5 h-5" />}
          label="Ana Sayfa"
          to="/"
          active={path === "/"}
        />
        <NavItem
          icon={<Type className="w-5 h-5" />}
          label="Nickler"
          to="/nicknames"
          active={path === "/nicknames"}
        />
        <NavItem
          icon={<Palette className="w-5 h-5" />}
          label="Logolar"
          to="/logos"
          active={path === "/logos"}
        />
      </div>
    </div>
  );
};

export default BottomNavigation;
