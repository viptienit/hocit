import React, { useState, useCallback } from "react";
import Buttton from "./components/UI/Button/Button";

import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setshowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("App Running...");
  const allowToggleHandler = () => {
    setAllowToggle(true);
  };
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setshowParagraph((prevShowParagreph) => !prevShowParagreph);
    }
  }, [allowToggle]);
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Buttton onClick={allowToggleHandler}>AllowToggle Paragraph!</Buttton>
      <Buttton onClick={toggleParagraphHandler}>Toggle Paragraph!</Buttton>
    </div>
  );
}

export default App;
