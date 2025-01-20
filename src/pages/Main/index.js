import React from 'react';
import Home from "./home";
import ContactMe from "./contactMe";
import FeaturedPublication from "./publicationSection/featuredPublication";

const Main = () => {
    return (
        <React.Fragment>
            <Home />
            <FeaturedPublication />
            <ContactMe />
        </React.Fragment>
    );
};

export default Main;
