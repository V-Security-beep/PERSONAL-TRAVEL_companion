import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./component/LoginPage";
import Dashboard from "./component/Dashboard";
import AddTrip from "./component/AddTrip";
import EditTrip from "./component/EditTrip";
import PhotosOfTrip from "./component/PhotosOfTrip";
import PackingList from "./component/PackingList";
import Documents from "./component/Documents";  
import BudgetPlanner from "./component/BudgetPlanner";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />
        <Route path="/photos" element={<PhotosOfTrip />} />
        <Route path="/packing-list" element={<PackingList />} />
        <Route path="/documents" element={<Documents />} />  
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        
      </Routes>
    </Router>
  );
}

export default App;
