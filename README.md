## 📊 FundFlow – Microfinance Credit Scoring & Lending Portal

A full-stack microfinance loan management and credit scoring system built with **Next.js**, **Node.js**, **MongoDB**, and **JWT-based authentication**. It enables users to apply for loans and allows admins to manage users, evaluate loans, and track creditworthiness via a scoring algorithm.

---

## ✅ Features Overview

### 🔐 Authentication

* JWT-based login and protected routes
* Role-based access: `admin` and `customer`
* Admins can create customer accounts which can be used to log in

### 👥 Customer Management (Admin Only)

* Create new customers (with randomized credit score)
* View all customers
* Edit/delete customer data

### 📝 Loan Application (Customer)

* Customers can submit multiple loan requests
* Inputs:

  ```json
  {
    "loanAmount": 200000,
    "durationMonths": 10,
    "purpose": "Business Expansion",
    "monthlyIncome": 30000,
    "existingLoans": 1
  }
  ```

### 📈 Smart Credit Scoring

* Score out of 100 based on:

  * EMI must not exceed 40% of income
  * Max 2 existing loans
  * Lower amounts preferred
  * Higher credit scores preferred
* Output:

  ```json
  {
    "score": 78,
    "status": "Approved",
    "recommendation": "Eligible for 10-month loan at 14% interest"
  }
  ```

### 📊 Dashboards

* **Admin Dashboard:**

  * View all customers and loans
  * Filter by score/status
  * Full CRUD functionality
* **Customer Dashboard:**

  * View submitted loans
  * Apply for new loan (status is `pending`)

### 🧾 Logging (Bonus)

* Every loan request and score is logged in MongoDB
* Log includes: customer ID, input, score, status, timestamp

---

## ⚙️ Tech Stack

| Layer    | Tech                     |
| -------- | ------------------------ |
| Frontend | Next.js, React, Tailwind |
| Backend  | Node.js, Express         |
| Auth     | JWT, Role-based          |
| Database | MongoDB                  |
| Logging  | MongoDB Collection       |
| Styling  | Tailwind CSS             |

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Nuraj250/fundflow-credit-portal.git
cd fundflow-credit-portal
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

* `.env` (example):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fundflow
JWT_SECRET=your_secret_key
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Sample JWT Tokens (for testing)

> Replace `your_token_here` with actual tokens from login.

| Role     | Example Token                     |
| -------- | --------------------------------- |
| Admin    | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| Customer | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |

---

## 📌 API Endpoints

### Auth

* `POST /api/auth/login`
* `POST /api/customers` (used by admin to create customer)

### Customer

* `GET /api/customers`
* `PUT /api/customers/:id`
* `DELETE /api/customers/:id`

### Loans

* `POST /api/loans` (admin/customer)
* `GET /api/loans`
* `PUT /api/loans/:id`
* `DELETE /api/loans/:id`

---

## 🧪 Bonus Modules Implemented

✅ MongoDB logging
✅ Responsive UI with Tailwind CSS
✅ Admin & Customer layouts with role-based dashboards
✅ Real-time credit scoring logic
🚧 Swagger API docs & PDF summary: *Not yet implemented*

---

## 📁 Folder Structure

```
fundflow-credit-portal/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── lib/
```

---

## 📸 UI Overview

* Glassmorphism UI for modals, forms, and dashboards
* Fully responsive (mobile + desktop)
* Admin panel with sidebar navigation
* Customer dashboard with loan summaries

---

## 📝 Assumptions

* Credit scores are generated randomly during customer creation
* All data is stored in MongoDB instead of MySQL (as allowed)
* No payment gateway or actual EMI tracking is implemented
* Customer login is enabled only after admin adds the user