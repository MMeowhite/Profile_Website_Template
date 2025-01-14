import React, { useEffect, useState } from "react";
import {Navbar, Nav, Button, Col, Row} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styles from "./topNavBar.module.css";
import icons from "../../assets/icons";
import useConfig from "../../utils/useConfig";

const TopNavBar = ({ isDarkMode, toggleTheme }) => {
    const { configValue: topNavBarItemObject, loading, error } = useConfig("widgets.topNavBar");
    const [topNavItem, setTopNavItem] = useState({ title: "", link: [] });
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const [isClosed, setIsClosed] = useState(false);

    const getFontSize = () => {
        if (isSmallScreen) return "1.8rem";
        return "2.5rem"; // 默认字体大小为2.5rem
    };

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
            expand="lg"
            className={`${styles.navbar} ${isDarkMode ? styles.darkMode : styles.lightMode}`}
            fixed="top"
        >
            <Row className="align-items-center w-100 px-3">
                {/* 左侧标题部分 */}
                <Col xs="auto" className="text-start">
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
                </Col>

                {/* 中间导航部分 */}
                <Col className="text-center">
                    <Navbar.Collapse id="navbar-content" className="justify-content-center">
                            <Nav style={{ gap: "5rem"}} className="d-flex flex-row justify-content-center align-items-center">
                                {topNavItem.link.map((link, index) => (
                                    <Nav.Link
                                        key={index}
                                        href={link.link}
                                        className={`${styles.link}`}
                                        style={{ fontSize: "1.5rem" , fontWeight: "500"}}
                                    >
                                        {link.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                    </Navbar.Collapse>
                </Col>

                {/* 右侧按钮部分 */}
                <Col xs="auto" className="d-flex flex-row align-items-center gap-3 text-end">
                    {/* 搜索按钮 */}
                    <Button
                        variant="outline-secondary"
                        className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                        style={{boxShadow: 'none'}}
                    >
                        {icons.search()}
                    </Button>

                    {/* 主题切换按钮 */}
                    <Button
                        variant="outline-secondary"
                        onClick={toggleTheme}
                        className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                        style={{boxShadow: 'none'}}
                    >
                        {isDarkMode ? icons.moon() : icons.sun()}
                    </Button>

                    <Navbar.Toggle aria-controls="navbar-content" className={`${isDarkMode ? "text-white" : "text-dark"}`} style={{border: 'none'}}>
                        <Button
                            style={{boxShadow: 'none'}}
                            variant="outline-secondary"
                            className={`border-0 ${isDarkMode ? styles.darkMode : styles.lightMode}`}
                            onClick={() => {setIsClosed(!isClosed)}}
                        >
                            {isClosed ? icons.close() : icons.open()}
                        </Button>
                    </Navbar.Toggle>
                </Col>
            </Row>
        </Navbar>
    );
};

export default TopNavBar;