import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostPage from "./pages/PostPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserPanel from "./pages/UserPanel.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from './state/AuthContext.jsx';
import { useAuth } from './state/useAuth.js';
import RecentBlogs from "./pages/RecentBlogs.jsx";

const Protected = ({ adminOnly = false, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recent" element={<RecentBlogs />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<Protected><UserPanel /></Protected>} />
        <Route path="/admin/*" element={<Protected adminOnly><AdminPanel /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
