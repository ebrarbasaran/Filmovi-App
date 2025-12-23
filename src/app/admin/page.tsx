import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import StatsCard from './components/StatsCard';

export default async function AdminPage() {
    const session = await auth();
    if (!session) redirect("/login");
    if (session?.user.role !== "ADMIN") {
        redirect("/unauthorized")
    }
    console.log("user: ", session?.user)
    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>Admin Dashboard</h1>
            <p className='text-gray-600'>
                Welcome, {session?.user.email}
            </p>
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Users" value={128} />
                <StatsCard title="Total Movies" value={56} />
                <StatsCard title="Total Reviews" value={342} />
                <StatsCard title="Admin Users" value={1} />
            </div>
        </div>
    )
}
