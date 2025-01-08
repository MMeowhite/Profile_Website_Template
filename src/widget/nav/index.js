import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../components/themeProvider";
import useConfig from "../../utils/useConfig";

const Nav = (props) => {
    const [navItemNames, setNavItemName] = useState([]);
    const [navItemLinks, setNavItemLink] = useState([]);

    const { isDarkMode } = useTheme(); // 使用 useTheme 来获取主题状态和切换方法

    // 使用 useConfig 来获取嵌套的 navbar 配置
    const { configValue: navbarConfig, loading, error } = useConfig('widgets.navbar');

    // 解析 json 文件中的 Nav 名称
    useEffect(() => {
        if (navbarConfig) {
            const navItems = Object.keys(navbarConfig);
            const navItemNames = navItems.map(item => navbarConfig[item].name);
            const navItemLinks = navItems.map(item => navbarConfig[item].link);

            setNavItemName(navItemNames);
            setNavItemLink(navItemLinks);
        }
    }, [navbarConfig]); // 当 navbarConfig 更新时重新运行

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading configuration: {error}</div>;
    }

    // 平滑滚动到目标位置
    const smoothScrollTo = (targetId, duration = 1000) => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeInOut = (progress / duration) < 0.5
                ? 2 * (progress / duration) ** 2
                : -1 + (4 - 2 * (progress / duration)) * (progress / duration);

            window.scrollTo(0, startPosition + distance * easeInOut);

            if (progress < duration) {
                requestAnimationFrame(scrollStep);
            } else {
                window.scrollTo(0, targetPosition);
                window.location.hash = targetId;
            }
        }

        requestAnimationFrame(scrollStep);
    };

    const handleClick = (event, id) => {
        // 阻止页面默认跳转
        event.preventDefault();
        // 滚动到页面相应位置
        smoothScrollTo(id, 500);
    };

    return (
        <div>
            <nav className="navigate uppercase html-bottom" style={props.style}>
                <ul style={{ marginBottom: 0 }}>
                    {navItemNames.length > 0 && navItemNames.map((item, index) => (
                        <li key={index}>
                            <Link
                                to="#"
                                onClick={(e) => handleClick(e, navItemLinks[index])}
                                className={isDarkMode ? "dark" : "light"}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Nav;