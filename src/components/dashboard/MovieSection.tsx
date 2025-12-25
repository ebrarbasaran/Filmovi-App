import React from 'react'

export default function MovieSection({title}: {title: string}) {
    return (
        <section className="max-w-7xl mx-auto px-6">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-2/3 rounded bg-gray-200 animate-pulse"
                    />
                ))}
            </div>
        </section>
    )
}
