import React from 'react';
import About from './about';
import Skill from "./skills";
import Home from "./home";

const Main = () => {
    return (
        <React.Fragment>
            <Home />
            <About />
            <Skill />
        </React.Fragment>
    );
};

export default Main;
