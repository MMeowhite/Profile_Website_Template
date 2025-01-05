import React, { useState, useEffect } from "react";
import styles from './paperBlock.module.css';
import { parseReferenceContent } from "../../utils/referencesParser";
import {Link} from "react-router-dom";

const PaperBlock = () => {
    const [references, setReferences] = useState([]);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const response = await fetch('/references.bib'); // 获取文件
                const text = await response.text(); // 获取文件内容
                const parsedData = parseReferenceContent(text); // 自动判断并解析数据
                console.log(parsedData)
                setReferences(parsedData); // 设置解析后的数据
            } catch (error) {
                console.error("Error loading reference file:", error);
            }
        };

        fetchReferences(); // 调用 fetch 函数
    }, []); // 只在组件挂载时运行一次

    if (references.length === 0) {
        return <div>Loading...</div>; // 如果数据尚未加载，显示加载状态
    }

    return (
        <div className={styles.referenceBox}>
            {references.map((reference, index) => {
                // Safety check for authors (it could be undefined or not an array)
                const authors = Array.isArray(reference.authors) ? reference.authors.join(", ") : "Unknown Authors";

                return (
                    <div key={index} className={styles.referenceItemFrame}>
                        {/* Image Section */}
                        <div className={styles.imgContainer}>
                            {/* image placeholder or content */}
                            <img src="/images/avatar.png" alt="hello" />
                        </div>

                        {/* Words Section */}
                        <div className={styles.contentContainer}>
                            <div className={styles.referenceItem}>
                                <h4 className={styles.referenceTitle}>{reference.title}</h4>
                                <h5 className={styles.referenceAuthors}>{authors}</h5>
                                <p className={styles.referenceAbstract}>{reference.abstract}</p>
                                <p className={styles.referenceIntro}>
                                    <b>Journal: </b>  {reference.journal} &emsp;
                                    <b>DOI:</b>  <Link to={reference.doi} className={styles.referenceLink}>{reference.doi}</Link> &emsp;
                                    <b>Year:</b>  {reference.year}
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
