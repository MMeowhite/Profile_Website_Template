import React, {useState, useEffect} from 'react';
import styles from './home.module.css'
import Nav from "../../widget/nav";
import IconNavComponent from "../../widget/iconNavComponent"


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
        <section className={styles.homeContainer}>
            <div className={styles.profiles}>
                <img src={avatar} alt="avatar" className={styles.avatar}/>
                <div className={styles.briefInformation}>
                    <h2>{name}</h2>
                    <h3>{institution}</h3>
                    <p id="field">{field}</p>
                    <p id="intro">{profile}</p>
                </div>
                <IconNavComponent />
                <Nav className="nav-container"/>
            </div>
            <div className={styles}>

            </div>
        </section>
    )
}

export default Home;