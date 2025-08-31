# 🏫 School Management App

## 📌 Summary

This project is a **mini full-stack web application** built as part of a Web Development assignment.  
It demonstrates form handling, database integration, and responsive UI design.

The application has **two main pages**:

1. **Add School Page** – Form to input and store school data.
2. **Show Schools Page** – Displays the list of schools in a card-style layout (like an e-commerce product grid).

---

## ⚙️ Tech Stack

- **Frontend:** React.js, TailwindCSS, React Router DOM, React Hook Form, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL

---

## 🗄️ Database Schema

Table: **`schools`**

| Column   | Type                              | Description            |
| -------- | --------------------------------- | ---------------------- |
| id       | INT (AUTO_INCREMENT, PRIMARY KEY) | Unique identifier      |
| name     | TEXT                              | School name            |
| address  | TEXT                              | Full address           |
| city     | TEXT                              | City name              |
| state    | TEXT                              | State name             |
| contact  | BIGINT / NUMBER                   | Contact number         |
| image    | TEXT                              | Path to uploaded image |
| email_id | TEXT                              | Email address          |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MySQL

### 📥 Installation

```bash
# Clone repo
git clone https://github.com/whogoodluck/School-Management-System.git
cd School-Management-System

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```
