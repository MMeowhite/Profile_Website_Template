import React, {useState, useEffect} from 'react';
import './about.css'
import aboutMeImg from '../../../assets/images/about_me.png'
import Nav from "../../../widget/nav";
import CommonLeft from "../../../components/commonLeft";
import CommonRight from "../../../components/commonRight";



const About = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/config.json');  // load config.json file from public
                const data = await response.json();             // parse JSON data
                // save data as an array from extract parsed data
                const paragraphs = [
                    data.pages.about.contents.first_paragraph.title[0],
                    data.pages.about.contents.second_paragraph.title[0],
                    data.pages.about.contents.Third_paragraph.title[0]
                ];
                setContent(paragraphs);  // update all state
            } catch (error) {
                console.error('Error loading the config:', error);
            }
        };
        fetchConfig();  // 组件加载时调用 fetch 函数
    }, []); // 只在组件加载时执行一次

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

                {/*NavBar: linked to the selected page*/}
                <Nav />

            </CommonLeft>

            <CommonRight>
                <div className="content">
                    {content.map((item, index) => (
                        <React.Fragment key={index}>
                            <p className="content-title">{item}</p>
                            <p className="content-content">Content...</p>
                            {index < content.length - 1 && <span className="paragraph-between"></span>}
                        </React.Fragment>
                    ))}
                </div>
            </CommonRight>
        </section>
    )
}

export default About;