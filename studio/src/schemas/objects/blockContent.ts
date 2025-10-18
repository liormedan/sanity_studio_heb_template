import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'תוכן עשיר',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'רגיל', value: 'normal'},
        {title: 'כותרת 2', value: 'h2'},
        {title: 'כותרת 3', value: 'h3'},
        {title: 'ציטוט', value: 'blockquote'},
      ],
      lists: [{title: 'נקודות', value: 'bullet'}, {title: 'מספור', value: 'number'}],
      marks: {
        decorators: [
          {title: 'מודגש', value: 'strong'},
          {title: 'נטוי', value: 'em'},
          {title: 'קו תחתון', value: 'underline'},
          {title: 'קו חוצה', value: 'strike-through'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'קישור',
            fields: [
              {name: 'href', type: 'url', title: 'כתובת'},
              {name: 'blank', type: 'boolean', title: 'פתיחה בחלון חדש'},
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'image', options: {hotspot: true}}),
  ],
})

