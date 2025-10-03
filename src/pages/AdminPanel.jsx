import { useEffect, useMemo, useState } from 'react';
import { Link, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api.js';
import { useAuth } from '../state/useAuth.js';
import { toast } from 'react-toastify';

export default function AdminPanel() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-100 via-violet-200 to-violet-300">
      {/* Top bar for mobile */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <h3 className="font-semibold text-violet-800 text-base">Admin Panel</h3>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="px-3 py-1.5 rounded-lg border text-sm bg-white/70 hover:bg-white"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside
          className={`border-r bg-white/80 shadow-lg rounded-tr-3xl rounded-br-3xl flex flex-col transition-all
            ${menuOpen ? 'block' : 'hidden'} lg:block`}
        >
          <div className="p-4 lg:p-6">
            <h3 className="font-semibold mb-4 lg:mb-6 text-violet-700 text-base lg:text-lg tracking-wide">
              Admin Panel
            </h3>
            <nav className="grid gap-2 lg:gap-3">
              <Link
                to="/admin"
                className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-violet-600 text-white text-sm lg:text-base font-semibold shadow hover:bg-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                Posts
              </Link>
              <Link
                to="/admin/editor"
                className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-violet-600 text-white text-sm lg:text-base font-semibold shadow hover:bg-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                New Post
              </Link>
              <Link
                to="/admin/categories"
                className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl bg-violet-600 text-white text-sm lg:text-base font-semibold shadow hover:bg-violet-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                Categories
              </Link>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <section className="p-4 lg:p-8">
          <div className="bg-white/90 rounded-2xl lg:rounded-3xl shadow-xl p-4 lg:p-6 min-h-[70vh]">
            <Routes>
              <Route path="" element={<PostsList />} />
              <Route path="editor" element={<PostEditor />} />
              <Route path="editor/:id" element={<PostEditor />} />
              <Route path="categories" element={<Categories />} />
            </Routes>
          </div>
        </section>
      </div>
    </div>
  );
}

function PostsList() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });

  useEffect(() => {
    api.get('/posts?limit=1000').then((r) => setData(r.data)).catch(() => {
      toast.error('Failed to load posts');
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-violet-700">Posts</h2>
        <Link
          to="editor"
          className="self-start sm:self-auto px-3 py-1.5 lg:px-4 lg:py-2 bg-violet-600 text-white rounded-xl text-sm lg:text-base font-semibold shadow hover:bg-violet-700 transition-all"
        >
          New
        </Link>
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden space-y-3">
        {data.items.map((p) => (
          <div key={p._id} className="rounded-xl border shadow bg-white p-3">
            <div className="font-semibold">{p.title}</div>
            <div className="text-xs text-zinc-600 mt-1">
              <span>{p.category?.name || '—'}</span> ·{' '}
              <span>{new Date(p.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  p.published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {p.published ? 'Published' : 'Draft'}
              </span>
              <Link
                to={`editor/${p._id}`}
                className="px-3 py-1 rounded-lg bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-auto rounded-xl shadow">
        <table className="min-w-[640px] w-full bg-white rounded-xl">
          <thead>
            <tr className="text-left border-b bg-violet-50">
              <th className="py-3 pr-3 font-semibold text-violet-700">Title</th>
              <th className="py-3 pr-3 font-semibold text-violet-700">Category</th>
              <th className="py-3 pr-3 font-semibold text-violet-700">Published</th>
              <th className="py-3 pr-3 font-semibold text-violet-700">Created</th>
              <th className="py-3 pr-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((p) => (
              <tr key={p._id} className="border-b hover:bg-violet-50 transition">
                <td className="py-3 pr-3">{p.title}</td>
                <td className="py-3 pr-3">{p.category?.name}</td>
                <td className="py-3 pr-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      p.published ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {p.published ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="py-3 pr-3">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="py-3 pr-3">
                  <Link
                    to={`editor/${p._id}`}
                    className="px-3 py-1 rounded-lg bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostEditor() {
  const { token } = useAuth();
  const nav = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    bannerUrl: '',
    content: '',
    categoryId: '',
    published: true,
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => {
      toast.error('Failed to load categories');
    });
  }, []);

  useEffect(() => {
    if (isEdit) {
      // Prefer a dedicated endpoint for single post
      api.get(`/posts/${id}`)
        .then((r) => {
          const found = r.data;
          setForm({
            title: found.title || '',
            excerpt: found.excerpt || '',
            bannerUrl: found.bannerUrl || '',
            content: found.content || '',
            categoryId: found.category?._id || '',
            published: !!found.published,
          });
        })
        .catch(() => toast.error('Failed to load post'));
    }
  }, [id, isEdit]);

  const save = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (isEdit) {
        await api.patch(`/posts/${id}`, form, { headers });
        toast.success('Post updated successfully!');
      } else {
        await api.post('/posts', form, { headers });
        toast.success('New post added!');
      }
      nav('/admin');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save post.');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-violet-700">
          {isEdit ? 'Edit Post' : 'New Post'}
        </h2>
      </div>
      <form
        onSubmit={save}
        className="grid gap-3 lg:gap-4 max-w-2xl bg-violet-50 p-4 lg:p-6 rounded-2xl shadow"
      >
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base"
          required
        />
        <input
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Excerpt"
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base"
        />
        <input
          value={form.bannerUrl}
          onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })}
          placeholder="Banner URL"
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base"
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="HTML content"
          rows="10"
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base"
          required
        />
        <label className="flex items-center gap-2 text-sm lg:text-base">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 lg:px-6 lg:py-2 bg-violet-700 text-white rounded-xl text-sm lg:text-base font-semibold shadow hover:bg-violet-800 transition-all"
            type="submit"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => nav('/admin')}
            className="px-4 py-2 rounded-xl border text-sm lg:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Categories() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const refresh = () => api.get('/categories').then((r) => setItems(r.data)).catch(() => {
    toast.error('Failed to load categories.');
  });

  useEffect(() => {
    refresh();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name }, { headers });
      setName('');
      refresh();
      toast.success('Category added!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add category.');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/categories/${id}`, { headers });
      refresh();
      toast.success('Category deleted!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete category.');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 lg:mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-violet-700">Categories</h2>
      </div>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="p-2 lg:p-3 border rounded-xl focus:ring-2 focus:ring-violet-400 text-sm lg:text-base flex-1"
          required
        />
        <button className="px-4 py-2 lg:px-6 lg:py-2 bg-violet-700 text-white rounded-xl text-sm lg:text-base font-semibold shadow hover:bg-violet-800 transition-all">
          Add
        </button>
      </form>
      <ul className="mt-3 space-y-2">
        {items.map((c) => (
          <li
            key={c._id}
            className="border rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-violet-50 shadow"
          >
            <span className="font-medium text-violet-700">{c.name}</span>
            <button
              className="self-start sm:self-auto px-3 py-1.5 bg-red-600 text-white rounded-xl text-sm font-semibold shadow hover:bg-red-700 transition-all"
              onClick={() => remove(c._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
