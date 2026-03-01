import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Cpu } from 'lucide-react';
import { CryptoText } from '../../components/CryptoText';
import { useWeb3 } from '../../hooks/useWeb3';
import { validateTwitterUsername, type CoinConfig, coins } from '../../utils/coinConfig';
import { generateFailToken, abbreviateToken } from '../../utils/tokenGenerator';
import { generateTokenMetadata } from '../../utils/apiService';
import * as S from './home.css';

type Status = 'idle' | 'loading' | 'result';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [resultConfig, setResultConfig] = useState<CoinConfig | null>(null);
  const [resultToken, setResultToken] = useState<string | null>(null);
  const { address, isConnected, connectWallet, formatAddress } = useWeb3();

  const handleAnalyze = async () => {
    if (!inputValue.trim()) {
      alert('Lütfen bir Tweet linki veya username girin!');
      return;
    }
    
    // Username'i doğrula
    if (!validateTwitterUsername(inputValue)) {
      // Hemen FAIL döndür (loading olmadan)
      const failToken = generateFailToken();
      setResultConfig(coins.fail);
      setResultToken(failToken);
      setStatus('result');
      return;
    }
    
    setResultToken(null);
    setStatus('loading');
    
    try {
      // API'den token metadata al
      const username = inputValue.replace('@', '').trim();
      const tokenData = await generateTokenMetadata(username);
      
      // Dinamik olarak CoinConfig oluştur
      const dynamicConfig: CoinConfig = {
        name: tokenData.name,  // Topic değeri token adı
        image: tokenData.image,  // API'den gelen image
        color: '#836EF9',  // Varsayılan mor renk
      };
      
      setResultConfig(dynamicConfig);
      setStatus('result');
    } catch (error) {
      console.error('API Error:', error);
      // Hata durumunda FAIL göster
      const failToken = generateFailToken();
      setResultConfig(coins.fail);
      setResultToken(failToken);
      setStatus('result');
    }
  };

  const handleConnectWallet = async () => {
    console.log('Button clicked!');
    await connectWallet();
  };

  return (
    <div className={S.container}>
      {/* Navigation / Header */}
      <nav className={S.nav}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={S.logoSection}
        >
          <div className={S.logo}>
            <Cpu size={18} className={S.logoIcon} />
          </div>
          <span className={S.logoText}>MONAD</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={S.navLinks}
        >
          <button 
            type="button"
            className={isConnected ? S.walletButtonConnected : S.walletButton}
            onClick={handleConnectWallet}
          >
            {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
          </button>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className={S.main}>
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={S.idleContent}
            >
              <h1 className={S.title}>
                Analyze the <span className={S.highlightText}>Social</span> Graph
              </h1>

              {/* Central Input Bar */}
              <div className={S.inputWrapper} data-input-wrapper>
                <div
                  className={`${S.inputGlow} ${
                    isFocused ? S.inputGlowFocused : ''
                  }`}
                  data-input-glow
                />

                <div
                  className={`${S.inputContainer} ${
                    isFocused ? S.inputContainerFocused : ''
                  }`}
                >
                  <div className={S.inputIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      className={S.twitterIcon}
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste Tweet Link or Username"
                    className={S.input}
                  />
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className={S.analyzeButton}
                  >
                    Analyze <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={S.loadingContent}
            >
              <div className={S.spinner} />
            </motion.div>
          )}

          {status === 'result' && resultConfig && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={S.resultContent}
            >
              {!resultConfig.isFail ? (
                <>
                  <h2 className={S.resultTitle}>
                    Here's Your{' '}
                    <span style={{ color: resultConfig.color }}>
                      {resultConfig.name}
                    </span>
                  </h2>
                  <motion.img
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 1.5 }}
                    src={resultConfig.image}
                    alt={resultConfig.name}
                    className={S.resultImage}
                    style={{
                      filter: `drop-shadow(0 0 35px ${resultConfig.color}66)`,
                    }}
                    referrerPolicy="no-referrer"
                  />
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    style={{ fontSize: '8rem', fontWeight: 'bold', color: resultConfig.color, marginBottom: '2rem' }}
                  >
                    ⚠️
                  </motion.div>
                  <h2 className={S.resultTitle} style={{ color: resultConfig.color }}>
                    FAIL
                  </h2>
                  {resultToken && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        fontSize: '0.875rem',
                        color: resultConfig.color,
                        fontFamily: 'monospace',
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '0.5rem',
                        border: `1px solid ${resultConfig.color}`,
                      }}
                    >
                      Token: {abbreviateToken(resultToken)}<br />
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{resultToken}</span>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Bottom Info */}
      <footer className={S.footer}>
        <CryptoText text="Powered" />
        <CryptoText text="by" />
        <CryptoText text="Monad" />
        <CryptoText text="Network" />
        <span>&copy; 2026</span>
      </footer>
    </div>
  );
};

export default Home;