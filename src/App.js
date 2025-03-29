import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Confetti from "react-confetti";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ background: darkMode ? "#121212" : "#f0f0f0", color: darkMode ? "white" : "black", minHeight: "100vh", transition: "0.3s" }}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact title="Contact Us" />} />
        </Routes>
      </Router>
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "15px", backgroundColor: darkMode ? "#333" : "#87CEEB", transition: "0.3s" }}>
      <div>
        <Link to="/" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ margin: "0 10px", color: "white", textDecoration: "none" }}>Contact</Link>
      </div>
      <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "5px 15px", cursor: "pointer", background: darkMode ? "#fff" : "#000", color: darkMode ? "black" : "white", border: "none", borderRadius: "5px" }}>Toggle {darkMode ? "Light" : "Dark"} Mode</button>
    </nav>
  );
};

const Home = () => {
  const [celebrate, setCelebrate] = useState(false);

  const handleCelebrate = () => {
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 3000);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {celebrate && <Confetti />}
      <h1>Welcome to Our Interactive Website!</h1>
      <p>Explore our features by navigating through the pages.</p>
      <button onClick={handleCelebrate} style={{ padding: "10px 20px", backgroundColor: "#ff4500", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontSize: "16px" }}>Celebrate!</button>
    </div>
  );
};

const About = () => {
  const quotes = [
    "Technology is best when it brings people together.",
    "Innovation is the key to success.",
    "The future depends on what we do today.",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{quotes[quoteIndex]}</h2>
    </div>
  );
};

const Contact = ({ title }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{title}</h2>
      {submitted ? (
        <p style={{ color: "lightgreen" }}>Thank you! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} style={{ padding: "10px", margin: "10px", width: "80%" }} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} style={{ padding: "10px", margin: "10px", width: "80%" }} required />
          <textarea name="message" placeholder="Your Message" onChange={handleChange} style={{ padding: "10px", margin: "10px", width: "80%", height: "100px" }} required />
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#ff4500", color: "white", border: "none", cursor: "pointer" }}>Submit</button>
        </form>
      )}
    </div>
  );
};

Contact.propTypes = {
  title: PropTypes.string.isRequired,
};

export default App;