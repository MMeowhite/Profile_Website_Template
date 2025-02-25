import React, { createContext, useContext, useEffect, useState } from 'react';

// 创建一个 LanguageContext
const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    const [languageType, setLanguageType] = useState('en');

    // 读取本地存储的语言设置
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguageType(savedLanguage);
        }
    }, []);

    // 切换语言模式
    const toggleLanguage = (language) => {
        setLanguageType(language);
        localStorage.setItem('language', language || 'en'); // 默认语言为 en
    };

    return (
        <LanguageContext.Provider value={{ languageType, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};