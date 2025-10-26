import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            הדף לא נמצא
          </h2>
          <p className="text-gray-600 mb-8">
            מצטערים, הדף שחיפשת לא קיים או הועבר למקום אחר.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            חזרה לעמוד הבית
          </Link>
          
          <div className="text-sm text-gray-500">
            או נסה לחפש משהו אחר
          </div>
        </div>
      </div>
    </div>
  )
}