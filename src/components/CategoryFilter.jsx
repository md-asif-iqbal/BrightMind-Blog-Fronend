import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api.js";

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const activeName = (params.get("categoryName") || "").toLowerCase();

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await api.get("/categories");
        if (ok) setCategories(r.data || []);
      } catch {
        if (ok) setCategories([]);
      }
    })();
    return () => {
      ok = false;
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 text-sm"
      >
        {activeName || "Categories"} ▾
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-64 max-h-80 overflow-auto bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`block px-2 py-2 rounded-lg text-sm ${
              !activeName
                ? "bg-slate-800 text-indigo-200"
                : "text-slate-200 hover:bg-slate-800"
            }`}
          >
            All
          </Link>

          {categories.map((c) => {
            const slug = (c.slug || c.name).toLowerCase();
            return (
              <Link
                key={c._id}
                to={`/?categoryName=${encodeURIComponent(slug)}`}
                onClick={() => setOpen(false)}
                className={`block px-2 py-2 rounded-lg text-sm ${
                  activeName === slug
                    ? "bg-slate-800 text-indigo-200"
                    : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
