# User Management Dashboard

A vibrant, modern authentication and admin dashboard built with React, TypeScript, and shadcn/ui.

## Features

- 🎨 **Colorful & Creative Design** - Vibrant gradients and modern UI
- 🔐 **JWT Authentication** - Secure login and registration
- 👥 **User Management** - Admin dashboard to manage all users
- 🌓 **Theme Switching** - Light and dark mode support
- 📊 **Statistics Dashboard** - View user metrics and analytics
- ✅ **Form Validation** - Client-side validation with error messages
- 🔍 **Search & Filter** - Find users quickly
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- Backend API running on `http://localhost:3001`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3001
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ui/          # shadcn components
│   ├── Layout.tsx   # Main layout with header
│   └── ProtectedRoute.tsx
├── pages/           # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── stores/          # Zustand stores
│   ├── authStore.ts
│   └── themeStore.ts
├── lib/             # Utilities
│   └── api.ts       # API client
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Helper functions
│   └── formatters.ts
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## API Endpoints

The frontend connects to the following backend endpoints:

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout user

### Users (Admin only)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Design System

### Colors
- **Primary**: Brilliant Azure (#318CE7) - Trust and technology
- **Secondary**: Neon Pink (#FF0080) - Energy and creativity
- **Accent**: Princeton Orange (#FF8200) - CTAs and highlights

### Typography
- **Headings**: Chakra Petch (600-700 weight)
- **Body**: Work Sans (400 weight)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT