import React from "react";
import NavBar from "./NavBar";
import SimpleMenu from "./AccountMenu";
import styles from "../modules/component-modules/account-info-comp.module.css";

export default function AccountInfo({
  toggleDrawer,
  loggedInUser, // will only show signed in users name as string
  setLoggedInUser,
  localUser,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

    // match name string (loggedInUser) with user in localStorage to access signed in users info
    // display strings within account info page


    // create function to isolate logged in user profile information to put in component.
    const keys = Object.values(localUser);
    const names = keys.map(val => JSON.parse(val).name);
    console.log(names)
    console.log(names.includes(loggedInUser));


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <NavBar
        toggleDrawer={toggleDrawer}
        loggedInUser={loggedInUser}
        handleClick={handleClick}
      />
      <SimpleMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setLoggedInUser={setLoggedInUser}
      />
      <div className={styles.aboutContainer}>
        <h1 className={styles.title}>Account Information</h1>
        <h3>Name: Gerardo Keys</h3>
        <h3>Email: jotojry@icloud.com</h3>
        <h3>Member Since: 11/11/11</h3>
      </div>
    </>
  );
}
