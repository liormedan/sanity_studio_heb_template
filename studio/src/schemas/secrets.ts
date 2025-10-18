import {defineField, defineType} from 'sanity'
import SecretInput from '../components/SecretInput'

export default defineType({
  name: 'secrets',
  title: 'סודות חיבור',
  type: 'document',
  fields: [
    defineField({
      name: 'previewSecret',
      title: 'PREVIEW_SECRET',
      type: 'string',
      components: {input: SecretInput as any},
      description: 'מחרוזת אקראית לפריוויו באתר (אל תחשוף בצד לקוח)',
    }),
    defineField({
      name: 'webhookSecret',
      title: 'WEBHOOK_SECRET',
      type: 'string',
      components: {input: SecretInput as any},
      description: 'סוד לאימות Webhooks מהאתר/פרונט־אנד',
    }),
    defineField({
      name: 'readToken',
      title: 'SANITY_READ_TOKEN',
      type: 'string',
      components: {input: SecretInput as any},
      description:
        'טוקן קריאה לשרת בלבד. מומלץ לשמור בסביבת השרת, לא להיחשף בדפדפן.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'סודות חיבור'}
    },
  },
})

