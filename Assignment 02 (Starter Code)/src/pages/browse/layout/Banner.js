import styles from "./Banner.module.css";
import useFilmBanner from "../hooks/useFilmBanner";
const url = `https://api.themoviedb.org/3/discover/tv?api_key=fe2f90c73c8d2e24c0a43f21f1cfc7a8&with_network=123`;

const Banner = () => {
  // thông tin film
  const { film } = useFilmBanner(url);
  // ko thấy ảnh sẽ thay thế ảnh khác
  const linkImg = film.backdrop_path
    ? film.backdrop_path
    : "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg";

  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={"https://image.tmdb.org/t/p/w500" + linkImg}
      />
      <div className={styles.item}>
        <h1 className={styles.title}>{film.name}</h1>
        <div>
          <button className={styles.btn}>Play</button>
          <button className={styles.btn}>My List</button>
        </div>
        <p className={styles.text}>{film.overview}</p>
      </div>
    </div>
  );
};
export default Banner;
