import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownRender from "../../../utils/markdownRender";
import blogConfig from "../blog_config.json";


// 图片路径处理函数
const dynamicImportPath = (Path) => {
    return import(`/src/${Path}`).then((module) => {
        return module.default; // Webpack 会处理并返回路径
    });
};

const BlogPage = () => {
    const { slug } = useParams(); // 从路由参数中获取 slug
    const blogItem = blogConfig.find((item) => item.slug === slug); // 根据 slug 找到对应的博客数据
    const [markdownPath, setMarkdownPath] = useState("");

    useEffect(() => {
        if (blogItem) {
            dynamicImportPath(blogItem.resource)
                .then((path) => {
                    setMarkdownPath(path); // 更新 Markdown 文件路径
                })
                .catch((err) => console.error("Error loading markdown file:", err));
        }
    }, [blogItem]);

    if (!blogItem) {
        return <div>Blog not found!</div>;
    }

    return (
        <div className="blog" style={{ marginTop: "10rem" }}>
            <h1>{blogItem.title}</h1>

            <MarkdownRender
                id={blogItem.id}
                key={blogItem.slug}
                markdownPath={markdownPath}
            />
        </div>
    );
};

export default BlogPage;