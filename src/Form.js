import { useState } from "react";
import publicAddressPairEthereum from "./utils/Ethereum";
import publicAddressPairBitcoin from "./utils/Bitcoin";
import forge from "node-forge";
const { ec } = require("elliptic");

export default function Form() {
  // auto string generate
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 64; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // rendom key genrator
  const md = forge.md.sha256.create();
  md.update(result);
  const privateKey = md.digest().toHex();
  //   console.log(seed);
  //   const [privateKey, setPrivateKey] = useState("");
  const [addr, setaddr] = useState("");
  function validatePrivateKey(privateKey) {
    if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
      return false;
    }

    // Initializing the elliptic curve object
    const secp256k1 = new ec("secp256k1");

    try {
      secp256k1.keyFromPrivate(privateKey, "hex");
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
      text.value = pair["PublicKey"];
      address.value = pair["Address"];
    } else if (currency === "Bitcoin") {
      const pair = publicAddressPairBitcoin(privateKey);
      text.value = pair["PublicKey"];
      pair["Address"].then((data) => {
        setaddr("0x" + data);
      });
      address.value = addr;
    }
  }

  return (
    <form className="form" action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="form__entries">
        {/* <div className="input-data">
          <label>Private Key: </label>
          <input
            type="text"
            onChange={(e) => {
              setPrivateKey(e.target.value);
            }}
          />
        </div> */}

        <div id="TypeOfCurrency">
          <label>Type of Crypto: </label>
          <select id="type">
            <option value="Ethereum">Ethereum</option>
            <option value="Bitcoin">Bitcoin</option>
            {/* <option value="Ethereum">Ethereum</option> */}
          </select>
        </div>
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

        <div className="Address">
          <label>Address</label>
          <br />
          <textarea id="AddressText" rows={2} cols={40} disabled />
        </div>
      </div>
    </form>
  );
}
