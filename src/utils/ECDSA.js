const { ec } = require('elliptic');

export default function getPublicKey(privateKey){
    
    // Initializing the elliptic curve object
    const secp256k1 = new ec('secp256k1');

    const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
    const publicKey = keyPair.getPublic().encode('hex');

    return publicKey;

}

// Generate a new Ethereum private key
// const privateKey = 'f8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315';

// // Initialize the elliptic curve object
// const secp256k1 = new ec('secp256k1');

// // Generate the public key
// const keyPair = secp256k1.keyFromPrivate(privateKey, 'hex');
// const publicKey = keyPair.getPublic().encode('hex');

// // Generate the wallet address
// const publicKeyBuffer = Buffer.from(publicKey.substring(2), 'hex');
// const hash = keccak256(publicKeyBuffer);
// const address = '0x' + hash.substring(24);

// console.log('Public key:', publicKey);
// console.log('Wallet address:', address);