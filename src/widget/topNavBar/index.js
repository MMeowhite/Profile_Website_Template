import React, { useEffect, useState } from "react";
import styles from "./topNavBar.module.css";
import icons from "../../assets/icons";
import useConfig from "../../utils/useConfig";

const TopNavBar = ({ isDarkMode, toggleTheme }) => {
    const { configValue: topNavBarItemObject, loading, error } = useConfig('widgets.topNavBar');
    const [topNavItem, setTopNavItem] = useState({ title: '', link: [] });  // 初始化 state

    // useEffect 监听配置变化
    useEffect(() => {
        if (topNavBarItemObject && topNavBarItemObject.length > 0) {
            setTopNavItem(topNavBarItemObject[0]); // 更新 topNavItem
        }
    }, [topNavBarItemObject]); // 依赖 topNavBarItemObject

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading configuration: {error}</div>;
    }

    return (
        <nav
            className={`${styles.navbar} ${
                isDarkMode ? styles.darkMode : styles.lightMode
            }`}
            style={{gap:"4rem"}} // setting gap between left part and right part
        >
            <div className={styles.left}>
                <a href="/" className={styles.title}>{topNavItem.title}</a>
            </div>

            {/* 动态渲染链接 */}
            <div className={styles.right}>
                {topNavItem.link.map((link, index) => (
                    <a key={index} href={link.link} className={styles.link}>
                        {link.name}
                    </a>
                ))}
                <button onClick={toggleTheme} className={styles.themeToggle}>
                    {isDarkMode ? icons.moon() : icons.sun()} {/* 图标切换 */}
                </button>
            </div>
        </nav>
    );
};

export default TopNavBar;