import * as secrets from "secrets.js-grempe";
import * as crypto from "crypto";

function main() {
    //const secret = "hello world";
    const secret = secrets.random(128);
    console.log("secret:", secret, "\n");
    const secretHex = secrets.str2hex(secret);
    
    // split into 5 shares, with a threshold of 3, WITH zero-padding
    const shares3of5 = secrets.share(secretHex, 5, 3, 1024);
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
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);
    let encryptedText = cipher.update(planeText, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    console.log("encrypted text: ", encryptedText);

    // Decrypt
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
    decryptedText += decipher.final('utf-8');
    console.log("decrypted text", decryptedText);
}

main()