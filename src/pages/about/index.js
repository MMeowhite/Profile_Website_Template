import React from 'react';
import { Link } from 'react-router-dom'
import './about.css'
import aboutMeImg from  '../../assets/images/about_me.svg'


const About = () => {
    const handleClick = (event, id) => {
        event.preventDefault(); // 阻止默认行为
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动
            window.location.hash = id; // 更新哈希
        }
    };

    return (
        <section className="about">
            <div className="left-container">

                {/* title and picture */}
                <div className="middle">
                    <div className="inner">
                        <h2 className="text-color-white subtitled uppercase">
                            <p>About</p>
                            <img src={aboutMeImg} alt=""/>
                        </h2>
                    </div>
                </div>

                {/* brief introduction */}
                <div className="brief-introduction">
                    <h3 className="text-color-white subtitled uppercase">
                        Brief Introduction....
                    </h3>
                </div>

                {/*linked to the selected page*/}
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

            </div>

            <div className="right-container">
                <div className="content">
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                </div>
            </div>
        </section>
    )
}

export default About;