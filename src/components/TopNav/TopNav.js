import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Chains from '../Chains/Chains';

import Web3Login from '../Web3Login/Web3Login';


export default function TopNav() {
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">Mint My File</Navbar.Brand>
      <Nav className='ms-auto'>
       <Chains/>
          <Web3Login/>
        
        </Nav>
      </Container>
    </Navbar>
  )
}
