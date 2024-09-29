import React from 'react';
import './nav.css';
import {Link} from "react-router-dom";

const Nav = () => {
    const handleClick = (event, id) => {
        event.preventDefault(); // 阻止默认行为
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动
            window.location.hash = id; // 更新哈希
        }
    };

    return (
        <nav className="navigate uppercase">
            <ul>
                <li>
                    <Link to="#about" onClick={(e) =>handleClick(e, 'about')}>about</Link>
                </li>
                <li>
                    <Link to="#skills" onClick={(e) =>handleClick(e, 'skills')}>skills</Link>
                </li>
                <li>
                    <Link to="/cv">cv</Link>
                </li>
                <li>
                    <Link to="#contact" onClick={(e) => handleClick(e, 'contact')}>contact</Link>
                </li>
                <li>
                    <Link to="#research" onClick={(e) => handleClick(e, 'research')}>research</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;