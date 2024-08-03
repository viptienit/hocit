import useMoviesList from "../hooks/useMoviesList";
import { useState, useEffect } from "react";
import styles from "./MoviesList.module.css";
import MovieDetail from "./MovieDetail";

const requests = {
  Trending: `https://api.themoviedb.org/3/trending/all/week?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&language=en-US`,
  Originals: `https://api.themoviedb.org/3/discover/tv?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_network=123`,
  TopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&language=en-US`,
  ActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_genres=28`,
  ComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_genres=35`,
  HorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_genres=27`,
  RomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_genres=10749`,
  Documentaries: `https://api.themoviedb.org/3/discover/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_genres=99`,
  Search: `https://api.themoviedb.org/3/search/movie?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&language=en-US`,
};
const MoviesList = () => {
  // lấy listFilm từ hook
  const { listfilm: listTrending } = useMoviesList(requests.Trending);
  const { listfilm: listOriginals } = useMoviesList(requests.Originals);
  const { listfilm: listTopRated } = useMoviesList(requests.TopRated);
  const { listfilm: listActionMovies } = useMoviesList(requests.ActionMovies);
  const { listfilm: listComedyMovies } = useMoviesList(requests.ComedyMovies);
  const { listfilm: listHorrorMovies } = useMoviesList(requests.HorrorMovies);
  const { listfilm: listRomanceMovies } = useMoviesList(requests.RomanceMovies);
  const { listfilm: listDocumentaries } = useMoviesList(requests.Documentaries);
  // id film
  const [film, setFilm] = useState("");
  // thông tin film
  const [movieInfo, setMovieInfo] = useState("");
  // key bộ film
  const [video, setVideo] = useState("");

  // click ảnh
  const filmHandler = (id, movie) => {
    if (id !== film) {
      // lấy id
      setFilm(id);
      //lấy thông tin
      setMovieInfo(movie);
    } else {
      // Ẩn MovieDetail
      setFilm("");
      setMovieInfo("");
    }
  };
  // moõi lần thay đổi id fiml sẽ tìm video
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

    return;
  }, [film]);

  return (
    <div>
      <h2 className={styles.title}>Original</h2>
      <div className={styles.imgBox}>
        {listOriginals
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.imgOriginal}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.poster_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Xu hướng</h2>
      <div className={styles.imgBox}>
        {listTrending
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Xếp hạng cao</h2>
      <div className={styles.imgBox}>
        {listTopRated
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Hành động</h2>
      <div className={styles.imgBox}>
        {listActionMovies
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Hài</h2>
      <div className={styles.imgBox}>
        {listComedyMovies
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Kinh dị</h2>
      <div className={styles.imgBox}>
        {listHorrorMovies
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Lãng mạn</h2>
      <div className={styles.imgBox}>
        {listRomanceMovies
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>
      <h2 className={styles.title}>Tài liệu</h2>
      <div
        style={{ marginBottom: movieInfo ? "448px" : "" }}
        className={styles.imgBox}
      >
        {listDocumentaries
          .filter((film) => film.poster_path !== null)
          .map((film) => (
            <img
              onClick={() => filmHandler(film.id, film)}
              className={styles.img}
              key={film.id.toString()}
              src={"https://image.tmdb.org/t/p/w500" + film.backdrop_path}
            />
          ))}
      </div>

      {
        // có thông tin sẽ hiển thị thông tin
        movieInfo && (
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
        )
      }
    </div>
  );
};
export default MoviesList;
