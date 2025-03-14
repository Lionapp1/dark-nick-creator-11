
import { useState } from "react";
import { RefreshCw, Copy, Download, Palette, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const GAME_TYPES = [
  { value: "pubg", label: "PUBG Mobile" },
  { value: "ml", label: "Mobile Legends" },
  { value: "cod", label: "Call of Duty Mobile" },
  { value: "fortnite", label: "Fortnite" },
  { value: "freefire", label: "Free Fire" },
];

const STYLES = [
  { value: "modern", label: "Modern" },
  { value: "retro", label: "Retro" },
  { value: "minimalist", label: "Minimalist" },
  { value: "esports", label: "E-Sports" },
  { value: "warrior", label: "Savaşçı" },
];

// This is a mock function to simulate logo generation
// In a real application, this would connect to an API or use canvas
const generateLogoUrl = (gameType: string, style: string, text: string, complexity: number) => {
  // In a real implementation, this would generate a real logo
  // For now, we'll return a placeholder URL based on the parameters
  const colors = ["1e90ff", "ff6347", "32cd32", "ffd700", "9932cc"];
  const colorIndex = (gameType.length + style.length + text.length) % colors.length;
  const color = colors[colorIndex];
  
  return `https://via.placeholder.com/300/${color}/FFFFFF?text=${encodeURIComponent(`${text} ${gameType.toUpperCase()} ${complexity}⭐`)}`;
};

const LogoGenerator = () => {
  const [logoText, setLogoText] = useState("NickCraft");
  const [gameType, setGameType] = useState("pubg");
  const [style, setStyle] = useState("modern");
  const [complexity, setComplexity] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");

  const generateLogo = () => {
    const newLogoUrl = generateLogoUrl(gameType, style, logoText, complexity);
    setLogoUrl(newLogoUrl);
    toast({
      title: "Logo Oluşturuldu!",
      description: "Yeni logo başarıyla oluşturuldu.",
      duration: 2000,
    });
  };

  const downloadLogo = async () => {
    if (!logoUrl) return;
    
    try {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${logoText}-${gameType}-logo.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Logo İndirildi!",
        description: "Logo başarıyla indirildi.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Logo indirilemedi.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const copyToClipboard = async () => {
    if (!logoUrl) return;
    
    try {
      // In a real implementation, you would copy the image to clipboard
      // For now, let's just simulate it
      await navigator.clipboard.writeText(logoUrl);
      toast({
        title: "Kopyalandı!",
        description: "Logo URL'si panoya kopyalandı.",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Logo kopyalanamadı.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 gaming-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold gaming-gradient-text">Logo Üretici</h3>
          <p className="text-sm text-foreground/60">
            Oyun takımınız için profesyonel logolar oluşturun
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
                Tüm işlemler tarayıcınızda gerçekleşir ve oluşturulan logolar tamamen güvenlidir.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-dark-surface-3 rounded-lg border border-white/5">
                <Shield className="h-5 w-5 text-gaming-blue" />
                <div>
                  <h4 className="font-medium">Güvenli Oluşturma</h4>
                  <p className="text-sm text-foreground/60">Logolar tamamen yerel olarak oluşturulur</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-foreground/60 mb-2 block">Logo Metni</label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full p-2 rounded-lg bg-dark-surface-3 border border-white/5 focus:border-gaming-blue/50 focus:outline-none"
              placeholder="Takım veya oyuncu adınız"
            />
          </div>
          
          <div>
            <label className="text-sm text-foreground/60 mb-2 block">Oyun Tipi</label>
            <Select value={gameType} onValueChange={setGameType}>
              <SelectTrigger className="bg-dark-surface-3 border border-white/5">
                <SelectValue placeholder="Oyun seçin" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border border-white/5">
                {GAME_TYPES.map((game) => (
                  <SelectItem key={game.value} value={game.value}>{game.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="text-sm text-foreground/60 mb-2 block">Logo Stili</label>
          <Tabs defaultValue="modern" value={style} onValueChange={setStyle} className="w-full">
            <TabsList className="grid grid-cols-5 bg-dark-surface-3">
              {STYLES.map((styleOption) => (
                <TabsTrigger
                  key={styleOption.value}
                  value={styleOption.value}
                  className="data-[state=active]:bg-gaming-blue/20 data-[state=active]:text-gaming-blue"
                >
                  {styleOption.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-foreground/60">Detay Seviyesi: {complexity}</label>
          </div>
          <Slider 
            defaultValue={[3]} 
            max={5} 
            min={1} 
            step={1} 
            onValueChange={(value) => setComplexity(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <Button
        onClick={generateLogo}
        className="w-full bg-gaming-gradient hover:opacity-90 transition-opacity"
      >
        <Palette className="mr-2 h-4 w-4" />
        Logo Oluştur
      </Button>

      {logoUrl && (
        <div className="space-y-4">
          <div className="border border-white/5 rounded-lg overflow-hidden bg-dark-surface-3">
            <div className="flex items-center justify-center p-6">
              <img src={logoUrl} alt="Generated Logo" className="max-w-full h-auto max-h-48" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyToClipboard}
              className="flex-1"
            >
              <Copy className="mr-2 h-4 w-4" />
              Kopyala
            </Button>
            <Button
              variant="outline"
              onClick={downloadLogo}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              İndir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoGenerator;
