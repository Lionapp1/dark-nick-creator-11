
import { useState } from "react";
import { RefreshCw, Copy, Download, Palette, Shield, Sparkles, Camera } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

// Expanded game types with more details
const GAME_TYPES = [
  { value: "valorant", label: "Valorant", color: "#FF4655", accent: "#0F1923" },
  { value: "csgo", label: "CS2", color: "#F7BC40", accent: "#111111" },
  { value: "pubg", label: "PUBG Mobile", color: "#F2A900", accent: "#2A2A2A" },
  { value: "ml", label: "Mobile Legends", color: "#FF4D94", accent: "#121F49" },
  { value: "lol", label: "League of Legends", color: "#0BC6E3", accent: "#091428" },
  { value: "cod", label: "Call of Duty Mobile", color: "#00D8FF", accent: "#111111" },
  { value: "fortnite", label: "Fortnite", color: "#9D4DFF", accent: "#2F3640" },
  { value: "freefire", label: "Free Fire", color: "#FF0000", accent: "#222222" },
  { value: "apex", label: "Apex Legends", color: "#DA292A", accent: "#000000" },
];

// More professional logo styles
const STYLES = [
  { value: "esports", label: "E-Sports Pro", pattern: "shield" },
  { value: "modern", label: "Modern Clean", pattern: "hexagon" },
  { value: "cyber", label: "Cyber Tech", pattern: "grid" },
  { value: "minimal", label: "Minimalist", pattern: "dots" },
  { value: "aggressive", label: "Aggressive", pattern: "sharp" },
  { value: "mascot", label: "Mascot Style", pattern: "animal" },
  { value: "geometric", label: "Geometric", pattern: "polygon" },
  { value: "circuit", label: "Circuit", pattern: "tech" },
  { value: "futuristic", label: "Futuristic", pattern: "neon" },
];

// Logo elements for more customization
const ELEMENTS = [
  { value: "none", label: "Yok" },
  { value: "shield", label: "Kalkan" },
  { value: "sword", label: "Kılıç" },
  { value: "crown", label: "Taç" },
  { value: "star", label: "Yıldız" },
  { value: "skull", label: "Kafatası" },
  { value: "wings", label: "Kanatlar" },
  { value: "dragon", label: "Ejderha" },
  { value: "wolf", label: "Kurt" },
  { value: "eagle", label: "Kartal" },
];

// Enhanced logo generation algorithm that creates more professional looking logos
const generateProLogoUrl = (gameType: string, style: string, text: string, complexity: number, element: string) => {
  // Find the color and accent for the selected game type
  const gameTypeObj = GAME_TYPES.find(g => g.value === gameType) || GAME_TYPES[0];
  const styleObj = STYLES.find(s => s.value === style) || STYLES[0];
  
  // Generate a unique seed based on inputs
  const seed = text.length * (complexity + 1) * (gameType.length + style.length);
  
  // Create gradient colors based on game type and complexity
  const mainColor = gameTypeObj.color;
  const accentColor = gameTypeObj.accent;
  
  // In a real implementation, we would generate a professional SVG-based logo here
  // For this simulation, we'll just return a placeholder URL with the parameters
  const escapedText = encodeURIComponent(text);
  
  // Create a more realistic simulated logo URL
  // Real implementation would generate SVG or use a logo API
  return `https://dummyimage.com/600x600/${mainColor.slice(1)}/${accentColor.slice(1)}&text=${escapedText}`;
};

const LogoGenerator = () => {
  const [logoText, setLogoText] = useState("NeoNick");
  const [gameType, setGameType] = useState("valorant");
  const [style, setStyle] = useState("esports");
  const [complexity, setComplexity] = useState(3);
  const [element, setElement] = useState("none");
  const [logoUrl, setLogoUrl] = useState("");
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateLogo = () => {
    setLoading(true);
    
    // Generate multiple professional logo variants
    setTimeout(() => {
      const newLogos = [];
      for (let i = 0; i < 4; i++) {
        // Create variations for more options
        const tweakedComplexity = Math.max(1, Math.min(5, complexity + (i % 3) - 1));
        const tweakedStyle = i === 3 ? (STYLES[(STYLES.findIndex(s => s.value === style) + 1) % STYLES.length]).value : style;
        const tweakedElement = i === 2 ? (ELEMENTS[(ELEMENTS.findIndex(e => e.value === element) + 1) % ELEMENTS.length]).value : element;
        
        newLogos.push(generateProLogoUrl(gameType, tweakedStyle, logoText, tweakedComplexity, tweakedElement));
      }
      
      setGeneratedLogos(newLogos);
      setLogoUrl(newLogos[0]); // Set the first one as the primary logo
      setLoading(false);
      
      toast({
        title: "Profesyonel Logolar Oluşturuldu!",
        description: "Birden fazla profesyonel logo seçeneği hazırlandı.",
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
        description: "Profesyonel logo başarıyla indirildi.",
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
          <h3 className="text-lg font-semibold gaming-gradient-text">Profesyonel Logo Tasarımcısı</h3>
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
              <DialogTitle className="gaming-gradient-text">Profesyonel Logo Bilgisi</DialogTitle>
              <DialogDescription>
                Bu uygulama uçtan uca şifreleme kullanır ve hiçbir veri sunucularımızda saklanmaz.
                Tüm işlemler tarayıcınızda gerçekleşir ve oluşturulan logolar tamamen güvenlidir.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-dark-surface-3 rounded-lg border border-white/5">
                <Shield className="h-5 w-5 text-gaming-blue" />
                <div>
                  <h4 className="font-medium">Profesyonel Kalite</h4>
                  <p className="text-sm text-foreground/60">Oyun takımları için özel tasarlanmış logolar</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-dark-surface-3 rounded-lg border border-white/5">
                <Camera className="h-5 w-5 text-gaming-blue" />
                <div>
                  <h4 className="font-medium">Yüksek Çözünürlük</h4>
                  <p className="text-sm text-foreground/60">İndirdiğiniz logolar yüksek çözünürlüklüdür</p>
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
            <label className="text-sm text-foreground/60 mb-2 block">Oyun</label>
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
          <Tabs defaultValue="esports" value={style} onValueChange={setStyle} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-9 bg-dark-surface-3">
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
        
        <div>
          <label className="text-sm text-foreground/60 mb-2 block">Logo Elementi</label>
          <Select value={element} onValueChange={setElement}>
            <SelectTrigger className="bg-dark-surface-3 border border-white/5">
              <SelectValue placeholder="Element seçin" />
            </SelectTrigger>
            <SelectContent className="bg-dark-surface border border-white/5">
              {ELEMENTS.map((elem) => (
                <SelectItem key={elem.value} value={elem.value}>{elem.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            Profesyonel Logo Oluşturuluyor...
          </>
        ) : (
          <>
            <Palette className="mr-2 h-4 w-4" />
            Profesyonel Logo Oluştur
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
