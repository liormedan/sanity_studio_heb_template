import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'הגדרות אתר',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'כותרת אתר',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'לוגו',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'siteTitle'},
    prepare({title}) {
      return {title: title || 'הגדרות אתר'}
    },
  },
})

