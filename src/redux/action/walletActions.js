// Wallet Action Types
export const WALLET_CONNECT_REQUEST = 'WALLET_CONNECT_REQUEST';
export const WALLET_CONNECT_SUCCESS = 'WALLET_CONNECT_SUCCESS';
export const WALLET_CONNECT_FAILURE = 'WALLET_CONNECT_FAILURE';
export const WALLET_DISCONNECT = 'WALLET_DISCONNECT';
export const WALLET_NETWORK_CHANGE = 'WALLET_NETWORK_CHANGE';
export const TRANSACTION_START = 'TRANSACTION_START';
export const TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
export const TRANSACTION_FAILURE = 'TRANSACTION_FAILURE';
export const TRANSACTION_PENDING = 'TRANSACTION_PENDING';

// Action Creators
export const connectWalletRequest = () => ({
  type: WALLET_CONNECT_REQUEST
});

export const connectWalletSuccess = (address, network, balance) => ({
  type: WALLET_CONNECT_SUCCESS,
  payload: { address, network, balance }
});

export const connectWalletFailure = (error) => ({
  type: WALLET_CONNECT_FAILURE,
  payload: error
});

export const disconnectWallet = () => ({
  type: WALLET_DISCONNECT
});

export const networkChange = (network) => ({
  type: WALLET_NETWORK_CHANGE,
  payload: network
});

export const transactionStart = (txType) => ({
  type: TRANSACTION_START,
  payload: txType
});

export const transactionSuccess = (txHash, message) => ({
  type: TRANSACTION_SUCCESS,
  payload: { txHash, message }
});

export const transactionFailure = (error) => ({
  type: TRANSACTION_FAILURE,
  payload: error
});

export const transactionPending = (txHash) => ({
  type: TRANSACTION_PENDING,
  payload: txHash
});
