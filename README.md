# CyberHaven
CyberHaven offer an extensive solution to meet the unique needs of Gamers by providing catalogue featuring the latest gaming controllers, keyboards, mouse, laptops, CPUs, GPUs and much more...

use ```credentials: "include"``` in your fetch requests to include the token/cookie for authentication and to access user/admin only routes on server side

figma link for design boards
https://www.figma.com/file/zJF6mBnLckuvN0m0Ni5JY9/Untitled?type=design&node-id=0%3A1&mode=design&t=HfdBdhZzTBiOQbe1-1



### API Documentation

---

#### Get All Admin
- **URL:** `/all-admin`
- **Method:** `GET`
- **Description:** Retrieves all admin records from the database.
- **Response:**
  - `200 OK`: Returns an array of admin records.
  - `500 Internal Server Error`: Indicates an error while retrieving data from the database.

---

#### Create Admin
- **URL:** `/create-admin`
- **Method:** `GET`
- **Description:** Creates a new admin record in the database.
- **Response:**
  - `200 OK`: Indicates successful creation of the admin record.
  - `500 Internal Server Error`: Indicates an error while creating the admin record.

---

#### Get All Customers
- **URL:** `/customer/all`
- **Method:** `GET`
- **Description:** Retrieves all customer records from the database.
- **Headers:** `Authorization` (JWT Token)
- **Response:**
  - `200 OK`: Returns an array of customer records.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while retrieving data from the database.

---

#### Create Customer
- **URL:** `/create-customer`
- **Method:** `POST`
- **Description:** Creates a new customer record in the database.
- **Request Body:** JSON object containing customer details (name, email, password, phoneNumber, address).
- **Response:**
  - `200 OK`: Indicates successful creation of the customer record.
  - `400 Bad Request`: Indicates invalid request parameters.
  - `500 Internal Server Error`: Indicates an error while creating the customer record.

---

#### Admin Login
- **URL:** `/admin-login`
- **Method:** `POST`
- **Description:** Generates a JWT token for admin authentication.
- **Request Body:** JSON object containing admin email and password.
- **Response:**
  - `200 OK`: Returns a JWT token upon successful login.
  - `401 Unauthorized`: Indicates invalid credentials.
  - `500 Internal Server Error`: Indicates an error during authentication.

---

#### Customer Login
- **URL:** `/customer-login`
- **Method:** `POST`
- **Description:** Generates a JWT token for customer authentication.
- **Request Body:** JSON object containing customer email and password.
- **Response:**
  - `200 OK`: Returns a JWT token upon successful login.
  - `401 Unauthorized`: Indicates invalid credentials.
  - `500 Internal Server Error`: Indicates an error during authentication.

---

#### Delete Customer
- **URL:** `/customer`
- **Method:** `DELETE`
- **Description:** Deletes a customer record from the database.
- **Headers:** `Authorization` (JWT Token)
- **Request Body:** JSON object containing customer email.
- **Response:**
  - `200 OK`: Indicates successful deletion of the customer record.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while deleting the customer record.

---

#### Update Customer
- **URL:** `/customer`
- **Method:** `PUT`
- **Description:** Updates a customer record in the database.
- **Headers:** `Authorization` (JWT Token)
- **Request Body:** JSON object containing customer email and updated user details.
- **Response:**
  - `200 OK`: Indicates successful update of the customer record.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while updating the customer record.

---

#### Add Product to Cart
- **URL:** `/cart`
- **Method:** `PUT`
- **Description:** Adds a product to the user's cart.
- **Headers:** `Authorization` (JWT Token)
- **Request Body:** JSON object containing user_id, product_id, and optional quantity.
- **Response:**
  - `200 OK`: Indicates successful addition of the product to the cart.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while adding the product to the cart.

---

#### Get All Products
- **URL:** `/product/all`
- **Method:** `GET`
- **Description:** Retrieves all product records from the database.
- **Response:**
  - `200 OK`: Returns an array of product records.
  - `500 Internal Server Error`: Indicates an error while retrieving data from the database.

---

#### Protected Route
- **URL:** `/protected`
- **Method:** `GET`
- **Description:** Returns user information for authenticated users.
- **Headers:** `Authorization` (JWT Token)
- **Response:**
  - `200 OK`: Returns user information.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while processing the request.

---

### Get Product by ID
- **URL:** `/product/:id`
- **Method:** `GET`
- **Description:** Retrieves a product record from the database by its ID.
- **Parameters:**
  - `id` (URL parameter): The unique identifier of the product.
- **Headers:** `Authorization` (JWT Token)
- **Response:**
  - `200 OK`: Returns the product data.
  - `404 Not Found`: Indicates that the product with the specified ID was not found.
  - `500 Internal Server Error`: Indicates an error while fetching the product from the database.

---

### Update Product
- **URL:** `/product/:id`
- **Method:** `PUT`
- **Description:** Updates a product record in the database.
- **Parameters:**
  - `id` (URL parameter): The unique identifier of the product to be updated.
- **Headers:** `Authorization` (JWT Token)
- **Request Body:** JSON object containing the fields to be updated.
- **Response:**
  - `200 OK`: Returns the updated product data.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while updating the product.

---

### Add New Product
- **URL:** `/product`
- **Method:** `POST`
- **Description:** Adds a new product record to the database.
- **Headers:** `Authorization` (JWT Token)
- **Request Body:** JSON object containing the details of the new product.
- **Response:**
  - `201 Created`: Returns the newly created product data.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while adding the new product.

---

### Delete Product
- **URL:** `/product/:id`
- **Method:** `DELETE`
- **Description:** Deletes a product record from the database.
- **Parameters:**
  - `id` (URL parameter): The unique identifier of the product to be deleted.
- **Headers:** `Authorization` (JWT Token)
- **Response:**
  - `200 OK`: Returns the deleted product data.
  - `401 Unauthorized`: Indicates unauthorized access.
  - `500 Internal Server Error`: Indicates an error while deleting the product.


### Note:
- All API endpoints require JWT token-based authentication using the `Authorization` header.
- The server is running on port 3001.
- Any
