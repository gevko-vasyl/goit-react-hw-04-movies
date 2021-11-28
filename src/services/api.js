import axios from "axios";

const API_KEY = "7062d2e046edcca7d00a725f5e0adc9c";

export const FetchTrendingFilms = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return response.data.results;
};
export const FetchFilmsByQuery = async (value) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`
  );
  return response.data.results;
};

export const fetchFilmById = async (id) => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  //   console.log(response);
  return response;
};

export const fetchFilmCast = async (id) => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );
  return response;
};

export const fetchFilmReviews = async (id) => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
  );
  return response;
};
