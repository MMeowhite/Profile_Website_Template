import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from 'react-bootstrap';
import './timeline.css';
import { useTheme } from "../../../components/themeProvider";
import useConfig from "../../../utils/useConfig";

const Timeline = () => {
    const { isDarkMode } = useTheme();

    const [width, setWidth] = useState('0%');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const { configValue: timelineData } = useConfig('pages.home.experienceSection.timeline');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDotClick = (contentId) => {
        if (isMobile) {
            setModalContent(contentId);
            setShowModal(true);
        } else {
            const selectedDot = timelineData.find(dot => dot.id === contentId);
            if (selectedDot) {
                setWidth(`${selectedDot.percentage}%`);
                setModalContent(contentId);
                setShowModal(true);
            }
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div>
                <h1 style={{ fontSize: "5rem", fontWeight: "800" }}>Time line</h1>
            </div>

            {/* 时间轴 */}
            <div
                id="timeline"
                className={`position-relative ${isMobile ? 'vertical' : 'horizontal'}`}
                style={{ height: isMobile ? 'auto' : '10px' }}
            >
                {/* 进度条 */}
                <div
                    className="inside"
                    style={{
                        width: width,
                        backgroundColor: isDarkMode ? "#000" : "#fff",
                        position: 'absolute',
                        height: '4px',
                        top: '3px',
                        left: '0',
                        transition: 'width 0.3s ease-in-out'
                    }}
                ></div>

                {/* 时间轴点 */}
                {timelineData && Array.isArray(timelineData) && timelineData.map((dot) => (
                    <div
                        key={dot.id}
                        className="align-items-center"
                        style={{
                            left: isMobile ? '50%' : `${dot.percentage}%`,
                            top: isMobile ? 'unset' : '-15px',
                            backgroundColor: dot.color,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: isMobile ? 'relative' : 'absolute',
                            marginBottom: isMobile ? '30px' : '0',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                            transition: 'transform 0.2s ease-in-out'
                        }}
                        onClick={() => handleDotClick(dot.id)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        {/* 内部的小圆点 */}
                        <span
                            className="inner-dot"
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: isDarkMode ? "#000" : "#fff",
                                borderRadius: '50%',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s ease-in-out'
                            }}
                        />

                        {/* 时间文本 */}
                        <div
                            style={{
                                fontFamily: 'inherit',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                position: 'absolute',
                                top: isMobile ? '50px' : '-40px',
                                textAlign: 'center',
                                width: '100px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {dot.year}
                        </div>
                    </div>
                ))}
            </div>

            {/* 电脑端显示内容 */}
            {!isMobile && (
                <div className="content-cards">
                    {timelineData && Array.isArray(timelineData) && timelineData.map(dot => (
                        <div key={dot.id} className={`content-card ${dot.id}`} style={{ display: modalContent === dot.id ? 'block' : 'none' }}>
                            <p>{dot.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* 手机端弹窗 */}
            {isMobile && showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent ? modalContent.toUpperCase() : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <p>{timelineData?.find(dot => dot.id === modalContent)?.content}</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default Timeline;
