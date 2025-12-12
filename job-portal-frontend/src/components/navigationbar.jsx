import React from "react";
import { Link } from "react-router-dom";
import "./navigationbar.css"; // Add styling later

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Job Portal</h1>
            <div className="nav-links">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/jobs" className="nav-item">Jobs</Link>
                <Link to="/register" className="nav-item">Register</Link>
                <Link to="/login" className="nav-item">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
