import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import $ from "jquery";



const createMargin = () => {
    if ($(window).width() > 800) {
        return 20;
    } else {
        return 0;
    }
}

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: `${createMargin()}px`,
    backgroundColor: "rgba(97, 145, 62, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(97, 145, 62, 1)"
    },
    width: "70%"
  },
  clearButton: {
    marginTop: `${createMargin()}px`,
    backgroundColor: "rgba(255, 1, 0, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 1, 0, 1)"
    },
    width: "70%"
  },
  input: {
    display: "none"
  }
}));

export default function MaterialButton({ text, search, clicked }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={
          search.length < 1
            ? classes.input
            : text === "Search"
            ? classes.button
            : classes.clearButton
        }
        onClick={() => clicked(true)}
      >
        {text}
      </Button>
    </div>
  );
}
