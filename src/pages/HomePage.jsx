// src/pages/HomePage.jsx  (REPLACE FILE)
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import PostCard from "../components/PostCard.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

/**
 * Why: we allow category names with special chars (e.g., ".NET").
 * We pass categoryName (exact display name) to the backend.
 * Backend should filter by category name (case-insensitive) if categoryName is present.
 */
export default function HomePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [qInput, setQInput] = useState(params.get("q") || "");
  const [loading, setLoading] = useState(true);

  const q = (params.get("q") || "").trim();
  const categoryName = params.get("categoryName") || ""; // <-- use name not slug
  const page = Number(params.get("page") || 1);

  // Debounce search input -> updates URL query
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (qInput.trim()) next.set("q", qInput.trim());
      else next.delete("q");
      next.delete("page"); // reset page on new search
      navigate(`/?${next.toString()}`, { replace: true });
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput]);

  // Fetch posts whenever filters change
  useEffect(() => {
    const qs = new URLSearchParams();
    if (q) qs.set("q", q); // free-text search
    if (categoryName) qs.set("categoryName", categoryName); // exact display name (e.g., ".NET")
    if (page > 1) qs.set("page", String(page));

    setLoading(true);
    api
      .get(`/posts?${qs.toString()}`)
      .then((r) => setData(r.data))
      .catch(() => setData({ items: [], total: 0, page: 1, pages: 1 }))
      .finally(() => setLoading(false));
  }, [q, categoryName, page]);

  const pages = useMemo(
    () => Array.from({ length: data.pages || 0 }, (_, i) => i + 1),
    [data.pages]
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <CategoryFilter
            // When a category is picked, write categoryName into URL
            onPick={(name) => {
              const next = new URLSearchParams(params);
              if (name) next.set("categoryName", name);
              else next.delete("categoryName");
              next.delete("page");
              navigate(`/?${next.toString()}`);
            }}
            activeName={categoryName}
          />
          <div className="flex-1">
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Search posts…"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {q || categoryName ? (
            <Link
              to="/"
              className="text-sm text-indigo-300 hover:text-indigo-200 underline"
            >
              Clear filters
            </Link>
          ) : null}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <GridSkeleton />
        ) : data.items.length === 0 ? (
          <EmptyState q={q} categoryName={categoryName} />
        ) : (
          <>
            <section className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
              {data.items.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </section>

            <Pagination pages={pages} page={data.page} />
          </>
        )}
      </main>
    </div>
  );
}

function Pagination({ pages, page }) {
  if (!pages?.length) return null;
  return (
    <div className="flex justify-center gap-2 py-8">
      {pages.map((n) => (
        <Link
          key={n}
          to={`?page=${n}`}
          className={`px-4 py-2 rounded-xl border border-slate-800 ${
            n === page
              ? "bg-indigo-600 text-white"
              : "bg-slate-900 text-slate-200 hover:bg-slate-800"
          }`}
        >
          {n}
        </Link>
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <section className="grid gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-slate-800" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-24 bg-slate-800 rounded" />
            <div className="h-6 w-3/4 bg-slate-800 rounded" />
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-5/6 bg-slate-800 rounded" />
          </div>
        </div>
      ))}
    </section>
  );
}

function EmptyState({ q, categoryName }) {
  return (
    <div className="text-center text-slate-300 py-16">
      <div className="text-2xl font-semibold text-white">No posts found</div>
      {(q || categoryName) && (
        <p className="mt-2 text-slate-400">
          Try clearing filters or using a different search.
        </p>
      )}
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
      >
        Reset filters
      </Link>
    </div>
  );
}
