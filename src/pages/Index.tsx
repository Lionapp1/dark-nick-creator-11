
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NicknameGenerator from "@/components/NicknameGenerator";
import TextStyler from "@/components/TextStyler";
import { Shield } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-surface">
      <Header />
      
      <main className="flex-1 container py-20">
        <div className="space-y-16 mt-8">
          <section className="text-center space-y-4 section-animate">
            <h1 className="text-4xl md:text-5xl font-bold gaming-gradient-text">
              Oyuncu Kimliğinizi Oluşturun
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Benzersiz nickler ve emojiler ile diğer oyunculardan ayrılın
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-dark-surface-3 border border-white/5 text-sm">
              <Shield className="h-4 w-4 mr-2 text-gaming-blue" />
              <span>Uçtan uca şifreli, güvenli ve özel</span>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 section-animate section-animate-delay-1">
            <div className="bg-dark-surface-3 rounded-xl p-6 border border-white/5 hover:border-gaming-blue/30 transition-colors">
              <h2 className="text-2xl font-bold gaming-gradient-text mb-4">Özel Nickler</h2>
              <p className="text-foreground/60 mb-6">
                PUBG Mobile, Mobile Legends ve diğer popüler oyunlar için benzersiz ve dikkat çekici nickler oluşturun.
              </p>
              <Link to="/nicknames">
                <Button className="w-full bg-gaming-gradient hover:opacity-90 transition-opacity">
                  Nickler Oluştur
                </Button>
              </Link>
            </div>
            
            <div className="bg-dark-surface-3 rounded-xl p-6 border border-white/5 hover:border-gaming-blue/30 transition-colors">
              <h2 className="text-2xl font-bold gaming-gradient-text mb-4">Emojiler</h2>
              <p className="text-foreground/60 mb-6">
                Sosyal medya ve oyunlarda kullanabileceğiniz iOS emojilerini tek tıkla kopyalayın.
              </p>
              <Link to="/emojis">
                <Button className="w-full bg-gaming-gradient hover:opacity-90 transition-opacity">
                  Emojileri Görüntüle
                </Button>
              </Link>
            </div>
          </section>

          <section className="space-y-4 section-animate section-animate-delay-2">
            <h2 className="text-2xl font-bold gaming-gradient-text text-center">Öne Çıkan Araçlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-surface-3 p-4 rounded-lg border border-white/5">
                <h3 className="font-semibold">Metin Dönüştürücü</h3>
                <p className="text-sm text-foreground/60">Metinlerinizi özel stillerle dönüştürün</p>
              </div>
              <div className="bg-dark-surface-3 p-4 rounded-lg border border-white/5">
                <h3 className="font-semibold">Nick Üretici</h3>
                <p className="text-sm text-foreground/60">Benzersiz oyun nickleri üretin</p>
              </div>
              <div className="bg-dark-surface-3 p-4 rounded-lg border border-white/5">
                <h3 className="font-semibold">Emoji Koleksiyonu</h3>
                <p className="text-sm text-foreground/60">iOS emojilerini kopyalayıp kullanın</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Index;
