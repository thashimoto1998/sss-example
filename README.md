# sss-example

## npm package
- shamir's secret sharing: [secrets.js-grempe](https://www.npmjs.com/package/secrets.js-grempe)
- encrypt/decrypt: crypto

## PreInstall
- typescript
- ts-node

## Install
```
yarn install
```

## Exec
```
ts-node src/index.ts
```

## Exec output
```
 % ts-node src/index.ts
secret: 899a12f63f436b968036102442b59b2e 

shares 1 :
801de127b9fb9d96d90a3c6cee76b01daa46f98a2e758b60fc56a53a65f37b0c7341507ff96c2d3bf0d8fea6fd53809a1c226dcef8bb0d69c3792eb190cc4bdc55e6e2c0445e5b1ca4ee331b6a8606ddcbf71d62195eaf6515c78982e22fa21b063cbb433a3e11992cd373ad6f05aa6f173f762c9b27ecb67dbf81cda55b73f7166
shares 2 :
8026b3051a27d3d46b7fc8504f44ee1030b853b75b8579079e0e6ba87e1f901dc6305448f2abfe07ed046054927800e26f481640b136992ed8589608fb73d8b289e68efc5a75b84a200803e8fdb0771cd971e30d42f9b3c37cd06b5eae3c9a9a6b74ea379911ecba08618aabed95c86646f2bc8e38be0be47c873a1dd15ce2eda7c
shares 3 :
803b5222a3dc4e42b275f43ca1325e0d9afeaa3d75f0f2676258ce921beceb11b57104370bc7d33c1ddc9ef26f2b8078736a7b8e498d94471b21b8b96bbf936edc106a6c1d0be576877633a3911672e111c6fd2f58871fa66a07e1bc4f233b816ec85214a0bffb0327d2fa3681d0646952fdc9c2a5f9e4720228bdc07797928ab22
shares 4 :
804d9300467b208c66143472669c6749473662e5adc159e731c19196cbe89ef84eab6bdae38fbac88b2851df434fa6cb55c0ceb114682b5c09cf556cdf5e09c96a63a0c84f4bcdaf5306c2fdccd35673af5eb6fd72d7e66004cf3022b610fc91adfaf0b8e4a1f4c033af50a5d0e3f529edc119276dcada6901ea4146a964f7b4977
shares 5 :
80507227ff80bd1abf1e081e88ead754ed709b6f83b4d287cd9734acae1be5f43dea3ba51ae397f37bf0af79be1c265149e2a37fecd32635cab67bdd4f9242153f95445808359093f478f2b6a075538e67e9a8df68a94a051218bac0570f5d8aa846489bdd0fe3791c1c2038bca65926f9ce6c6bf08d35ff7f45c69b0faf87d3829

combined share: 899a12f63f436b968036102442b59b2e
plane text: This is Plane Text
encrypted text:  51c6224bb75db99c94c8828ffe7e4a612b5577330619792151cdcab4576c8d2e
decrypted text This is Plane Text
```
