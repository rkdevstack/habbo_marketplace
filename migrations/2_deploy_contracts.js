const NFTs = artifacts.require("NFTs");
const NFTcr = artifacts.require("NFTcr");
const Marketplace = artifacts.require("Marketplace");

module.exports = function (deployer) {
    let deployedNFTs, deployedNFTcr;

    deployer.deploy(NFTs)
        .then(instance => {
            deployedNFTs = instance;
            // Assuming your NFTcr constructor needs an initial supply:
            const initialSupply = web3.utils.toWei("100000", "ether");
            return deployer.deploy(NFTcr, initialSupply);
        })
        .then(instance => {
            deployedNFTcr = instance;
            return deployer.deploy(Marketplace, deployedNFTs.address, deployedNFTcr.address);
        });
};
