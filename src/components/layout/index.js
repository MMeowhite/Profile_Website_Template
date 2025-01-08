// src/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../../widget/topNavBar';
import { useTheme } from '../themeProvider'; // 使用 ThemeContext
import './layout.css';

const Layout = () => {
    const { isDarkMode, toggleTheme } = useTheme(); // 使用 useTheme 来获取主题状态和切换方法

    return (
        <div className={isDarkMode ? 'layout dark-mode' : 'layout light-mode'}>
            {/* 渲染导航栏 */}
            <TopNavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            {/* 渲染子路由内容 */}
            <Outlet />
            <span style={{ display: "block", fontSize: "15px", color : isDarkMode? "#dcdcdc" : "#777777", textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
    &copy; 2025 MMeowhite. All rights reserved. This work is licensed under &nbsp;
    <a href="https://mit-license.org" style={{ color: "#007bff", textDecoration: "none" }}>MIT license</a>.
    <br />
    Published in &nbsp;
    <a href="https://github.com/MMeowhite/Profile_Website_Template" style={{ color: "#007bff", textDecoration: "none" }}>
        Profile Website Template
    </a> — the free, open source project on GitHub created by &nbsp;
    <a href="https://github.com/MMeowhite" style={{ color: "#007bff", textDecoration: "none" }}>
        MMeowhite
    </a>.
</span>

        </div>
    );
};

export default Layout;
