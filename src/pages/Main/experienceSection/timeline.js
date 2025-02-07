import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import './timeline.css';
import {useTheme} from "../../../components/themeProvider";

const Timeline = () => {
    const { isDarkMode } = useTheme();

    const [width, setWidth] = useState('0%');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isMobile, setIsMobile] = useState(false); // 判断是否为手机屏幕

    const timelineData = [
        {
            "id": "one",
            "year": "1280",
            "color": "#2c3e50",
            "percentage": 20,
            "content": "Content for 1280"
        },
        {
            "id": "two",
            "year": "1649",
            "color": "#e74c3c",
            "percentage": 40,
            "content": "Content for 1649"
        },
        {
            "id": "three",
            "year": "1831",
            "color": "#7b3",
            "percentage": 60,
            "content": "Content for 1831"
        },
        {
            "id": "four",
            "year": "1992",
            "color": "#20638f",
            "percentage": 80,
            "content": "Hello! I'm Baimiaomiao, a researcher and educator at Sichuan University. My expertise lies in medicine, bioinformatics, mathematics, and physics, with a focus on leveraging computational techniques to solve biomedical challenges. Passionate about interdisciplinary research, I aim to bridge the gap between technology and healthcare to drive innovation. Welcome to my website, where I share my work, ideas, and ongoing projects. Let's connect and explore new possibilities together!Hello! I'm Baimiaomiao, a researcher and educator at Sichuan University. "
        }
    ]


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDotClick = (contentId) => {
        if (isMobile) {
            setModalContent(contentId);
            setShowModal(true); // 手机屏幕，直接显示卡片样式的Modal
        } else {
            setWidth(`${timelineData.find(dot => dot.id === contentId).percentage}%`);
            setModalContent(contentId);
            setShowModal(true); // 电脑屏幕，显示Modal
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            {/* Timeline title */}
            <div>
                <h1 style={{fontSize: "5rem", fontWeight:"800"}}>Experience</h1>
            </div>

            {/* Timeline */}
            <div
                id="timeline"
                className={`position-relative ${isMobile ? 'vertical' : 'horizontal'}`}
                style={{ height: isMobile ? 'auto' : '10px' }}
            >
                {/* inside bar */}
                <div
                    className="inside"
                    style={{
                        width: width,
                        backgroundColor: isDarkMode ? "#000": "#fff",
                        position: 'absolute',
                        height: '4px',
                        top: '3px',
                        left: '0'
                    }}
                ></div>

                {/* Dots */}
                {timelineData.map((dot, index) => (
                    <div
                        key={dot.id}
                        className={`dot ${isMobile ? 'mobile-dot' : 'desktop-dot'}`}
                        style={{
                            left: isMobile ? '50%' : `${dot.percentage}%`,
                            top: isMobile ? 'unset' : '-15px', // 在桌面端使用绝对定位
                            backgroundColor: dot.color,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transform: isMobile ? 'translateX(-50%)' : 'none', // 让 mobile 端点居中
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: isMobile ? 'relative' : 'absolute', // mobile 端相对定位
                            marginBottom: isMobile ? '30px' : '0', // 确保 mobile 端间隔正确
                        }}
                        onClick={() => handleDotClick(dot.id)}
                    >
                        {/* 内部的小圆点 */}
                        <span
                            className="inner-dot"
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: isDarkMode ? "#000" : "#fff",
                                borderRadius: '50%',
                            }}
                        />

                        {/* 时间文本 */}
                        <div
                            style={{
                                fontFamily: 'inherit',
                                fontSize: '1.1rem',
                                position: 'absolute',
                                top: isMobile ? '50px' : '-60px',
                                textAlign: 'center',
                                width: '100px' // 确保对齐
                            }}
                        >
                            {dot.year}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals for Computers (For Larger Screens) */}
            {!isMobile && (
                <div className="content-cards">
            {timelineData.map(dot => (
                <div key={dot.id} className={`content-card ${dot.id}`} style={{ display: modalContent === dot.id ? 'block' : 'none' }}>
            <p>{dot.content}</p>
        </div>
    ))}
</div>
            )}

            {/* Modals for Mobile (Card Style) */}
            {isMobile && (
                <div className="modal-container">
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalContent ? modalContent.toUpperCase() : ""}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>
                                    <p>{timelineData.find(dot => dot.id === modalContent)?.content}</p>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default Timeline;
