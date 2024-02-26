import server from "./server";
import {toHex} from 'ethereum-cryptography/utils'
import * as secp from 'ethereum-cryptography/secp256k1';
import * as k from 'ethereum-cryptography/keccak';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address = toHex(k.keccak256(publicKey.slice(1).slice(-20)));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an PrivateKey, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Public Key: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
