
import React from "react";


const defaultState = {
  UNIT: "ether",
  user: undefined,
  signer: undefined,
  provider: undefined,
  chainIds: [],
  marketAddresses: [],
  marketABI: undefined,
  collectionABI: undefined,
  login: () => { },
  logout: () => { },
  isValidChain: () => false,
  marketAddress: "",
  chainId: 0,
};

const Web3Context = React.createContext(defaultState);
export default Web3Context;
