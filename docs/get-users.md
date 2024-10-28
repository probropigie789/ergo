# /api/get-users Endpoint Documentation

## Description

The `/api/get-users` endpoint is used to fetch user data from the database. It supports both paginated and non-paginated requests.

## Method

- `POST`

## Request Headers

- `Content-Type: application/json`

## Request Body

- `paginated` (boolean, optional): Indicates if the response should be paginated. Defaults to `false`.
- `page` (number, optional): The page number to fetch. Defaults to `1`.
- `items_per_page` (number, optional): The number of items per page. Defaults to `10`.

## Responses

### 200 OK

- **Non-Paginated Response:**

  ```json
  {
    "message": "fetched user data!",
    "data": {
      "users": [
        /* array of user objects */
      ]
    }
  }
  ```

- **Paginated Response:**
  ```json
  {
    "message": "fetched user data!",
    "data": {
      "users": [
        /* array of user objects */
      ],
      "page": 1,
      "items_per_page": 10,
      "max_pages": 5
    }
  }
  ```

### 400 Bad Request

- Missing request body:

  ```json
  {
    "error": "Missing request body",
    "data": null
  }
  ```

- Page number exceeds max pages:

  ```json
  {
    "message": "Page {page} does not exist. Max pages: {max_pages}"
  }
  ```

- Database error:
  ```json
  {
    "message": "{error.message}"
  }
  ```

### 405 Method Not Allowed

- Method other than POST:
  ```json
  {
    "message": "'{method}' Method Not Allowed - Use 'POST'"
  }
  ```

### 200 OK (OPTIONS)

- For preflight requests:
  ```text
  ok
  ```
