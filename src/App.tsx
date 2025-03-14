
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Nicknames from "./pages/Nicknames";
import Emojis from "./pages/Emojis";
import NotFound from "./pages/NotFound";

// Set favicon dynamically
document.querySelector("link[rel='icon']")?.remove();
const link = document.createElement("link");
link.rel = "icon";
link.href = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0RUFDRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jb21tYW5kIj48cGF0aCBkPSJNMTggM2EzIDMgMCAwIDAgLTMgM3YxMmEzIDMgMCAwIDAgMyAzIDMgMyAwIDAgMCAzIC0zIDMgMyAwIDAgMCAtMyAtM0g2YTMgMyAwIDAgMCAtMyAzIDMgMyAwIDAgMCAzIDMgMyAzIDAgMCAwIDMgLTNWNmEzIDMgMCAwIDAgLTMgLTMgMyAzIDAgMCAwIC0zIDMgMyAzIDAgMCAwIDMgM2gxMmEzIDMgMCAwIDAgMyAtMyAzIDMgMCAwIDAgLTMgLTN6Ii8+PC9zdmc+";
document.head.appendChild(link);

// Set the page title
document.title = "NeoNick Pro - Oyuncu Kimliği Oluşturucu";

// Update meta description
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.setAttribute("content", "Benzersiz oyuncu nickleri ve profesyonel oyun logoları oluşturun - Uçtan uca şifreli ve güvenli");
}

// For handling page title changes on route changes
const RouteChangeHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "NeoNick Pro - Oyuncu Kimliği Oluşturucu";
    
    if (path === "/nicknames") {
      pageTitle = "Nick Üretici - NeoNick Pro";
    } else if (path === "/emojis") {
      pageTitle = "Emoji Koleksiyonu - NeoNick Pro";
    }
    
    document.title = pageTitle;
  }, [location]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteChangeHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nicknames" element={<Nicknames />} />
          <Route path="/emojis" element={<Emojis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
