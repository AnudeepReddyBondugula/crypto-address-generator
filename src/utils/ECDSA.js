const { ec } = require('elliptic');

export default function getPublicKey(privateKey){
    
    // Initializing the elliptic curve object
    const secp256k1 = new ec('secp256k1');

    const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
    const publicKey = keyPair.getPublic().encode('hex');

    return publicKey;

}