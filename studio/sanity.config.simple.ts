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
          .id('root')
          .title('תוכן')
          .items([
            // דפים
            S.listItem()
              .id('pages')
              .title('📄 דפים')
              .schemaType('page')
              .child(
                S.documentTypeList('page')
                  .title('דפים')
              ),
            
            // פוסטים
            S.listItem()
              .id('posts')
              .title('📝 פוסטים')
              .schemaType('post')
              .child(
                S.documentTypeList('post')
                  .title('פוסטים')
              ),
            
            // קטגוריות
            S.listItem()
              .id('categories')
              .title('🏷️ קטגוריות')
              .schemaType('category')
              .child(
                S.documentTypeList('category')
                  .title('קטגוריות')
              ),

            S.divider(),
            
            // הגדרות אתר
            S.listItem()
              .id('siteSettings')
              .title('⚙️ הגדרות אתר')
              .schemaType('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('הגדרות אתר')
              ),
          ]),
    }),
    visionTool({name: 'vision', title: 'שאילתות'}),
  ],

  studio: {
    components: {
      layout: RtlLayout,
    },
  },

  document: {
    // מניעת מחיקה/שכפול של הגדרות אתר
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings') {
        return prev.filter((action: any) => !['duplicate', 'delete'].includes(action.action))
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})