import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import MessageForm from '../../Components/MessageForm/MessageForm'
import { Col, Container, Row } from 'react-bootstrap'

export default function Chat() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <SideBar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
}
