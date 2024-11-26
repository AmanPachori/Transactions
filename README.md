# Transaction

![image](https://github.com/user-attachments/assets/5944e83e-16f1-4216-a081-9d83bf8f94a1)
![image](https://github.com/user-attachments/assets/16f1c7dd-06db-4173-ae84-eac58ff8e986)

<br/>

## Tech Stack

- **Frontend:** [Next.js,Tailwind Css]
- **Backend:** [Node.js, Express.js]
- **Database:** [MongoDB]
- **Other Tools:** [Docker]

## Set Up

**Clone the repository:**

```bash
git clone https://github.com/AmanPachori/Transactions
cd Transactions
## For Backend
cd Backend
## For Frontend
cd Frontend

```

**create env file**
**_ for Backend _**

- .env file

```bash
MONGODB_URL = mongodb url
JWT_SECRET_KEY = secret key
JWT_EXPIRY = expires time
```

**_ for frontend _**

- .env.local file

```bash
NEXT_PUBLIC_BACKEND_BASE_URL = backend url
```

**Install Depaendcies in both**

```bash
npm install
```

**Docker Setup**

- Than in root folder run `docker compose up`

**Otherwisie without Docker**

In Backend folder run

```bash
 npm install
 npm build
 npm start
```

-It will run on `http://localhost:8000`
In frontend folder run

```bash
 npm install
 npm run dev
```

-It will run on `http://localhost:3000`

## Backend

### EndPoints

### POST /create - Create a New Transaction

- **Description:** This endpoint allows you to create a new transaction by providing necessary details like type, amount, and description.
- **Request:**
  - You need to send the following information in the request body:
    - **type**: The type of the transaction (e.g., "credit" or "debit").
    - **amount**: The amount involved in the transaction.
    - **description**: A brief description of the transaction.
  - **Authentication**: This request requires authentication (use a valid token).
- **Response:**
  - **200 OK (Success)**: Transaction successfully created. You'll receive a message and the details of the transaction.
  - **401 Unauthorized**: You are not authorized. This happens if the token is missing or invalid.
  - **404 Not Found**: The user was not found in the system.
  - **500 Internal Server Error**: Something went wrong on the server.

---

### GET /get/:id - Fetch Transaction by ID

- **Description:** This endpoint allows you to fetch a transaction by its ID.
- **Request:**

  - Send the **transaction ID** in the URL (e.g., `/get/123`).
  - **Authentication**: This request requires authentication (use a valid token).

- **Response:**
  - **200 OK (Success)**: You will get the transaction details.
  - **401 Unauthorized**: You are not authorized to access this transaction.
  - **404 Not Found**: The transaction could not be found.
  - **500 Internal Server Error**: An error occurred on the server.

---

### GET /search - Search Transactions

- **Description:** This endpoint allows you to search for transactions based on filters like user name, amount, date, etc.
- **Request:**

  - You can search using these parameters:
    - `userName`: The name of the user
    - `userId`: The ID of the user
    - `transactionId`: The ID of the transaction
    - `amount`: The amount of the transaction
    - `startDate`: The start date for the search
    - `endDate`: The end date for the search
    - `description`: A description of the transaction
    - `page`: The page number for pagination
    - `limit`: The number of transactions per page

- **Response:**
  - **200 OK (Success)**: A list of transactions matching your search will be returned.
  - **404 Not Found**: No transactions found matching your search.
  - **500 Internal Server Error**: An error occurred on the server.

---

### GET /generatereport - Generate Transaction Report

- **Description:** This endpoint generates a report of transactions based on the specified date range and amount.
- **Request:**

  - Use the following optional query parameters:
    - `startDate`: The start date for the report.
    - `endDate`: The end date for the report.
    - `amount`: A specific amount to filter the transactions.
    - **_Here I have used algorithm which return us the subset which is closest or equal to the amount provided_**

- **Response:**
  - **200 OK (Success)**: The report is generated successfully and includes the transaction details.
  - **500 Internal Server Error**: An error occurred while generating the report.

---

### POST /signup - Register a New User

- **Description:** This endpoint allows you to register a new user by providing their name, email, and password.
- **Request:**

  - Send the following information in the request body:
    - **name**: The name of the user.
    - **email**: The user's email.
    - **password**: The user's password.

- **Response:**
  - **201 Created (Success)**: The user was successfully registered. You will get a message and the user's details.
  - **400 Bad Request**: The email is already registered.
  - **500 Internal Server Error**: An error occurred during registration.

---

### POST /signin - User Login

- **Description:** This endpoint allows a user to log in using their email and password.
- **Request:**
  - Send the following information in the request body:
    - **email**: The user's email.
    - **password**: The user's password.
- **Response:**
  - **200 OK (Success)**: The user is successfully logged in. A token and user details are returned.
  - **400 Bad Request**: Invalid credentials (email or password is incorrect).
  - **500 Internal Server Error**: An error occurred while logging in.

---

### POST /start - Start the Cron Job

- **Description:** Starts the cron job to perform scheduled tasks.
- **Request:**

  - No body required.

- **Response:**
  - **200 OK (Success)**: The cron job was started successfully.
  - **500 Internal Server Error**: An error occurred while starting the cron job.

---

### POST /stop - Stop the Cron Job

- **Description:** Stops the running cron job.
- **Request:**

  - No body required.

- **Response:**
  - **200 OK (Success)**: The cron job was stopped successfully.
  - **500 Internal Server Error**: An error occurred while stopping the cron job.

---
