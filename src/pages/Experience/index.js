import React, { useEffect } from 'react';
import { useTheme } from "../../utils/Provider/themeProvider";
import { useConfig } from "../../utils/Provider/ConfigProvider";
import { useLanguage } from "../../utils/Provider/languageProvider"; // 引入AOS库
import { Card, ListGroup } from 'react-bootstrap';
import AOS from 'aos';
import {useMediaQuery} from "react-responsive";

const Experience = () => {
    const isSmallScreen = useMediaQuery({maxWidth : 768})
    const { isDarkMode } = useTheme();
    const { isEnglish } = useLanguage();
    const { configValue: experienceData, error, loading } = useConfig('pages.experience');


    // 初始化AOS动画
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // 设置动画持续时间和是否只触发一次
    }, []);

    if (loading) {
        return (<div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>Loading Experience Data...</div>);
    }

    if (error) {
        return (<div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>Error: {error}</div>);
    }


    return (
        <div id="experience-page" className="d-flex flex-column align-items-center justify-content-center" style={{ background: "inherit", marginTop: "110px" }}>

            <h1 id="experience-page-title" style={{ fontWeight: "800", fontSize: "60px" }} data-aos="zoom-in">{isEnglish ? "Experience" : "经历"}</h1>

            {Object.entries(experienceData).map(([sectionObj, sectionValue], index) => {
                // education
                if (index === 0) {
                    // Education Section
                    return (
                        <section
                            id="experience-page-education"
                            className="d-flex flex-column align-items-center justify-content-center"
                            data-aos="fade-up"
                            key={sectionObj}
                        >
                            <h2 style={{ fontWeight: "600", fontSize: "40px" }}>{sectionObj ? sectionObj.charAt(0).toUpperCase() + sectionObj.slice(1) : ""}</h2>
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ margin: "100px 0px" }}>
                                {sectionValue?.map((edu, eduIndex) => (
                                    <div key={eduIndex} data-aos="fade-up" style={{ width: "100%", padding: "0 0 0 50px", position: "relative" }}>
                                        <span
                                            className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                height: "40px",
                                                width: "40px",
                                                transform: "translateX(-50%)",
                                                backgroundColor: "#dbeafe",
                                            }}
                                        >
                                            <svg fill="#1e50af" viewBox="0 0 256 256" className="w-75 h-75 text-white">
                                                <path d="M251.76 88.94l-120-64a8 8 0 00-7.52.0l-120 64a8 8 0 000 14.12L32 117.87v48.42a15.91 15.91.0 004.06 10.65C49.16 191.53 78.51 216 128 216a130 130 0 0048-8.76V240a8 8 0 0016 0V199.51a115.63 115.63.0 0027.94-22.57A15.91 15.91.0 00224 166.29V117.87l27.76-14.81a8 8 0 000-14.12zM128 2e2c-43.27.0-68.72-21.14-80-33.71V126.4l76.24 40.66a8 8 0 007.52.0L176 143.47v46.34C163.4 195.69 147.52 2e2 128 2e2zm80-33.75a97.83 97.83.0 01-16 14.25V134.93l16-8.53zm-20-47.31-.22-.13-56-29.87a8 8 0 00-7.52 14.12L171 128l-43 22.93L25 96 128 41.07 231 96z"></path>
                                            </svg>
                                        </span>

                                        <div
                                            className="d-flex flex-column"
                                            style={{ padding: eduIndex === sectionValue.length - 1 ? "0 40px 0px 30px" : "0 40px 40px 30px", borderLeft: "1px solid #e5e7eb", gap: "10px" }}
                                        >
                                            <a
                                                href={edu.university.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: "none", lineHeight: "1" }}
                                            >
                                                <div style={{ fontSize: "30px" }}>{edu.university.name}</div>
                                            </a>
                                            <div style={{display: "flex", flexFlow: isSmallScreen ? "column" : "row", fontSize: "20px", gap: isSmallScreen ? "10px" : "40px"}}>
                                                <span>
                                                    <strong>{isEnglish ? "Time:" : "时间："}</strong> {edu.time}
                                                </span>
                                                <span>
                                                   <strong>GPA:</strong> {edu.GPA}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: "1rem" }}>
                                                <strong>{isEnglish ? "Main Course:" : "课程："}</strong> {edu.course}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                }

                // internship
                if (index === 1) {
                    return (
                        <section id="experience-page-internships" className="d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" key={sectionObj}>
                            <h2 style={{ fontWeight: "600", fontSize: "40px" }}>{sectionObj ? sectionObj.charAt(0).toUpperCase() + sectionObj.slice(1) : ""}</h2>
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ margin: "100px 0px" }}>
                                {sectionValue?.map((internship, internshipIndex) => (
                                    <div key={internshipIndex} data-aos="fade-up" style={{ width: "100%", padding: "0 0 0 50px", position: "relative" }}>
                                        <span
                                            className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                height: "40px",
                                                width: "40px",
                                                transform: "translateX(-50%)",
                                                backgroundColor: "#dbeafe",
                                            }}
                                        >
                                        <svg fill="#1e50af" viewBox="0 0 256 256" className="w-75 h-75">
                                          <path d="M216 56H176V48a24 24 0 00-24-24H104A24 24 0 0080 48v8H40A16 16 0 0024 72V2e2a16 16 0 0016 16H216a16 16 0 0016-16V72A16 16 0 00216 56zM96 48a8 8 0 018-8h48a8 8 0 018 8v8H96zM216 72v41.61A184 184 0 01128 136a184.07 184.07.0 01-88-22.38V72zm0 128H40V131.64A200.19 200.19.0 00128 152a200.25 200.25.0 0088-20.37V2e2zM104 112a8 8 0 018-8h32a8 8 0 010 16H112a8 8 0 01-8-8z"></path>
                                        </svg>
                                      </span>

                                        <div className="d-flex flex-column" style={{ padding: internshipIndex === sectionValue.length - 1 ? "0 40px 0px 30px" : "0 40px 40px 30px", borderLeft: "1px solid #e5e7eb", gap: "10px" }}>
                                            <a href={internship.location.url ? internship.location.url : ""} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "400", fontSize: "30px", textDecoration: "none", lineHeight: "1" }}>
                                                {internship.location.name}
                                            </a>
                                            <div><strong>{internship.time}</strong></div>
                                            <div>{internship.work}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                }

                // research
                if (index === 2) {
                    return (
                        <section id="experience-page-research" className="d-flex flex-column align-items-center justify-content-center" data-aos="fade-up">
                            <h2 style={{ fontWeight: "600", fontSize: "40px" }}>{sectionObj ? sectionObj.charAt(0).toUpperCase() + sectionObj.slice(1) : ""}</h2>
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ margin: "100px 0px" }}>
                                {sectionValue?.map((research, index) => (
                                    <div key={index} data-aos="fade-up" style={{ width: "100%", padding: "0 0 0 50px", position: "relative" }}>
                                        <span
                                            className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                                height: "40px",
                                                width: "40px",
                                                transform: "translateX(-50%)",
                                                backgroundColor: "#dbeafe", // 可以修改颜色，确保显示正确
                                            }}
                                        >
                                            <svg
                                                fill="#1e50af"
                                                viewBox="0 0 256 256"
                                                className="w-75 h-75">
                <path d="
                    M 136 32
                    H 120
                    a 16 16 0 0 0-16 16
                    v 16
                    H 40
                    A 16 16 0 0 0 24 80
                    v 136
                    a 16 16 0 0 0 16 16
                    h 176
                    a 16 16 0 0 0 16-16
                    V 80
                    a 16 16 0 0 0-16-16
                    h-64
                    V 48
                    a 16 16 0 0 0-16-16
                    z
                    M 120 64
                    h 16
                    v 16
                    h-16
                    z
                    M 216 80
                    v 48
                    a 160 160 0 0 1-80 19
                    a 160 160 0 0 1-80-19
                    V 80
                    h 160
                    z
                    M 128 192
                    a 144 144 0 0 0 72-18
                    v 34
                    H 56
                    v-34
                    a 144 144 0 0 0 72 18
                    z
                    M 112 152
                    h 32
                    a 8 8 0 0 1 0 16
                    H 112
                    a 8 8 0 0 1 0-16
                    z
                "/>
            </svg>

                                        </span>

                                        <div className="d-flex flex-column" style={{ padding: index === sectionValue.length - 1 ? "0 40px 0px 30px" : "0 40px 40px 30px", borderLeft: "1px solid #e5e7eb", gap: "10px"}}>
                                            <a href={research.location.url ? research.location.url : ""} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "400", fontSize: "30px", textDecoration: "none", lineHeight: "1" }}>
                                                {research.location.name}
                                            </a>
                                            <div style={{fontWeight: "600", fontSize:"1.3rem"}}>{research.time}</div>
                                            <div><strong>Supervisor: </strong> {research.directors?.map((director, index)=>(
                                                <a href={director.link ? director.link : ""} target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                                                    {director.name}
                                                </a>
                                            ))}</div>
                                            <div>{research.work}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )
                }

                // skills
                if (index === 3){
                    return (
                        <section
                            id="experience-page-skills"
                            className="d-flex flex-column align-items-center justify-content-center"
                            data-aos="fade-up"
                            style={{ margin: "50px 0px 100px 0px" }}
                        >
                            <h2
                                style={{
                                    fontWeight: "600",
                                    fontSize: "40px",
                                    color: isDarkMode ? "#fff" : "#000",
                                    letterSpacing: "1px",
                                    marginBottom: "50px",
                                }}
                            >
                                {isEnglish ? "Skills" : "技能"}
                            </h2>
                            <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{gap: "50px"}}>
                                {sectionValue.map((skill, skillIndex) => (
                                    <Card
                                        key={skillIndex}
                                        className="mb-4 w-75 shadow-lg rounded-lg"
                                        data-aos="fade-up"
                                        style={{
                                            border: isDarkMode ? "1px solid #fff" : "1px solid #ddd",
                                            borderRadius: "15px",
                                            transition: "transform 0.3s ease-in-out",
                                            background: "inherit",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        <Card.Body style={{ padding: "30px" }}>
                                            <Card.Title
                                                style={{
                                                    fontSize: "1.8rem",
                                                    fontWeight: "500",
                                                    color: "#007bff",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                {skill.field}
                                            </Card.Title>
                                            {Object.entries(skill.list).map(([key, value], index) => (
                                                Array.isArray(value) ? (
                                                    <div key={index} className="mb-3">
                                            <span
                                                style={{
                                                    fontSize: "1.6rem",
                                                    color: isDarkMode ? "#CCC" : "#000",
                                                }}
                                            >
                                                {key}:
                                            </span>
                                                        <ListGroup variant="flush" style={{ marginTop: "10px" }}>
                                                            {value.map((item, itemIndex) => (
                                                                <ListGroup.Item
                                                                    key={itemIndex}
                                                                    style={{
                                                                        backgroundColor: "#f1f3f5",
                                                                        color: "#495057",
                                                                        fontSize: "1.1rem",
                                                                        border: "1px solid #ddd",
                                                                        borderRadius: "10px",
                                                                        marginBottom: "10px",
                                                                    }}
                                                                >
                                                                    {item}
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    </div>
                                                ) : (typeof value === 'object' ? (
                                                    <div key={index} className="mb-3">
                                                        <strong
                                                            style={{
                                                                fontSize: "1.2rem",
                                                                color: isDarkMode ? "#ccc" : "#000",
                                                            }}
                                                        >
                                                            {key}:
                                                        </strong>
                                                        {Object.entries(value).map(([subKey, subValue], subIndex) => (
                                                            <div key={subIndex} className="mb-2">
                                                                <strong
                                                                    style={{
                                                                        fontSize: "1.1rem",
                                                                        color: "#6c757d",
                                                                    }}
                                                                >
                                                                    {subKey}:
                                                                </strong>
                                                                <ListGroup variant="flush" style={{ marginTop: "10px" }}>
                                                                    {Array.isArray(subValue) ? (
                                                                        subValue.map((subItem, subItemIndex) => (
                                                                            <ListGroup.Item
                                                                                key={subItemIndex}
                                                                                style={{
                                                                                    backgroundColor: isDarkMode ? "#666666" : "#f1f3f5",
                                                                                    color: isDarkMode ? "#fff" : "#495057",
                                                                                    fontSize: "1rem",
                                                                                    border: "1px solid #ddd",
                                                                                    borderRadius: "10px",
                                                                                    marginBottom: "8px",
                                                                                }}
                                                                            >
                                                                                {subItem}
                                                                            </ListGroup.Item>
                                                                        ))
                                                                    ) : (
                                                                        <ListGroup.Item
                                                                            style={{
                                                                                backgroundColor: isDarkMode ? "#666666" : "#f1f3f5",
                                                                                color: isDarkMode ? "#fff" : "#495057",
                                                                                fontSize: "1rem",
                                                                                border: "1px solid #ddd",
                                                                                borderRadius: "10px",
                                                                            }}
                                                                        >
                                                                            {subValue}
                                                                        </ListGroup.Item>
                                                                    )}
                                                                </ListGroup>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Card.Text key={index} style={{ marginBottom: "15px" }}>
                                                        <strong
                                                            style={{
                                                                fontSize: "1.2rem",
                                                                color: isDarkMode ? "#ccc" : "#000",
                                                            }}
                                                        >
                                                            {key}:
                                                        </strong>{" "}
                                                        <span
                                                            style={{
                                                                color: "#007bff",
                                                                fontSize: "1.1rem",
                                                            }}
                                                        >
                                    {value}
                                </span>
                                                    </Card.Text>
                                                ))
                                            ))}
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )
                }

                // awards
                if (index === 4){
                    return (
                        <section id="experience-page-awards" className="d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" style={{width: "60%", margin: "0 100px", position: "relative" }}>
                            <h2 style={{ fontWeight: "600", fontSize: "40px" }}>{isEnglish ? "Awards & Honors" : "奖励与荣誉"}</h2>
                            <div style={{ margin: "50px 0px 100px 0px"}}>
                                {sectionValue.map((item, index) => (
                                    <Card
                                        key={index}
                                        className="mb-4 shadow-lg rounded-lg"
                                        data-aos="fade-up"
                                        style={{
                                            border: isDarkMode ? "1px solid #fff" : "1px solid #ddd",
                                            borderRadius: "15px",
                                            transition: "transform 0.3s ease-in-out",
                                            background: "inherit"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        <Card.Body style={{color: isDarkMode ? "#fff" : "#000"}}>
                                            <Card.Text style={{fontSize: "30px"}}><strong>{item.name}</strong></Card.Text>
                                            <Card.Text style={{fontSize: "25px"}}>{item.unit} · {item.time}</Card.Text>
                                            <Card.Text style={{fontSize: "20px"}} dangerouslySetInnerHTML={{ __html: item.desc }} />
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )
                }
                return null;
            })}
        </div>
    );
}

export default Experience;