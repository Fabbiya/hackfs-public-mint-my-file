import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import NFTs from "../NFTs/NFTs";
// import SyncSocial from '../SyncSocial/SyncSocial'
import { useMoralis } from "react-moralis";
import NativeBalance from "../NativeBalance/NativeBalance";

export default function Profile() {
  const [account, setAccount] = useState();
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
  } = useMoralis();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("test");
      authenticate({
        provider: "web3Auth",
        clientId: process.env.REACT_APP_WEB3AUTH_CLIENT,
        chainId: "0x89",
      })
        .then(function(user) {
          console.log(user.get("ethAddress"));
          setAccount(user.get("ethAddress"));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      setAccount(user.get("ethAddress"));
    }
  }, []);

  return (
    <Container>
      <div>
        <h3>Profile details </h3>
        <Table>
          <tbody>
            <tr>
              <td>Wallet address</td>
              <td>{account}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>
                <NativeBalance wallet={account} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <h2>Your NFTs</h2>
      <NFTs wallet={account} />
      <h2>Your Files</h2>
    </Container>
  );
}
