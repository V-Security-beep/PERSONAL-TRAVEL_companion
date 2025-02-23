import React, { useState, useEffect } from "react";
import "./Documents.css";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Other");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        category: selectedCategory,
        url: URL.createObjectURL(file),
      };
      setDocuments([...documents, newDoc]);
      localStorage.setItem("documents", JSON.stringify([...documents, newDoc]));
    }
  };

  const deleteDocument = (id) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
  };

  return (
    <div className="documents-container">
      <h1>📂 Travel Documents</h1>

      <div className="upload-section">
        <label className="upload-label">
          <input type="file" onChange={handleFileUpload} />
          <span>+ Upload Document</span>
        </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="Passport">Passport</option>
          <option value="Visa">Visa</option>
          <option value="Flight Tickets">Flight Tickets</option>
          <option value="Hotel Booking">Hotel Booking</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <p className="no-docs">No documents uploaded yet.</p>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="document-card">
              <p className="doc-title">{doc.name}</p>
              <p className="doc-category">📁 {doc.category}</p>
              <div className="doc-actions">
                <a href={doc.url} download>
                  📥 Download
                </a>
                <button onClick={() => deleteDocument(doc.id)}>❌ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Documents;
