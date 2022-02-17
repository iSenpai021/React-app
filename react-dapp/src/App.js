import logo from './logo.svg';
import {useState} from 'react';
import {ethers} from 'ethers'
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const GreeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [greeting, setGreetingValue] = useState('')

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(GreeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        const ethe = await window.ethereum.value
        console.log('data: ', data + ethe)
      }
      catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setGreeting() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    await provider.send("eth_requestAccounts", []);
    if (!greeting) return
    if (typeof window.etherum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());
      const contract = new ethers.Contract(GreeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreetingValue('')
      await transaction.wait()
      fetchGreeting()
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
        onChange={e => setGreetingValue(e.target.value)}
        placeholder="Set greeting"
        value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
