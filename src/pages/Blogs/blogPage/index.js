import React, { useEffect, useState, useCallback } from "react";
import MarkdownRender from "../../../utils/markdownRender";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../components/themeProvider";
import "./blogPage.css";

const BlogPage = () => {
    const { isDarkMode } = useTheme();
    const { slug } = useParams(); // 从路由参数中获取 slug
    const [blogItems, setBlogItems] = useState([]); // 用于存储所有博客内容
    const [blogItem, setBlogItem] = useState(null); // 用于存储当前博客内容
    const [markdownPath, setMarkdownPath] = useState(""); // 用于存储 Markdown 文件路径
    const [toc, setToc] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const blogIndex = blogItems.findIndex((item) => item.slug === slug); // 找到当前博客的索引
    const previousBlog = blogIndex > 0 ? blogItems[blogIndex - 1] : null; // 计算前一篇博客
    const nextBlog = blogIndex < blogItems.length - 1 ? blogItems[blogIndex + 1] : null; // 计算后一篇博客

    const handleTocUpdate = useCallback((toc) => {
        setToc(toc); // 缓存 ToC 数据
    }, []);

    // 跳转到指定锚点
    const handleAnchorClick = (id) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            const navbarHeight = document.querySelector(".navbar").offsetHeight || 50;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        // 假设你有一个方法加载所有博客项
        const loadBlogItems = async () => {
            try {
                const response = await fetch('/blogs/blog_config.json'); // 假设配置在此路径
                const data = await response.json();
                setBlogItems(data); // 存储所有博客项

                // 查找匹配的当前博客项
                const currentBlogItem = data.find((item) => item.slug === slug);
                if (currentBlogItem) {
                    setMarkdownPath(currentBlogItem.resource);
                    setLoading(true);
                    fetch(currentBlogItem.resource)
                        .then((response) => response.text())
                        .then((text) => {
                            setBlogItem({ ...currentBlogItem, content: text });
                            setLoading(false);
                        })
                        .catch((error) => {
                            setError("Failed to load the blog content.");
                            setLoading(false);
                        });
                } else {
                    setError("Blog not found!");
                    setLoading(false);
                }
            } catch (err) {
                setError("Failed to load blog items.");
                setLoading(false);
            }
        };

        loadBlogItems(); // 加载博客数据
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="blog" style={{ marginTop: "10rem" }}>
            <h1 style={{ fontWeight: "800" }}>{blogItem.title}</h1>
            <hr style={{ height: "1rem" }} />
            <div id="blog-page-intro">
                {blogItem.publishDate} &nbsp; · &nbsp; {blogItem.author} &nbsp; · &nbsp; {blogItem.readingTime} read
            </div>

            <div className="d-flex flex-row" style={{ gap: "8rem" }}>
                <div id="blog-page-content" style={{ display: "flex", flexDirection: "column" }}>
                    <MarkdownRender
                        id={blogItem.id}
                        key={blogItem.slug}
                        markdownPath={markdownPath}
                        onTocUpdate={handleTocUpdate}
                    />
                    <div id="blog-page-footer" style={{ textAlign: "right" }}> Last updated on {blogItem.updatedTime}</div>
                    <hr />
                    <div id="blog-page-reference">
                        References: <br />
                        {blogItem ? blogItem.references.map((reference, index) => {
                            const [key, url] = Object.entries(reference)[0]; // 获取对象中的第一个键值对
                            return (
                                <div key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                        [{key}] {`${url}`}
                                    </a>
                                </div>
                            );
                        }) : null}
                    </div>
                    <hr />
                    <div
                        id="blog-page-pre-next-reading"
                        className="d-flex flex-row justify-content-between align-items-start"
                    >
                        {/* Previous Blog */}
                        <div style={{ display: "flex", alignItems: "center", maxWidth: "45%" }}>
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
                    <hr />
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

            <div id="blog-page-recommend-reading"></div>
        </div>
    );
};

export default BlogPage;
