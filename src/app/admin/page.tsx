import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma";
import StatsCard from "./components/StatsCard";
import SignoutButton from "@/components/common/SignoutButton";

export default async function AdminPage() {
    const session = await auth();
    if (!session) redirect("/login");
    if (session?.user.role !== "ADMIN") {
        redirect("/unauthorized");
    }
    const [totalUsers, adminUsers] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { role: "ADMIN" } }),
    ]);
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Welcome, {session?.user.email}</p>
                </div>
                <SignoutButton/>
            </div>

            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Users" value={totalUsers} />
                {/* movie ve review kismini guncelledikten sonra burayi da guncelle */}
                <StatsCard title="Total Movies" value={56} />
                <StatsCard title="Total Reviews" value={342} />
                <StatsCard title="Admin Users" value={adminUsers} />
            </div>
        </div>
    );
}
