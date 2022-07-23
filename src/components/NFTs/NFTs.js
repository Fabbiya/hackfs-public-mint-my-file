import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {Card,Row,Col} from "react-bootstrap";
import TransferNFT from "./TransferNFT";
import NftCard from "./NftCard";

export default function NFTs(props) {
  // const { authenticate, isAuthenticated, user } = useMoralis();
  const [nfts, setNfts] = useState([]);

  const getNFTs = () => {
    const options = {
      headers: {
        Authorization: process.env.REACT_APP_NFTPORT,
      },
    };

    fetch(
      `https://api.nftport.xyz/v0/accounts/${props.wallet}?` +
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
  };

  useEffect(() => {
    if (props.wallet) {
      getNFTs();
    }
    
  }, [props]);

  return (
    <div>
      {/* <h3>Your NFTs</h3> */}
      <Row>
      {nfts && nfts.map((item, index) => {
        return (
          <Col lg={4} className="my-2" key={index}>
          <NftCard item={item}/>
          </Col>
        );
      })}
      </Row>
    </div>
  );
}
