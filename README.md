# Heads or Tails Next/Hardhat Project

This repo is a fork of [SCM-Starter](https://github.com/MetacrafterChris/SCM-Starter) from MetaCrafters

## Mechanics
- Heads or Tails can be chosen and a transaction will double or half the balance when the guess is correct or wrong respectively.
- Staring Balance: 10 ETH
- Can only deposit 10 ETH at a time

## Setup
- Install dependencies with
  ```bash
  npm i
  ```
- Start a hardhat node on another terminal
  ```bash
  npx hardhat node
  ```
  Take note of the `address` that displays and the `private key` of `Account #0` when it is run
  > Started HTTP and WebSocket JSON-RPC server at `http://127.0.0.1:8545/`
  those will be used to setup Metamask
  
  > Private Key: `0x********************`
- Deploy the contract on another terminal
  ```bash
  npx hardhat run --network localhost scripts/deploy.js
  ```
- Start the website at http://localhost:3000
  ```bash
  npm run dev
  ```
- Install Metamask wallet and setup an account
  After setting up an account, add a new account by importing an account using the private key of `Account #0`
- Add a network manually
  On the settings page of the metamask extension, add a network manually and fill up the following fields

  `Network name`: (any)
  
  `New RPC URL`: http://127.0.0.1:8545/
  
  `Chain ID`: 31337
  
  `Currency symbol`: ETH or GO

> [!IMPORTANT]
> Make sure the imported account is selected in the Metamask extension when pressing the connect wallet button on the webstie

> [!NOTE]
> When getting a nonce error or an error when connecting the wallet or performing a transaction, try clearing the activity tab data in the metamask extension and refresh the website page,
> Metamask Extension > three dots on the top right > Settings > Advanced > Clear activity tab data
