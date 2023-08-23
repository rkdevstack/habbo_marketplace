# NFT Marketplace Assignment

This repository contains the code for an NFT marketplace built on Ethereum. The solution is divided into two main parts: the smart contracts that run on the Ethereum blockchain and the frontend that interacts with these contracts.

## Smart Contracts

The smart contracts were written in Solidity and are responsible for the core logic of minting NFTs, listing them for sale, and handling the purchase transactions. The contracts used in this project are:

1. **NFTs**: This contract handles the creation (minting) of NFTs.
   - Contract Address: `0x3dE9398666516F733A4c92Fd41181E66f9aCBda1`
   - [Etherscan](https://goerli.etherscan.io/address/0x3dE9398666516F733A4c92Fd41181E66f9aCBda1#code)
   - [Sourcify](https://sourcify.dev/#/lookup/0x3dE9398666516F733A4c92Fd41181E66f9aCBda1)
   
2. **NFT Marketplace**: This contract manages the buying and selling of NFTs. It keeps track of which NFTs are currently listed for sale and at what price.
   - Contract Address: `0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8`
   - [Etherscan](https://goerli.etherscan.io/address/0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8#code)
   
3. **TOKEN (NFTcr)**: This is the ERC20 token used as the currency for purchasing NFTs in the marketplace.
   - Contract Address: `0x60db42eCec7C01415260CeC88eB2c07b101b6EcC`
   - [Etherscan](https://goerli.etherscan.io/address/0x60db42eCec7C01415260CeC88eB2c07b101b6EcC#code)
   - [Sourcify](https://sourcify.dev/#/lookup/0x60db42eCec7C01415260CeC88eB2c07b101b6EcC)

## Deployment

The smart contracts were deployed to the Ethereum blockchain using Truffle:


### Deployment Logs

Compiling your contracts...
===========================
- Everything is up to date, there is nothing to compile.

Starting migrations...
======================
- Network name:    'goerli'
- Network id:      5
- Block gas limit: 30000000 (0x1c9c380)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   - transaction hash:    0x3ea735c02e794f3f9261e0e03d45e97beb136d31d5b5daf71a7512f35859ad52
   - Blocks: 1            Seconds: 8
   - contract address:    0xDAD9dbF8c389002cf8c4B4DB0d6Dbb96bFF2FAD3
   - block number:        9565811
   - block timestamp:     1692772404
   - account:             0xCC0E8040007789aE5AbE46Ba7142D8667B89E396
   - balance:             9.943156386596511759
   - gas used:            245697 (0x3bfc1)
   - gas price:           2.500000011 gwei
   - value sent:          0 ETH
   - total cost:          0.000614242502702667 ETH

   Pausing for 2 confirmations...

   -------------------------------
   - confirmation number: 1 (block: 9565812)
   - confirmation number: 2 (block: 9565813)
   - Saving migration to chain.
   - Saving artifacts
   -------------------------------------
   - Total cost:     0.000614242502702667 ETH


2_deploy_contracts.js
=====================

   Deploying 'NFTs'
   ----------------
   - transaction hash:    0x7603a32c7bc3c73579d49105b9dfa2821e756903ae5ec501fbc97f0cb71671c2
   - Blocks: 0            Seconds: 4
   - contract address:    0x3dE9398666516F733A4c92Fd41181E66f9aCBda1
   - block number:        9565815
   - block timestamp:     1692772452
   - account:             0xCC0E8040007789aE5AbE46Ba7142D8667B89E396
   - balance:             9.936354531569304339
   - gas used:            2674835 (0x28d093)
   - gas price:           2.50000001 gwei
   - value sent:          0 ETH
   - total cost:          0.00668708752674835 ETH

   Pausing for 2 confirmations...

   -------------------------------
   - confirmation number: 1 (block: 9565816)
   - confirmation number: 2 (block: 9565817)

   Deploying 'NFTcr'
   -----------------
   - transaction hash:    0x6537bbbba68bb56236b167ca1cdb59737bf1a3c866c18260563e28585d48031f
   - Blocks: 1            Seconds: 8
   - contract address:    0x60db42eCec7C01415260CeC88eB2c07b101b6EcC
   - block number:        9565818
   - block timestamp:     1692772500
   - account:             0xCC0E8040007789aE5AbE46Ba7142D8667B89E396
   - balance:             9.933480321557807499
   - gas used:            1149684 (0x118af4)
   - gas price:           2.50000001 gwei
   - value sent:          0 ETH
   - total cost:          0.00287421001149684 ETH

   Pausing for 2 confirmations...

   -------------------------------
   - confirmation number: 1 (block: 9565819)
   - confirmation number: 2 (block: 9565820)

 Replacing 'Marketplace'
   -----------------------
   - transaction hash:    0x08db2310a0a304009f756e97478f1bf5849794330c8c11a4f59b53a86eae650a
   - Blocks: 0            Seconds: 4
   - contract address:    0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8
   - block number:        9566361
   - block timestamp:     1692781044
   - account:             0xCC0E8040007789aE5AbE46Ba7142D8667B89E396
   - balance:             9.926861897019572122
   - gas used:            825833 (0xc99e9)
   - gas price:           2.500000015 gwei
   - value sent:          0 ETH
   - total cost:          0.002064582512387495 ETH

   Pausing for 2 confirmations...

   -------------------------------
   - confirmation number: 1 (block: 9566362)
   - confirmation number: 2 (block: 9566363)
   - Saving migration to chain.
   - Saving artifacts
   -------------------------------------
   - Total cost:     0.002064582512387495 ETH



Summary
=======
- Total deployments:   4
- Final cost:          0.012240122549206187 ETH

##Smart contract Verification Logs
-------------------------------------
###Verifying Migrations
-------------------------------------

- Verified: https://goerli.etherscan.io/address/0xDAD9dbF8c389002cf8c4B4DB0d6Dbb96bFF2FAD3#code
- Successfully verified 1 contract(s).
- Verifying contracts on sourcify


-------------------------------------
### NFTs
-------------------------------------
- Verifying NFTs
- Already Verified: https://goerli.etherscan.io/address/0x3dE9398666516F733A4c92Fd41181E66f9aCBda1#code
- Successfully verified 1 contract(s).


-------------------------------------
### NFTcr
-------------------------------------
- Verifying NFTcr
- Verified: https://goerli.etherscan.io/address/0x60db42eCec7C01415260CeC88eB2c07b101b6EcC#code
- Successfully verified 1 contract(s).


-------------------------------------
### Marketplace
-------------------------------------
- Verifying Marketplace
- Already Verified: https://goerli.etherscan.io/address/0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8#code
- Successfully verified 1 contract(s).
