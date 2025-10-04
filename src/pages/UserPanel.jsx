import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/useAuth.js";
import api from "../utils/api.js";
import { Home, User2, FileText, Plus, Trash2, Menu, LogOut } from "lucide-react";

export default function UserPanel() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const loc = useLocation();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await api.get("/posts?authorId=me&limit=100");
        if (ok) setPosts(r.data?.items || []);
      } catch {
        if (ok) setPosts([]);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => { ok = false; };
  }, []);

  const rows = useMemo(
    () => posts.map((p, i) => ({ sn: String(i + 1).padStart(2, "0"), ...p })),
    [posts]
  );

  async function onDelete(id) {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch { alert("Delete failed"); }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(v => !v)}
          aria-label="Toggle menu"
          className="p-2 rounded-lg border hover:bg-zinc-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-semibold">Dashboard</div>
        {user ? (
          <button
            onClick={() => { logout(); nav("/login"); }}
            className="text-sm underline"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-sm underline">Login</Link>
        )}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-0 md:gap-6">
        <aside className={`md:sticky md:top-0 md:h-[100dvh] bg-white border-r border-zinc-200 md:border-none ${sidebarOpen ? "block" : "hidden md:block"}`}>
          <div className="p-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/Union.png" alt="logo" className="h-8 w-20" />
              
            </Link>
            <nav className="space-y-1">
              <NavItem icon={<Home className="h-4 w-4" />} label="Home" to="/" active={loc.pathname === "/"} />
              <NavItem icon={<User2 className="h-4 w-4" />} label="My Profile" to="/me" active={loc.pathname === "/me"} />
              {isAdmin && (
                <NavItem icon={<FileText className="h-4 w-4" />} label="Posts (Admin)" to="/admin" active={loc.pathname.startsWith("/admin")} />
              )}
            </nav>
            <div className="mt-6">
              {user ? (
                <button
                  onClick={() => { logout(); nav("/login"); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-zinc-100 text-sm"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              ) : (
                <Link to="/login" className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 hover:bg-zinc-100 text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        </aside>

        <main className="px-4 md:px-0 py-6">
          <section className="bg-white rounded-2xl border border-zinc-200 p-5 mb-6">
            <h2 className="text-lg font-semibold mb-4">My Profile</h2>
            <div className="flex items-start gap-4">
              <img
                src={user?.avatar || "https://i.pravatar.cc/120"}
                alt="avatar"
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="grid sm:grid-cols-2 gap-y-1 gap-x-8 text-sm">
                <Field label="Name" value={user?.name || "—"} />
                <Field label="Email" value={user?.email || "—"} />
                <Field label="Role" value={user?.role || "—"} />
                <Field label="Member Since" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"} />
              </div>
            </div>
          </section>


          <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-zinc-600">
                Total Posts: <span className="font-semibold text-zinc-900">{posts.length}</span>
              </div>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white text-sm px-3 py-2 hover:bg-indigo-500"
                >
                  <Plus className="h-4 w-4" /> New Post
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => alert("Only admin can create a new post.")}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-300 text-white text-sm px-3 py-2 cursor-not-allowed opacity-70"
                  disabled
                >
                  <Plus className="h-4 w-4" /> New Post
                </button>
              )}
            </div>

   
          <section className="bg-white rounded-2xl border border-zinc-200">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Recent Posts</h3>
              {isAdmin && <Link to="/admin" className="text-sm text-zinc-500 hover:text-zinc-700">See All →</Link>}
            </div>

            {loading ? (
              <div className="px-5 py-10 text-sm text-zinc-500">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-zinc-700 font-medium">You haven’t created any posts.</p>
                <Link to="/admin" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white text-sm px-3 py-2 hover:bg-indigo-500">
                  <Plus className="h-4 w-4" /> Add your first post
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-zinc-500">
                    <tr className="[&>th]:px-5 [&>th]:py-3 border-b">
                      <th className="w-16">S/N</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th className="w-28 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-800">
                    {rows.map(p => (
                      <tr key={p._id} className="[&>td]:px-5 [&>td]:py-3 border-b last:border-0">
                        <td className="tabular-nums text-zinc-500">{p.sn}</td>
                        <td className="max-w-[360px]"><Link to={`/post/${p.slug}`} className="hover:underline">{p.title}</Link></td>
                        <td>{p.published ? <Pill ok>Published</Pill> : <Pill>Draft</Pill>}</td>
                        <td className="text-zinc-700">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}</td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button title="Delete" onClick={() => onDelete(p._id)} className="p-2 rounded-lg border hover:bg-zinc-100">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
        active ? "bg-indigo-50 text-indigo-700" : "text-zinc-700 hover:bg-zinc-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="font-medium text-zinc-800">{value}</div>
    </div>
  );
}

function Pill({ ok, children }) {
  return ok ? (
    <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-2.5 py-1 text-xs font-medium">{children}</span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 px-2.5 py-1 text-xs font-medium">{children}</span>
  );
}
