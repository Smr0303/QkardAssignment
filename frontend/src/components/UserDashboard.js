import { ethers } from 'ethers';
import React,{useState,useEffect} from 'react'
import {Form,Button,Dropdown,Modal, Toast} from 'react-bootstrap';
import{toast} from 'react-toastify';



function UserDashboard({account,provider,CreditContract}) {

  /*Form-1 fields */
 const[address,setAddress] = useState(" ");
 const [selectedOption, setSelectedOption] = useState("Individual");
 /*Credit Info fields */
 const [status,setStatus]= useState(false);
 const [creditScore,setCreditScore] = useState("");
 const [creditLimit, setCreditLimit] = useState("");
 const [type, setType] = useState("");
 const [present, setPresent] = useState("");


 /*Modal fields */
 const [showModal, setShowModal] = useState(true);

 /*dropdown options */
 const options =["Individual","Business"];

 const handleClose = () => setShowModal(false);
 const handleShow = () => setShowModal(true);


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
    const signer = await provider.getSigner();
    const authorisationStatus = await CreditContract.connect(signer).isAuthorised(account);
    if(authorisationStatus){
      setStatus(authorisationStatus);
      const creditInfo = await CreditContract.connect(signer).accessCreditInfo(account);
      const _creditScore =  parseInt(creditInfo.creditScore);
      const _creditLimit = parseInt(creditInfo.creditLimit);
      const type = (1?"Business":"Individual");
      const isPresent = creditInfo.IsPresent;
      setCreditScore(_creditScore);
      setCreditLimit(_creditLimit);
      setPresent(isPresent);
      setType(type);
    }
    else{
      alert(1);
      toast.warn("This account is not authorized first authorise by owner to access credit info");
    }
}
}

useEffect(()=>{
accessCreditInfo();

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
    {status?
    <Button variant="primary" type="submit" onClick={handleSubmit}>
     Update
    </Button>:
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Submit
    </Button>
    }
  </Form>
  <Button variant="secondary"  onClick={accessCreditInfo}>
      accessInfo
    </Button>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default UserDashboard;