import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useMoralis } from "react-moralis";
import { CDBBtn } from "cdbreact";

export default function Web3Login() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
  } = useMoralis();


  const login =  () => {
    console.log("account", account);
    if (account === null) {
      authenticate({
        provider: "web3Auth",
        clientId:
        process.env.REACT_APP_WEB3AUTH_CLIENT,
        chainId:"0x89"
      })
        .then(function(user) {
          console.log(user.get("ethAddress"));
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  if (isAuthenticated && account) {
    return (
      <>
        <CDBBtn color="dark" outline circle onClick={login}>
          {account.substring(0, 4)} ... {account.substring(account.length - 4)}
        </CDBBtn>
      </>
    );
  }

  return (
    <>
      <CDBBtn
        onClick={login}
        color="dark"
        style={{ width: "120px" }}
        outline
        circle
      >
        Login
      </CDBBtn>
    </>
  );
}
