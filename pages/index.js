import Head from 'next/head'

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import Layout from '../components/Layout';
import NFTsForSaleList from '../components/NFTsForSaleList';
const fetch = require('node-fetch');

export default function Home() {
  const [tokenURI, setTokenURI] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [nfts, setNFTs] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [image, setImage] = useState('');
  const [salePrice, setSalePrice] = useState("");
  const [listedNFTsForSale, setListedNFTsForSale] = useState([]);
  const [activeTab, setActiveTab] = useState('balance');

  useEffect(() => {
    fetchMintedNFTs();  // Fetch minted NFTs when the component mounts
    fetchAllMarketListedNFTs();
    fetchListedNFTsForSale();

    ; async function fetchTokenBalance() {
      const provider = await detectEthereumProvider();
      if (!provider) return;

      const signer = new ethers.providers.Web3Provider(provider).getSigner();
      const contractAddress = '0x60db42eCec7C01415260CeC88eB2c07b101b6EcC';
      const contractABI = require('../build/contracts/NFTcr.json'); // YOUR_NFTCR_CONTRACT_ABI_HERE
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      const balance = await contract.balanceOf(signer.getAddress());
      setTokenBalance(ethers.utils.formatEther(balance));
    }

    fetchTokenBalance();
  }, []);

  async function uploadToIPFS(file) {
    const PINATA_API_KEY = '643e567988fe710daba8';
    const PINATA_SECRET_KEY = 'eb514eb36a52e3c4150d4372966ee0b7944f2b71ceb7ba86804481a99d0896a0';

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload to Pinata: ' + response.statusText);
    }

    const data = await response.json();
    return data.IpfsHash;
  }


  async function handleImageUpload(e) {
    const file = e.target.files[0];
    const imageCID = await uploadToIPFS(file);
    const imageUrl = `https://ipfs.io/ipfs/${imageCID}`;
    setImage(imageUrl);
  }

  async function mintWithMetadata(name, description) {
    console.log("Minting started...");

    const metadata = {
      name: name,
      description: description,
      image: image
    };

    const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    console.log("Metadata blob created:", blob);

    const metadataCID = await uploadToIPFS(blob);
    console.log("Uploaded metadata to IPFS:", metadataCID);

    const metadataUrl = `https://ipfs.io/ipfs/${metadataCID}`;
    console.log("Metadata URL:", metadataUrl);
    setTokenURI(metadataUrl);
    console.log("TokenURI state updated");
    // Connecting to MetaMask
    const provider = await detectEthereumProvider();
    if (!provider) {
      alert('Please install MetaMask!');
      return;
    }
    await provider.request({ method: 'eth_requestAccounts' });

    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const contractAddress = '0x3dE9398666516F733A4c92Fd41181E66f9aCBda1'; // Your NFTs contract address
    const contractABI = require('../build/contracts/NFTs.json'); // YOUR_NFT_CONTRACT_ABI_HERE
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    try {
      // Call the minting function of your smart contract
      const tx = await contract.mint(signer.getAddress(), metadataUrl);
      await tx.wait();
      alert('Successfully minted the NFT!');
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  }
  //fetchallnfts
  async function fetchAllMarketListedNFTs() {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();

    // Marketplace contract details
    const marketplaceAddress = '0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8';
    const marketplaceABI = require('../build/contracts/Marketplace.json');
    const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI.abi, signer);

    // NFTs contract details
    const nftContractAddress = '0x3dE9398666516F733A4c92Fd41181E66f9aCBda1';
    const nftContractABI = require('../build/contracts/NFTs.json');
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI.abi, signer);

    // Assuming you have an event named NFTListed in your Marketplace contract
    const filter = marketplaceContract.filters.NFTListed();
    const logs = await signer.provider.getLogs({
      fromBlock: 0,
      toBlock: 'latest',
      address: marketplaceAddress,
      topics: filter.topics
    });

    const listedNFTs = [];

    for (const log of logs) {
      const decoded = marketplaceContract.interface.parseLog(log);
      const tokenId = decoded.args.tokenId;
      const seller = decoded.args.seller;
      const price = ethers.utils.formatEther(decoded.args.price);

      // Fetching metadata for the listed NFT
      const tokenURI = await nftContract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      listedNFTs.push({
        tokenId: tokenId.toString(),
        seller,
        price,
        uri: tokenURI,
        image: metadata.image,
        name: metadata.name,
        description: metadata.description
      });
    }

    setListedNFTsForSale(listedNFTs);  // Assuming you have a state setter called setListedNFTsForSale

  }


  //Fetch Minted NFTs
  async function fetchMintedNFTs() {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const userAddress = await signer.getAddress();

    const contractAddress = '0x3dE9398666516F733A4c92Fd41181E66f9aCBda1'; // Your NFTs contract address
    const contractABI = require('../build/contracts/NFTs.json'); // YOUR_NFT_CONTRACT_ABI_HERE
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    const balance = await contract.balanceOf(userAddress);
    const nfts = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
      const tokenURI = await contract.tokenURI(tokenId);

      // Fetch the metadata from the tokenURI
      const response = await fetch(tokenURI);

      if (!response.ok) {
        console.error(`Failed to fetch metadata for token ${tokenId} from ${tokenURI}. HTTP Status: ${response.status}`);
        continue;  // skip this iteration and move to the next NFT
      }

      const responseBody = await response.text();  // get the response as text first

      try {
        const metadata = JSON.parse(responseBody);
        nfts.push({
          id: tokenId.toString(),
          uri: tokenURI,
          image: metadata.image,
          name: metadata.name,
          description: metadata.description
        });
      } catch (err) {
        console.error(`Failed to parse metadata for token ${tokenId} from ${tokenURI}. Response:`, responseBody);
      }
    }

    setNFTs(nfts);
  }
