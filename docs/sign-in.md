# API Documentation: /api/sign-in

## Overview

The `/api-sign-in` endpoint allows users to authenticate using their email and password. It uses Supabase to validate the credentials and returns the user information along with the session details upon successful login.

## HTTP Method

- **POST**

## Request Structure

### URL

POST /api/sign-in

### Headers

- `Content-Type: application/json`

### Request Body

The request body must be a JSON object containing the following fields:

| Field    | Type   | Required | Description               |
| -------- | ------ | -------- | ------------------------- |
| email    | string | Yes      | The user's email address. |
| password | string | Yes      | The user's password.      |

### Example Request

```json
POST /api/sign-in
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "securePassword123"
}
```

## Response Structure

### Success Response

**Status Code:** 200 OK

**Response Body:**

```json
{
  "message": "Sign in successful",
  "data": {
    "user": {
      "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
      "aud": "authenticated",
      "role": "authenticated",
      "email": "mdmarufbinsalim@gmail.com",
      "email_confirmed_at": "2024-10-28T02:46:11.206747Z",
      "last_sign_in_at": "2024-10-28T02:46:17.793662281Z",
      "app_metadata": {
        "provider": "email",
        "providers": ["email"]
      },
      "created_at": "2024-10-28T02:46:11.200533Z",
      "updated_at": "2024-10-28T02:46:17.796097Z"
    },
    "session": {
      "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IlpBV3NI...",
      "token_type": "bearer",
      "expires_in": 3600,
      "user": {
        "id": "7a3f3251-9b0e-4775-a265-71bfc6f25357",
        "email": "mdmarufbinsalim@gmail.com",
        "created_at": "2024-10-28T02:46:11.200533Z",
        "updated_at": "2024-10-28T02:46:17.796097Z"
      }
    }
  }
}
```

### Error Responses

#### Method Not Allowed

**Status Code:** 405 Method Not Allowed

**Response Body:**

```json
{
  "message": "'GET' Method Not Allowed - Use 'POST'"
}
```

#### Missing Required Fields

**Status Code:** 400 Bad Request

**Response Body:**

```json
{
  "message": "Email and password are required"
}
```

#### Invalid Credentials

**Status Code:** 400 Bad Request

**Response Body:**

```json
{
  "message": "{error code} : {error message}",
  "data": null
}
```

## Security

Passwords are securely handled through Supabase, which uses industry-standard practices for authentication. Ensure that user credentials are transmitted securely over HTTPS to protect against eavesdropping.

## Notes

- Make sure the user is registered before attempting to sign in.
- Always validate the email format on the client side before sending requests.
- Store session tokens securely and implement refresh token logic as needed.

This documentation provides a comprehensive overview of how to use the `/api-sign-in` endpoint, including request and response structures, error handling, and security considerations.

```

```
