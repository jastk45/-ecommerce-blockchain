import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

// Network configurations
const NETWORKS = {
  '0x1': { name: 'Ethereum Mainnet', chainId: 1 },
  '0x89': { name: 'Polygon Mainnet', chainId: 137 },
  '0x38': { name: 'BSC Mainnet', chainId: 56 },
  '0x5': { name: 'Goerli Testnet', chainId: 5 },
  '0x13881': { name: 'Mumbai Testnet', chainId: 80001 }
};

class WalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.web3Provider = null;
  }

  // Initialize provider
  async initProvider() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.web3Provider = new ethers.providers.Web3Provider(this.provider);
      return true;
    }
    return false;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  // Connect wallet
  async connectWallet() {
    try {
      if (!this.provider) {
        const providerInitialized = await this.initProvider();
        if (!providerInitialized) {
          throw new Error('MetaMask not found. Please install MetaMask.');
        }
      }

      // Request account access
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      // Get network info
      const chainId = await this.provider.request({
        method: 'eth_chainId',
      });

      // Get balance
      const balance = await this.getBalance(accounts[0]);

      this.signer = this.web3Provider.getSigner();

      return {
        address: accounts[0],
        network: this.getNetworkName(chainId),
        balance: balance,
        chainId: chainId
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // Re-throw with better error messages
      if (error.code === 4001) {
        const rejectionError = new Error('User rejected the connection request');
        rejectionError.code = 4001;
        throw rejectionError;
      } else if (error.code === -32002) {
        const pendingError = new Error('Connection request already pending in MetaMask');
        pendingError.code = -32002;
        throw pendingError;
      }
      
      throw error;
    }
  }

  // Get account balance
  async getBalance(address) {
    try {
      if (!this.web3Provider) {
        await this.initProvider();
      }
      const balance = await this.web3Provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  // Get network name from chain ID
  getNetworkName(chainId) {
    return NETWORKS[chainId]?.name || `Unknown Network (${chainId})`;
  }

  // Listen for account changes
  onAccountsChanged(callback) {
    if (this.provider) {
      this.provider.on('accountsChanged', callback);
    }
  }

  // Listen for network changes
  onChainChanged(callback) {
    if (this.provider) {
      this.provider.on('chainChanged', callback);
    }
  }

  // Remove listeners
  removeListeners() {
    if (this.provider) {
      console.log('Removing wallet event listeners...');
      this.provider.removeAllListeners('accountsChanged');
      this.provider.removeAllListeners('chainChanged');
    }
  }

  // Simulate a transaction (for demo purposes only - no real transaction)
  async mintNFT(tokenURI) {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      // Simulate transaction delay without actually sending anything
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return a mock transaction object
      const mockTx = {
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        wait: async () => {
          // Simulate mining delay
          await new Promise(resolve => setTimeout(resolve, 3000));
          return {
            transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
            status: 1
          };
        }
      };

      return mockTx;
    } catch (error) {
      console.error('Error in demo transaction:', error);
      throw error;
    }
  }

  // Switch network
  async switchNetwork(chainId) {
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }
}

const walletServiceInstance = new WalletService();
export default walletServiceInstance;
