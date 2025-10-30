import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Button, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import Image from 'react-bootstrap/Image';
import { useTheme } from '../../../utils/Provider/themeProvider';
import { useConfig } from "../../../utils/Provider/ConfigProvider";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import './publicationSection.css';
import AOS from "aos";
import { useLanguage } from "../../../utils/Provider/languageProvider";


const PublicationSection = () => {
    const { isDarkMode } = useTheme();
    const isSmallScreen = useMediaQuery({ maxWidth: 768 })
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { configValue: featuredPublicationObjects } = useConfig('pages.home.featuredPublications');
    const [imageIndexes, setImageIndexes] = useState(
        featuredPublicationObjects ? new Array(featuredPublicationObjects.length).fill(0) : []
    );
    const { isEnglish } = useLanguage();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    useEffect(() => {
        if (featuredPublicationObjects) {
            setImageIndexes(new Array(featuredPublicationObjects.length).fill(0));
        }
    }, [featuredPublicationObjects]);

    function Arrow(props) {
        const { style, onClick, direction, LeftIcon, RightIcon } = props;
        return (
            <div
                style={{
                    ...style,
                    display: 'block',
                    cursor: 'pointer',
                    zIndex: "999",
                }}
                onClick={onClick}
            >
                {direction === 'right' ? (
                    RightIcon ? (
                        <RightIcon color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: isSmallScreen ? '30px' : '40px' }} />
                    ) : (
                        <HiChevronDoubleRight color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: isSmallScreen ? '30px' : '40px' }} />
                    )
                ) : (
                    LeftIcon ? (
                        <LeftIcon color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: isSmallScreen ? '30px' : '40px' }} />
                    ) : (
                        <HiChevronDoubleLeft color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: isSmallScreen ? '30px' : '40px' }} />
                    )
                )}
            </div>
        );
    }

    const handleCardChange = (oldIndex, newIndex) => {
        setCurrentCardIndex(newIndex);
    };

    const handleImageChange = (cardIndex, oldIndex, newIndex) => {
        setImageIndexes(prev => {
            const newIndexes = [...prev];
            newIndexes[cardIndex] = newIndex;
            return newIndexes;
        });
    };

    if (!featuredPublicationObjects) {
        return <div>Featured Publication isn't exist!</div>;
    }

    const sliderOuterSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 15000,
        cssEase: "linear",
        arrows: true,
        beforeChange: handleCardChange,
        prevArrow: <Arrow direction="left" LeftIcon={HiChevronDoubleLeft} />,
        nextArrow: <Arrow direction="right" RightIcon={HiChevronDoubleRight} />,
    };

    const getSliderInnerSettings = (cardIndex) => ({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: true,
        beforeChange: (oldIndex, newIndex) => handleImageChange(cardIndex, oldIndex, newIndex),
        prevArrow: <Arrow direction="left" LeftIcon={HiChevronLeft} />,
        nextArrow: <Arrow direction="right" RightIcon={HiChevronRight} />,
    });

    const cardStyles = {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        padding: isSmallScreen ? '15px' : '20px',
        width: '100%',
        height: '100%',
    };

    return (
        <div
            id="publication"
            className={`d-flex ${isSmallScreen ? "flex-column" : "flex-row"} align-items-center justify-content-center`}
            style={{
                width: isSmallScreen ? "100%" : "80vw", // 小屏幕用100%
                maxWidth: "100%", // 防止溢出
                height: "auto",
                gap: isSmallScreen ? "15px" : "25px",
                padding: isSmallScreen ? "20px 15px" : "40px 20px",
                marginBottom: isSmallScreen ? "40px" : "60px", // 添加底部间距
                overflow: "hidden", // 防止溢出
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontWeight: "800",
                    fontSize: isSmallScreen ? "32px" : "60px",
                    textAlign: 'center',
                    width: isSmallScreen ? "100%" : "30%", // 小屏幕占满宽
                    marginBottom: isSmallScreen ? "20px" : "0",
                }}
                data-aos="zoom-in"
            >
                {isEnglish ? "Featured Publication" : "论文"}
            </h1>

            <div
                className="d-flex flex-column"
                style={{ 
                    width: isSmallScreen ? "100%" : "70%",
                    maxWidth: "100%", // 防止溢出
                }}
            >
                <div
                    className="d-flex flex-column"
                    style={{
                        ...cardStyles,
                        width: "100%",
                        minWidth: isSmallScreen ? "auto" : "50vw", // 小屏幕不设最小宽度
                        maxWidth: "100%", // 防止溢出
                        maxHeight: isSmallScreen ? "none" : "80vh", // 小屏幕不限高度
                        padding: isSmallScreen ? "15px" : "20px 20px 20px 100px",
                        overflow: "hidden", // 防止内容溢出
                    }}
                    data-aos="zoom-in"
                >
                    {/* 作者、日期、期刊 */}
                    {featuredPublicationObjects?.map((featuredPublicationObject, index) => {
                        if (index === currentCardIndex) {
                            return (
                                <div 
                                    className="d-flex flex-column" 
                                    key={featuredPublicationObject.id || index}
                                    style={{
                                        marginBottom: isSmallScreen ? "15px" : "20px",
                                        width: "100%",
                                    }}
                                >
                                    <div
                                        style={{ 
                                            fontSize: isSmallScreen ? "14px" : "18px",
                                            wordBreak: "break-word", // 防止长文本溢出
                                        }}
                                        className="publication-authors"
                                        dangerouslySetInnerHTML={{
                                            __html: featuredPublicationObject.authors
                                        }}
                                    />
                                    <strong style={{ 
                                        fontSize: isSmallScreen ? "16px" : "20px",
                                        wordBreak: "break-word",
                                    }}>
                                        {featuredPublicationObject.date} · <i style={{ fontSize: isSmallScreen ? "16px" : "20px" }}>{featuredPublicationObject.journal}</i>
                                    </strong>
                                </div>
                            );
                        }
                        return null;
                    })}

                    {/* 主卡片轮播 */}
                    <Slider
                        key="featuredPublication"
                        id="card-slider"
                        className="d-flex flex-row justify-content-center outer align-items-center"
                        {...sliderOuterSettings}
                        style={{ 
                            width: '100%', 
                            height: 'auto',
                            overflow: 'hidden', // 防止溢出
                        }}
                    >
                        {featuredPublicationObjects?.map((featuredPublicationObject, index) => (
                            <div
                                key={`featuredPublication_${index}`}
                                className="d-flex justify-content-center"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '100%', // 防止溢出
                                }}
                            >
                                {/* 图片轮播 */}
                                <Slider
                                    key={`featuredPublicationImageFrame_${index}_${imageIndexes[index]}`}
                                    id="img-slider"
                                    className="d-flex flex-row justify-content-center inner align-items-center"
                                    {...getSliderInnerSettings(index)}
                                >
                                    {featuredPublicationObject.featuredImages &&
                                        featuredPublicationObject.featuredImages.length > 0 ? (
                                        featuredPublicationObject.featuredImages.map((item, idx) => (
                                            <div
                                                key={`featuredPublicationImage_${idx}`}
                                                id="slider-container"
                                                className="d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '100%',
                                                    height: isSmallScreen ? '300px' : '500px', // 固定高度
                                                    maxWidth: '100%',
                                                    padding: isSmallScreen ? '10px' : '20px',
                                                    position: 'relative',
                                                }}
                                            >
                                                <a 
                                                    href={item.link}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                >
                                                    <Image
                                                        src={item.src}
                                                        // alt={item.caption}
                                                        style={{
                                                            width: 'auto',
                                                            height: 'auto',
                                                            maxWidth: '100%',
                                                            maxHeight: isSmallScreen ? '280px' : '460px',
                                                            objectFit: 'contain',
                                                            display: 'block',
                                                        }}
                                                    />
                                                </a>
                                                {/* 描述 */}
                                                {item.caption && (
                                                    <div 
                                                        className="carousel-caption"
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: isSmallScreen ? '5px' : '10px',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                                            padding: isSmallScreen ? '5px 10px' : '8px 16px',
                                                            borderRadius: '15px',
                                                            maxWidth: '90%',
                                                        }}
                                                    >
                                                        <p style={{ 
                                                            color: '#fff',
                                                            margin: 0,
                                                            fontSize: isSmallScreen ? '12px' : '14px',
                                                            wordBreak: 'break-word',
                                                        }}>
                                                            {item.caption}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{
                                            height: isSmallScreen ? '300px' : '500px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            Loading images...
                                        </div>
                                    )}
                                </Slider>
                            </div>
                        ))}
                    </Slider>

                    {/* 按钮区域和文章标题 */}
                    <div style={{ 
                        marginTop: isSmallScreen ? '15px' : '20px',
                        width: '100%',
                        maxWidth: '100%',
                    }}>
                        {featuredPublicationObjects?.map((featuredPublicationObject, index) => {
                            if (index === currentCardIndex) {
                                return (
                                    <Row 
                                        key={`content_${index}`} 
                                        className="text-center mb-3" 
                                        style={{ 
                                            width: '100%', 
                                            gap: "5px",
                                            margin: 0,
                                        }}
                                    >
                                        <a
                                            href={featuredPublicationObject.url}
                                            style={{
                                                fontSize: isSmallScreen ? "18px" : "26px",
                                                fontWeight: '600',
                                                color: isDarkMode ? '#fff' : '#333',
                                                textAlign: "left",
                                                textDecoration: "none",
                                                width: "100%",
                                                wordBreak: "break-word",
                                                padding: 0,
                                            }}
                                        >
                                            {featuredPublicationObject.title || 'No Title Available'}
                                        </a>

                                        {/* 文章介绍 */}
                                        <p
                                            style={{
                                                fontSize: isSmallScreen ? "14px" : "20px",
                                                color: isDarkMode ? '#ccc' : '#555',
                                                maxHeight: isSmallScreen ? '8rem' : '10rem',
                                                overflowY: 'auto',
                                                textAlign: "left",
                                                wordBreak: "break-word",
                                                padding: 0,
                                                width: '100%',
                                            }}
                                        >
                                            {featuredPublicationObject.abstract || 'No abstract available.'}
                                        </p>

                                        {/* 额外链接 */}
                                        <div
                                            className="d-flex justify-content-center flex-wrap"
                                            style={{ 
                                                gap: isSmallScreen ? '10px' : '15px',
                                                padding: 0,
                                                width: '100%',
                                            }}
                                        >
                                            {featuredPublicationObject.buttons &&
                                                featuredPublicationObject.buttons.map((button, idx) => (
                                                    <Button
                                                        key={idx}
                                                        variant={
                                                            button.name === 'PDF'
                                                                ? 'outline-primary'
                                                                : button.name === 'CODE'
                                                                    ? 'outline-secondary'
                                                                    : 'outline-info'
                                                        }
                                                        size={isSmallScreen ? "sm" : "md"}
                                                        href={button.link}
                                                        style={{
                                                            fontSize: isSmallScreen ? '12px' : '14px',
                                                        }}
                                                    >
                                                        {button.name}
                                                    </Button>
                                                ))}
                                        </div>
                                    </Row>
                                );
                            }
                            return null
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicationSection;