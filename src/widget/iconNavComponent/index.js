import React, { useState, useEffect } from 'react';
import styles from './iconNavComponent.module.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/themeProvider";

const IconNavComponent = (props) => {
    const [linkIconObj, setLinkIcon] = useState([]);
    const { isDarkMode } = useTheme(); // 修改为 isDarkMode

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

    // 动态获取当前主题的图标填充颜色
    // const getFillColor = () => (isDarkMode ? "#ffffff" : "#000000"); // 修改为 isDarkMode

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {linkIconObj.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link to={item.link} className={styles.navLink}>
                            {item.icon.endsWith('.svg') ? (
                                <img
                                    src={item.icon}
                                    alt={item.type}
                                    className={styles.iconStyle}
                                    style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} // 使用反转颜色
                                />
                            ) : (
                                <img src={item.icon} alt={item.type} className={styles.iconStyle} />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default IconNavComponent;