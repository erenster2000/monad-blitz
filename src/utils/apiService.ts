const API_BASE_URL = 'http://localhost:3001';

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export interface GeneratedToken {
  name: string;  // Topic değeri
  image: string;
  description: string;
  sourceAccount: string;
}

export const generateTokenMetadata = async (twitterUsername: string): Promise<GeneratedToken> => {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ twitterUsername }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  const data: TokenMetadata = await response.json();
  
  // Topic'i attributes'dan çek
  const topicAttribute = data.attributes.find(attr => attr.trait_type === 'Topic');
  const topic = topicAttribute?.value || 'Unknown';

  return {
    name: topic,  // Topic token adı olarak kullanılıyor
    image: data.image,
    description: data.description,
    sourceAccount: twitterUsername,
  };
};
