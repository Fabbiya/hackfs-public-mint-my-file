import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {Card,Row,Col} from "react-bootstrap";

export default function NFTs() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [nfts, setNfts] = useState([]);

  const getNFTs = () => {
    const options = {
      headers: {
        Authorization: "4e0b1363-ad8a-4c2c-a61f-4a7a36837416",
      },
    };

    if (isAuthenticated) {
        fetch(
            `https://api.nftport.xyz/v0/accounts/${user.get("ethAddress")}?` +
              new URLSearchParams({
                chain: "polygon",
              }),
            options
          )
            .then(function(response) {
              return response.json();
            })
            .then(function(responseJson) {
              // Handle the response
              console.log(responseJson);
              setNfts(responseJson.nfts)
            });
    } else {
      authenticate({
        provider: "web3Auth",
        clientId:
          "BNpM3CsdDKc_Ha5Fg2wVZhSofC40SotXCyLPn9HkQfqkk46h3iJfcgPXs32jd4oTXy1NYqQzkQoWw_solPJHan4",
      })
        .then(function(user) {
          
          fetch(
            `https://api.nftport.xyz/v0/accounts/${user.get("ethAddress")}?` +
              new URLSearchParams({
                chain: "polygon",
              }),
            options
          )
            .then(function(response) {
              return response.json();
            })
            .then(function(responseJson) {
              // Handle the response
              console.log(responseJson);
              setNfts(responseJson.nfts)
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div>
      <h3>Your NFTs</h3>
      <Row>
      {nfts.map((item, index) => {
        return (
          <Col lg={4} className="my-2">
          <Card  key={index}>
            <Card.Img variant="top" src={item.file_url.replace("ipfs://","https://ipfs.io/ipfs/")} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
              
            </Card.Body>
          </Card>
          </Col>
        );
      })}
      </Row>
    </div>
  );
}
