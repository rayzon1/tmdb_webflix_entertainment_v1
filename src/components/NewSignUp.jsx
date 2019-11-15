import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../modules/component-modules/newsignup-comp.module.css";
import NavBar from "../components/NavBar";
import { withRouter } from "react-router-dom";
import TooltipMessage from "../components/TooltipMessage";

//TODO: CREATE CSS MODULE FOR THIS COMPONENT WITH BREAKPOINTS.
function NewSignUp({
  setLocalUsers,
  localUsers,
  localUser,
  toggleDrawer,
  history
}) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Tooltip state
  const [show, setShow] = useState(false);
  const [messageState, setMessageState] = useState('');
  const [refState, setRefState] = useState(null);

  const nameField = React.useRef(null);
  const emailField = React.useRef(null);
  const passwordField = React.useRef(null);
  const confirmPasswordField = React.useRef(null);

  const newUserObj = {};

  const submitAction = e => {
    //Prevent submit
    //Add name/email to temp Obj
    //Check if pw and confirm match/ if no/ error.
    e.preventDefault();
    newUserObj.name = newName;
    newUserObj.email = newEmail;
    try {
      if (newPassword === confirmPassword) {
        newUserObj.password = newPassword;
        newUserObj.confirm = confirmPassword;
        Object.values(localUser).forEach(data => {
          if (
            (newUserObj.name.toLowerCase() ||
              newUserObj.email.toLowerCase()) ===
            (JSON.parse(data).name.toLowerCase() ||
              JSON.parse(data).email.toLowerCase())
          ) {
            throw new Error("User already exists.");
          }
        });
        setLocalUsers([newUserObj]);
        setTimeout(() => history.replace("/"), 500);
      } else {
        //TODO: SHOW TOOLTIP UPON NON CONFIRMATION
        setMessageState('Passwords do not match.');
        setRefState(passwordField);
        // setRefState(confirmPasswordField);
        setErrorFields(passwordField);
        setErrorFields(confirmPasswordField);
        setShow(true);
        throw new Error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Changes input fields border color and clears values.
  const setErrorFields = reference => {
    reference.current.style.borderColor = 'red';
    reference.current.value = '';
  }

  
  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} section={"sign-in"} />
      <div className={styles.container} />

      <Form onSubmit={e => submitAction(e)}>
        {refState && <TooltipMessage target={refState} show={show} message={messageState} />}
        <Form.Group controlId="formBasicName" className={styles.formGroup}>
          <div style={{ textAlign: "left" }}>
            <Form.Label>Name</Form.Label>
          </div>
          <Form.Control
            type="name"
            placeholder="Enter name"
            size="lg"
            onChange={e => setNewName(e.target.value)}
            ref={nameField}
            required
          />
          <Form.Text className="text-muted">
            Please enter your first and last name.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
          <div style={{ textAlign: "left" }}>
            <Form.Label>Email</Form.Label>
          </div>
          <Form.Control
            type="email"
            placeholder="Email"
            size="lg"
            onChange={e => setNewEmail(e.target.value)}
            ref={emailField}
            required
          />
          <Form.Text className="text-muted">
            Please enter a valid email.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
          <div style={{ textAlign: "left" }}>
            <Form.Label>Password</Form.Label>
          </div>
          <Form.Control
            type="password"
            placeholder="Password"
            size="lg"
            ref={passwordField}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <Form.Text className="text-muted">Please enter a password.</Form.Text>
        </Form.Group>

        <Form.Group
          controlId="formBasicPasswordConfirmation"
          className={styles.formGroup}
        >
          <div style={{ textAlign: "left" }}>
            <Form.Label>Confirm Password</Form.Label>
          </div>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            size="lg"
            onChange={e => setConfirmPassword(e.target.value)}
            ref={confirmPasswordField}
            required
          />
          <Form.Text className="text-muted">
            Please confirm your password.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default withRouter(NewSignUp);
