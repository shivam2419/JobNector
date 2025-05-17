import React, { useState } from "react";
import "../style/Home.css";
import model from "../assets/manimage.png";
import { Link } from "react-router-dom";
import logo from "../assets/JobNector.png";
const faqs = [
  {
    question: "1. How do I apply for a job?",
    answer:
      "You can browse available jobs and click 'Apply' to start your application process. Make sure you're signed in.",
  },
  {
    question: "2. How do I contact the recruiter?",
    answer:
      "Once you apply, you'll be able to chat with the recruiter through our messaging system.",
  },
  {
    question: "3. Is there any fee for job seekers?",
    answer: "No, our platform is completely free for job seekers.",
  },
  {
    question: "4. Can I apply for multiple jobs at once?",
    answer:
      "Yes, you can apply for multiple jobs based on your preferences and qualifications.",
  },
];
export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div className="home-container">
      <div className="first">
        <div className="home-left">
          <h1>Connecting Talent with Opportunity, Instantly.</h1>
          <p>
            Whether you're hiring the best or becoming it — JobNector is your
            gateway to smarter recruitment and career growth.
          </p>
          <br />
          <Link id="hire-btn" to="/hire">
            I'm Hiring
          </Link>
          <Link id="apply-job-btn" to="/apply">
            I want a Job
          </Link>
        </div>
        <div className="home-right">
          <img src={model} alt="Job seeker illustration" />
        </div>
      </div>

      <div className="home-reaches">
        {[
          {
            img: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
            title: "100k +",
            subtitle: "Active workers",
          },
          {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIFyWqg8DQ8U-5uA-Hwl5z_Tcr-_QUd-kIw&s",
            title: "200 +",
            subtitle: "Companies",
          },
          {
            img: "https://thumbs.dreamstime.com/b/vector-black-earth-icon-internet-printing-etc-earth-icon-illustration-128313133.jpg",
            title: "10 +",
            subtitle: "Countries",
          },
        ].map((item, index) => (
          <div className="home-reaches-section" key={index}>
            <img src={item.img} alt={item.subtitle} />
            <span>
              <p>
                <b>{item.title}</b> <br />
                {item.subtitle}
              </p>
            </span>
          </div>
        ))}
      </div>

      <div className="home-community">
        <h1>
          Hear What Our Community <span>Has To Say!</span>
        </h1>
        <div className="home-community-member">
          {[...Array(4)].map((_, index) => (
            <div className="home-community-member-section" key={index}>
              <i>★★★★★</i>
              <p>
                “JobNector helped me land a role faster than I imagined. The
                platform is intuitive and truly connects talent with
                opportunities.”
              </p>
              <span>
                <img src={model} alt="Reviewer" />
                <div>
                  <b>Byan Jon</b>
                  <p>20 March, 2024</p>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="home-job-types">
        <div className="home-job-types-heading">
          <h1>Search By Job Types</h1>
          <p>
            Explore various job categories to find opportunities tailored to
            your skills and interests. Whether you're into tech, healthcare,
            finance, or design—there's something here for everyone.
          </p>
        </div>

        <div className="home-job-type-content">
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
          ]
            .reduce((rows, job, index) => {
              if (index % 3 === 0) rows.push([]);
              rows[rows.length - 1].push(job);
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <div className="job-type-row" key={rowIndex}>
                {row.map((job, index) => (
                  <div className="home-job-type-content-section" key={index}>
                    <span>
                      <img
                        src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-coin-money-icon-png-image_5278199.jpg"
                        alt={`${job} icon`}
                      />
                      <p>
                        <b>{job}</b>
                        <br />
                        200 Jobs Available
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="faq-section px-6 py-12">
        <div className="faq-section-content-left flex flex-col md:flex-row max-w-6xl mx-auto gap-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions (FAQ)
          </h2>
          {/* Left: FAQ Items */}
          <div className="flex-1">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item border-b py-4 cursor-pointer ${
                  activeIndex === index ? "bg-gray-50" : ""
                }`}
                key={index}
                onClick={() => toggleFAQ(index)}
              >
                <h4 className="faq-question text-lg font-medium flex justify-between items-center">
                  {faq.question}
                  <span className="ml-2 text-xl">
                  </span>
                </h4>
                {activeIndex === index && (
                  <p className="faq-answer text-gray-600 mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

        </div>
        <div className="faq-section-content-right flex-1 flex flex-col items-center md:items-start text-center md:text-left ">
            <img
              src={logo}
              alt="FAQ"
              className="w-64 h-64 object-contain mb-6"
            />
            <p className="text-gray-700 text-base max-w-md">
              Still have questions? We're here to help. Browse through common
              queries or contact our team for personalized assistance. We want
              your journey with us to be smooth and clear.
            </p>
          </div>
      </div>
    </div>
  );
};
