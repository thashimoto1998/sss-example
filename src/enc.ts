import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs';
import * as uuid from "uuid";
import * as secrets from "secrets.js-grempe";

function main() {
    console.log('piv key hex string: ',Buffer.from([40, 33, 19, 194, 127, 232, 212, 106, 214, 54, 225, 2, 77, 49, 13, 56, 203, 77, 252, 1, 145, 54, 211, 58, 118, 66, 233, 99, 98, 95, 157, 117]).toString('hex'))
    const privKey = new PrivateKey(
         Buffer.from([40, 33, 19, 194, 127, 232, 212, 106, 214, 54, 225, 2, 77, 49, 13, 56, 203, 77, 252, 1, 145, 54, 211, 58, 118, 66, 233, 99, 98, 95, 157, 117])
    )
    console.log(privKey)

    console.log('pub key hex string: ', Buffer.from([3, 133, 233, 250, 108, 126, 179, 225, 93, 145, 177, 118, 155, 207, 136, 64, 150, 70, 195, 236, 245, 29, 186, 231, 12, 156, 41, 84, 95, 94, 178, 38, 234]).toString('hex'))
    const pubKey = new PublicKey(
        Buffer.from([3, 133, 233, 250, 108, 126, 179, 225, 93, 145, 177, 118, 155, 207, 136, 64, 150, 70, 195, 236, 245, 29, 186, 231, 12, 156, 41, 84, 95, 94, 178, 38, 234])
    )
    console.log(pubKey)


    const secret = uuid.v4();
    console.log("key:", secret);
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

    count = 1;
    shares3of5.forEach(s => {
        console.log("shares", count, ":");
        const data = Buffer.from(s);
        const encryptedData = encrypt(pubKey.toHex(), data)
        console.log("encrypted data:", encryptedData.toString('hex'));
        const decryptedData = decrypt(privKey.toHex(), encryptedData).toString()
        console.log("decrypted data:", decryptedData);
        count++;
    })
}

main()