import React, {useEffect} from 'react';
import About from '../../pages/about';
import Skill from "../../pages/skills";
import Contact from '../../pages/contact';
import Research from "../../pages/research";
import Home from "../../pages/home"
import "./main.css"
import Footer from "../Footer";
import {Outlet} from "react-router-dom";
import FloatBtn from "../../widget/floatBtn";


const Main = () => {
    const scrollToHash = () => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        console.log(id, element)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // 处理初始加载时的哈希
        scrollToHash();

        // 监听 hashchange 事件
        window.addEventListener('hashchange', scrollToHash);
        return () => {
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, []);

  return (
    <div className="main">
        <FloatBtn />
        <div id="home"><Home /></div>
        <div id="about"><About /></div>
        <div id="skill"><Skill /></div>
        <div id="contact"><Contact /></div>
        <div id="research"><Research /></div>
        <Outlet /> {/* 用于渲染子路由 */}
        <Footer />
    </div>
  )

}

export default Main;