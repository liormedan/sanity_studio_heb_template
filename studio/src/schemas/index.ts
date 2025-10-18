import page from './page'
import post from './post'
import author from './author'
import category from './category'
import siteSettings from './siteSettings'
import account from './account'
import secrets from './secrets'

import seo from './objects/seo'
import mainImage from './objects/mainImage'
import blockContent from './objects/blockContent'

export const schemaTypes = [
  // documents
  page,
  post,
  author,
  category,
  siteSettings,
  account,
  secrets,
  // objects
  seo,
  mainImage,
  blockContent,
]