//List NFT For Sale Items
  async function listNFTForSale(tokenId, price) {
    fetchListedNFTsForSale();

    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();

    // First, approve the marketplace to manage the NFT on your behalf.
    const nftContractAddress = '0x3dE9398666516F733A4c92Fd41181E66f9aCBda1'; // Your NFTs contract address
    const nftContractABI = require('../build/contracts/NFTs.json'); // YOUR_NFT_CONTRACT_ABI_HERE
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI.abi, signer);
    const marketplaceContractA = '0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8';  // Address of the marketplace contract

    try {
      const approvalTx = await nftContract.approve(marketplaceContractA, tokenId);
      await approvalTx.wait();
      console.log('Successfully approved the marketplace to manage the NFT.');
    } catch (error) {
      console.error('Error approving marketplace:', error);
      return;
    }

    // Then, list the NFT for sale.
    const marketplaceContractAddress = '0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8';
    const marketplaceContractABI = require('../build/contracts/Marketplace.json'); // YOUR_MARKETPLACE_CONTRACT_ABI_HERE
    const marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceContractABI.abi, signer);

    try {
      const listingTx = await marketplaceContract.listNFT(tokenId, ethers.utils.parseEther(price));
      await listingTx.wait();
      alert('Successfully listed the NFT for sale!');
      setNftPrice('');
      fetchMintedNFTs();
      fetchListedNFTsForSale();  // assuming you'll create a function for this

    } catch (error) {
      console.error('Error listing NFT:', error);
    }
  }
