import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs';
import * as uuid from "uuid";
import * as secrets from "secrets.js-grempe";

function main() {
    let pubKeys: PublicKey[] = [];
    pubKeys.push(
        new PublicKey(Buffer.from("024cc53eec6cc120f1125f33c9cd7275715cf2e5245f6ad3fdc4df643b7294beab", "hex"))
    )
    pubKeys.push(
        new PublicKey(Buffer.from("03d2ddef3dc878286e371fbce2f0f12f90ba96a965e83c3bbb8b8cb9d703783185", "hex"))
    )
    pubKeys.push(
        new PublicKey(Buffer.from("03a84df316d668a643e382381857822795e031cf51684fc3c59e163733200b419d", "hex"))
    )
    pubKeys.push(
        new PublicKey(Buffer.from("02582087d0ebc3b3b4ed373bad1ff6ad10e297fbcbf28963580d817e85a63c53f2", "hex"))
    )
    pubKeys.push(
        new PublicKey(Buffer.from("031908605fcb21eb6952542688e0f90556ab68e68e4ba1ad121613fb1a79cd2773", "hex"))
    )

    let privKeys: PrivateKey[] = [];
    privKeys.push(
        new PrivateKey(Buffer.from("ad1e58e891b4c9d462fa96e44fef5813e80fd89b34a0cac5a7de593b46f71c19", "hex"))
    )
    privKeys.push(
        new PrivateKey(Buffer.from("c7e3d4cff618004b2512d8cdf5205240c8a421e37c77bba7085bf30ae561b880", "hex"))
    )
    privKeys.push(
        new PrivateKey(Buffer.from("450746e2a11288d7d7cb820b58b0758974a00a215b7c8fbac3d5b450d77a55d4", "hex"))
    )
    privKeys.push(
        new PrivateKey(Buffer.from("a5233e2e833d2c430c2e61f123ee476ecb0fffb93b50ffccc73d226655411458", "hex"))
    )
    privKeys.push(
        new PrivateKey(Buffer.from("da1e1e7482fca5ef0439745b7552b29c1e7f0de0bad71e3bb1a8f8d4640b5d26", "hex"))
    )


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
    for (let i = 0; i < 5; i++) {
        console.log("shares", count, ":");
        const data = Buffer.from(shares3of5[i]);
        console.log("private key:", privKeys[i].toHex())
        console.log("public key:", pubKeys[i].toHex())
        const encryptedData = encrypt(pubKeys[i].toHex(), data)
        console.log("encrypted data:", encryptedData.toString('hex'));
        const decryptedData = decrypt(privKeys[i].toHex(), encryptedData).toString()
        console.log("decrypted data:", decryptedData);
        console.log("success decryption:", decryptedData === shares3of5[i])
        count++;
    }
}

main()