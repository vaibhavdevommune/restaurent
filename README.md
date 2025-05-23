# 🍽️ Restaurant CRM

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Laravel](https://img.shields.io/badge/Backend-Laravel-red?logo=laravel)](https://laravel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A responsive and modern CRM system designed for restaurant operations. Built using **React** for the frontend and **Laravel** for the backend, it offers a seamless interface to manage orders, customers, menu items, and sales reporting.

---

## 🔧 Features

- 🧾 **Dashboard**: Overview of sales, inventory, and orders
- 🛍️ **Order Management**: List and manage orders with status updates
- 🍽️ **Menu Management**: CRUD operations for restaurant menu
- 👤 **Customer Management**: View and track customer activity
- 📊 **Sales Reports**: Visual representation of sales and inventory

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | React, Tailwind CSS, React Router, React Icons |
| Backend     | Laravel (REST API), MySQL |
| Styling     | Tailwind CSS, DM Sans font |
| Icons       | React Icons (FontAwesome) |

---

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/vaibhavdevommune/restaurent.git
cd restaurant-crm

2. Frontend Setup (React)
npm install
npm run dev

3. Backend Setup (Laravel)
cd Backend
composer install
cp .env.example .env
php artisan key:generate
Update .env with your database configuration:

env
DB_DATABASE=restaurant_crm
DB_USERNAME=root
DB_PASSWORD=
Then migrate the database:

php artisan migrate
php artisan serve

Project Structure
restaurant-crm/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── Mainbar.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Menu.jsx
│   ├── OrderMenu.jsx
│   ├── CustomerMenu.jsx
│   └── SalesReport.jsx
├── App.jsx
├── main.jsx
├── tailwind.config.js
└── Backend/ (Laravel)