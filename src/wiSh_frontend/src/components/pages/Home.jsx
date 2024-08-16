import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Wish</h1>
        <p>Empowering Change Through Awareness</p>
      </header>
      <section className="home-content">
        <div className="card">
          <h2>Get Involved</h2>
          <p>Discover ways you can contribute to meaningful causes and make a difference in the world.</p>
        </div>
        <div className="card">
          <h2>Learn More</h2>
          <p>Explore resources and stories to better understand social issues and how to address them.</p>
        </div>
        <div className="card">
          <h2>Join the Community</h2>
          <p>Connect with like-minded individuals and be a part of a supportive network dedicated to social change.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
