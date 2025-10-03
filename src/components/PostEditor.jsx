import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { useAuth } from "../state/useAuth.js";

export default function PostEditor({ open, onClose, onCreated }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [busy, setBusy] = useState(false);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!open) return;
    let ok = true;
    (async () => {
      try {
        const r = await api.get("/categories");
        if (ok) setCategories(r.data || []);
      } catch {
        if (ok) setCategories([]);
      }
    })();
    return () => { ok = false; };
  }, [open]);

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title"),
      categoryId: fd.get("categoryId"),
      bannerUrl: fd.get("bannerUrl") || "",
      excerpt: fd.get("excerpt") || "",
      content: fd.get("content") || "",
      published: isAdmin ? Boolean(fd.get("published")) : false
    };
    setBusy(true);
    try {
      const r = await api.post("/posts", payload);
      onCreated?.(r.data);
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Create failed");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">New Post</h3>
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>
        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-sm text-zinc-700">Title</label>
            <input name="title" required className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Post title" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-700">Category</label>
              <select name="categoryId" required className="mt-1 w-full border rounded-xl px-3 py-2 bg-white">
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-700">Banner URL</label>
              <input name="bannerUrl" className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-700">Excerpt</label>
            <input name="excerpt" className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Short summary..." />
          </div>

          <div>
            <label className="text-sm text-zinc-700">Content (HTML allowed)</label>
            <textarea name="content" rows={6} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="<p>Your content...</p>"></textarea>
          </div>

          {isAdmin && (
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" /> Publish now
            </label>
          )}

          <div className="pt-2">
            <button disabled={busy} className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500 disabled:opacity-60">
              {busy ? "Saving..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}