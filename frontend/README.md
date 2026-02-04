# Supply Chain Synthesizer - Frontend

Next.js application with Privy authentication and Pimlico gasless transactions for the Supply Chain Synthesizer.

## Features

- 🔐 **Privy Authentication**: Email, social, and wallet login with embedded wallet creation
- 💸 **Gasless Transactions**: Pimlico paymaster sponsors all gas fees
- ⚡ **Account Abstraction**: Smart contract wallets for better UX
- 📦 **Polygon Integration**: Fast, cheap blockchain transactions
- 🎨 **Modern UI**: Built with Next.js 14, TypeScript, and Tailwind CSS

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_PIMLICO_API_KEY=your_pimlico_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract address
```

#### Get API Keys:

- **Privy**: https://dashboard.privy.io/
  - Create a new app
  - Enable Polygon network
  - Enable embedded wallets
  - Copy your App ID

- **Pimlico**: https://dashboard.pimlico.io/
  - Create an account
  - Get API key for Polygon network
  - Make sure sponsorship is enabled

### 3. Deploy Smart Contract

First, deploy the `SupplyChainSynthesizer.sol` contract to Polygon:

```bash
# Use Hardhat, Foundry, or Remix to deploy
# Add the deployed address to .env.local
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Gasless Transaction Flow

1. **User Authentication**
   - User clicks "Connect Wallet"
   - Privy handles authentication (email, social, or wallet)
   - Embedded wallet created automatically if needed

2. **Order Creation**
   - User enters vendor address and IPFS hash
   - User sets a secret delivery key
   - Clicks "Approve Order"

3. **Smart Account Setup**
   - Privy wallet is wrapped in a smart contract account
   - Account abstraction enables gasless transactions

4. **Transaction Sponsorship**
   - Transaction sent to Pimlico bundler
   - Pimlico paymaster sponsors the gas fees
   - User pays nothing!

5. **On-Chain Execution**
   - `createOrder` function called on Polygon
   - Order data stored with IPFS hash reference
   - Transaction confirmed

### Code Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Providers
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Providers.tsx       # Privy & Wagmi providers
│   │   ├── LoginButton.tsx     # Authentication button
│   │   ├── ApproveOrderButton.tsx  # Main order approval component
│   │   └── OrderForm.tsx       # Order creation form
│   ├── hooks/
│   │   └── useSupplyChain.ts   # Contract interaction hook
│   ├── services/
│   │   └── pimlicoService.ts   # Pimlico integration
│   └── utils/
│       └── blockchain.ts       # Helper functions
├── package.json
├── next.config.js
└── tsconfig.json
```

## Key Components

### ApproveOrderButton

The main component that handles:
- User authentication check
- Secret key input
- Gasless transaction execution via Pimlico
- Success/error handling

### useSupplyChain Hook

Custom hook that provides:
- `createOrder()` - Create order with gasless transaction
- `acceptOrder()` - Vendor accepts order
- `verifyDelivery()` - Customer verifies delivery
- Loading and error states

### PimlicoService

Service class that:
- Creates smart account clients
- Wraps user wallets in account abstraction
- Sends user operations with paymaster sponsorship
- Handles transaction bundling

## Usage Example

```typescript
import { useSupplyChain } from '@/hooks/useSupplyChain';

function MyComponent() {
  const { createOrder, isLoading } = useSupplyChain();

  const handleCreateOrder = async () => {
    const txHash = await createOrder(
      '0xVendorAddress...',
      'QmIPFSHash...',
      'mySecretKey123'
    );
    console.log('Order created:', txHash);
  };

  return (
    <button onClick={handleCreateOrder} disabled={isLoading}>
      {isLoading ? 'Creating...' : 'Create Order'}
    </button>
  );
}
```

## Integration with Backend

The frontend integrates with the IPFS service:

1. Upload order details using the Node.js IPFS service
2. Get the IPFS hash (CID)
3. Use the hash in the frontend order form
4. Create the order on Polygon with the IPFS reference

## Production Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Environment Variables

Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_PRIVY_APP_ID`
- `NEXT_PUBLIC_PIMLICO_API_KEY`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`

## Troubleshooting

### "Missing Pimlico API key or contract address"

Make sure `.env.local` has all required variables set.

### "Privy authentication failed"

Check that your Privy App ID is correct and the app is configured for Polygon.

### "Transaction failed"

- Verify contract address is correct
- Check that Pimlico sponsorship is enabled
- Ensure wallet has proper permissions

## Security Notes

- Secret keys are hashed (keccak256) before storing on-chain
- Private keys never leave the user's device
- All transactions go through account abstraction for better security
- IPFS hashes are immutable references to off-chain data

## License

MIT
