import React from "react";
import NavBar from "./NavBar";
import SimpleMenu from "./AccountMenu";
import styles from "../modules/component-modules/account-info-comp.module.css";

export default function AccountInfo({
  toggleDrawer,
  loggedInUser,
  setLoggedInUser
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <div>
          <h1>Account Info Component</h1>
          <p>
            Quisque mollis hendrerit ligula. Quisque sed purus a ipsum lacinia
            facilisis at non augue. Pellentesque imperdiet orci at erat pretium
            venenatis. Duis vitae egestas odio. Maecenas finibus felis at nibh
            sollicitudin euismod mollis sed sem. Vestibulum maximus magna quis
            arcu ultricies consequat. Vivamus finibus eu urna sit amet
            facilisis. Sed ullamcorper ut libero vel accumsan. Curabitur lacinia
            finibus nunc vitae luctus. Donec ut faucibus metus. In risus purus,
            euismod ac elit quis, commodo condimentum urna. Phasellus est
            ligula, vulputate at dolor ac, facilisis scelerisque erat.
          </p>
        </div>
      </div>
    </>
  );
}
