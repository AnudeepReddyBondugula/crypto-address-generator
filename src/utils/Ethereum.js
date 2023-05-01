import getPublicKey from './ECDSA.js'
const keccak256 = require('js-sha3').keccak256;
const Buffer = require('buffer').Buffer;

function address(publicKey){
    const publicKeyBuffer = Buffer.from(publicKey.substring(2), 'hex');
    const hash = keccak256(publicKeyBuffer);
    const wal_address = '0x' + hash.substring(24);
    return wal_address;
}

export default function publicAddressPairEthereum(privateKey){
    let publicKey = getPublicKey(privateKey);
    const result = {
        'PublicKey' : publicKey,
        'Address' : address(publicKey)
    };

    return result;
}