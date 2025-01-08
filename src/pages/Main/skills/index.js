import React from 'react';
import "./skills.css"
import CommonLeft from "../../../components/commonLeft";
import CommonRight from "../../../components/commonRight";
import aboutMeImg from "../../../assets/images/about_me1.svg";
import Nav from "../../../widget/nav";

const Skill = () => (
    <section id="skills" className="skills">
        <CommonLeft>
            {/* title and picture */}
            <div className="middle">
                <div className="inner">
                    <h2 className="text-color-white subtitled uppercase">
                        <p>Skills</p>
                        <img src={aboutMeImg} alt="aboutMeImg"/>
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
            <Nav />
        </CommonLeft>
        <CommonRight>

        </CommonRight>
    </section>
);

export default Skill;