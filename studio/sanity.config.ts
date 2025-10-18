import {defineConfig} from 'sanity'
import {deskTool, defaultDocumentActions} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import RtlLayout from './src/components/RtlLayout'
import {schemaTypes} from './src/schemas'
import sideMenuTool from './src/tools/sideMenu'
import onboardingTool from './src/tools/onboarding'
import docsTool from './src/tools/docs'

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
      structure: (S, context) =>
        S.list()
          .id('root')
          .title('תוכן')
          .items([
            S.divider(),
            S.listItem()
              .id('contentGroup')
              .title('תוכן')
              .child(
                S.list()
                  .id('contentList')
                  .title('תוכן')
                  .items([
                    S.listItem()
                      .id('pages')
                      .title('דפים')
                      .schemaType('page')
                      .child(
                        S.documentTypeList('page')
                          .id('pageList')
                          .title('דפים')
                      ),
                    S.listItem()
                      .id('posts')
                      .title('פוסטים')
                      .schemaType('post')
                      .child(
                        S.documentTypeList('post')
                          .id('postList')
                          .title('פוסטים')
                      ),
                    S.listItem()
                      .id('categories')
                      .title('קטגוריות')
                      .schemaType('category')
                      .child(
                        S.documentTypeList('category')
                          .id('categoryList')
                          .title('קטגוריות')
                      ),
                    S.listItem()
                      .id('authors')
                      .title('מחברים')
                      .schemaType('author')
                      .child(
                        S.documentTypeList('author')
                          .id('authorList')
                          .title('מחברים')
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .id('accountGroupPublic')
              .title('חשבון')
              .child(
                S.list()
                  .id('accountList')
                  .title('חשבון')
                  .items([
                    S.listItem()
                      .id('accountDoc')
                      .title('פרטי חשבון')
                      .schemaType('account')
                      .child(
                        S.document()
                          .schemaType('account')
                          .documentId('account')
                          .title('פרטי חשבון')
                      ),
                    S.listItem()
                      .id('secretsDoc')
                      .title('סודות חיבור')
                      .schemaType('secrets')
                      .child(
                        S.document()
                          .schemaType('secrets')
                          .documentId('secrets')
                          .title('סודות חיבור')
                      ),
                  ])
              ),
            ...(context.currentUser?.roles?.some((r: any) => ['administrator', 'developer'].includes(r.name))
              ? [
                  S.listItem()
                    .id('accountGroup')
                    .title('חשבון')
                    .child(
                      S.list()
                        .id('accountList')
                        .title('חשבון')
                        .items([
                          S.listItem()
                            .id('accountDoc')
                            .title('פרטי חשבון')
                            .schemaType('account')
                            .child(
                              S.document()
                                .schemaType('account')
                                .documentId('account')
                                .title('פרטי חשבון')
                            ),
                          S.listItem()
                            .id('secretsDoc')
                            .title('סודות חיבור')
                            .schemaType('secrets')
                            .child(
                              S.document()
                                .schemaType('secrets')
                                .documentId('secrets')
                                .title('סודות חיבור')
                            ),
                        ])
                    ),
                ]
              : []),
            S.listItem()
              .id('globals')
              .title('גלובלים')
              .child(
                S.list()
                  .id('globalsList')
                  .title('גלובלים')
                  .items([
                    S.listItem()
                      .id('siteSettings')
                      .title('הגדרות אתר')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('הגדרות אתר')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool({name: 'vision', title: 'שאילתות'}),
    sideMenuTool(),
    onboardingTool(),
    docsTool(),
  ],

  

  studio: {
    components: {
      layout: RtlLayout,
    },
  },

  // Customize tool list: Hebrew titles, hide unsupported tools
  tools: (prev) =>
    prev
      // hide Tasks tool if present
      .filter((tool) => tool.name !== 'tasks')
      // ensure Vision title is Hebrew
      .map((tool) => (tool.name === 'vision' ? {...tool, title: 'שאילתות'} : tool)),

  document: {
    // Limit actions for singleton documents
    actions: (prev, context) => {
      const singletons = ['siteSettings', 'account', 'secrets']
      if (singletons.includes(context.schemaType)) {
        return prev.filter((action: any) => !['duplicate', 'delete'].includes(action.action))
      }
      return prev
    },
    // Optional: label singletons
    // badges: (prev, context) => {
    //   const singletons = ['siteSettings', 'account', 'secrets']
    //   if (singletons.includes(context.schemaType)) return [{label: 'Singleton'}]
    //   return prev
    // },
  },
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates,
      {
        id: 'page-default',
        title: 'דף חדש',
        schemaType: 'page',
        value: {
          content: [
            {"_type": 'block', style: 'h2', children: [{"_type": 'span', text: 'כותרת'}]},
            {"_type": 'block', children: [{"_type": 'span', text: 'תוכן הדף...'}]},
          ],
        },
      },
      {
        id: 'post-default',
        title: 'פוסט חדש',
        schemaType: 'post',
        value: {publishedAt: new Date().toISOString()},
      },
    ],
  },
})
