import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styles from "./topNavBar.module.css";
import icons from "../../assets/icons";
import useConfig from "../../utils/useConfig";
import throttle from 'lodash/throttle';

const TopNavBar = ({ isDarkMode, toggleTheme }) => {
    const { configValue: topNavBarItemObject, loading, error } = useConfig("widgets.topNavBar");
    const [topNavItem, setTopNavItem] = useState({ title: "", link: [] });
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });

    const [lastScrollY, setLastScrollY] = useState(0); // 记录上次的y轴位置
    const [isVisible, setIsVisible] = useState(true); // 状态控制Navbar显示与否
    const [timer, setTimer] = useState(null); // 自动隐藏定时器
    const [isScrollingDown, setIsScrollingDown] = useState(false); // 判断是否向下滚动
    const [isNavOpen, setIsNavOpen] = useState(false); // 控制全屏导航是否打开

    const [isSearchOpen, setIsSearchOpen] = useState(false); //控制搜索是否打开
    const [searchTerm, setSearchTerm] = useState('');
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        // 这里可以添加实际的搜索逻辑，比如调用API
    };

    // 获取字体大小
    const getFontSize = () => {
        if (isSmallScreen) return "1.8rem";
        return "2.5rem"; // 默认字体大小为2.5rem
    };

    // 滚动事件处理
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // 当滚动到页面的最上面时，强制显示Navbar
        if (currentScrollY === 0) {
            setIsVisible(true);
            setIsScrollingDown(false); // 处于顶部时，不判断滚动方向
        }
        // 当滚动到页面的最底部时，强制隐藏Navbar（可以根据需求调整）
        else if (currentScrollY + windowHeight >= documentHeight) {
            setIsVisible(false);
            setIsScrollingDown(true); // 处于底部时，自动隐藏
        }
        // 在页面中间滚动时，判断滚动方向
        else {
            if (currentScrollY > lastScrollY) {
                setIsScrollingDown(true);  // 向下滚动
                setIsVisible(false); // 向下滚动时隐藏Navbar
            } else {
                setIsScrollingDown(false);  // 向上滚动
                setIsVisible(true);  // 向上滚动时显示Navbar
            }
        }

        setLastScrollY(currentScrollY);
        resetAutoHideTimer(); // 每次滚动时重置定时器
    };


    // 鼠标悬停处理：鼠标悬停到指定区域时，显示Navbar
    const handleMouseEnter = () => {
        if (window.scrollY < 100) {
            setIsVisible(true); // 如果当前滚动位置小于100px，则显示Navbar
        }
    };

    // 鼠标离开时，重启定时器
    const handleMouseLeave = () => {
        resetAutoHideTimer(); // 鼠标离开时，重启计时器，开始自动隐藏行为
    };

    // 用户交互处理：点击事件和滚动事件都会重置定时器，并确保Navbar显示
    const handleUserInteraction = () => {
        if (isScrollingDown) return; // 如果是向下滚动时不允许显示Navbar

        setIsVisible(true); // 显示Navbar
        resetAutoHideTimer(); // 重置自动隐藏定时器
    };

    // 启动定时器，当用户停止交互超过10秒时自动隐藏Navbar
    const resetAutoHideTimer = () => {
        if (timer) clearTimeout(timer); // 清除之前的定时器
        const newTimer = setTimeout(() => {
            if (!isScrollingDown) {  // 如果当前不是向下滚动，自动隐藏Navbar
                setIsVisible(false); // 10秒后自动隐藏
            }
        }, 10000); // 10秒后自动隐藏
        setTimer(newTimer); // 设置新的定时器
    };

    // 自动隐藏Navbar功能
    useEffect(() => {
        window.addEventListener("scroll", throttle(handleScroll, 200));
        window.addEventListener("click", handleUserInteraction); // 监听点击事件
        window.addEventListener("mousemove", handleUserInteraction); // 监听鼠标移动事件

        // 悬停事件处理
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("scroll", throttle(handleScroll, 200));
            window.removeEventListener("click", handleUserInteraction); // 清理点击事件监听
            window.removeEventListener("mousemove", handleUserInteraction); // 清理鼠标移动事件监听
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [timer, isScrollingDown]); // 当timer或isScrollingDown变化时，重新绑定事件

    useEffect(() => {
        if (topNavBarItemObject && topNavBarItemObject.length > 0) {
            setTopNavItem(topNavBarItemObject[0]);
        }
    }, [topNavBarItemObject]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading configuration: {error}</div>;
    }

    return (
            <Navbar
                id="topNavBar"
                expand="lg"
                className={`${styles.navbar} ${isDarkMode ? styles.darkMode : styles.lightMode} ${isVisible ? styles.navbarShow : styles.navbarHide}`}
                style={{
                    transition: "top 0.3s ease-in-out, opacity 0.3s ease", // 添加平滑动画
                    opacity: isVisible ? 1 : 0, // 添加渐变效果
                    top: isVisible ? "0" : "-100px", // 控制navbar位置
                    position: "fixed",
                }}
                onMouseEnter={handleMouseEnter} // 鼠标悬浮时显示Navbar
                onMouseLeave={handleMouseLeave} // 鼠标离开时隐藏Navbar
            >
                <div className="d-flex flex-row align-items-center justify-content-between" style={{whiteSpace: "nowrap", width: "100%", margin: "auto 0", height: "100px"}}>
                    {/* 左侧标题部分 */}
                    <div>
                        <Navbar.Brand
                            href="/"
                            style={{
                                color: isDarkMode ? "#ffffff" : "#000000", // 根据主题动态设置颜色
                                fontSize: getFontSize(),
                                fontWeight: "bold",
                                transition: "font-size 0.3s ease",
                                marginLeft: "2rem"
                            }}
                        >
                            {topNavItem.title}
                        </Navbar.Brand>
                    </div>

                    {/* 中间导航部分 */}
                    <div>
                        <Navbar.Collapse id="navbar-content" className="justify-content-center">
                            <Nav style={{ gap: "5rem" }} className="d-flex flex-row justify-content-center align-items-center">
                                {topNavItem.link.map((link, index) => (
                                    <Nav.Link
                                        key={index}
                                        href={link.link}
                                        className={`${styles.link}`}
                                        style={{ fontSize: "1.5rem", fontWeight: "500" }}
                                    >
                                        {link.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </Navbar.Collapse>
                    </div>

                    {/* 右侧按钮部分 */}
                    <div className="d-flex flex-row align-items-center gap-3 text-end" style={{marginRight: "2rem"}}>
                        {/* 搜索按钮 */}
                        <Button
                            aria-label="Toggle theme"
                            variant="outline-secondary"
                            className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                            style={{ boxShadow: "none" }}
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                                setIsVisible(true)
                                setTimer()
                            }}
                        >
                            {icons.search()}
                        </Button>

                        {/* 主题切换按钮 */}
                        <Button
                            aria-label="Toggle theme"
                            variant="outline-secondary"
                            onClick={toggleTheme}
                            className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                            style={{ boxShadow: "none" }}
                        >
                            {isDarkMode ? icons.moon() : icons.sun()}
                        </Button>

                        {/* 全局汉堡按钮 */}
                        {isSmallScreen && (
                            <Button
                                aria-label="Toggle theme"
                                style={{ boxShadow: "none" }}
                                variant="outline-secondary"
                                className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                                onClick={() => {
                                    setIsNavOpen(!isNavOpen)
                                }}
                            >
                                {isNavOpen ? icons.close() : icons.open()}
                            </Button>
                        )}
                    </div>
                </div>
                {/* 搜索按钮 */}
                { isSearchOpen && (
                    <div className={styles.container}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                        <Button onClick={handleSearch} className={styles.button}>
                            Search
                        </Button>
                    </div>
                )}


                {/* 全屏导航菜单 */}
                {isNavOpen && isSmallScreen && (
                    <div className={styles.fullScreenNav} style={{background: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}}>
                        <div className={`${styles.navContent}`}>
                            <Nav className="d-flex flex-column align-items-center justify-content-center">
                                {topNavItem.link.map((link, index) => (
                                    <Nav.Link
                                        key={index}
                                        href={link.link}
                                        className={`${styles.link}`}
                                        style={{ fontSize: "2rem", fontWeight: "500", padding: "1rem" }}
                                        onClick={() => setIsNavOpen(false)} // 点击链接后关闭菜单
                                    >
                                        {link.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                        </div>
                    </div>
                )}
            </Navbar>

    );
};

export default TopNavBar;