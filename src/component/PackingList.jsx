import React, { useState, useEffect } from "react";
import "./PackingList.css";

const PackingList = () => {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("packingList")) || [];
  });
  const [newItem, setNewItem] = useState("");

  // Save packing list in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(items));
  }, [items]);

  // Add New Item
  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, { id: Date.now(), name: newItem, checked: false }]);
      setNewItem("");
    }
  };

  // Delete Item
  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Toggle Checkbox
  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="packing-container">
      <h1>Packing List</h1>

      {/* Input Box for Adding New Items */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Add new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="add-btn" onClick={addItem}>Add</button>
      </div>

      {/* Packing List Display */}
      <ul className="packing-list">
        {items.length === 0 ? (
          <p className="empty-msg">Your packing list is empty!</p>
        ) : (
          items.map((item) => (
            <li key={item.id} className="packing-item">
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                />
                <span className={item.checked ? "checked" : ""}>{item.name}</span>
              </label>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PackingList;
