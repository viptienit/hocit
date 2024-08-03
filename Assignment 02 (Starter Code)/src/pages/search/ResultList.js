import styles from "./ResultList.module.css";
import useMoviesList from "../browse/hooks/useMoviesList";
import React, { useState, useEffect, useContext } from "react";
import MovieDetail from "../browse/layout/MovieDetail";
import { isMovidetail } from "./Search";

// lấy giá trị tưd trương input làm kết quả tim kiếm
const ResultList = ({ input }) => {
  // id film
  const [film, setFilm] = useState("");
  // thông tin phim
  const [movieInfo, setMovieInfo] = useState("");
  // key đẻ tim video
  const [video, setVideo] = useState("");
  // ẩn hiện MovieDetail
  const { moviDetail, toggleDetail } = useContext(isMovidetail);

  const filmHandler = (id, movie) => {
    if (id !== film) {
      // lấy id
      setFilm(id);
      // lấy thông tin
      setMovieInfo(movie);
      // hiện MovieDetail
      toggleDetail(true);
    } else {
      // ẩn MovieDetail
      setFilm("");
      setMovieInfo("");
      toggleDetail(false);
    }
  };
  // lấy listFilm
  const { listfilm: listSearch } = useMoviesList(
    `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8`
  );
  // lấy id và set key của video
  useEffect(() => {
    if (film) {
      const fectKey = async () => {
        try {
          const respose = await fetch(
            `https://api.themoviedb.org/3/movie/${film}/videos?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8`
          );
          const data = await respose.json();
          if (data.results.length) {
            setVideo(
              data.results.filter((mov) => mov.type === "Trailer")[0].key
            );
          } else {
            setVideo("");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fectKey();
    }
  }, [film]);
  return (
    <div
      style={{ height: listSearch.length !== 0 ? "" : "50vh" }}
      className={styles.listFilm}
    >
      <h2 className={styles.title}>Search Result</h2>
      <div
        style={{
          padding: listSearch.length === 0 ? "" : "40px 30px 400px 40px",
        }}
      >
        {listSearch
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
            />
          ))}
      </div>
      {moviDetail && movieInfo && (
        <MovieDetail
          name={movieInfo.name ? movieInfo.name : movieInfo.title}
          video={video}
          date={
            movieInfo.release_date
              ? movieInfo.release_date
              : movieInfo.first_air_date
          }
          vote={movieInfo.vote_average.toFixed(1)}
          overview={movieInfo.overview}
          url={movieInfo.backdrop_path}
        />
      )}
    </div>
  );
};
export default React.memo(ResultList);
