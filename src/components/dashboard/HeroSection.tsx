import React from 'react'

export default function HeroSection() {
  return (
     <section className="h-[60vh] bg-black text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">
          Discover Movies You’ll Love
        </h1>
        <p className="text-gray-300 max-w-xl">
          Explore trending, popular and upcoming movies.  
          Create your own watchlist.
        </p>
      </div>
    </section>
  )
}
