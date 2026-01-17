# 🎮 Web3 Gaming Platform

A full-stack Web3 gaming platform where users connect their wallet, play games, earn tokens, and trade virtual assets.

##  Features
- Wallet-based authentication (MetaMask)
- JWT-secured backend
- ERC20 reward token (PGT)
- On-chain reward distribution
- MongoDB user & game history
- Protected frontend routes

## Tech Stack
**Frontend**
- React (Vite)
- ethers.js v6
- Axios

**Backend**
- Node.js
- Express
- MongoDB Atlas
- JWT authentication

**Blockchain**
- Solidity
- Hardhat
- OpenZeppelin
- ERC20 tokenomics

## Project Structure
frontend/ → React app
backend/ → API & auth
contracts/ → Smart contracts

##  Setup (Local)

```bash
git clone https://github.com/YOUR_USERNAME/web3-gaming-platform.git

cd web3-gaming-platform
**Backend**
bash
cd backend
npm install
node index.js

**Frontend**
bash
cd frontend
npm install
npm run dev

**Contracts**
cd contracts
npm install
npx hardhat compile

👤 Author
Pradeep Kumar