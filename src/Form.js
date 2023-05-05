import { useState } from 'react';
import publicAddressPairEthereum from './utils/Ethereum';
import publicAddressPairBitcoin from './utils/Bitcoin';
const { ec } = require('elliptic');



export default function Form() {

    function generatePrivateKey() {
        let result = '';
        while(result.length !== 64) {
            var buf = new Uint8Array(1);
            crypto.getRandomValues(buf);
            if((buf[0] >= 48 && buf[0] <= 57) || (buf[0] >= 65 && buf[0] <= 70) || (buf[0] >= 97 && buf[0] <= 102)) {
                result += String.fromCharCode(buf[0])
            }
        }
        setPrivateKey(result);
    }

    const [privateKey, setPrivateKey] = useState('');

    function validatePrivateKey(privateKey) {
        if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
            return false;
        }

        // Initializing the elliptic curve object
        const secp256k1 = new ec('secp256k1');

        try {
            secp256k1.keyFromPrivate(privateKey, 'hex');
        } catch (error) {
            // Private key is invalid
            return false;
        }

        return true;
    }
    function handleClick() {

        const currency = document.getElementById("type").value;
        let text = document.getElementById("publicKeyText");
        let address = document.getElementById("AddressText");
        if (!validatePrivateKey(privateKey)) {
            alert("Enter Valid Private Key!");
            return;
        }
        if (currency === "Ethereum") {
            const pair = publicAddressPairEthereum(privateKey);
            text.value = pair['PublicKey'];
            address.value = pair['Address'];

        }
        else if (currency === 'Bitcoin') {
            const pair = publicAddressPairBitcoin(privateKey);
            text.value = pair['PublicKey'];
            pair['Address'].then((data) => {

                address.value = "0x" + data;
            })
            

        }
    }

    return (
        <form className='form' action="#" onSubmit={e => e.preventDefault()}>
            <div className="form__entries">
                <div className="input-data">
                <div className="GeneratePrivateKey">
                    <button onClick={generatePrivateKey}>Random Private Key</button>
                </div>
                <input id="PrivateKey" type='text'
                    autoComplete='off'
                    onChange={e => {
                        setPrivateKey(e.target.value);
                    }}
                    value = {privateKey}
                />
            </div>

            <div id="TypeOfCurrency">
                <label>Type of Crypto: </label>
                <select id="type">
                    <option value="Ethereum">Ethereum</option>
                    <option value="Bitcoin">Bitcoin</option>
                    {/* <option value="Ethereum">Ethereum</option> */}
                </select>
            </div>
            <div className="Generate">
                <button onClick={handleClick}>Generate</button>
            </div>

            <div className="form__results">
                <div className="PublicKey">
                <label>Public Key</label>
                <br />
                <textarea id="publicKeyText" rows={5} cols={40} disabled />
            </div>

            <div className='Address'>
                <label>Address</label>
                <br />
                <textarea id="AddressText" rows={2} cols={40} disabled />
            </div>
            </div>
            </div>
        </form>
    )
}