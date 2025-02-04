import React from 'react'
import {useTheme} from "../../components/themeProvider";
import useConfig from "../../utils/useConfig";


const Experience = () => {
    const { isDarkMode } = useTheme()

    const {configValue:experienceData, error, loading} = useConfig('pages.experience')

    if (loading) {
        return (<div>Loading Experience Data...</div>)
    }

    if (error) {
        return (<div>Error : ${error}</div>)
    }

    const { education, internshipsAndVolunteering, researchProjects, skills, awardsAndHonors } = experienceData;

    return (
        <div id="experience-page" style={{background: "inherit", marginTop: "110px"}}>
            <h1>Experience</h1>
            <section>
                <h2>Education</h2>
                {education.map((edu, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <a href={edu.university.url} target="_blank" rel="noopener noreferrer">
                            {edu.university.logo ? edu.university.logo : ""}
                            <h3>{edu.university.name}</h3>
                        </a>
                        <p>{edu.time}</p>
                        <p><strong>Major:</strong> {edu.major}</p>
                        <p><strong>GPA:</strong> {edu.GPA}</p>
                        <p><strong>Course:</strong> {edu.course}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Internships & Volunteering</h2>
                {internshipsAndVolunteering.map((internship, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <a href={internship.location.url ? internship.location.url : ""} target="_blank" rel="noopener noreferrer">
                            {internship.location.logo ? internship.location.logo : ""}
                            <h3>{internship.location.name}</h3>
                        </a>
                        <p>{internship.time}</p>
                        <p>{internship.work}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Research Projects</h2>
                {researchProjects.map((project, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <a href={project.location.url} target="_blank" rel="noopener noreferrer">
                            {project.location.logo ? project.location.logo : ""}
                            <h3>{project.location.name}</h3>
                        </a>
                        <p>{project.time}</p>
                        <p><strong>Director:</strong> {Array.isArray(project.directors) ? project.directors.map((director, index) => (
                            <a key={index} href={director.link} target="_blank" rel="noopener noreferrer">
                                {director.name}
                            </a>
                        )) : null}</p>
                        <p>{project.work}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2>Skills</h2>
                {skills.map((skill, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <h4>Field:{skill.field}</h4>
                        {console.log(skill.list)}
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Experience;