import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ManageFiles from '../FileManager/ManageFiles'
export default function Dashboard() {
  return (
    <Container>
      <h2>Welcome to Mint My Files</h2>
      <Row>
        <Col>
        <Card>
          <Card.Body>
            <a href='/mintfiles'>
              Mint Files
            </a>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Body>
            <a href='/mintnfts'>
              Mint NFTs
            </a>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Body>
            <a href='/profile'>
              Profile
            </a>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </Container>
  )
}
