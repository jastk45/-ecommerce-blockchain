# 🔗 Blockchain Developer Technical Test

## 🎯 Objetivos de la Prueba Técnica

Esta aplicación e-commerce ha sido extendida con funcionalidades blockchain para demostrar:

- ✅ **Conexión/Desconexión de Wallet** con MetaMask
- ✅ **UI Responsiva** que muestra la dirección del usuario cuando está conectado
- ✅ **Detección de Cambios de Red** automática
- ✅ **Estados de Transacción** (loading/pending/success/error)
- ✅ **Confirmaciones** antes de ejecutar acciones
- ✅ **Manejo de Errores** robusto

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 14+
- MetaMask instalado en el navegador

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/jastk45/-ecommerce-blockchain.git
cd ecommerce-blockchain
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
npm start
```

4. **Abrir en el navegador**
```bash
http://localhost:3000
```

## 🧪 Cómo Probar las Funcionalidades

### 1. Conexión de Wallet
- Ve a la navbar superior
- Haz clic en **"Connect Wallet"**
- Acepta la conexión en MetaMask
- Verifica que aparece tu dirección en el dropdown

### 2. Cambio de Red
- Cambia la red en MetaMask
- Observa que la UI detecta automáticamente el cambio
- La nueva red se muestra en el componente wallet

### 3. Transacción Demo
- Con wallet conectado, haz clic en **"Demo Transaction"**
- Confirma la acción en el prompt
- Observa los estados: Loading → Pending → Success/Error

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.2.0** - Framework principal
- **Redux Toolkit** - Manejo de estado global
- **Bootstrap 5** - UI y diseño responsivo
- **React Hot Toast** - Notificaciones

### Blockchain
- **ethers.js 5.4.6** - Interacción con blockchain
- **@metamask/detect-provider** - Detección de MetaMask
- **MetaMask** - Wallet integration

## 📁 Estructura del Código Blockchain

```
src/
├── components/
│   └── WalletConnect.jsx          # Componente principal de wallet
├── hooks/
│   └── useWalletSimple.js         # Hook personalizado para wallet
├── services/
│   └── walletService.js           # Servicio de blockchain
├── redux/
│   ├── action/walletActions.js    # Acciones Redux
│   └── reducer/walletReducer.js   # Reducer de wallet
└── components/Navbar.jsx          # Integración en navbar
```

## ⚙️ Características Técnicas

### Manejo de Estado
- **Redux Store** para estado global de wallet y transacciones
- **Persistencia** de conexión durante la sesión
- **Sincronización** automática con eventos de MetaMask

### Detección de Red
- Listeners para `chainChanged` y `accountsChanged`
- Actualización automática de UI
- Manejo de desconexiones

### UI/UX
- **Estados visuales** claros (conectado/desconectado)
- **Loading states** durante transacciones
- **Error handling** con mensajes descriptivos
- **Confirmaciones** antes de acciones críticas

### Seguridad
- Validación de conexión antes de transacciones
- Manejo seguro de errores de MetaMask
- No exposición de claves privadas

## 📋 Funcionalidades Implementadas

| Requisito | Estado | Descripción |
|-----------|--------|-------------|
| Conexión de Wallet | ✅ | Integración completa con MetaMask |
| Display de Dirección | ✅ | Muestra dirección en navbar cuando conectado |
| Detección de Red | ✅ | Detecta cambios de red automáticamente |
| Estados de Transacción | ✅ | Loading → Pending → Success/Error |
| Confirmaciones | ✅ | Prompts antes de ejecutar acciones |
| Manejo de Errores | ✅ | Errores descriptivos y recuperación |

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm start

# Build para producción
npm run build

# Ejecutar tests
npm test

# Análisis de bundle
npm run build && npx serve -s build
```

## 📖 Documentación Adicional

- **`BLOCKCHAIN_README.md`** - Documentación técnica detallada
- **`SUBMISSION_GUIDE.md`** - Guía completa de evaluación

## 👨‍💻 Desarrollado Por

**Jastk45** - Blockchain Developer Technical Test  
**Fecha**: Agosto 2025  
**Repositorio**: https://github.com/jastk45/-ecommerce-blockchain

---

### 🎯 Nota para Evaluadores

Esta implementación demuestra conocimientos sólidos en:
- Integración de wallets Web3
- Manejo de estado en aplicaciones React
- Arquitectura de servicios blockchain
- UX/UI para aplicaciones descentralizadas
- Manejo de errores y casos edge
