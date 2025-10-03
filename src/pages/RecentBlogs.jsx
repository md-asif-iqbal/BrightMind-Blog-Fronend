import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RECENT_POSTS } from "../data/recentPosts.js";

export default function RecentBlogs() {
  const [params] = useSearchParams();
  const page = Math.max(1, Number(params.get("page") || 1));
  const perPage = 10;
  const total = RECENT_POSTS.length;
  const pages = Math.max(1, Math.ceil(total / perPage));

  const slice = useMemo(() => {
    const start = (page - 1) * perPage;
    return RECENT_POSTS.slice(start, start + perPage);
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-6">
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Recent <span className="text-indigo-400">Blogs</span>
            </h2>
          </div>
          <p className="text-slate-400">
            We follow agile methodology to deliver high quality work fast, aligned to deadlines.
          </p>
        </div>

        <section className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {slice.map((p) => (
            <article
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:translate-y-[-2px] transition"
            >
              <img
                src={p.bannerUrl}
                alt={p.title}
                className="w-full h-44 md:h-48 object-cover"
              />
              <div className="p-5">
                <div className="text-xs text-indigo-300">{p.category}</div>
                <Link
                  to={`/post/${p.slug}`}
                  className="mt-1 block text-white font-semibold leading-snug hover:underline"
                >
                  {p.title}
                </Link>
                <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/40?img=${p.id % 70}`}
                      className="h-6 w-6 rounded-full"
                      alt=""
                    />
                    <span>{p.author}</span>
                  </div>
                  <span>•</span>
                  <time dateTime={p.dateISO}>
                    {new Date(p.dateISO).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </section>

        <Pagination pages={pages} page={page} />
      </div>
    </div>
  );
}

function Pagination({ pages, page }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav className="mt-10 flex justify-center gap-1">
      {nums.map((n) => (
        <Link
          key={n}
          to={`/recent?page=${n}`}
          className={`px-3 py-1.5 rounded-md text-sm border border-slate-800 ${
            n === page
              ? "bg-indigo-600 text-white"
              : "bg-slate-900 text-slate-200 hover:bg-slate-800"
          }`}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}