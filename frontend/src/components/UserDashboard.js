import { ethers } from 'ethers';
import React,{useState,useEffect} from 'react'
import {Form,Button,Modal, Toast} from 'react-bootstrap';
import{toast} from 'react-toastify';



function UserDashboard({account,provider,CreditContract}) {

  /*Form-1 fields */
 const [selectedOption, setSelectedOption] = useState("Individual");
 /*Credit Info fields */
 const [status,setStatus]= useState(false);
 const [creditScore,setCreditScore] = useState(null);
 const [creditLimit, setCreditLimit] = useState("");
 const [type, setType] = useState("");
 const [present, setPresent] = useState("");


 /*Modal fields */
 const [showModal, setShowModal] = useState(false);

 /*dropdown options */
 const options =["Individual","Business"];

 const handleClose = () => setShowModal(false);
 

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
}
}

const handleAccessInfo=async(e)=>{
e.preventDefault();
if(status){
  setShowModal(true);
}
else{
  toast.warn("First get Authorisation from Owner");
}
}

const handleSubmit = async(e)=>{
  e.preventDefault();
 const signer= await provider.getSigner();
 const typeValue =( (selectedOption == "Individual")?0:1);
 console.log(typeValue);
 const tx = await CreditContract.connect(signer).addCreditInfo(typeValue); 
 const receipt = await tx.wait();
 if(receipt){
  toast.success("User Registered");
 }
}

const handleUpdate =async(e)=>{
  e.preventDefault();
  if(selectedOption === type){
   toast.warn("Same as previous Info");
  }
  else{
    const signer= await provider.getSigner();
    const typeValue =( (selectedOption == "Individual")?0:1);
    console.log(typeValue);
    const tx = await CreditContract.connect(signer).updateCreditInfo(typeValue);
    const receipt = await tx.wait();
    if(receipt){
    toast("Successfuly Updated");
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
    <Button variant="primary" style={{ padding: '10px 20px',
    margin: '10px 20px',
    width: "20vw" }} type="submit" onClick={handleUpdate}>
     Update
    </Button>:
    <Button variant="primary" style={{ padding: '10px 20px',
    margin: '10px 20px',
    width: "20vw" }}  
     type="submit" onClick={handleSubmit}>
      Submit
    </Button>
    }
  </Form>
  <Button variant="secondary" style={{ padding: '10px 20px',
margin: '10px 20px',
width: "20vw" }} onClick={handleAccessInfo}>
      AccessInfo
    </Button>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>User Address</Form.Label>
      <Form.Control type="input" value={account ? account : "Your Address"} placeholder="" disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Credit Score</Form.Label>
      <Form.Control type="input" value={creditScore ? creditScore : "0"} placeholder="" disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Credit Limit</Form.Label>
      <Form.Control type="input" value={creditLimit ? creditLimit : "Your Address"} placeholder="" disabled/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>User Type</Form.Label>
      <Form.Control type="input" value={type ? type : "Your Address"} placeholder="" disabled/>
    </Form.Group>
  </Form>
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default UserDashboard;