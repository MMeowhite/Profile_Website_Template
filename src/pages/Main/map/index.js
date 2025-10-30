import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "../../../utils/Provider/themeProvider";
import AOS from "aos";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "../../../utils/Provider/languageProvider";

const Map = () => {
    const { isEnglish } = useLanguage();
    const { isDarkMode } = useTheme();
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const globeContainerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        // 移除已存在的脚本
        const existingScript = document.getElementById('clstr_globe');
        if (existingScript) {
            existingScript.remove();
        }

        // 创建新脚本
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'clstr_globe';
        script.src = '//clustrmaps.com/globe.js?d=1pg3aEm9ERVDujjJ0czaD7JU74Lb6uxFByLrI-8j74A';
        script.async = true;

        // 监听加载完成
        script.onload = () => {
            console.log('✅ ClustrMaps Globe loaded successfully!');
            setIsLoading(false);
        };

        script.onerror = () => {
            console.error('❌ Failed to load ClustrMaps Globe');
            setIsLoading(false);
        };

        // 将脚本添加到容器
        if (globeContainerRef.current) {
            globeContainerRef.current.appendChild(script);
        }

        // 清理函数
        return () => {
            const scriptToRemove = document.getElementById('clstr_globe');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []);

    return (
        <div 
            className="map-container d-flex flex-column justify-content-center align-items-center"
            style={{
                width: "100%",
                height: "auto",
                marginBottom: "110px",
                padding: isSmallScreen ? "20px" : "40px 20px",
            }}
        >
            {/* 标题 */}
            <h1 
                style={{ 
                    fontWeight: "800", 
                    fontSize: isSmallScreen ? "40px" : "60px",
                    marginBottom: isSmallScreen ? "30px" : "50px",
                    color: isDarkMode ? '#fff' : '#333',
                    textAlign: 'center',
                }} 
                data-aos="fade-up"
            >
                {isEnglish ? "🌍 Visitor Map" : "🌍 访客地图"}
            </h1>

            {/* Globe 容器 */}
            <div 
                ref={globeContainerRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: isSmallScreen ? '350px' : '450px',
                    width: '100%',
                    maxWidth: '800px',
                    padding: '20px',
                    position: 'relative',
                }}
                data-aos="zoom-in"
            >
                {/* 加载提示 */}
                {isLoading && (
                    <div 
                        style={{
                            color: isDarkMode ? '#888' : '#666',
                            fontSize: '18px',
                            textAlign: 'center',
                        }}
                    >
                        {isEnglish ? 'Loading globe...' : '加载中...'}
                    </div>
                )}
            </div>

            {/* 可选：添加说明文字 */}
            <p 
                style={{
                    fontSize: isSmallScreen ? '14px' : '16px',
                    color: isDarkMode ? '#aaa' : '#666',
                    textAlign: 'center',
                    marginTop: '20px',
                    maxWidth: '600px',
                }}
                data-aos="fade-up"
                data-aos-delay="200"
            >
                {isEnglish 
                    ? 'Thank you for visiting! This globe shows where our visitors come from.'
                    : '感谢您的访问！此地球仪显示了我们访客的来源地。'
                }
            </p>
        </div>
    );
};

export default Map;