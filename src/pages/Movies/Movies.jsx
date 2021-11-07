import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FilmList from "../../components/FilmList/FilmList";

const API_KEY = "7062d2e046edcca7d00a725f5e0adc9c";

const FetchFilmsByQuery = async (value) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`
  );
  //   console.log(response);
  return response.data.results;
};

export default function Movies() {
  const [query, setQuery] = useState("");
  const [searchingFilms, setSearchingFilms] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParam = new URLSearchParams(location.search).get("query");

  console.log(location);
  console.log(searchParam);

  useEffect(() => {
    if (!searchParam ?? searchParam.trim()) return;
    FetchFilmsByQuery(searchParam).then((data) => setSearchingFilms([...data]));
  }, [searchParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({ ...location, search: `query=${query}`, state: { from: 123 } });
    setQuery("");
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setQuery(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleInput} />
        <button type="submit">Search</button>
      </form>
      <FilmList films={searchingFilms} />
    </div>
  );
}
