import React from 'react'
import { Container, Row,Col} from 'react-bootstrap'
import MintFiles from './MintFiles'
import MintMetadata from './MintMetadata'
//import { Web3Storage } from 'web3.storage'


export default function Files() {
    
  return (
    <Container>
      <Row>
        <Col lg={6}>
        <MintFiles/>
        </Col>
        <Col lg={6}>
          <MintMetadata/>
        </Col>
      </Row>
    </Container>
  )
}
