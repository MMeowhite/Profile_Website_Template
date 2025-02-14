import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../widget/topNavBar';
import { useTheme } from './themeProvider'; // 使用 ThemeContext

const Layout = () => {
    const { isDarkMode, toggleTheme } = useTheme(); // 使用 useTheme 来获取主题状态和切换方法

    return (
        <div
            style={
            isDarkMode ? {
                display:"flex",
                flexDirection: "column",
                minHeight: "100vh",
                transition: "background-color 0.3s ease, color 0.3s ease",
                background: "#2c2c2c",
                color: "#f1f1f1"
            } : {
                display:"flex",
                flexDirection: "column",
                minHeight: "100vh",
                transition: "background-color 0.3s ease, color 0.3s ease",
                background: "#fff",
                color: "#000"
            }}
        >
            {/* TopNavBar */}
            <TopNavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* 页面内容区域 */}
            <main style={{ flexGrow: 1}}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer
                style={{
                    display: "block",
                    fontSize: "15px",
                    color : isDarkMode? "#dcdcdc" : "#777777",
                    textAlign: "center",
                    margin: "0 20px 10px 20px"}}
            >
                &copy; 2025 MMeowhite. All rights reserved. This work is licensed under <a href="https://mit-license.org" style={{ color: "#007bff", textDecoration: "none" }}>MIT license</a>.
                <br />
                Published in &nbsp;
                <a href="https://github.com/MMeowhite/Profile_Website_Template" style={{ color: "#007bff", textDecoration: "none" }}>
                Profile Website Template
                </a> — the free, open source project on GitHub created by &nbsp;
                <a href="https://github.com/MMeowhite" style={{ color: "#007bff", textDecoration: "none" }}>
                MMeowhite
                </a>.
            </footer>
        </div>
    );
};

export default Layout;
