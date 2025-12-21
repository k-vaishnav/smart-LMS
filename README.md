⭐ If you find this project helpful, please give it a star!

# Smart LMS – MERN Stack Learning Management System 🚀

[![GitHub stars](https://img.shields.io/github/stars/k-vaishnav/Smart-LMS?style=social)](https://github.com/k-vaishnav/Smart-LMS/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/k-vaishnav/Smart-LMS?style=social)](https://github.com/k-vaishnav/Smart-LMS/network)
[![GitHub issues](https://img.shields.io/github/issues/k-vaishnav/Smart-LMS)](https://github.com/k-vaishnav/Smart-LMS/issues)
[![License](https://img.shields.io/github/license/k-vaishnav/Smart-LMS)](https://github.com/k-vaishnav/Smart-LMS/blob/main/LICENSE)


A **full-stack Learning Management System (LMS)** built using the **MERN stack** with authentication, payments, course management, user profiles, smart course recommendations and a clean modern UI.

🔗 Live Demo: (Coming Soon)  
📦 Tech Stack: MongoDB, Express.js, React, Node.js

---

## 🔥 Key Features

### 👤 Authentication & Security
- User registration & login using **JWT authentication**
- Protected routes with role-based access
- Password hashing using **bcrypt**
- Secure environment variable handling

### 📚 Course Management
- Browse, filter, and search courses
- Category-based organization
- Course detail pages with enrollment logic
- Popular courses ranking (based on enrollments)

### 🛒 Cart & Orders
- Add/remove courses from cart
- Order creation and history
- Persistent cart using MongoDB

### 💳 Payments
- **Stripe Payment Gateway** integration
- Secure checkout flow
- Order confirmation after successful payment

### 🤖 Smart Recommendations (AI-Inspired)
- Course recommendations based on user’s previous enrollments
- Popular course suggestions for all users
- Rule-based recommendation system simulating AI-driven personalization


### 🎨 Frontend Experience
- Responsive UI using **React + Bootstrap**
- Skeleton loaders for better UX
- Protected pages using custom PrivateRoute
- Clean component-based architecture

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Bootstrap
- Context API

**Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Stripe API

**Dev Tools**
- Git & GitHub
- REST APIs
- Thunder Client

---

## 📂 Project Structure

Smart-LMS/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
| |__ uploads/
│ └── app.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ └── services/
│ └── main.jsx

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/k-vaishnav/Smart-LMS.git
```
## 2️⃣ Backend Setup
cd backend
npm install
npm run start:dev

# Create a .env file:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key

## 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

## 📸 Screenshots
*(Add UI screenshots here)*

## 📌 Resume Highlights

- Built a full-stack **Learning Management System (LMS)** using **MongoDB, Express.js, React, and Node.js**
- Implemented **JWT authentication**, role-based access, and protected routes
- Integrated **Stripe payment gateway** for secure course purchases
- Designed **RESTful APIs** for courses, users, cart, and orders
- Designed a rule-based recommendation engine simulating AI-driven personalization using user enrollment data
- Improved UX using **skeleton loaders** and responsive UI
- Application structured and configured for deployment (environment variables, production-ready builds)
- Followed scalable backend architecture with separation of concerns (controllers, services, middleware)


## 🚀 Future Enhancements
- AI-based recommendations using ML or LLM APIs
- Instructor dashboard for course creation
- Admin analytics panel
- Video streaming optimization using CDN


## 🤝 Contributing

Pull requests are welcome!
If you like this project, consider giving it a ⭐

## 📄 License

MIT License
