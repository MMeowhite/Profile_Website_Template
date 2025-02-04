import React, {useEffect, useState} from "react"
import useConfig from "../../../utils/useConfig"
import {useTheme} from "../../../components/themeProvider";


const ExperienceSection = () => {
    const {configValue:experienceObj, error, loading} = useConfig("pages.home.experienceSection")
    const [educationData, setEducationData] = useState(null);
    const { isDarkMode } = useTheme();

    useEffect(()=>{
        if (experienceObj){
            setEducationData(experienceObj.edu)
        }
    },[experienceObj])

    const cardStyles = {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        border: `2px solid ${isDarkMode ? '#cccccc' : '#444444'}`,
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        height: "auto",
        boxShadow: isDarkMode
            ? '0 8px 12px rgba(255, 255, 255, 0.5)'
            : '0 8px 12px rgba(0, 0, 0, 0.1)',
    };

    if (error){
        return (<div>Error message: {error}</div>)
    }

    if (loading) {
        return (<div>loading....</div>)
    }

    if (!educationData) {
        return (<div>Education data isn't exist!</div>)
    }

    return (
        <section id="experience-section" className="d-flex flex-row">
            {/* education part */}
            <div id="education" className="d-flex flex-column justify-content-between" style={{gap: "50px"}}>
            {educationData.map((item, index)=>(
                <div className="d-flex flex-column" style={{...cardStyles}}>
                    <span>{item.period}</span>
                    <span>{item.university}</span>
                    <span>{item.degree}</span>
                </div>
            ))}
            </div>

            {/* education part */}
            <div>
                <span style={{fontSize: "5rem", fontWeight: "800"}}>{experienceObj.title ? experienceObj.title : "Education"}</span>
            </div>
        </section>
    )
}

export default ExperienceSection;