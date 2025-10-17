
import { useState, useCallback } from 'react';

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const setManualAddress = useCallback((address: string) => {
    if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
        setWalletAddress(address);
    } else {
        alert("Invalid wallet address format. Please enter a valid 42-character address starting with 0x.");
    }
  }, []);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    console.log("Simulating wallet connection...");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      const mockAddress = `0x${(Math.random().toString(16) + '00000000000000000').slice(2, 42)}`;
      setWalletAddress(mockAddress);
      console.log("Wallet connected:", mockAddress);
    } catch (error) {
      console.error("Failed to connect wallet", error);
      setWalletAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    console.log("Wallet disconnected");
  }, []);

  return { walletAddress, isConnecting, connectWallet, disconnectWallet, setManualAddress };
};