//NFT Buying
  async function buyNFT(tokenId) {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();

    // Marketplace contract details
    const marketplaceAddress = '0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8';
    const marketplaceABI = require('../build/contracts/Marketplace.json');
    const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI.abi, signer);

    // NFTcr contract details
    const creditAddress = '0x60db42eCec7C01415260CeC88eB2c07b101b6EcC'; // REPLACE with the actual address
    const creditABI = require('../build/contracts/NFTcr.json');
    const creditContract = new ethers.Contract(creditAddress, creditABI.abi, signer);

    try {
      // Fetch all the NFTListed events
      const filter = marketplaceContract.filters.NFTListed();
      const logs = await signer.provider.getLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: marketplaceAddress,
        topics: filter.topics
      });

      // Filter logs for the specific tokenId
      const log = logs.find(log => {
        const decoded = marketplaceContract.interface.parseLog(log);
        return decoded.args.tokenId.eq(tokenId);
      });

      if (!log) {
        console.error(`No listing found for token ID ${tokenId}`);
        return;
      }

      const decoded = marketplaceContract.interface.parseLog(log);
      const price = ethers.utils.formatEther(decoded.args.price);

      // Approve the Marketplace contract to spend NFTcr tokens
      const amountToApprove = ethers.utils.parseEther(price);
      const approveTx = await creditContract.approve(marketplaceAddress, amountToApprove);
      await approveTx.wait();

      // Call the buy function on your marketplace contract
      const tx = await marketplaceContract.buyNFT(tokenId);
      await tx.wait();
      alert('Successfully bought the NFT!');
      setListedNFTsForSale(prevNFTs => prevNFTs.filter(nft => nft.tokenId !== tokenId.toString()));

    } catch (error) {
      console.error('Error buying NFT:', error);
    }
  }
//Fetch All Listed NFTs
  async function fetchListedNFTsForSale() {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();

    // Marketplace contract details
    const marketplaceAddress = '0xd9F0E687df5889A6B4A37d8Ed226dC8fe13C4cD8';
    const marketplaceABI = require('../build/contracts/Marketplace.json');
    const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI.abi, signer);

    // NFTs contract details
    const nftContractAddress = '0x3dE9398666516F733A4c92Fd41181E66f9aCBda1';
    const nftContractABI = require('../build/contracts/NFTs.json');
    const nftContract = new ethers.Contract(nftContractAddress, nftContractABI.abi, signer);

    // Fetch the NFTListed events
    const filter = marketplaceContract.filters.NFTListed();
    const logs = await signer.provider.getLogs({
      fromBlock: 0,
      toBlock: 'latest',
      address: marketplaceAddress,
      topics: filter.topics
    });

    const listedNFTs = [];

    for (const log of logs) {
      const decoded = marketplaceContract.interface.parseLog(log);
      const tokenId = decoded.args.tokenId;
      const seller = decoded.args.seller;
      const price = ethers.utils.formatEther(decoded.args.price);

      // Fetch metadata for the listed NFT
      const tokenURI = await nftContract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      listedNFTs.push({
        tokenId: tokenId.toString(),
        seller,
        price,
        uri: tokenURI,
        image: metadata.image,
        name: metadata.name,
        description: metadata.description
      });
    }
    const validListings = listedNFTs.filter(nft => parseFloat(nft.price) > 0);
    setListedNFTsForSale(validListings);
  }



