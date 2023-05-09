import axios from "axios";
import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs';
import * as uuid from "uuid";
import * as secrets from "secrets.js-grempe";

async function main() {
    const vwblNetworkUrl = "http://localhost:3000"
    const instance = axios.create({ baseURL: vwblNetworkUrl });

    const privKey = new PrivateKey();

    const documentId = "0xd7e4b17c5eaf7a28e2dcb3ee57f01bd108766c74d0d46ee2d805a981c76b3b4e"
    const chainId = 80001;
    const n = 3;
    const ethSig = "0x182caf413d7bb0bba18b0126bda1e11fec4b452795b2ad06f167e527eef1a093349255d599ca312b962a67dee878e79b8a94d9f0550175de7a09af4e1f2ab9181c";
    const userPubKey = "0x" + privKey.publicKey.toHex();
    const encryptedKeys = (await instance.get(
        `/api/v1/keys/${documentId}/${chainId}?ethSig=${ethSig}&userPubkey=${userPubKey}&N=${n}`
    )).data.encryptedKeys;
    console.log(encryptedKeys);
    const keys = encryptedKeys.map((k: string) => decrypt(privKey.toHex(), Buffer.from(k, 'hex')).toString());
    console.log(keys);
    const key = secrets.combine(keys)
    console.log("enc key:", key);
    //console.log("key:", uuid.parse(key));
    //console.log("key:", Buffer.from(key).toString('hex'))
    console.log("key:", secrets.hex2str(key));
}

main();