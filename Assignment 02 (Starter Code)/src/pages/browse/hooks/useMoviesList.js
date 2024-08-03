import { useEffect, useState } from "react";
// Tạo hook nhận url và trả về listFỉlm tương ứng
const useMoviesList = (list) => {
  const [listfilm, setListFilm] = useState([]);
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(list);
        const data = await response.json();

        setListFilm(data.results);
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    fetchFunction();
  }, [list]);
  return { listfilm: listfilm };
};
export default useMoviesList;
