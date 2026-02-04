import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import { Facebook, Linkedin } from "lucide-react";

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
                  <span className="sr-only">Share on Facebook</span>
                  <Facebook size={20} />
                </button>
                <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <span className="sr-only">Share on LinkedIn</span>
                  <Linkedin size={20} />
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
