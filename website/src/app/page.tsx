import { client, queries } from '@/lib/sanity'
import Link from 'next/link'
import ClientLayout from './ClientLayout'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  categories?: Array<{ title: string; slug: { current: string } }>
}

export default async function Home() {
  try {
    const posts: Post[] = await client.fetch(queries.posts)
    console.log('Posts fetched:', posts.length)
    
    return (
      <ClientLayout posts={posts} />
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    
    // אם יש שגיאה, נציג הודעה ידידותית
    return (
      <ClientLayout posts={[]} />
    )
  }
}

// Force dynamic rendering for immediate updates
export const dynamic = 'force-dynamic'