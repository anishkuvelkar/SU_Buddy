import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import HomeNavbar from "./components/homeNavbar"
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Services from "./pages/services";
import About from "./pages/about";
import News from "./pages/news";
import Home from "./pages/home";
import UserProfile from "./pages/userProfile";
import axios from 'axios';
import Chat from "./pages/chat"
import Groups from "./pages/groups"
import {Toaster} from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials= true

export default function App() { 
  return (
    <div className="white">
      <div>
        <Router>
          
          <Toaster position="bottom-right" toastOptions={{duration: 2000}} />
          <Routes>
            <Route path="/" element={<><Navbar /><Landing /></>} />
            <Route path="/news" element={<><Navbar /><News /></>} />
            <Route path="/services" element={<><Navbar /><Services /></>} />
            <Route path="/about" element={<><Navbar /><About /></>} />
            <Route path="/login" element={<><Navbar /><Login/></>} />
            <Route path="/home" element={<><HomeNavbar/><Home/></>} />
            <Route path="/chat" element={<><HomeNavbar/><Chat/></>} />
            <Route path="/group" element={<><HomeNavbar/><Groups/></>} />
            <Route path="/register" element={<><Navbar /><Register/></>} />
            <Route path="/userProfile" element={<><HomeNavbar /><UserProfile/></>} />

          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}
