import React, {useState, useEffect} from 'react';
import './home.css'
import Nav from "../../widget/nav";


const Home = () => {
    const [avatar, setAvatar] = useState([]);
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [field,setField] = useState('');
    const [profile, setProfile] = useState('');

    useEffect(() => {
        const fetchConfig = async () =>{
            const response = await fetch("/config.json");
            const data = await response.json();
            setAvatar(data.pages.home.avatar);
            setName(data.pages.home.name);
            setInstitution(data.pages.home.institution);
            setField(data.pages.home.field);
            setProfile(data.pages.home.profile);
        };
        fetchConfig();
    },[])


    return (
        <div className="container">
            <div className="container-img-content">
                <img src={avatar} alt="logo" />
                <div className="container-content">
                    <h2>{name}</h2>
                    <h3>{institution}</h3>
                    <p id="field">{field}</p>
                    <p id="intro">{profile}</p>
                </div>
            </div>
            <Nav className="nav-container"/>
        </div>
    )
}

export default Home;