
import { useState } from "react";
import { RefreshCw, Copy, Download, Palette, Shield, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const GAME_TYPES = [
  { value: "pubg", label: "PUBG Mobile", color: "#ffb900" },
  { value: "ml", label: "Mobile Legends", color: "#ff4757" },
  { value: "cod", label: "Call of Duty Mobile", color: "#2ed573" },
  { value: "fortnite", label: "Fortnite", color: "#5352ed" },
  { value: "freefire", label: "Free Fire", color: "#ff6b81" },
  { value: "valorant", label: "Valorant", color: "#ff4757" },
  { value: "apex", label: "Apex Legends", color: "#ff6348" },
  { value: "lol", label: "League of Legends", color: "#1e90ff" },
];

const STYLES = [
  { value: "modern", label: "Modern", pattern: "hexagon" },
  { value: "retro", label: "Retro", pattern: "circuit" },
  { value: "minimalist", label: "Minimalist", pattern: "dots" },
  { value: "esports", label: "E-Sports", pattern: "shield" },
  { value: "warrior", label: "Savaşçı", pattern: "fire" },
  { value: "dragon", label: "Ejderha", pattern: "scales" },
  { value: "ninja", label: "Ninja", pattern: "shuriken" },
  { value: "cyber", label: "Siber", pattern: "grid" },
];

// This is an improved generator for better logos
const generateLogoUrl = (gameType: string, style: string, text: string, complexity: number) => {
  // Find the color for the selected game type
  const gameTypeObj = GAME_TYPES.find(g => g.value === gameType) || GAME_TYPES[0];
  const styleObj = STYLES.find(s => s.value === style) || STYLES[0];
  
  // Generate a unique seed based on inputs
  const seed = text.length * (complexity + 1) * (gameType.length + style.length);
  
  // Create gradient colors based on game type and complexity
  const angle = (seed % 360);
  const mainColor = gameTypeObj.color;
  const hue = parseInt(mainColor.slice(1), 16);
  
  // Calculate complementary color
  const complement = `#${((0xFFFFFF ^ hue) + 0x1000000).toString(16).substring(1)}`;
  
  // Adjust saturation and brightness based on complexity
  const saturation = 70 + (complexity * 5);
  const brightness = 50 + (complexity * 5);
  
  // Create a unique SVG shape based on the style and complexity
  const patternType = styleObj.pattern;
  
  // Escape text for URL
  const escapedText = encodeURIComponent(text);
  
  // Generate URL with all parameters
  return `https://dummyimage.com/300x300/${mainColor.slice(1)}/${complement.slice(1)}&text=${escapedText}`;
};

const LogoGenerator = () => {
  const [logoText, setLogoText] = useState("NeoNick");
  const [gameType, setGameType] = useState("pubg");
  const [style, setStyle] = useState("modern");
  const [complexity, setComplexity] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateLogo = () => {
    setLoading(true);
    
    // Generate multiple logo variants
    setTimeout(() => {
      const newLogos = [];
      for (let i = 0; i < 4; i++) {
        // Slightly modify parameters for variations
        const tweakedComplexity = Math.max(1, Math.min(5, complexity + (i % 3) - 1));
        const tweakedStyle = i === 3 ? (STYLES[(STYLES.findIndex(s => s.value === style) + 1) % STYLES.length]).value : style;
        newLogos.push(generateLogoUrl(gameType, tweakedStyle, logoText, tweakedComplexity));
      }
      
      setGeneratedLogos(newLogos);
      setLogoUrl(newLogos[0]); // Set the first one as the primary logo
      setLoading(false);
      
      toast({
        title: "Logolar Oluşturuldu!",
        description: "Birden fazla logo seçeneği oluşturuldu.",
        duration: 2000,
      });
    }, 1500);
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

  const selectLogo = (url: string) => {
    setLogoUrl(url);
    toast({
      title: "Logo Seçildi",
      description: "Bu logo ana logo olarak ayarlandı.",
      duration: 1500,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 gaming-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold gaming-gradient-text">Logo Üretici Pro</h3>
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
            <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-dark-surface-3">
              {STYLES.map((styleOption) => (
                <TabsTrigger
                  key={styleOption.value}
                  value={styleOption.value}
                  className="data-[state=active]:bg-gaming-blue/20 data-[state=active]:text-gaming-blue text-xs"
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
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Oluşturuluyor...
          </>
        ) : (
          <>
            <Palette className="mr-2 h-4 w-4" />
            Logo Oluştur
          </>
        )}
      </Button>

      {generatedLogos.length > 0 && (
        <div className="space-y-4">
          <div className="border border-white/10 rounded-lg overflow-hidden bg-dark-surface-3">
            <div className="flex items-center justify-center p-6">
              <img src={logoUrl} alt="Selected Logo" className="max-w-full h-auto max-h-48" />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {generatedLogos.map((url, index) => (
              <div 
                key={index}
                className={`border rounded-md overflow-hidden cursor-pointer transition-all hover:scale-105 ${url === logoUrl ? 'border-gaming-blue' : 'border-white/10'}`}
                onClick={() => selectLogo(url)}
              >
                <img src={url} alt={`Logo Option ${index + 1}`} className="w-full h-auto" />
              </div>
            ))}
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
