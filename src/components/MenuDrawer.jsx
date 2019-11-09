import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import HomeIcon from "@material-ui/icons/Home";
import MovieIcon from "@material-ui/icons/Movie";
import Tv from "@material-ui/icons/Tv";
import { withRouter } from "react-router-dom";
import $ from "jquery";

const useStyles = makeStyles({
  list: {
    width: $(window).width() > 790 ? 350 : 303,
    backgroundColor: "black",
    height: "100%",
    color: "white"
  },
  fullList: {
    width: "auto"
  }
});

function TemporaryDrawer({ state, setState, toggleDrawer, history }) {
  const classes = useStyles();

  const sideLinks = category => {
    if (category === "Home") {
      history.replace("/home");
    } else if (category === "Movie Search") {
      history.replace("/moviesearch");
    } else if (category === "TV Show Search") {
      history.replace("tvshowsearch");
    }
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Home", "Movie Search", "TV Show Search", "About"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => sideLinks(text)}>
              <div style={{ height: "15vh" }} />
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon style={{ color: "red" }} />
                ) : index === 1 ? (
                  <MovieIcon style={{ color: "red" }} />
                ) : index === 2 ? (
                  <Tv style={{ color: "red" }} />
                ) : (
                  <QuestionAnswer style={{ color: "red" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer
        style={{ opacity: "0.8" }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
}

export default withRouter(TemporaryDrawer);
