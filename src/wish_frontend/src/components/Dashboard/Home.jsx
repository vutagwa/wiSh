import React from 'react';

const Home = () => (
  <div className="homey">
    <div className="home-content">
      <h1>Welcome to Wish</h1>
      <p>When we walk, we walk together, Even if we lose our way, we'll find it. we will be your love</p>
      
      <div className="cards-container">
        <div className="cardy">
          <h2>Learn More</h2>
          <p>Discover how Wish works and how it can benefit you. Get detailed information about our features and technology.</p>
          <a href="/learn-more" className="card-link">Learn More</a>
        </div>
        
        <div className="cardy">
          <h2>Get Involved</h2>
          <p>Join our efforts to improve the platform. Contribute to development, provide feedback, or become an ambassador.</p>
          <a href="/get-involved" className="card-link">Get Involved</a>
        </div>
        
        <div className="cardy">
          <h2>Join Community</h2>
          <p>Connect with other users. Participate in discussions, ask questions, and stay updated with our latest news.</p>
          <a href="/join-community" className="card-link">Join Community</a>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
