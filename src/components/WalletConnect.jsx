import React, { useState } from 'react';
import { useWallet } from '../hooks/useWalletSimple';

const WalletConnect = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    isConnected,
    isConnecting,
    address,
    network,
    transaction,
    connectWallet,
    disconnect,
    mintNFT
  } = useWallet();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleMintDemo = () => {
    mintNFT('demo-simulation');
    setIsDropdownOpen(false);
  };

  const handleConnectClick = () => {
    connectWallet();
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isConnected || !address) {
    return (
      <div className="wallet-connect">
        <button
          className="btn btn-primary me-2"
          onClick={handleConnectClick}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Connecting...
            </>
          ) : (
            <>
              <i className="fa fa-wallet me-2"></i>
              Connect Wallet
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-connected position-relative">
      <div className="dropdown">
        <button
          className="btn btn-outline-success dropdown-toggle me-2"
          type="button"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <i className="fa fa-wallet me-2"></i>
          {formatAddress(address)}
        </button>
        
        {isDropdownOpen && (
          <ul className="dropdown-menu show" style={{position: 'absolute', top: '100%', left: '0', zIndex: 1000}}>
            <li className="dropdown-header">
              <strong>Wallet Info</strong>
            </li>
            <li>
              <span className="dropdown-item-text">
                <small>
                  <strong>Network:</strong><br />
                  {network}
                </small>
              </span>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button
                className="dropdown-item"
                onClick={handleMintDemo}
                disabled={transaction.isLoading || transaction.isPending}
              >
                {transaction.isLoading || transaction.isPending ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    {transaction.isLoading ? 'Confirm in wallet...' : 'Transaction pending...'}
                  </>
                ) : (
                  <>
                    <i className="fa fa-coins me-2"></i>
                    Test Transaction UI
                  </>
                )}
              </button>
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleDisconnect}>
                <i className="fa fa-sign-out-alt me-2"></i>
                Disconnect
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="position-fixed w-100 h-100"
          style={{top: 0, left: 0, zIndex: 999}}
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}

      {/* Transaction Status */}
      {transaction.successMessage && (
        <div className="position-absolute" style={{top: '100%', left: '0', zIndex: 1000}}>
          <div className="alert alert-success mt-2 small shadow" style={{minWidth: '200px'}}>
            <i className="fa fa-check-circle me-2"></i>
            UI Test Complete!
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
