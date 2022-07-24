import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMoralis } from "react-moralis";
import { saveMintedNFT } from "../../helpers/FileData";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import { Alert, Container, Spinner } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
export default function CloneNFT(props) {
  const [show, setShow] = useState(false);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const handleShow = () => {
    setShow(true);
    console.log(props.nft);
  };
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState({
    message: ``,
    link: ``,
    variant: "success",
    show: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const radios = [
    { name: "Polygon", value: "1" },
    { name: "Rinkeby", value: "2" },
    { name: "Ethereum", value: "3" },
  ];
  const mintNFT = () => {
    setIsLoading(true);
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

      fetch(
        "https://api.nftport.xyz/v0/mints/easy/files?" +
          new URLSearchParams({
            chain: "polygon", //change chain to dynamic data -- mumbai polygon, eth - rinkeby,kovan,ropsten, goerly
            name: form.name,
            description: form.description,
            mint_to_address: address,
          }),
        options
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (responseJson) {
          console.log("NFT", responseJson);
          if (responseJson.response === "OK") {
            setAlert({
              message: `NFT successfully deployed with contract address : ${responseJson.contract_address}`,
              link: `${responseJson.transaction_external_url}`,
              variant: "success",
              linkText: "View Transaction",
            });
            saveMintedNFT(data, address);
            setIsLoading(false);
          } else {
            setAlert({
              message: `An error occured. Please try again later`,
              link: `#`,
              variant: "danger",
              linkText: "",
            });
            setIsLoading(false);
          }
          setShowAlert(true);
        });
    } else {
      authenticate({
        provider: "web3Auth",
        clientId: process.env.REACT_APP_WEB3AUTH_CLIENT,
      })
        .then(function (user) {
          console.log(user.get("ethAddress"));
          setForm({ ...form, minterAddress: user.get("ethAddress") });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Clone NFT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>NFT Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="my-5">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>NFT Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your NFT"
                onChange={handleOnChange}
                value={props.nft.nft_data[0].external_data.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleOnChange}
                value={props.nft.nft_data[0].external_data.name}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>NFT Image</Form.Label>
              <img
                className="w-100"
                src={props.nft.nft_data[0].external_data.image}
                alt={props.nft.nft_data[0].external_data.name}
              />
            </Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>Select a network to launch</p>

          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-primary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          {/* <CDBBtn color="primary" outline circle onClick={mintNFT}>
              {isLoading ? <Spinner animation="border" /> : "Mint NFT"}
            </CDBBtn> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
