import dotenv from 'dotenv';
dotenv.config();
import Web3 from 'web3';
const Provider = require('@truffle/hdwallet-provider');

const privateKey = process.env.PRIVATE_KEY!;
const infuraUrl = process.env.INFURA_URL;

const MESSAGE_TO_BE_SIGNED = "Hello VWBL";

async function main() {
    console.log(privateKey)
    const provider = new Provider(privateKey, infuraUrl);
    const web3 = new Web3(provider);
    const myAddress = (await web3.eth.getAccounts())[0];

    console.log("address: ", myAddress);
    const sig = await web3.eth.personal.sign(MESSAGE_TO_BE_SIGNED, myAddress, ""); 
    console.log("sig: ", sig);

    const recoverAddr = await web3.eth.accounts.recover(
        MESSAGE_TO_BE_SIGNED,
        sig
    );
    console.log("recovered address:", recoverAddr);
}

main()