import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../components/themeProvider";
import useConfig from "../../utils/useConfig";
import icons from "../../assets/icons";

const Nav = (props) => {
    const [navItemNames, setNavItemName] = useState([]);
    const [navItemLinks, setNavItemLink] = useState([]);
    const { isDarkMode } = useTheme();
    const [isToggled, setIsToggled] = useState(false); // 控制是否显示导航栏

    useEffect(() => {
        const handleResize = () => {
            // 窗口宽度小于 996px 时显示为 toggle 导航
            if (window.innerWidth < 768) {
                setIsToggled(true);
            } else {
                setIsToggled(false);
            }
        };

        // 初始判断
        handleResize();

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 获取配置文件数据
    const { configValue: navbarConfig, loading, error } = useConfig('widgets.navbar');

    useEffect(() => {
        if (navbarConfig) {
            const navItems = Object.keys(navbarConfig);
            const navItemNames = navItems.map(item => navbarConfig[item].name);
            const navItemLinks = navItems.map(item => navbarConfig[item].link);

            setNavItemName(navItemNames);
            setNavItemLink(navItemLinks);
        }
    }, [navbarConfig]);

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

        const targetPosition = targetElement.getBoundingClientRect().top;
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
        event.preventDefault();
        smoothScrollTo(id, 500);
    };

    const toggleNav = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div>
            {/* 小屏幕下的 Toggle 按钮 */}
            {isToggled ? (
                <div className="toggle-button" onClick={toggleNav}>
                    {icons.close()} {/* 点击时显示关闭图标 */}
                </div>
            ) : (
                <div className="toggle-button" onClick={toggleNav}>
                    {icons.open()} {/* 点击时显示打开图标 */}
                </div>
            )}

            {/* 导航栏，只有在 isToggled 为 true 时显示 */}
            {isToggled && (
                <nav className="navigate html-bottom vertical-nav" style={props.style}>
                    <ul>
                        {navItemNames.length > 0 &&
                            navItemNames.map((item, index) => (
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
            )}
        </div>
    );
};

export default Nav;
