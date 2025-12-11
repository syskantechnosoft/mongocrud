# Quick Start Guide

## Prerequisites

1. **Backend Server**: Make sure the Node.js backend is running on `http://localhost:3001`
   ```bash
   cd mongoCrud
   npm start
   ```

2. **Node.js**: Version 20.19+ or 22.12+ required

## Running the Frontend

1. **Install Dependencies** (if not already done):
   ```bash
   cd mongoCrud/auth-ui
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**: 
   Navigate to `http://localhost:5173`

## First Time Setup

### Create an Admin User

Since the backend doesn't automatically create admin users, you'll need to:

1. Register a new user through the UI at `/register`
2. Manually update the user's role in MongoDB:
   ```javascript
   // In MongoDB shell or Compass
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Log out and log back in to access the admin dashboard

### Test Credentials

For testing, you can create a user with these credentials:
- **Email**: admin@example.com
- **Password**: Admin123!
- **Name**: Admin User

Then update the role to 'admin' in MongoDB.

## Features to Test

✅ **Registration** - Create a new account
✅ **Login** - Sign in with credentials  
✅ **Theme Toggle** - Switch between light/dark mode
✅ **Dashboard** - View user statistics (admin only)
✅ **User Management** - Search, view, edit, delete users (admin only)
✅ **Logout** - Sign out of the application

## Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 3001
- Check `.env` file has correct `VITE_API_BASE_URL`

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Port Already in Use
- Change port in `vite.config.ts` or kill the process using port 5173

## Project Structure

```
auth-ui/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── stores/         # Zustand state management
│   ├── lib/            # API client and utilities
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
├── public/             # Static assets
└── .env                # Environment variables
```