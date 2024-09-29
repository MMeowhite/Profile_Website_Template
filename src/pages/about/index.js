import React from 'react';
import './about.css'
import aboutMeImg from '../../assets/images/about_me.png'
import Nav from "../../widget/nav";
import CommonLeft from "../../components/commonLeft";
import CommonRight from "../../components/commonRight";


const About = () => {
    return (
        <section className="about">
            <CommonLeft>

                {/* title and picture */}
                <div className="middle">
                    <div className="inner">
                        <h2 className="text-color-white subtitled uppercase">
                            <p>About</p>
                            <img src={aboutMeImg} alt=""/>
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
                <div className="content">
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                    <p className="content-title">
                        Title...
                    </p>
                    <p className="content-content">
                        Content...
                    </p>
                    <span className="paragraph-between"></span>
                </div>
            </CommonRight>
        </section>
    )
}

export default About;