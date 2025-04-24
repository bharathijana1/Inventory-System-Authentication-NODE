# 📦 Inventory Management System
Inventory management system built with **MongoDB**, **Express** and **Node.js**, featuring authentication and role-based access.

---

## 🚀 Features

### 🔐 Authentication
- 🔸 Admin login (with default credentials)
- 🔸 Customer registration and login
- 🔒 JWT-based authentication

### 🛒 Customer
- View all available products
- Buy a product (decrease quantity by 1)

### 🛠️ Admin
- Add new products
- Update product details
- Delete products
- View all products

---

## 🧰 Technologies Used

- **Backend**: Node.js, Express, MongoDB (with Mongoose)
- **Authentication**: JWT
- **Testing**: Postman

---

## 📦 Installation & Running the Project Locally

### 🔹 Prerequisites
- Node.js and npm installed
- MongoDB running locally or MongoDB Atlas URI

### 🔸 Clone the Repository

```bash
git clone https://github.com/bharathijana1/Inventory-System-Authentication-NODE.git
cd Inventory-System-Authentication-NODE
code .
cd backend
npm install
npm run dev
```

---

### 🔐 Setup Environment Variables

Create a `.env` file inside the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace with your actual MongoDB URI and secret key.

---

### 🔑 Default Admin Login

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

> Note: Admins must be created manually in MongoDB or through a protected route.

---

## 📩 API Endpoints Overview

### 🔸 Authentication
| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| POST   | /api/register | Register as customer |
| POST   | /api/login    | Login (any role)     |

### 🔸 Product Management
| Method | Endpoint                | Description                | Access   |
|--------|-------------------------|----------------------------|----------|
| GET    | /api/products           | Get all products           | Public   |
| POST   | /api/products           | Add product                | Admin    |
| PUT    | /api/products/:id       | Update product             | Admin    |
| DELETE | /api/products/:id       | Delete product             | Admin    |
| POST   | /api/products/:id/sell  | Buy product (reduce qty)   | Customer |

---

## 🧪 API Testing with Postman – With Examples
### 🔐 1. Register as Customer
#### : POST
#### URL: http://localhost:5000/auth/register
#### Body: (raw → JSON)
```
{
  "name": "customer11",
  "email": "customer11@gmail.com",
  "password": "customer11"
}
```
### 🔐 2. Login as Admin / Customer
#### Method: POST
#### URL: http://localhost:5000/auth/login
#### Body: (raw → JSON)
```
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```
📝 Replace with customer credentials if logging in as customer.
Response Example:
```
{
  "token": "your_jwt_token",
  "role": "admin"
}
```
✅ Use this token for all protected routes – set it in Authorization → Bearer Token

### 🛍️ 3. Add Product (Admin Only)
#### Method: POST
#### URL: http://localhost:5000/products
#### Body: (raw → JSON)
```
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "category": "Electronics",
  "price": 1200,
  "quantity": 5
}
```
🔐 Add Bearer Token in header (admin token)

### 📋 4. Get All Products
#### Method: GET
#### URL: http://localhost:5000/products

Response Example:
```
[
  {
    "_id": "661f1b4c3f276cd1e09361d2",
    "name": "Laptop",
    "description": "High-performance laptop",
    "category": "Electronics",
    "price": 1200,
    "quantity": 5
  },
  {
    "_id": "661f1b963f276cd1e09361d4",
    "name": "Phone",
    "description": "Smartphone",
    "category": "Electronics",
    "price": 800,
    "quantity": 10
  }
]
```
### ✏️ 5. Update Product (Admin Only)
#### Method: PUT
#### URL: http://localhost:5000/products/<product_id>
#### Body: (raw → JSON)
```
{
  "name": "Laptop Pro",
  "description": "Upgraded model",
  "category": "Electronics",
  "price": 1400,
  "quantity": 3
}
```
### ❌ 6. Delete Product (Admin Only)
#### Method: DELETE
#### URL: http://localhost:5000/products/<product_id>

Response Example:
```
{
  "message": "Product deleted successfully"
}
```
### 🛒 7. Buy Product (Customer Only)
#### Method: POST
#### URL: http://localhost:5000/products/<product_id>/buy

Response Example:
```
{
  "message": "Product purchased successfully",
  "remainingQuantity": 4
}
```







---

## 📌 Notes
- Customers register themselves via /api/register
- Admins are created manually or via protected routes
- Role-based route protection implemented

