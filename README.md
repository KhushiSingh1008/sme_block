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



- Order details stored off-chain on IPFS (immutable)
- Delivery verification uses cryptographic hashing (keccak256)
- Access control ensures only authorized parties can modify orders
- Secret key never stored on-chain, only its hash

