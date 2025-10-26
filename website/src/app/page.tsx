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
  const posts: Post[] = await client.fetch(queries.posts)
  
  return (
    <ClientLayout posts={posts} />
  )
}