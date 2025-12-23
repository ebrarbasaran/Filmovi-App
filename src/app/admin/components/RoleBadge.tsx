import React from "react";

interface RoleBadgeProps {
    role: "ADMIN" | "USER";
}
export default function RoleBadge({ role }: RoleBadgeProps) {
    const isAdmin = role === "ADMIN";
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
        ${isAdmin ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}
      `}
        >
            {role}
        </span>
    );
}
