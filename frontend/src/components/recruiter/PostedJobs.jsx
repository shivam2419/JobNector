import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/recruiter/PostedJobs.css';

const dummyJobs = [
  { id: 1, title: 'MERN Stack Developer', company: 'Tech Solutions', city: 'Mumbai', state: 'Maharashtra' },
  { id: 2, title: 'React Developer', company: 'InnovateX', city: 'Delhi', state: 'Delhi' },
  { id: 3, title: 'Backend Engineer', company: 'CodeBase', city: 'Bengaluru', state: 'Karnataka' },
];

const PostedJobs = () => {
  const [jobs] = useState(dummyJobs);
  const navigate = useNavigate();

  return (
    <div className="posted-jobs-container">
      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul className="jobs-list">
          {jobs.map(job => (
            <li key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.city}, {job.state}</p>
              <button onClick={() => navigate(`/candidates/${job.id}`)}>
                View Candidates
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostedJobs;
