# ⚠️ IMPORTANT SETUP NOTE

## Path Issue with Spaces

The current project is located in a path with spaces:
```
D:\Training\Tata Elxsi\Day11-15 NodeJS\Day14 REST & Mongo\mongoCrud\auth-ui
```

This causes issues with npm scripts on Windows. You have **two options** to fix this:

### Option 1: Move the Project (Recommended)

Move the entire project to a path without spaces:

```bash
# Example: Move to a simpler path
# From: D:\Training\Tata Elxsi\Day11-15 NodeJS\Day14 REST & Mongo\mongoCrud\auth-ui
# To: D:\Projects\auth-ui

# Then run:
cd D:\Projects\auth-ui
npm install
npm run dev
```

### Option 2: Use Full Node Path

Run vite directly using the full node path:

```bash
cd mongoCrud\auth-ui
node node_modules\vite\bin\vite.js
```

## After Fixing the Path

Once you've resolved the path issue, follow these steps:

1. **Install dependencies** (if you moved the project):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`

4. **Start the backend** (in a separate terminal):
   ```bash
   cd mongoCrud
   node server.js
   ```

## Default Credentials

After starting both servers:

1. Go to `http://localhost:5173/register`
2. Create a new user account
3. Update the user's role to 'admin' in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
4. Log out and log back in to access the admin dashboard

## Project Features

✨ **Vibrant, colorful UI** with gradient backgrounds
🎨 **Theme switching** (light/dark mode)
🔐 **JWT authentication** (login/register)
👥 **Admin dashboard** with user management
📊 **Statistics cards** showing user metrics
🔍 **Search and filter** users
✏️ **Edit and delete** users (admin only)

## Tech Stack

- React 19 + TypeScript
- Vite
- shadcn/ui components
- Tailwind CSS v4
- Zustand (state management)
- TanStack Query (data fetching)
- React Router v7
- Axios

---

**Note**: All the code is complete and functional. The only issue is the Windows path with spaces preventing npm scripts from running correctly.