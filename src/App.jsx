import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Services from "./pages/services";
import About from "./pages/about";
import News from "./pages/news";
import Home from "./pages/home";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials= true

export default function App() { 
  return (
    <div className="white">
      <div>
        <Router>
          <Navbar />
          <Toaster position="bottom-right" toastOptions={{duration: 2000}} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/news" element={<News />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}
