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
                    <h2>Miao Peng</h2>
                    <p>MEDICINE / BIOINFORMATICS / MATHEMATICS / PHYSICS</p>
                </div>
            </div>
            <Nav className="nav-container"/>
        </div>
    )
}

export default Header;