//Transfer Tokens
  async function transferTokens() {
    const provider = await detectEthereumProvider();
    if (!provider) {
      console.error('Please install MetaMask!');
      return;
    }

    const signer = new ethers.providers.Web3Provider(provider).getSigner();
    const contractAddress = '0x60db42eCec7C01415260CeC88eB2c07b101b6EcC';
    const contractABI = require('../build/contracts/NFTcr.json'); // YOUR_NFTCR_CONTRACT_ABI_HERE
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

    try {
      const tx = await contract.transfer(recipientAddress, ethers.utils.parseEther(transferAmount));
      await tx.wait();
      alert('Successfully transferred tokens!');
      setRecipientAddress('');
      setTransferAmount('');
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  }
  return (

    <Layout>
      <div className="container mx-auto px-4 mt-12">
        {/* Tab Buttons */}
        <div className="tabs mb-8">
          <button
            className={`tab ${activeTab === 'balance' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('balance')}
          >
            NFTcr Balance
          </button>
          <button
            className={`tab ${activeTab === 'transfer' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('transfer')}
          >
            Transfer NFTcr Tokens
          </button>
          <button
            className={`tab ${activeTab === 'mint' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('mint')}
          >
            Mint NFT
          </button>
          <button
            className={`tab ${activeTab === 'nfts' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('nfts')}
          >
            Your NFTs
          </button>
          <button
            className={`tab ${activeTab === 'forsale' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('forsale')}
          >
            NFTs for Sale
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === 'balance' && (
          <div className="mb-8 bg-white p-6 rounded shadow-md">
            <div className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md flex items-center space-x-4">
              <p className="text-lg font-medium">NFTcr Balance:</p>
              <span className="text-xl font-bold">{tokenBalance}</span>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">NFTs For Sale</h2>
              {/* NFTs for Sale */}
              <NFTsForSaleList listedNFTsForSale={listedNFTsForSale} buyNFT={buyNFT} />
              {/* ... */}
            </div>
          </div>
        )}
        {activeTab === 'transfer' && (
          <div className="mb-8 bg-white p-6 rounded shadow-md">
            {/* Transfer Tokens Section */}
            <div className="mb-8 bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Transfer NFTcr Tokens</h2>
              <input
                className="border p-2 w-full rounded my-2"
                type="text"
                value={recipientAddress}
                onChange={e => setRecipientAddress(e.target.value)}
                placeholder="Recipient Address"
              />
              <input
                className="border p-2 w-full rounded my-2"
                type="text"
                value={transferAmount}
                onChange={e => setTransferAmount(e.target.value)}
                placeholder="Amount to Transfer"
              />
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={transferTokens}>Transfer</button>
            </div>
            {/* ... */}
          </div>
        )}
        {activeTab === 'mint' && (
          <div className="mb-8 bg-white p-6 rounded shadow-md">
            {/* Mint NFT Section */}
            <div className="mb-8 bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Mint Your NFT</h2>

              {/* Image Upload */}
              <input
                className="border p-2 w-full rounded my-2"
                type="file"
                onChange={handleImageUpload}
              />
              {image && <img src={image} alt="Preview" className="w-64 h-64 object-cover rounded mt-4" />}

              {/* NFT Name */}
              <input
                className="border p-2 w-full rounded my-2"
                type="text"
                value={nftName}
                onChange={e => setNftName(e.target.value)}
                placeholder="NFT Name"
              />
              {/* NFT Description */}
              <input
                className="border p-2 w-full rounded my-2"
                type="text"
                value={nftDescription}
                onChange={e => setNftDescription(e.target.value)}
                placeholder="NFT Description"
              />
              {/* Mint Button */}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => mintWithMetadata(nftName, nftDescription)}>Mint</button>
            </div>
            {/* ... */}
          </div>
        )}
        {activeTab === 'nfts' && (
          <div className="mt-12">
            {/* List of Minted NFTs */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
              <div className="nft-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map(nft => (
                  <div key={nft.id} className="nft-card p-4 border rounded shadow-lg hover:shadow-xl transition duration-300">
                    <img src={nft.image} alt={`NFT ${nft.id}`} className="w-full h-auto mb-4" />
                    <p className="mb-2 font-semibold">NFT ID: {nft.id}</p>
                    <p className="mb-2">Name: {nft.name}</p>
                    <p className="mb-4">Description: {nft.description}</p>
                    <div className="nft-sale-section">
                      <input
                        className="border p-2 w-full rounded mb-4"
                        type="text"
                        placeholder="Enter sale price"
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                      <button className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => listNFTForSale(nft.id, salePrice)}>List for Sale</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'forsale' && (
          <div className="mt-12">
            {/* NFTs for Sale */}
            <NFTsForSaleList listedNFTsForSale={listedNFTsForSale} buyNFT={buyNFT} />
            {/* ... */}
          </div>
        )}
      </div>
    </Layout>
  );
}
