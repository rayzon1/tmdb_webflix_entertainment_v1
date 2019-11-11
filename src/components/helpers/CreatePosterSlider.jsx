import React from "react";
import styles from '../../modules/container-modules/home-container.module.css';
import PosterSlider from "../PosterSlider";

export default function CreatePosterSliderComponent({ title, data, status, category, format }) {
  return (
    <>
      <div
        className={title === "Top Rated" ? styles.topRatedTitle : styles.title}
      >
        {title}
      </div>
      <PosterSlider
        videoData={data}
        getPosterStatus={status}
        category={category}
        format={format}
      />
    </>
  );
}
