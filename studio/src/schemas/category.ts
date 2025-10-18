import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'קטגוריה',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'שם', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'slug', title: 'נתיב', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'description', title: 'תיאור', type: 'text'}),
  ],
  preview: {select: {title: 'title'}},
})

