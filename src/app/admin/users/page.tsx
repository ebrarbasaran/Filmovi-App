import { prisma } from '@/lib/prisma'
import React from 'react'
import EmptyState from '../components/EmptyState';
import RoleBadge from '../components/RoleBadge';

const AdminUsersPage = async () => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
    });
    if (users.length === 0) {
        return (
            <EmptyState title='No users found' description='There are no users registered yet' />
        );
    }
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Users</h1>

            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Username</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b last:border-0">
                                <td className="px-4 py-3 font-medium">{user.username}</td>
                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                <td className="px-4 py-3">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsersPage