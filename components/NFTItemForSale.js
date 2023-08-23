import React from 'react';

function NFTItemForSale({ nft, buyNFT }) {
    const shortenAddress = (address) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="nft-item-for-sale p-4 shadow-md hover:shadow-lg transition duration-300">


            <div className="relative overflow-hidden rounded-lg">
                <img src={nft.image} alt={nft.name} className="w-full h-auto" />
                <div className="absolute bottom-0 p-4 bg-gradient-to-t from-black text-white">
                    <h2 className="text-xl font-semibold truncate">{nft.name}</h2>
                    <p className="text-sm truncate">{nft.description}</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p>Seller: <span className="font-semibold">{shortenAddress(nft.seller)}</span></p>
                <p>Token ID: {nft.tokenId}</p>
            </div>
            {parseFloat(nft.price) > 0 ? (
                <div className="mt-4 flex justify-between items-center">
                    <p className="font-semibold text-xl">{nft.price} ETH</p>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={() => buyNFT(nft.tokenId)}>Buy</button>
                </div>
            ) : (
                <p className="mt-4 text-gray-500">Not for sale</p>
            )}
        </div>
    );
}

export default NFTItemForSale;
