# CyberHaven
CyberHaven offer an extensive solution to meet the unique needs of Gamers by providing catalogue featuring the latest gaming controllers, keyboards, mouse, laptops, CPUs, GPUs and much more...

use ```credentials: "include"``` in your fetch requests to include the token/cookie for authentication and to access user/admin only routes on server side

figma link for design boards
https://www.figma.com/file/zJF6mBnLckuvN0m0Ni5JY9/Untitled?type=design&node-id=0%3A1&mode=design&t=HfdBdhZzTBiOQbe1-1



### API Documentation

---

<details>

  <summary>Admin APIs</summary>
  
  <details>
    <summary>Create a New Admin</summary>
    <p>This API creates a new admin.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /admin</p>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Admin Created."
}</pre>
  </details>

  <details>
    <summary>Get All Admins</summary>
    <p>This API retrieves all admins.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /admin/all</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for admin authentication.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>
    {
      "data": [
        {
          "_id": "607a12c115d47a0017d83262",
          "name": "admin1",
          "password": "admin123",
          "email": "admin@example.com",
          "__v": 0
        },
        ...
      ]
    }
    </pre>
  </details>
</details>
<details>
  <summary>Authentication APIs</summary>
  
  <details>
    <summary>Admin Login</summary>
    <p>This API allows admin users to log in.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /auth/admin</p>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>email</code> (string): The email of the admin.</li>
      <li><code>password</code> (string): The password of the admin.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Login successful",
    "userData": {
        "isAuthenticated": true,
        "user": {
            "isAdmin": true,
            "name": "John Doe",
            "email": "admin@example.com",
            "userId": "607a12c115d47a0017d83262"
        }
    }
}</pre>
  </details>

  <details>
    <summary>Customer Login</summary>
    <p>This API allows customer users to log in.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /auth/customer</p>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>email</code> (string): The email of the customer.</li>
      <li><code>password</code> (string): The password of the customer.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Login successful",
    "userData": {
        "isAuthenticated": true,
        "user": {
            "isAdmin": false,
            "name": "Jane Doe",
            "email": "customer@example.com",
            "userId": "607a12c115d47a0017d83263"
        }
    }
}</pre>
  </details>

  <details>
    <summary>Get Session Status</summary>
    <p>This API checks the session status of the user.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /auth/session-status</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "isAuthenticated": true,
    "user": {
        "isAdmin": true,
        "name": "John Doe",
        "email": "admin@example.com",
        "userId": "607a12c115d47a0017d83262"
    }
}</pre>
  </details>

  <details>
    <summary>Logout</summary>
    <p>This API allows the user to log out.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /auth/logout</p>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Logged out"
}</pre>
  </details>
</details>
<details>
  <summary>Cart APIs</summary>
  
  <details>
    <summary>Get Cart</summary>
    <p>This API retrieves the cart of the user.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /cart</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": {
        "_id": "607a12c115d47a0017d83262",
        "userId": "607a12c115d47a0017d83262",
        "items": {
            "productId1": 2,
            "productId2": 1
        },
        "__v": 0
    }
}</pre>
  </details>

  <details>
    <summary>Update Cart</summary>
    <p>This API updates the quantity of a product in the cart.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /cart</p>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>productId</code> (string): The ID of the product.</li>
      <li><code>quantity</code> (number, optional): The quantity to be added or removed. Defaults to 1.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Cart Updated."
}</pre>
  </details>
</details>
<details>
  <summary>Customer APIs</summary>
  
  <details>
    <summary>Delete Customer</summary>
    <p>This API deletes a customer and is accessible only to admins and the user.</p>
    <p><strong>Method:</strong> DELETE</p>
    <p><strong>Endpoint:</strong> /customer</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>userId</code> (string): The ID of the customer to be deleted.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Customer deleted."
}</pre>
  </details>

  <details>
    <summary>Update Customer</summary>
    <p>This API updates customer details and is accessible only to admins and the user.</p>
    <p><strong>Method:</strong> PUT</p>
    <p><strong>Endpoint:</strong> /customer</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>userId</code> (string): The ID of the customer to be updated.</li>
      <li><code>newUser</code> (object): The new details of the customer.</li>
      <li><pre>newUser:{
    name: string (optional)
    email: string (optional)
    password: string (optional)
    phoneNumber: string (optional)
    address: string (optional)
}
</pre></li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Customer updated."
}</pre>
  </details>

  <details>
    <summary>Get All Customers</summary>
    <p>This API retrieves all customers and is accessible only to admins.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /customer/all</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for admin authentication.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": [
        {
            "_id": "607a12c115d47a0017d83262",
            "name": "customer1",
            "email": "customer1@example.com",
            "password": "hashedPassword",
            "phoneNumber": "1234567890",
            "address": "123 Main St",
            "__v": 0
        },
        ...
    ]
}</pre>
  </details>

  <details>
    <summary>Create Customer</summary>
    <p>This API creates a new customer.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /customer</p>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>newUser</code> (object): The details of the new customer.</li>
      <li><pre>newUser:{
    name: string
    email: string
    password: string
    phoneNumber: string (optional)
    address: string (optional)
}
</pre></li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "message": "Signup successful"
}</pre>
  </details>
</details>
<details>
  <summary>Product APIs</summary>
  
  <details>
    <summary>Get All Products</summary>
    <p>This API retrieves all products.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /product/all</p>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": [
        {
            "_id": "607a12c115d47a0017d83262",
            "title": "Product 1",
            "description": "Description of product 1",
            "price": 10.99,
            "imageURL": "https://example.com/product1.jpg",
            "type": "type1",
            "category": "category1",
            "deal": "deal1",
            "dealPrice": 9.99,
            "__v": 0
        },
        ...
    ]
}</pre>
  </details>

  <details>
    <summary>Get Product by ID</summary>
    <p>This API retrieves a product by its ID.</p>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /product/:productId</p>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": {
        "_id": "607a12c115d47a0017d83262",
        "title": "Product 1",
        "description": "Description of product 1",
        "price": 10.99,
        "imageURL": "https://example.com/product1.jpg",
        "type": "type1",
        "category": "category1",
        "deal": "deal1",
        "dealPrice": 9.99,
        "__v": 0
    }
}</pre>
  </details>

  <details>
    <summary>Update Product</summary>
    <p>This API updates a product.</p>
    <p><strong>Method:</strong> PUT</p>
    <p><strong>Endpoint:</strong> /product</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>newProduct</code> (object): The new details of the product.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": {
        "_id": "607a12c115d47a0017d83262",
        "title": "Updated Product 1",
        ...
    }
}</pre>
  </details>

  <details>
    <summary>Add Product</summary>
    <p>This API adds a new product.</p>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /product</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Body Parameters:</strong></p>
    <ul>
      <li><code>newProduct</code> (object): The details of the new product.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": {
        "_id": "607a12c115d47a0017d83262",
        "title": "New Product",
        ...
    }
}</pre>
  </details>

  <details>
    <summary>Delete Product</summary>
    <p>This API deletes a product.</p>
    <p><strong>Method:</strong> DELETE</p>
    <p><strong>Endpoint:</strong> /product/:productId</p>
    <p><strong>Headers:</strong></p>
    <ul>
      <li><code>Authorization</code> (string): Token for user authentication.</li>
    </ul>
    <p><strong>Response:</strong></p>
    <pre>{
    "data": {
        "_id": "607a12c115d47a0017d83262",
        "title": "Deleted Product",
        ...
    }
}</pre>
  </details>
</details>

### Note:
- All API endpoints require JWT token-based authentication using the `Authorization` header.
- The server is running on port 3001.