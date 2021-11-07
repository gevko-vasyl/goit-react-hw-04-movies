import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import Cast from "./components/Cast/Cast";

function App() {
  return (
    <div className="App">
      <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="movies">Movies</NavLink>
          </li>
        </ul>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/home' element={<Home />} /> */}
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId*" element={<MovieDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
