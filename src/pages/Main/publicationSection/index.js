import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { Button, Row } from 'react-bootstrap';
import Slider from 'react-slick'; // 导入 react-slick
import Image from 'react-bootstrap/Image';
import { useTheme } from '../../../utils/Provider/themeProvider';
import { useConfig } from "../../../utils/Provider/ConfigProvider";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import './publicationSection.css';
import AOS from "aos";
import {useLanguage} from "../../../utils/Provider/languageProvider";


const PublicationSection = () => {
    const { isDarkMode } = useTheme();
    const isSmallScreen = useMediaQuery({ maxWidth: 768 })
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { configValue: featuredPublicationObjects } = useConfig('pages.home.featuredPublications');
    const { isEnglish } = useLanguage();

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    },[])


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

    // slick-carousel 的配置
    const sliderOuterSettings = {
        dots: false, // 是否显示分页器
        infinite: true, // 是否无限循环
        speed: 1000, // 切换速度
        slidesToShow: 1, // 每次显示一个图片
        slidesToScroll: 1, // 每次滚动一个
        fade: true, // 是否开启淡入淡出
        autoplay: true,
        autoplaySpeed: 1500000,
        cssEase: "linear",
        arrows: true, // 是否显示左右箭头
        prevArrow: <Arrow direction="left" LeftIcon={HiChevronDoubleLeft} />,
        nextArrow: <Arrow direction="right" RightIcon={HiChevronDoubleRight} />,
    };

    const sliderInnerSettings = {
        dots: false, // 是否显示分页器
        infinite: true, // 是否无限循环
        speed: 1000, // 切换速度
        slidesToShow: 1, // 每次显示一个图片
        slidesToScroll: 1, // 每次滚动一个
        fade: true, // 是否开启淡入淡出
        autoplay: true,
        autoplaySpeed: 500000,
        cssEase: "linear",
        arrows: true, // 是否显示左右箭头
        prevArrow: <Arrow direction="left" LeftIcon={HiChevronLeft} style={{ transform: "-10px" }} />,
        nextArrow: <Arrow direction="right" RightIcon={HiChevronRight} />,
    };

    const cardStyles = {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        padding: '20px', // 内边距
        width: '100%', // 卡片填充整个Col
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
                style={{width: "70%" }}
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
                                <div className="d-flex flex-column" key={featuredPublicationObject.id || index}> {/* Add key here */}
                                    <p style={{ fontSize: '1.5rem' }}>
                                        {featuredPublicationObject.authors}
                                    </p>
                                    <strong style={{ fontSize: '1.3rem' }}>
                                        {featuredPublicationObject.date} · <i>{featuredPublicationObject.journal}</i>
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
                        activeIndex={currentCardIndex}
                        beforeChange={(current, next) => handleCardSelect(next)}
                        style={{ width: '100%', height: 'auto' }}
                    >
                        {featuredPublicationObjects?.map((featuredPublicationObject, index) => (
                            <div
                                key={`featuredPublication_${index}`} // Add a unique key here
                                className="d-flex justify-content-center"
                                style={{
                                    width: '800px',
                                    height: 'auto',
                                    maxHeight: '500px',
                                }}
                            >
                                {/* 图片轮播 */}
                                <Slider
                                    key={`featuredPublicationImageFrame_${index}`} // Add a unique key here as well
                                    id="img-slider"
                                    className="d-flex flex-row justify-content-center inner align-items-center"
                                    {...sliderInnerSettings}
                                    activeIndex={currentImageIndex}
                                    beforeChange={(current, next) => handleImageSelect(next)}
                                >
                                    {featuredPublicationObject.featuredImages &&
                                    featuredPublicationObject.featuredImages.length > 0 ? (
                                        featuredPublicationObject.featuredImages.map((item, idx) => (
                                            <div
                                                key={`featuredPublicationImage_${idx}`} // Add a unique key here for images
                                                id="slider-container"
                                                className="d-flex align-items-center justify-content-center"
                                            >
                                                <a
                                                    key={`images_link_${idx}`}
                                                    href={item.link}>
                                                    {/* 图片 */}
                                                    <Image
                                                        key={`images_${idx}`}
                                                        src={item.src}
                                                        alt={item.caption}
                                                        style={{
                                                            width: '600px',
                                                            height: "auto",
                                                            minWidth: '100%',
                                                            maxHeight: '600px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                </a>
                                                {/* 描述 */}
                                                <div className="carousel-caption">
                                                    <p style={{ color: '#fff' }}>{item.caption ? item.caption : ""}</p>
                                                </div>
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
                                    <Row className="text-center mb-3" style={{ width: '100%', gap: "5px" }}>
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
                                                maxHeight: '10rem', // 限制最大高度，出现滚动条
                                                overflowY: 'auto', // 垂直滚动条
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
