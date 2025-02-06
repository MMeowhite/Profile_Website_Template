import React from "react";
import useConfig from "../../utils/useConfig";
import { useTheme } from "../../components/themeProvider";

const Projects = () => {
    const { isDarkMode } = useTheme();
    const { configValue: projectsData, error, loading } = useConfig("pages.projects");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects: {error.message}</p>;

    const { title, desc, list } = projectsData;

    const cardStyles = {
        backgroundColor: isDarkMode ? "#333333" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        border: `2px solid ${isDarkMode ? "#cccccc" : "#444444"}`,
        borderRadius: "10px",
        padding: "20px",
        width: "100%",
        height: "100%",
        boxShadow: isDarkMode
            ? "0 8px 12px rgba(255, 255, 255, 0.2)"
            : "0 8px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };

    const cardHoverStyles = {
        transform: "scale(1.05)",
        boxShadow: isDarkMode
            ? "0 12px 20px rgba(255, 255, 255, 0.4)"
            : "0 12px 20px rgba(0, 0, 0, 0.2)",
    };

    const imageStyles = {
        borderRadius: "10px 10px 0 0",
        objectFit: "cover",
        height: "220px",
        width: "100%",
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            {/* 页面标题和描述 */}
            <h1 className="text-center mb-4" style={{ fontSize: "4rem" }}>
                {title}
            </h1>
            <p className="text-center mb-5 text-muted" style={{ fontSize: "1.2rem" }}>
                {desc}
            </p>

            {/* 项目列表 */}
            <div className="row g-5">
                {list &&
                    list.map((item, index) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={index}>
                            <div
                                className="card h-100"
                                style={{ ...cardStyles }}
                                onMouseEnter={(e) =>
                                    Object.assign(e.currentTarget.style, cardHoverStyles)
                                }
                                onMouseLeave={(e) =>
                                    Object.assign(e.currentTarget.style, cardStyles)
                                }
                            >
                                <a href={item.url}>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        style={imageStyles}
                                    />
                                </a>
                                <div className="card-body">
                                    <h5
                                        className="card-title"
                                        style={{
                                            fontSize: "1.5rem",
                                            marginBottom: "20px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.title}
                                    </h5>
                                    <p
                                        className="card-text"
                                        style={{
                                            fontSize: "1rem",
                                            color: isDarkMode ? "#dddddd" : "#666666",
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                    <p
                                        className="card-text text-muted"
                                        style={{
                                            fontSize: "0.9rem",
                                            marginTop: "15px",
                                        }}
                                    >
                                        <small>{item.time}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Projects;
