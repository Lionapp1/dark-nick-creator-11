
import { useState } from "react";
import { Copy, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

// Emoji categories and their emojis
const emojiCategories = [
  {
    name: "Yüzler",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕"]
  },
  {
    name: "El Hareketleri",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🦷", "🦴", "👀", "👁️", "👅", "👄"]
  },
  {
    name: "Hayvanlar",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🪶", "🐓", "🦃", "🦤", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦫", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"]
  },
  {
    name: "Yiyecek & İçecek",
    emojis: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟", "🍕", "🥪", "🥙", "🧆", "🌮", "🌯", "🥗", "🥘", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "🍼", "☕", "🍵", "🧃", "🥤", "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾", "🧊"]
  },
  {
    name: "Oyun & Spor",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🏋️‍♀️", "🏋️‍♂️", "🤼", "🤼‍♀️", "🤼‍♂️", "🤸", "🤸‍♀️", "🤸‍♂️", "⛹️", "⛹️‍♀️", "⛹️‍♂️", "🤺", "🤾", "🤾‍♀️", "🤾‍♂️", "🏌️", "🏌️‍♀️", "🏌️‍♂️", "🏇", "🧘", "🧘‍♀️", "🧘‍♂️", "🏄", "🏄‍♀️", "🏄‍♂️", "🏊", "🏊‍♀️", "🏊‍♂️", "🤽", "🤽‍♀️", "🤽‍♂️", "🚣", "🚣‍♀️", "🚣‍♂️", "🧗", "🧗‍♀️", "🧗‍♂️", "🚵", "🚵‍♀️", "🚵‍♂️", "🚴", "🚴‍♀️", "🚴‍♂️", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🤹‍♀️", "🤹‍♂️", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"]
  },
  {
    name: "Semboller",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "↪️", "↩️", "⤴️", "⤵️", "🔀", "🔁", "🔂", "🔄", "🔃", "🎵", "🎶", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "🔚", "🔙", "🔛", "🔝", "🔜", "✔️", "☑️", "🔘", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "🔺", "🔻", "🔸", "🔹", "🔶", "🔷", "🔳", "🔲", "▪️", "▫️", "◾", "◽", "◼️", "◻️", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬛", "⬜", "🟫", "🔈", "🔇", "🔉", "🔊", "🔔", "🔕", "📣", "📢", "👁️‍🗨️", "💬", "💭", "🗯️", "♠️", "♣️", "♥️", "♦️", "🃏", "🎴", "🀄"]
  }
];

const EmojiPicker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0].name);
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const copyEmoji = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      
      // Update recent emojis
      setRecentEmojis(prev => {
        const newRecent = [emoji, ...prev.filter(e => e !== emoji)].slice(0, 20);
        return newRecent;
      });
      
      toast({
        title: "Kopyalandı!",
        description: `${emoji} emoji panoya kopyalandı.`,
        duration: 1500,
      });
    } catch (err) {
      toast({
        title: "Hata",
        description: "Emoji kopyalanamadı.",
        variant: "destructive",
      });
    }
  };

  const filteredEmojis = searchTerm
    ? emojiCategories
        .flatMap(category => category.emojis)
        .filter(emoji => emoji.includes(searchTerm))
    : [];

  const displayedEmojis = searchTerm
    ? filteredEmojis
    : emojiCategories.find(category => category.name === activeCategory)?.emojis || [];

  return (
    <div className="w-full gaming-card p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold gaming-gradient-text">Emoji Seçici</h3>
        <p className="text-sm text-foreground/60">
          Kopyalayıp kullanabileceğiniz iOS emojileri
        </p>
      </div>

      <div className="relative">
        <Input
          placeholder="Emoji ara..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 bg-dark-surface-3 border-white/5"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground/60" />
      </div>

      {recentEmojis.length > 0 && !searchTerm && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Son Kullanılanlar</h4>
          <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
            {recentEmojis.map((emoji, index) => (
              <Button
                key={`recent-${index}`}
                variant="ghost"
                className="h-10 w-10 p-0 rounded-lg hover:bg-white/5 flex items-center justify-center text-xl"
                onClick={() => copyEmoji(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      )}

      {!searchTerm && (
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
          {emojiCategories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              className={`whitespace-nowrap px-3 py-1 h-auto text-sm ${
                activeCategory === category.name 
                  ? "bg-gaming-gradient hover:opacity-90"
                  : "text-foreground/60 hover:text-foreground bg-dark-surface-3 hover:bg-dark-surface-3/80 border-white/5"
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      )}

      <div className="bg-dark-surface-3 rounded-xl border border-white/5 p-4 h-56 overflow-y-auto">
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
          {displayedEmojis.map((emoji, index) => (
            <Button
              key={`emoji-${index}`}
              variant="ghost"
              className="h-10 w-10 p-0 rounded-lg hover:bg-white/5 flex items-center justify-center text-xl"
              onClick={() => copyEmoji(emoji)}
            >
              {emoji}
            </Button>
          ))}
          {searchTerm && displayedEmojis.length === 0 && (
            <div className="col-span-full text-center py-10 text-foreground/60">
              Emoji bulunamadı...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;
