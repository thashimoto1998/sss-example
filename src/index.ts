import * as secrets from "secrets.js-grempe";
import * as crypto from "crypto";
import * as base64 from "js-base64";
import * as zlib from "zlib";
import cryptoJs from "crypto-js";

function main() {
    //const secret = "hello world";
    const secret = secrets.random(64);
    console.log("secret:", secret, "\n");
    console.log("secret length", secret.length)
    const secretHex = secrets.str2hex(secret);
    
    // split into 5 shares, with a threshold of 3, WITH zero-padding
    const shares3of5 = secrets.share(secretHex, 5, 3);
    let count = 1;
    shares3of5.forEach(s => {
        console.log("shares", count, ":");
        console.log(s);
        count++;
    });

    // combine 3 shares
    let comb3of5 = secrets.combine([shares3of5[1], shares3of5[3], shares3of5[4]]);

    // convert back to UTF string
    comb3of5 = secrets.hex2str(comb3of5)

    console.log("\ncombined share:", comb3of5);

    const planeText = "This is Plane Text";
    console.log("plane text:", planeText);

    // Encrypt
    let encryptedText = cryptoJs.AES.encrypt(planeText, secret).toString();
    console.log("encrypted text: ", encryptedText);

    // Decrypt
   let decryptedText = cryptoJs.AES.decrypt(encryptedText, secret).toString(cryptoJs.enc.Utf8);
    console.log("decrypted text", decryptedText);

    
    // generate key pair
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 520,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'mySecret'
        }
    });
    console.log("public key", keyPair.publicKey);
    console.log("buffer", Buffer.from(shares3of5[0]).length);
    console.log("base64", Buffer.from(base64.encode(shares3of5[0])).length)
    console.log("gzip", Buffer.from(gzip(shares3of5[0])).length)
    console.log("share length", shares3of5[0].length);
    console.log("share buffer", Buffer.from(shares3of5[0].slice(0, 100)).byteLength);
     
    console.log("share", shares3of5[0].toString());
    const encIndexList = [0, 23, 46, 69, 92, 99];
    let encryptedShareList = [];
    for (let i = 0; i < 5 ; i++) {
        const s = shares3of5[0].slice(encIndexList[i], encIndexList[i+1]);
        const e = crypto.publicEncrypt(
            keyPair.publicKey,
            Buffer.from(s)
        );
        encryptedShareList.push(e);
        console.log("share", i, s.toString());
        console.log("encrypted share", i,  e.toString("base64"));
        console.log("encrypted share length", e.length);
    }
    let encryptedShare = Buffer.concat(encryptedShareList);

    console.log("encrypted share", encryptedShare);
    console.log("encrypted share length", encryptedShare.length);
    
    let decryptedShare = "";
    for (let i = 0; i < 5; i++) {
        const e = encryptedShare.slice(i*65, (i+1)*65);
        console.log("encrypted share", i, e.toString("base64"));
        const d = crypto.privateDecrypt(
            {
                key: keyPair.privateKey,
                passphrase: 'mySecret'
            },
            e
        );
        decryptedShare += d.toString();
        console.log("decrypted share", i, d.toString());
    }
    console.log("decrypted share", decryptedShare);
}

function gzip(str: any){
    const content = encodeURIComponent(str) // エンコード
    const result = zlib.gzipSync(content)   // 圧縮
    const value = result.toString('base64') // Buffer => base64変換
    return value;
}

main()
