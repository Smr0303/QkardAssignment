import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function OwnerDashboard({ account, provider, CreditContract }) {
  const [address, setAddress] = useState("SomeAddress");

  const [creditScore,setCreditScore] = useState(null);
  const [paymentCount,setPaymentCount] = useState(0);
  const [creditLimit, setCreditLimit] = useState("");
  const [type, setType] = useState("");
  const [present, setPresent] = useState("");

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const accessCreditInfo = async () => {
    const signer = provider.getSigner();
    const creditInfo = await CreditContract.connect(
      signer
    ).accessCreditInfo_Owner(address);
    console.log(creditInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address) {
      const signer = provider.getSigner();
      const tx = await CreditContract.connect(signer).authoriseUser(address);
      toast.success("Wait few Minutes: Transaction Is Processing");
      const receipt = await tx.wait();
      if (receipt) {
        toast(`Address: ${address} authorised`);
      }
    } else {
      toast.error("Enter valid address");
    }
  };

  const handleAccessCreditInfo = async (e) => {
    setShow(true);
    setAddress(address);
  };

  const handleCreditLimit = async (e) => {};
  const handlePaymentHistory = async (e) => {};
  const calculateCreditScore=async (e)=>{
  }

  useEffect(() => {

  });

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Address</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Users Address"
            value={address}
            onChange={(e) => {setAddress(e.target.value)
            console.log(e.target.value)}}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Button
            style={{ padding: "10px 20px", margin: "10px 20px", width: "10vw" }}
            onClick={handleSubmit}
          >
            Authorise
          </Button>
          <Button
            variant="dark"
            style={{ padding: "10px 20px", margin: "10px 20px", width: "30vw" }}
            onClick={handleAccessCreditInfo}
          >
            Access And Update Info
          </Button>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Address</Form.Label>
              <Form.Control
                type="input"
                value={address }
                placeholder="Your Address"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Credit Score</Form.Label>
              <Form.Control
                type="input"
                value={creditScore ? creditScore : "0"}
                placeholder=""
                disabled
              />
              <Button
            style={{ padding: "10px 20px", margin: "10px 20px", width: "20vw" }}
            onClick={calculateCreditScore}
          >
            Calculate credit Score
          </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Credit Limit</Form.Label>
              <Form.Control
                type="input"
                value={creditLimit ? creditLimit : "Your Address"}
                placeholder="Enter Credit Limit"
              />
                <Button
            style={{ padding: "10px 20px", margin: "10px 20px", width: "20vw" }}
            onClick={handleCreditLimit}
          >
            Update Credit Limit
          </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                type="input"
                value={type ? type : "Your Address"}
                placeholder=""
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Count</Form.Label>
              <Form.Control
                type="input"
                value={paymentCount ?. paymentCount }
                placeholder="Enter total transactions by user"
              />
            <Button variant="primary" style={{ padding: "10px 20px", margin: "10px 20px", width: "20vw" }} onClick={handlePaymentHistory}>
            Update Payments
          </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OwnerDashboard;
