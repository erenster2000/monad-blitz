export interface CoinConfig {
  name: string;
  image: string;
  color: string;
  isFail?: boolean;
}

export const coins: Record<string, CoinConfig> = {
  dogecoin: {
    name: 'DogeCoin',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png',
    color: '#BA9F33',
  },
  bitcoin: {
    name: 'Bitcoin',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    color: '#F7931A',
  },
  ethereum: {
    name: 'Ethereum',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg',
    color: '#627EEA',
  },
  monad: {
    name: 'Monad',
    image: 'https://pbs.twimg.com/profile_images/1735096503253250048/vF1CvF1j_400x400.jpg',
    color: '#836EF9',
  },
  solana: {
    name: 'Solana',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png',
    color: '#14F195',
  },
  pepe: {
    name: 'Pepe',
    image: 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
    color: '#3D9E40',
  },
  fail: {
    name: 'FAIL',
    image: '⚠️',
    color: '#EF4444',
    isFail: true,
  },
};

// Username veya tweet'e göre coin seç
export const getCoinForInput = (input: string): CoinConfig => {
  const lowerInput = input.toLowerCase();
  
  // Belirli kelimelere göre coin seçimi
  if (lowerInput.includes('doge') || lowerInput.includes('elon')) {
    return coins.dogecoin;
  }
  if (lowerInput.includes('btc') || lowerInput.includes('bitcoin')) {
    return coins.bitcoin;
  }
  if (lowerInput.includes('eth') || lowerInput.includes('ethereum') || lowerInput.includes('vitalik')) {
    return coins.ethereum;
  }
  if (lowerInput.includes('monad') || lowerInput.includes('mon')) {
    return coins.monad;
  }
  if (lowerInput.includes('sol') || lowerInput.includes('solana')) {
    return coins.solana;
  }
  if (lowerInput.includes('pepe') || lowerInput.includes('frog')) {
    return coins.pepe;
  }
  
  // Varsayılan olarak rastgele coin seç
  return getRandomCoin();
};

// Rastgele coin seç
export const getRandomCoin = (): CoinConfig => {
  const coinKeys = Object.keys(coins).filter(key => key !== 'fail');
  const randomKey = coinKeys[Math.floor(Math.random() * coinKeys.length)];
  return coins[randomKey];
};

// X username doğrulaması
export const validateTwitterUsername = (username: string): boolean => {
  // Boş string kontrolü
  if (!username.trim()) {
    return false;
  }

  const cleaned = username.replace('@', '').trim();

  // Minimum 3 karakter
  if (cleaned.length < 3) {
    return false;
  }

  // Maksimum 15 karakter (Twitter limiti)
  if (cleaned.length > 15) {
    return false;
  }

  // Sadece alphanumeric ve underscore
  if (!/^[a-zA-Z0-9_]+$/.test(cleaned)) {
    return false;
  }

  // Sayı ile başlayamaz
  if (/^[0-9]/.test(cleaned)) {
    return false;
  }

  // Yasaklı kelimeler
  const forbiddenWords = ['admin', 'twitter', 'system', 'bot', 'test123'];
  if (forbiddenWords.includes(cleaned.toLowerCase())) {
    return false;
  }

  return true;
};
