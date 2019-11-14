import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../modules/component-modules/newsignup-comp.module.css";
import NavBar from "../components/NavBar";
import { withRouter } from "react-router-dom";

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

  const nameField = React.createRef();

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
        nameField.current.value = "";
        nameField.current.style.borderColor = "red";
        nameField.current.style.textColor = "red";
        throw new Error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 

  return (
    <>
      <NavBar toggleDrawer={toggleDrawer} section={"sign-in"} />
      <div className={styles.container} />
      <Form onSubmit={e => submitAction(e)}>
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
            onChange={e => setNewPassword(e.target.value)}
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
