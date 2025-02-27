import React, { useEffect, useState } from 'react';
import BlogBlock from "../blogBlock";
import {useLanguage} from "../../../utils/Provider/languageProvider";

const BlogBlocks = () => {
    const [blogItemsConfig, setBlogItemsConfig] = useState([]);
    const [err, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const { isEnglish } = useLanguage();

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await fetch(`/blogs/configs/${isEnglish ? "en" : "zh"}.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch config');
                }
                const data = await response.json();
                setBlogItemsConfig(data);  // 将整个配置存入状态
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, [isEnglish]);

    if (loading) {
        return <div>Loading...</div>; // 加载时显示加载状态
    }

    if (err) {
        return <div>Error: {err}</div>; // 出现错误时显示错误消息
    }

    return (
        <div id="blog-cards" className="masonry-grid" style={{ marginTop: "10rem", marginBottom: "3rem" }}>
            {blogItemsConfig.length > 0 ? (
                blogItemsConfig.map((blogItem, index) => (
                    <div
                        id={`blog-card${index}`}
                        className="masonry-item"
                        key={index}
                    >
                        <BlogBlock blogItem={blogItem} />
                    </div>
                ))
            ) : (
                <div>No blog items available.</div> // 如果没有配置数据，显示相应提示
            )}
        </div>
    );
};

export default BlogBlocks;
