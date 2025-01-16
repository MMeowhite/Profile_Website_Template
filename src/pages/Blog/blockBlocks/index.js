import React, {useEffect, useState} from 'react'
import useConfig from "../../../utils/useConfig";
import BlogCard from "../../../widget/blogBlock";

const BlogBlocks = () => {
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
    )
}

export default BlogBlocks;