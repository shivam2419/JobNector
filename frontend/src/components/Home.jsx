import React, { useState } from "react";
import { Link } from "react-router-dom";
import model from "../assets/manimage.png";
import logo from "../assets/JobNector.png";
import "../style/Home.css";

const faqs = [
  {
    question: "How do I apply for a job?",
    answer: "Browse jobs and click 'Apply'. Make sure you're signed in.",
  },
  {
    question: "How do I contact the recruiter?",
    answer:
      "Once you apply, you'll be able to chat with the recruiter through our messaging system.",
  },
  {
    question: "Is there any fee for job seekers?",
    answer: "No, our platform is completely free for job seekers.",
  },
  {
    question: "Can I apply for multiple jobs at once?",
    answer: "Yes, you can apply for multiple jobs based on your preferences.",
  },
];

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="home-wrapper">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Connecting Talent with Opportunity, Instantly</h1>
          <p>
            Whether you're hiring the best or becoming it — JobNector is your
            gateway to smarter recruitment and career growth.
          </p>
          <div className="hero-buttons">
            <Link id="hire-btn" to="/register">
              I'm Hiring
            </Link>
            <Link id="apply-job-btn" to="/register/candidate">
              I want a Job
            </Link>
          </div>
        </div>
      </header>

      <section className="stats-section">
        {[
          {
            img: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
            title: "100k+",
            subtitle: "Active Workers",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIFyWqg8DQ8U-5uA-Hwl5z_Tcr-_QUd-kIw&s",
            title: "200+",
            subtitle: "Companies",
          },
          {
            img: "https://thumbs.dreamstime.com/b/vector-black-earth-icon-internet-printing-etc-earth-icon-illustration-128313133.jpg",
            title: "10+",
            subtitle: "Countries",
          },
        ].map((item, index) => (
          <div className="stat-card" key={index}>
            <img src={item.img} alt={item.subtitle} />
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        ))}
      </section>

      <section className="job-type-section">
        <h2>Search by Job Types</h2>
        <div className="job-type-grid">
          {[
            "Accounting & Finance",
            "Automotive Jobs",
            "Education & Training",
            "Healthcare",
            "UI & UX",
            "Software Developer",
            "Data Scientist",
            "Backend Developer",
            "Frontend Developer",
          ].map((job, index) => (
            <div className="job-card" key={index}>
              <h3 className="job-title">{job}</h3>
              <span className="job-count">150+ Jobs Available</span>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {[...Array(5)].map((_, index) => (
            <div className="testimonial-card" key={index}>
              <p className="stars">★★★★★</p>
              <p className="quote">
                “JobNector helped me land a role faster than I imagined. The
                platform is intuitive and truly connects talent with
                opportunities.”
              </p>
              <div className="reviewer">
                <img src={model} alt="Reviewer" />
                <div>
                  <p className="name">Byan Jon</p>
                  <p className="date">
                    {Math.floor(10 + Math.random() * 9)} March, 2024
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-left">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <h4>
                Q.{index + 1} {faq.question}
              </h4>
              {activeIndex === index && (
                <p style={{ marginLeft: "10px" }}>A. {faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <div className="faq-right">
          <img src={logo} alt="FAQ Illustration" />
          <p>
            Still feeling unsure or have lingering questions? Our friendly and
            knowledgeable team is always here to provide you with clear
            explanations, personalized assistance, and the support you need to
            move forward with confidence.<br/><br/> We’re just a message or call away —
            connect with us at <b>yourjobnector@gmail.com</b> or reach out by phone at
            <b> +91-9900110011</b>. We're committed to helping you every step of the
            way.
          </p>
        </div>
      </section>
    </div>
  );
};
