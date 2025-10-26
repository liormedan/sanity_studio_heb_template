import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import RtlLayout from './src/components/RtlLayout'

// סכמות
import page from './src/schemas/page'
import category from './src/schemas/category'
import siteSettings from './src/schemas/siteSettings'

// אובייקטים
import seo from './src/schemas/objects/seo'
import mainImage from './src/schemas/objects/mainImage'
import blockContent from './src/schemas/objects/blockContent'

// פוסט
import {defineField, defineType} from 'sanity'

const post = defineType({
  name: 'post',
  title: 'פוסט',
  type: 'document',
  fields: [
    defineField({
      name: 'title', 
      title: 'כותרת', 
      type: 'string', 
      validation: (R) => R.required()
    }),
    defineField({
      name: 'slug', 
      title: 'נתיב', 
      type: 'slug', 
      options: {source: 'title'},
      validation: (R) => R.required()
    }),
    defineField({
      name: 'excerpt', 
      title: 'תקציר', 
      type: 'text', 
      rows: 2
    }),
    defineField({
      name: 'categories', 
      title: 'קטגוריות', 
      type: 'array', 
      of: [{type: 'reference', to: [{type: 'category'}]}]
    }),
    defineField({
      name: 'publishedAt', 
      title: 'תאריך פרסום', 
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'mainImage', 
      title: 'תמונה ראשית', 
      type: 'mainImage'
    }),
    defineField({
      name: 'body', 
      title: 'תוכן', 
      type: 'blockContent'
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'excerpt', media: 'mainImage'},
  },
})

export default defineConfig({
  name: 'hebrew-content-studio',
  title: 'סטודיו תוכן בעברית',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  cors: {
    allowCredentials: true,
    allowOrigins: [
      'http://localhost:3000',
      'https://sanity-studio-heb-template-website.vercel.app',
      /^https:\/\/.*\.vercel\.app$/
    ]
  },

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .id('root')
          .title('ניהול תוכן')
          .items([
            S.documentTypeListItem('post').title('פוסטים'),
            S.documentTypeListItem('page').title('דפים'),
            S.documentTypeListItem('category').title('קטגוריות'),
            S.documentTypeListItem('siteSettings').title('הגדרות אתר'),
          ]),
    }),
  ],

  studio: {
    components: {
      layout: RtlLayout,
    },
  },

  tools: (prev) => prev.filter((tool) => tool.name === 'desk'),

  schema: {
    types: [
      post,
      page,
      category,
      siteSettings,
      seo,
      mainImage,
      blockContent,
    ],
  },
})