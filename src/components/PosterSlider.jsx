import React from "react";
import styles from "../modules/component-modules/posterslider-comp.module.css";
import axios from 'axios';
import { authToken } from '../config';
import SimpleModal from "./Modal";

export default function PosterSlider({
  videoData,
  getPosterStatus,
  category,
}) {
  //! Map urls and combine to path to gather poster backdrops.
  //! https://image.tmdb.org/t/p/w500

  const [open, setOpen] = React.useState(false);
  const [clickedVideo, setClickedVideo] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const videoUrls = data => {
    return `https://api.themoviedb.org/3/movie/${data}/videos?api_key=${authToken}&language=en-US`
  }

  // pick youtube video based on index of poster clicked.
  const getYoutubeVideos = (obj) => {
    const video = axios.get(videoUrls(obj.id));
    video
      .then(async data => {
        const length = await data.data.results.length;
        const results = await data.data.results;
          if( length < 1) {
            setClickedVideo('nope');
          } else {
            const rand = Math.floor(Math.random() * length );
            setClickedVideo(results[rand].key);
          }
        }
      )
  }

  const video = (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${clickedVideo}?controls=1&autoplay=1&loop=1`}
      frameborder="0"
      allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture"
      title="youtube-trailers"
      allowfullscreen
    ></iframe>
  );

  /**
   * Mapped image tiles showing popular movies in scrollbar.
   */
  const imageTiles = () => {
    return (
      videoData.data &&
      videoData.data.results.map((data, index) => (
        <div
          className={styles.tile}
          key={index}
          onClick={() => {
              getPosterStatus(index, category);
          }}
        >
          <div className={styles.tile__media}>
            <img
              className={styles.tile__image}
              src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
              alt="tiles"
            />
          </div>
          <div className={styles.tile__details}>
            <div
              className={styles.play__click}
              onClick={() => {
                getYoutubeVideos(data);
                handleOpen();              
              }}
            />
            <div className={styles.tile__title}>{data.original_title || data.original_name}</div>
          </div>
        </div>
      ))
    );
  };

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.row}>
          <div className={styles.row__inner}>{imageTiles()}</div>
        </div>
        
          <SimpleModal open={open} setOpen={setOpen} clickedVideo={clickedVideo.length > 0 && clickedVideo} content={video} />
        
      </div>
    </>
  );
}

