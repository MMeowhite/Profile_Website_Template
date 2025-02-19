import React, { useState, useEffect } from 'react';
import styles from './iconNavComponent.module.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/themeProvider";

const IconNavComponent = ({ style }) => {
    const [linkIconObj, setLinkIcon] = useState([]);
    const { isDarkMode } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null); // 追踪悬停项的索引

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/config.json");
                const data = await response.json();
                const iconNavComponent = data.widgets.iconNavComponent || [];
                setLinkIcon(iconNavComponent);
            } catch (error) {
                console.log('Error loading the config', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList} style={{ gap: style?.gap || "40px" }}>
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