# Supply Chain Synthesizer

A blockchain-based supply chain management system using Polygon and IPFS.

## Features

- **Smart Contract**: Solidity contract on Polygon for order management
- **IPFS Integration**: Decentralized storage for order details using Pinata
- **Order Lifecycle**: Create → Accept → Verify with cryptographic validation

## Project Structure

```
sme_block/
├── contracts/
│   └── SupplyChainSynthesizer.sol  # Polygon smart contract
├── services/
│   └── ipfsService.js              # IPFS/Pinata integration
├── index.js                         # Example usage
├── package.json                     # Dependencies
└── .env.example                     # Environment variables template
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Get your Pinata JWT token from: https://app.pinata.cloud/developers/api-keys

### 3. Run the IPFS Service

```bash
npm start
```

## Usage

### Upload Order to IPFS

```javascript
const ipfsService = require('./services/ipfsService');

await ipfsService.initialize();

const orderData = {
    customerId: '0x1234...',
    vendorId: '0xabcd...',
    productDetails: 'Premium Widget Set',
    quantity: 100,
    price: 5000,
    deliveryAddress: '123 Supply Chain Ave',
    timestamp: Date.now()
};

const ipfsHash = await ipfsService.uploadOrderDetails(orderData);
console.log('IPFS Hash:', ipfsHash);
```

### Create Order on Polygon

Use the returned IPFS hash with the smart contract:

```solidity
// In your Web3 integration
const deliveryHash = web3.utils.keccak256(secretKey);
await contract.createOrder(vendorAddress, ipfsHash, deliveryHash);
```

## Smart Contract Functions

### `createOrder(vendor, ipfsHash, deliveryHash)`
Customer creates a new order with encrypted delivery verification.

### `acceptOrder(orderId)`
Vendor accepts the order (status: 0 → 1).

### `verifyDelivery(orderId, secretKey)`
Customer verifies delivery with secret key (status: 1 → 2).

## Order Status

- `0` - Created: Order initiated by customer
- `1` - Accepted: Vendor has accepted the order
- `2` - Verified: Customer has verified delivery

## Security

- Order details stored off-chain on IPFS (immutable)
- Delivery verification uses cryptographic hashing (keccak256)
- Access control ensures only authorized parties can modify orders
- Secret key never stored on-chain, only its hash

## License

MIT
