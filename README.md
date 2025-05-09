# FundFlow – Microfinance Credit Scoring & Lending Portal

FundFlow is a full-stack web platform for managing microfinance loan applications. It enables customers to apply for loans, and admins to review them based on a smart scoring algorithm. The system supports role-based authentication, dynamic loan scoring, and an interactive dashboard.

---

## 🧱 Tech Stack

| Layer | Tech |
|------|------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Database | MongoDB |
| Auth | JWT (role-based) |
| API Test | Postman |
| Deployment | Docker (multi-container) |

---

## 📦 Features

### 👤 Authentication
- JWT-based login for Admin and Customer

### 🧑‍💼 Admin Panel
- Create, view, update, and delete customers
- View all loan applications with score, status
- Filter by loan status and score
- MongoDB logging of all loan requests

### 🧑‍💻 Customer Portal
- Submit loan applications
- View loan history and approval status

---

## 🚀 Local Development Setup (Manual)

### 1. Clone and install

```bash
git clone https://github.com/Nuraj250/fundflow-credit-portal.git
cd fundflow-credit-portal
````

### 2. Backend Setup

```bash
cd backend
cp .env.example .env      # or create .env with the content below
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
cp .env.example .env      # or create manually
npm install
npm run dev
```

---

## 🐳 Dockerized Setup (Recommended)

### Prerequisites

* Docker & Docker Compose installed

### One command to rule them all:

```bash
docker-compose up --build
```

### App runs at:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔐 .env Example

### `backend/.env`

```
MONGO_URI=mongodb://mongo:27017/fundflow
JWT_SECRET=supersecretjwtkey
PORT=5000
```

### `frontend/.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Postman Collection

You can test the full API set with this Postman collection:

👉 [Download Postman Collection](./fundflow_postman_collection.json)

---

## 🔌 API Endpoints

### Auth (`/api/auth`)

* `POST /register` → `{ email, password, role }`
* `POST /login` → `{ email, password }`

### Customers (admin-only, `/api/customers`)

* `GET /`
* `POST /`
* `PUT /:id`
* `DELETE /:id`

### Loans (`/api/loans`)

* `POST /` → Customer applies for loan
* `GET /` → Admin sees all loans

---

## 📁 Folder Structure

```
fundflow-credit-portal/
├── backend/         # Node.js API with Express + MongoDB
│   └── Dockerfile
├── frontend/        # React (Vite) + Tailwind UI
│   └── Dockerfile
├── docker-compose.yml
```

---

## 🧠 Credit Scoring Logic

Loan requests are scored out of 100 based on:

* EMI ≤ 40% of income
* ≤ 2 active loans
* Smaller amount = better
* Higher credit score boosts score

If score ≥ 70 → `Approved`, otherwise → `Rejected`.

---

## ✅ Bonus Features

* MongoDB logging of all loan requests
* Toast notifications
* Pagination & filters
* Admin customer editing modal
* Dockerized deployment

---

## 💬 Author & Contact

Built for technical interview assignment by \Nuraj
📧 \[[nurajshaminda200@gmail.com](mailto:nurajshaminda200@gmail.com)]

