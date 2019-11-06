import axios from 'axios';
import { authToken } from '../config';

// Main endpoint for movie information.
//TODO: Create function to gather movie ids from data object then get movieDetails from API.
export const movieUrls = (data, category) => {
    return `https://api.themoviedb.org/3/${category}/${data}?api_key=${authToken}&language=en-US`;
  }


// Takes in main endpoint for category ex. top_rated, popular.
export const createPosterSliderInformation = (endpoint, func) => {
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
          func(prev => [...prev, posterSlider]);
        }
      } catch (error) {
        console.log("There was an error", error);
      }
    });
  };

  