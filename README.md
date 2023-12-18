# ChianLinkPairConversion
A dApp that presents to the user 4 currency conversion pairs.

## Clientside Installations
Navigate to the clientside by typing the command - 
1. cd clientside
2. run npm install to install the dependencies
3. run npm start to run the application

## Smart Contract
1. Navigate to the root path
2. run npm install to install the dependencies
3. Add your Alchemy URL on the .env file
4. Run 'npx hardhat compile' to compile the smart contract
5. Run 'npx hardhat run scripts/deploy.js --network sepolia' to deploy to Alchemy Sepolia Testnet
4. Copy the contract address and add to the App.js on the clientside
