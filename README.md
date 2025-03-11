📌 Personal Travel Companion
🚀 A React-based web application designed to assist travelers in organizing trips efficiently. The app features trip planning, packing lists, document storage, and a photo gallery with folder organization.


📖 Features
🗺️ Trip Management: Add, edit, and delete trips.
🎒 Packing List: Keep track of travel essentials.
📸 Photos of Trip: Organize and manage trip memories.
📂 Documents Storage: Securely store important travel documents (password-protected).
💰 Budget Planner: Manage and track travel expenses.
🔄 Local Storage Support: Saves data locally on the browser.
📱 Fully Responsive: Works on mobile and desktop.
🛠️ Technologies Used
React.js (Vite)
React Router DOM
CSS (Custom Styling)
Local Storage for Data Persistence
GitHub Pages for Deployment
📂 Folder Structure

📦 Personal-Travel-Companion
│── 📂 src
│   ├── 📂 assets (Images & background)
│   ├── 📂 components (Reusable UI Components)
│   ├── 📂 pages (Dashboard, Add Trip, Photos, Documents, etc.)
│   ├── 📜 App.jsx
│   ├── 📜 index.jsx
│   ├── 📜 styles.css
│── 📜 .gitignore
│── 📜 vite.config.js
│── 📜 README.md
│── 📜 package.json
│── 📜 package-lock.json
🚀 Installation & Setup
1️⃣ Clone the Repository


git clone https://github.com/V-Security-beep/PERSONAL-TRAVEL_companion.git
cd PERSONAL-TRAVEL_companion
2️⃣ Install Dependencies


npm install
3️⃣ Run Locally


npm run dev
🔗 Visit: http://localhost:5173

📤 Deployment (GitHub Pages)
Steps to deploy the project on GitHub Pages:

Update vite.config.js (Set the base URL to match GitHub repository)

export default defineConfig({
  plugins: [react()],
  base: '/PERSONAL-TRAVEL_companion/', 
});
Build and Deploy

npm run build
npm run deploy
📌 Live Project: View on GitHub Pages

🔐 Security & Privacy
Document Page: Password-protected (12345)
Local Storage: Saves user data but does not share externally.
🚀 Future Enhancements
✅ AI Travel Chatbot (OpenAI API integration)
✅ Cloud Storage for Documents
✅ Weather & Flight API Integration
✅ User Authentication (Firebase/Auth0)

📩 Contributing
Want to improve this project? Follow these steps:

Fork the repository.
Create a branch (feature-branch).
Commit your changes (git commit -m "Added new feature").
Push to GitHub and create a Pull Request.
📞 Contact
👩‍💻 Developer: Vanshika
📧 Email: bongade.vanshika@gmail.com


