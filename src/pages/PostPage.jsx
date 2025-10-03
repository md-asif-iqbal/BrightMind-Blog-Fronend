// frontend/src/pages/PostPage.jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../utils/api.js';
import { format } from 'date-fns';
import { useAuth } from '../state/useAuth.js';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => { api.get(`/posts/${slug}`).then((r) => setPost(r.data)); }, [slug]);
  useEffect(() => { if (post?._id) api.get(`/comments/${post._id}`).then((r) => setComments(r.data)); }, [post?._id]);

  const submitComment = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const content = String(fd.get('content') || '').trim();
    if (!content) return;
    const r = await api.post(`/comments/${post._id}`, { content }, { headers: { Authorization: `Bearer ${token}` } });
    setComments((c) => [r.data, ...c]);
    e.currentTarget.reset();
  };

  if (!post) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <article>
        <img
          src={post.bannerUrl || `https://picsum.photos/seed/${post.slug}/1200/540`}
          className="w-full h-80 object-cover rounded-2xl"
          alt={post.title}
        />
        <div className="mt-4">
          <Link to={`/?category=${post.category?.slug}`} className="text-xs bg-zinc-100 px-2 py-1 rounded-full">
            {post.category?.name}
          </Link>
        </div>
        <h1 className="text-3xl font-semibold mt-2">{post.title}</h1>
        <div className="text-sm text-zinc-500 flex items-center gap-1">
          <span>{post.author?.name}</span>
          <span>·</span>
          <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMM d, yyyy')}</time>
        </div>
        <div className="prose prose-zinc max-w-none mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">Comments</h3>
        {user ? (
          <form onSubmit={submitComment} className="mt-3 grid gap-2">
            <textarea name="content" rows="4" placeholder="Write a comment..." className="w-full p-3 border rounded-xl" required />
            <button type="submit" className="px-4 py-2 bg-zinc-900 text-white rounded-xl">Post comment</button>
          </form>
        ) : (
          <p className="mt-2 text-sm">Please <Link to="/login" className="underline">login</Link> to comment.</p>
        )}

        <ul className="mt-4 space-y-3">
          {comments.map((c) => (
            <li key={c._id} className="border rounded-xl p-3">
              <div className="text-xs text-zinc-500 flex items-center gap-2">
                <strong className="text-zinc-800">{c.author?.name}</strong>
                <time dateTime={c.createdAt}>{format(new Date(c.createdAt), 'MMM d, yyyy')}</time>
              </div>
              <p className="mt-1">{c.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
