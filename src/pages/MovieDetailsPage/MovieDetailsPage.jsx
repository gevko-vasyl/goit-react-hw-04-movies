import React, {
  useState,
  useLayoutEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { fetchFilmById } from "../../services/api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import defaultImg from "../../assets/defaultImg.jpg";
import s from "./MovieDetailsPage.module.css";

const CastPage = lazy(
  () => import("../../components/Cast/Cast") /*webpackChunkName: CastPage*/
);
const ReviewsPage = lazy(
  () =>
    import("../../components/Reviews/Reviews") /*webpackChunkName: ReviewsPage*/
);

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const comesFrom = useRef(location.state);

  useLayoutEffect(() => {
    fetchFilmById(params.movieId)
      .then((res) => {
        setFilm(res.data);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
  }, [location.state, params.movieId]);

  return (
    <div className={s.container}>
      {error && <h1 className={s.error}>{error}</h1>}

      {!isLoading && (
        <>
          <button
            className={s.backBtn}
            type="button"
            onClick={() => navigate(comesFrom.current ?? -1)}
          >
            Back
          </button>
          <div className={s.DetaisContainer}>
            <img
              className={s.img}
              src={
                film.poster_path
                  ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`
                  : defaultImg
              }
              alt={film.title ?? film.name}
              width="300"
              height="400"
            />
            <div>
              <h1 className={s.title}>{film.title ?? film.name}</h1>
              <span>User score: {+film.vote_average * 10}%</span>
              <h2>Overview</h2>
              <span className={s.overview}>{film.overview}</span>
              <h2>Genres</h2>
              {film.genres &&
                film.genres
                  .reduce((acc, el, i) => [...acc, el.name], [])
                  .join(", ")}
              {/* {film.genres && film.genres.map(el => <span key={el.id}>{el.name}</span>)} */}

              <div>
                <h2>Additional information</h2>
                <ul className={s.addInfo}>
                  <li>
                    <Link to="cast">Cast</Link>
                  </li>
                  <li>
                    <Link to="reviews">Reviews</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="spinner">
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={120}
                  width={120}
                />
              </div>
            }
          >
            <Routes>
              <Route path="cast" element={<CastPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
}
