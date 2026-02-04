import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Why Gold is the Ultimate Hedge Against Inflation",
    excerpt: "In uncertain economic times, gold has historically maintained its value and purchasing power...",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=2070&auto=format&fit=crop",
    category: "Market Analysis"
  },
  {
    id: 2,
    title: "Understanding Silver's Industrial Demand",
    excerpt: "Silver isn't just a precious metal; it's a critical component in electronics and renewable energy...",
    date: "May 10, 2024",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop",
    category: "Investing"
  },
  {
    id: 3,
    title: "How to Securely Store Your Precious Metals",
    excerpt: "Once you've bought your bullion, the next question is how to keep it safe. We explore several options...",
    date: "May 5, 2024",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    category: "Guide"
  },
  {
    id: 4,
    title: "Central Banks and Gold Reserves in 2024",
    excerpt: "Why central banks around the world are increasing their gold holdings at record rates...",
    date: "April 28, 2024",
    image: "https://images.unsplash.com/photo-1621504450181-5d356f63d3ee?q=80&w=2070&auto=format&fit=crop",
    category: "Economics"
  }
];

export default function BlogPage() {
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
            {blogPosts.map((post) => (
              <article key={post.id} className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all">
                <div className="relative h-64 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-slate-500 text-sm mb-3">{post.date}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
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
