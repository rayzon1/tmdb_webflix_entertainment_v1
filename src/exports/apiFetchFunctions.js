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
  return `http://www.omdbapi.com/?apikey=${apiKey}&i=${data}`
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
          const detailUrls = await ids.map(data => movieUrls(data, 'movie'));
          const details = await detailUrls.map(data => axios.get(data));

          posterSlider.data = await endData;
          posterSlider.ids = await ids;
          posterSlider.details = await details;

          func(prev => [...prev, posterSlider]);
        }
      } catch (error) {
        console.log("There was an error", error);
      }
    });
  };

  // Generates movie details by mapping ids of a category.
export const createMovieContentDetails = async(obj, func) => {
    const contentDetails = {};
    const detailArr = [];
    await obj.data.results.forEach((data, index) => {
      const details = axios.get(movieUrls(data.id, "movie"));
      details.then(data => {
        return detailArr.push(data);
      });
    })
    contentDetails.movieDetails = detailArr;
    
    func(prev => [...prev, contentDetails]);
  };

  