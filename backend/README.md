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

## Register Captain

Creates a new captain account with vehicle information and returns an authentication token.

### Endpoint

```http
POST /captain/register
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```jsonc
{
  "fullname": {
    "firstname": "Alex", // Required; minimum 3 characters
    "lastname": "Morgan" // Required; minimum 3 characters
  },
  "email": "alex.morgan@example.com", // Required; must be a valid email
  "password": "secret123", // Required; minimum 6 characters
  "vehicle": {
    "color": "Black", // Required; minimum 3 characters
    "plate": "ABC-1234", // Required; minimum 3 characters
    "capacity": 4, // Required; numeric value, minimum 1
    "vehicleType": "car" // Required; car, motorcycle, or auto
  }
}
```

### Required Data

| Field | Type | Required | Requirements |
| --- | --- | --- | --- |
| `fullname.firstname` | String | Yes | At least 3 characters |
| `fullname.lastname` | String | Yes | At least 3 characters |
| `email` | String | Yes | Must be a valid email address |
| `password` | String | Yes | At least 6 characters |
| `vehicle.color` | String | Yes | At least 3 characters |
| `vehicle.plate` | String | Yes | At least 3 characters |
| `vehicle.capacity` | Number | Yes | Must be a number and at least 1 |
| `vehicle.vehicleType` | String | Yes | Must be `car`, `motorcycle`, or `auto` |

The password is hashed before it is saved. Do not send a pre-hashed password from the client.

### Example Request

```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex.morgan@example.com",
    "password": "secret123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Responses

#### `201 Created`

The captain was registered successfully.

Example response:

```jsonc
{
  "token": "jwt-token", // Use as Bearer token or token cookie
  "captain": {
    "_id": "65f1a2b3c4d5e6f789012345", // MongoDB captain ID
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex.morgan@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive" // New captains start inactive
  }
}
```

#### `400 Bad Request`

One or more request fields failed validation, or the email is already registered.

Validation response example:

```jsonc
{
  "errors": [
    {
      "type": "field",
      "value": "bike",
      "msg": "Invalid vehicle type",
      "path": "vehicle.vehicleType", // Must be car, motorcycle, or auto
      "location": "body"
    }
  ]
}
```

Duplicate email response example:

```jsonc
{
  "message": "Email already exists" // Email must be unique
}
```

#### `500 Internal Server Error`

An unexpected server or database error occurred while registering the captain.

Example response:

```jsonc
{
  "message": "Internal Server Error" // Unexpected server or database error
}
```

## Login Captain

Authenticates an existing captain and returns an authentication token.

### Endpoint

```http
POST /captain/login
```

### Headers

```http
Content-Type: application/json
```

### Request Body

```jsonc
{
  "email": "alex.morgan@example.com", // Required; must be a valid email
  "password": "secret123" // Required; minimum 6 characters
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex.morgan@example.com",
    "password": "secret123"
  }'
```

### Responses

#### `200 OK`

The captain was authenticated successfully. The server also sets a `token` cookie.

```jsonc
{
  "token": "jwt-token", // Use as Bearer token or token cookie
  "captain": {
    "_id": "65f1a2b3c4d5e6f789012345", // MongoDB captain ID
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex.morgan@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car" // car, motorcycle, or auto
    },
    "status": "inactive"
  }
}
```

#### `400 Bad Request`

The email or password failed validation.

```jsonc
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email", // Email must be valid
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### `401 Unauthorized`

The email or password is incorrect.

```jsonc
{
  "message": "Invalid email or password" // Credentials do not match
}
```

## Get Captain Profile

Returns the profile of the authenticated captain.

### Endpoint

```http
GET /captain/profile
```

### Authentication

Send the token in the `Authorization` header or a `token` cookie:

```http
Authorization: Bearer <token>
```

### Example Request

```bash
curl -X GET http://localhost:3000/captain/profile \
  -H "Authorization: Bearer jwt-token"
```

### Responses

#### `200 OK`

```jsonc
{
  "captain": {
    "_id": "65f1a2b3c4d5e6f789012345", // MongoDB captain ID
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex.morgan@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

#### `401 Unauthorized`

```jsonc
{
  "message": "Unauthorized access. No token provided." // Token is required
}
```

#### `400 Bad Request`

```jsonc
{
  "message": "Invalid token." // Token is expired or malformed
}
```

## Logout Captain

Logs out the authenticated captain, clears the token cookie, and blacklists the token.

### Endpoint

```http
GET /captain/logout
```

### Authentication

Send the token in the `Authorization` header or a `token` cookie:

```http
Authorization: Bearer <token>
```

### Example Request

```bash
curl -X GET http://localhost:3000/captain/logout \
  -H "Authorization: Bearer jwt-token"
```

### Responses

#### `200 OK`

```jsonc
{
  "message": "Logged out successfully" // Token is blacklisted and cookie cleared
}
```

#### `401 Unauthorized`

```jsonc
{
  "message": "Access denied. No token provided." // Token is required
}
```

#### `400 Bad Request`

```jsonc
{
  "message": "Invalid token." // Token is expired or malformed
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
