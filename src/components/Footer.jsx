export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 bg-white/80 border-t text-center text-sm text-zinc-600">
      <span>
        &copy; {new Date().getFullYear()} BrightMind Blog &mdash; Developed by{" "}
        <span className="font-semibold text-violet-700">Md Asif Iqbal</span>
      </span>
      <span className="mx-2">|</span>
      <span>
        Built with <span className="text-pink-500">♥</span> using React &amp; TailwindCSS
      </span>
      <span className="mx-2">|</span>
      <a
        href="https://github.com/md-asif-iqbal/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-violet-700 transition"
      >
        GitHub
      </a>
    </footer>
  );
}