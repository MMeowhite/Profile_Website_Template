import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from "react-router-dom";

const Nav = () => {
    const [navItemNames, setNavItemName] = useState([]);
    const [navItemLinks, setNavItemLink] = useState([]);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/config.json");
                const data = await response.json();

                // 获取 navbar 的所有项，动态计算并生成 navItems 数组
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

    // 当页面加载完成后，检查 URL 中是否有 hash，如果有则将页面滚动到顶部
    useEffect(() => {
        if (window.location.hash) {
            window.scrollTo(0, 0); // 将页面滚动到顶部
        }
    }, []);

    // smooth scroll function
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
                window.scrollTo(0, targetPosition); // 确保最终位置准确
            }
        }

        requestAnimationFrame(scrollStep);
    };

    // 修改 handleClick 函数来使用自定义滚动
    const handleClick = (event, id) => {
        event.preventDefault(); // 阻止默认行为（跳转页面）
        smoothScrollTo(id, 500); // 使用自定义滚动动画，设置滚动时间为 1500 毫秒
        window.location.hash = id; // 更新URL哈希
    };

    return (
        <div>
            <nav className="navigate uppercase html-bottom">
                <ul>
                    {navItemNames.length > 0 && navItemNames.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={navItemLinks[index]}
                                onClick={(e) => handleClick(e, item)} // 使用原始 item
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
