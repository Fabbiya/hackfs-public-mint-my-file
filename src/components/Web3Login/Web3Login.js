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

  //   const login = async () => {
  //     if (!isAuthenticated) {

  //       await authenticate({signingMessage: "Log in to HACKFS - Mint My File" })
  //         .then(function (user) {
  //           console.log("logged in user:", user);
  //           console.log(user.get("ethAddress"));
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  //     }
  //   }

  const login = async () => {
    console.log("account", account);
    if (account === null) {
      await authenticate({
        provider: "web3Auth",
        clientId:
          "BNpM3CsdDKc_Ha5Fg2wVZhSofC40SotXCyLPn9HkQfqkk46h3iJfcgPXs32jd4oTXy1NYqQzkQoWw_solPJHan4",
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
