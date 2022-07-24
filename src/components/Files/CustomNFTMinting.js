import React, { useState,useEffect } from "react";
import { CDBBtn } from "cdbreact";
import { Spinner } from "react-bootstrap";
import { saveMintedNFT } from "../../helpers/FileData";
import { useMoralis } from "react-moralis";

export default function CustomNFTMinting(props) {
  const [isLoading, setIsLoading] = useState();
  const [address, setAddress] = useState();
  const { authenticate, isAuthenticated, user ,account} = useMoralis();
  useEffect(() => {
    if (account === null) {
        authenticate({
          provider: "web3Auth",
          clientId:
          process.env.REACT_APP_WEB3AUTH_CLIENT,
          chainId:"0x89"
        })
          .then(function(user) {
            console.log("user",user.get("ethAddress"));
           setAddress(user.get("ethAddress"))

          })
          .catch(function(error) {
            console.log(error);
          });
      }
   
  }, []);
  const mintNft = () => {
    setIsLoading(true)
    const data={
        chain:"polygon",
        contract_address: "0xA2c45b5C2333Cb2b574b4AC8f28848dCDba647Db",
        metadata_uri:props.metadata,
        mint_to_address:address
    }
    console.log("data",data)
    fetch("https://api.nftport.xyz/v0/mints/customizable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_NFTPORT,
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json()
      }).then((responsJson) => {
        if(responsJson.response === "OK"){
            //save minted data to db
            console.log(responsJson)
            saveMintedNFT(responsJson,props.address)
            setIsLoading(false)
        }
        else{
            console.log(responsJson)
            setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <CDBBtn color="primary" outline circle onClick={mintNft}>
        {isLoading ? <Spinner animation="border" /> : "Mint Your Data as NFT "}
      </CDBBtn>
    </>
  );
}
