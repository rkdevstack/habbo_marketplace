// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTs.sol";
import "./NFTcr.sol";

contract Marketplace {
    NFTs public nftContract;
    NFTcr public creditContract;

    struct Listing {
        uint256 price;
        address seller;
    }

    mapping(uint256 => Listing) public listings;

    event NFTListed(uint256 tokenId, uint256 price, address seller);
    event NFTPurchased(uint256 tokenId, address buyer);
    event NFTListingRemoved(uint256 tokenId);

    constructor(address _nftAddress, address _creditAddress) {
        nftContract = NFTs(_nftAddress);
        creditContract = NFTcr(_creditAddress);
    }

    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");

        nftContract.transferFrom(msg.sender, address(this), tokenId); // Transfers the NFT to this contract

        listings[tokenId] = Listing({
            price: price,
            seller: msg.sender
        });

        emit NFTListed(tokenId, price, msg.sender);
    }

    function buyNFT(uint256 tokenId) external {
        require(listings[tokenId].price > 0, "Not listed for sale");
        
        uint256 salePrice = listings[tokenId].price;
        address seller = listings[tokenId].seller;

        // Transfer NFTcr from buyer to seller
        creditContract.transferFrom(msg.sender, seller, salePrice);
        
        // Transfer NFT from contract to buyer
        nftContract.transferFrom(address(this), msg.sender, tokenId);

        // Remove the listing
        delete listings[tokenId];

        emit NFTPurchased(tokenId, msg.sender);
    }

    function removeListing(uint256 tokenId) external {
        require(listings[tokenId].seller == msg.sender, "Not the seller");

        nftContract.transferFrom(address(this), msg.sender, tokenId);

        delete listings[tokenId];

        emit NFTListingRemoved(tokenId);
    }
}
