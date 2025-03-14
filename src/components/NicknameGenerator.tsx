
import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { generateNicknameList } from "../utils/nicknameData";
import { toast } from "./ui/use-toast";

const NicknameGenerator = () => {
  const [nicknames, setNicknames] = useState(generateNicknameList(5));

  const regenerateNicknames = () => {
    setNicknames(generateNicknameList(5));
  };

  const copyToClipboard = async (nickname: string) => {
    await navigator.clipboard.writeText(nickname);
    toast({
      title: "Kopyalandı!",
      description: "Nick panoya kopyalandı.",
      duration: 2000,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 gaming-card p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold gaming-gradient-text">Nick Üretici</h3>
        <p className="text-sm text-foreground/60">
          Benzersiz oyun nickleri oluşturun
        </p>
      </div>

      <div className="grid gap-4">
        {nicknames.map((nickname, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-dark-surface-3 rounded-lg border border-white/5"
          >
            <span className="text-lg">{nickname}</span>
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
