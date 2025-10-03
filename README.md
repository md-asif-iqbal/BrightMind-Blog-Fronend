# 🌟 BrightMind Blog – Frontend

This is the **frontend** of **BrightMind Blog**, a modern MERN stack blog system.  
It is built with **React (Vite)**, **TailwindCSS v4**, and integrates with the backend API for authentication, posts, categories, and comments.

---

## 🚀 Tech Stack

- **React 18 (Vite)**
- **TailwindCSS v4**
- **React Router DOM**
- **Axios**
- **Lucide React Icons**

---

## 📦 Installation & Setup

### 1. Clone repo
```bash
git clone <your-frontend-repo-url> frontend
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file

Create `.env` at the project root:

```env
VITE_API_URL=http://localhost:5050/api
```
`VITE_API_URL` should point to your backend server.

### 4. Run development server
```bash
npm run dev
```
Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 Features

### Auth Pages
- Login
- Register
- Logout
- JWT integration

### Home Page
- Recent posts grid
- Category filter (dropdown)
- Search posts
- Pagination

### Post Page
- Full content display
- Author and category info
- Comments section

### User Panel
- View profile
- Manage my posts
- Create new posts

### Admin Panel
- Manage posts
- Manage categories
- Edit/Delete posts
- Role-based access (admin only)

### UI
- Tailwind responsive design
- Dark theme (slate background)
- Mobile-friendly navigation

---

## 📁 Project Structure

```
src/
 ├── components/
 │   ├── Navbar.jsx
 │   ├── PostCard.jsx
 │   ├── CategoryFilter.jsx
 │   ├── ...
 ├── pages/
 │   ├── HomePage.jsx
 │   ├── LoginPage.jsx
 │   ├── RegisterPage.jsx
 │   ├── UserPanel.jsx
 │   ├── AdminPanel.jsx
 │   └── PostPage.jsx
 ├── state/
 │   └── useAuth.js
 ├── utils/
 │   └── api.js
 ├── main.jsx
 └── App.jsx
```

---

## 🌐 Deployment

**Vercel:** Deploy easily with zero config.

**LIVE** https://bright-mind-blog-fronend.vercel.app/

Ensure you set the environment variable in Vercel:

```
VITE_API_URL=https://your-backend-domain/api
```

---

# Login 
**email:** admin@gmail.com
**password:** admin

## ✅ Checklist

- Matches Figma UI (responsive + styled)
- Integrated with backend API
- CRUD functionality for posts & categories
- User & Admin separation
- Thanks