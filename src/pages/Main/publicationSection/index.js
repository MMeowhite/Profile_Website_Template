import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import Slider from 'react-slick'; // 导入 react-slick
import Image from 'react-bootstrap/Image';
import { useTheme } from '../../../components/themeProvider';
import useConfig from "../../../utils/useConfig";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import './publicationSection.css';
import AOS from "aos";


const PublicationSection = () => {
    const { isDarkMode } = useTheme();
    const [isFlexColumn, setIsFlexColumn] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { configValue: featuredPublicationObjects } = useConfig('pages.home.featuredPublications');

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    },[])

    useEffect(() => {
        const handleResize = () => setIsFlexColumn(window.innerWidth <= 996);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        <div
            id="#publication"
            className="d-flex flex-column"
            style={{
                maxWidth: '100vw',
                margin: '50px 0'
            }}
        >

                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-6 text-center text-md-left">
                        <h1
                            style={{
                                fontSize: '4rem', // 默认较小的屏幕字体
                                fontWeight: '800',
                                marginBottom: '2rem', // 给标题下方加一些空间
                            }}
                            data-aos="zoom-in"
                        >
                            Featured <br /> Publications
                        </h1>
                    </div>
                    <div className="col-12 col-md-6" >
                        <div
                            className="d-flex flex-column"
                            style={{
                                backgroundColor: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                border: `2px solid ${isDarkMode ? '#aaa' : '#444'}`,
                                borderRadius: '12px',
                                padding: '20px',
                                boxShadow: isDarkMode
                                    ? '0 8px 12px rgba(255, 255, 255, 0.5)'
                                    : '0 8px 12px rgba(0, 0, 0, 0.1)',
                                width: "100%",
                                minWidth: "50vw",
                                maxHeight: "80vh",
                                ...cardStyles,
                            }}
                            data-aos="zoom-in"
                        >
                            {/* 作者、日期、期刊 */}
                            {featuredPublicationObjects?.map((featuredPublicationObject, index) => {
                                if (index === currentCardIndex) {
                                    return (
                                        <div className="d-flex flex-column">
                                            <p style={{ fontSize: '1.5rem' }}>
                                                {featuredPublicationObject.authors}
                                            </p>
                                            <strong style={{ fontSize: '1.3rem' }}>
                                                {featuredPublicationObject.date} · {featuredPublicationObject.journal}
                                            </strong>
                                        </div>
                                    );
                                }
                            })}

                            {/* 主卡片轮播 */}
                            <Slider
                                id="card-slider"
                                className="d-flex flex-row justify-content-center outer align-items-center"
                                {...sliderOuterSettings}
                                activeIndex={currentCardIndex}
                                beforeChange={(current, next) => handleCardSelect(next)}
                                style={{ width: '100%', height: 'auto' }}
                            >
                                {featuredPublicationObjects?.map((featuredPublicationObject, index) => (
                                    <div
                                        key={index}
                                        className="d-flex justify-content-center"
                                        style={{
                                            width: '800px',
                                            height: 'auto',
                                            maxHeight: '500px',
                                        }}
                                    >
                                        {/* 图片轮播 */}
                                        <Slider
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
                                                        key={idx}
                                                        id="slider-container"
                                                        className="d-flex align-items-center justify-content-center"
                                                    >
                                                        <a href={item.link}>
                                                            {/* 图片 */}
                                                            <Image
                                                                src={item.src}
                                                                alt={item.caption}
                                                                style={{
                                                                    width: '600px',
                                                                    height: "auto",
                                                                    minWidth: '100%',
                                                                    maxHeight: '600px',
                                                                    objectFit: 'contain',
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
                                                <h5
                                                    style={{
                                                        fontSize: '2rem',
                                                        fontWeight: '600',
                                                        color: isDarkMode ? '#fff' : '#333',
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    {featuredPublicationObject.title || 'No Title Available'}
                                                </h5>
                                                <p
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        color: isDarkMode ? '#ccc' : '#555',
                                                        maxHeight: '10rem', // 限制最大高度，出现滚动条
                                                        overflowY: 'auto', // 垂直滚动条
                                                        textAlign: "left"
                                                    }}
                                                >
                                                    {featuredPublicationObject.abstract || 'No abstract available.'}
                                                </p>

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
                                })}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default PublicationSection;
