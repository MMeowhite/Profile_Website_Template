import React, { useEffect, useState } from "react"
import useConfig from "../../../utils/useConfig"
import { useTheme } from "../../../utils/themeProvider";
import Timeline from "./timeline"; // 引入时间轴组件
import AOS from 'aos'
import {useMediaQuery} from "react-responsive";


const ExperienceSection = () => {
    const { configValue: experienceObj, error, loading } = useConfig("pages.home.experienceSection")
    const isSmallScreen = useMediaQuery({ maxWidth: 768 })
    const [educationData, setEducationData] = useState(null);
    const { isDarkMode } = useTheme();

    useEffect(()=>{
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    },[])

    useEffect(() => {
        if (experienceObj) {

            setEducationData(experienceObj.edu)
        }
    }, [experienceObj])

    const cardStyles = {
        background: "inherit",
        color: isDarkMode ? '#ffffff' : '#000000',
        width: '100%',
        height: "auto",
    };

    if (error) {
        return (<div>Error message: {error}</div>)
    }

    if (loading) {
        return (<div>loading....</div>)
    }

    if (!educationData) {
        return (<div>Education data isn't exist!</div>)
    }

    return (
        <div
            id="education"
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                width: "100vw",
                height: "auto",
                gap: "40px"
            }}
        >
            <div id="edu-card"
                 className={`d-flex flex-column ${isSmallScreen ? "" : "flex-md-row"} align-items-center`}
                 style={{ padding: isSmallScreen ? "0 20px" : "0 0 0 100px", width: "100vw" }}
            >
                {/* Experience Title (放在 Education part 之前) */}
                <div className="d-flex justify-content-center align-items-center"
                     style={{ flex: 1, order: isSmallScreen ? "-1" : "1" }}
                     data-aos="fade-left"
                >
        <span style={{ fontWeight: "800", fontSize: isSmallScreen ? "40px" : "60px", textAlign: 'center' }}>
            {experienceObj.title ? experienceObj.title : "Education"}
        </span>
                </div>

                {/* Education part */}
                <div className="d-flex flex-column justify-content-between" style={{ flex: 1, gap: "40px", width: "100%", padding: "0 60px" }}>
                    {educationData.map((item, index) => (
                        <div key={index}>
                            <div className="d-flex flex-column" style={{ ...cardStyles, gap: "10px" }} data-aos="fade-right">

                                {/* 学校部分 */}
                                <span className="d-flex align-items-center flex-row"
                                      style={{
                                          fontSize: isSmallScreen ? "30px" : "40px",
                                          lineHeight: "3rem", color: isDarkMode ? "#fff" : "#333",
                                          whiteSpace: "wrap", maxWidth: "100%"}}>

                        <img src={item.logo ? item.logo : null}
                             alt="school"
                             style={{ height: "80px", width: "80px", borderRadius: "50%", marginRight: "10px" }} />

                        <a href={item.url ? item.url : ""}
                           style={{ fontWeight: "600", textDecoration: "none", color: isDarkMode ? "#fff" : "#333", maxWidth: "100%" }}>
                            {item.university}
                        </a>
                    </span>

                                {/* 学位部分 */}
                                <span style={{ fontSize: isSmallScreen ? "22px" : "26px", color: isDarkMode ? "#fff" : "#333"}}>{item.degree}</span>

                                {/* 时间以及GPA */}
                                <span style={{ fontSize: "20px", color: isDarkMode ? "#6b7280" : "#9ca3af" }}>
                        <strong>Time:</strong> {item.period} &nbsp;&nbsp;&nbsp;&nbsp; <strong>GPA:</strong> {item.gpa}
                    </span>

                                {/* 学位课程 */}
                                <span style={{ fontSize: "20px", color: isDarkMode ? "#6b7280" : "#9ca3af" }}><strong>Degree Courses:</strong> {item.course}</span>

                                {/* 附加课程 */}
                                <span style={{ fontSize: "20px", color: isDarkMode ? "#6b7280" : "#9ca3af" }}><strong>Additional Courses:</strong> {item.additionalCourse}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Timeline Section */}
            <div id="experience" className="d-flex flex-column align-items-center" style={{ width: "100%" }}>
                <h1 style={{ fontWeight: "800", fontSize: isSmallScreen?  "40px" : "60px", textAlign: 'center' }}>Experience</h1>
                <Timeline />
            </div>
        </div>
    )
}

export default ExperienceSection;
