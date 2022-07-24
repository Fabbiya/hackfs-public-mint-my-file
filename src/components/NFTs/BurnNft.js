import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useWeb3Transfer } from "react-moralis";

export default function BurnNft(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [tx, setTx] = useState({});

  const { fetch, error, isFetching } = useWeb3Transfer({
    receiver: "0x000000000000000000000000000000000000dEaD",
    contractAddress: props.nft.contract_address,
    tokenId: props.nft.token_id,
    type: "erc721",
    chainId: "0x89",
  });

  return (
    <div>
      <Button
        variant="primary"
        onClick={() =>
          fetch({
            onSuccess: (tx) => {
              console.log("transaction", tx.hash);
              setTx(tx);
              setShow(true);
            },
          })
        }
        disabled={isFetching}
      >
        Burn
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <a href={`https://polygonscan.com/tx/${tx.hash}`} target="_blank">
            View on polygonScan
          </a>
        </Modal.Body>
      </Modal>
    </div>
  );
}
