import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import main from './../../assets/main.png'

export default function Dashboard() {
  return (
    <Container className='my-5'>
      <h2 className='text-center '>Welcome to Mint My Files</h2>
      <div className='text-center my-4'>
      <img src={main} alt = "mint my file" />
      </div>
      <Row>
        <Col>
        <Card border="primary">
          <Card.Body className='text-center'>
            <Link to="/files" className='text-dark'><b>Files</b></Link>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card border="primary">
          <Card.Body  className='text-center'>
          <Link to="/mintnfts" className='text-dark'><b>Mint NFTs</b></Link>
          </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card border="primary">
          <Card.Body  className='text-center'>
            <Link to="/profile" className='text-dark'><b>Profile</b></Link>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </Container>
  )
}
