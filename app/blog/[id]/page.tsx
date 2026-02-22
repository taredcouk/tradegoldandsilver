import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Blog from "@/models/Blog";
import "@/models/User"; // Ensure model is registered for populate
import { notFound } from "next/navigation";
import { Facebook, Linkedin, Twitter, Globe } from "lucide-react";

interface BlogDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const { id } = await params;

  await dbConnect();

  let post;
  try {
    post = await Blog.findOne({ _id: id, status: 'published' }).populate('authorId');
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
              <div
                className="text-lg leading-relaxed text-slate-300 space-y-6"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </div>

            <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl uppercase">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{post.author}</div>
                  <div className="text-slate-500 text-sm">
                    {post.authorId?.title || "Expert Precious Metals Analyst"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {post.authorId?.socialLinks?.facebook && (
                  <a href={post.authorId.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                    <span className="sr-only">Facebook</span>
                    <Facebook size={18} />
                  </a>
                )}
                {post.authorId?.socialLinks?.linkedin && (
                  <a href={post.authorId.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin size={18} />
                  </a>
                )}
                {post.authorId?.socialLinks?.twitter && (
                  <a href={post.authorId.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                    <span className="sr-only">X (Twitter)</span>
                    <Twitter size={18} />
                  </a>
                )}
                {post.authorId?.socialLinks?.pinterest && (
                  <a href={post.authorId.socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                    <span className="sr-only">Pinterest</span>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.164 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                  </a>
                )}
                {post.authorId?.socialLinks?.website && (
                  <a href={post.authorId.socialLinks.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                    <span className="sr-only">Website</span>
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
