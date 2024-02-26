//const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");


const privateKey         = secp.secp256k1.utils.randomPrivateKey();
const publicKey          = secp.secp256k1.getPublicKey(privateKey);
const publicKeyKeccak256 = keccak256(publicKey.slice(1).slice(-20));

console.log("Private Key: "      , toHex(privateKey))
console.log("Public Key: "       , toHex(publicKey))
console.log("Public key Keccak: ", toHex(publicKeyKeccak256))