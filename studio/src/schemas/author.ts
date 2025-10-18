import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'מחבר',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'שם', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'slug', title: 'נתיב', type: 'slug', options: {source: 'name'}}),
    defineField({name: 'image', title: 'תמונה', type: 'mainImage'}),
    defineField({name: 'bio', title: 'ביוגרפיה', type: 'blockContent'}),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})

