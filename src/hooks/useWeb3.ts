import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWeb3 = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    console.log('Connect wallet clicked');
    console.log('Window.ethereum exists:', typeof window.ethereum !== 'undefined');
    
    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log('Requesting accounts from MetaMask...');
        
        // Önce disconnect et
        setAddress(null);
        setIsConnected(false);
        
        // Metamask'tan hesap iste - her zaman popup açar
        const accounts = await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        }).then(() => 
          window.ethereum.request({ method: 'eth_requestAccounts' })
        );
        
        console.log('Accounts received:', accounts);
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Wallet connection error:', error);
        if ((error as any).code === 4001) {
          console.log('User rejected the request');
        } else {
          alert('Bağlantı hatası: ' + (error as any).message);
        }
      }
    } else {
      console.log('MetaMask not found');
      alert('MetaMask yüklü değil! Lütfen MetaMask browser extension\'ını yükleyin.');
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  useEffect(() => {
    // Hesap değişikliklerini dinle
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress(null);
          setIsConnected(false);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    formatAddress,
  };
};

