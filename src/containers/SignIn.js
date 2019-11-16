import React from 'react';
import styles from '../modules/container-modules/signin-container.module.css'
import LogIn from '../components/LogIn';
import NavBar from '../components/NavBar';

export default function SignIn({ localUser, toggleDrawer, setLoggedInUser }) {


    return (
        <>
        <NavBar toggleDrawer={toggleDrawer}/>
        <div className={styles.bg}>
            <div style={{alignSelf: 'center', justifySelf: 'center'}}><LogIn localUser={localUser} setLoggedInUser={setLoggedInUser}/></div>
        </div>
        </>
        
    )
}