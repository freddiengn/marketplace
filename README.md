

# OwlSwap

**OwlSwap** is a secure marketplace platform designed specifically for Temple students to buy and sell items within a trusted, student-only community. Users can list items, browse posts, and chat with sellers. Future updates will include an auction feature for enhanced interaction.

---

## Features

- **Account Registration**: Only Temple students can register, ensuring a secure, trusted community.
- **Item Listings**: Sellers can post items with descriptions, prices, and photos.
- **Chat Feature**: Enables buyers and sellers to communicate directly without sharing personal contact details.
- **Filtering Options**: Browse by category, price, and condition. Save items to a Wishlist.

---

## Tech Stack

- **Frontend**: React.js with Ant Design
- **Backend**: Java Spring Boot
- **Database**: MySQL

---

## Setup

### Requirements

Before you begin, make sure you have the following installed:

- **MySQL Server** & **MySQL Workbench**  
- **Java JDK 21.0.1**  
- **Apache Maven 3.9.9**  
- **Node.js v18.20.4**

---

### Installation Steps

#### 1. Set Up the Database

- Open **MySQL Workbench** and connect to your MySQL server.
- Create a new database named `owlswap` for the project.

#### 2. Configure the Backend

Before running the backend, ensure your MySQL connection settings are correctly configured:

- Navigate to `backend/src/main/resources/application.properties`.
- Update the following configuration to match your local MySQL setup:
  - **Modify the username and password** to your local MySQL credentials.
  - **Ensure the localhost and port (default: 3306)** are correct, especially if your setup differs.

Once the configuration is updated, you can run the backend:

- Navigate to `backend/src/main/java/com/example/backend/BackendApplication.java`.
- Click **"Run"** in your IDE (e.g., IntelliJ IDEA or Eclipse) to start the backend server on port **8080**. No need to run Maven commands manually.


3. **Frontend**:
   - Go to `frontend/`, install dependencies, and start:
     ```bash
     npm install
     npm start
     ```

   Access the app at `http://localhost:3000`.

## Future Plans

- **Auction Feature**: Allow buyers to propose new prices and negotiate with sellers.


