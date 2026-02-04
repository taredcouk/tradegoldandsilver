import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { id } = await params;

  await dbConnect();

  let post;
  try {
    post = await Blog.findById(id);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />

      {/* Article Header */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover opacity-20 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8 font-medium transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.author}
              </span>
              <span className="text-slate-400 text-sm">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full mb-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-amber-500/10">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-invert prose-amber max-w-none">
              <div className="text-lg leading-relaxed text-slate-300 space-y-6 whitespace-pre-wrap">
                {post.body}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{post.author}</div>
                  <div className="text-slate-500 text-sm">Expert Precious Metals Analyst</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
