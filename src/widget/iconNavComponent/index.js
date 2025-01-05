import React, { useState, useEffect } from 'react';
import styles from './iconNavComponent.module.css';
import {Link} from "react-router-dom"; // 引入模块化样式

const IconNavComponent = () => {
    const [linkIconObj, setLinkIcon] = useState([]);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch("/config.json");
                const data = await response.json();

                const iconNavComponent = data.widgets.iconNavComponent || [];
                setLinkIcon(iconNavComponent);
            } catch (error) {
                console.log('Error loading the config', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                {linkIconObj.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <Link to={item.link} className={styles.navLink}>
                            <img
                                src={item.icon}
                                alt={item.type}
                                className={styles.iconStyle}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default IconNavComponent;
