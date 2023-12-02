# BackendChallengeZaapi

This is the backend API for an e-commerce platform built using Node.js, Express, and TypeScript.

## Postman Link - [Postman](https://www.postman.com/orbital-module-operator-35663687/workspace/backend-challenge-zaapi/collection/23709695-5c516556-6a9f-4918-8300-ce8fd720f245?action=share&creator=23709695)

## Getting Started
To get started with this project, follow these steps:

### Prerequisites
Make sure you have the following installed:
- Node.js (version >= 14)
- npm or yarn
## Installation
1. Clone the repository
   - `git clone https://github.com/yourusername/ecommerce-backend.git`
3. Navigate to the project directory
   - `cd ecommerce-backend`
5. Install dependencies:
   - `npm install` or `yarn install`
7. Set up environment variables:
   - Create a `.env` file based on `.env.example` and set the necessary environment variables.

## Running the server 
to start the server, run:
- `npm start` or `yarn start`

## Development Mode 
For development purposes, you can run the server in watch mode using:
- `npm run dev` or `yarn dev`
This will enable hot reloading using `nodemon` and allow you to see changes without restarting the server manually.

## API Endpoints
The following endpoints are available:
### User Endpoints
- `POST /api/signup` : Creates a user.
- `POST /api/login` : Login a user.
- `POST /api/logout` : Logs out the user,
### Admin Endpoints  
- `POST /api/admin-signup` : Creates a user.
- `POST /api/admin-login` : Login a user.
- `POST /api/admin-logout` : Logs out the user,
- `PUT /api/authorise-seller` : Authorises a user to be a seller.
### Cart Endpoints
- `POST /api/addtocart` : Adds a specific product to the cart of the user.
- `GET /api/get-items` : Retrieves the products in the user cart.
- `DELETE /api/delete-product` : Deletes a specific product from the cart.
- `DELETE /api/empty-cart` : Empties the cart of the user.
### Order Endpoints
- `POST /api/order` : Creates an order using the cart of the user.
- `PUT /api/cancel-order` : Cancels the existing order of the user using orderId.
### Product Endpoints.
- `POST /api/create-product` : Creates a product to sell .
## Payment Settled
Every day at `23:00` a cron service runs which checks all orders for cancelled and then settles payment to the seller.
## Folder Structure
- `src/` - Contains the source code.
  - `controllers/` - Controllers handling the API Logic.
  - `models/` - Data models and database schemas.
  - `routes/` - API routes.
  - `middleware/` - Contains the Authorisation & Authentication Logic.
  - `services/` - Contains the functions directly communicating with the server.
  - `utility/` - Contains the utility functions.
  - `db/` - Contains the logic to connect to the `mongodb` database.
- `dist/` - Compiled Typescript files (generated onbuild).

## Technologies Used
- Node.js
- Express.js
- TypeScript
