import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import {Home, About, Projects, Contact} from "./Pages/index.js";

function App() {
    return (
        <Router>
            <Navbar/>
             <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/projects" element={<Projects />}/>
                <Route path="/contact" element={<Contact />}/>
            </Routes>
        </Router>
    );
}

export default App;