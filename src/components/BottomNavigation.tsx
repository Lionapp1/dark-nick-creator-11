
import { Link, useLocation } from "react-router-dom";
import { Command, Type, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
        "flex flex-col items-center justify-center px-4 py-1 relative",
        "transition-all duration-300",
        active
          ? "text-gaming-blue scale-110"
          : "text-foreground/60 hover:text-foreground"
      )}
    >
      <div className={cn(
        "mb-1 p-1.5 transition-all duration-300",
        active && "bg-gaming-blue/20 rounded-full"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
      {active && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-gaming-blue" />
      )}
    </Link>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  // Get current path to determine active tab
  const path = location.pathname;

  // Add animation effect when changing routes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [path]);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/5 bg-dark-surface/90 backdrop-blur-xl shadow-lg",
      animate && "animate-slide-in"
    )}>
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
