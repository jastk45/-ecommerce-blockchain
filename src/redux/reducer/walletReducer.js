import {
  WALLET_CONNECT_REQUEST,
  WALLET_CONNECT_SUCCESS,
  WALLET_CONNECT_FAILURE,
  WALLET_DISCONNECT,
  WALLET_NETWORK_CHANGE,
  TRANSACTION_START,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE,
  TRANSACTION_PENDING
} from '../action/walletActions';

const initialState = {
  isConnected: false,
  isConnecting: false,
  address: null,
  network: null,
  balance: '0',
  error: null,
  transaction: {
    isLoading: false,
    isPending: false,
    hash: null,
    type: null,
    error: null,
    successMessage: null
  }
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_CONNECT_REQUEST:
      return {
        ...state,
        isConnecting: true,
        error: null
      };

    case WALLET_CONNECT_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        address: action.payload.address,
        network: action.payload.network,
        balance: action.payload.balance,
        error: null
      };

    case WALLET_CONNECT_FAILURE:
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        error: action.payload
      };

    case WALLET_DISCONNECT:
      return {
        ...initialState,
        // Ensure complete reset
        isConnected: false,
        isConnecting: false,
        address: null,
        network: null,
        balance: '0',
        error: null,
        transaction: {
          isLoading: false,
          isPending: false,
          hash: null,
          type: null,
          error: null,
          successMessage: null
        }
      };

    case WALLET_NETWORK_CHANGE:
      return {
        ...state,
        network: action.payload
      };

    case TRANSACTION_START:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isLoading: true,
          isPending: false,
          type: action.payload,
          error: null,
          successMessage: null
        }
      };

    case TRANSACTION_PENDING:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isLoading: false,
          isPending: true,
          hash: action.payload
        }
      };

    case TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isLoading: false,
          isPending: false,
          hash: action.payload.txHash,
          successMessage: action.payload.message,
          error: null
        }
      };

    case TRANSACTION_FAILURE:
      return {
        ...state,
        transaction: {
          ...state.transaction,
          isLoading: false,
          isPending: false,
          error: action.payload,
          successMessage: null
        }
      };

    default:
      return state;
  }
};

export default walletReducer;
