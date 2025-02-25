import { useState, useEffect } from 'react';
import { useLanguage } from "./languageProvider";

/**
 * 深度获取嵌套的对象属性
 * @param {Object} obj - 配置对象
 * @param {string} path - 属性路径，例如 'database.host'
 * @returns {*} - 返回对应的属性值，如果路径不存在则返回 undefined
 */
const getNestedValue = (obj, path) => {
    const keys = path.split('.'); // 根据 '.' 分割路径
    return keys.reduce((acc, key) => acc && acc[key], obj);
};

const useConfig = (key) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await fetch(`/configs/config_en.json`);
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
    }, []);

    // 如果配置加载完成，则返回相应的配置项
    const configValue = config ? getNestedValue(config, key) : null; // 使用路径获取嵌套值

    return { configValue, loading, error };
};

export default useConfig;