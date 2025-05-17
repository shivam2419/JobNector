import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/recruiter/ShowCandidates.css';

const dummyCandidatesData = {
  1: {
    jobTitle: 'MERN Stack Developer',
    candidates: [
      { id: 101, name: 'Rahul Sharma', email: 'rahul@example.com', city: 'Mumbai', state: 'Maharashtra', skills: ['MongoDB', 'Express', 'React', 'Node'], experience: 2 },
      { id: 102, name: 'Anjali Singh', email: 'anjali@example.com', city: 'Pune', state: 'Maharashtra', skills: ['React', 'Node', 'GraphQL'], experience: 3 },
    ]
  },
  2: {
    jobTitle: 'React Developer',
    candidates: [
      { id: 103, name: 'Suresh Kumar', email: 'suresh@example.com', city: 'Delhi', state: 'Delhi', skills: ['React', 'Redux', 'TypeScript'], experience: 4 },
    ]
  },
  3: {
    jobTitle: 'Backend Engineer',
    candidates: [
      { id: 104, name: 'Priya Nair', email: 'priya@example.com', city: 'Bengaluru', state: 'Karnataka', skills: ['Python', 'Django', 'REST APIs'], experience: 5 },
      { id: 105, name: 'Vikram Patel', email: 'vikram@example.com', city: 'Chennai', state: 'Tamil Nadu', skills: ['Java', 'Spring Boot'], experience: 6 },
    ]
  }
};

const ShowCandidates = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    const jobData = dummyCandidatesData[jobId];
    if (jobData) {
      setCandidates(jobData.candidates);
      setJobTitle(jobData.jobTitle);
    } else {
      setCandidates([]);
      setJobTitle('');
    }
  }, [jobId]);

  return (
    <div className="candidates-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Jobs</button>
      <h2>Candidates Applied for: {jobTitle || 'Unknown Job'}</h2>
      {candidates.length === 0 ? (
        <p>No candidates have applied for this job yet.</p>
      ) : (
        <ul className="candidate-list">
          {candidates.map(candidate => (
            <li key={candidate.id} className="candidate-card">
              <h3>{candidate.name}</h3>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Location:</strong> {candidate.city}, {candidate.state}</p>
              <p><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
              <p><strong>Experience:</strong> {candidate.experience} years</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowCandidates;
