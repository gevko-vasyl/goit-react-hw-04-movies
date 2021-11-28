import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import s from "./FilmList.module.css";

export default function FilmList({ films, pathname = "" }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movies/${id}`, { state: pathname });
  };

  return (
    <>
      <ul className={s.list}>
        {films.map((el) => (
          <li className={s.item} key={el.id} onClick={() => handleClick(el.id)}>
            {el.title ?? el.name}
          </li>
        ))}
      </ul>
    </>
    // <>
    //   {films.map(el => (
    //     <li key={el.id}>
    //       <Link
    //         to={{
    //           pathname: `${pathname}${el.id}`,
    //           search: '123',
    //           state: '123',
    //         }}
    //       >
    //         {el.title ?? el.name}
    //       </Link>
    //     </li>
    //   ))}
    // </>
  );
}

FilmList.propsTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  pathname: PropTypes.string.isRequired,
};
