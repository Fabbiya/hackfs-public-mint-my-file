import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { CDBBtn } from "cdbreact";
import Spinner from 'react-bootstrap/Spinner';

export default function Web3Login() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    account,
  } = useMoralis();


  const login =  () => {
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

  const { logout } = useMoralis();
  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(() => {
    login()
  }, [])
  

  if (isAuthenticated && account) {
    return (
      <>
        <CDBBtn color="dark" outline circle onClick={logOut} disabled={isAuthenticating}>
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
        disabled={isAuthenticating}
      >
        {(isAuthenticating)?(<Spinner animation="border" variant="dark" />):"Login"}
        
      </CDBBtn>
    </>
  );
}
