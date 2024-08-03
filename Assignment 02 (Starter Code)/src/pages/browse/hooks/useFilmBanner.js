import { useState, useEffect } from "react";
// tạo thông tin và ảnh cho Banner
const useFilmBanner = (url) => {
  const [film, setFilm] = useState([]);
  // render mỗi lần tải lại trang
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // lấy ngẫu nhiên 1 bộ phim
        setFilm(
          data.results[Math.floor(Math.random() * data.results.length - 2)]
        );
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchFunction();
  }, []);
  // Trả về Bộ
  return { film };
};
export default useFilmBanner;
