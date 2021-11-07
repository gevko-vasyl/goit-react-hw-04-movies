import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";

const API_KEY = "7062d2e046edcca7d00a725f5e0adc9c";
const fetchFilmById = async (id) => {
  const response = axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  //   console.log(response);
  return response;
};
export default function MovieDetailsPage() {
  const [film, setFilm] = useState({});

  const navigate = useNavigate();
  const params = useParams();
  const { pathname, search } = useLocation();

  console.log(search);

  useEffect(() => {
    fetchFilmById(params.movieId).then((res) => setFilm(res.data));
  }, [params.movieId]);

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <img
        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}
        alt={film.title ?? film.name}
        width="300"
        height="400"
      />
      <h1>{film.title ?? film.name}</h1>
      <span>User score: {+film.vote_average * 10}%</span>
      <h2>Overview</h2>
      <span>{film.overview}</span>
      <h2>Genres</h2>
      {film.genres && film.genres.map((el) => <li key={el.id}>{el.name}</li>)}
      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
}
