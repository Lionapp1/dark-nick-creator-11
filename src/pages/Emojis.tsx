
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmojiPicker from "@/components/EmojiPicker";
import BottomNavigation from "@/components/BottomNavigation";
import { Smile } from "lucide-react";

const Emojis = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-surface">
      <Header />
      
      <main className="flex-1 container py-20">
        <div className="space-y-16 mt-8">
          <section className="text-center space-y-4 section-animate">
            <h1 className="text-4xl md:text-5xl font-bold gaming-gradient-text">
              Emojileri Kopyalayın
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Sosyal medya ve oyunlarda kullanabileceğiniz iOS emojileri
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-dark-surface-3 border border-white/5 text-sm">
              <Smile className="h-4 w-4 mr-2 text-gaming-blue" />
              <span>Tek tıkla kopyalayıp yapıştırın</span>
            </div>
          </section>

          <section className="space-y-12 section-animate section-animate-delay-1">
            <EmojiPicker />
          </section>
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Emojis;
