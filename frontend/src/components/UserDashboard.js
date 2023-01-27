import React,{useState,useEffect} from 'react'
import {Form,Button,Dropdown} from 'react-bootstrap';



function UserDashboard({account,provider,CreditContract}) {

 const[address,setAddress] = useState(" ");
 const [selectedOption, setSelectedOption] = useState("Individual");
 const options =["Individual","Business"];


const handleSubmit = async(e)=>{
  e.preventDefault();
  await setAddress(account);
  const signer= await provider.getSigner();
 const tx = await CreditContract.connect(signer).addCreditInfo(1); 
 const receipt = await tx.wait();
 console.log(receipt);
}


const accessCreditInfo= async()=>{
  if(account){
    console.log(account);
    const creditInfo = await CreditContract.accessCreditInfo(account);
    console.log(creditInfo);
}
}

useEffect(()=>{


},[account])

  return (
    <div>
    <Form type="submit">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>User Address</Form.Label>
      <Form.Control type="input" value={account ? account : "Your Address"} placeholder="" disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <label>
      Organisation Type
      <br/>
        <select
          value={selectedOption?selectedOption:"Select a Option"}
          onChange={e => setSelectedOption(e.target.value)}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
  </Form>
  <Button variant="secondary"  onClick={accessCreditInfo}>
      accessInfo
    </Button>
  </div>
  )
}

export default UserDashboard;