import React from 'react';
import Home from "./home";
import ContactMe from "./contactMe";
import PublicationSection from "./publicationSection";
import ExperienceSection from "./experienceSection";
import CV from "./cv";

const Main = () => {
    return (
        <div id="main-page" className="d-flex flex-column align-items-center" style={{marginTop: "110px"}}>
            <Home />
            <ExperienceSection />
            <PublicationSection />
            <CV />
            <ContactMe />
        </div>
    );
};

export default Main;
