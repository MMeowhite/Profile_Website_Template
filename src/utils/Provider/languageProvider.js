import React, { createContext, useContext, useEffect, useState } from 'react';

// 创建一个 LanguageContext
const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    const [isEnglish, setIsEnglish] = useState(() => {
        // 读取本地存储的语言设置，默认为中文
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage ? savedLanguage === 'zh' : true;
    });

    // 读取本地存储的语言设置
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage === 'en') {
            setIsEnglish(true)
        } else {
            setIsEnglish(false)
        }
    }, []);

    // 切换语言模式
    const switchLanguage = () => {
        setIsEnglish((prevIsEnglish) => {
            const newLanguage = !prevIsEnglish ? "en" : "zh"; // 反转语言
            localStorage.setItem('language', newLanguage); // 更新本地存储
            return !prevIsEnglish; // 更新状态
        });
    };


    return (
        <LanguageContext.Provider value={{ isEnglish, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};