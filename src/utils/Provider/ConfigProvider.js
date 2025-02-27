import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from "./languageProvider";

const ConfigContext = createContext(null);

// 使用 useConfig 直接获取配置
/**
 * 深度获取嵌套的对象属性
 * @param {Object} obj - 配置对象
 * @param {string} path - 属性路径，例如 'database.host'
 * @returns {*} - 返回对应的属性值，如果路径不存在则返回 undefined
 */
export const useConfig = (path) => {
    const configContext = useContext(ConfigContext);

    if (!configContext) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }

    const { config, loading, error } = configContext;
    const configValue = getNestedValue(config, path) || {};
    return { configValue, loading, error };  // 返回配置、加载状态和错误状态
};

const getNestedValue = (obj, path) => {
    const keys = path.split('.'); // 根据 '.' 分割路径
    return keys.reduce((acc, key) => acc && acc[key], obj);
};

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isEnglish } = useLanguage();

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await fetch(`/configs/${isEnglish ? "en" : "zh"}.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch config');
                }
                const data = await response.json();
                setConfig(data);  // 将整个配置存入状态
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, [isEnglish]);


    // 在配置加载完成后，提供配置数据
    return (
        <ConfigContext.Provider value={{ config, loading, error }}>
            {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : children}
        </ConfigContext.Provider>
    );
};