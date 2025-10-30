import React, { lazy, Suspense } from 'react';

// 进行懒加载
const Home = lazy(()=>import ("./home"))
const ExperienceSection = lazy(() => import("./experienceSection"))
const PublicationSection = lazy(()=>import("./publicationSection"))
const CV = lazy(()=>import("./cv"))
const ContactMe = lazy(()=>import("./contactMe"))
const Map = lazy(()=>import("./map"))

const Main = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div id="main-page" className="d-flex flex-column align-items-center" style={{marginTop: "110px", width: "100vw", gap: "100px"}}>
                <Home />
                <ExperienceSection />
                <PublicationSection />
                <CV />
                <ContactMe />
                <Map />
            </div>
        </Suspense>
    );
};

export default Main;
