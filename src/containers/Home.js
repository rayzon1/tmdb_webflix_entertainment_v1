import React from "react";
import styles from "../modules/container-modules/home-container.module.css";
import PosterSlider from "../components/PosterSlider";

export default function Home({posterSliderInformation}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 className={styles.mainTitle}>Trending Entertainment News</h1>
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[0]
        }
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[1]
        }
      />
      <PosterSlider
        videoData={
          posterSliderInformation.length === 3 && posterSliderInformation[2]
        }
      />
    </div>
  );
}
