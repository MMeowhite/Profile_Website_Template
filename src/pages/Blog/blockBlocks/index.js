import React from 'react'
import BlogCard from "../blogBlock";
import blogItemsConfig from "../blog_config.json"

const BlogBlocks = () => {
    return (
        <div id="blog-cards" className="masonry-grid" style={{marginTop: "10rem", marginBottom: "3rem"}}>
            {blogItemsConfig.map((blogItem, index) => (
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