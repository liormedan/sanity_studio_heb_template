'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  categories?: Array<{ title: string; slug: { current: string } }>
}

interface ClientLayoutProps {
  posts: Post[]
}

export default function ClientLayout({ posts }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('posts')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['posts', 'about', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black" dir="rtl">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl border border-gray-700 text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-l border-gray-700 z-40 p-6 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              הבלוג שלי
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              מקום לחשיבות, רעיונות וסיפורים בעברית
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-3 flex-1">
            <a 
              href="#posts" 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-white rounded-xl transition-all duration-300 group relative ${
                activeSection === 'posts' 
                  ? 'bg-purple-600/30 border-r-2 border-purple-400' 
                  : 'hover:bg-purple-600/20'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">📝</span>
              <span className="font-medium">פוסטים</span>
            </a>
            <a 
              href="#about" 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-white rounded-xl transition-all duration-300 group relative ${
                activeSection === 'about' 
                  ? 'bg-purple-600/30 border-r-2 border-purple-400' 
                  : 'hover:bg-purple-600/20'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">👤</span>
              <span className="font-medium">אודות</span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-white rounded-xl transition-all duration-300 group relative ${
                activeSection === 'contact' 
                  ? 'bg-purple-600/30 border-r-2 border-purple-400' 
                  : 'hover:bg-purple-600/20'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
              <span className="font-medium">צור קשר</span>
            </a>
          </div>
          
          {/* Footer in Sidebar */}
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-500 text-xs text-center">© 2024 - כל הזכויות שמורות</p>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content with margin for sidebar */}
      <div className="md:mr-64">
        {/* Header */}
        <div className="relative bg-gray-900 py-8">
          <div className="container mx-auto px-6">
            <header className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ברוכים הבאים
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
            </header>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <main>
              {/* Posts Section */}
              <section id="posts" className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    פוסטים אחרונים
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-300">
                    {posts.length > 0 ? `${posts.length} פוסטים באתר` : 'התוכן החדש ביותר באתר'}
                  </p>
                </div>
                
                {posts.length === 0 ? (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-16 text-center max-w-3xl mx-auto border border-gray-700 animate-fade-in-up">
                    <div className="text-8xl mb-8">📚</div>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      בקרוב יהיה כאן תוכן מעניין
                    </h3>
                    <p className="text-xl text-gray-300">
                      הבלוג בהכנה, חזרו בקרוב לתוכן חדש ומעניין
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                      <article 
                        key={post._id}
                        className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden border border-gray-700 hover:border-purple-400/50 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                            <time 
                              dateTime={post.publishedAt}
                              className="text-sm text-gray-400 font-medium"
                            >
                              {new Date(post.publishedAt).toLocaleDateString('he-IL')}
                            </time>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                            <Link 
                              href={`/posts/${post.slug.current}`}
                              className="hover:text-purple-400 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          
                          {post.excerpt && (
                            <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                          
                          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                            <Link 
                              href={`/posts/${post.slug.current}`}
                              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                              קרא עוד
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </Link>
                            
                            {post.categories && post.categories.length > 0 && (
                              <div className="flex gap-2">
                                {post.categories.slice(0, 2).map((category) => (
                                  <span 
                                    key={category.slug.current}
                                    className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-700/50"
                                  >
                                    {category.title}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* About Section */}
              <section id="about" className="mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-700">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-3 text-white">
                      אודות הבלוג
                    </h2>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-4"></div>
                  </div>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-gray-300 leading-relaxed text-center mb-6">
                      ברוכים הבאים לבלוג שלי! כאן אני חולק מחשבות, רעיונות וחוויות בעברית.
                      המטרה היא ליצור מקום לדיון פתוח ולחשיבה ביקורתית על נושאים שונים.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                          ✍️
                        </div>
                        <h3 className="font-bold text-white mb-1 text-sm">כתיבה איכותית</h3>
                        <p className="text-gray-400 text-xs">תוכן מעמיק ומחושב</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                          💡
                        </div>
                        <h3 className="font-bold text-white mb-1 text-sm">רעיונות חדשים</h3>
                        <p className="text-gray-400 text-xs">פרספקטיבות מעניינות</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-lg mx-auto mb-3">
                          🤝
                        </div>
                        <h3 className="font-bold text-white mb-1 text-sm">קהילה</h3>
                        <p className="text-gray-400 text-xs">דיון פתוח ובונה</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="mb-12">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center text-white border border-purple-700/50">
                  <h2 className="text-2xl font-bold mb-3">
                    בואו נתחבר
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-4"></div>
                  <p className="text-purple-100 mb-6">
                    יש לך שאלה, הערה או רעיון לשיתוף פעולה? אשמח לשמוע ממך
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="mailto:email@example.com" className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                      <div className="text-2xl mb-2">📧</div>
                      <h3 className="font-bold mb-1 text-sm">אימייל</h3>
                      <p className="text-purple-200 text-xs">email@example.com</p>
                    </a>
                    <a href="#" className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                      <div className="text-2xl mb-2">🐦</div>
                      <h3 className="font-bold mb-1 text-sm">טוויטר</h3>
                      <p className="text-purple-200 text-xs">@twitter_handle</p>
                    </a>
                    <a href="#" className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/10">
                      <div className="text-2xl mb-2">💼</div>
                      <h3 className="font-bold mb-1 text-sm">לינקדאין</h3>
                      <p className="text-purple-200 text-xs">LinkedIn Profile</p>
                    </a>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}