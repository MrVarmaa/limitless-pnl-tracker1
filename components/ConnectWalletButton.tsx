
import React from 'react';
import { WalletIcon } from './icons/WalletIcon';

interface ConnectWalletButtonProps {
  onClick: () => void;
  isConnecting: boolean;
  walletAddress: string | null;
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onClick, isConnecting, walletAddress, fullWidth = false }) => {
  const buttonText = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : 'Connect Wallet';
  
  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={`flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-500 text-text-on-primary font-bold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${fullWidth ? 'w-full' : ''}`}
    >
      {isConnecting ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <WalletIcon className="mr-2" />
      )}
      <span>{isConnecting ? 'Connecting...' : buttonText}</span>
    </button>
  );
};

export default ConnectWalletButton;
