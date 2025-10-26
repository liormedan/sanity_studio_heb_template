import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // בדיקת סוד האבטחה (אופציונלי)
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.REVALIDATE_SECRET && process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // רענון דף הבית
    revalidatePath('/')
    
    // אם זה פוסט, רענן גם את דף הפוסט
    if (body._type === 'post' && body.slug?.current) {
      revalidatePath(`/posts/${body.slug.current}`)
    }
    
    // רענון כללי של תגיות (אופציונלי)
    // revalidateTag('posts')
    
    console.log('Revalidated paths after Sanity webhook')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      paths: ['/', body.slug?.current ? `/posts/${body.slug.current}` : null].filter(Boolean)
    })
  } catch (error) {
    console.error('Error in revalidate webhook:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}