import React, { useState } from 'react';
import axios from 'axios';
import FrameWithBorder from "./registerFrame";
import eclipse1 from "../svgs/Ellipse1.svg";
import eclipse2 from "../svgs/Ellipse2.svg";

const SignupComponent = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  // Update state based on form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with the URL of your backend server's registration endpoint
      const response = await axios.post('mongodb://localhost:3000n/register', formData);
      console.log('Registration Successful:', response.data);
      
      alert('Registration Successful!');
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      
      alert('Registration Error: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="bg-customblack flex flex-col min-h-fit relative mt-5">
      {/* Text and SVG elements */}
      <p className="hidden sm:block absolute text-white ml-[220px] mt-[430px] font-sans" style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: "96px", fontStyle: "normal", fontWeight: 600, lineHeight: "normal", color: "white" }}>
        Roll the Carpet.!
      </p>

      <img src={eclipse1} alt="Eclipse 1" className="hidden sm:block absolute mr-60 top-4 right-5" />

      {/* Line SVG */}
      <svg className="hidden sm:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[570px]" xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 950 2" fill="none">
        <line x1="0" y1="1" x2="1000" y2="1" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeDasharray="12 12" />
      </svg>

      {/* Text SVG */}
      <svg className="hidden sm:block absolute  ml-[220px] mt-[530px]" xmlns="http://www.w3.org/2000/svg" width="244" height="80" viewBox="0 0 244 80" fill="none">
        <text x="50%" y="50%" fill="#FFF" fontFamily="'Noto Sans', sans-serif" fontSize="32" fontStyle="italic" fontWeight="600" dominantBaseline="middle" textAnchor="middle">
          Skip the lag?
        </text>
        <rect x="2" y="2" width="240" height="76" stroke="white" strokeWidth="4" />
      </svg>

      <img src={eclipse2} alt="Eclipse 2" className="hidden sm:block absolute mt-[700px] right-9" />

      {/* FrameWithBorder and Form */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col items-center justify-center sm:absolute sm:right-0 sm:top-0 lg:p-16 md:p-12 sm:p-8 p-4 sm:m-auto">
          <FrameWithBorder />
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
