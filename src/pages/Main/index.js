import React from 'react';
import Home from "./home";
import ContactMe from "./contactMe";
import PublicationSection from "./publicationSection";
import ExperienceSection from "./experienceSection";

const Main = () => {
    return (
        <React.Fragment>
            <Home />
            <ExperienceSection />
            <PublicationSection />
            <ContactMe />
        </React.Fragment>
    );
};

export default Main;
