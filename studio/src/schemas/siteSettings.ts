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
    defineField({
      name: 'defaultSeo',
      title: 'SEO ברירת מחדל',
      type: 'seo',
    }),
    defineField({
      name: 'social',
      title: 'קישורים חברתיים',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook', type: 'url'},
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'x', title: 'X / Twitter', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
      ],
    }),
  ],
  preview: {
    select: {title: 'siteTitle'},
    prepare({title}) {
      return {title: title || 'הגדרות אתר'}
    },
  },
})
