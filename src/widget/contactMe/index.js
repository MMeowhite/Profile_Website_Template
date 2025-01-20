import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import BaiduMap from "../../utils/baiduMap";



const ContactMe = () => {
    return (
        <div className="container" style={{ padding: '30px' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={5} className="mb-4" style={{ height: '700px' }}>
                    <Card className="mx-auto" style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', height: '100%', borderRadius: "16px" }}>
                        <Card.Header style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center' }}>
                            Let's stay connected !
                        </Card.Header>
                        <strong style={{ textAlign: "center", color: "darkblue", display: 'block', marginBottom: '20px' }}>
                            Drop in for questions, ideas, suggestions or just to say Hi
                        </strong>
                        <Card.Body>
                            <Card.Text style={{ marginBottom: '30px', textAlign: 'center' }}>
                                <strong>Address:</strong>
                                <br />
                                West China Campus, Sichuan University
                                <br />
                                No. 17 Section 3, South Renmin Road
                                <br />
                                Chengdu, Sichuan 610041
                                <br />
                                P.R. China
                            </Card.Text>
                            <Form>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Name *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" required />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" required />
                                </Form.Group>

                                <Form.Group controlId="formSubject" className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Enter subject" />
                                </Form.Group>

                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                                </Form.Group>

                                <div className="text-center">
                                    <Button variant="primary" type="submit" style={{ padding: '10px 40px', fontSize: '1.2rem' }}>
                                        Send
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* 渲染自定义的百度地图组件 */}
                <Col xs={12} md={6} lg={7} className="mb-4" style={{ height: '700px' }}>
                    <div style={{ height: '100%' }}>
                        <BaiduMap address="中国四川省成都市武侯区人民南路三段17号四川大学华西校区" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ContactMe;