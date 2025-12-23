import React from 'react'

interface EmptyStateProps {
    title: string;
    description: string;
}
export default function EmptyState({ title, description }: EmptyStateProps) {
    return (
        <div className="rounded-xl border border-dashed p-10 text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
    )
}
