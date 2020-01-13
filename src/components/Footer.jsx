import React from "react";
import ticket from "../images/ticket.png";
import jabba from "../images/jabba-the-hutt.png";
import styles from "../modules/component-modules/footer-comp.module.css";

export default function Footer() {
  return (
    <div
      className={styles.paperContainer}
    >
      <div className={styles.iconContainer}>
        <img src={jabba} className={styles.jabba} alt="jabba"/>
        <p className={styles.title}>
          {" "}
          &copy; Jabba Productions
        </p>
      </div>
      <img src={ticket} className={styles.image} alt="ticket"/>
    </div>
  );
}
