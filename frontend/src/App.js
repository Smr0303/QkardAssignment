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
        window.location.reload();
      });
    }
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      {console.log(process.env.REACT_APP_OWNER_ADDRESS)}
      <Nav account={account} setAccount={setAccount} />
      {account == process.env.REACT_APP_OWNER_ADDRESS ? (
        <OwnerDashboard
          account={account}
          provider={provider}
          CreditContract={CreditContract}
        />
      ) : (
        <UserDashboard
          account={account}
          provider={provider}
          CreditContract={CreditContract}
        />
      )}
    </div>
  );
}

export default App;
