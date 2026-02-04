import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";

export default async function BlogPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <Hero
        title={
          <>
            <span className="text-amber-500">Gold</span> and <span className="text-slate-300">Silver</span> Blog
          </>
        }
        description="Stay informed with the latest market insights, investment strategies, and precious metals news."
        backgroundImage="https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop"
        showButtons={true}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-800 pb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Latest Articles</h2>
              <p className="text-slate-400 max-w-2xl">
                Expert analysis and guides to help you navigate the precious metals market.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4">
              <span className="text-amber-500 font-semibold cursor-pointer">All</span>
              <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">Market</span>
              <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">Investing</span>
              <span className="text-slate-500 hover:text-white transition-colors cursor-pointer">News</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {blogs.map((post: IBlog) => (
              <article key={post._id.toString()} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all">
                <div className="relative h-64 w-full">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.author}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-slate-500 text-sm mb-3">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">
                    {post.body}
                  </p>
                  <Link
                    href={`/blog/${post._id}`}
                    className="inline-flex items-center text-amber-500 font-bold hover:text-amber-400 transition-colors"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
