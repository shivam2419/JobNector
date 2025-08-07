import React from 'react';
import "../style/About.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About JobNector</h1>
        <p>
          JobNector connects talented professionals with top companies worldwide. Our mission is to
          simplify the hiring process and empower job seekers to find their dream opportunities.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <div className="value-cards">
          <div className="card">
            <h3>Innovation</h3>
            <p>We embrace technology to create a smarter, faster hiring process.</p>
          </div>
          <div className="card">
            <h3>Transparency</h3>
            <p>Clear communication and open hiring practices define us.</p>
          </div>
          <div className="card">
            <h3>Empowerment</h3>
            <p>We give job seekers tools to take control of their careers.</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
            <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Founder" />
            <h4>Aryan Verma</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="member">
            <img src="https://femina.wwmindia.com/thumb/content/2021/sep/women-thumb1632797644.jpg?width=1200&height=900" alt="Designer" />
            <h4>Sneha Rao</h4>
            <p>Lead Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
