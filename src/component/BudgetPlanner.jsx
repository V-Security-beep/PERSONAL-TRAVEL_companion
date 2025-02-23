import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./BudgetPlanner.css";

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPlanner = () => {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [newExpense, setNewExpense] = useState({ category: "Food", amount: "" });

  // Save expenses to LocalStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add a new expense
  const addExpense = () => {
    if (newExpense.amount.trim() !== "" && !isNaN(newExpense.amount)) {
      setExpenses([...expenses, { id: Date.now(), ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ category: "Food", amount: "" });
    }
  };

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Prepare data for Chart.js
  const expenseData = {
    labels: ["Food", "Transport", "Hotels", "Activities", "Other"],
    datasets: [
      {
        data: [
          expenses.filter((e) => e.category === "Food").reduce((acc, e) => acc + e.amount, 0),
          expenses.filter((e) => e.category === "Transport").reduce((acc, e) => acc + e.amount, 0),
          expenses.filter((e) => e.category === "Hotels").reduce((acc, e) => acc + e.amount, 0),
          expenses.filter((e) => e.category === "Activities").reduce((acc, e) => acc + e.amount, 0),
          expenses.filter((e) => e.category === "Other").reduce((acc, e) => acc + e.amount, 0),
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#8e44ad"],
      },
    ],
  };

  return (
    <div className="budget-container">
      <h1>💰 Travel Budget Planner</h1>

      {/* Expense Input */}
      <div className="expense-input">
        <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Hotels">Hotels</option>
          <option value="Activities">Activities</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Enter Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button onClick={addExpense}>➕ Add Expense</button>
      </div>

      {/* Total Expenses */}
      <h2>Total: ${totalExpenses.toFixed(2)}</h2>

      {/* Expense List */}
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.category}: <strong>${expense.amount.toFixed(2)}</strong>
            <button onClick={() => deleteExpense(expense.id)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Pie Chart */}
      <div className="chart-container">
        {expenses.length > 0 ? <Pie data={expenseData} /> : <p>No expenses added yet.</p>}
      </div>
    </div>
  );
};

export default BudgetPlanner;
