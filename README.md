# 🛍️ TradeShift

**TradeShift** is a modern and responsive e-commerce web platform designed to provide a seamless online shopping experience.  
It allows users to explore products, view detailed information, manage their accounts, and make purchases efficiently.


![TradeShift Screenshot](https://github.com/rimi-1234/react-trade-shift-client/blob/main/src/assets/Screenshot%20(11).png)



🌐 **Live Site URL:** https://rimi-trade-shift-1234.netlify.app/

🌐 **GitHub Repository (Client):**  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Client-black?style=for-the-badge)](https://github.com/rimi-1234/react-trade-shift-client)

🌐 **GitHub Repository (Server):**  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Server-darkgreen?style=for-the-badge)](https://github.com/rimi-1234/react-trade-shift-server)

---

## ✨ Key Features


- **One-Click Import (My Imports)**  
  Import any product into your personal *My Imports* with a single click — quantity validation prevents over-importing and available stock updates automatically.

- **Full Export Management (My Exports)**  
  Add, update, and delete export products from the UI. Updates are persisted instantly and reflect across the site (create/edit/delete with prefilled modal forms).

- **Real-time UX & Secure Authentication**  
  Responsive, polished UI with secure user authentication (email/password + Google). Logged-in users stay on private routes after reload; no forced redirects. Dynamic page titles update per route.

- **Search, Filters & Pagination**  
  Robust search on *All Products* by name. Latest products are shown on the home page (6 newest, sorted by `createdAt: -1`).

- **Dark / Light Mode + Accessibility**  
  User togglable theme (dark/light) persisted to `localStorage`, with accessible contrast, keyboard nav, and consistent headings/buttons across pages.


---

## ⚙️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, Framer Motion, DaisyUI  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Firebase Authentication  
- **Hosting:** Vercel (Client) & Render (Server)

---



⚙️ Installation & Setup
📌 Clone the Repository (Client)
git clone https://github.com/rimi-1234/react-trade-shift-client.git

📌 Clone the Repository (Server)
git clone https://github.com/rimi-1234/react-trade-shift-server.git

🛠️ Client Setup

📁 Go to the client directory:

cd react-trade-shift-client


📦 Install dependencies:

npm install


▶️ Run the project:

npm run dev


🌍 Open in your browser:

http://localhost:5173/

🛠️ Server Setup

📁 Go to the server directory:

cd react-trade-shift-server


📦 Install dependencies:

npm install


🔑 Create a .env file and add your variables:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000


▶️ Run the server:

npm start


🌍 Server will run here:

http://localhost:3000/
