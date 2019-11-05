import React from "react";
import Grid from "@material-ui/core/Grid";
import Fade from "react-reveal/Fade";
import styles from "../modules/component-modules/papersection-comp.module.css";
import LoadingSpinner from "../components/LoadingSpinner";


export default function PaperSection({ quotes, isLoading }) {

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
    >
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.quoteContainer}>
            {
              quotes &&
              quotes.map(data => (
                <>
                  <div className={styles.quotes}>
                    <h4 style={{ textAlign: "center" }}>
                      {'"' + data.quote + '"'}
                    </h4>
                    <h6>
                      <i>{data.author}</i>
                    </h6>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </Grid>
  );
}
