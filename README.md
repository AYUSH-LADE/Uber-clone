# 🚗 Uber Clone

> A full-stack ride-booking platform inspired by Uber, built with **React, Node.js, Express, MongoDB & Socket.IO**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socket.io\&logoColor=white)](https://socket.io/)
[![Vite](https://img.shields.io/badge/Vite-Fast%20Build-646CFF?logo=vite\&logoColor=white)](https://vite.dev/)

---

## ✨ Overview

**Uber Clone** is a full-stack ride-booking application that recreates the core experience of a modern ride-hailing platform.

The application supports two major roles:

* 👤 **User** — searches for a destination, selects a vehicle, requests rides and tracks the ride.
* 🚘 **Captain** — receives ride requests, accepts rides and manages active trips.

The project focuses on **real-time communication, authentication, maps, ride management and responsive UI**.

---

## 🔥 Features

### 👤 User Experience

* 🔐 User registration & login
* 📍 Pickup and destination selection
* 🗺️ Location & map integration
* 🚗 Multiple vehicle options
* 🚕 Ride request system
* ⏳ Waiting for captain
* 📡 Real-time ride updates
* 🛰️ Live ride tracking
* 🔒 Protected user routes

### 🚘 Captain Experience

* 🔐 Captain registration & login
* 🚗 Vehicle information management
* 📥 Receive ride requests
* ✅ Accept / manage rides
* 📍 Live location tracking
* 🚦 Ride status management
* 🔒 Protected captain routes

### ⚡ Real-Time Features

Powered by **Socket.IO**:

* Real-time ride requests
* Captain availability communication
* Live ride updates
* Location updates
* User ↔ Captain communication

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Axios
* Google Maps API
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Express Validator
* Socket.IO
* Axios

---

## 🏗️ Architecture

```text
                 ┌───────────────────┐
                 │      React UI     │
                 │   Vite + Tailwind │
                 └─────────┬─────────┘
                           │
                     REST API / Socket
                           │
                 ┌─────────▼─────────┐
                 │   Express Server  │
                 │   Node.js Backend │
                 └───────┬─────┬─────┘
                         │     │
                ┌────────▼─┐ ┌─▼─────────┐
                │ MongoDB  │ │ Socket.IO │
                │ Database │ │ Real-Time  │
                └──────────┘ └────────────┘
                         │
                  ┌──────▼──────┐
                  │ Google Maps │
                  │   Services  │
                  └─────────────┘
```

---

## 📂 Project Structure

```text
Uber-Clone/
│
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── public/
│   ├── App.jsx
│   └── package.json
│
└── README.md
```

---


## 🔐 Authentication

The application uses **JWT-based authentication** to secure user and captain sessions.

Protected routes ensure that:

```text
User
  ↓
Login
  ↓
JWT Authentication
  ↓
Protected User Routes
```

and

```text
Captain
   ↓
Login
   ↓
JWT Authentication
   ↓
Protected Captain Routes
```

Passwords are securely handled using **bcrypt**.

---

## 🗺️ Maps & Location

The application integrates mapping functionality to support:

* 📍 Pickup locations
* 🏁 Destination selection
* 🛣️ Route information
* 📏 Distance calculation
* ⏱️ Estimated travel information
* 🚘 Live location tracking

---

## ⚡ Real-Time Communication

**Socket.IO** is used to provide real-time communication between users and captains.

Example flow:

```text
User requests ride
       ↓
Backend receives request
       ↓
Available captain notified
       ↓
Captain accepts ride
       ↓
User receives update
       ↓
Live ride tracking begins
```

---

## 🎯 What This Project Demonstrates

This project goes beyond basic CRUD operations and demonstrates practical full-stack concepts:

* REST API development
* Authentication & authorization
* Database design
* MVC architecture
* Middleware
* API validation
* Real-time WebSocket communication
* Geolocation
* Third-party API integration
* React state management
* Protected routes
* Frontend ↔ backend communication
* Component-based architecture

---



## 🔮 Future Improvements

* 💳 Online payment integration
* ⭐ Rating & review system
* 📜 Ride history
* 🔔 Push notifications
* 🧑‍💼 Admin dashboard
* 🚘 Captain availability system
* 📊 Ride analytics
* 🌙 Improved dark mode
* 📱 Progressive Web App support

---

## 👨‍💻 Author

**Ayush Lade**

Engineering Student | Learning Full-Stack Development | DSA Enthusiast

Building projects, learning systems and exploring modern web technologies.

---

## ⭐ Show Your Support

If you found this project interesting, consider giving it a ⭐ on GitHub!

> Built with code, curiosity, and a lot of debugging. 🚗💨
