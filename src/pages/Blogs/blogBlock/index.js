import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../../utils/themeProvider";
import { generateTagColors } from "../../../utils/generateTagColors";
import Image from "react-bootstrap/Image";
import useConfig from "../../../utils/useConfig";

const BlogBlock = ({ blogItem }) => {
    const [avatar, setAvatar] = useState("");
    const [isMobile, setIsMobile] = useState(false); // 判断是否为手机屏幕
    const [hoveredAvatar, setHoveredAvatar] = useState("");
    const [defaultAvatar, setDefaultAvatar] = useState("");
    const [featuredImage, setFeaturedImage] = useState("");  // 新增 state 来存储图片路径
    const [name, setName] = useState('');
    const [boxShadowStyle, setBoxShadowStyle] = useState({})
    const { isDarkMode } = useTheme();
    const tagColors = generateTagColors(blogItem.tags);

    console.log(blogItem)

    const { configValue: avatarObj, error, loading } = useConfig("pages.home.avatar");

    const paths = window.location.pathname.split("/"); // 拆分路径为数组
    const blogPath = paths[1]; // 提取第二部分（假设 /blog 是第一级路径）

    const baseURL = `${window.location.protocol}//${window.location.host}/${blogPath}/`;

    // 设置头像和屏幕尺寸
    useEffect(() => {
        if (avatarObj) {
            setAvatar(avatarObj.init);
            setHoveredAvatar(avatarObj.hovered);
            setDefaultAvatar(avatarObj.init);
        }
        setName(blogItem.authorWeb);
        setFeaturedImage(blogItem.featuredImage)


        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 假设 768px 为手机设备
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // 初始时判断一次

        return () => {
            window.removeEventListener("resize", handleResize);
        };


    }, [blogItem.featuredImage, avatarObj]);

    if (error) {
        return <div>Error loading blog: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            id="blog-box"
            className="group cursor-pointer overflow-hidden rounded-md transition-transform hover:scale-105"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "600px",
                backgroundColor: "transparent",
                borderRadius: '12px',
                fontFamily: "inherit",
                ...boxShadowStyle,
            }}
            onMouseEnter={() =>
                setBoxShadowStyle({
                    boxShadow: isDarkMode
                        ? '0 0 24px 12px rgba(255, 255, 255, 0.1)' // 深色模式下的阴影
                        : '0 0 24px 12px rgba(0, 0, 0, 0.1)',
                })
            }
            onMouseLeave={() => setBoxShadowStyle({})} // Remove shadow on mouse leave
        >
            {/* 图片部分 */}
            <a id="box-img" href={`${baseURL}${blogItem.slug}`} className="relative block w-100">
                <img
                    id={blogItem.id}
                    alt={blogItem.title}
                    src={featuredImage}
                    className="rounded-md w-100"
                    loading="lazy"
                    style={{
                        width: "100%",
                        // height: "400px",
                        // minHeight: "200px",
                        objectFit: "cover",
                        aspectRatio: "16/9",
                        maxHeight: "300px",
                        imageRendering: "high-quality"
                    }}
                />
            </a>

            {/* 内容部分 */}
            <div
                id="box-content"
                style={{
                    minHeight: "200px", // 最小高度
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    // flex: "1"
                }}
            >
                {/* 标签部分 */}
                <div id="tags" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {blogItem.tags.map((tag, index) => (
                        <a
                            key={index}
                            href={tag.link? `/tags/${tag.link}` : ""}
                            className="text-uppercase font-weight-bold text-decoration-none"
                            style={{
                                fontSize: "1rem",
                                textTransform: "uppercase",
                                color: isDarkMode
                                    ? tagColors[tag.name.toLowerCase()]?.dark || "#ffffff"
                                    : tagColors[tag.name.toLowerCase()]?.light || "#000000",
                            }}
                        >
                            {tag.name}
                            {/* 仅在不是最后一个标签时显示 / */}
                            {index < blogItem.tags.length - 1 && (
                                <span
                                    style={{
                                        color: isDarkMode ? "#ffffff" : "#000000",
                                        fontSize: "1rem",
                                        fontWeight: "800",
                                        marginLeft: "0.5rem"
                                    }}
                                >
                                /
                                </span>
                            )}
                        </a>
                    ))}
                </div>

                {/* 标题部分 */}
                <h2
                    id="title"
                    style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        lineHeight: "1.4rem",
                        color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                >
                    <a
                        href={blogItem.link}
                        className="text-decoration-none"
                        style={{
                            color: isDarkMode ? "#ffffff" : "#000000",
                        }}
                    >
                        {blogItem.title}
                    </a>
                </h2>

                {/* 描述部分 */}
                <p
                    id="description"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: isDarkMode ? "#9ca3af" : "#6b7280",
                        maxHeight: "15rem",
                        // WebkitLineClamp: 9, // 显示行数
                        // WebkitBoxOrient: "vertical",
                        overflowY: "auto", // 超出显示行数的时候滑动显示
                        display: "block",
                    }}
                >
                    {blogItem.abstract}
                </p>

                {/* 头像与时间 */}
                <div
                    id="box-footer"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between", // 左右两侧对齐
                        alignItems: "center", // 确保所有子项垂直居中
                        gap: "1rem", // 调整间距，使其更紧凑
                    }}
                >
                    <div
                        id="box-footer-avatar"
                        style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center", // 确保所有子项垂直居中
                        gap: "1rem", // 调整间距，使其更紧凑
                    }}>
                        {/* Avatar */}
                        <Image
                            src={avatar}
                            alt="avatar"
                            className="img-fluid rounded-circle"
                            style={{
                                width: "3rem",
                                height: "3rem",
                                objectFit: "cover",
                            }}
                            onMouseEnter={() => setAvatar(hoveredAvatar)} // 鼠标悬停切换头像
                            onMouseLeave={() => setAvatar(defaultAvatar)} // 鼠标移开恢复默认头像
                            onClick={
                                isMobile ? () => setAvatar(avatar === defaultAvatar ? hoveredAvatar : defaultAvatar) : null
                            }
                        />

                        {/*  Name  */}
                        <div
                            id="box-footer-name"
                            style={{
                            fontSize: "0.9rem",
                            color: isDarkMode ? "#9ca3af" : "#6b7280",
                            lineHeight: "2rem", // 与头像高度一致
                            fontWeight: "800",
                        }}>
                            {blogItem.author ? blogItem.author : name}
                        </div>
                    </div>



                    {/* recorded time */}
                    <time
                        id="box-footer-time"
                        style={{
                            fontSize: "0.9rem",
                            fontStyle: "italic", // 设置斜体
                            color: isDarkMode ? "#9ca3af" : "#6b7280",
                            lineHeight: "2rem", // 与头像高度一致
                        }}
                    >
                        {blogItem.updatedTime}
                    </time>
                </div>
            </div>
        </div>
    );
};

export default BlogBlock;