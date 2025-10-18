import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import RtlLayout from './src/components/RtlLayout'
import {schemaTypes} from './src/schemas'

export default defineConfig({
  name: 'hebrew-content-studio',
  title: 'סטודיו תוכן בעברית',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  basePath: '/',

  plugins: [
    deskTool({
      name: 'desk',
      title: 'ניהול תוכן',
      structure: (S) =>
        S.list()
          .title('תוכן')
          .items([
            S.listItem()
              .title('דפים')
              .schemaType('page')
              .child(S.documentTypeList('page').title('דפים')),
            S.listItem()
              .title('הגדרות אתר')
              .schemaType('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool({name: 'vision', title: 'Vision (שאילתות)'}),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      layout: RtlLayout,
    },
  },
})

