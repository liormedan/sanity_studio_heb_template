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
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              ברוכים הבאים לבלוג שלי
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              מקום לחשיבות, רעיונות וסיפורים בעברית
            </p>
          </div>
          
          {/* Simple Navigation */}
          <nav className="flex justify-center gap-6 text-gray-600">
            <a href="#posts" className="hover:text-indigo-600 transition-colors font-medium">
              📝 פוסטים
            </a>
            <a href="#about" className="hover:text-indigo-600 transition-colors font-medium">
              👤 אודות
            </a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors font-medium">
              📧 צור קשר
            </a>
          </nav>
        </header>

        <main>
          {/* Content Section */}
          <section id="posts" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                📝 פוסטים אחרונים
              </h2>
              <p className="text-gray-600">
                {posts.length > 0 ? `${posts.length} פוסטים באתר` : 'התוכן החדש ביותר באתר'}
              </p>
            </div>
            
            {posts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  בקרוב יהיה כאן תוכן מעניין
                </h3>
                <p className="text-gray-600">
                  הבלוג בהכנה, חזרו בקרוב לתוכן חדש ומעניין
                </p>
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

          {/* About Section */}
          <section id="about" className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  👤 אודות הבלוג
                </h2>
              </div>
              <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
                <p className="text-center">
                  ברוכים הבאים לבלוג שלי! כאן אני חולק מחשבות, רעיונות וחוויות בעברית.
                  המטרה היא ליצור מקום לדיון פתוח ולחשיבה ביקורתית על נושאים שונים.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-16">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-12 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                📧 צור קשר
              </h2>
              <p className="text-gray-600 mb-6">
                יש לך שאלה או הערה? אשמח לשמוע ממך
              </p>
              <div className="space-y-3 text-gray-600">
                <p>📧 email@example.com</p>
                <p>🐦 @twitter_handle</p>
                <p>💼 LinkedIn Profile</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                הבלוג שלי
              </h3>
              <p className="text-gray-600">
                מקום לחשיבות ורעיונות בעברית
              </p>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>© 2024 - כל הזכויות שמורות</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}