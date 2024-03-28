Shopping Portal API
This repository contains the code for a RESTful API for managing products in a shopping portal. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on products stored in a MongoDB database.

Setup Instructions
Clone the repository to your local machine.
Install the required dependencies by running npm install.
Start the server by running npm run [ServerFile].
Make sure to set up your MongoDB connection details in the Connection.js file before running the application.

Endpoints

1. Save Product
   URL: /products
   Method: POST
   Description: Creates a new product and saves it to the database.

Request Body:

{
"title": "Product Title",
"description": "Product Description",
"status": "pending"
}

Response:{
"status": true
}

2. Fetch Products
   URL: /products
   Method: GET
   Description: Retrieves a list of products from the database.
   Query Parameters: Optional query parameters can be provided to filter the products.
   Response:[
   {
   "_id": 1,
   "title": "Product 1",
   "description": "Description of Product 1",
   "status": "pending",
   "createdAt": "2024-03-29T08:00:00.000Z",
   "updatedAt": "2024-03-29T08:00:00.000Z"
   },
   {
   "_id": 2,
   "title": "Product 2",
   "description": "Description of Product 2",
   "status": "completed",
   "createdAt": "2024-03-29T08:00:00.000Z",
   "updatedAt": "2024-03-29T08:00:00.000Z"
   }
   ]

3. Delete Product
   URL: /products/:id
   Method: DELETE
   Description: Deletes a product from the database based on the provided ID.
   Response:{
   "message": "Product deleted successfully"
   }

4. Update Product
   URL: /products/:id
   Method: PUT
   Description: Updates a product in the database based on the provided ID.
   Request Body:{
   "title": "Updated Product Title",
   "description": "Updated Product Description",
   "status": "completed"
   }
   Response:{
   "message": "Product updated successfully"
   }
