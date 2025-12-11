@echo off
echo Testing REST API Endpoints
echo ========================
set BASE_URL=http://localhost:3001
set TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2E5NWFjOThlYTQyNDNiNTRkYzczYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NDQ3MDg0LCJleHAiOjE3NjYwNTE4ODR9.k7EFxFbHTQCFifoXvjmhULhbtpiHqYvpUcHp0fyKIMo

echo.
echo 1. Health Check
curl -X GET %BASE_URL%/health

echo.
echo.
echo 2. Register User
curl -X POST %BASE_URL%/api/v1/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"Test123!\"}"

echo.
echo.
echo 3. Login User (Save token for next requests)
curl -X POST %BASE_URL%/api/v1/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123!\"}" > login_response.json

echo.
echo Please copy the token from login_response.json and set it in TOKEN variable
echo Then run the remaining tests...

pause

echo.
echo 4. Get Current User (Replace YOUR_TOKEN with actual token)
curl -X GET %BASE_URL%/api/v1/auth/me ^
  -H "Authorization: Bearer YOUR_TOKEN"

echo.
echo.
echo 5. Create User via Users endpoint
curl -X POST %BASE_URL%/api/v1/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"John123!\",\"age\":25}"

echo.
echo.
echo 6. Get All Users (Admin only - Replace YOUR_ADMIN_TOKEN)
curl -X GET %BASE_URL%/api/v1/users ^
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

echo.
echo.
echo 7. Get User by ID (Replace USER_ID and YOUR_TOKEN)
curl -X GET %BASE_URL%/api/v1/users/USER_ID ^
  -H "Authorization: Bearer YOUR_TOKEN"

echo.
echo.
echo 8. Update User (Replace USER_ID and YOUR_TOKEN)
curl -X PUT %BASE_URL%/api/v1/users/USER_ID ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -d "{\"name\":\"Updated Name\",\"age\":30}"

echo.
echo.
echo 9. Change Password
curl -X PUT %BASE_URL%/api/v1/auth/change-password ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -d "{\"currentPassword\":\"Test123!\",\"newPassword\":\"NewTest123!\"}"

echo.
echo.
echo 10. Delete User (Replace USER_ID and YOUR_TOKEN)
curl -X DELETE %BASE_URL%/api/v1/users/USER_ID ^
  -H "Authorization: Bearer YOUR_TOKEN"

echo.
echo.
echo 11. Logout
curl -X POST %BASE_URL%/api/v1/auth/logout ^
  -H "Authorization: Bearer YOUR_TOKEN"

echo.
echo.
echo 12. Test 404 Route
curl -X GET %BASE_URL%/api/v1/nonexistent

echo.
echo Testing completed!
pause