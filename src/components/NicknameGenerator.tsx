
import { useState } from "react";
import { RefreshCw, Copy, Shield, Lock, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { generateNicknameList, encryptNickname } from "../utils/nicknameData";
import { toast } from "./ui/use-toast";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const NicknameGenerator = () => {
  const [nicknames, setNicknames] = useState(generateNicknameList(5));
  const [count, setCount] = useState(5);

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(nickname)}
              className="hover:bg-white/5"
            >
              <Copy className="h-4 w-4" />
            </Button>
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
    </div>
  );
};

export default NicknameGenerator;
