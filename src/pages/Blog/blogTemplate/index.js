import React from 'react'
import MarkdownRender from "../../../utils/markdownRender";
import "./blogTemplate.css"


const BlogTemplate = () => {
    return (
        <div className="blog" style={{marginTop: "10rem"}}>
            <MarkdownRender/>
        </div>
    )
}

export default BlogTemplate;