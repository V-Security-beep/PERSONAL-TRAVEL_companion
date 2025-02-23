import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import backgroundVideo from '../assets/Background.mp4';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    homeCity: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid =
    formData.firstName && formData.lastName && formData.dob && formData.homeCity;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.firstName}!`);
    navigate('/dashboard'); // Navigate to Dashboard after login
  };

  return (
    <div className="login-page">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-container">
        <h2>Welcome Aboard</h2>
        <p>Let’s personalize your Travel Hub experience.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            First Name *
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name *
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date of Birth *
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Home City *
            <input
              type="text"
              name="homeCity"
              value={formData.homeCity}
              onChange={handleInputChange}
              required
            />
          </label>
          <p className="trip-message">
            Hope you will enjoy your upcoming trip with us!
          </p>
          <button type="submit" disabled={!isFormValid}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
