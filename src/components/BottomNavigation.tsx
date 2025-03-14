
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Search, Clock, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, to, active, onClick }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-center relative",
        "transition-all duration-300",
        active ? "text-gaming-blue scale-110" : "text-gray-400 hover:text-gray-300"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "p-2.5 transition-all duration-300 relative",
        active && "after:content-[''] after:absolute after:top-[-15px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-gaming-blue after:rounded-full"
      )}>
        {icon}
      </div>
    </Link>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  const [prevPath, setPrevPath] = useState("/");

  // Get current path to determine active tab
  const path = location.pathname;

  // Add animation effect when changing routes
  useEffect(() => {
    if (prevPath !== path) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      setPrevPath(path);
      return () => clearTimeout(timer);
    }
  }, [path, prevPath]);

  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden",
      "rounded-full border border-white/10 bg-dark-surface-3/90 backdrop-blur-xl shadow-lg px-6 py-3",
      "w-auto max-w-[320px]",
      animate && "animate-slide-in"
    )}>
      <div className="flex items-center justify-between gap-8">
        <NavItem
          icon={<MessageCircle className="w-5 h-5" />}
          to="/"
          active={path === "/"}
        />
        <NavItem
          icon={<Search className="w-5 h-5" />}
          to="/nicknames"
          active={path === "/nicknames"}
        />
        <NavItem
          icon={<Clock className="w-5 h-5" />}
          to="/logos"
          active={path === "/logos"}
        />
        <NavItem
          icon={<Bell className="w-5 h-5" />}
          to="/emojis"
          active={path === "/emojis"}
        />
        <NavItem
          icon={<User className="w-5 h-5" />}
          to="/profile"
          active={path === "/profile"}
        />
      </div>
    </div>
  );
};

export default BottomNavigation;
