import page from './page'
import post from './post'
import category from './category'
import siteSettings from './siteSettings'

import seo from './objects/seo'
import mainImage from './objects/mainImage'
import blockContent from './objects/blockContent'

export const schemaTypes = [
  // מסמכים עיקריים
  page,
  post,
  category,
  siteSettings,
  
  // אובייקטים משותפים
  seo,
  mainImage,
  blockContent,
]