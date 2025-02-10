import React, { useEffect, useState } from "react"
import useConfig from "../../../utils/useConfig"
import { useTheme } from "../../../components/themeProvider";
import Timeline from "./timeline"; // 引入时间轴组件
import AOS from 'aos'


const ExperienceSection = () => {
    const { configValue: experienceObj, error, loading } = useConfig("pages.home.experienceSection")
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
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`,
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        height: "auto",
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)'
            : '0 8px 12px rgba(0, 0, 0, 0.5)',
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
            id="#education"
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                width: "100vw",
                height: "auto",
                padding: '200px',
            }}
        >
            <section id="experience-edu-section" className="d-flex flex-column flex-md-row align-items-center">
                {/* Education part */}
                <div className="d-flex flex-column justify-content-between" style={{flex: 1, gap: "40px" }}>
                    {educationData.map((item, index) => (
                        <div key={index} >
                            <div className="d-flex flex-column" style={{ ...cardStyles, gap: "10px" }} data-aos="fade-right">
                                <span style={{ fontSize: "3rem", lineHeight: "2rem", color: isDarkMode ? "#fff" : "#333", whiteSpace: "nowrap"}}>
                                <a href={item.url ? item.url : ""} style={{ textDecoration: "none", color: isDarkMode ? "#fff" : "#333" }}>
                                    <img src={item.logo ? item.logo : null} style={{ height: "80px", width: "80px", borderRadius: "50%", marginRight: "10px" }} /> {item.university}
                                </a>
                            </span>

                                <span style={{ fontSize: "2rem", lineHeight: "2rem", color: isDarkMode ? "#fff" : "#333"}}>{item.degree}</span>
                                <span style={{ fontSize: "1.3rem", color: isDarkMode ? "#6b7280" : "#9ca3af" }}>
                                <strong>Time:</strong> {item.period} &nbsp;&nbsp;&nbsp;&nbsp; <strong>GPA:</strong> {item.gpa}
                            </span>
                                <span style={{ fontSize: "1.3rem", color: isDarkMode ? "#6b7280" : "#9ca3af" }}><strong>Degree Courses:</strong> {item.course}</span>
                                <span style={{ fontSize: "1.3rem", color: isDarkMode ? "#6b7280" : "#9ca3af" }}><strong>Additional Courses:</strong> {item.additionalCourse}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Experience Title */}
                <div className="d-flex justify-content-center align-items-center" style={{ flex: 1 }} data-aos="fade-left">
                    <span style={{ fontSize: "4rem", fontWeight: "800", textAlign: 'center' }}>
                        {experienceObj.title ? experienceObj.title : "Education"}
                    </span>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="#experience" className="d-flex flex-column align-items-center" style={{ width: "100%", marginTop: "50px" }}>
                <h1 style={{ fontWeight: "800", fontSize: "5rem", textAlign: 'center' }}>Experience</h1>
                <Timeline />
            </section>
        </div>
    )
}

export default ExperienceSection;
