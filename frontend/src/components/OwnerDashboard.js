import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function OwnerDashboard({ account, provider, CreditContract }) {
  const [address, setAddress] = useState("");

  const [creditScore, setCreditScore] = useState(null);
  const [paymentCount, setPaymentCount] = useState(null);
  const [creditLimit, setCreditLimit] = useState("");
  const [type, setType] = useState("");
  const [present, setPresent] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const accessCreditInfo = async () => {
    setAddress(address);
    const signer = provider.getSigner();
    const creditInfo = await CreditContract.connect(
      signer
    ).accessCreditInfo_Owner(address);
    const paymentHistory = await CreditContract.connect(signer).paymentHistory(
      address
    );
    const _paymentValue = parseInt(paymentHistory);
    const _creditScore = parseInt(creditInfo.creditScore);
    const _creditLimit = parseInt(creditInfo.creditLimit);
    const type = 1 ? "Business" : "Individual";
    const isPresent = creditInfo.IsPresent;
    console.log(creditInfo);
    setPaymentCount(_paymentValue);
    setCreditScore(_creditScore);
    setCreditLimit(_creditLimit);
    setPresent(isPresent);
    setType(type);
    setShow(true);
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

  const handleCreditLimit = async (e) => {
    e.preventDefault();
    const signer = await provider.getSigner();
    const typeValue = type === "Business" ? 1 : 0;
    const tx = await CreditContract.connect(signer).updateCreditInfo_Owner(
      address,
      creditScore,
      creditLimit,
      typeValue
    );
    toast.success("Updating... Please remain stanby");
    const receipt = await tx.wait();
    if (receipt) {
      toast("Successfully updated all the Info");
    }
  };
  const handlePaymentHistory = async (e) => {
    const signer = await provider.getSigner();
    const tx = await CreditContract.connect(signer).updatePaymentHistory(
      address,
      paymentCount
    );
    toast.success("Updating....Please remain stanby");
    const receipt = await tx.wait();
    if (receipt) {
      toast("Payment history updated");
    }
  };
  const calculateCreditScore = async (e) => {
    const signer = await provider.getSigner();
    const tx = await CreditContract.connect(signer).calculateCreditScore(
      address
    );
    toast.success("Updating....Please remain stanby");
    const receipt = await tx.wait();
    if (receipt) {
      const info = await CreditContract.connect(signer).accessCreditInfo(
        address
      );
      setCreditScore(parseInt(info.creditScore));
      toast("Credit score Updated");
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Address</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Users Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              console.log(e.target.value);
            }}
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
            onClick={accessCreditInfo}
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
                value={address}
                placeholder="Your Address"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Credit Score</Form.Label>
              <Form.Control
                type="input"
                value={creditScore}
                placeholder=""
                disabled
              />
              <Button
                style={{
                  padding: "10px 20px",
                  margin: "10px 20px",
                  width: "20vw",
                }}
                onClick={calculateCreditScore}
              >
                Calculate credit Score
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Credit Limit</Form.Label>
              <Form.Control
                type="input"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
                placeholder="Enter Credit Limit"
              />
              <Button
                style={{
                  padding: "10px 20px",
                  margin: "10px 20px",
                  width: "20vw",
                }}
                onClick={handleCreditLimit}
              >
                Update Credit Limit
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Type</Form.Label>
              <Form.Control type="input" value={type} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Payment Count</Form.Label>
              <Form.Control
                type="input"
                value={paymentCount}
                onChange={(e) => setPaymentCount(e.target.value)}
                placeholder="Enter total transactions by user"
              />
              <Button
                variant="primary"
                style={{
                  padding: "10px 20px",
                  margin: "10px 20px",
                  width: "20vw",
                }}
                onClick={handlePaymentHistory}
              >
                Update Payments
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
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
  );
}

export default OwnerDashboard;
