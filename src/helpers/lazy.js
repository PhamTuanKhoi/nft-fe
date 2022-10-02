import {ethers} from 'ethers';

export async function createLazyBuySig(signer, {collectionAddress, amount, creator, price, uri, royal}) {
    return signer.signMessage(
        ethers.utils.arrayify(
            ethers.utils.keccak256(
                ethers.utils.defaultAbiCoder.encode(
                    ['address', 'uint256', 'address', 'uint256', 'string', 'uint256'],
                    [collectionAddress, amount, creator, price, uri, royal]
                )
            )
        )
    );
}

// function bidLazy(address _tokenAddress, uint256 _amount, address _creator, uint256 _minBid, uint256 _endTime, string calldata _uri, uint256 _auctionId, bytes calldata _signature)
export async function createLazyBidSig(signer, {collectionAddress, amount, creator, minBid, endTime, uri, royal, auctionId}) {
    return signer.signMessage(
        ethers.utils.arrayify(
            ethers.utils.keccak256(
                ethers.utils.defaultAbiCoder.encode(
                    ['address', 'uint256', 'address', 'uint256', 'uint256', 'string', 'uint256', 'uint256'],
                    [collectionAddress, amount, creator, minBid, endTime, uri, royal, auctionId]
                )
            )
        )
    );
}

// return unique number by timestamp and random
export function getUniqueNumber() {
    return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000000);
}
