📦 Inventory Management System (MERN Stack)

A full-stack Inventory Management System built using MongoDB, Express.js, React.js, and Node.js.
This application allows users to manage inventory efficiently with full CRUD functionality.

🚀 Features

🔐 Login Protected Dashboard

➕ Add New Items

✏️ Update Existing Items

❌ Delete Items

🔍 Search Items by Name

📉 Low Stock Indicator (Quantity < 10)

💾 MongoDB Database Integration

🔄 Real-time Data Refresh after CRUD operations

🛠️ Tech Stack
Frontend

React.js

Axios

React Router DOM

Bootstrap

Backend

Node.js

Express.js

MongoDB

Mongoose

CORS

dotenv

📂 Project Structure
inventory-management/
│
├── backend/
│   ├── models/
│   │   └── Item.js
│   ├── routes/
│   │   └── itemRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ Installation & Setup Guide :---

1️⃣ Clone the Repository
git clone https://github.com/prateekwithcode/InverntaryMS
cd inventory-management

2️⃣ Backend Setup
cd backend
npm install

Run Backend Server:
npm start

Backend will run on:

http://localhost:5000

3️⃣ Frontend Setup
Open new terminal:

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
📡 API Endpoints

Method	Endpoint	Description

GET	/api/items	Get all items
GET	/api/items?search=	Search items by name
POST	/api/items	Add new item
PUT	/api/items/:id	Update item
DELETE	/api/items/:id	Delete item

🧪 How It Works

User logs in (login state stored in localStorage)

Dashboard loads after authentication check

Items are fetched from backend using Axios

CRUD operations update MongoDB database

If quantity < 10 → item shows as Low Stock in red

🔐 Authentication (Basic)

Login state is stored using:

localStorage.setItem("isLoggedIn", "true");

Dashboard route is protected using React Router.

🧑‍💻 Author

prateek khatri

📜 License

This project is open-source and free to use for learning purposes.