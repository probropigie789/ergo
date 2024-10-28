## `/update-user` Endpoint Documentation

### Description

This endpoint handles updating user information in the database. It supports updating fields such as `name`, `role`, `subdomain`, and `company_details` for a specified user.

### Method

`POST`

### Request Headers

- `Content-Type: application/json`

### Request Body

The request body must be a JSON object containing the following fields:

- `user_id` (string, required): The ID of the user to be updated.
- `update_value` (object, required): An object containing the fields to be updated. Possible fields include:
  - `name` (string, optional): The new name of the user.
  - `role` (string, optional): The new role of the user. Must be one of `admin`, `compliance_manager`, or `user`.
  - `subdomain` (string, optional): The new subdomain associated with the user.
  - `company_details` (string, optional): The new company details of the user.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "User updated!",
    "data": {
      // Updated user object
    }
  }
  ```

#### Errors

- **Status Code:** `200 OK`

  - When the request method is `OPTIONS`.
  - **Response Body:** `"ok"`

- **Status Code:** `405 Method Not Allowed`

  - When the request method is not `POST`.
  - **Response Body:**
    ```json
    {
      "message": "'<METHOD>' Method Not Allowed - Use 'POST'"
    }
    ```

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
      "message": "User ID is required"
    }
    ```

  - When `update_value` is missing in the request body.
  - **Response Body:**

    ```json
    {
      "message": "Update_value is required"
    }
    ```

  - When `role` in `update_value` is invalid.
  - **Response Body:**

    ```json
    {
      "message": "Role must be either admin, compliance_manager or user"
    }
    ```

  - When there is an error updating the user in the database.
  - **Response Body:**
    ```json
    {
      "message": "<ERROR_CODE> : <ERROR_MESSAGE>",
      "data": null
    }
    ```

- **Status Code:** `500 Internal Server Error`
  - When the user is not updated due to an unknown error.
  - **Response Body:**
    ```json
    {
      "message": "User not updated",
      "data": null
    }
    ```
