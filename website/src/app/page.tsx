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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ברוכים הבאים לאתר שלי
          </h1>
          <p className="text-xl text-gray-600">
            אתר תוכן בעברית עם Sanity
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              פוסטים אחרונים
            </h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  עדיין אין פוסטים באתר
                </p>
                <Link 
                  href="http://localhost:3333" 
                  target="_blank"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  פתח את סטודיו הניהול ליצירת תוכן
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article 
                    key={post._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      <Link 
                        href={`/posts/${post.slug.current}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('he-IL')}
                      </time>
                      
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2">
                          {post.categories.map((category) => (
                            <span 
                              key={category.slug.current}
                              className="bg-gray-100 px-2 py-1 rounded text-xs"
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

        <footer className="text-center py-8 border-t border-gray-200 mt-12">
          <p className="text-gray-600">
            נבנה עם Next.js ו-Sanity
          </p>
        </footer>
      </div>
    </div>
  )
}