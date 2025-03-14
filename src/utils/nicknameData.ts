// Gaming nickname prefixes and suffixes with more variety
export const nicknameParts = {
  prefixes: [
    "Dark", "Shadow", "Ninja", "Ghost", "Dragon", "Phoenix", "Cyber", "Storm",
    "Frost", "Thunder", "Blaze", "Night", "Star", "Wolf", "Silent", "Mystic",
    "Neon", "Toxic", "Zero", "Hyper", "Ultra", "Mega", "Super", "Pro",
    "Elite", "Alpha", "Omega", "Epic", "Noble", "Royal", "Swift", "Quantum",
    "Immortal", "Savage", "Ace", "Lucky", "Fatal", "Fierce", "Divine", "Eternal",
    "Rogue", "Venom", "Steel", "Chaos", "Void", "Hex", "Cosmic", "Fusion",
    "Phantom", "Demon", "Angel", "Rapid", "Inferno", "Viper", "Titan", "Doom",
    "Wicked", "Iron", "Vortex", "Mystic", "Psycho", "Prime", "Crazy", "Glitch"
  ],
  
  suffixes: [
    "Slayer", "Hunter", "Master", "King", "Lord", "Champion", "Warrior", "Knight",
    "Assassin", "Guardian", "Legend", "Beast", "Strike", "Shot", "Blade", "Edge",
    "Sniper", "Reaper", "Phantom", "Ghost", "Shadow", "Storm", "Rage", "Force",
    "Gaming", "Pro", "X", "Z", "Elite", "Boss", "Master", "Ace",
    "Ninja", "Killer", "Fury", "Demon", "Angel", "God", "Blitz", "Crusher",
    "Phoenix", "Dragon", "Wolf", "Eagle", "Shark", "Tiger", "Lion", "Hawk",
    "Destroyer", "Vengeance", "Sniper", "Predator", "Legend", "Avenger", "Titan", "Doom",
    "Nemesis", "Phantom", "Ghost", "Thunder", "Venom", "Stealth", "Hex", "Void"
  ],
  
  symbols: [
    "⚔️", "🎯", "👑", "🐉", "⚡", "🔥", "❄️", "☠️",
    "⭐", "🌟", "💫", "🌙", "✨", "💥", "⚡", "🎮",
    "🎮", "🏆", "⚡", "🔥", "💀", "👾", "🌠", "🌈",
    "💢", "💯", "🔱", "⚜️", "♠️", "♣️", "🧿", "👁️",
    "⭐", "💫", "✨", "⚔️", "🛡️", "🏹", "💣", "💥",
    "🔮", "🌌", "🌑", "🌕", "☄️", "🔴", "⚪", "🟣"
  ],
  
  // Adding short nicknames collection
  shortNames: [
    "Ace", "Pro", "God", "King", "Boss", "Noob", "MVP", "Hero", 
    "Tank", "Goat", "Fury", "Fire", "Bolt", "Void", "Doom", "Fear",
    "Zen", "Max", "Rex", "Fox", "Wolf", "Bear", "Hawk", "Lynx"
  ],
  
  // Adding special characters for more decoration options
  specialChars: [
    "꧁", "꧂", "☬", "ツ", "㋡", "☯", "☢", "☣",
    "✧", "✦", "⁂", "☆", "★", "▄", "▀", "█",
    "░", "▒", "▓", "╠", "╣", "╦", "╩", "═",
    "╬", "♛", "♕", "♚", "♔", "✯", "✰", "✵"
  ]
};

// Enhanced generateNickname function with more styling options
export const generateNickname = () => {
  // Choose random generation style for more variety
  const style = Math.floor(Math.random() * 5);
  
  switch (style) {
    case 0: {
      // Classic style (symbol + prefix + suffix)
      const prefix = nicknameParts.prefixes[Math.floor(Math.random() * nicknameParts.prefixes.length)];
      const suffix = nicknameParts.suffixes[Math.floor(Math.random() * nicknameParts.suffixes.length)];
      const symbol = nicknameParts.symbols[Math.floor(Math.random() * nicknameParts.symbols.length)];
      return `${symbol} ${prefix}${suffix}`;
    }
    case 1: {
      // Decorated style (special chars framing the name)
      const prefix = nicknameParts.prefixes[Math.floor(Math.random() * nicknameParts.prefixes.length)];
      const suffix = nicknameParts.suffixes[Math.floor(Math.random() * nicknameParts.suffixes.length)];
      const specialChar = nicknameParts.specialChars[Math.floor(Math.random() * nicknameParts.specialChars.length)];
      return `${specialChar} ${prefix}${suffix} ${specialChar}`;
    }
    case 2: {
      // Short and sweet
      const shortName = nicknameParts.shortNames[Math.floor(Math.random() * nicknameParts.shortNames.length)];
      const symbol = nicknameParts.symbols[Math.floor(Math.random() * nicknameParts.symbols.length)];
      return `${symbol} ${shortName}`;
    }
    case 3: {
      // Complex decorated style
      const prefix = nicknameParts.prefixes[Math.floor(Math.random() * nicknameParts.prefixes.length)];
      const suffix = nicknameParts.suffixes[Math.floor(Math.random() * nicknameParts.suffixes.length)];
      const specialChar1 = nicknameParts.specialChars[Math.floor(Math.random() * nicknameParts.specialChars.length)];
      const specialChar2 = nicknameParts.specialChars[Math.floor(Math.random() * nicknameParts.specialChars.length)];
      return `${specialChar1}${specialChar2} ${prefix}${suffix} ${specialChar2}${specialChar1}`;
    }
    case 4: {
      // Separated style (symbols between characters)
      const prefix = nicknameParts.prefixes[Math.floor(Math.random() * nicknameParts.prefixes.length)];
      const specialChar = nicknameParts.specialChars[Math.floor(Math.random() * nicknameParts.specialChars.length)];
      const chars = prefix.split('');
      return chars.join(specialChar);
    }
    default:
      return generateNickname(); // Recurse if needed
  }
};

// Enhanced function to generate unique nicknames
export const generateNicknameList = (count: number) => {
  const nicknames = new Set<string>();
  
  // Try up to count*3 times to avoid infinite loops if unique options run out
  let attempts = 0;
  const maxAttempts = count * 3;
  
  while (nicknames.size < count && attempts < maxAttempts) {
    nicknames.add(generateNickname());
    attempts++;
  }
  
  return Array.from(nicknames);
};

// Function to encrypt nicknames for secure storage (mock implementation)
export const encryptNickname = (nickname: string): string => {
  // In a real implementation, this would use a proper encryption library
  // This is just a visual indicator that security is being implemented
  return nickname;
};

// Function to validate nickname doesn't contain harmful content (mock implementation)
export const validateNickname = (nickname: string): boolean => {
  // In a real implementation, this would check for inappropriate content
  // This mock always returns true
  return true;
};
