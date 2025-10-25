import { client, queries } from '@/lib/sanity'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  categories?: Array<{ title: string; slug: { current: string } }>
}

export default async function Home() {
  const posts: Post[] = await client.fetch(queries.posts)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              ברוכים הבאים לאתר שלי
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              אתר תוכן בעברית עם מערכת ניהול תוכן מתקדמת
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex justify-center gap-4 mb-8">
            <Link 
              href="https://sanity-studio-heb-template-studio.vercel.app" 
              target="_blank"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg"
            >
              🎛️ סטודיו ניהול
            </Link>
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-lg border">
              📧 צור קשר
            </button>
          </nav>
        </header>

        <main>
          {/* Content Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                📝 פוסטים אחרונים
              </h2>
              <p className="text-gray-600">
                התוכן החדש ביותר באתר
              </p>
            </div>
            
            {posts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    עדיין אין תוכן באתר
                  </h3>
                  <p className="text-gray-600 mb-8">
                    התחל ליצור תוכן מעניין עם סטודיו הניהול המתקדם שלנו
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Link 
                    href="https://sanity-studio-heb-template-studio.vercel.app" 
                    target="_blank"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105"
                  >
                    🚀 התחל ליצור תוכן עכשיו
                  </Link>
                  
                  <div className="text-sm text-gray-500 mt-4">
                    <p>✨ ממשק ניהול בעברית</p>
                    <p>🎨 עורך טקסט מתקדם</p>
                    <p>📱 רספונסיבי ומהיר</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article 
                    key={post._id}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      <Link 
                        href={`/posts/${post.slug.current}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <time 
                        dateTime={post.publishedAt}
                        className="text-sm text-gray-500 font-medium"
                      >
                        {new Date(post.publishedAt).toLocaleDateString('he-IL')}
                      </time>
                      
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2">
                          {post.categories.map((category) => (
                            <span 
                              key={category.slug.current}
                              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                מערכת ניהול תוכן בעברית
              </h3>
              <p className="text-gray-600">
                נבנה עם ❤️ באמצעות Next.js ו-Sanity CMS
              </p>
            </div>
            
            <div className="flex justify-center gap-6 mb-6">
              <Link 
                href="https://sanity-studio-heb-template-studio.vercel.app" 
                target="_blank"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                🎛️ סטודיו ניהול
              </Link>
              <span className="text-gray-400">|</span>
              <a 
                href="https://github.com/liormedan/sanity_studio_heb_template" 
                target="_blank"
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                📂 קוד מקור
              </a>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>© 2024 - מערכת CMS בעברית</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}