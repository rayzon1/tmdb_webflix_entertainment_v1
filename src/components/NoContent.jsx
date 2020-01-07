import React from 'react';
import styles from '../modules/component-modules/no-content-comp.module.css';
import tvVintage from '../images/tv_vintage.png';

export default function NoContent() {
    return (
        <div className={styles.contentContainer}>
            <img src={tvVintage} alt="tv-vintage_icon" />
            <h1 className={styles.contentMain}>No Content</h1>
            <h3 className={styles.contentSub}>Sorry, no video found</h3>
        </div>
        
    )
}