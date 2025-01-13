import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../components/themeProvider";
import { generateTagColors } from "../../utils/generateTagColors";

const BlogCard = ({ blogItem }) => {
    const { isDarkMode } = useTheme();
    const tagColors = generateTagColors(blogItem.tags);

    return (
        <div
            className="group cursor-pointer overflow-hidden rounded-md transition-all hover:scale-105"
            style={{
                display: "flex",
                flexDirection: "column",
                border: "none",
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                fontFamily: "inherit",
            }}
        >
            {/* 图片部分 */}
            <a href={blogItem.link} className="relative block">
                <img
                    alt={blogItem.title}
                    src={blogItem.imageSrc}
                    className="rounded-md w-100"
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                    }}
                />
            </a>

            {/* 内容部分 */}
            <div
                style={{
                    padding: "1rem",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* 标签部分 */}
                <div className="flex gap-3">
                    {blogItem.tags.map((tag, index) => (
                        <a
                            key={index}
                            href={`/tag/${tag.link}`}
                            className="text-uppercase font-weight-bold text-decoration-none"
                            style={{
                                fontSize: "1rem",
                                marginRight: "0.5rem",
                                textTransform: "uppercase",
                                color: isDarkMode
                                    ? tagColors[tag.name].dark
                                    : tagColors[tag.name].light,
                            }}
                        >
                            {tag.name}
                        </a>
                    ))}
                </div>

                {/* 标题部分 */}
                <h2
                    className="mt-2"
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
                    className="mt-2"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: isDarkMode ? "#9ca3af" : "#6b7280",
                        maxHeight: "4.5rem", // 显示行数=maxHeight / lineHeight
                        overflowY: "auto", // 超出部分用滚轮
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {blogItem.description}
                </p>

                {/* 时间部分 */}
                <time
                    style={{
                        fontSize: "0.9rem",
                        color: isDarkMode ? "#9ca3af" : "#6b7280",
                    }}
                >
                    {blogItem.date}
                </time>
            </div>
        </div>
    );
};

export default BlogCard;
