import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../components/themeProvider"
import MarkdownRender from "../../../utils/markdownRender";
import blogConfig from "../blog_config.json";
import "./blogPage.css"


// 图片路径处理函数
const dynamicImportPath = (Path) => {
    return import(`/src/${Path}`).then((module) => {
        return module.default; // Webpack 会处理并返回路径
    });
};

const BlogPage = () => {
    const { isDarkMode } = useTheme();
    const { slug } = useParams(); // 从路由参数中获取 slug
    const blogItem = blogConfig.find((item) => item.slug === slug); // 根据 slug 找到对应的博客数据
    const [markdownPath, setMarkdownPath] = useState("");

    const blogIndex = blogConfig.findIndex((item) => item.slug === slug); // 找到当前博客的索引
    // 计算前一篇和后一篇博客
    const previousBlog = blogIndex > 0 ? blogConfig[blogIndex - 1] : null;
    const nextBlog = blogIndex < blogConfig.length - 1 ? blogConfig[blogIndex + 1] : null;

    const [toc, setToc] = useState([]);

    const handleTocUpdate = useCallback((toc) => {
        setToc(toc); // 缓存 ToC 数据
    }, []);

    // 跳转到指定锚点
    const handleAnchorClick = (id) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            const navbarHeight = document.querySelector(".navbar").offsetHeight || 50;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (!blogItem) return;
        let isMounted = true;

        dynamicImportPath(blogItem.resource)
            .then((path) => {
                if (isMounted) setMarkdownPath(path);
            })
            .catch((err) => console.error("Error loading markdown file:", err));

        return () => {
            isMounted = false; // 防止内存泄漏
        };
    }, [blogItem]);

    if (!blogItem) {
        return <div>Blog not found!</div>;
    }

    return (
        <div className="blog" style={{ marginTop: "10rem" }}>
            <h1 style={{fontWeight: "800"}}>{blogItem.title}</h1>
            <hr style={{height: "1rem"}}/>
            <div id="blog-page-intro">
                {blogItem.publishDate} &nbsp; · &nbsp; {blogItem.author} &nbsp; · &nbsp; {blogItem.readingTime} read
            </div>

            <div className="d-flex flex-row" style={{gap: "8rem"}}>
                <div id="blog-page-content" style={{ display: "flex", flexDirection: "column"}}>
                    <MarkdownRender
                        id={blogItem.id}
                        key={blogItem.slug}
                        markdownPath={markdownPath}
                        onTocUpdate={handleTocUpdate}
                    />
                    <div id="blog-page-footer" style={{ textAlign: "right" }}> Last updated on {blogItem.updatedTime}</div>
                    <hr/>
                    <div id="blog-page-reference">
                        References: <br />
                        {blogItem.references.map((reference, index) => {
                            // 获取对象的键值对
                            const [key, url] = Object.entries(reference)[0]; // 获取对象中的第一个键值对
                            return (
                                <div key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                        [{key}] {`${url}`}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                    <hr/>
                    <div
                        id="blog-page-pre-next-reading"
                        className="d-flex flex-row justify-content-between align-items-start"
                    >
                        {/* Previous Blog */}
                        <div style={{ display: "flex", alignItems: "center", maxWidth: "45%"}}>
                            {previousBlog ? (
                                <>
                                    <a
                                        href={`/blog/${previousBlog.slug}`}
                                        style={{ marginRight: "1rem", fontSize: "1.5rem", textDecoration: "none" }}
                                    >
                                        ←
                                    </a>
                                    <div style={{ textAlign: "left" }}>
                                        <a
                                            href={`/blog/${previousBlog.slug}`}
                                            className="previous-blog"
                                            style={{ textDecoration: "none", fontWeight: "bold" }}
                                        >
                                            {previousBlog.title}
                                        </a>
                                        <br />
                                        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#6c757d" }}>
                                            {previousBlog.author} <br />
                                            {previousBlog.publishDate} <br />
                                            {previousBlog.readingTime} read
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ visibility: "hidden" }}>No Previous Blog</div>
                            )}
                        </div>

                        {/* Next Blog */}
                        <div style={{ display: "flex", alignItems: "center", maxWidth: "45%", justifyContent: "flex-end" }}>
                            {nextBlog ? (
                                <>
                                    <div style={{ textAlign: "right", marginRight: "1rem" }}>
                                        <a
                                            href={`/blog/${nextBlog.slug}`}
                                            className="next-blog"
                                            style={{ textDecoration: "none", fontWeight: "bold" }}
                                        >
                                            {nextBlog.title}
                                        </a>
                                        <br />
                                        <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#6c757d" }}>
                                            {nextBlog.author} <br />
                                            {nextBlog.publishDate} <br />
                                            {nextBlog.readingTime} read
                                        </div>
                                    </div>
                                    <a
                                        href={`/blog/${nextBlog.slug}`}
                                        style={{ marginLeft: "1rem", fontSize: "1.5rem", textDecoration: "none" }}
                                    >
                                        →
                                    </a>
                                </>
                            ) : (
                                <div style={{ visibility: "hidden" }}>No Next Blog</div>
                            )}
                        </div>
                    </div>
                    <hr/>
                </div>

                <div>
                    <aside
                        style={{
                            width: "250px", /* 固定宽度 */
                            padding: "20px", /* 内边距 */
                            position: "fixed", /* 固定位置 */
                            background: isDarkMode ? "#1e293b" : "#f9f9f9", /* 根据主题切换背景色 */
                            color: isDarkMode ? "#e2e8f0" : "#1e293b", /* 根据主题切换文本颜色 */
                            border: isDarkMode ? "1px solid #334155" : "1px solid #ddd", /* 边框颜色适配 */
                            borderRadius: "8px", /* 圆角 */
                            boxShadow: isDarkMode
                                ? "0 4px 8px rgba(255, 255, 255, 0.3)" /* 暗色主题阴影更强 */
                                : "0 4px 8px rgba(0, 0, 0, 0.3)", /* 明色主题阴影更柔和 */
                            overflowY: "auto", /* 垂直滚动 */
                            maxHeight: "calc(100vh - 120px)", /* 最大高度 */
                        }}
                    >
                        <ul
                            style={{
                                listStyle: "none", /* 去除列表符号 */
                                padding: "0", /* 清除内边距 */
                                margin: "0", /* 清除外边距 */
                            }}
                        >
                            {toc.map((item) => (
                                <li
                                    key={item.id}
                                    style={{
                                        marginLeft: `${(item.level - 1) * 20}px`, /* 层级缩进 */
                                        marginBottom: "10px", /* 行间距 */
                                        fontSize: "1rem", /* 字体大小 */
                                        lineHeight: "1.5", /* 行高 */
                                    }}
                                >
                                    <button
                                        style={{
                                            background: "none", /* 无背景 */
                                            border: "none", /* 无边框 */
                                            color: isDarkMode ? "#60a5fa" : "#007BFF", /* 根据主题切换按钮颜色 */
                                            textAlign: "left", /* 左对齐 */
                                            fontWeight: "500", /* 字体加粗 */
                                            cursor: "pointer", /* 鼠标手势 */
                                            padding: "5px 10px", /* 按钮内边距 */
                                            borderRadius: "5px", /* 按钮圆角 */
                                            transition: "background-color 0.2s, color 0.2s", /* 动效 */
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor = isDarkMode ? "#334155" : "#e9f5ff")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor = "transparent")
                                        }
                                        onClick={() => handleAnchorClick(item.id)}
                                    >
                                        {item.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>

                </div>
            </div>


            <div id="blog-page-recommend-reading">

            </div>

        </div>
    );
};

export default BlogPage;