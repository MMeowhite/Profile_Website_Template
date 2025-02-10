import React from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import BaiduMap from "../../../utils/baiduMap";
import {useTheme} from "../../../components/themeProvider";

const ContactMe = () => {

    const { isDarkMode } = useTheme();

    return (
        <div className="contact-container d-flex flex-column justify-content-center align-items-center"
             style={{
                 width: "100vw",
                 margin: "50px 0"
        }}
        >
            <h1 style={{fontWeight: "800", fontSize: "4rem"}}>Contact Me</h1>

            {/* Card 组件 */}
            <Card className="p-4" style={{
                border: "none",
                height: "auto",
                width: "80vw",
                background: "inherit",
                color: "inherit"
            }}>

                {/* 使用 Bootstrap 的 Row + Col 实现响应式布局 */}
                <Card.Body className="d-flex flex-column">
                    <Row className="d-flex align-items-stretch">
                        {/* 左侧 表单 */}
                        <Col xs={12} md={5} className="mb-4 mb-md-0">
                            <Card.Header className="text-center" style={{ fontSize: '2rem', fontWeight: '700', background: isDarkMode ? "lightgray" :"darkgray" }}>
                                Let's stay connected !
                            </Card.Header>
                            <strong className="text-center d-block mb-3" style={{ color: "darkblue" }}>
                                Drop in for questions, ideas, suggestions or just to say Hi
                            </strong>
                            <div className="d-flex flex-column h-100">
                                <Card.Text className="text-center mb-3">
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
                                <Form className="flex-grow-1">
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label>
                                            Name <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" required />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>
                                            Email <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                                        </Form.Label>
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
                            </div>
                        </Col>

                        {/* 右侧 地图 */}
                        <Col xs={12} md={7}>
                            <div
                                style={{
                                width: "100%",
                                minHeight: "400px", // 在小屏幕时确保地图不会太小
                                height: "100%", // 在大屏幕时地图填充整个列
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                            >
                                <BaiduMap address="中国四川省成都市武侯区人民南路三段17号四川大学华西校区" />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ContactMe;
