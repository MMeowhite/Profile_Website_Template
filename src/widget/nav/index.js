import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from "react-router-dom";
import {useTheme} from "../../components/themeProvider";

const Nav = () => {
    const [navItemNames, setNavItemName] = useState([]);
    const [navItemLinks, setNavItemLink] = useState([]);

    const { isDarkMode } = useTheme(); // 使用 useTheme 来获取主题状态和切换方法
    // 解析 json 文件中的 Nav 名称
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/config.json");
                const data = await response.json();

                const navItems = data.widgets.navbar ? Object.keys(data.widgets.navbar) : [];
                const navItemNames = navItems.map(item => data.widgets.navbar[item].name);
                const navItemLinks = navItems.map(item => data.widgets.navbar[item].link);

                setNavItemName(navItemNames);
                setNavItemLink(navItemLinks);
            } catch (error) {
                console.error('Error loading the config:', error);
            }
        };
        fetchConfig();
    }, []);


    // 如果button点击后刷新主题模式

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
            <nav className="navigate uppercase html-bottom">
                <ul>
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