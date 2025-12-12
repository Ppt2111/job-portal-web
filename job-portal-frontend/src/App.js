import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RegisterForm from "./components/register-form";
import Navbar from "./components/navigationbar";
import Footer from "./components/footer";

function App() {
    return (
        <Router>
            <div className="app-container"> {/* Wraps everything */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
