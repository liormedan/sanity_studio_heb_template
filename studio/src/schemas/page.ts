import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'דף',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'נתיב (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'תמונה ראשית',
      type: 'mainImage',
    }),
    defineField({
      name: 'content',
      title: 'תוכן',
      type: 'blockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
