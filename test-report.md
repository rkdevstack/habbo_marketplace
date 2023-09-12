Using network 'test'.


Compiling your contracts...
===========================
> Compiling ./contracts/Marketplace.sol
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/NFTcr.sol
> Compiling ./contracts/NFTs.sol
> Compiling @openzeppelin/contracts/token/ERC20/ERC20.sol
> Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol
> Compiling @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
> Compiling @openzeppelin/contracts/token/ERC721/ERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721.sol
> Compiling @openzeppelin/contracts/token/ERC721/IERC721Receiver.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol
> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
> Compiling @openzeppelin/contracts/utils/Address.sol
> Compiling @openzeppelin/contracts/utils/Context.sol
> Compiling @openzeppelin/contracts/utils/Counters.sol
> Compiling @openzeppelin/contracts/utils/Strings.sol
> Compiling @openzeppelin/contracts/utils/introspection/ERC165.sol
> Compiling @openzeppelin/contracts/utils/introspection/IERC165.sol
> Compiling @openzeppelin/contracts/utils/math/Math.sol
> Compiling @openzeppelin/contracts/utils/math/SignedMath.sol
> Artifacts written to /var/folders/xw/tv5gzk791vsfwfbg6kk6kstm0000gn/T/test--96617-yCbb7loBV5ec
> Compiled successfully using:
   - solc: 0.8.20+commit.a1b79de6.Emscripten.clang

[0m[0m
[0m  Contract: Marketplace[0m
[0m    NFT Actions[0m
    [32m  ✔[0m[90m should mint an NFT[0m[31m (136ms)[0m

    Events emitted during test:
    ---------------------------

    [object Object].Transfer(
      from: <indexed> [33m0x0000000000000000000000000000000000000000[39m of unknown class (type: address),
      to: <indexed> [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address),
      tokenId: <indexed> [33m1[39m (type: uint256)
    )


    ---------------------------
    [32m  ✔[0m[90m should list an NFT for sale[0m[31m (453ms)[0m

    Events emitted during test:
    ---------------------------

    [object Object].Approval(
      owner: <indexed> [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address),
      approved: <indexed> [33m0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F[39m (Marketplace) (type: address),
      tokenId: <indexed> [33m1[39m (type: uint256)
    )

    [object Object].Transfer(
      from: <indexed> [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address),
      to: <indexed> [33m0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F[39m (Marketplace) (type: address),
      tokenId: <indexed> [33m1[39m (type: uint256)
    )

    [object Object].NFTListed(
      tokenId: [33m1[39m (type: uint256),
      price: [33m1000000000000000000[39m (type: uint256),
      seller: [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address)
    )


    ---------------------------
[0m    Marketplace Actions[0m
    [32m  ✔[0m[90m should buy an NFT[0m[31m (374ms)[0m

    Events emitted during test:
    ---------------------------

    [object Object].Approval(
      owner: <indexed> [33m0xf17f52151EbEF6C7334FAD080c5704D77216b732[39m of unknown class (type: address),
      spender: <indexed> [33m0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F[39m (Marketplace) (type: address),
      value: [33m1000000000000000000[39m (type: uint256)
    )

    [object Object].Approval(
      owner: <indexed> [33m0xf17f52151EbEF6C7334FAD080c5704D77216b732[39m of unknown class (type: address),
      spender: <indexed> [33m0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F[39m (Marketplace) (type: address),
      value: [33m0[39m (type: uint256)
    )

    [object Object].Transfer(
      from: <indexed> [33m0xf17f52151EbEF6C7334FAD080c5704D77216b732[39m of unknown class (type: address),
      to: <indexed> [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address),
      value: [33m1000000000000000000[39m (type: uint256)
    )

    [object Object].Transfer(
      from: <indexed> [33m0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F[39m (Marketplace) (type: address),
      to: <indexed> [33m0xf17f52151EbEF6C7334FAD080c5704D77216b732[39m of unknown class (type: address),
      tokenId: <indexed> [33m1[39m (type: uint256)
    )

    [object Object].NFTPurchased(
      tokenId: [33m1[39m (type: uint256),
      buyer: [33m0xf17f52151EbEF6C7334FAD080c5704D77216b732[39m of unknown class (type: address)
    )


    ---------------------------
[0m    NFTcr Token Transfers[0m
    [32m  ✔[0m[90m should transfer tokens between accounts[0m[31m (154ms)[0m

    Events emitted during test:
    ---------------------------

    [object Object].Transfer(
      from: <indexed> [33m0x627306090abaB3A6e1400e9345bC60c78a8BEf57[39m of unknown class (type: address),
      to: <indexed> [33m0x821aEa9a577a9b44299B9c15c88cf3087F3b5544[39m of unknown class (type: address),
      value: [33m10000000000000000000[39m (type: uint256)
    )

    [object Object].Transfer(
      from: <indexed> [33m0x821aEa9a577a9b44299B9c15c88cf3087F3b5544[39m of unknown class (type: address),
      to: <indexed> [33m0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2[39m of unknown class (type: address),
      value: [33m5000000000000000000[39m (type: uint256)
    )


    ---------------------------


[92m [0m[32m 4 passing[0m[90m (2s)[0m

