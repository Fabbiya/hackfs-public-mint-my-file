import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function NftMoreDetails(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const [nftMetadata, setNftMetadata] = useState({});

  //get meta data info
  const getMetadata = () => {
    //https://api.covalenthq.com/v1/137/tokens/${props.nft.contract_address}/nft_metadata/${props.nft.token_id}/?key=ckey_46c7c91b16d442c49cf9cc35ddd
    const url = `https://api.covalenthq.com/v1/137/tokens/${props.nft.contract_address}/nft_metadata/${props.nft.token_id}/?&key=${process.env.REACT_APP_COVALENT}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.items[0]);
        setNftMetadata(res.data.items[0]);
        setShow(true);
      });
  };

  const burnNft = () => {
    // const formData = new FormData();
    // formData.append("chain", "polygon");
    // formData.append("contract_address", props.nft.contract_address);
    // formData.append("token_id", props.nft.token_id);
    const data = {
      chain:'polygon',
      contract_address:props.nft.contract_address,
      token_id:props.nft.token_id
    }
    let url = "https://api.nftport.xyz/v0/mints/customizable";

    let options = {
      method: "DELETE",
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_NFTPORT,
      },
    };

    console.log(options);

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (responsejson) {
        console.log("burn data", responsejson);
      });
  };

  const cloneNft=()=>{
    //save NFT to my files
    
  }

  return (
    <>
      <Button variant="primary" onClick={getMetadata}>
        More Details...
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.nft.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100">
          <img
            className="w-100"
            src={props.nft.file_url.replace("ipfs://", "https://ipfs.io/ipfs/")}
          />
          <p>Token ID: {props.nft.token_id}</p>
          <p>
            Token URL:{" "}
            {nftMetadata.nft_data && nftMetadata.nft_data[0].token_url}
          </p>
          <p>
            supports:{" "}
            {nftMetadata.nft_data &&
              nftMetadata.nft_data[0].supports_erc.map((x) => `${x} - `)}
          </p>
          <p>Contract: {props.nft.contract_address}</p>
          <p>
            Creator:{" "}
            {nftMetadata.nft_data && nftMetadata.nft_data[0].original_owner}
          </p>
          <p>Owner: {nftMetadata.nft_data && nftMetadata.nft_data[0].owner}</p>

          <p>Description: {props.nft.description}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          {nftMetadata.nft_data && !nftMetadata.nft_data[0].burned && (
            <Button variant="primary" onClick={burnNft}>
              Burn NFT
            </Button>
          )}
          <Button variant="primary" onClick={cloneNft}>
              Clone NFT
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
