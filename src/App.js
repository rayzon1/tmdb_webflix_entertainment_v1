import React, { useEffect, useState } from "react";
import { authToken } from './config';
import PosterSlider from './components/PosterSlider';
import TemporaryDrawer from './components/MenuDrawer';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import NavBar from './components/NavBar';
import MovieSearch from './containers/MovieSearch';
import "./App.css";
import axios from 'axios';
import { HashRouter, Route, Switch } from "react-router-dom";



export const movieUrls = (data, category) => {
  return `https://api.themoviedb.org/3/${category}/${data}?api_key=${authToken}&language=en-US`;
}


function App() {

  const [posterSliderInformation, setPosterSliderInformation] = useState([]);
  

  // Takes in main endpoint for category ex. top_rated, popular.
  const createPosterSliderInformation = endpoint => {
    let posterSlider = {};
    const mainData = axios.get(endpoint);
    mainData.then(async data => {
      try {
        if (data.status === 429) {
          var d = new Date();
          throw new Error(`Too many requests ${d}`);
        } else {
          const endData = await data.data;
          const ids = await data.data.results.map(data => data.id);
          posterSlider.data = endData;
          posterSlider.ids = ids;
          setPosterSliderInformation(prev => [...prev, posterSlider]);
        }
      } catch (error) {
        console.log("There was an error", error);
      }
    });
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  

  useEffect(() => {
    
    createPosterSliderInformation(movieUrls('top_rated', 'movie'));
    createPosterSliderInformation(movieUrls('popular', 'movie'));
    createPosterSliderInformation(movieUrls('now_playing', 'movie'));
  
  }, [])

  useEffect(() => {
    posterSliderInformation.length !== 0 &&
    console.log(posterSliderInformation);
  }, [posterSliderInformation.length === 3])

  


  return (
    <HashRouter>
        <Switch>
          <div className="App">
            <NavBar toggleDrawer={toggleDrawer} />
            <TemporaryDrawer
              state={state}
              setState={setState}
              toggleDrawer={toggleDrawer}
            />
            <Route exact path="/" render={() => <SignIn />} />
            <Route
              exact
              path="/home"
              render={() => <Home posterSliderInformation={posterSliderInformation}/>}
            />
            <Route exact path="/moviesearch" render={() => <MovieSearch category={'movie'} />} />
            <Route exact path="/tvshowsearch" render={() => <MovieSearch category={'tv'} />} />
          </div>
        </Switch>
      </HashRouter>
  );
}

export default App;
