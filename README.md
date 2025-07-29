
# Random User CRUD App with Node.js, Express, MySQL and EJS

This is a simple CRUD (Create, Read, Update, Delete) web application built using:

* Node.js
* Express
* MySQL (via `mysql2` package)
* EJS as the templating engine
* Faker.js for generating dummy data (optional)
* Method-Override for supporting PATCH and DELETE in forms

---

## 🚀 Features

* ✅ View all users
* ✅ Add a new user
* ✅ Edit a user's username (password required)
* ✅ Delete a user
* ✅ View total user count on homepage

---

## 🗂 Folder Structure

```
project/
│
├── views/
│   ├── home.ejs
│   ├── showusers.ejs
│   ├── edit.ejs
│   └── newuser.ejs
│
├── index.js
└── package.json
```

---

## 📦 Installation

```bash
# Clone the repo or create your own project folder
cd your-project-folder

# Initialize node and install dependencies
npm init -y
npm install express mysql2 ejs method-override @faker-js/faker
```

---

## 🛠 Setup MySQL Database

1. Log into MySQL CLI:

```bash
mysql -u root -p
```

2. Create the database and table:

```sql
CREATE DATABASE myapP;
USE myapP;

CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);
```

---

## ▶️ Run the App

```bash
nodemon index.js
# OR
node index.js
```

Visit: `http://localhost:8080`

---

## 🔑 Routes Overview

| Method | Route             | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | `/`               | Show total user count           |
| GET    | `/user`           | List all users                  |
| GET    | `/users/new`      | Show form to add a user         |
| POST   | `/users`          | Add new user                    |
| GET    | `/users/:id/edit` | Show form to edit a user        |
| PATCH  | `/user/:id`       | Update username (with password) |
| DELETE | `/user/:id`       | Delete a user                   |

---

## 🧩 Dependencies Used

```json
"dependencies": {
  "express": "^4.x",
  "mysql2": "^3.x",
  "ejs": "^3.x",
  "method-override": "^3.x",
  "@faker-js/faker": "^8.x"
}
```

---

## ✍️ Author

Developed by **Sudarshan Herwade** — as part of Node.js + MySQL learning project.

---

## 🧠 Next Steps / Ideas

* Add flash messages (e.g., "User updated!")
* Add validation (required fields, email format)
* Add pagination to user list
* Use environment variables for DB config
* Add user authentication (Login/Register)

---
