import { useState, createContext } from "react";
import NavBar from "../browse/layout/NavBar";
import InputSearch from "./InputSearch";
import ResultList from "./ResultList";
// tạo biến ẩn hiện MovieDetail
export const isMovidetail = createContext();

const Search = () => {
  // giá trị input khi submit
  const [input, setInput] = useState("");
  //set input khi submit
  const inputHandler = (value) => {
    setInput(value);
  };
  const [moviDetail, setMoviDetail] = useState(false);
  const toggleDetail = (value) => {
    setMoviDetail(value);
    console.log(value);
  };
  return (
    <isMovidetail.Provider value={{ moviDetail, toggleDetail }}>
      <NavBar />
      <InputSearch input={inputHandler} />
      <ResultList input={input} />
    </isMovidetail.Provider>
  );
};

export default Search;
