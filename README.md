````markdown
# User Management App with Caching

This is a Node.js Express application for managing user details with MongoDB as the database. The application includes caching to improve performance for retrieving user details.

## Features

- Create a new user
- Get details of all users
- Get details of a single user
- Update a user's details
- Delete a user
- Caching for improved performance

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

1. **Start the server:**

   npm run dev

   The server will start on `http://localhost:3000`.

## API Endpoints

### Create a New User

- **URL:** `http://localhost:3000/worko/user`
- **Method:** POST
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York",
    "zipcode": "10001"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York",
    "zipcode": "10001",
    "__v": 0
  }
  ```

### Get Details of All Users

- **URL:** `http://localhost:3000/worko/user`
- **Method:** GET
- **Response:**

  ```json
  [
      {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john@example.com",
          "age": 30,
          "city": "New York",
          "zipcode": "10001",
          "__v": 0
      },
      ...
  ]
  ```

### Get Details of a Single User

- **URL:** `http://localhost:3000/worko/user/:userId`
- **Method:** GET
- **Response:**

  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York",
    "zipcode": "10001",
    "__v": 0
  }
  ```

### Update a User

- **URL:** `http://localhost:3000/worko/user/:userId`
- **Method:** PUT
- **Request Body:**

  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28,
    "city": "Los Angeles",
    "zipcode": "90001"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28,
    "city": "Los Angeles",
    "zipcode": "90001",
    "__v": 0
  }
  ```

### Delete a User

- **URL:** `http://localhost:3000/worko/user/:userId`
- **Method:** DELETE
- **Response:**

  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## Caching

The application uses caching to speed up retrieval of user details. The cache key used is `list-user`.

- **When fetching all users:**

  - If `list-user` is present in the cache, it returns the cached data.
  - If `list-user` is not present in the cache, it fetches data from the database and sets the cache.

- **When creating, updating, or deleting a user:**
  - The cache key `list-user` is deleted to ensure the cache remains consistent with the database.

### Testing Caching

1. **Fetching user details for the first time:**

   - Use the GET route to fetch all user details. The first request will take longer as it fetches data from the database.

2. **Subsequent requests:**

   - Use the GET route again to fetch all user details. The subsequent requests will be faster as they fetch data from the cache.

3. **Creating, updating, or deleting a user:**
   - Perform any of these actions, which will delete the cache key `list-user`.
   - Fetch all user details again to see the cache updated with the latest data.

## License

This project is licensed under the MIT License.
````
