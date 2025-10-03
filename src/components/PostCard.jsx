import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function PostCard({ post }) {
  const img = post.bannerUrl || `https://picsum.photos/seed/${post.slug}/800/450`;
  const date = post.createdAt ? format(new Date(post.createdAt), "MMMM d, yyyy") : "";

  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/post/${post.slug}`} className="block">
        <img
          src={img}
          alt={post.title}
          className="w-full h-44 md:h-48 object-cover"
          loading="lazy"
        />
      </Link>

      <div className="p-4 md:p-5 text-slate-200">
        <div className="mb-2">
          {post.category?.name && (
            <Link
              to={`/?category=${post.category.slug}`}
              className="text-xs text-indigo-300 hover:text-indigo-200"
            >
              {post.category.name}
            </Link>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-semibold leading-tight text-white">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-sm md:text-[15px] text-slate-400 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-[13px] text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
              {String(post.author?.name || "A")
                .slice(0, 1)
                .toUpperCase()}
            </div>
            <span className="text-slate-300">
              Author: <span className="text-slate-200">{post.author?.name || "—"}</span>
            </span>
          </div>
          <span className="opacity-60">•</span>
          <span>Date: {date || "—"}</span>
        </div>
      </div>
    </article>
  );
}
