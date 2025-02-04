import React from 'react'
import { Container, Row, Col, Card, ListGroup, Navbar, Nav } from "react-bootstrap";

const Research = ()=>{
    return (
        <div id="research" style={{marginTop: "110px"}}>
            <Container>
                <h3 className="mb-4">Experience</h3>
                <Row>
                    <Col md={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Director of Cloud Infrastructure</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">GenCoin (2021 - Present)</Card.Subtitle>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Lorem ipsum dolor sit amet</ListGroup.Item>
                                    <ListGroup.Item>Lorem ipsum dolor sit amet</ListGroup.Item>
                                    <ListGroup.Item>Lorem ipsum dolor sit amet</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Backend Software Engineer</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">X (2016 - 2020)</Card.Subtitle>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Migrated infrastructure to a new data center</ListGroup.Item>
                                    <ListGroup.Item>Lorem ipsum dolor sit amet</ListGroup.Item>
                                    <ListGroup.Item>Lorem ipsum dolor sit amet</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h3 className="mt-4 mb-4">Education</h3>
                <Row>
                    <Col md={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>PhD in Artificial Intelligence</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Stanford University (2016 - 2020)</Card.Subtitle>
                                <Card.Text>Thesis on <em>Why LLMs are awesome</em>.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>MEng in Artificial Intelligence</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">MIT (2016 - 2020)</Card.Subtitle>
                                <Card.Text>GPA: 3.8/4.0</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Research;