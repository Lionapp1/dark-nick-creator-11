
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NicknameGenerator from "@/components/NicknameGenerator";
import TextStyler from "@/components/TextStyler";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-surface">
      <Header />
      
      <main className="flex-1 container py-20">
        <div className="space-y-16 mt-8">
          <section className="text-center space-y-4 section-animate">
            <h1 className="text-4xl md:text-5xl font-bold gaming-gradient-text">
              Oyuncu Nickinizi Özelleştirin
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Benzersiz nickler oluşturun ve metinlerinizi şekillendirin
            </p>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-dark-surface-3 border border-white/5 text-sm">
              <Shield className="h-4 w-4 mr-2 text-gaming-blue" />
              <span>Uçtan uca şifreli, güvenli ve özel</span>
            </div>
          </section>

          <section className="space-y-12 section-animate section-animate-delay-1">
            <NicknameGenerator />
          </section>

          <section className="space-y-12 section-animate section-animate-delay-2">
            <TextStyler />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
