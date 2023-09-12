// test/testMarketplace.js

const NFTs = artifacts.require("NFTs");
const NFTcr = artifacts.require("NFTcr");
const Marketplace = artifacts.require("Marketplace");

contract("Marketplace", accounts => {
    let nftContract;
    let nftcrContract;
    let marketplaceContract;

    const owner = accounts[0];
    const buyer = accounts[1];
    const seller = accounts[2];
    const b1 = accounts[3];
    const b2 = accounts[4];

    before(async () => {
        nftContract = await NFTs.deployed();
        nftcrContract = await NFTcr.deployed();
        marketplaceContract = await Marketplace.deployed();
    });

    describe("NFT Actions", () => {
        it("should mint an NFT", async () => {
            const result = await nftContract.mint(owner, "token1");
            assert(result);
            const ownerOfToken = await nftContract.ownerOf(1);
            assert.equal(ownerOfToken, owner);
        });

        it("should list an NFT for sale", async () => {
            await nftContract.approve(marketplaceContract.address, 1, { from: owner });
            const listingPrice = web3.utils.toWei("1", "ether");
            await marketplaceContract.listNFT(1, listingPrice, { from: owner });
            const listing = await marketplaceContract.listings(1);
            assert.equal(listing.price, listingPrice);
            assert.equal(listing.seller, owner);
        });
    });

    describe("Marketplace Actions", () => {
        before(async () => {
            // Provide the buyer with enough NFTcr tokens to make a purchase
            const initialSupply = await nftcrContract.balanceOf(owner);
            const transferAmount = web3.utils.toWei("10", "ether");
            await nftcrContract.transfer(buyer, transferAmount, { from: owner });
            const buyerBalanceAfterTransfer = await nftcrContract.balanceOf(buyer);
            assert.equal(buyerBalanceAfterTransfer.toString(), transferAmount);
        });

        it("should buy an NFT", async () => {
            const purchasePrice = web3.utils.toWei("1", "ether");
            await nftcrContract.approve(marketplaceContract.address, purchasePrice, { from: buyer });
            await marketplaceContract.buyNFT(1, { from: buyer });
            const newOwner = await nftContract.ownerOf(1);
            assert.equal(newOwner, buyer);
        });
    });

    describe("NFTcr Token Transfers", () => {
        it("should transfer tokens between accounts", async () => {
            // Transfer 10 tokens from owner to b1
            await nftcrContract.transfer(b1, web3.utils.toWei("10", "ether"), { from: owner });

            // Check b1 balance
            const b1Balance = await nftcrContract.balanceOf(b1);
            assert.equal(b1Balance.toString(), web3.utils.toWei("10", "ether"));

            // Transfer 5 tokens from b1 to b2
            await nftcrContract.transfer(b2, web3.utils.toWei("5", "ether"), { from: b1 });

            // Check b2 balance
            const b2Balance = await nftcrContract.balanceOf(b2);
            assert.equal(b2Balance.toString(), web3.utils.toWei("5", "ether"));

            // Check b1 balance after transfer
            const newB1Balance = await nftcrContract.balanceOf(b1);
            assert.equal(newB1Balance.toString(), web3.utils.toWei("5", "ether"));
        });
    });


});
