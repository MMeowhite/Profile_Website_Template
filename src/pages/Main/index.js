import React from 'react';
import Home from "./home";
import ContactMe from "./contactMe";
import PublicationSection from "./publicationSection";
import ExperienceSection from "./experienceSection";

const Main = () => {
    return (
        <div id="main-page" className="d-flex flex-column align-items-center" style={{gap: "20px", marginTop: "110px"}} >
            <Home />
            <ExperienceSection />
            <PublicationSection />
            <ContactMe />
        </div>
    );
};

export default Main;
