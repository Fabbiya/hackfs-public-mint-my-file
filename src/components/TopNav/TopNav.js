import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Web3Login from '../Web3Login/Web3Login';
import { useMoralis } from "react-moralis";

export default function TopNav() {
    const { logout } = useMoralis();
    const logOut = async () => {
        await logout();
        console.log("logged out");
      }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">Mint My File</Navbar.Brand>
      <Nav className='ms-auto'>
      
          <Web3Login/>
        
        </Nav>
      </Container>
    </Navbar>
  )
}
