import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./BudgetPlanner.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPlanner = () => {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [newExpense, setNewExpense] = useState({ category: "Food", amount: "" });
  const [exchangeRate, setExchangeRate] = useState({});
  const [currency, setCurrency] = useState("EUR"); // Default to EUR
  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

  // Fetch exchange rates from API
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/c809122a5dba954076481d29/latest/USD`)
      .then((response) => response.json())
      .then((data) => setExchangeRate(data.conversion_rates))
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (newExpense.amount.trim() !== "" && !isNaN(newExpense.amount)) {
      setExpenses([...expenses, { id: Date.now(), ...newExpense, amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ category: "Food", amount: "" });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpensesUSD = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const convertedAmount = exchangeRate[currency] ? (totalExpensesUSD * exchangeRate[currency]).toFixed(2) : "Loading...";

  // Prepare data for Pie Chart
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
          type="number"
          placeholder="Enter Amount (USD)"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button onClick={addExpense}>➕ Add Expense</button>
      </div>

      {/* Total Expenses */}
      <h2>Total: ${totalExpensesUSD.toFixed(2)} USD</h2>

      {/* Currency Converter */}
      <div className="currency-converter">
        <h3>Convert Budget to:</h3>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="EUR">Euro (EUR)</option>
          <option value="INR">Indian Rupee (INR)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
          <option value="AUD">Australian Dollar (AUD)</option>
        </select>
        <h3>Converted Amount: {convertedAmount} {currency}</h3>
      </div>

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
