import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmCast } from "../../services/api";
import defaultUser from "../../assets/defaultUser.png";
import s from "./Cast.module.css";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const params = useParams();
  useEffect(() => {
    fetchFilmCast(params.movieId).then((res) => setCast(res.data.cast));
  }, [params.movieId]);
  return (
    <div>
      <h2 className={s.title}>Cast</h2>
      <ul className={s.list}>
        {cast.map((el) => (
          <li className={s.item} key={el.id}>
            <img
              width="60"
              src={
                el.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                  : defaultUser
              }
              alt={el.name}
            />
            <span>{el.name}</span>
            <span>{el.character}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
