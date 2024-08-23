import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header2">
        <div className="logo">
          <span className="fancy-font">Wish</span>
        </div>
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#demo">Product Demo</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </header>

      <section id="home" className="section home">
        <div className="home-content">
          <h1><span className="fancy-font">Welcome to Wish</span></h1>
          <p>Empowering you with the best decentralized experience.</p>
          <Link to="/userDashboard">
            <button className="cta-button">Get started</button>
          </Link>
        </div>
      </section>

      <section id="about" className="section about">
        <h2>About Us</h2>
        <p>Our mission is to revolutionize the way you interact with decentralized applications. Discover the future with us.</p>
        <img src="https://via.placeholder.com/600x400" alt="About Us" />
      </section>

      <section id="demo" className="section demo">
        <h2>Product Demo</h2>
        <p>See how our application works and how it can benefit you. Watch the demo below:</p>
        <img src="https://via.placeholder.com/800x450" alt="Product Demo" />
      </section>

      <section id="contact" className="section contact">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you. Get in touch with us through the form below:</p>
        <form className="contact-form">
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2024 happy fools. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
