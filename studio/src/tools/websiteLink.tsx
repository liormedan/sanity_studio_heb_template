import React from 'react'
import {definePlugin} from 'sanity'

function WebsiteLinkTool() {
  return (
    <div className="p-8 text-center" dir="rtl">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          🌐 האתר הציבורי שלך
        </h1>
        <p className="text-gray-600 mb-6">
          לחץ כדי לראות איך האתר נראה למבקרים
        </p>
        <a 
          href="https://sanity-studio-heb-template-website.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg transition-colors font-medium text-lg"
        >
          🚀 פתח את האתר
        </a>
        <div className="mt-6 text-sm text-gray-500">
          <p>האתר מתעדכן אוטומטית כשאתה משנה תוכן כאן</p>
        </div>
      </div>
    </div>
  )
}

export default definePlugin({
  name: 'website-link',
  tools: [
    {
      name: 'website',
      title: 'צפה באתר',
      component: WebsiteLinkTool,
      icon: () => '🌐',
    },
  ],
})