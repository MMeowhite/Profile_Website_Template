import React, { useState, useEffect } from 'react';
import Nav from '../../../widget/nav';
import IconNavComponent from '../../../widget/iconNavComponent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { useTheme } from '../../../utils/Provider/themeProvider';
import { useConfig }from "../../../utils/Provider/ConfigProvider";
import AOS from "aos";
import {useMediaQuery} from "react-responsive";
import {useLanguage} from "../../../utils/Provider/languageProvider";



const Home = () => {
    const { isEnglish } = useLanguage();
    const { configValue: homeData,error,loading } = useConfig('pages.home');
    const [  avatarImg, setAvatarImg ] = useState(null)
    const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // 记录是否为小屏
    const { isDarkMode } = useTheme();

    // 设置card的样式
    const aboutCardStyles = {
        background: "inherit",
        color: isDarkMode ? '#ffffff' : '#000000',
        padding: '20px', // 内边距
        width: '100%', // 卡片填充整个Col
        height: '100%',
    };

    const quoteCardStyles = {
        background: "inherit",
        color: isDarkMode ? '#ffffff' : '#000000',
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`, // 卡片边框
        borderRadius: '10px', // 可选圆角
        width: '100%', // 卡片填充整个Col
        height: '100%',
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)' // 深色模式下的阴影
            : '0 8px 12px rgba(0, 0, 0, 0.5)', // 浅色模式下的阴影
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    }, []);

    useEffect(()=>{
        if (homeData && homeData.avatar) {
            setAvatarImg(homeData.avatar.init)
        }
    },[homeData])

    if (error){
        return <div>Loading homeConfiguration error: {error}</div>
    }

    if (loading){
        return <div>Loading...</div>
    }

    const { avatar, name, institution, field, greeting, quote} = homeData


    return (
        <div
            id="home"
            className="d-flex flex-column justify-content-evenly align-items-center"
            style={{ height: '100%', gap: "25px" ,width: "100vw"}}
        >
            <Row className="d-flex flex-column flex-md-row align-items-center justify-content-center text-center w-100" data-aos="zoom-in">
                {/* 图片和文字区域 */}
                <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center g-3 mb-4 mb-md-0">
                    <Image
                        src={ avatarImg }
                        alt="avatar"
                        className="img-fluid rounded-circle mb-3"
                        style={{
                            width: isSmallScreen ? "300px" : '400px',
                            height: isSmallScreen ? "300px" : '400px',
                            objectFit: 'cover',
                        }}
                        onMouseEnter={() => setAvatarImg(avatar.hovered)} // 鼠标悬停切换头像
                        onMouseLeave={() => setAvatarImg(avatar.init)} // 鼠标移开恢复默认头像
                        onClick={isSmallScreen ? () => setAvatarImg(avatarImg === avatar.init ? avatar.hovered : avatar.init) : null}
                    />
                    <div id="name"style={{fontSize: isSmallScreen ? "clamp(1rem, 10vw, 4rem)" : "clamp(1rem, 6vw, 3rem)", fontWeight: "800",  marginBottom: "1.5rem", whiteSpace: "pre", overflow: "hidden", width: "100vw"}}>
                        <div>{name.nickName}</div>
                        <div>{name.realName}</div>
                    </div>
                    <div style={{fontSize: isSmallScreen ? "20px" : "25px", fontWeight: "600", marginBottom: "1.5rem", whiteSpace: "nowrap"}}>{institution}</div>
                    <p id="field" style={{fontSize: isSmallScreen ? "12px" : "20px", fontWeight: "400",  marginBottom: "1.5rem", whiteSpace: "auto", width: "100vw", padding: "0 5px"}}>{field}</p>
                </Col>

                {/* About Me 区域 */}
                <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center" >
                    <div style={{ ...aboutCardStyles, flexGrow: 1, padding: 5 }}>
                        <div className="d-flex flex-column align-items-center">
                            {/* 打招呼部分 */}
                            <div className="d-flex flex-fow align-items-center justify-content-center" style={{gap: "16px"}}>
                                { greeting.img && (
                                    <Image
                                        src={greeting.img}
                                        alt="greeting image"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '2rem', height: '2rem', objectFit: 'cover' }}
                                    />
                                )}
                                <div style={{ fontSize: isSmallScreen ? "2rem" : '1.5rem', fontWeight: 'bold' }}>
                                    {greeting.title}
                                </div>
                            </div>

                            {/* 副标题 */}
                            <div className="mt-2 mb-3" style={{ fontSize: '1rem' }}>
                                {greeting.subtitle}
                            </div>

                            {/* 介绍部分 */}
                            <div
                                className="text-start"
                                style={{
                                    fontSize: '1.3rem',
                                    lineHeight: '1.5',
                                    maxHeight: '500px', // 限制最大高度，出现滚动条
                                    overflowY: 'auto', // 垂直滚动条
                                    padding: "0 60px"
                                }}
                                dangerouslySetInnerHTML={{ __html: greeting.profile }}
                            >
                            </div>

                            {/* 这里需要修改 */}
                            <div className="d-flex flex-row align-items-center justify-content-center" style={{width: "auto", marginTop: "30px", whiteSpace: "auto"}}>
                                <IconNavComponent/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row data-aos="fade-up">
                <Nav style={{ marginTop: "0", marginBottom: "0", padding: "0" }} />
            </Row>
            {/* Quote 区域 */}
            <Row xs={12} md={6} className="justify-content-center w-100" style={{padding: isSmallScreen ? "0 50px" : "0 100px"}} data-aos="fade-up">
                <Card style={{...quoteCardStyles}}>
                    <Card.Header style={{
                        borderBottom: `1px solid ${isDarkMode ? '#cccccc' : '#444444'}`,
                        boxShadow: isDarkMode
                            ? '0 8px 12px rgba(255, 255, 255, 0.1)' // 深色模式下的阴影
                            : '0 8px 12px rgba(0, 0, 0, 0.1)'}}>
                        {isEnglish ? "Quote" : "引言"}
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                                {quote ? quote.words : "please input your own quote"}
                            </p>
                            <footer
                                dangerouslySetInnerHTML={{ __html: quote?.author ?  quote.author: isEnglish ? 'Someone famous in <cite title="Source Title">Source Title</cite>' : "匿名"}}
                                className="blockquote-footer"
                                style={{ textAlign: 'right' }}
                            />

                        </blockquote>
                    </Card.Body>
                </Card>
            </Row>


        </div>
    );
};

export default Home;
