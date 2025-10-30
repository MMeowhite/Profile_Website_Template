import React, { useState, useEffect } from "react";
import styles from './paperBlock.module.css';
import { parseReferenceContent } from "../../utils/referencesParser";
import { Link } from "react-router-dom";
import { useConfig } from "../../utils/Provider/ConfigProvider"
import AOS from "aos";
import {useTheme} from "../../utils/Provider/themeProvider";


const PaperBlock = () => {
    const { isDarkMode } = useTheme();
    const [references, setReferences] = useState([]);
    const { configValue: referenceConfig, loading, error } = useConfig('references');

    // 如果引用数据来自外部 .bib 文件，按需替换 fetch 的 URL
    const fetchReferences = async (url) => {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const parsedData = parseReferenceContent(text);
            setReferences(parsedData); // 更新引用数据
        } catch (error) {
            console.error("Error loading reference file:", error);
        }
    };

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true })
    },[])

    // 使用 useEffect 来获取引用文件的 URL 或直接的引用数据
    useEffect(() => {
        if (referenceConfig) {
            // 获取配置中的 bib 文件路径
            const bibFileUrl = referenceConfig;

            if (bibFileUrl) {
                fetchReferences(bibFileUrl); // 加载并解析 bib 文件
            }
        }
    }, [referenceConfig]); // 依赖 referenceConfig

    // 显示加载状态
    if (loading) {
        return <div>Loading references...</div>;
    }

    // 显示错误状态
    if (error) {
        return <div>Error loading configuration: {error}</div>;
    }

    // 如果没有引用数据，则显示一个占位符或提示
    if (references.length === 0) {
        return <div>No references available</div>;
    }

    return (
        <div className={styles.referenceBox}>
            {references.map((reference, index) => {
                // 安全检查作者字段
                const authors = Array.isArray(reference.authors) ? reference.authors.join("; ") : "Unknown Authors";
                const imageSrc = reference.image || "/images/avatar.png";
                console.log(reference)
                return (
                    <div key={index} className={styles.referenceItemFrame} style={{background: "inherit", boxShadow: isDarkMode ? "0 4px 8px rgba(255, 255, 255, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.1)"}} data-aos="fade-up">
                        {/* Image Section */}
                        <div className={styles.imgContainer}>
                            <img src={imageSrc} alt="Author" className={styles.referenceImage}/>
                        </div>

                        {/* Content Section */}
                        <div className={styles.contentContainer}>
                            <div className={styles.referenceItem} style={{gap: "15px"}}>
                                <h4 className={styles.referenceTitle} style={{font: isDarkMode ? "#666" : "#333"}}>{reference.title}</h4>
                                <h5 className={styles.referenceAuthors} style={{font: isDarkMode ? "#777" : "#555"}}>{authors}</h5>
                                <p className={styles.referenceAbstract}>{reference.abstract}</p>
                                <p className={styles.referenceIntro}>
                                    <strong>Journal: </strong>  {reference.journal} &emsp;
                                    <strong>DOI:</strong>  <Link to={reference.doi} className={styles.referenceLink}>{reference.doi}</Link> &emsp;
                                    <strong>Year:</strong>  {reference.year}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PaperBlock;