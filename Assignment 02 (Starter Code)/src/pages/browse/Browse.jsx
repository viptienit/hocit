import { Fragment } from "react";
import NavBar from "./layout/NavBar";
import Banner from "./layout/Banner";
import MoviesList from "./layout/MoviesList";

function Browse() {
  return (
    <Fragment>
      <NavBar />
      <Banner />
      <MoviesList />
    </Fragment>
  );
}

export default Browse;
