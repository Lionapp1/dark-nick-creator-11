
// Gaming nickname prefixes and suffixes
export const nicknameParts = {
  prefixes: [
    "Dark", "Shadow", "Ninja", "Ghost", "Dragon", "Phoenix", "Cyber", "Storm",
    "Frost", "Thunder", "Blaze", "Night", "Star", "Wolf", "Silent", "Mystic",
    "Neon", "Toxic", "Zero", "Hyper", "Ultra", "Mega", "Super", "Pro",
    "Elite", "Alpha", "Omega", "Epic", "Noble", "Royal", "Swift", "Quantum"
  ],
  
  suffixes: [
    "Slayer", "Hunter", "Master", "King", "Lord", "Champion", "Warrior", "Knight",
    "Assassin", "Guardian", "Legend", "Beast", "Strike", "Shot", "Blade", "Edge",
    "Sniper", "Reaper", "Phantom", "Ghost", "Shadow", "Storm", "Rage", "Force",
    "Gaming", "Pro", "X", "Z", "Elite", "Boss", "Master", "Ace"
  ],
  
  symbols: [
    "⚔️", "🎯", "👑", "🐉", "⚡", "🔥", "❄️", "☠️",
    "⭐", "🌟", "💫", "🌙", "✨", "💥", "⚡", "🎮"
  ]
};

export const generateNickname = () => {
  const prefix = nicknameParts.prefixes[Math.floor(Math.random() * nicknameParts.prefixes.length)];
  const suffix = nicknameParts.suffixes[Math.floor(Math.random() * nicknameParts.suffixes.length)];
  const symbol = nicknameParts.symbols[Math.floor(Math.random() * nicknameParts.symbols.length)];
  
  return `${symbol} ${prefix}${suffix}`;
};

export const generateNicknameList = (count: number) => {
  const nicknames = new Set<string>();
  while (nicknames.size < count) {
    nicknames.add(generateNickname());
  }
  return Array.from(nicknames);
};
