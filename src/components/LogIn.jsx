import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import TooltipMessage from "./TooltipMessage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Webflix Entertainment
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function LogIn({ localUser, history, setLoggedInUser }) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signInSuccess, setSignInSuccess] = useState(false);
  const [refState, setRefState] = useState(null);
  const [show, setShow] = useState(false);
  const [messageState, setMessageState] = useState('');

  const emailField = React.useRef(null);
  const passwordField = React.useRef(null);

  // This will check the login details upon submission of the form.
  const checkLoginDetails = () => {
    const emails = Object.values(localUser).map(val => JSON.parse(val).email);
    const passwords = Object.values(localUser).map(
      val => JSON.parse(val).password
    );
    const names = Object.values(localUser).map(val => JSON.parse(val).name);
    const checkUsers = emails.length > 0 && names.length > 0;

    if (
      emails.includes(email) &&
      (passwords[emails.indexOf(email)] === password) &&
      checkUsers
    ) {
      console.log(`sign in success, ${names[emails.indexOf(email)]}`);
      setLoggedInUser(`${names[emails.indexOf(email)]}`);
      history.push('/home');
    } else {
      if(checkUsers && emails.includes(email) && !passwords.includes(password)) {
        // Tooltip errors.
        setRefState(passwordField);
        setShow(true);
        setMessageState("Password incorrect, please try again.");
        console.log("Password incorrect, please try again.");
      } else if (checkUsers && !emails.includes(email)) {
        setRefState(emailField);
        setShow(true);
        setMessageState('User not found, please try again, or make a new account.');
        console.log('User not found, please try again');
      } else {
        setRefState(emailField);
        setShow(true);
        setMessageState('No users found, please create a new account, or try again.');
        console.log('No users found, please create a new account, or try again.');
      }
    }
  };

  return (
    <Paper style={{ opacity: "0.9" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={e => {
              e.preventDefault();
              checkLoginDetails();
            }}
            noValidate
          >
          {refState && <TooltipMessage target={refState} show={show} message={messageState} />}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e => {
                setEmail(e.target.value);
                setShow(false);
                }}
              autoComplete="email"
              ref={emailField}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={e => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              ref={passwordField}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={e => setRemember(e.target.checked)}
                />
              }
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
}

export default withRouter(LogIn);