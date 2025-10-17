
import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';
import { StaticLogo } from './icons/AnimatedStar';

interface HeaderProps {
  walletAddress: string | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ walletAddress, isConnecting, onConnect, onDisconnect }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-surface-light bg-background sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <StaticLogo width="32" height="32" />
        <h1 className="text-xl font-bold text-text-primary">Limitless PnL Tracker</h1>
      </div>
      <ConnectWalletButton 
        onClick={walletAddress ? onDisconnect : onConnect} 
        isConnecting={isConnecting} 
        walletAddress={walletAddress} 
      />
    </header>
  );
};

export default Header;
