import { useEffect } from "react";
import Router from "./components/Router";
import "bootstrap/dist/css/bootstrap.css";

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function App() {
  useEffect(() => {
    setScreenSize();
  });

  return <Router />;
}

export default App;
