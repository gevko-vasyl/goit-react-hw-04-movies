import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const HomePage = lazy(
  () => import("./pages/Home/Home") /*webpackChunkName: HomePage*/
);
const MoviesPage = lazy(
  () => import("./pages/Movies/Movies") /*webpackChunkName: MoviesPage*/
);
const MovieDetailsPage = lazy(
  () =>
    import(
      "./pages/MovieDetailsPage/MovieDetailsPage.jsx"
    ) /*webpackChunkName: MovieDetailsPage*/
);

function App() {
  return (
    <div className="App">
      <header>
        <ul className="nav">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="movies">Movies</NavLink>
          </li>
        </ul>
      </header>
      <Suspense
        fallback={
          <div className="spinner">
            <Loader type="TailSpin" color="#00BFFF" height={120} width={120} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId*" element={<MovieDetailsPage />} />
          <Route path="/goit-react-hw-04-movies" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
