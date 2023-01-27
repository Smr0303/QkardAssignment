import React,{useState,useEffect} from "react";
import {ethers} from "ethers";
import OwnerDashboard from "./components/OwnerDashboard";
import UserDashboard from "./components/UserDashboard";
import Nav from "./components/Nav";



function App() {
 const [account,setAccount] = useState(null);
 const [provider,setProvider] = useState(null);

  const loadBlockchainData = async()=>{
    if(typeof window.ethereum === "undefined"){
      alert("Please install metamask");
    }
    else{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      //On account change automatically update the account
      const network = await provider.getNetwork();

      window.ethereum.on("accountsChanged", async() =>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account); 
        
      }) 
      
    }
  }
  useEffect(()=>{
  loadBlockchainData();
  },[])

  return (
    <div className="App">
      <Nav account={account} setAccount={setAccount}/>
    </div>
  );
}

export default App;
