import React, { useState, useEffect } from 'react';
import styles from './iconNavComponent.module.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/Provider/themeProvider";
import {useConfig} from "../../utils/Provider/ConfigProvider";
import {useMediaQuery} from "react-responsive";

const IconNavComponent = ({ style }) => {
    const [linkIconObj, setLinkIcon] = useState([]);
    const { isDarkMode } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null); // 追踪悬停项的索引
    const { configValue: iconNavComponent } = useConfig("widgets.iconNavComponent")
    const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // 记录是否为小屏

    useEffect(() => {
        setLinkIcon(iconNavComponent);
    }, [iconNavComponent]);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList} style={{ gap: style?.gap || isSmallScreen ? "20px" :"40px" }}>
                {linkIconObj.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link
                            to={item.link}
                            className={styles.navLink}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                width: hoveredIndex === index ? (style?.hoverWidth || "60px") : (style?.width || "40px"),
                                height: hoveredIndex === index ? (style?.hoverHeight || "60px") : (style?.height || "40px"),
                                transition: "all 0.3s ease-in-out",
                            }}
                        >
                            <img
                                src={item.icon}
                                alt={item.type}
                                className={styles.iconStyle}
                                style={{
                                    filter: isDarkMode ? "invert(1)" : "invert(0)",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default IconNavComponent;