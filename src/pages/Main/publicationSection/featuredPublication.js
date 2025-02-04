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
    const [currentCardIndex, setCurrentCardIndex] = useState(0);  // 当前卡片索引
    const [currentImageIndex, setCurrentImageIndex] = useState(0);  // 当前图片索引
    const navigate = useNavigate();
    const { configValue: featuredPublicationObjects, error, loading } = useConfig('pages.home.featuredPublications');

    useEffect(() => {
        const handleResize = () => {
            setIsFlexColumn(window.innerWidth <= 996);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleButtonClick = (type) => {
        if (type === 'pdf') {
            navigate('/pdf');
        } else if (type === 'cite') {
            navigate('/cite');
        } else if (type === 'doi') {
            navigate('/doi');
        }
    };

    const cardStyles = {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`,
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        height: "auto",
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)'
            : '0 8px 12px rgba(0, 0, 0, 0.1)',
    };

    const handleCardSelect = (selectedIndex) => {
        setCurrentCardIndex(selectedIndex);
        setCurrentImageIndex(0); // 每次切换卡片时，图片从第一张开始
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
            style={{ marginTop: '110px', width: "100%", height: "100vh" }}
        >
            <Row
                id="feature-publication"
                className="d-flex align-items-center"
                style={{
                    width: "auto",
                    flexFlow: isFlexColumn ? "column" : "row",
                    gap: '8rem',
                }}
            >
                <Col
                    xs={12}
                    md={4}
                    className="d-flex flex-column align-items-center"
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <h1 className="mb-0" style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.2' }}>
                        Featured Publications
                    </h1>
                </Col>

                <Col
                    xs={12}
                    md={8}
                    className="d-flex flex-column align-items-center"
                    style={cardStyles}
                >
                    {/* 主卡片轮播 */}
                    <Carousel
                        interval={5000}  // 设置适当的间隔
                        fade={true}  // 开启淡入淡出效果
                        activeIndex={currentCardIndex}
                        onSelect={handleCardSelect}  // 切换卡片时重置图片索引
                        style={{ width: '100%' }}
                        prevIcon={<span style={{ fontSize: '2rem', color: '#ccc' }}> &lt;&lt; </span>}
                        nextIcon={<span style={{ fontSize: '2rem', color: '#ccc' }}> &gt;&gt; </span>}
                    >
                        {featuredPublicationObjects.map((featuredPublicationObject, index) => (
                            <Carousel.Item key={index}>
                                <Row className="d-flex flex-column align-items-center">
                                    {/* 作者信息 */}
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
                                            maxHeight: '600px',
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <Carousel
                                            fade={true}
                                            activeIndex={currentImageIndex}
                                            onSelect={handleImageSelect}  // 切换图片时更新索引
                                            style={{ width: '100%' }}
                                            prevIcon={<span style={{ fontSize: '2rem', color: '#000' }}> &lt; </span>}
                                            nextIcon={<span style={{ fontSize: '2rem', color: '#000' }}> &gt; </span>}
                                        >
                                            {featuredPublicationObject.featuredImages && featuredPublicationObject.featuredImages.length > 0 ? (
                                                featuredPublicationObject.featuredImages.map((item, idx) => (
                                                    <Carousel.Item key={idx}>
                                                        <Image
                                                            src={item.src}
                                                            style={{
                                                                width: '100%',
                                                                maxHeight: '500px',
                                                                objectFit: 'contain',
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
                                        <h5 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333' }}>
                                            {featuredPublicationObject.title || "No Title Available"}
                                        </h5>
                                        <p style={{ fontSize: '1rem', color: '#555' }}>
                                            {featuredPublicationObject.abstract || "No abstract available."}
                                        </p>
                                    </Row>

                                    {/* 按钮区域 */}
                                    <div className="d-flex justify-content-center flex-row" style={{ gap: '20px' }}>
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
