
import React, { useState, useEffect } from "react";
import { Col, Container, Form, Alert, Row,Spinner } from "react-bootstrap";
import { CDBBtn } from "cdbreact";
import { useMoralis } from "react-moralis";
import "./MintMetadata.css";
import { saveMintedMetadata } from "../../helpers/FileData";
import CustomNFTMinting from "./CustomNFTMinting";
export default function MintMetadata() {
  const [form, setForm] = useState({});
  const [address, setAddress] = useState();
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [myFiles, setMyFiles] = useState([]);
  const [alert, setAlert] = useState({});
  const[showAlert,setShowAlert] = useState(false)
  const[isLoading,setIsLoading] = useState(false)
  const[metadata,setMetadata] = useState();
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleOnChangeFile = (e) => {
    setForm({ ...form, file: e.target.value });
  };

  const getFiles = () => {
    
    fetch("https://api.nftport.xyz/v0/me/storage?type=file", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_NFTPORT,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson.storage);
        setMyFiles(responseJson.storage);
        
      })
      .catch((err) => {
        console.error(err);
        
      });
  };
  const mintMetadata = () => {
    setIsLoading(true)
    if (isAuthenticated) {
      const data = {
        description:form.description,
        name:form.name,
        file_url:form.file,
        custom_fields:{
          author:form.author,
          twitter:form.twitter,
          telegram:form.telegram,
          portfolio:form.portfolio
        }
      }
      console.log("data",JSON.stringify(data))
      fetch("https://api.nftport.xyz/v0/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.REACT_APP_NFTPORT,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        }).then((responseJson) => {
          const dbData = {...form,fileUrl: responseJson.file_url,metadataUri: responseJson.metadata_uri,customFields: responseJson.custom_fields }
          setMetadata(responseJson.metadata_uri)
          const res = saveMintedMetadata(dbData,address)
          setAlert ({
            type:"success",
            message:"data added successfully",
            title:"Done!"
          })
          setShowAlert(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(err);
          setAlert ({
            type:"danger",
            message:"An error occured please try again later",
            title:"Error"
          })
          setShowAlert(true)
          setIsLoading(false)
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
    getFiles();
  }, []);

  return (
    <Container className="my-5">
      
      <h2 className="mb-0">Mint Metadata for your file</h2>
      <p className="text-muted mt-0">
        <small>Powered By NFTPORT</small>
      </p>
      <p>Here your can mint metadata of your file </p>
      {showAlert && <Alert variant={alert.type} onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{alert.title}</Alert.Heading>
        <p>
          {alert.message}
        </p>
      </Alert>}
      <Form className="my-5">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>your Metadata Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a name for your Metadata"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="twitter">
          <Form.Label>Link to twitter</Form.Label>
          <Form.Control
            type="text"
            placeholder="Creator Twitter"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="telegram">
          <Form.Label>Link to Telegram</Form.Label>
          <Form.Control
            type="text"
            placeholder="Creator Telegram "
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="portfolio">
          <Form.Label>Link to Protfolio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Creator portfolio Link"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="file_url" className="mb-3">
          <Form.Label>Choose From your files</Form.Label>
          <Row>
            {myFiles &&
              myFiles.map((item, index) => {
                return (
                  <Col key={index}>
                    <input
                      type="radio"
                      name="imgbackground"
                      id={item.ipfs_uri.replace("ipfs://", "").replace("/", "")}
                      className="d-none imgbgchk"
                      value={item.ipfs_url}
                      onChange={handleOnChangeFile}
                    />
                    <label
                      htmlFor={item.ipfs_uri
                        .replace("ipfs://", "")
                        .replace("/", "")}
                    >
                      <img src={item.ipfs_url} alt={item.file_name} 
                      className=" rounded"/>
                      <div className="tick_container">
                        <div className="tick">
                          <i className="fa fa-check"></i>
                        </div>
                      </div>
                    </label>
                  </Col>
                );
              })}
          </Row>
        </Form.Group>

        <CDBBtn color="primary" outline circle onClick={mintMetadata}>
          
          {(isLoading)?<Spinner animation="border" />:"Mint Metadata "}
        </CDBBtn>
      </Form>
      <CustomNFTMinting address={address} metadata={metadata} />
    </Container>
  );
}
