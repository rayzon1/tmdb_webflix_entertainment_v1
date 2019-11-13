import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../modules/component-modules/newsignup-comp.module.css";

//TODO: CREATE CSS MODULE FOR THIS COMPONENT WITH BREAKPOINTS.
export default function NewSignUp({ setLocalUsers, localUsers }) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const newUserObj = {};
  //   const localUser = window.localStorage;

  //   const checkUserExists = obj => {
  //       Object.values(localUser.user).forEach(item => {
  //           if(item === obj.name || obj.email || obj.password) {
  //             //   localUser.removeItem(local);
  //               console.log('User replaced...')
  //           }
  //       })
  //   }

  const submitAction = e => {
    //Prevent submit
    //Add name/email to temp Obj
    //Check if pw and confirm match/ if no/ error.
    e.preventDefault();
    // localUser.clear();
    newUserObj.name = newName;
    newUserObj.email = newEmail;
    try {
      if (newPassword === confirmPassword) {
        newUserObj.password = newPassword;
        newUserObj.confirm = confirmPassword;
        // localUser.setItem('user', JSON.stringify(newUserObj));

        setLocalUsers(prev => {
          try {
            prev &&
              prev.forEach(obj => {
                if (obj.name.toLowerCase() === newUserObj.name.toLowerCase() || obj.email === newUserObj.email) {
                  throw new Error(`User ${obj.name}, ${obj.email} already exists.`);
                }
              });
            return [...prev, newUserObj];
          } catch (error) {
              console.log(error);
          }
        });
      } else {
        //TODO: SHOW TOOLTIP UPON NON CONFIRMATION
        throw new Error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
