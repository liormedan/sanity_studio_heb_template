import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'כותרת מטא',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('מומלץ עד 60 תווים'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'תיאור מטא',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('מומלץ עד 160 תווים'),
    }),
    defineField({
      name: 'ogImage',
      title: 'תמונת שיתוף (OG)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'טקסט חלופי',
          type: 'string',
        }),
      ],
    }),
  ],
})

