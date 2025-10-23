import {defineField, defineType} from 'sanity'

export default defineType({
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
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required()
    }),
    
    defineField({
      name: 'excerpt', 
      title: 'תקציר קצר', 
      type: 'text', 
      rows: 2,
      description: 'תיאור קצר של הפוסט'
    }),
    
    defineField({
      name: 'categories', 
      title: 'קטגוריות', 
      type: 'array', 
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (R) => R.max(3)
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
      title: 'תוכן הפוסט', 
      type: 'blockContent'
    }),
  ],
  
  orderings: [
    {
      title: 'האחרונים קודם', 
      name: 'publishedAtDesc', 
      by: [{field: 'publishedAt', direction: 'desc'}]
    },
  ],
  
  preview: {
    select: {
      title: 'title', 
      subtitle: 'excerpt',
      media: 'mainImage'
    },
  },
})