import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import FilmList from "../../components/FilmList/FilmList";

const API_KEY = "7062d2e046edcca7d00a725f5e0adc9c";

const FetchTrendingFilms = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export default function Home() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const location = useLocation();
  //   console.log(location);
  useEffect(() => {
    FetchTrendingFilms().then((data) => setTrendingFilms([...data]));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        <FilmList films={trendingFilms} pathname={"movies/"} />
      </ul>
    </div>
  );
}
