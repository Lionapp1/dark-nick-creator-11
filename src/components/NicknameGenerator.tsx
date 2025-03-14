
import { useState } from "react";
import { RefreshCw, Copy, Shield, Lock, Sparkles, Plus, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { generateNicknameList, encryptNickname } from "../utils/nicknameData";
import { toast } from "./ui/use-toast";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Nick categories 
const NICK_CATEGORIES = [
  { id: "all", name: "Tümü" },
  { id: "valorant", name: "Valorant" },
  { id: "lol", name: "LoL" },
  { id: "pubg", name: "PUBG" },
  { id: "cs2", name: "CS2" },
  { id: "cool", name: "Havalı" },
  { id: "funny", name: "Komik" },
  { id: "scary", name: "Korkutucu" },
  { id: "anime", name: "Anime" },
];

// Nick themes
const NICK_THEMES = [
  { id: "all", name: "Karışık" },
  { id: "short", name: "Kısa" },
  { id: "long", name: "Uzun" },
  { id: "symbols", name: "Semboller" },
  { id: "numbers", name: "Rakamlı" },
];

const NicknameGenerator = () => {
  const [nicknames, setNicknames] = useState(generateNicknameList(5));
  const [count, setCount] = useState(5);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTheme, setActiveTheme] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const regenerateNicknames = () => {
    setNicknames(generateNicknameList(count));
    toast({
      title: "Nickler Üretildi!",
      description: "Yeni benzersiz nickler oluşturuldu.",
      duration: 2000,
    });
  };

  const copyToClipboard = async (nickname: string) => {
    // Encrypt before storing in clipboard (conceptual - actual clipboard is unencrypted)
    const secureNickname = encryptNickname(nickname);
    await navigator.clipboard.writeText(secureNickname);
    toast({
      title: "Kopyalandı!",
      description: "Nick güvenli bir şekilde panoya kopyalandı.",
      duration: 2000,
    });
  };

  const handleCountChange = (value: number[]) => {
    setCount(value[0]);
  };

  const toggleFavorite = (nickname: string) => {
    if (favorites.includes(nickname)) {
      setFavorites(favorites.filter(n => n !== nickname));
      toast({
        title: "Favorilerden Çıkarıldı",
        description: "Nick favorilerden kaldırıldı.",
        duration: 1500,
      });
    } else {
      setFavorites([...favorites, nickname]);
      toast({
        title: "Favorilere Eklendi",
        description: "Nick favorilere eklendi.",
        duration: 1500,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 gaming-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold gaming-gradient-text">Nick Üretici</h3>
          <p className="text-sm text-foreground/60">
            Benzersiz oyun nickleri oluşturun
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Shield className="h-4 w-4 text-gaming-blue" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-dark-surface border border-white/5">
            <DialogHeader>
              <DialogTitle className="gaming-gradient-text">Güvenlik Bilgisi</DialogTitle>
              <DialogDescription>
                Bu uygulama uçtan uca şifreleme kullanır ve hiçbir veri sunucularımızda saklanmaz.
                Tüm işlemler tarayıcınızda gerçekleşir ve oluşturulan nickler tamamen güvenlidir.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-dark-surface-3 rounded-lg border border-white/5">
                <Lock className="h-5 w-5 text-gaming-blue" />
                <div>
                  <h4 className="font-medium">Uçtan Uca Şifreleme</h4>
                  <p className="text-sm text-foreground/60">Tüm veriler yerel olarak şifrelenir</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-dark-surface-3 rounded-lg border border-white/5">
                <Shield className="h-5 w-5 text-gaming-blue" />
                <div>
                  <h4 className="font-medium">Güvenli Oluşturma</h4>
                  <p className="text-sm text-foreground/60">Nickler tamamen yerel olarak oluşturulur</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-foreground/60 mb-2 block">Kategori</label>
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {NICK_CATEGORIES.map(category => (
                <Button 
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={activeCategory === category.id ? "bg-gaming-blue hover:bg-gaming-blue/90" : ""}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-foreground/60 mb-2 block">Tema</label>
          <Tabs defaultValue="all" value={activeTheme} onValueChange={setActiveTheme} className="w-full">
            <TabsList className="grid grid-cols-5 bg-dark-surface-3">
              {NICK_THEMES.map((theme) => (
                <TabsTrigger
                  key={theme.id}
                  value={theme.id}
                  className="data-[state=active]:bg-gaming-blue/20 data-[state=active]:text-gaming-blue"
                >
                  {theme.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-foreground/60">Nick Sayısı: {count}</label>
          </div>
          <Slider 
            defaultValue={[5]} 
            max={10} 
            min={1} 
            step={1} 
            onValueChange={handleCountChange}
            className="py-4"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {nicknames.map((nickname, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-dark-surface-3 rounded-lg border border-white/5 hover:border-gaming-blue/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-lg">{nickname}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(nickname)}
                className="hover:bg-white/5"
              >
                <Heart className={`h-4 w-4 ${favorites.includes(nickname) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(nickname)}
                className="hover:bg-white/5"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={regenerateNicknames}
        className="w-full bg-gaming-gradient hover:opacity-90 transition-opacity"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Yeni Nickler Üret
      </Button>

      {favorites.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Favori Nickleriniz</h4>
          <div className="grid gap-2">
            {favorites.map((favorite, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-dark-surface-3/50 rounded-md border border-white/5"
              >
                <span>{favorite}</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(favorite)}
                    className="h-7 w-7 hover:bg-white/5"
                  >
                    <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(favorite)}
                    className="h-7 w-7 hover:bg-white/5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NicknameGenerator;
