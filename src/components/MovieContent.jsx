import React from "react";
import styles from "../modules/component-modules/moviecontent-comp.module.css";
import imdb_logo from "../images/icons/imdb_logo.png";
import metacritic from "../images/icons/metacritic.png";
import rt from "../images/icons/rt.png";

export default function MovieContent({
  // data, 
  posterStatus, // redux clickstate 
  details, // detail object information from API. This contains the movie title/overview etc.
  imdbInformation, // returned imdb object from OMDb API. This contains ratings array plus details.
}) {

  // Poster index from Redux state
  // const posterIndex = posterStatus.index;

  // Logo icons.
  const reviewLogos = {
    imdb_logo,
    metacritic,
    rt
  };

  const createReview = () => {
    return (
      imdbInformation &&
      imdbInformation.Ratings != undefined &&
      imdbInformation.Ratings.map(data => {
        if (data.Source.includes("Internet")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img
                src={reviewLogos.imdb_logo}
                className={styles.imdb_logo}
                alt="imdb-logo"
              />{" "}
              {data.Value}
            </span>
          );
        }
        if (data.Source.includes("Rotten")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img src={reviewLogos.rt} className={styles.rotten_logo} alt="rt-logo" />{" "}
              {data.Value}
            </span>
          );
        }
        if (data.Source.includes("Metacritic")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img
                src={reviewLogos.metacritic}
                className={styles.metacritic_logo}
                alt="meta-logo"
              />{" "}
              {data.Value}
            </span>
          );
        }
        return data;
      })
    );
  };

  return (
      <div className={posterStatus.clicked ? styles.content : styles.hideContent}>
        <div className={styles.summary}>
          <div className={styles.contentContainer}>
            {details && details.overview }
          </div>
          <div className={styles.reviewContainer}>
            {createReview()}
          </div>
          <div className={styles.productionLogoContainer}>
            {details &&
              details.production_companies !== undefined &&
              details.production_companies.map(
                data =>
                  data !== undefined && 
                  data.logo_path !== null && ( 
                      <img
                        src={`https://image.tmdb.org/t/p/w500${data.logo_path}`}
                        className={styles.productionLogo}
                        alt="production-logo"
                      />
                  )
              )}
          </div>
        </div>

        {details && (
          <div className={styles.posterContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${
                details.poster_path
              }`}
              className={styles.posterImage}
              alt="poster-images"
            />
          </div>
        )}
      </div>
  );
}

