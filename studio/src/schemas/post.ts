import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'פוסט',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'כותרת', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'slug', title: 'נתיב', type: 'slug', options: {source: 'title', maxLength: 96}}),
    defineField({name: 'excerpt', title: 'תקציר', type: 'text', rows: 3}),
    defineField({name: 'author', title: 'מחבר', type: 'reference', to: [{type: 'author'}]}),
    defineField({name: 'categories', title: 'קטגוריות', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}]}),
    defineField({name: 'publishedAt', title: 'תאריך פרסום', type: 'datetime'}),
    defineField({name: 'mainImage', title: 'תמונה ראשית', type: 'mainImage'}),
    defineField({name: 'body', title: 'תוכן', type: 'blockContent'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {title: 'האחרונים קודם', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
    {title: 'הישנים קודם', name: 'publishedAtAsc', by: [{field: 'publishedAt', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'author.name', media: 'mainImage'},
  },
})

