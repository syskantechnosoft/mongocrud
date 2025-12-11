#!/bin/bash

echo "Testing REST API Endpoints"
echo "========================"

BASE_URL="http://localhost:3000"
TOKEN=""

echo
echo "1. Health Check"
curl -X GET $BASE_URL/health

echo
echo
echo "2. Register User"
curl -X POST $BASE_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123!"}'

echo
echo
echo "3. Login User"
RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}')

echo $RESPONSE

# Extract token (requires jq)
if command -v jq &> /dev/null; then
    TOKEN=$(echo $RESPONSE | jq -r '.token')
    echo "Token extracted: $TOKEN"
else
    echo "Please install jq or manually extract token from above response"
    read -p "Enter token: " TOKEN
fi

echo
echo
echo "4. Get Current User"
curl -X GET $BASE_URL/api/v1/auth/me \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "5. Create User via Users endpoint"
USER_RESPONSE=$(curl -s -X POST $BASE_URL/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"John123!","age":25}')

echo $USER_RESPONSE

# Extract user ID
if command -v jq &> /dev/null; then
    USER_ID=$(echo $USER_RESPONSE | jq -r '.data._id')
    echo "User ID extracted: $USER_ID"
else
    echo "Please manually extract user ID from above response"
    read -p "Enter user ID: " USER_ID
fi

echo
echo
echo "6. Get All Users (Admin only - will fail with regular user)"
curl -X GET $BASE_URL/api/v1/users \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "7. Get User by ID"
curl -X GET $BASE_URL/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "8. Update User"
curl -X PUT $BASE_URL/api/v1/users/$USER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Updated Name","age":30}'

echo
echo
echo "9. Change Password"
curl -X PUT $BASE_URL/api/v1/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"currentPassword":"Test123!","newPassword":"NewTest123!"}'

echo
echo
echo "10. Delete User"
curl -X DELETE $BASE_URL/api/v1/users/$USER_ID \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "11. Logout"
curl -X POST $BASE_URL/api/v1/auth/logout \
  -H "Authorization: Bearer $TOKEN"

echo
echo
echo "12. Test 404 Route"
curl -X GET $BASE_URL/api/v1/nonexistent

echo
echo
echo "Testing completed!"