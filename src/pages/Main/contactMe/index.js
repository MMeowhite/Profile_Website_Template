import React, {useEffect} from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import BaiduMap from "../../../utils/baiduMap";
import { useTheme } from "../../../utils/Provider/themeProvider";
import AOS from "aos";
import { useMediaQuery } from "react-responsive";
import {useConfig} from "../../../utils/Provider/ConfigProvider";
import {useLanguage} from "../../../utils/Provider/languageProvider";

const ContactMe = () => {
    const {configValue: contactObj} = useConfig("pages.home.contact")
    console.log(contactObj)
    const { isEnglish } = useLanguage();
    const isSmallScreen = useMediaQuery({maxWidth : 768})
    const { isDarkMode } = useTheme();

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    },[])

    return (
        <div className="contact-container d-flex flex-column justify-content-center align-items-center"
             style={{
                 width: "100%",
                 height: "auto",
                 gap: "25px",
                 marginBottom: "110px"
        }}
        >
            <h1 style={{fontWeight: "800", fontSize: isSmallScreen ? "40px" : "60px"}} data-aos="fade-up">{isEnglish ? "Contact Me" : "联系"}</h1>

            {/* Card 组件 */}
            <Card
                className="p-4"
                style={{
                border: "none",
                height: "auto",
                width: "80vw",
                background: "inherit",
                color: "inherit",
                }}
                data-aos="fade-up"
            >

                {/* 使用 Bootstrap 的 Row + Col 实现响应式布局 */}
                <Card.Body className="d-flex flex-column">
                    <Row className="d-flex align-items-stretch">
                        {/* 左侧 表单 */}
                        <Col xs={12} md={5} className="mb-4 mb-md-0">
                            <Card.Header className="text-center" style={{ fontSize: isSmallScreen ? "24px" : "26px" , fontWeight: '600', background: isDarkMode ? "lightgray" :"darkgray" }}>
                                {contactObj.title}
                            </Card.Header>
                            <strong className="text-center d-block mb-3" style={{ color: "darkblue", padding: "5px 10px"}}>
                                {contactObj.subtitle}
                            </strong>
                            <div className="d-flex flex-column h-100">
                                <Card.Text className="text-center mb-3">
                                    <strong>{isEnglish ? "Address:": "地址："}</strong>
                                    <span dangerouslySetInnerHTML={{__html: contactObj.location}}/>
                                </Card.Text>
                                <Form className="flex-grow-1">
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label>
                                            {isEnglish ? "Name" : "姓名"} <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={isEnglish ? "Enter your name" : "请输入你的姓名"} required />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>
                                            {isEnglish ? "Email" : "邮箱"} <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                                        </Form.Label>
                                        <Form.Control type="email" placeholder={isEnglish ? "Enter your email" : "请输入你的邮箱"} required />
                                    </Form.Group>

                                    <Form.Group controlId="formSubject" className="mb-3">
                                        <Form.Label>{isEnglish ? "Title" : "标题"}</Form.Label>
                                        <Form.Control type="text" placeholder={isEnglish ? "Enter title" : "请输入标题"} />
                                    </Form.Group>

                                    <Form.Group controlId="formMessage" className="mb-3">
                                        <Form.Label>{isEnglish ? "Message" : "信息"}</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder={isEnglish ? "Enter your message" : "请输入信息"} />
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button variant="primary" type="submit" style={{ padding: '10px 40px', fontSize: '1.2rem' }}>
                                            {isEnglish ? "Send" : "发送"}
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
                                <BaiduMap address={contactObj.api.address} />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ContactMe;
