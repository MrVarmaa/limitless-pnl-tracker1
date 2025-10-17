
import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ConnectWalletButton from './components/ConnectWalletButton';

const App: React.FC = () => {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet, setManualAddress } = useWallet();
  const [addressInput, setAddressInput] = useState('');

  const handleTrackWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput) {
      setManualAddress(addressInput);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        walletAddress={walletAddress} 
        onDisconnect={disconnectWallet}
        onConnect={connectWallet}
        isConnecting={isConnecting}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {walletAddress ? (
          <Dashboard walletAddress={walletAddress} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
              Limitless PnL Tracker
            </h1>
            <p className="text-text-secondary mb-8 max-w-md">
              Get a live, on-chain analysis of your prediction market performance on Base.
            </p>
            <div className="space-y-4 w-full max-w-sm">
              <ConnectWalletButton 
                onClick={connectWallet}
                isConnecting={isConnecting}
                walletAddress={null}
                fullWidth={true}
              />
              <div className="flex items-center text-text-secondary">
                <hr className="w-full border-surface-light"/>
                <span className="px-2 text-sm">OR</span>
                <hr className="w-full border-surface-light"/>
              </div>
              <form onSubmit={handleTrackWallet} className="flex space-x-2">
                <input 
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Paste wallet address..."
                  className="flex-grow bg-surface border border-surface-light rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-surface-light hover:bg-surface text-text-primary font-semibold rounded-lg transition-colors duration-200"
                >
                  Track
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
