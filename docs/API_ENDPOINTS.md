# API Endpoints - Runner Velora

Backend: `https://backend-running-production.up.railway.app/api/v1`

## 🔐 Auth

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "cliente@velora.com",
  "password": "Cliente123!"
}

Response: 200
{
  "id": "user-123",
  "email": "cliente@velora.com",
  "name": "Usuario",
  "role": "CLIENTE",
  "tier": "FREE",
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "Secure123!"
}

Response: 201
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>

Response: 200
```

## 👤 Users

### Get My Profile

```http
GET /users/me
Authorization: Bearer <token>

Response: 200
```

## 🏃 Activities

### Log Activity

```http
POST /activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Morning Run",
  "description": "5K run",
  "activityType": "run",
  "distance": 5.0,
  "duration": 1800,
  "notes": "Felt great"
}

Response: 201
```

### Get My Activities

```http
GET /activities/me?page=1&limit=10
Authorization: Bearer <token>

Response: 200
```

## 🏋️ Coaches

### Find Coaches (Marketplace)

```http
GET /coach/marketplace?search=name&page=1

Response: 200
```

## 💰 Subscriptions

### Get My Subscription

```http
GET /subscriptions/me
Authorization: Bearer <token>

Response: 200
```

### Upgrade to PREMIUM

```http
POST /subscriptions/stripe/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "tier": "PREMIUM"
}

Response: 200