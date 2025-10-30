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
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    useEffect(() => {
        // 检查容器是否存在
        if (!globeContainerRef.current) {
            return;
        }

        // 移除已存在的脚本（避免重复加载）
        const existingScript = document.getElementById('clstr_globe');
        if (existingScript) {
            console.log('🗑️ 移除旧脚本');
            existingScript.remove();
        }

        // 创建脚本元素
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'clstr_globe';
        script.src = '//clustrmaps.com/globe.js?d=1pg3aEm9ERVDujjJ0czaD7JU74Lb6uxFByLrI-8j74A';

        // 监听加载成功
        script.onload = () => {
            setIsLoading(false);
            
            // 等待 Globe 渲染
            setTimeout(() => {
                const children = globeContainerRef.current?.children;
            }, 1000);
        };

        // 监听加载失败
        script.onerror = () => {
            setError('Failed to load globe');
            setIsLoading(false);
        };

        // 关键：将脚本添加到我们的容器中
        try {
            globeContainerRef.current.appendChild(script);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }

        // 清理函数
        return () => {
            const scriptToRemove = document.getElementById('clstr_globe');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次

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
                {isEnglish ? "Visitor Map" : "访客地图"}
            </h1>

            {/* Globe 容器 - 关键部分 */}
            <div 
                ref={globeContainerRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: isSmallScreen ? '400px' : '500px',
                    width: '80%',
                    maxWidth: '800px',
                    padding: '30px',
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa',
                    borderRadius: '15px',
                    position: 'relative',
                    boxShadow: isDarkMode 
                        ? '0 8px 32px rgba(255,255,255,0.1)' 
                        : '0 8px 32px rgba(0,0,0,0.15)',
                }}
                data-aos="zoom-in"
            >
                {/* 加载状态 */}
                {isLoading && !error && (
                    <div style={{
                        color: isDarkMode ? '#888' : '#666',
                        fontSize: '16px',
                        textAlign: 'center',
                    }}>
                        <div style={{ marginBottom: '10px' }}>⏳</div>
                        {isEnglish ? 'Loading globe...' : '加载地球仪中...'}
                    </div>
                )}

                {/* 错误状态 */}
                {error && (
                    <div style={{
                        color: '#ff6b6b',
                        fontSize: '16px',
                        textAlign: 'center',
                    }}>
                        <div style={{ marginBottom: '10px' }}>❌</div>
                        {isEnglish ? 'Failed to load globe' : '加载失败'}
                        <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            {error}
                        </div>
                    </div>
                )}
            </div>

            {/* 说明文字 */}
            <p 
                style={{
                    fontSize: isSmallScreen ? '14px' : '16px',
                    color: isDarkMode ? '#aaa' : '#666',
                    textAlign: 'center',
                    marginTop: '30px',
                    maxWidth: '600px',
                    lineHeight: '1.6',
                }}
                data-aos="fade-up"
                data-aos-delay="200"
            >
                {isEnglish 
                    ? 'Thank you for visiting! This interactive globe shows where visitors come from around the world.'
                    : '感谢您的访问！这个交互式地球仪展示了来自世界各地的访客分布。'
                }
            </p>
        </div>
    );
};

export default Map;