import React, { useState, useEffect } from "react";
import styles from "../modules/container-modules/moviesearch-container.module.css";
import MaterialButton from "../components/MaterialButton";
import SearchBar from "../components/SearchBar";
import SearchPlaceHolder from "../components/SearchPlaceHolder";
import LoadingSpinner from "../components/LoadingSpinner";
import SimpleModal from "../components/Modal";
import PaginationBar from "../components/PaginationBar";
import Footer from "../components/Footer";
import { authToken } from "../config";
import { searchUrl, video } from "./MovieSearch";
import Axios from "axios";
import tvIcon from "../images/tvIcon.png";

export const getVideoKeys = id => {
    return `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${authToken}&language=en-US`;
};

export default function TvShowSearch() {
  // Will hold search text when typed in searchbar.
  const [tvSearch, setTvSearch] = useState("");
  // Holds tvData returned from API.
  const [tvData, setTvData] = useState([]);
  // Will hold state to clear results from the searchbar.
  const [clear, setClear] = useState(false);
  // Active page clicked. Default 1.
  const [active, setActive] = useState(1);
  // Triggered when query returns no results.
  const [noResults, setNoResults] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [imageClickIndex, setImageClickIndex] = useState(0);

  // Storage for different categories.
  const [tvIds, setTvIds] = useState([]);
  const [trailerUrls, setTrailerUrls] = useState([]);
  const [trailerData, setTrailerData] = useState([]);
  const [trailerKeys, setTrailerKeys] = useState(null);


  //! Modal Handlers
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  // Main API call function for TV.
  const searchApiCall = query => {
    Axios.get(searchUrl("tv", query, active))
      .then(data => {
        if (data.data.results.length < 1) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setTvData([data.data]);
        }
      })
      .catch(err => console.log(err.message));
  };

  // Will map out tv ids from results.
  const getTvIds = items => {
    let arr = items.results.map(data => {
      return data.id;
    });
    setTvIds(arr);
  };

  // Maps out ids to get video keys.
  const getTrailerKeys = items => {
    let arr = items.map(id => {
      return getVideoKeys(id);
    });
    setTrailerUrls(arr);
  };

  // Will get trailer data by mapping through trailerUrls.
  const getTrailerData = items => {
    const arr = items.map(data => {
      return Axios.get(data);
    });

    Axios.all(arr).then(data => {
      return setTrailerData(data.map(data => data.data.results));
    });
  };

  // Will map through trailer data results to pick out youtube video keys.
  const getYoutubeKeys = arr => {
    const items = arr.map(data => data.length > 0 && data.map(data => data));
    const trailerIndex = items.map(data => {
      const randVideo = data && Math.floor(Math.random() * data.length);
      return randVideo;
    });
    const youtubeVideos = items.map((data, index) => {
      if (data && index === imageClickIndex) {
        return data[trailerIndex[imageClickIndex]];
      }
    });
    return setTrailerKeys(
      youtubeVideos[imageClickIndex] === undefined
        ? "nope"
        : youtubeVideos[imageClickIndex].key
    );
  };


  useEffect(() => {
    if (clicked) {
      setNoResults(false);
      setLoading(true);
      setTimeout(() => {
        searchApiCall(tvSearch);
        setLoading(false);
        setClicked(false);
      }, 1000);
    }
  }, [clicked, setClicked]);

  useEffect(() => {
    if (clear) {
      setTvData([]);
      setTvIds([]);
      setTvSearch("");
      setTrailerData([]);
      setTrailerUrls([]);
      setNoResults(false);
      setTrailerKeys(null);
      setActive(1);
      setClear(false);
    }
  }, [clear, setClear]);

  useEffect(() => {
    trailerData.length > 0 && getYoutubeKeys(trailerData);

    return () => {
      console.log("youtube keys cleared");
      setTrailerKeys(null);
    };
  }, [imageClickIndex]);

  useEffect(() => {
    active !== 1 && setLoading(true);
    setTimeout(() => {
      setTvData([]);
      setTvIds([]);
      setTrailerUrls([]);
      setTrailerData([]);
      setTrailerKeys(null);
      searchApiCall(tvSearch);

      tvData.length > 0 && setLoading(false);
    }, 1000);
  }, [active]);

  tvData.length > 0 && tvIds.length < 1 && getTvIds(tvData["0"]);
  tvIds.length > 0 && trailerUrls.length < 1 && getTrailerKeys(tvIds);

  trailerUrls.length > 0 &&
  trailerData.length < 1 &&
  getTrailerData(trailerUrls);

  trailerData.length > 0 && trailerKeys === null && getYoutubeKeys(trailerData);

  return (
    <div>
      <h1 className={styles.title}>TV Search page</h1>
      <div className={styles.searchContainer}>
        <SearchBar search={setTvSearch} clear={clear} />
        <div className={styles.buttonContainer}>
          <MaterialButton
            text={"Search"}
            search={tvSearch}
            clicked={setClicked}
          />
          <MaterialButton text={"Clear"} search={tvSearch} clicked={setClear} />
        </div>
      </div>
      <div className={styles.mainSearchContainer}>
        <div className={styles.searchResultsContainer}>
          {clicked === false && tvData.length < 1 && noResults === false && (
            <SearchPlaceHolder icon={tvIcon} altText={"tv-icon"} desc={"Search for your favorite TV shows!"}/>
          )}
          {noResults && <p>NO RESULTS!</p>}

          {isLoading ? (
            <div>
              <LoadingSpinner type={"Puff"} />
            </div>
          ) : (
            tvData.length > 0 &&
            tvData["0"].results.map(
              (data, index) =>
                data.poster_path != null &&
                data.backdrop_path != null && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                    alt="search-images"
                    className={styles.images}
                    onClick={e => {
                      e.target.style.boxShadow = "none";
                      setImageClickIndex(index);
                      handleOpen();
                    }}
                    onMouseLeave={e =>
                      (e.target.style.boxShadow = "rgb(0, 0, 0) 2px 2px 4px")
                    }
                  />
                )
            )
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "4vh 0"
        }}
      >
        {tvData.length > 0 && (
          <PaginationBar
            data={tvData["0"]}
            setActive={setActive}
            active={active}
            setLoading={setLoading}
          />
        )}
        <SimpleModal
          open={open}
          setOpen={setOpen}
          videoKey={trailerKeys}
          content={video(trailerKeys)}
        />
      </div>
      <Footer />
    </div>
  );
}
