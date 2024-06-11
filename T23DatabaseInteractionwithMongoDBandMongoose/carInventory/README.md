# T23 Database Interaction with MongoDB and Mongoose <!-- omit in toc -->

## Practical Task 2: Car Inventory <!-- omit in toc -->

### Description

This coding task involves creating a car inventory management system using MongoDB and Mongoose. The primary goal is to demonstrate the ability to perform CRUD operations on a NoSQL database. Understanding database interactions is crucial for backend development and essential for building scalable applications.
The backend is using Express and the frontend is using React.

- This application should allow one to:
  - Add a car to the cars collection.
  - Update information about a single car.
  - Update information about more than one car.
  - Delete a specific document.
  - List all the information for all cars in your database.
  - List the model, make, registration number, and current owner for all
    cars older than five years.

### Contents <!-- omit in toc -->

- [Description](#description)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps to Install](#steps-to-install)
- [Usage](#usage)
  - [Starting the Backend Server](#starting-the-backend-server)
  - [Starting the Frontend Development Server](#starting-the-frontend-development-server)
  - [Using the Application](#using-the-application)
- [Credits](#credits)
- [Notes](#notes)

### Installation

#### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later recommended)

To run this project locally, you need the following installed:

- Node.js
- React.js
- Express.js
- Mongoose

#### Steps to Install

1. **Clone the repository:**

   ```sh
   git clone https://github.com/NodokaHirata/codingTasks.git

   ```

2. **Navigate to the project directory:**

   ```sh
   cd codingTasks/T23DatabaseInteractionwithMongoDBandMongoose

   ```

3. **Install dependencies for frontend and backend:**

   ```sh
   cd carInventory/frontend
   npm install
   cd ../backend
   npm install
   ```

4. **Configure Environment Variables:**
    Create .env files in the frontend and backend directories and add the following:

    frontend/.env

    ```sh
    REACT_APP_API_URL=http://localhost:1234/carInventoryApi
    ```

    backend/.env

    ```sh
    PORT=1234
    MONGODB_URI=your_mongodb_atlas_connection_string
    ```

    Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string.

### Usage

#### Starting the Backend Server

1. **Development Mode with Auto-Restart:**

    ```sh
    cd backend
    npm run dev
    ```

    This uses `nodemon` to automatically restart the server when file changes are detected.

2. **Production Mode:**

    ```sh
    cd backend
    npm start
    ```

#### Starting the Frontend Development Server

1. **Development Mode with Hot Reloading:**

    ```sh
    cd frontend
    npm start
    ```

    This starts the React development server with hot reloading enabled by default.

2. **Open your web browser and navigate to `http://localhost:3000`.**

#### Using the Application

1. **Landing Page**

<img width="995" alt="Landing_page" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/bbc0de09-89d8-495a-8f6a-f960228139c6">

2. **Add cars**

<img width="955" alt="Add" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/bf25fe9e-749e-4ed0-8932-7253e1885f20">


3. **Edit single car**
   
<img width="1029" alt="SingleEdit" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/9824f218-966b-4235-aa76-c67aee6e0e93">


4. **Edit multiple cars**

<img width="1049" alt="MultipleEdit" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/bdce2e2a-8570-4e82-ae7d-d8e774494527">

5. **Find cars older than 5 years**

<img width="988" alt="Oldercars02" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/cc0e1f25-a71a-4431-a750-136747186a6d">

6. **Delete a car**

<img width="1011" alt="delete" src="https://github.com/NodokaHirata/codingTasks/assets/101855937/a7651c50-22fc-46cf-a8bd-4aa3c94ccd3f">


### Credits

This project was developed by Nodoka Hirata Matthews.

### Notes

- This project uses MongoDB Atlas for the database, so there is no need to install MongoDB locally. The connection to MongoDB Atlas is managed through Mongoose.
- Make sure to replace the `MONGODB_URI` in `backend/.env` with your actual MongoDB Atlas connection string.
- - The default backend server runs on port 1234. You can change this by modifying the `PORT` variable in `backend/.env`.
