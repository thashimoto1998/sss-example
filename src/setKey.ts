import axios from "axios";
import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs';
import * as uuid from "uuid";
import * as secrets from "secrets.js-grempe";

async function main() {
    const encKey = uuid.v4();
    console.log("encKey:", encKey)
    console.log("encKeyHex:", secrets.str2hex(encKey))

    const vwblNetworkUrl = "http://localhost:3000"
    const instance = axios.create({ baseURL: vwblNetworkUrl });
    const validatorInfo = (await instance.get("/api/v1/validator_info").catch(() => undefined))?.data;
    console.log(validatorInfo)

    const shares = secrets.share(secrets.str2hex(encKey), validatorInfo.n, validatorInfo.m)
    console.log("shares:", shares);
    
    const keyMapping: { [key: string]: string } = {};
    for (let i = 0; i < validatorInfo.n; i++) {
        const pubKey = new PublicKey(Buffer.from(validatorInfo.public_keys[i], 'hex'));
        const encryptedShare = encrypt(pubKey.toHex(), Buffer.from(shares[i]));
        keyMapping[validatorInfo.public_keys[i]] = encryptedShare.toString('hex');
    }
    console.log(keyMapping);

    const res = await instance.post("/api/v1/keys", {
        ethSig: "0x182caf413d7bb0bba18b0126bda1e11fec4b452795b2ad06f167e527eef1a093349255d599ca312b962a67dee878e79b8a94d9f0550175de7a09af4e1f2ab9181c",
        documentId: "0xd7e4b17c5eaf7a28e2dcb3ee57f01bd108766c74d0d46ee2d805a981c76b3b4e",
        chainId:  80001,
        autoMigration: false,
        keyMapping: keyMapping
    })
    console.log(res);
}

main()