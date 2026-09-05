# Backend API Documentation

## Register User

Creates a new user account and returns an authentication token.

### Endpoint

```http
POST /user/register
```

### Headers

```http
Content-Type: application/json
```

### Request Body

The request body must be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Required Data

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | String | Yes | At least 3 characters |
| `fullname.lastname` | String | No | If provided, at least 3 characters |
| `email` | String | Yes | Must be a valid email address |
| `password` | String | Yes | At least 6 characters |

The password is hashed before it is saved. Do not send a pre-hashed password from the client.

### Example Request

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

### Responses

#### `201 Created`

The user was registered successfully.

Example response:

```json
{
  "token": "jwt-token",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `400 Bad Request`

One or more request fields failed validation.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "bad-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `500 Internal Server Error`

An unexpected server or database error occurred while registering the user.

Example response:

```json
{
  "message": "Internal Server Error"
}
```

## Get User Profile

Returns the profile of the currently authenticated user.

### Endpoint

```http
GET /user/profile
```

### Authentication

Send the token returned by the register or login endpoint in the `Authorization` header:

```http
Authorization: Bearer <token>
```

A valid `token` cookie can also be used instead of the `Authorization` header.

### Example Request

```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer jwt-token"
```

### Responses

#### `200 OK`

The authenticated user's profile was returned successfully.

Example response:

```json
{
  "user": {
    "_id": "65f1a2b3c4d5e6f789012345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `401 Unauthorized`

No authentication token was provided, or the token has been blacklisted.

```json
{
  "message": "Access denied. No token provided."
}
```

#### `400 Bad Request`

The provided token is invalid or has expired.

```json
{
  "message": "Invalid token."
}
```

## Logout User

Logs out the currently authenticated user and invalidates the authentication token.

### Endpoint

```http
GET /user/logout
```

### Authentication

Send the token returned by the register or login endpoint in the `Authorization` header:

```http
Authorization: Bearer <token>
```

A valid `token` cookie can also be used instead of the `Authorization` header.

### Example Request

```bash
curl -X GET http://localhost:3000/user/logout \
  -H "Authorization: Bearer jwt-token"
```

### Responses

#### `200 OK`

The user was logged out successfully and the token was invalidated.

```json
{
  "message": "Logged out successfully"
}
```

#### `401 Unauthorized`

No authentication token was provided.

```json
{
  "message": "Access denied. No token provided."
}
```

#### `400 Bad Request`

The provided token is invalid or has expired.

```json
{
  "message": "Invalid token."
}
```

## Login User

Authenticates an existing user and returns an authentication token.

### Endpoint

```http
POST /user/login
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Both `email` and `password` are required. The email must be valid and the password must be at least 6 characters long.

### Example Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

### Responses

#### `200 OK`

The user was authenticated successfully.

Example response:

```json
{
  "token": "jwt-token",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### `400 Bad Request`

One or more request fields failed validation.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "short",
      "msg": "Password must be at least  6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

The email or password is incorrect.

```json
{
  "message": "Invalid email or password"
}
```

#### `500 Internal Server Error`

An unexpected server or database error occurred while logging in.

Example response:

```json
{
  "message": "Internal Server Error"
}
```
