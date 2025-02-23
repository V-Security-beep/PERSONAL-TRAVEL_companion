import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PhotosOfTrip.css";

const PhotosOfTrip = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Load stored folders from Local Storage
  useEffect(() => {
    const savedFolders = JSON.parse(localStorage.getItem("photoFolders")) || {};
    setFolders(savedFolders);
  }, []);

  // Create a new trip folder
  const createFolder = () => {
    const folderName = prompt("Enter Trip Name:");
    if (!folderName) return;

    if (folders[folderName]) {
      alert("A folder with this name already exists!");
      return;
    }

    const updatedFolders = { ...folders, [folderName]: [] };
    setFolders(updatedFolders);
    localStorage.setItem("photoFolders", JSON.stringify(updatedFolders));
  };

  // Delete an entire folder
  const deleteFolder = (folderName) => {
    const updatedFolders = { ...folders };
    delete updatedFolders[folderName];

    setFolders(updatedFolders);
    localStorage.setItem("photoFolders", JSON.stringify(updatedFolders));
    setSelectedFolder(null); // Reset selected folder
  };

  // Handle file upload inside selected folder
  const handlePhotoUpload = (event) => {
    if (!selectedFolder) {
      alert("Please select a trip folder first.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto = {
        id: Date.now(),
        src: reader.result,
        caption: prompt("Enter photo caption:") || "No Caption",
      };

      const updatedFolders = {
        ...folders,
        [selectedFolder]: [...folders[selectedFolder], newPhoto],
      };

      setFolders(updatedFolders);
      localStorage.setItem("photoFolders", JSON.stringify(updatedFolders));
    };
    reader.readAsDataURL(file);
  };

  // Delete Photo from Folder
  const handleDeletePhoto = (photoId) => {
    if (!selectedFolder) return;

    const updatedFolders = {
      ...folders,
      [selectedFolder]: folders[selectedFolder].filter(photo => photo.id !== photoId),
    };

    setFolders(updatedFolders);
    localStorage.setItem("photoFolders", JSON.stringify(updatedFolders));
  };

  return (
    <div className="photos-container">
      <h1>Photos of Trip</h1>

      {/* Left Side: Folder Creation & Selection */}
      <div className="folder-section">
        <button className="create-folder-btn" onClick={createFolder}>➕ Create Trip Folder</button>
        <h2>Your Trips</h2>
        {Object.keys(folders).length === 0 ? (
          <p>No folders created yet.</p>
        ) : (
          <ul className="folder-list">
            {Object.keys(folders).map((folderName) => (
              <li key={folderName} className="folder-item">
                📁 <span onClick={() => setSelectedFolder(folderName)}>{folderName}</span>
                <button className="delete-folder-btn" onClick={() => deleteFolder(folderName)}>🗑</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Side: Display Photos in Selected Folder */}
      <div className="photo-gallery-container">
        {selectedFolder ? (
          <>
            <h2>📂 {selectedFolder}</h2>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="upload-btn" />
            <div className="photo-gallery">
              {folders[selectedFolder].length === 0 ? (
                <p>No photos in this folder.</p>
              ) : (
                folders[selectedFolder].map((photo) => (
                  <div key={photo.id} className="photo-card">
                    <img src={photo.src} alt="Trip" className="trip-photo" />
                    <p>{photo.caption}</p>
                    <button onClick={() => handleDeletePhoto(photo.id)}>🗑 Delete</button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <p className="select-folder-msg">📂 Select a folder to view photos</p>
        )}
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default PhotosOfTrip;
