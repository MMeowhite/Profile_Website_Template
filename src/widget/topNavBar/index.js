import React, { useEffect, useReducer, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styles from "./topNavBar.module.css";
import icons from "../../assets/icons";
import useConfig from "../../utils/useConfig";
import throttle from 'lodash/throttle';

// 初始状态
const initialState = {
    isNavBarVisible: true, // NavBar可见
    isMouseHoverOnNavBar: false, // 鼠标未停留在NavBar上
    isTimerActive: true,// 默认开启计时器
    isResetTimer: true, // 重制计时器
    isToggleClose: false, // Toggle图标
    isToggleActive: false, // Toggle未激活
    isSearchActive:false, // 搜索栏默认关闭
};

const topNavBarReducer = (state, action) => {
    switch (action.type) {
        // 显示Nav Bar
        case 'SHOW_NAV_BAR':
            return { ...state, isNavBarVisible: true };
        // 隐藏Nav Bar
        case 'HIDDEN_NAV_BAR':
            return { ...state, isNavBarVisible: false };


        //  设置移动端点击事件
        case 'SET_TOUCH':
            return { ...state, isNavBarVisible: true};

        //  设置页面向下滚动事件（当页面向下滚动时，默认设置NavBarVisible是false（不显示），同时判断是否滚动到了页面底部，如果滚动到底部显示NavBar，否则不显示）
        case 'PAGE_DOWN':
            return { ...state, isNavBarVisible: action.payload, isTimerActive: action.payload, isResetTimer: action.payload };
        //  设置页面向上滚动事件（向上滚动显示NavBar）
        case 'PAGE_UP':
            return { ...state, isNavBarVisible: true, isTimerActive: true, isResetTimer: true};

        //  设置鼠标移动事件
        case 'SET_MOUSE_MOVE':
            return { ...state, isNavBarVisible: state.isMouseHoverOnNavBar };
        //  设置鼠标移动至navbar区域的时候强制显示nav bar
        case 'SET_MOUSE_ENTER_NAV_BAR':
            return { ...state ,isTimerActive: false, isNavBarVisible: true, isMouseHoverOnNavBar: true};
        //  设置鼠标离开navbar区域的时候开启timer进行自动隐藏机制
        case 'SET_MOUSE_LEAVE_NAV_BAR':
            return { ...state, isTimerActive: true, isMouseHoverOnNavBar: false};

        //  设置点击toggle事件（改变toggle图标、展示/隐藏toggle、关闭/开启计时器）
        case 'CLICK_TOGGLE':
            return { ...state, isToggleClose: !state.isToggleClose, isToggleActive: !state.isToggleActive, isTimerActive: !state.isToggleActive}
        //  设置点击search事件（展示/隐藏search搜索栏，关闭是机器）
        case 'CLICK_SEARCH':
            return { ...state, isNavBarVisible: true, isSearchActive: !state.isSearchActive, isToggleActive: false, isToggleClose: true, isTimerActive: !state.isSearchActive}

        default:
            // 初始状态
            return state;
    }
}

const TopNavBar = React.memo(({ isDarkMode, toggleTheme }) => {
    const { configValue: topNavBarItemObject, loading, error } = useConfig("widgets.topNavBar");
    const [topNavItem, setTopNavItem] = useState({ title: "", link: [] });

    const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // 记录是否为小屏幕


    const [timer, setTimer] = useState(null); // 自动隐藏定时器

    const [searchTerm, setSearchTerm] = useState('');

    const [state, dispatch] = useReducer(topNavBarReducer, initialState);

    const handleSearch = () => {
        // 这里可以添加实际的搜索逻辑，比如调用API
    };
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    // 获取字体大小
    const getFontSize = () => {
        if (isSmallScreen) return "1.8rem";
        return "2.5rem"; // 默认字体大小为2.5rem
    };


    // 滚动事件逻辑
    const [lastScrollY, setLastScrollY] = useState(0); // 记录最后一次的y轴位置

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 10;

        // 滚动增量
        const scrollDistance = Math.abs(currentScrollY - lastScrollY);

        if (currentScrollY > lastScrollY && scrollDistance > 200) {
            // 向下滚动且滚动距离超过200px
            dispatch({
                type: 'PAGE_DOWN',
                payload: isAtBottom, // 如果到了页面底部，显示Navbar，否则隐藏
            });
        } else if (currentScrollY < lastScrollY && scrollDistance > 200) {
            // 向上滚动且滚动距离超过200px
            dispatch({ type: 'PAGE_UP' });
            handleTimer(); // Handle timer logic when scrolling up
        }

        // 更新 lastScrollY 为当前的滚动位置
        setLastScrollY(currentScrollY); // Move this after the dispatch to ensure it's updated for the next scroll
    };



    // 点击事件逻辑
    const handleClick = (event) =>{
        if (event.clientY < 100) {
            dispatch({type: "SHOW_NAV_BAR"})
        }
    }


    // 鼠标移动事件逻辑
    const handleMouseMove = (event) => {
        // 如果鼠标高度在NavBar内，设置鼠标进入navbar的状态，并执行相应的逻辑
        if (event.clientY < 100) {
            // 该部分逻辑为鼠标高度位于NavBar内
            // 设置状态
            dispatch({type: "SET_MOUSE_ENTER_NAV_BAR"});
            handleTimer();
        } else {
            // 该部分逻辑为鼠标高度并未在NavBar内
            dispatch({type: "SET_MOUSE_LEAVE_NAV_BAR"})
            handleTimer();
        }
    }


    // 计时器事件(自动隐藏事件)[当用户停止交互超过10秒时自动隐藏Navbar]
    const handleTimer = () => {
        if (state.isTimerActive) {
            // 开启计时器
            // 是否重置计时器
            if (state.isResetTimer) {
                // 重置计时器
                if (timer) clearTimeout(timer); // 清除之前的定时器
                // 设置新的计时器
                const newTimer = setTimeout(() => {
                    dispatch({type: "HIDDEN_NAV_BAR"})
                }, 10000); // 10秒后自动隐藏
                setTimer(newTimer); // 设置新的定时器
            }
        }
    }

    // 监听事件

    useEffect(() => {
        window.addEventListener("scroll", throttle(handleScroll, 200)); // 监听滚动
        window.addEventListener("click", (event) =>{handleClick(event)}); // 监听点击事件
        window.addEventListener("mousemove", throttle((event) => {handleMouseMove(event)}, 1000)); // 监听鼠标移动事件


        return () => {
            window.removeEventListener("scroll", throttle(handleScroll, 200)); // 清理滚动事件
            window.removeEventListener("click", handleClick); // 清理点击事件监听
            window.removeEventListener("mousemove", throttle(handleMouseMove, 1000)); // 清理鼠标移动事件监听
        };
        // eslint-disable-next-line
    }, []);

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
            style={{height: "100px", width: "100vw", position: "fixed", top: "0", left: "0", margin: "0", padding: "0", zIndex: "99999999999999999"}}
            onMouseMove={handleMouseMove} // 绑定鼠标移动事件
            onClick={handleClick}
        >
            <div
                className={`d-flex flex-row align-items-center justify-content-between ${styles.navbar} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                style={{
                    position: "fixed",
                    whiteSpace: "nowrap",
                    width: "100%",
                    margin: "auto 0",
                    height: "100px",
                    background: `${isDarkMode ? "rgba(255, 255, 255, )" : ""}`,
                    transition: "top 0.3s ease-in-out, opacity 0.3s ease", // 添加平滑动画
                    opacity: state.isNavBarVisible ? 1 : 0, // 添加渐变效果
                    top: state.isNavBarVisible ? "0" : "-100px", // 控制navbar位置
                }}
            >

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
                            dispatch({type: "CLICK_SEARCH"})
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
                                state.isToggleActive = !state.isToggleActive
                                state.isToggleClose = !state.isToggleClose
                                state.isTimerActive = !state.isToggleActive
                                state.isResetTimer = !state.isResetTimer
                            }}
                        >
                            {state.isToggleClose ? icons.close() : icons.open()}
                        </Button>
                    )}
                </div>
            </div>
            {/* 搜索按钮 */}
            { state.isSearchActive && (
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
            {isSmallScreen && state.isToggleActive && (
                <div
                    className={styles.fullScreenNav}
                    style={{
                        background: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
                        zIndex: "999999999"
                    }}
                    onClick={() => {
                        dispatch({ type: "CLICK_TOGGLE" }); // 关闭菜单
                    }}
                >
                    <div className={`${styles.navContent}`}>
                        <Nav className="d-flex flex-column align-items-center justify-content-center">
                            {topNavItem.link.map((link, index) => (
                                <Nav.Link
                                    key={index}
                                    href={link.link}
                                    className={`${styles.link}`}
                                    style={{ fontSize: "2rem", fontWeight: "500", padding: "1rem" }}
                                    onClick={() => state.isToggleActive = true} // 点击链接后关闭菜单
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
});

export default TopNavBar;