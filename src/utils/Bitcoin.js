
import getPublicKey from './ECDSA.js'
import ripemd160 from "ripemd160-js/ripemd160.mjs";
const { sha256 } = require('crypto-hash');
const Buffer = require('buffer').Buffer;
const bs58 = require('bs58');


async function address(publicKey) {
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');

    const hash = await ripemd160(Buffer.from(await sha256(publicKeyBuffer), 'hex'));

    // // Add the version byte
    const versionByte = Buffer.from('00', 'hex');
    const extendedPublicKeyHash = Buffer.concat([versionByte, hash]);

    // // Compute the checksum
    const hash1 = await sha256(extendedPublicKeyHash);

    const hash2 = await sha256(Buffer.from(hash1, 'hex'));

    let checksum = hash2.substring(0, 8)


    checksum = Buffer.from(checksum, 'hex');

    // // Concatenate the extended public key hash and the checksum
    const extendedPublicKeyHashChecksum = Buffer.concat([extendedPublicKeyHash, checksum]);

    // // Encode the address in Base58Check format
    const addr = bs58.encode(extendedPublicKeyHashChecksum);
    return addr;
}


export default function publicAddressPairBitcoin(privateKey) {
    let publicKey = getPublicKey(privateKey);
    const result = {
        'PublicKey': publicKey,
        'Address': address(publicKey)
    }
    return result;
}
