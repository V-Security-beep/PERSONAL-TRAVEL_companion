import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("newTrip");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedTrips, setSavedTrips] = useState([]);

  // Fetch trips from Mock API when clicking "New Trip"
  useEffect(() => {
    if (activeTab === "newTrip") {
      axios
        .get("https://679d6f6787618946e655152d.mockapi.io/api/trip")
        .then((response) => {
          setTrips(response.data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching trips:", error));
    }
  }, [activeTab]);

  // Retrieve saved trips from Local Storage
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    setSavedTrips(storedTrips);
  }, []);

  // Delete Trip Function
  const handleDeleteTrip = (index) => {
    const updatedTrips = savedTrips.filter((_, i) => i !== index);
    setSavedTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  // Edit Trip Function
  const handleEditTrip = (trip) => {
    navigate("/edit-trip", { state: { trip } });
  };

  // Password Protection for Documents Page
  const handleDocumentsAccess = () => {
    const userPassword = prompt("Enter Password to Access Documents:");

    if (userPassword === "12345") {
      navigate("/documents");
    } else {
      alert("Incorrect Password! Access Denied.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h1 className="dashboard-title">Travel Hub</h1>
        <nav className="tabs">
          <button className="tab" onClick={() => navigate("/add-trip")}>
            New Trip
          </button>
          <button className="tab" onClick={() => navigate("/packing-list")}>
            Packing List
          </button>
          <button className="tab" onClick={() => navigate("/photos")}>
            Photos of Trip
          </button>
          <button className="tab" onClick={handleDocumentsAccess}>
            Documents
          </button>
          <button className="tab" onClick={() => navigate("/budget-planner")}>
            Budget Planner
          </button>
          


        </nav>

        <main className="dashboard-content">
          {activeTab === "newTrip" && (
            <div>
              <h2>Upcoming Trips</h2>
              {loading ? (
                <p>Loading trips...</p>
              ) : trips.length > 0 ? (
                <ul className="trip-list">
                  {trips.map((trip) => (
                    <li key={trip.id} className="trip-item">
                      <h3>{trip.destination}</h3>
                      <p>Date: {formatDate(trip.date)}</p>
                      <p>{trip.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Upcoming Trips</p>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Right Side Panel - Added Trips */}
      <div className="added-trips-container">
        <h2 className="added-trips-title">Added Trips</h2>
        {savedTrips.length === 0 ? (
          <p>No trips added yet.</p>
        ) : (
          <ul className="added-trips-list">
            {savedTrips.map((trip, index) => (
              <li key={index} className="added-trip-item">
                <div className="trip-info">
                  <h3>{trip.tripName}</h3>
                  <p>📍 {trip.destination}</p>
                  <p>📅 {trip.startDate} - {trip.endDate}</p>
                </div>

                {/* Three-Dot Menu */}
                <div className="menu-container">
                  <button className="menu-button">⋮</button>
                  <div className="menu-dropdown">
                    <button onClick={() => handleEditTrip(trip)}>✏️ Edit Trip</button>
                    <button onClick={() => handleDeleteTrip(index)}>🗑 Delete Trip</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
