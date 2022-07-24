import React, {  useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BurnNft from "./BurnNft";
import CloneNFT from "./CloneNFT";


export default function NftMoreDetails(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [nftMetadata, setNftMetadata] = useState({});

  //get meta data info
  const getMetadata = () => {
    const url = `https://api.covalenthq.com/v1/137/tokens/${props.nft.contract_address}/nft_metadata/${props.nft.token_id}/?&key=${process.env.REACT_APP_COVALENT}`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.items[0]);
        setNftMetadata(res.data.items[0]);
        setShow(true);
      });
  };

  

  const cloneNft = () => {
    //save NFT to my files
  };

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
            alt={props.nft.name}
          />
          <p className="text-muted"><small>Data provided by Covalent API</small></p>
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
          {/* show tx , history, trade ,poap */}
        <Button variant="primary" onClick={cloneNft}>
              NFT Analytics
            </Button>
          {nftMetadata.nft_data && !nftMetadata.nft_data[0].burned && (
            <BurnNft nft={props.nft}/>
          )}
          <CloneNFT nft={nftMetadata}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}
