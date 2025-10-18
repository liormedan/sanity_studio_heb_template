import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mainImage',
  title: 'תמונה',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'טקסט חלופי',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'כיתוב',
      type: 'string',
    }),
  ],
})

