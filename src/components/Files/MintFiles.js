import React, { useEffect, useState } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { useMoralis } from "react-moralis";
import { CDBBtn } from "cdbreact";
import { saveFileToMintFiles } from "../../helpers/FileData";

export default function MintFiles() {
  const [file, setFile] = useState();
  const [address, setAddress] = useState();
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const handleOnChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const mintFile = () => {
    if (isAuthenticated) {
      const form = new FormData();
      form.append("file", file);

      const options = {
        method: "POST",
        body: form,
        headers: {
          Authorization: process.env.REACT_APP_NFTPORT,
        },
      };

      fetch("https://api.nftport.xyz/v0/files", options)
        .then((response) => {
          return response.json();
        })
        .then(function (responseJson) {
          console.log(responseJson);
          if (responseJson.response === "OK") {
            setAlert({
              type: "success",
              message: "data Uploaded to IPFS successfully",
              title: "Upload Successfull!",
            });
            setShowAlert(true);
          } else {
            setAlert({
              type: "danger",
              message: "An error occured please try again later",
              title: "Error",
            });
            setShowAlert(true);
          }
          //write data to moralis db

          saveFileToMintFiles(responseJson, address);
        })
        .catch((err) => {
          console.error(err);
          setAlert({
            type: "danger",
            message: "An error occured please try again later",
            title: "Error",
          });
          setShowAlert(true);
        });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate({
        provider: "web3Auth",
        clientId: process.env.REACT_APP_WEB3AUTH_CLIENT,
        chainId: "0x89",
      })
        .then(function (user) {
          setAddress(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setAddress(user.get("ethAddress"));
    }
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-0">Mint a new file</h2>
      <p className="text-muted mt-0">
        <small>Powered By NFTPORT</small>
      </p>
      <p>Select your file from your device to be minted on IPFS</p>
      {showAlert && (
        <Alert
          variant={alert.type}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading>{alert.title}</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
      )}
      <Form className="my-5">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose your File</Form.Label>
          <Form.Control type="file" onChange={handleOnChangeFile} />
        </Form.Group>
        <CDBBtn color="primary" outline circle onClick={mintFile}>
          Mint Your File
        </CDBBtn>
      </Form>

{/* {result &&
( result.content_type.split("/")[0] === "image") ? (
  <img src={result.ipfs_url} className="w-100" />
) : (
  <FileViewer
    fileType={result.content_type.split("/").pop() || ""}
    filePath={result.ipfs_url}
  />
)

} */}
    </Container>
  );
}
