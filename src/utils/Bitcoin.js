
import getPublicKey from './ECDSA.js'
const { sha256, ripemd160 } = require('crypto-hash');
const Buffer = require('buffer').Buffer;
const bs58check = require('bs58check');

async function address(publicKey){
    console.log(publicKey)
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const hash = ripemd160(Buffer.from(await sha256(publicKeyBuffer), 'hex'));
    
    // Add the version byte
    const versionByte = Buffer.from('00', 'hex');
    const extendedPublicKeyHash = Buffer.concat([versionByte, hash]);
    
    // Compute the checksum
    const checksum = sha256(sha256(extendedPublicKeyHash)).substring(0, 8);
    
    // Concatenate the extended public key hash and the checksum
    const extendedPublicKeyHashChecksum = Buffer.concat([extendedPublicKeyHash, checksum]);
    
    // Encode the address in Base58Check format
    const address = bs58check.encode(extendedPublicKeyHashChecksum);
    
    
    return address;
}


export default function publicAddressPairBitcoin(privateKey){
    let publicKey = getPublicKey(privateKey);
    const result = {
        'PublicKey' : publicKey,
        'Address' : address(publicKey)
    };

    return result;
}
