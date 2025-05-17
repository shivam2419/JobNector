import React, { useState } from 'react';
import '../../style/recruiter/PostJob.css';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: '',
    state: '',
    minSalary: '',
    maxSalary: '',
    salaryType: 'per month',
    duration: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Posted:', formData);
    alert('Job posted successfully!');
    // Backend API call goes here
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form className="post-job-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />

        <div className="salary-range-group">
          <input type="number" name="minSalary" placeholder="Min Salary (₹)" value={formData.minSalary} onChange={handleChange} required />
          <input type="number" name="maxSalary" placeholder="Max Salary (₹)" value={formData.maxSalary} onChange={handleChange} required />
          <select name="salaryType" value={formData.salaryType} onChange={handleChange}>
            <option value="per month">Per Month</option>
            <option value="per year">Per Year</option>
            <option value="per week">Per Week</option>
            <option value="one time">One Time</option>
          </select>
        </div>

        <input type="text" name="duration" placeholder="Duration (e.g., 6 months)" value={formData.duration} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" rows="6" value={formData.description} onChange={handleChange} required></textarea>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
