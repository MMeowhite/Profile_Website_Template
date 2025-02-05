import React from 'react';
import { useTheme } from "../../components/themeProvider";
import useConfig from "../../utils/useConfig";
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const Experience = () => {
    const { isDarkMode } = useTheme();
    const { configValue: experienceData, error, loading } = useConfig('pages.experience');

    if (loading) {
        return (<div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>Loading Experience Data...</div>);
    }

    if (error) {
        return (<div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>Error: {error}</div>);
    }

    const { education, internshipsAndVolunteering, researchProjects, skills, awardsAndHonors } = experienceData;

    return (
        <div id="experience-page" style={{ background: "inherit", marginTop: "110px" }}>
            <Container>
                <h1 className="my-4">Experience</h1>

                {/* Education Section */}
                <section>
                    <h2>Education</h2>
                    {education.map((edu, index) => (
                        <Card key={index} className="mb-4">
                            <Card.Body>
                                <a href={edu.university.url} target="_blank" rel="noopener noreferrer">
                                    {edu.university.logo && <img src={edu.university.logo} alt="University Logo" style={{ width: "50px", marginRight: "10px" }} />}
                                    <Card.Title>{edu.university.name}</Card.Title>
                                </a>
                                <Card.Text><strong>Time:</strong> {edu.time} &nbsp;&nbsp;&nbsp;&nbsp; <strong>GPA:</strong> {edu.GPA}</Card.Text>
                                <Card.Text><strong>Major:</strong> {edu.major}</Card.Text>
                                <Card.Text><strong>Main Course:</strong> {edu.course}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </section>

                {/* Internships & Volunteering Section */}
                <section>
                    <h2>Internships & Volunteering</h2>
                    {internshipsAndVolunteering.map((internship, index) => (
                        <Card key={index} className="mb-4">
                            <Card.Body>
                                <a href={internship.location.url ? internship.location.url : ""} target="_blank" rel="noopener noreferrer">
                                    {internship.location.logo && <img src={internship.location.logo} alt="Internship Logo" style={{ width: "50px", marginRight: "10px" }} />}
                                    <Card.Title>{internship.location.name}</Card.Title>
                                </a>
                                <Card.Text>{internship.time}</Card.Text>
                                <Card.Text>{internship.work}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </section>

                {/* Research Projects Section */}
                <section>
                    <h2>Research Projects</h2>
                    {researchProjects.map((project, index) => (
                        <Card key={index} className="mb-4">
                            <Card.Body>
                                <a href={project.location.url} target="_blank" rel="noopener noreferrer">
                                    {project.location.logo && <img src={project.location.logo} alt="Research Logo" style={{ width: "50px", marginRight: "10px" }} />}
                                    <Card.Title>{project.location.name}</Card.Title>
                                </a>
                                <Card.Text>{project.time}</Card.Text>
                                <Card.Text><strong>Director:</strong> {Array.isArray(project.directors) ? project.directors.map((director, index) => (
                                    <a key={index} href={director.link} target="_blank" rel="noopener noreferrer">
                                        {director.name}
                                    </a>
                                )) : null}</Card.Text>
                                <Card.Text>{project.work}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </section>

                {/* Skills Section */}
                <section>
                    <h2>Skills</h2>
                    {skills.map((skill, skillIndex) => (
                        <Card key={skillIndex} className="mb-4">
                            <Card.Body>
                                <Card.Title>{skill.field}</Card.Title>
                                {Object.entries(skill.list).map(([key, value], index) => (
                                    Array.isArray(value) ? (
                                        <div key={index}>
                                            <strong>{key}:</strong>
                                            <ListGroup variant="flush">
                                                {value.map((item, itemIndex) => (
                                                    <ListGroup.Item key={itemIndex}>{item}</ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </div>
                                    ) : (typeof value === 'object' ? (
                                        <div key={index}>
                                            <strong>{key}:</strong>
                                            {Object.entries(value).map(([subKey, subValue], subIndex) => (
                                                <div key={subIndex}>
                                                    <strong>{subKey}:</strong>
                                                    <ListGroup variant="flush">
                                                        {Array.isArray(subValue) ? (
                                                            subValue.map((subItem, subItemIndex) => (
                                                                <ListGroup.Item key={subItemIndex}>{subItem}</ListGroup.Item>
                                                            ))
                                                        ) : (
                                                            <ListGroup.Item>{subValue}</ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card.Text key={index}>
                                            <strong>{key}:</strong> {value}
                                        </Card.Text>
                                    ))
                                ))}
                            </Card.Body>
                        </Card>
                    ))}
                </section>

                {/* Awards & Honors Section */}
                <section>
                    <h2>Awards & Honors</h2>
                    {awardsAndHonors.map((item, index) => (
                        <Card key={index} className="mb-4">
                            <Card.Body>
                                <Card.Text><strong>{item.name}</strong></Card.Text>
                                <Card.Text>{item.unit} · {item.time}</Card.Text>
                                <Card.Text dangerouslySetInnerHTML={{ __html: item.desc }} />
                            </Card.Body>
                        </Card>
                    ))}
                </section>
            </Container>
        </div>
    );
}

export default Experience;