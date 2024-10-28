/\*\*

# API Documentation: /api/sign-up

## Overview

The `/api/sign-up` endpoint allows users to create a new account. It hashes the provided password for security and stores user details in the database, ensuring that all necessary user information is recorded accurately. If there's an error during user entry creation, the endpoint will also handle cleanup by deleting the created user.

## HTTP Method

**POST**

## Request Structure

### URL

```
POST /api/sign-up
```

### Headers

```
Content-Type: application/json
```

### Request Body

The request body must be a JSON object containing the following fields:

| Field          | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| email          | string | Yes      | The user's email address.                                            |
| password       | string | Yes      | The user's password.                                                 |
| name           | string | Yes      | The full name of the user.                                           |
| role           | string | Yes      | The user's role. Must be one of: admin, compliance_manager, or user. |
| subdomain      | string | Yes      | The user's designated subdomain.                                     |
| companyDetails | string | Yes      | Information about the user's company.                                |

### Example Request

```json
POST /api/sign-up
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe",
    "role": "admin",
    "subdomain": "example",
    "companyDetails": "Example Corp"
}
```

## Response Structure

### Success Response

**Status Code: 200 OK**

Response Body: A JSON object containing a success message and the created user data.

```json
{
  "message": "User created successfully",
  "data": {
    "id": "c3297bd1-5e3d-4b2f-99a0-ec590e68b985",
    "aud": "authenticated",
    "role": "user",
    "email": "example4@gmail.com",
    "email_confirmed_at": "2024-10-28T02:11:42.239625159Z",
    "phone": "",
    "app_metadata": {
      "provider": "email",
      "providers": ["email"]
    },
    "user_metadata": {},
    "identities": [
      {
        "identity_id": "65b9734b-acc9-4c6c-8f2e-e67be7028977",
        "id": "c3297bd1-5e3d-4b2f-99a0-ec590e68b985",
        "user_id": "c3297bd1-5e3d-4b2f-99a0-ec590e68b985",
        "identity_data": {
          "email": "example4@gmail.com",
          "email_verified": false,
          "phone_verified": false,
          "sub": "c3297bd1-5e3d-4b2f-99a0-ec590e68b985"
        },
        "provider": "email",
        "last_sign_in_at": "2024-10-28T02:11:42.23513355Z",
        "created_at": "2024-10-28T02:11:42.237818Z",
        "updated_at": "2024-10-28T02:11:42.237818Z",
        "email": "example4@gmail.com"
      }
    ],
    "created_at": "2024-10-28T02:11:42.234138Z",
    "updated_at": "2024-10-28T02:11:42.239846Z",
    "is_anonymous": false,
    "hashed_password": "$2b$10$f40c36kq41oY2b1DTMD.c.xqCgKLcljPhFIC2DD/oK7kIpgv2k.dC",
    "subdomain": "example-subdomain",
    "company_details": "Example Company Details",
    "name": "Example User"
  }
}
```

### Error Responses

#### Method Not Allowed

**Status Code: 405 Method Not Allowed**

Response Body:

```json
{
  "message": "'GET' Method Not Allowed - Use 'POST'"
}
```

#### Missing Required Fields

**Status Code: 400 Bad Request**

Response Body:

```json
{
  "message": "Email and password are required"
}
```

or

```json
{
  "message": "Name, Role, Subdomain and Company Details are required"
}
```

#### Invalid Role

**Status Code: 400 Bad Request**

Response Body:

```json
{
  "message": "Role must be either admin, compliance_manager or user"
}
```

#### Error Creating User in Supabase

**Status Code: 400 Bad Request**

Response Body:

```json
{
  "message": "Error creating user entry: {error message}",
  "data": null
}
```

#### User Not Created

**Status Code: 500 Internal Server Error**

Response Body:

```json
{
  "message": "User not created",
  "data": null
}
```

## Security

Passwords are hashed using bcrypt with 10 salt rounds before being stored in the database, ensuring that user passwords are securely handled.

## Notes

- Ensure that the email address is unique in your database to prevent duplicate accounts.
- Passwords should meet security criteria (e.g., length and complexity) to enhance user account security.
- If an error occurs while inserting the user entry into the database, the newly created user in Supabase will be deleted to maintain consistency.

This documentation provides a clear overview of how to use the `/sign-up` endpoint, what to expect, and how to handle various scenarios. Adjust any specifics as needed to fit your application!
