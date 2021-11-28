import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FilmList from "../../components/FilmList/FilmList";
import { FetchFilmsByQuery } from "../../services/api";
import s from "./Movies.module.css";

export default function Movies() {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  console.log(searchParams);
  console.log(location);
  const searchQuery = searchParams.get("movies") || "";

  useEffect(() => {
    if (!searchQuery ?? searchQuery.trim()) return;
    FetchFilmsByQuery(searchQuery).then((data) => setSearchMovies([...data]));
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setSearchParams({ movies: query });
    e.target.search.value = "";
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className={s.input}
          type="text"
          name="search"
          placeholder="Search movie by name"
        />
        <button className={s.submit} type="submit">
          Search
        </button>
      </form>
      <FilmList
        films={searchMovies}
        pathname={location.pathname + location.search}
      />
    </div>
  );
}
