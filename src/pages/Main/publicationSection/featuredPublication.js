import React, {useState} from 'react'
import {Button, ButtonGroup, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Image from "react-bootstrap/Image";
import {useTheme} from "../../../components/themeProvider";
import './publicationSection.css'


const FeaturedPublication = () => {
    const { isDarkMode } = useTheme();
    const { interval, setInterval } = useState(6666);


    const cardStyles = {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`, // 卡片边框
        borderRadius: '10px', // 可选圆角
        padding: '20px', // 内边距
        width: '100%', // 卡片填充整个Col
        height: '100%',
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)' // 深色模式下的阴影
            : '0 8px 12px rgba(0, 0, 0, 0.5)', // 浅色模式下的阴影
    };

    return (
        <Container id="feature-publication-section" className="d-flex flex-row align-items-center" style={{height: "100vh", paddingTop: "110px"}}>
            <Row id="feature-publication" style={{gap:"5rem"}}>
                <Col className="d-flex align-items-center">
                        <span style={{height: "50%", fontSize: "5rem"}}>Featured Publication</span>
                </Col>
                <Col id="feature-publication-show" className="d-flex align-items-center flex-column" style={{...cardStyles}}>
                    <Row id="feature-publication-brief-introduction" className="d-flex flex-column align-items-center">
                        <Row id="feature-publication-authors" >
                            authors
                        </Row>
                        <Row id="feature-publication-date-journal">
                            data, journal
                        </Row>
                    </Row>
                    <Row id="feature-publication-carousel" >
                        <Carousel data-bs-theme={`${isDarkMode} ? dark : ""`}>
                                <Carousel.Item interval={interval}>
                                    <Image src="/img.png"/>
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={interval}>
                                    <Image src="/img_1.png"/>
                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item interval={interval}>
                                    <Image src="/img_2.png"/>
                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>
                                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                        </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                    </Row>
                    <Row id="feature-publication-brief-introduction" className="d-flex flex-column align-items-center" >
                        <Row id="feature-publication-title">
                            Here is your publication title
                        </Row>
                        <Row id="feature-publication-abstract">
                            Here is your short recommened
                        </Row>
                    </Row>
                    <Row id="feature-publication-link">
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button>1</Button>
                                <Button>2</Button>
                                <Button>3</Button>
                                <Button>4</Button>
                            </ButtonGroup>
                            <ButtonGroup className="me-2" aria-label="Second group">
                                <Button>5</Button>
                                <Button>6</Button>
                                <Button>7</Button>
                            </ButtonGroup>
                            <ButtonGroup aria-label="Third group">
                                <Button>8</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default FeaturedPublication;