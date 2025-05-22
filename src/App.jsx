import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
                <Route path="/about" element={<h1>About</h1>}/>
                <Route path="/projects" element={<h1>Projects</h1>}/>
                <Route path="/Contact" element={<h1>Contact</h1>}/>

            </Routes>
        </Router>
    );
}

export default App;