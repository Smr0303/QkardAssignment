import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./constants/abi.json";
import config from "./constants/config.json";
import OwnerDashboard from "./components/OwnerDashboard";
import UserDashboard from "./components/UserDashboard";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [CreditContract, setCreditContract] = useState(null);
  const ownerAddress = "0x1d7803057f8cf1f5175B6ea0c3B268138485d714";

  const loadBlockchainData = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install metamask");
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      
      const creditInfo = await new ethers.Contract(
        config[network.chainId].creditInfo.address,
        abi,
        provider
        );
        setCreditContract(creditInfo);
        
        //On account change automatically update the account
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
      });
    }
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <Nav account={account} setAccount={setAccount} />
      {console.log(account,ownerAddress)}
      {(account == ownerAddress)?
      <OwnerDashboard
      account={account}
        provider={provider}
        CreditContract={CreditContract}/>:
      <UserDashboard
        account={account}
        provider={provider}
        CreditContract={CreditContract}
      />
  }
    </div>
  );
}

export default App;
