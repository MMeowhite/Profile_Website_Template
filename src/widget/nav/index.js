import React, { useState, useEffect } from 'react';
import './nav.css';
import { Link } from "react-router-dom";
import { useTheme } from "../../components/themeProvider";
import useConfig from "../../utils/useConfig";
import icons from "../../assets/icons";

// 平滑滚动到目标位置
const smoothScrollTo = (targetId, duration = 1000) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
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
        }
    }

    requestAnimationFrame(scrollStep);
};

const Nav = (props) => {
    const [navItemNames, setNavItemName] = useState([]);
    const [navItemLinks, setNavItemLink] = useState([]);
    const { isDarkMode } = useTheme();

    const [isToggleShow, setIsToggleShow] = useState(false); // 控制汉堡菜单是否显示
    const [isToggled, setIsToggled] = useState(false); // 控制是否显示导航栏
    const [isToggleNavShow, setIsToggleNavShow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsToggleShow(true);
            } else {
                setIsToggleShow(false);
            }
        };

        // 初始判断
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 监听 URL Hash 变化并滚动到目标
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash) {
                const targetId = window.location.hash.replace("#", ""); // 获取 ID
                smoothScrollTo(targetId, 500);
            }
        };

        // 页面加载时检查 hash
        handleHashChange();

        // 监听 hash 变化
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []); // 仅在组件挂载时执行

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

    const handleClick = (event, id) => {
        event.preventDefault();
        window.location.hash = id; // 更新 hash，触发 `hashchange`
        smoothScrollTo(id, 500);
    };

    const toggleNav = () => {
        setIsToggled(!isToggled); // 设置 toggle 图标的变化
        setIsToggleNavShow(!isToggleNavShow); // 设置 toggleNav 是否进行展示
    };

    return (
        <div>
            {isToggleShow ? (
                <div className="toggle-section">
                    <div className="toggle-button" onClick={toggleNav}>
                        {isToggled ? icons.close() : icons.open()} {/* 根据 isToggled 状态选择图标 */}
                    </div>
                    {isToggleNavShow && (
                        <nav className="navigate html-bottom vertical-nav" style={props.style}>
                            <ul>
                                {navItemNames?.length > 0 &&
                                    navItemNames.map((item, index) => (
                                        <li key={index} className="m-2">
                                            <Link
                                                to={`#${item.toLowerCase()}`}
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
            ) : (
                <nav className="navigate html-bottom horizontal-nav" style={props.style}>
                    <ul>
                        {navItemNames?.length > 0 &&
                            navItemNames.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={`#${item}`}
                                        onClick={(e) => handleClick(e, navItemLinks[index])}
                                        className={isDarkMode ? "dark" : "light"}
                                        style={{ paddingLeft: "5px" }}
                                    >
                                        {index === navItemNames.length - 1 ? item : `${item} ·`}
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
