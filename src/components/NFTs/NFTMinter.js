import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import Modal from "react-bootstrap/Modal";
import { useMoralis } from "react-moralis";

export default function NFTMinter() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { authenticate, isAuthenticated, user, account } = useMoralis();
  const [alert, setAlert] = useState({
    message: ``,
    link: ``,
    variant: "success",
    show: false,
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleOnChangeFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const mintNFT = () => {
    if (isAuthenticated) {
      const address = user.get("ethAddress");
      setForm({ ...form, minterAddress: user.get("ethAddress") });
      console.log("minter address", address);
      const data = new FormData();
      data.append("file", form.file);

      const options = {
        method: "POST",
        body: data,
        headers: {
          Authorization: process.env.REACT_APP_NFTPORT,
        },
      };
      console.log("options", options);
      fetch(
        "https://api.nftport.xyz/v0/mints/easy/files?" +
          new URLSearchParams({
            chain: "polygon",
            name: form.name,
            description: form.description,
            mint_to_address: address,
          }),
        options
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(responseJson) {
          // Handle the response
          console.log(responseJson);
          setAlert({
            message: `NFT successfully deployed with contract address : ${responseJson.contract_address}`,
            link: `${responseJson.transaction_external_url}`,
            variant: "success",
          });
          setShowAlert(true);
        });
    } else {
      setShow(false);
      authenticate({
        provider: "web3Auth",
        clientId:
          process.env.REACT_APP_WEB3AUTH_CLIENT,
      })
        .then(function(user) {
          console.log(user.get("ethAddress"));
          setForm({ ...form, minterAddress: user.get("ethAddress") });
          handleShow(true);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Alert
        variant={alert.variant}
        onClose={() => setShowAlert(false)}
        dismissible
        show={showAlert}
      >
        {alert.message}
        <br />
        <Alert.Link href={alert.link} target="_blank">
          View Transaction
        </Alert.Link>
      </Alert>

      <Button variant="primary" onClick={handleShow}>
        Mint NFT
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>NFT Minter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name your NFT</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your NFT"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleOnChange} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose your NFT</Form.Label>
              <Form.Control type="file" onChange={handleOnChangeFile} />
            </Form.Group>

            <CDBBtn color="primary" outline circle onClick={mintNFT}>
              Mint NFT
            </CDBBtn>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
