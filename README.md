# Xcoin ⚡

A Web3 application that generates dynamic token metadata through Twitter analysis. It analyzes users' Twitter accounts and creates unique token images and names based on tweet content.

![Monad Network](https://img.shields.io/badge/Monad-Network-836EF9?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)

## 🚀 Features

- **Twitter Analysis**: Analyze Twitter accounts by entering a username
- **AI-Powered Token Generation**: Detects the dominant topic from tweet content
- **Dynamic Visuals**: Unique token images for each analysis
- **Web3 Integration**: Wallet connection with MetaMask
- **Smooth Animations**: Fluid transitions and effects with Motion

## 🛠️ Technologies

- **Frontend**: React 19, TypeScript
- **Styling**: Vanilla Extract CSS
- **Animation**: Motion (Framer Motion)
- **Web3**: Ethers.js, Web3Modal
- **Build Tool**: Vite 7
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Production build
yarn build

# Build preview
yarn preview
```

## 🔧 Requirements

- Node.js 18+
- Yarn or npm
- MetaMask (for wallet connection)
- Backend API (localhost:3001)

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   └── CryptoText/   # Animated text effect
├── hooks/            # Custom React hooks
│   └── useWeb3.ts    # Web3 wallet management
├── pages/            # Page components
│   └── Home/         # Home page
├── styles/           # Global styles and theme
├── utils/            # Utility functions
│   ├── apiService.ts # Backend API service
│   ├── coinConfig.ts # Token configurations
│   └── tokenGenerator.ts
└── Router.tsx        # Application routing
```

## 🌐 API Integration

For backend, check:
https://github.com/erenster2000/monad-backend1

The application connects to a backend API running at `http://localhost:3001`:

```bash
POST /api/generate
Content-Type: application/json

{
  "twitterUsername": "username"
}
```

Returns token metadata (topic, image, description) as a response.

## 🎨 Usage

1. Connect your MetaMask wallet
2. Enter a Twitter username
3. Click the "Analyze" button
4. View your generated token

## 📄 License

This project is licensed under the MIT License - a permissive open-source license that allows for reuse with minimal restrictions. You are free to use, modify, and distribute this software for both commercial and non-commercial purposes.

---

Developed for **Monad Blitz Hackathon 2026** 🏆
