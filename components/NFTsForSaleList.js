
import NFTItemForSale from '../components/NFTItemForSale';

function NFTsForSaleList({ listedNFTsForSale, buyNFT }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


            {listedNFTsForSale.map(nft => (
                <NFTItemForSale key={nft.tokenId} nft={nft} buyNFT={buyNFT} />
            ))}

        </div>
    );
}
export default NFTsForSaleList;
