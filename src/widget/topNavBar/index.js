import React from "react";
import styles from "./topNavBar.module.css";
import icons from "../../assets/icons";

const TopNavBar = ({ isDarkMode, toggleTheme }) => {
    return (
        <nav
            className={`${styles.navbar} ${
                isDarkMode ? styles.darkMode : styles.lightMode
            }`}
        >
            <div className={styles.left}>
                <span className={styles.name}>Welcome to my home!</span>
            </div>
            <div className={styles.right}>
                <a href="#publications" className={styles.link}>
                    Publications
                </a>
                <a href="#talks" className={styles.link}>
                    Talks
                </a>
                <a href="#teaching" className={styles.link}>
                    Teaching
                </a>
                <a href="#portfolio" className={styles.link}>
                    Portfolio
                </a>
                <a href="#blog" className={styles.link}>
                    Blog Posts
                </a>
                <button onClick={toggleTheme} className={styles.themeToggle}>
                    {isDarkMode ? icons.moon() : icons.sun()} {/* 图标切换 */}
                </button>
            </div>
        </nav>
    );
};

export default TopNavBar;