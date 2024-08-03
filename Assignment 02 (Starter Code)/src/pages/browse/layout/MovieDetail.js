import YouTube from "react-youtube";
import styles from "./MovieDetail.module.css";
// lấy các props
const MovieDetail = ({ name, video, date, vote, overview, url }) => {
  const opts = {
    height: "400",
    width: "750px",

    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className={styles.boxDetail}>
      <div>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.content}>
          <h3 className={styles.text}>Release Date: {date}</h3>
          <h3 className={styles.text}>Vote: {vote} / 10</h3>
          <p>{overview}</p>
        </div>
      </div>

      {
        // có trainer- hiểm thị trainer; ko có trainer - hiển thị ảnh
        video && <YouTube videoId={video} opts={opts} />
      }
      {!video && (
        <img
          style={{ height: "400", width: "750px" }}
          src={"https://image.tmdb.org/t/p/w500" + url}
        />
      )}
    </div>
  );
};
export default MovieDetail;
