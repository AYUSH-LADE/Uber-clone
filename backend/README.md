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
