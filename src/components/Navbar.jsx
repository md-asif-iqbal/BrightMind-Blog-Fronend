import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../state/useAuth.js";
import { Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/Union.png" alt="Newsx logo" className="h-9 w-24" draggable={false} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/recent" className="hover:text-black">Recent Blogs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg border hover:bg-gray-100" aria-label="Notifications">
            <Bell className="h-5 w-5 text-gray-700" />
          </button>

          {user ? (
            <div className="relative">
              <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg border hover:bg-gray-100 pl-1 pr-2 py-1"
                aria-haspopup="menu"
                aria-expanded={open}
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/80"}
                  alt="User avatar"
                  className="h-9 w-9 rounded-lg object-cover"
                />
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {open && (
                <div ref={menuRef} role="menu" className="absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-lg p-1">
                  <Link to="/me" role="menuitem" className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin" role="menuitem" className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-100" onClick={() => setOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      logout();
                      navigate("/login");
                    }}
                    className="w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-zinc-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
