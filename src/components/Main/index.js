import React from 'react';
import About from '../../pages/about';
import Skill from "../../pages/skills";
import Contact from '../../pages/contact';
import Research from "../../pages/research";
import Home from "../../pages/home";

const Main = () => {
    return (
        <React.Fragment>
            <Home />
            <About />
            <Skill />
            <Contact />
            <Research />
        </React.Fragment>
    );
};

export default Main;
