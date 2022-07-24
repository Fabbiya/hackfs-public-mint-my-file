import React, { useState } from "react";
import { Alert, Container,Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { CDBBtn } from "cdbreact";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { useMoralis } from "react-moralis";
import { saveMintedNFT } from "../../helpers/FileData";


export default function MintNFTs() {
  const [form, setForm] = useState({});
  const[isLoading,setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('3');
  const radios = [
    { name: 'Polygon', value: '1' },
    { name: 'Ethereum', value: '2' },
    { name: 'Rinkeby', value: '3' },
    { name: 'Mumbai', value: '4' },
    { name: 'Goerli', value: '5' },
    { name: 'Solana', value: '6' },
  ];
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
    setIsLoading(true)
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
          console.log("NFT",responseJson);
          if(responseJson.response==="OK"){
            setAlert({
              message: `NFT successfully deployed with contract address : ${responseJson.contract_address}`,
              link: `${responseJson.transaction_external_url}`,
              variant: "success",
              linkText:"View Transaction"
            });
            saveMintedNFT(data,address)
            setIsLoading(false)
          }
          else{
            setAlert({
              message: `An error occured. Please try again later`,
              link: `#`,
              variant: "danger",
              linkText:""
            });
            setIsLoading(false)
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
    <Container>
      <a href="/">Back to menu</a>
      <h2>Mint your NFT</h2>
      <p>
        Here you can mint any asset as an NFT to your account. Please fill all
        the fields
      </p>
      <Alert
        variant={alert.variant}
        onClose={() => setShowAlert(false)}
        dismissible
        show={showAlert}
      >
        {alert.message}
        <br />
        <Alert.Link href={alert.link} target="_blank">
          {alert.linkText}
        </Alert.Link>
      </Alert>
      <p>Select Network to Mint NFT</p>
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
      <Form className="my-5">
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
          
          {(isLoading)?<Spinner animation="border" />:"Mint NFT"}
        </CDBBtn>
      </Form>

      
    </Container>
  );
}
