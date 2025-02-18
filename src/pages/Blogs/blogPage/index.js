import React, { useEffect, useState, useCallback } from "react";
import MarkdownRender from "../../../utils/markdownRender";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../utils/themeProvider";
import { AiOutlineUnorderedList, AiOutlineClose } from "react-icons/ai";
import IconNavComponent from "../../../widget/iconNavComponent";
import { FcAlarmClock, FcPlanner, FcGlobe } from "react-icons/fc";


const BlogPage = () => {
    const { isDarkMode } = useTheme();
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
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

    const [isTocOpen, setIsTocOpen] = useState(true);
    const [isTocVisible, setIsTocVisible] = useState(false);

    const handleTocUpdate = useCallback((toc) => {
        setToc(toc); // 缓存 ToC 数据
    }, []);


    // 跳转到指定锚点
    const handleAnchorClick = (id) => {
        console.log("Jumping to:", id);
        const targetElement = document.getElementById(id);

        if (targetElement) {
            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 50; // 兼容未找到导航栏的情况
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight - 10; // 适当调整偏移量，避免过于贴近导航栏

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            // 可选：高亮显示目标标题，增强用户体验
            targetElement.style.transition = "background-color 0.3s ease";
            targetElement.style.backgroundColor = isDarkMode ? "#334155" : "#e9f5ff"; // 轻微的高亮
            setTimeout(() => {
                targetElement.style.backgroundColor = "transparent";
            }, 1000);
        }
    };


    useEffect(() => {
        const loadBlogItems = async () => {
            try {
                const response = await fetch("/blogs/blog_config.json");
                const data = await response.json();
                setBlogItems(data);

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
        <div style={{ marginTop: "120px", width: "100%", padding: isSmallScreen ? "0 10px" : "0 30px" }}>
            {/* 文章标题部分 */}
            <div style={{ width: "100%", textAlign: isSmallScreen ? "center" : "left" }}>
                <h1 style={{ fontWeight: "800", fontSize: isSmallScreen ? "30px" : "40px" }}>
                    {blogItem.title}
                </h1>
            </div>

            {/* 日期、作者、推荐阅读时间以及地点部分 */}
            <div
                id="blog-page-intro"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        fontWeight: "600",
                        fontSize: isSmallScreen ? "16px" : "18px",
                        color: isDarkMode ? "#d1d5db" : "#6b7280",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: isSmallScreen ? "10px" : "14px",
                        width: "100%",
                        justifyContent: isSmallScreen ? "center" : "flex-start",
                    }}
                >
                    <div className="d-flex flex-row align-items-center"><FcPlanner/>&nbsp;{blogItem.publishDate}</div>
                    <span>·</span>
                    <div className="d-flex flex-row align-items-center">
                        <img
                            src={blogItem.authorImg}
                            alt="AuthorImg"
                            style={{
                                height: isSmallScreen ? "24px" : "28px",
                                width: isSmallScreen ? "24px" : "28px",
                                borderRadius: "50%",
                                border: isDarkMode ? "1px solid #d1d5db" : "1px solid #6b7280",
                            }}
                        />{" "}
                        &nbsp;
                        {blogItem.authorWeb}
                    </div>
                    <span>·</span>
                    <div className="d-flex flex-row align-items-center"><FcAlarmClock/>&nbsp;{blogItem.readingTime} read</div>
                </div>

                <div
                    style={{
                        fontWeight: "600",
                        fontSize: isSmallScreen ? "16px" : "18px",
                        color: isDarkMode ? "#d1d5db" : "#6b7280",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: isSmallScreen ? "10px" : "14px",
                        width: "100%",
                        justifyContent: isSmallScreen ? "center" : "flex-end",
                    }}
                >
                    <div className="d-flex flex-row align-items-center"><FcGlobe/>&nbsp;{blogItem.publishLocation}</div>
                </div>
            </div>

            <hr />

            {/* 文章正文部分 */}
            <div
                id="blog-page-content"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "50px"
                }}
            >
                {/* markdown渲染部分 */}
                <div id="markdown-part" style={{width: "100%"}}>
                    <MarkdownRender
                        id={blogItem.id}
                        key={blogItem.slug}
                        markdownPath={markdownPath}
                        onTocUpdate={handleTocUpdate}
                    />
                </div>

                {/* 更新日期信息 */}
                <div
                    id="blog-page-footer"
                    style={{ textAlign: isSmallScreen ? "center" : "right", width: "100%", fontSize: isSmallScreen ? "16px" : "18px" }}
                >
                    Last updated on <strong><i>{blogItem.updatedTime}</i></strong>
                </div>

                {/* tag部分 */}
                <div>
                    {blogItem.tags?.map((tag, index)=>(
                        <div>
                            <button>

                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 脚注部分 */}
            <div style={{ width: "100%", marginBottom: "80px"  }}>
                {/* 作者部分 */}
                <div className="d-flex flex-row align-items-center" style={{ width: "100%", marginBottom: "40px", gap: "40px", overflowX: "auto", height: "130px"}}>
                    {blogItem.authorsContent?.map((author)=>(
                        <div className="d-flex flex-row" style={{gap: "20px", height: "110px"}}>
                            {/* 作者头像 */}
                            <div>
                                <a href={author.website}>
                                    <img
                                        src={author.img}
                                        alt="MMeowhite"
                                        height="120px"
                                        width="120px"
                                        style={{
                                            borderRadius: "50%"
                                        }}
                                    />
                                </a>
                            </div>

                            {/* 作者信息 */}
                            <div className="d-flex flex-column" style={{gap: "1px", height: "110px", textAlign: "left"}}>
                                <span style={{fontSize: "24px"}}>{author.name}</span>
                                <span style={{fontSize: "20px"}}>{author.career}</span>
                                <span style={{fontSize: "16px"}}>{author.organization}</span>
                                <IconNavComponent style={{height: "20px", width: "20px", gap: "0"}}/>
                            </div>
                        </div>
                    ))}
                </div>

                <hr />
                <div id="blog-page-reference" style={{ width: "100%" }}>
                    References:
                    <br />
                    {blogItem &&
                        blogItem.references.map((reference, index) => {
                            const [key, url] = Object.entries(reference)[0]; // 获取对象中的第一个键值对
                            return (
                                <div key={index}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        [{key}] {`${url}`}
                                    </a>
                                </div>
                            );
                        })}
                </div>

                <hr />
                {/* 翻页导航 */}
                <div
                    id="blog-page-pre-next-reading"
                    style={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: isSmallScreen ? "16px" : "0",
                    }}
                >
                    {/* Previous Blog */}
                    <div style={{ display: "flex", alignItems: "center", maxWidth: isSmallScreen ? "100%" : "45%" }}>
                        {previousBlog ? (
                            <>
                                <a
                                    href={`/blogs/${previousBlog.slug}`}
                                    style={{ marginRight: "1rem", fontSize: "1.5rem", textDecoration: "none" }}
                                >
                                    ←
                                </a>
                                <div style={{ textAlign: "left" }}>
                                    <a
                                        href={`/blogs/${previousBlog.slug}`}
                                        className="previous-blog"
                                        style={{ textDecoration: "none", fontWeight: "bold" }}
                                    >
                                        {previousBlog.title}
                                    </a>
                                    <br />
                                    <div
                                        style={{
                                            marginTop: "0.5rem",
                                            fontSize: "0.9rem",
                                            color: "#6c757d",
                                        }}
                                    >
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            maxWidth: isSmallScreen ? "100%" : "45%",
                            justifyContent: isSmallScreen ? "center" : "flex-end",
                        }}
                    >
                        {nextBlog ? (
                            <>
                                <div style={{ textAlign: "right", marginRight: "1rem" }}>
                                    <a
                                        href={`/blogs/${nextBlog.slug}`}
                                        className="next-blog"
                                        style={{ textDecoration: "none", fontWeight: "bold" }}
                                    >
                                        {nextBlog.title}
                                    </a>
                                    <br />
                                    <div
                                        style={{
                                            marginTop: "0.5rem",
                                            fontSize: "0.9rem",
                                            color: "#6c757d",
                                        }}
                                    >
                                        {nextBlog.author} <br />
                                        {nextBlog.publishDate} <br />
                                        {nextBlog.readingTime} read
                                    </div>
                                </div>
                                <a
                                    href={`/blogs/${nextBlog.slug}`}
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
            </div>

            {/* 目录Toggle */}
            <div>
                <div
                    style={{
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        zIndex: "20000",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setIsTocOpen(!isTocOpen);
                        setIsTocVisible(!isTocVisible);
                    }}
                >
                    {isTocOpen ? (
                        <AiOutlineUnorderedList style={{ height: "50px", width: "100px" }} />
                    ) : (
                        <AiOutlineClose style={{ height: "50px", width: "100px" }} />
                    )}
                </div>

                {isTocVisible && (
                    <aside
                        style={{
                            width: "250px",
                            position: "fixed",
                            top: "160px",
                            bottom: "100px",
                            right: "40px",
                            background: isDarkMode ? "rgba(44, 44, 44, 0.5)" : "rgba(255, 255, 255, 0.5)",
                            color: isDarkMode ? "#e2e8f0" : "#1e293b",
                            overflowY: "auto",
                            maxHeight: "calc(100vh - 120px)",
                        }}
                    >
                        <ul
                            style={{
                                listStyle: "none",
                                padding: "0",
                                margin: "0",
                            }}
                        >
                            {toc.map((item) => (
                                <li
                                    key={item.id}
                                    style={{
                                        marginLeft: `${(item.level - 1) * 20}px`,
                                        marginBottom: "10px",
                                        fontSize: "1rem",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    <button
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: isDarkMode ? "#60a5fa" : "#007BFF",
                                            textAlign: "left",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            transition: "background-color 0.2s, color 0.2s",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor = isDarkMode
                                                ? "#334155"
                                                : "#e9f5ff")
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
                )}
            </div>
        </div>
    );
};

export default BlogPage;
