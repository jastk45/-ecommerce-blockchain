import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectWalletRequest,
  connectWalletSuccess,
  connectWalletFailure,
  disconnectWallet,
  networkChange,
  transactionStart,
  transactionSuccess,
  transactionFailure,
  transactionPending
} from '../redux/action/walletActions';
import walletService from '../services/walletService';
import toast from 'react-hot-toast';

export const useWallet = () => {
  const dispatch = useDispatch();
  const walletState = useSelector(state => state.wallet);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      dispatch(connectWalletRequest());
      
      if (!walletService.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const walletData = await walletService.connectWallet();
      
      dispatch(connectWalletSuccess(
        walletData.address,
        walletData.network,
        walletData.balance
      ));

      toast.success('Wallet connected successfully!');
      
    } catch (error) {
      let errorMessage = error.message;
      
      if (error.code === 4001) {
        errorMessage = 'Connection rejected by user';
      } else if (error.code === -32002) {
        errorMessage = 'Connection request already pending';
      }
      
      dispatch(connectWalletFailure(errorMessage));
      toast.error(errorMessage);
    }
  }, [dispatch]);

  // Disconnect wallet function
  const disconnect = useCallback(() => {
    walletService.removeListeners();
    dispatch(disconnectWallet());
    toast.success('Wallet disconnected');
  }, [dispatch]);

  // Simulate transaction (demo for UI testing only)
  const mintNFT = useCallback(async (tokenURI) => {
    try {
      dispatch(transactionStart('simulation'));
      toast.loading('Confirm transaction in your wallet...', { id: 'demo-tx' });

      const tx = await walletService.mintNFT(tokenURI);
      
      dispatch(transactionPending(tx.hash));
      toast.loading('Transaction pending...', { id: 'demo-tx' });

      const receipt = await tx.wait();
      
      dispatch(transactionSuccess(receipt.transactionHash, 'Transaction Simulated Successfully!'));
      toast.success('Success! 🎉', { id: 'demo-tx' });

    } catch (error) {
      dispatch(transactionFailure(error.message));
      toast.error(`Simulation failed: ${error.message}`, { id: 'demo-tx' });
    }
  }, [dispatch]);

  // Setup event listeners for network changes
  useEffect(() => {
    if (walletState.isConnected) {
      // Listen for network changes
      walletService.onChainChanged((chainId) => {
        const networkName = walletService.getNetworkName(chainId);
        dispatch(networkChange(networkName));
        toast.success(`Network changed to ${networkName}`);
      });

      // Listen for account changes
      walletService.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          disconnect();
        }
      });
    }

    return () => {
      walletService.removeListeners();
    };
  }, [walletState.isConnected, disconnect, dispatch]);

  return {
    ...walletState,
    connectWallet,
    disconnect,
    mintNFT
  };
};
