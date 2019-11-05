import React from "react";
import Modal from '@material-ui/core/Modal';
import styles from "../modules/component-modules/modal-comp.module.css";

export default function SimpleModal({ open, setOpen, clickedVideo, content }) {
  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={styles.modal}
      >
        <div className={styles.paper}>
          {clickedVideo === "nope" ? (
            <p>Sorry No Content</p>
          ) : (
            content
          )}
          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}
