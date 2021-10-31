import {Magic} from 'magic-sdk';
import Web3 from 'web3';
import {OAuthExtension} from '@magic-ext/oauth';
import contractAbi from './Pool.json';


const BSCOptions = {
    /* Smart Chain Testnet RPC URL */
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97, // Smart Chain Testnet Chain ID
};

export const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    extensions: [new OAuthExtension()],
    network: BSCOptions,
});

/* Initialize Binance Smart Chain Web3 provider */
export const web3 = new Web3(magic.rpcProvider);

console.log(contractAbi.networks[Object.keys(contractAbi.networks)[0]]);
export const contract = new web3.eth.Contract(
    contractAbi.abi,
    "0xcA18Ffa72f42d1224FE4da2c4613d8E69B86325A"
);
