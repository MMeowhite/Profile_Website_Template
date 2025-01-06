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
        </div>
    );
};

export default Layout;
