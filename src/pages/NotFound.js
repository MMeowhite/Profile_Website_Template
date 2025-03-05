import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{
            textAlign: "center",
            padding: "50px",
            fontFamily: "Arial, sans-serif"
        }}>
            <h1 style={{ fontSize: "100px", color: "#ff4757" }}>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "18px",
                color: "white",
                backgroundColor: "#ff4757",
                textDecoration: "none",
                borderRadius: "5px"
            }}>
                Return To Home Page
            </Link>
        </div>
    );
};

export default NotFound;
