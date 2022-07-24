import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <Container>
      <h2>Welcome to Mint My Files</h2>
      <Row>
        <Col>
        <Card>
          <Card.Body>
            {/* <a href='/mintfiles'>
              Mint Files
            </a> */}
            <Link to="/files">Files</Link>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Body>
          <Link to="/mintnfts">Mint NFTs</Link>
            {/* <a href='/mintnfts'>
              Mint NFTs
            </a> */}
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card>
          <Card.Body>
            <Link to="/profile">Profile</Link>
            {/* <a href='/profile'>
              Profile
            </a> */}
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </Container>
  )
}
