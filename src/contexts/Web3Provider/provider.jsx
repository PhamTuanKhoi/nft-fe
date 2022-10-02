import React, { useEffect, useState } from "react";
import { jwtManager } from "../../helpers/jwtManager";
import { ethers } from "ethers";
// import { Signer } from 'ethers';
import collectionABIs from "../../contracts/ERC1155Collection.sol/ERC1155Collection.json";
import marketABIs from "../../contracts/LazyMaketplace.sol/LazyMarketplace.json";
import Web3Context from "./context";
import walletAPI from "../../apis/wallet";
import { toast } from "react-toastify";

function Web3Provider(props) {
  // console.log(props);
  const { marketAddresses, chainIds } = props;
  const [signer, setSigner] = useState();
  const [user, setUser] = useState();
  const [provider, setProvider] = useState();

  const [marketAddress, setMarketAddress] = useState("");
  const [chainId, setChainId] = useState(0);
  const UNIT = "PLS";

  async function login() {
    if (typeof window.ethereum === "undefined") {
      toast.error("Please, install MetaMask!");
      return;
    }
    const sign = await connectWallet();

    if (!sign) return;
    const address = await sign.getAddress();

    const { data: nonce } = await walletAPI.getNonce(address);
    // const signature = await sign.signMessage(nonce);

    const { data: user } = await walletAPI.loginBySign(address);
    // console.log("🍕 ~ user access token", user);
    if (user) {
      jwtManager.set(user.access_token);
      getUser();
    }
  }

  async function logout() {
    setUser(undefined);
    jwtManager.clear();
    window.location.reload();
  }

  async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log("provider", provider)
    await provider.send("eth_requestAccounts", []);

    const signer1 = provider.getSigner();

    setSigner(signer1);
    setProvider(provider);

    return signer1;
  }

  async function getUser() {
    try {
      const token = await jwtManager.get();
      if (token) {
        const { data } = await walletAPI.getMe();
        setUser(data);
        connectWallet();
      }
    } catch (error) {
      console.log(error);
      jwtManager.clear();
    }
  }
  function isValidChain() {
    if (!provider) return false;
    const currentChainId = provider?.network?.chainId;
    // return +currentChainId === +chainId;
    return true;
  }

  async function loadSigner(provider) {
    // check if provider is Web3Provider
    if (!provider) return;
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  }

  useEffect(() => {
    getUser();
    // @ts-ignore
    if (!window.ethereum) {
      setProvider(undefined);
    } else {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(provider);
    }
  }, []);

  useEffect(() => {
    provider?.getNetwork().then((network) => {
      setChainId(+network.chainId);
      const chainIndex = chainIds.findIndex((id) => id === +network.chainId);
      // loadSigner(provider);
      if (chainIndex !== -1) {
        setMarketAddress(marketAddresses[chainIndex]);
      } else {
        toast.info(`Please switch to ${process.env.REACT_APP_NET_WORK_NAME}`);
        // await connectWallet();
      }
    });
  }, [provider]);

  useEffect(() => {
    // @ts-ignore
    if (!window.ethereum) {
      setProvider(undefined);
    } else {
      // @ts-ignore
      window.ethereum.on("chainChanged", function (networkId) {
        // window.location.reload();
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        setProvider(provider);
      });

      // @ts-ignore
      window.ethereum.on("accountsChanged", function (accounts) {
        logout();
      });
    }
  }, []);
  const marketABI = marketABIs.abi;
  const collectionABI = collectionABIs.abi;
  //return
  return (
    <Web3Context.Provider
      value={{
        UNIT,
        user,
        setUser,
        signer,
        provider,
        chainIds,
        marketAddresses,
        marketABI,
        collectionABI,
        login,
        logout,
        isValidChain,
        marketAddress,
        chainId,
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
}
function useWeb3() {
  const context = React.useContext(Web3Context);
  if (context === undefined) {
    throw new Error("Error in useWeb3");
  }
  return context;
}

export { Web3Provider, useWeb3 };
