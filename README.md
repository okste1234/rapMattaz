# RapMattaz

RapMattaz is an innovative platform for on-chain rap battles, bringing artists and fans together in a decentralized and engaging way. Built on Warpcast (Farcaster frames) and the Base protocol, RapMattaz allows users to register as artists or fans, participate in live rap battles, and vote for their favorite artists.

<img src"https://github.com/okste1234/rapMattaz/blob/2d861a6d57deafa0f8aadcaeeaa3608e03ff31a0/RapMattaz.png" width="100%">

## Features

### User Management

- **Registration/Login**: Users can register through their Farcaster Account and/or use Custom ENS to log in using a decentralized identity (e.g., Wallet).
- **Profile Setup**: Users can set up/edit their App name/Artist name. Users can register as Rappers or Fans of popular/suggested artists or search for artist names to follow. Popular Artists/Record Label Artists are designated as Premium Artists.
- **Profiles**: Users have profiles showing their battles, wins/losses, and statistics. Levels are represented by NFTs (potentially upgradable). Fans can see performances and battle updates of the artists they follow.

### Content Management

- **Text and Audio Uploads**: Users can upload their rap verses in text and audio formats.
- **Storage**: Audio files are stored securely using decentralized storage solutions (e.g., IPFS).
- **Content Moderation**: Users can flag and report inappropriate content for moderation.

### Subscription

- **Billing Rate**: Users' billing rates determine the kind of battles they can participate in or follow. Premium levels can be unlocked by winning battles, spending tokens as a voter, or subscribing for Premium access.

### Battle Management

- **Challenge Creation**: Users can create challenges, specifying the opponent, battle rules, and staking NFTs.
- **Accepting Challenges**: Users can accept challenges and agree to the terms. Forfeiting acceptance multiple times can result in penalties.
- **Voting System**: A decentralized voting system allows users to vote for the winner.
- **Rewards Distribution**: Rewards are distributed based on the battle outcome, including upgrading NFTs and their point value.

## Smart Contracts

### NFT Contract

- **Artist and Fan Identification**: NFTs are used to identify user types and artist levels.

### ERC20 Token Contract

- **Voting**: Tokens are used for voting in rap battles.

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Base protocol
- **Storage**: IPFS
- **Identity**: Farcaster, ENS
- **Smart Contracts**: Solidity

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- MetaMask or any Ethereum-compatible wallet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/okste1234/rapmattaz.git
   cd rapmattaz
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

### Deployment

To deploy the smart contracts on the Base protocol, follow the instructions in the `contracts` directory.

## Contributing

We welcome contributions from the community. To contribute, please fork the repository and create a pull request.

### Bug Reports and Feature Requests

Please use the [Issues](https://github.com/okste1234/rapMattaz/issues) section to report bugs or request features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please reach out to us at [contact@rapmattaz.com](mailto:contact@rapmattaz.com).
