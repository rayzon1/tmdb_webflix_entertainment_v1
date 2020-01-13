import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SimpleMenu from "./AccountMenu";
import styles from "../modules/component-modules/account-info-comp.module.css";
import { withRouter } from "react-router-dom";

function AccountInfo({
  toggleDrawer,
  loggedInUser, // will only show signed in users name as string
  setLoggedInUser,
  localUser,
  history
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [signedInUser, setSignedInUser] = useState(null);
  const [signedInIndex, setSignedInIndex] = useState(null);

  // match name string (loggedInUser) with user in localStorage to access signed in users info
  // display strings within account info page

  const deleteAccount = () => {
    const currentUser = `user${signedInIndex}`;
    const confirm = window.confirm('Are you sure you want to delete this user?')
    if(confirm) {
      localUser.removeItem(currentUser);
      setLoggedInUser(null);
      setSignedInUser(null);
      history.push('/')
    }
  }

  useEffect(() => {
    // will filter through localUser object values to match loggedInUser
    // returns filtered user info object
    const getSignedInUser = () => {
      const values = Object.values(localUser);
      let filtered = values.filter((val, index) => {
        const matchedUser = JSON.parse(val).name === loggedInUser;
        if (matchedUser) {
          setSignedInIndex(index);
        } // grab index of matched user (put into state)
        return matchedUser;
      });
      return filtered.map(val => JSON.parse(val));
    };
    const user = getSignedInUser();
    setSignedInUser(...user);
  }, [loggedInUser]);

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
        <h3>
          Name:{" "}
          <span style={{ color: "red" }}>
            {signedInUser && signedInUser.name ? signedInUser.name : "No Name"}
          </span>
        </h3>
        <h3>
          Email:{" "}
          <span style={{ color: "red" }}>
            {signedInUser && signedInUser.email
              ? signedInUser.email
              : "No Email"}
          </span>
        </h3>
        <h3>
          Member Since:{" "}
          <span style={{ color: "red" }}>
            {signedInUser && signedInUser.date ? signedInUser.date : "No Date"}
          </span>
        </h3>
        <button className={styles.button} onClick={() => deleteAccount()}>
          Delete Account
        </button>
      </div>
    </>
  );
}

export default withRouter(AccountInfo);
