import React, { useEffect, useState } from "react";
import TemporaryDrawer from "./components/MenuDrawer";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import About from "./containers/About";
import MovieSearch from "./containers/MovieSearch";
import NewSignUp from "./components/NewSignUp";
import "./App.css";
import {
  movieUrls,
  createPosterSliderInformation
} from "./exports/apiFetchFunctions";
import { HashRouter, Route, Switch } from "react-router-dom";

function App() {
  const [posterSliderInformation, setPosterSliderInformation] = useState([]);
  const [tvPosterSliderInformation, setTvPosterSliderInformation] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);

  // State will set logged in username to display on NavBar within the home and movie/tv search pages.
  const [loggedInUser, setLoggedInUser] = useState("");

  // Local Storage for user signups.
  const localUser = window.localStorage;

  //TODO: MOVE MENU-DRAWER FUNCTIONS TO MENU-DRAWER COMPONENT
  // State hook for menu drawers.
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  //TODO: MOVE MENU-DRAWER FUNCTIONS TO MENU-DRAWER COMPONENT
  // Toggle drawer function for the MaterialUI menu-drawer component.
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  // Main props object.
  const globalProps = {
    loggedInUser,
    setLoggedInUser,
    toggleDrawer,
    localUser,
    localUsers,
    setLocalUsers,
  }

  // Gathers movie data from TMDb API for poster-sliders.
  // Front-loading movie data.
  useEffect(() => {
    createPosterSliderInformation(
      movieUrls("top_rated", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("popular", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("now_playing", "movie"),
      setPosterSliderInformation,
      "movie",
      setIsLoading
    );
  }, []);

  // Gathers Tv data from TMDb API for poster-sliders.
  // Front-loading Tv data.
  useEffect(() => {
    createPosterSliderInformation(
      movieUrls("top_rated", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("popular", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
    createPosterSliderInformation(
      movieUrls("on_the_air", "tv"),
      setTvPosterSliderInformation,
      "tv",
      setIsLoading
    );
  }, []);

  // Sets signed-in user to Local Storage, to persist credentials.
  useEffect(() => {
    localUsers.length > 0 &&
      localUsers.forEach((data, index) => {
        localUser.setItem(
          `user${Object.keys(localUser).length}`,
          JSON.stringify(data)
        );
      });

    // TODO: DELETE CONSOLE.LOGS BEFORE FINISH.
    console.log(localUser);
    console.log(localUsers);
  }, [localUsers, localUser]);

  //TODO: CREATE OBJECT TO HOLD PROPS.
  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <TemporaryDrawer
            state={state}
            setState={setState}
            toggleDrawer={toggleDrawer}
          />
          <Route
            exact
            path="/"
            render={() => (
              <SignIn
                localUser={localUser}
                toggleDrawer={toggleDrawer}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/home"
            render={() =>
              isLoading ? (
                <LoadingSpinner />
              ) : (
                <Home
                  posterSliderInformation={posterSliderInformation}
                  tvPosterSliderInformation={tvPosterSliderInformation}
                  toggleDrawer={toggleDrawer}
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                />
              )
            }
          />
          <Route
            exact
            path="/moviesearch"
            render={() => (
              <MovieSearch
                category={"movie"}
                toggleDrawer={toggleDrawer}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/tvshowsearch"
            render={() => (
              <MovieSearch
                category={"tv"}
                toggleDrawer={toggleDrawer}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <NewSignUp
                setLocalUsers={setLocalUsers}
                localUsers={localUsers}
                localUser={localUser}
                toggleDrawer={toggleDrawer}
              />
            )}
          />
          <Route
            exact
            path="/about"
            render={() => (
              <About toggleDrawer={toggleDrawer} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
            )}
          />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
