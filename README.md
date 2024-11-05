# OwlSwap

OwlSwap is a marketplace platform for Temple students to buy and sell items securely within a trusted, student-only community. 
Users can list items, browse posts, and chat with sellers, with future plans to add an auction feature.

## Features

- **Account Registration**: Only students can register, ensuring a secure community.
- **Item Listings**: Sellers can post items with descriptions, prices, and photos.
- **Chat Feature**: Allows buyers and sellers to communicate directly without sharing personal contact details.
- **Filtering Options**: Browse by category, price, and condition. Save items to a Wishlist.

## Tech Stack

- **Frontend**: React.js with Bootstrap
- **Backend**: Java Spring Boot
- **Database**: MySQL

## Setup

### Requirements

- MySQL Server & MySQL Workbench
- Java JDK 21.0.1, Apache Maven 3.9.9
- Node.js v18.20.4

### Installation

1. **Database**: 
   - Open MySQL Workbench, connect to the server, and create a database named `owlswap`.

2. **Backend**:
   - Go to `backend/`, update `application.properties` with your MySQL details, then run:
     ```bash
     mvn spring-boot:run
     ```

3. **Frontend**:
   - Go to `frontend/`, install dependencies, and start:
     ```bash
     npm install
     npm start
     ```

   Access the app at `http://localhost:3000`.

## Future Plans

- **Auction Feature**: Allow buyers to propose new prices and negotiate with sellers.


