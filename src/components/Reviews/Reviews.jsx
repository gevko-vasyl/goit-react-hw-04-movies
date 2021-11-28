import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmReviews } from "../../services/api";
import s from "./Reviews.module.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const params = useParams();
  console.log(reviews);

  useEffect(() => {
    fetchFilmReviews(params.movieId).then((res) =>
      setReviews(res.data.results)
    );
  }, [params.movieId]);
  return (
    <div>
      <h2 className={s.title}>Reviews</h2>
      {reviews.length ? (
        <ul className={s.list}>
          {reviews.map((el) => (
            <li key={el.id}>
              <span className={s.authorTitle}>{el.author}</span>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No reviews of this movie</h3>
      )}
    </div>
  );
}
