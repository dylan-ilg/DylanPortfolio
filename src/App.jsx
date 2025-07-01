import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import { SceneRotation } from "./helpers/SceneRotation";
import useRotationHelper from "./helpers/RotationHelper";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";

function App() {
  const rotation = useRotationHelper();
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const atBottom = windowHeight + scrollY >= bodyHeight - 5;

      console.log("[SCROLL] scrollY:", scrollY);
      console.log("[SCROLL] window.innerHeight:", windowHeight);
      console.log("[SCROLL] document.body.offsetHeight:", bodyHeight);
      console.log("[SCROLL] atBottom =", atBottom);
      console.log("[ROTATION] hasRotatedFully =", rotation?.hasRotatedFully?.current);

      if (atBottom && rotation?.hasRotatedFully?.current) {
        console.log("[APP] ✅ Triggering showFooter");
        setShowFooter(true);
      } else {
        console.log("[APP] ⛔ Not ready to show footer");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rotation]);

  useEffect(() => {
    if (!rotation?.hasRotatedFully?.current) {
      document.body.style.overflow = 'hidden';
    }
  }, [rotation]);

  return (
    <SceneRotation.Provider value={rotation}>
      <Navbar />
      <main className="relative min-h-[300vh] bg-black text-white">
        <Home />
        {showFooter && <Footer />}
      </main>
    </SceneRotation.Provider>
  );
}

export default App;
