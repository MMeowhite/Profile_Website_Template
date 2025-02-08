import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { useTheme } from '../../../components/themeProvider';
import { useNavigate } from 'react-router-dom';
import useConfig from "../../../utils/useConfig";

const FeaturedPublication = () => {
    const { isDarkMode } = useTheme();
    const [isFlexColumn, setIsFlexColumn] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { configValue: featuredPublicationObjects } = useConfig('pages.home.featuredPublications');

    useEffect(() => {
        const handleResize = () => setIsFlexColumn(window.innerWidth <= 996);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCardSelect = (selectedIndex) => {
        setCurrentCardIndex(selectedIndex);
        setCurrentImageIndex(0);
    };

    const handleImageSelect = (selectedIndex) => {
        setCurrentImageIndex(selectedIndex);
    };

    if (!featuredPublicationObjects) {
        return <div>Featured Publication isn't exist!</div>;
    }

    return (
        <Container
            id="feature-publication-section"
            className="d-flex align-items-center justify-content-center"
            style={{ maxWidth: "100vw", padding: "2rem 0" }}
        >
            <Row
                id="feature-publication"
                className="d-flex align-items-center"
                style={{
                    width: "100%",
                    flexFlow: isFlexColumn ? "column" : "row",
                    gap: '4rem',
                }}
            >
                <Col xs={12} md={4} className="text-center">
                    <h1 className="mb-0" style={{ fontSize: '3rem', fontWeight: '800' }}>
                        Featured Publications
                    </h1>
                </Col>

                <Col
                    xs={12}
                    md={8}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{
                        backgroundColor: isDarkMode ? '#333' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        border: `2px solid ${isDarkMode ? '#aaa' : '#444'}`,
                        borderRadius: '12px',
                        padding: '20px',
                        width: '100%',
                        maxWidth: '800px',
                        boxShadow: isDarkMode
                            ? '0 8px 12px rgba(255, 255, 255, 0.5)'
                            : '0 8px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* 主卡片轮播 */}
                    <Carousel
                        interval={5000}
                        fade
                        activeIndex={currentCardIndex}
                        onSelect={handleCardSelect}
                        style={{ width: '100%' }}
                        prevIcon={<span style={{ fontSize: '2rem', color: 'currentColor' }}> &lt;&lt; </span>}
                        nextIcon={<span style={{ fontSize: '2rem', color: 'currentColor' }}> &gt;&gt; </span>}
                    >
                        {featuredPublicationObjects.map((featuredPublicationObject, index) => (
                            <Carousel.Item key={index}>
                                <Row className="d-flex flex-column align-items-center">
                                    <Row>
                                        <strong>{featuredPublicationObject.authors}</strong>
                                    </Row>
                                    <Row>
                                        <small>{featuredPublicationObject.date} & {featuredPublicationObject.journal}</small>
                                    </Row>

                                    {/* 图片轮播 */}
                                    <Row
                                        className="d-flex justify-content-center"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '500px',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <Carousel
                                            fade
                                            activeIndex={currentImageIndex}
                                            onSelect={handleImageSelect}
                                            style={{ width: '100%' }}
                                            prevIcon={<span style={{ fontSize: '2rem', color: 'currentColor' }}> &lt; </span>}
                                            nextIcon={<span style={{ fontSize: '2rem', color: 'currentColor' }}> &gt; </span>}
                                        >
                                            {featuredPublicationObject.featuredImages && featuredPublicationObject.featuredImages.length > 0 ? (
                                                featuredPublicationObject.featuredImages.map((item, idx) => (
                                                    <Carousel.Item key={idx}>
                                                        <Image
                                                            src={item.src}
                                                            alt={item.caption}
                                                            style={{
                                                                width: '100%',
                                                                maxHeight: '450px',
                                                                objectFit: 'contain',
                                                                borderRadius: '8px',
                                                            }}
                                                        />
                                                        <Carousel.Caption>
                                                            <p>{item.caption}</p>
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                ))
                                            ) : (
                                                <div>Loading images...</div>
                                            )}
                                        </Carousel>
                                    </Row>

                                    {/* 文章标题与摘要 */}
                                    <Row className="text-center mb-3" style={{ width: '100%' }}>
                                        <h5 style={{ fontSize: '1.2rem', fontWeight: '600', color: isDarkMode ? '#fff' : '#333' }}>
                                            {featuredPublicationObject.title || "No Title Available"}
                                        </h5>
                                        <p style={{ fontSize: '1rem', color: isDarkMode ? '#ccc' : '#555' }}>
                                            {featuredPublicationObject.abstract || "No abstract available."}
                                        </p>
                                    </Row>

                                    {/* 按钮区域 */}
                                    <div className="d-flex justify-content-center flex-wrap" style={{ gap: '15px' }}>
                                        {featuredPublicationObject.buttons && featuredPublicationObject.buttons.map((button, idx) => (
                                            <Button
                                                key={idx}
                                                variant={button.name === 'PDF' ? 'outline-primary' : button.name === 'CODE' ? 'outline-secondary' : 'outline-info'}
                                                size="sm"
                                                href={button.link}
                                            >
                                                {button.name}
                                            </Button>
                                        ))}
                                    </div>
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default FeaturedPublication;
