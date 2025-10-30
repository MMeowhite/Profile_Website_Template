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
    // 改为数组,每个卡片独立的图片索引
    const { configValue: featuredPublicationObjects } = useConfig('pages.home.featuredPublications');
    const [imageIndexes, setImageIndexes] = useState(
        featuredPublicationObjects ? new Array(featuredPublicationObjects.length).fill(0) : []
    );
    const { isEnglish } = useLanguage();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, [])

    // 当 featuredPublicationObjects 加载后初始化 imageIndexes
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
                        <RightIcon color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: '40px' }} />
                    ) : (
                        <HiChevronDoubleRight color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: '40px' }} />
                    )
                ) : (
                    LeftIcon ? (
                        <LeftIcon color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: '40px' }} />
                    ) : (
                        <HiChevronDoubleLeft color={isDarkMode ? '#fff' : '#000'} style={{ fontSize: '40px' }} />
                    )
                )}
            </div>
        );
    }

    // 外层卡片切换
    const handleCardChange = (oldIndex, newIndex) => {
        setCurrentCardIndex(newIndex);
    };

    // 内层图片切换 - 需要知道是哪个卡片
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

    // slick-carousel 的配置
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
        beforeChange: handleCardChange, // 正确使用 beforeChange
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
        padding: '20px',
        width: '100%',
        height: '100%',
    };

    return (
        <div
            id="publication"
            className={`d-flex ${isSmallScreen ? "flex-column" : "flex-row"} align-items-center justify-content-center`}
            style={{
                width: "80vw",
                height: "auto",
                gap: "25px",
                padding: isSmallScreen ? "0 20px" : "0 0 0 0"
            }}
        >
            {/* 标题 */}
            <h1
                style={{
                    fontWeight: "800",
                    fontSize: isSmallScreen ? "40px" : "60px",
                    textAlign: 'center',
                    width: "30%"
                }}
                data-aos="zoom-in"
            >
                {isEnglish ? "Featured Publication" : "论文"}
            </h1>

            <div
                className="d-flex flex-column"
                style={{ width: "70%" }}
            >
                <div
                    className="d-flex flex-column"
                    style={{
                        ...cardStyles,
                        width: "100%",
                        minWidth: "50vw",
                        maxHeight: "80vh",
                        padding: isSmallScreen ? "0 20px" : "0 0 0 100px"
                    }}
                    data-aos="zoom-in"
                >
                    {/* 作者、日期、期刊 */}
                    {featuredPublicationObjects?.map((featuredPublicationObject, index) => {
                        if (index === currentCardIndex) {
                            return (
                                <div className="d-flex flex-column" key={featuredPublicationObject.id || index}>
                                    <div
                                        style={{ fontSize: "18px" }}
                                        className="publication-authors"
                                        dangerouslySetInnerHTML={{
                                            __html: featuredPublicationObject.authors
                                        }}
                                    />
                                    <strong style={{ fontSize: '20px' }}>
                                        {featuredPublicationObject.date} · <i style={{ fontSize: '20px' }}>{featuredPublicationObject.journal}</i>
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
                        style={{ width: '100%', height: 'auto' }}
                    >
                        {featuredPublicationObjects?.map((featuredPublicationObject, index) => (
                            <div
                                key={`featuredPublication_${index}`}
                                className="d-flex justify-content-center"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            >
                                {/* 图片轮播 - 每个卡片独立配置 */}
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
                                                    height: 'auto',
                                                }}
                                            >
                                                <a href={item.link}>
                                                    <Image
                                                        src={item.src}
                                                        alt={item.caption}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            maxWidth: '600px',
                                                            maxHeight: '600px',
                                                            objectFit: 'contain', // 改为 contain 保持比例
                                                        }}
                                                    />
                                                </a>
                                                {/* 描述 */}
                                                {item.caption && (
                                                    <div className="carousel-caption">
                                                        <p style={{ color: '#fff' }}>{item.caption}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div>Loading images...</div>
                                    )}
                                </Slider>
                            </div>
                        ))}
                    </Slider>

                    {/* 按钮区域和文章标题 */}
                    <div style={{ marginTop: '20px' }}>
                        {featuredPublicationObjects?.map((featuredPublicationObject, index) => {
                            if (index === currentCardIndex) {
                                return (
                                    <Row key={`content_${index}`} className="text-center mb-3" style={{ width: '100%', gap: "5px" }}>
                                        <a
                                            href={featuredPublicationObject.url}
                                            style={{
                                                fontSize: isSmallScreen ? "24px" : "26px",
                                                fontWeight: '600',
                                                color: isDarkMode ? '#fff' : '#333',
                                                textAlign: "left",
                                                textDecoration: "none",
                                                width: "100%"
                                            }}
                                        >
                                            {featuredPublicationObject.title || 'No Title Available'}
                                        </a>

                                        {/* 文章介绍 */}
                                        <p
                                            style={{
                                                fontSize: isSmallScreen ? "16px" : "20px",
                                                color: isDarkMode ? '#ccc' : '#555',
                                                maxHeight: '10rem',
                                                overflowY: 'auto',
                                                textAlign: "left"
                                            }}
                                        >
                                            {featuredPublicationObject.abstract || 'No abstract available.'}
                                        </p>

                                        {/* 额外链接 */}
                                        <div
                                            className="d-flex justify-content-center flex-wrap"
                                            style={{ gap: '15px' }}
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
                                                        size="sm"
                                                        href={button.link}
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