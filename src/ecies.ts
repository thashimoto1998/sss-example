import { encrypt, decrypt, PrivateKey, PublicKey } from 'eciesjs';

function main() {

    const privKey = new PrivateKey(
         Buffer.from([40, 33, 19, 194, 127, 232, 212, 106, 214, 54, 225, 2, 77, 49, 13, 56, 203, 77, 252, 1, 145, 54, 211, 58, 118, 66, 233, 99, 98, 95, 157, 117])
    )
    console.log(privKey)

    const pubKey = new PublicKey(
        Buffer.from([3, 133, 233, 250, 108, 126, 179, 225, 93, 145, 177, 118, 155, 207, 136, 64, 150, 70, 195, 236, 245, 29, 186, 231, 12, 156, 41, 84, 95, 94, 178, 38, 234])
    )
    console.log(pubKey)

    const data = Buffer.from('this is a secret');
    console.log('data:', data);
    const encryptedData = encrypt(pubKey.toHex(), data)
    console.log("encrypted data:", encryptedData);

    const decryptedData = decrypt(privKey.toHex(), encryptedData).toString()
    console.log("decrypted data:", decryptedData);
}

main()