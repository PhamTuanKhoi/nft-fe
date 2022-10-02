import { ethers } from "ethers";
import NFTMarketplacejson from '../contracts/artifacts/NFTMarketplace.json'

export async function buyToken(voucher, address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, NFTMarketplacejson.abi, signer);

  return await buy(contract, voucher);
}

export async function buy(contract, voucher) {
  const options = { value: voucher.price, gasLimit: 2500000 };
  return await contract.mintAndBuyItem(voucher, options);
}

export async function createVoucher(
  uri,
  tokenAddress,
  royal,
  price,
  total,
  quantity,
  address,
) {
  const voucher = { uri, tokenAddress, royal, price, total, quantity };
  const domain = await signingDomain(address);
  const types = {
    NFTVoucher: [
      { name: "uri", type: "string" },
      { name: "tokenAddress", type: "address" },
      { name: "royal", type: "uint256" },
      { name: "price", type: "uint256" },
      { name: "total", type: "uint256" },
      { name: "quantity", type: "uint256" }
    ]
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer._signTypedData(domain, types, voucher);

  const vc = {
    ...voucher,
    signature
  }
  return vc;
}

async function signingDomain(address) {
  const domain = {
    verifyingContract: address
  };
  return domain;
}

window.createVoucher = createVoucher;
