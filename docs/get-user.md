# Get User API Endpoint

This API endpoint retrieves user information from the database based on the provided user ID.

## Endpoint

`POST /api/get-user`

## Request

### Headers

- `Content-Type: application/json`

### Body

- `user_id` (string, required): The ID of the user to be fetched.

### Example Request

```json
POST /api/get-user
Content-Type: application/json

{
    "user_id": "7a3f3251-9b0e-4775-a265-71bfc6f25357"
}
```

## Response

### Success

- **Status Code:** `200 OK`

- **Response Body:**
  ```json
  {
    "message": "User found",
    "data": {
      // User object
    }
  }
  ```

### Errors

- **Status Code:** `400 Bad Request`

  - When the request body is missing.
  - **Response Body:**

    ```json
    {
      "error": "Missing request body",
      "data": null
    }
    ```

    - When `user_id` is missing in the request body.

    - **Response Body:**

    ```json
    {
      "message": "id is required"
    }
    ```

    - When the user is not found in the database.

    - **Response Body:**

    ```json
    {
      "message": "User not found",
      "data": null
    }
    ```
