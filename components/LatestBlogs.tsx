import Link from "next/link";
import Image from "next/image";
import { dbConnect } from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";

export default async function LatestBlogs() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(2);

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
            Latest Trading <span className="text-amber-500">News & Analysis</span>
          </h2>
          <Link
            href="/blog"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog: IBlog) => (
            <div
              key={blog._id.toString()}
              className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 transition-all group"
            >
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors leading-tight">
                {blog.title}.
              </h3>
              <p className="text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed">
                {blog.body}
              </p>
              <Link
                href={`/blog/${blog._id}`}
                className="text-amber-500 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm group/link"
              >
                Read More
                <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
