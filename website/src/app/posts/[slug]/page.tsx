import { client, queries } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  body?: any
  mainImage?: any
  categories?: Array<{ title: string; slug: { current: string } }>
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PageProps) {
  try {
    const { slug } = await params
    console.log('Fetching post with slug:', slug)
    const post: Post = await client.fetch(queries.post, { slug })
    console.log('Post found:', !!post, post?.title)
    console.log('Post body:', post?.body)
    
    if (!post) {
      console.log('Post not found, calling notFound()')
      notFound()
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black" dir="rtl">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          חזרה לדף הבית
        </Link>
      </div>

      {/* Post Content */}
      <article className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-gray-400 mb-8">
              <time dateTime={post.publishedAt} className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString('he-IL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span 
                      key={category.slug.current}
                      className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-700/50"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Post Body */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700">
            {post.body && post.body.length > 0 ? (
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  {post.body.map((block: any, index: number) => {
                    if (block._type === 'block') {
                      const text = block.children?.map((child: any) => child.text).join('') || ''
                      
                      // רנדור לפי סגנון הבלוק
                      switch (block.style) {
                        case 'h1':
                          return (
                            <h1 key={index} className="text-3xl font-bold text-white mb-4">
                              {text}
                            </h1>
                          )
                        case 'h2':
                          return (
                            <h2 key={index} className="text-2xl font-bold text-white mb-3">
                              {text}
                            </h2>
                          )
                        case 'h3':
                          return (
                            <h3 key={index} className="text-xl font-bold text-white mb-2">
                              {text}
                            </h3>
                          )
                        default:
                          return (
                            <p key={index} className="text-lg leading-relaxed mb-4">
                              {text}
                            </p>
                          )
                      }
                    }
                    return null
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  תוכן הפוסט בהכנה
                </h3>
                <p className="text-gray-400">
                  התוכן המלא של הפוסט יתווסף בקרוב
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-white rounded-xl transition-all duration-300 border border-purple-500/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              חזרה לכל הפוסטים
            </Link>
          </div>
        </div>
      </article>
    </div>
  ) 
  } catch (error) {
    console.error('Error fetching post:', error)
    notFound()
  }
}

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic'

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params
    const post: Post = await client.fetch(queries.post, { slug })
    
    if (!post) {
      return {
        title: 'פוסט לא נמצא',
      }
    }

    return {
      title: post.title,
      description: post.excerpt || `קרא את הפוסט "${post.title}" בבלוג שלי`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'פוסט לא נמצא',
    }
  }
}