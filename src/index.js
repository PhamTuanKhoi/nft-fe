import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import configAxios from "./apis/index";
import { Web3Provider } from "./contexts/Web3Provider/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingProvider from "../src/providers/loaddingProvider";
// import { ThemeProvider } from "./contexts/theme";

const CHAIN_IDS = process.env.REACT_APP_CHAIN_IDS.split(",").map((id) =>
  parseInt(id)
);

const MARKET_ADDRESSES = [];
CHAIN_IDS.forEach((chainId, index) => {
  MARKET_ADDRESSES.push(process.env[`REACT_APP_MARKET_ADDRESS_${index}`]);
});
// console.log(CHAIN_IDS, 'MARKET_ADDRESSES', MARKET_ADDRESSES);
configAxios();

ReactDOM.render(
  // <ThemeProvider>
  //   <Web3Provider marketAddresses={MARKET_ADDRESSES} chainIds={CHAIN_IDS}>
  <LoadingProvider>
    <Web3Provider marketAddresses={MARKET_ADDRESSES} chainIds={CHAIN_IDS}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer style={{ zIndex: 10000 }} />
        <App />
      </BrowserRouter>
    </Web3Provider>
  </LoadingProvider>,
  document.getElementById("root")
);
