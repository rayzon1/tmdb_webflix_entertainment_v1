import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../modules/component-modules/newsignup-comp.module.css";

//TODO: CREATE CSS MODULE FOR THIS COMPONENT WITH BREAKPOINTS.
export default function NewSignUp() {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

  return (
    <>
    <div className={styles.container} />
    <Form>
      <Form.Group controlId="formBasicName" className={styles.formGroup}>
        <div style={{ textAlign: 'left' }}><Form.Label>Name</Form.Label></div>
        <Form.Control type="name" placeholder="Enter name" size="lg" required/>
        <Form.Text className="text-muted">
          Please enter your first and last name.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
      <div style={{ textAlign: 'left' }}><Form.Label>Email</Form.Label></div>
       <Form.Control type="email" placeholder="Email" size="lg" />
        <Form.Text className="text-muted">
          Please enter a valid email.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
      <div style={{ textAlign: 'left' }}><Form.Label>Password</Form.Label></div>
        <Form.Control type="password" placeholder="Password" size="lg" />
        <Form.Text className="text-muted">
          Please enter a password.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPasswordConfirmation" className={styles.formGroup}>
      <div style={{ textAlign: 'left' }}><Form.Label>Confirm Password</Form.Label></div>
        <Form.Control type="password" placeholder="Confirm password" size="lg" />
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
