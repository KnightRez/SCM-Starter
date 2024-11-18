import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import "./styles.css";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [choice, setChoice] = useState(undefined);
  const [guessResult, setGuessResult] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    setGuessResult(undefined)
    setResult(undefined);
    document.body.style.backgroundColor = 'white';
    if (atm) {
      let tx = await atm.deposit(10);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    setGuessResult(undefined)
    setResult(undefined);
    document.body.style.backgroundColor = 'white';
    if (atm) {
      let tx = await atm.withdraw(balance);
      await tx.wait()
      getBalance();
    }
  }

  const guess = async(result) => {
    if (atm) {
      let tx = await atm.guess(result);
      await tx.wait()
      getBalance();
    }
  }

  const chooseHeads = async() => {
    document.body.style.backgroundColor = 'white';
    setResult(undefined);
    setChoice("Heads")
    if (Math.random() > 0.5) {
      // console.log("Heads, yes")
      setGuessResult(true);
      guess(true);
    } else {
      // console.log("Heads, no")
      setGuessResult(false);
      guess(false);
    };
  }

  const chooseTails = async() => {
    document.body.style.backgroundColor = 'white';
    setResult(undefined);
    setChoice("Tails")
    if (Math.random() < 0.5) {
      // console.log("Tails, yes")
      setGuessResult(true);
      guess(true);
    } else {
      // console.log("Tails, no")
      setGuessResult(false);
      guess(false);
    };
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <div className={`Details ${result != undefined ? "TextWhite" : ""}`}>
          <p>Account: {account}</p>
          <p>Balance: {balance}</p>
          {choice && <p>You Chose: {choice}</p>}
          {result != undefined && <p>You {result ? "Won" : "Lost"} !</p>}
        </div>
        <div className="Buttons">
          <button onClick={chooseHeads}>Choose Heads</button>
          <button onClick={chooseTails}>Choose Tails</button>
          <button onClick={deposit}>Deposit 10 ETH</button>
          <button onClick={withdraw}>Withdraw All</button>
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);
  useEffect(() => {
    setResult(guessResult);
  }, [balance])

  useEffect(() => {
    if (result) {
      document.body.style.backgroundColor = 'green';
    } else if (result == false && result != undefined) {
      document.body.style.backgroundColor = 'crimson';
    }
  },[result])

  return (
    <main className="container">
      <header><h1>Heads or Tails Simulator</h1></header>
      {initUser()}
    </main>
  )
}
