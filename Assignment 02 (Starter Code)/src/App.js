import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// fe2f90c73c8d2e24c0a43f21f1cfc7a8 = API
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
// https://api.themoviedb.org/3/movie/550?api_key=<Token>

export default App;
