import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '7kzkwqzg', // הID של הפרויקט שלך
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// שאילתות בסיסיות
export const queries = {
  // כל הפוסטים
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    categories[]-> {
      title,
      slug
    }
  }`,
  
  // פוסט יחיד
  post: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    body,
    categories[]-> {
      title,
      slug
    }
  }`,
  
  // כל הדפים
  pages: `*[_type == "page"] {
    _id,
    title,
    slug
  }`,
  
  // דף יחיד
  page: `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    heroImage
  }`,
  
  // הגדרות אתר
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    logo
  }`
}