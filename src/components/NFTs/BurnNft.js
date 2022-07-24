import React, { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import Button from "react-bootstrap/Button";
export default function BurnNft(props) {
  const [tx, setTx] = useState({});
  //burn NFT
  const { fetch, error, isFetching } = useWeb3Transfer({
    receiver: "0x0000000000000000000000000000000000000000",
    contractAddress: props.nft.contract_address,
    tokenId: props.nft.token_id,
    type: "erc721",
    chainId: "0x89",
  });

  return (
    <>
    {tx.hash && <p>Transaction success! <br/> <a href={`https://polygonscan.com/tx/${tx.hash}`} target="_blank">View on polygonScan</a></p>}
    <Button
      variant="primary"
      onClick={() =>
        fetch({
          onSuccess: (transaction) => {
            console.log("burn transaction", transaction);
            setTx(transaction);
          },
        })
      }
      disabled={isFetching}
    >
      Burn NFT
    </Button>
    </>
  );
}
