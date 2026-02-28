// Random 32-bit token oluştur
export const generateFailToken = (): string => {
  const chars = '0123456789ABCDEF';
  let token = '0x';
  for (let i = 0; i < 40; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};

// Token'ı küçültülmüş versiyonu (görüntü için)
export const abbreviateToken = (token: string): string => {
  return `${token.substring(0, 10)}...${token.substring(token.length - 8)}`;
};
