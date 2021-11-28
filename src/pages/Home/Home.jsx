import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import FilmList from "../../components/FilmList/FilmList";
import { FetchTrendingFilms } from "../../services/api";
import s from "./Home.module.css";

export default function Home() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    FetchTrendingFilms().then((data) => setTrendingFilms([...data]));
  }, []);

  return (
    <div className={s.container}>
      <h1>Trending today</h1>

      <FilmList films={trendingFilms} pathname={location.pathname} />
    </div>
  );
}
