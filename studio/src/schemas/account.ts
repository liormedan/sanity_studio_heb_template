import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'account',
  title: 'פרטי חשבון',
  type: 'document',
  fields: [
    defineField({name: 'organization', title: 'ארגון', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'contactEmail', title: 'אימייל איש קשר', type: 'string'}),
    defineField({name: 'defaultLocale', title: 'שפת ברירת מחדל', type: 'string', initialValue: 'he-IL'}),
    defineField({name: 'timezone', title: 'אזור זמן', type: 'string', initialValue: 'Asia/Jerusalem'}),
    defineField({name: 'notes', title: 'הערות', type: 'text'}),
  ],
  preview: {
    select: {title: 'organization', subtitle: 'contactEmail'},
    prepare({title, subtitle}) {
      return {title: title || 'פרטי חשבון', subtitle}
    },
  },
})

