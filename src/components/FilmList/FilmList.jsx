import React from "react";
import { Link } from "react-router-dom";

export default function FilmList({ films, pathname = "", query = "" }) {
  return (
    <>
      {films.map((el) => (
        <li key={el.id}>
          <Link
            to={{
              pathname: `${pathname}${el.id}`,
              search: query,
            }}
          >
            {el.title ?? el.name}
          </Link>
        </li>
      ))}
    </>
  );
}
