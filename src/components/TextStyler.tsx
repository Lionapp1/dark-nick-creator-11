
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { textStyles } from "../utils/textStyles";
import { toast } from "./ui/use-toast";

const TextStyler = () => {
  const [text, setText] = useState("");
  const [styledTexts, setStyledTexts] = useState<{ style: string; text: string }[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    const newStyledTexts = textStyles.map(style => ({
      style: style.name,
      text: style.transform(newText)
    }));
    
    setStyledTexts(newStyledTexts);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Kopyalandı!",
      description: "Metin panoya kopyalandı.",
      duration: 2000,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 gaming-card p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold gaming-gradient-text">Metin Dönüştürücü</h3>
        <p className="text-sm text-foreground/60">
          Metninizi farklı stillerle özelleştirin
        </p>
      </div>
      
      <Input
        placeholder="Metninizi buraya yazın..."
        value={text}
        onChange={handleTextChange}
        className="bg-dark-surface-3 border-white/5"
      />

      <div className="grid gap-4">
        {styledTexts.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-dark-surface-3 rounded-lg border border-white/5"
          >
            <div>
              <div className="text-sm font-medium text-foreground/60 mb-1">
                {item.style}
              </div>
              <div className="text-foreground">{item.text}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(item.text)}
              className="hover:bg-white/5"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextStyler;
