import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditTrip.css";

const EditTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip || {}; // Retrieve trip data from location state

  // Ensure trip data is loaded
  useEffect(() => {
    if (!trip.tripName) {
      console.warn("No trip data found. Redirecting to dashboard.");
      navigate("/dashboard"); // Redirect if no data is found
    }
  }, [trip, navigate]);

  const [tripData, setTripData] = useState({
    tripName: trip.tripName || "",
    destination: trip.destination || "",
    startDate: trip.startDate || "",
    endDate: trip.endDate || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  // Save updated trip data
  const handleSaveTrip = () => {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips = trips.map((t) => (t.tripName === trip.tripName ? tripData : t));
    localStorage.setItem("trips", JSON.stringify(trips));
    navigate("/dashboard");
  };

  return (
    <div className="edit-trip-container">
      <h1>Edit Trip</h1>
      <form className="trip-form">
        <div className="form-group">
          <label>Trip Name</label>
          <input type="text" name="tripName" value={tripData.tripName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Destination City</label>
          <input type="text" name="destination" value={tripData.destination} onChange={handleChange} />
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
          <button type="button" className="save-button" onClick={handleSaveTrip}>
            Save Changes
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTrip;
