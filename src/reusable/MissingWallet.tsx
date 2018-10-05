import * as React from "react";

import {COINBASE_WALLET_URL, METAMASK_URL, TRUST_WALLET_URL} from "../config/config";

const Style = require("./MissingWallet.scss");

const MetaMaskFox = require("assets/images/metamask-fox.svg");
const TrustWalletLogo = require("assets/images/trustwallet-logo.svg");
const CoinbaseWalletLogo = require("assets/images/coinbasewallet-logo.svg");


const MissingWallet = () => (
    <div>
        <h4 className={Style.heading}>You need a Web3-compatible wallet!</h4>
        <div className={"hidden-sm-down " + Style.entry}>
            <img className={Style.logo} src={MetaMaskFox}/>
            <span>Install <a href={METAMASK_URL}>MetaMask</a></span>
        </div>
        <div className={"hidden-md-up " + Style.mobileDevice}>
            <div className={Style.entry}>
                <img className={Style.logo} src={TrustWalletLogo}/>
                <span>Use <a href={TRUST_WALLET_URL}>Trust Wallet</a></span>
            </div>
            <span className="text-center">or</span>
            <div className={Style.entry}>
                <img className={Style.logo} src={CoinbaseWalletLogo}/>
                <span>Use <a href={COINBASE_WALLET_URL}>Coinbase Wallet</a></span>
            </div>
        </div>
    </div>
);

export default MissingWallet;
