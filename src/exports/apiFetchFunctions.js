import axios from 'axios';
import { authToken, apiKey } from '../config';

// Main endpoint for movie information.
//TODO: Create function to gather movie ids from data object then get movieDetails from API.
export const movieUrls = (data, category) => {
  return `https://api.themoviedb.org/3/${category}/${data}?api_key=${authToken}&language=en-US`;
}

export const movieReviewsUrl = (data, category) => {
  return `https://api.themoviedb.org/3/${category}/${data}/reviews?api_key=${authToken}&language=en-US&page=1`
}

export const imdbUrls = data => {
  return `https://www.omdbapi.com/?apikey=${apiKey}&i=${data}`
}


// Takes in main endpoint for category ex. top_rated, popular.
export const createPosterSliderInformation = (endpoint, func) => {
    let posterSlider = {};
    
    const mainData = axios.get(endpoint);
    mainData.then( data => {
      
      try {
        if (data.status === 429) {
          var d = new Date();
          throw new Error(`Too many requests ${d}`);
        } else {
          const endData =  data.data;
          const ids =  data.data.results.map(data => data.id);
          const detailUrls =  ids.map(data => movieUrls(data, 'movie'));

          posterSlider.data =  endData;
          posterSlider.ids =  ids;
          posterSlider.details = detailUrls;

          func(prev => [...prev, posterSlider]);
        }
      } catch (error) {
        console.error("Error", error);
      }
    });
  };

// take in index of poster clicked 
// compare clicked index to index of url in posterSliderInformation object
// run url through axios to obtain details/ reviews.
export const createContentDetails = (arr, func, clickIndex) => {
  const contentContainer = {};
  arr.forEach(async(data, index) => {
    if(index === clickIndex) {
      try { 
        const details = await axios.get(data);
        const imdb = await axios.get(imdbUrls(details.data.imdb_id));
        contentContainer.details = details;
        contentContainer.imdb = imdb;
        func(null);
        func(contentContainer);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });
}
  