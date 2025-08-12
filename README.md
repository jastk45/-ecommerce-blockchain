# 🔗 Blockchain Developer Technical Test

## 🎯 Technical Test Objectives

This e-commerce application has been extended with blockchain functionalities to demonstrate:

- ✅ **Wallet Connection/Disconnection** with MetaMask
- ✅ **Responsive UI** that displays user address when connected
- ✅ **Automatic Network Change Detection**
- ✅ **Transaction States** (loading/pending/success/error)
- ✅ **User Action Confirmations**
- ✅ **Robust Error Handling**

## 🚀 Installation and Setup

### Prerequisites
- Node.js 14+
- MetaMask installed in browser

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/jastk45/-ecommerce-blockchain.git
cd ecommerce-blockchain
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

4. **Open in browser**
```bash
http://localhost:3000
```

## 🧪 How to Test the Features

### 1. Wallet Connection
- Go to the top navbar
- Click on **"Connect Wallet"**
- Accept the connection in MetaMask
- Verify that your address appears in the dropdown

### 2. Network Change
- Change the network in MetaMask
- Observe that the UI automatically detects the change
- The new network is displayed in the wallet component

### 3. Demo Transaction
- With wallet connected, click on **"Demo Transaction"**
- Confirm the action in the prompt
- Observe the states: Loading → Pending → Success/Error

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Main framework
- **Redux Toolkit** - Global state management
- **Bootstrap 5** - UI and responsive design
- **React Hot Toast** - Notifications

### Blockchain
- **ethers.js 5.4.6** - Blockchain interaction
- **@metamask/detect-provider** - MetaMask detection
- **MetaMask** - Wallet integration

## 📁 Blockchain Code Structure

```
src/
├── components/
│   └── WalletConnect.jsx          # Main wallet component
├── hooks/
│   └── useWalletSimple.js         # Custom wallet hook
├── services/
│   └── walletService.js           # Blockchain service
├── redux/
│   ├── action/walletActions.js    # Redux actions
│   └── reducer/walletReducer.js   # Wallet reducer
└── components/Navbar.jsx          # Navbar integration
```

## ⚙️ Technical Features

### State Management
- **Redux Store** for global wallet and transaction state
- **Session persistence** of connection
- **Automatic synchronization** with MetaMask events

### Network Detection
- Listeners for `chainChanged` and `accountsChanged`
- Automatic UI updates
- Disconnection handling

### UI/UX
- **Clear visual states** (connected/disconnected)
- **Loading states** during transactions
- **Error handling** with descriptive messages
- **Confirmations** before critical actions

### Security
- Connection validation before transactions
- Secure handling of MetaMask errors
- No private key exposure

## 📋 Implemented Features

| Requirement | Status | Description |
|-------------|--------|-------------|
| Wallet Connection | ✅ | Complete MetaMask integration |
| Address Display | ✅ | Shows address in navbar when connected |
| Network Detection | ✅ | Automatically detects network changes |
| Transaction States | ✅ | Loading → Pending → Success/Error |
| Confirmations | ✅ | Prompts before executing actions |
| Error Handling | ✅ | Descriptive errors and recovery |

## 🔧 Available Commands

```bash
# Development
npm start

# Production build
npm run build

# Run tests
npm test

# Bundle analysis
npm run build && npx serve -s build
```

