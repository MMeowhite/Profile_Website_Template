import React, {useEffect} from "react";
import { useConfig }from "../../utils/Provider/ConfigProvider";
import { useTheme } from "../../utils/Provider/themeProvider";
import AOS from 'aos'; // 引入AOS库

const Projects = () => {
    const { isDarkMode } = useTheme();
    const { configValue: projectsData, error, loading } = useConfig("pages.projects");

    // 初始化AOS动画
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects: {error.message}</p>;

    const { title, desc, list } = projectsData;

    const cardStyles = {
        backgroundColor: isDarkMode ? "#333333" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        borderRadius: "10px",
        width: "100%",
        transform: "scale(1)",
        marginBottom: "20px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };

    const cardHoverStyles = {
        transform: "scale(1.1)",
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
            <h1 className="text-center mb-4" style={{ fontSize: "40px", fontWeight: "800" }}>
                {title}
            </h1>
            <p className="text-center mb-5 text-muted" style={{ fontSize: "1.2rem" }}>
                {desc}
            </p>

            {/* 项目列表 */}
            <div className="row g-5" data-aos="fade-in">
                {list &&
                    list.map((item, index) => (
                        <div className="col-12 col-sm-6 col-lg-4" key={index} style={{border: "none"}}>
                            <div
                                className="h-100"
                            >
                                <div
                                    style={{...cardStyles}}
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
                                </div>
                                <div>
                                    <h5
                                        style={{
                                            fontSize: "1.5rem",
                                            marginBottom: "20px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.title}
                                    </h5>
                                    <p
                                        style={{
                                            fontSize: "1rem",
                                            color: isDarkMode ? "#dddddd" : "#666666",
                                        }}
                                    >
                                        {item.desc}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.9rem",
                                            marginTop: "15px",
                                            textAlign: "right"
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
