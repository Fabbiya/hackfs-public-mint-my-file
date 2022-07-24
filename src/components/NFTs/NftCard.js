import React from "react";
import { Card } from "react-bootstrap";
import NftMoreDetails from "./NftMoreDetails";
import TransferNFT from "./TransferNFT";
export default function NftCard(props) {
  return (
    <>
      <Card className="h-100">
        {/* https://bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjwy.ipfs.nftstorage.l */}
        
        <Card.Img
          variant="top"
          src={props.item.file_url.replace("ipfs://", "https://nftstorage.link/ipfs/")}
        />
        <Card.Body>
          <Card.Title>{props.item.name}</Card.Title>
          <Card.Text>Images come from nftstorage.link gateway</Card.Text>
          <Card.Text>{props.item.description}</Card.Text>

        </Card.Body>
        <Card.Footer>
            <div className="d-flex">
            <TransferNFT nft={props.item} />
            <NftMoreDetails nft={props.item} />
            </div>
          
        </Card.Footer>
      </Card>
    </>
  );
}
