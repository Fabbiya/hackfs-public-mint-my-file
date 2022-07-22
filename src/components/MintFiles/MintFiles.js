import React from 'react'
import {Container} from "react-bootstrap"

import NFTMinter from './NFTMinter';
import NFTs from './NFTs';

export default function MintFiles() {

  return (
    <Container fluid className='my-3'>
      <NFTMinter/>
      <NFTs/>

    </Container>
  )
}
