import React,{useState} from 'react'
import { Button } from 'react-bootstrap';

function OwnerDashboard({account,provider,CreditContract}) {
const [address,setAddress]=useState("");

const accessCreditInfo= async()=>{
  const signer = provider.getSigner();
    const creditInfo = await CreditContract.connect(signer).accessCreditInfo_Owner(address);
    console.log(creditInfo);
}

const handleSubmit = async(e)=>{
 e.preventDefault();
 if(address){
  const signer = provider.getSigner();
  const tx = await CreditContract.connect(signer).authoriseUser(address);
  const receipt = await tx.wait();
  console.log(tx,receipt);
 }
  }
  

  return (
    <div>
      <form> 
        <input type="string" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <Button onClick={handleSubmit}>
      Authorise</Button>
        </form>
        <Button onClick={accessCreditInfo}>
      Access</Button>
        </div>
  )
}

export default OwnerDashboard