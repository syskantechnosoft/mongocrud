# API Endpoint Testing Guide

## Prerequisites
1. Start the server: `npm start` or `npm run dev`
2. Ensure MongoDB is running
3. Server should be running on http://localhost:3000

## Manual Testing Commands

### 1. Health Check
```bash
curl -X GET http://localhost:3000/health
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"Test123!\"}"
```

### 3. Login User (Save the token from response)
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123!\"}"
```

### 4. Get Current User (Replace YOUR_TOKEN)
```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Create User via Users endpoint
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"John123!\",\"age\":25}"
```

### 6. Get All Users (Admin only)
```bash
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 7. Get User by ID (Replace USER_ID and YOUR_TOKEN)
```bash
curl -X GET http://localhost:3000/api/v1/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 8. Update User (Replace USER_ID and YOUR_TOKEN)
```bash
curl -X PUT http://localhost:3000/api/v1/users/USER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"name\":\"Updated Name\",\"age\":30}"
```

### 9. Change Password
```bash
curl -X PUT http://localhost:3000/api/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d "{\"currentPassword\":\"Test123!\",\"newPassword\":\"NewTest123!\"}"
```

### 10. Delete User (Replace USER_ID and YOUR_TOKEN)
```bash
curl -X DELETE http://localhost:3000/api/v1/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 11. Logout
```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 12. Test 404 Route
```bash
curl -X GET http://localhost:3000/api/v1/nonexistent
```

## Testing Flow
1. Run health check
2. Register a user
3. Login with the user credentials
4. Copy the token from login response
5. Use the token for protected endpoints
6. Test CRUD operations on users
7. Test authentication features

## Expected Responses
- Health check: `{"status":"Server is running"}`
- Register/Login: Returns user data with JWT token
- Protected routes: Require valid JWT token
- Admin routes: Require admin role