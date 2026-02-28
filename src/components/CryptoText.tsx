import { useState, useRef } from 'react';
import { cryptoTextStyle } from './CryptoText.css';

interface CryptoTextProps {
  text: string;
  className?: string;
}

export const CryptoText = ({ text, className = '' }: CryptoTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((_char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current!);
    setDisplayText(text);
  };

  return (
    <span
      className={`${cryptoTextStyle.base} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};
