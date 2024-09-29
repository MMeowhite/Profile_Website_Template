import React from 'react';
import './header.css'
import logoImg from '../../assets/images/logo.png';
import Nav from "../../widget/nav";

const Header = () => {
    return (
        <div className="container">
            <div className="container-img-content">
                <img src={logoImg} alt="logo" />
                <div className="container-content">
                    <h2>Header</h2>
                    <p>CV</p>
                </div>
            </div>

            <Nav/>
        </div>
    )
}

export default Header;