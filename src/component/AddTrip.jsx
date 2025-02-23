import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTrip.css';
import addTripBackground from '../assets/AddTrip.png'; // Ensure the correct path


function AddTrip() {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    tripName: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  // Save trip data to Local Storage and navigate to Dashboard
  const handleSaveTrip = () => {
    if (!tripData.tripName || !tripData.destination || !tripData.startDate || !tripData.endDate) {
      alert('Please fill in all fields!');
      return;
    }

    // Retrieve existing trips from Local Storage or initialize an empty array
    const existingTrips = JSON.parse(localStorage.getItem('trips')) || [];

    // Add new trip
    existingTrips.push(tripData);

    // Save updated trip list back to Local Storage
    localStorage.setItem('trips', JSON.stringify(existingTrips));

    // Navigate back to Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="add-trip-container" style={{ backgroundImage: `url(${addTripBackground})` }}>
      <h1>Add Trip</h1>
      <p>
        Add a trip manually below or forward your confirmation emails to <b>plans@tripit.com</b>, and we'll create the trip for you.
      </p>
      <div className="trip-form">
        <div className="form-group">
          <label>Trip Name</label>
          <input type="text" name="tripName" value={tripData.tripName} onChange={handleChange} placeholder="Enter trip name" />
        </div>
        <div className="form-group">
          <label>Destination City</label>
          <input type="text" name="destination" value={tripData.destination} onChange={handleChange} placeholder="Enter destination" />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={tripData.startDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={tripData.endDate} onChange={handleChange} />
        </div>
        <div className="form-buttons">
          <button className="save-button" onClick={handleSaveTrip}>Save</button>
          <button className="cancel-button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddTrip;
