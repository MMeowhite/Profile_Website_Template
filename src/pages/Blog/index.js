import React, { useState, useEffect } from 'react';
import BlogCard from '../../widget/blogBlock';
import useConfig from "../../utils/useConfig";
import './blog.css'


const Blog = () => {
    const [blogItems, setBlogItems] = useState([]);

    const { configValue: blogItemsConfig, error, loading } = useConfig('pages.blog');

    useEffect(() => {
        if (blogItemsConfig) {
            setBlogItems(blogItemsConfig);
        }
    }, [blogItemsConfig]);

    if (error) {
        return <div>Blog errors: {error}</div>;
    }

    if (loading) {
        return <div>Blog pages loading...</div>;
    }

    return (
        <div id="blog-page" className="container mt-5">
            {/* 瀑布流布局容器 */}
            <div id="blog-cards" className="masonry-grid" style={{marginTop: "10rem", marginBottom: "10rem"}}>
                {blogItems.map((blogItem, index) => (
                    <div
                        id={`blog-card${index}`}
                        className="masonry-item"
                        key={index}
                    >
                        <BlogCard blogItem={blogItem} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;