"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/movies", label: "Movies" },
];

export default function AdminSidebar() {
    const pathname = usePathname(); //su anki urli 

    return (
        <aside className="w-64 bg-white shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

            <nav className="space-y-2">
                {links.map((link) => {
                    const isActive =
                        link.href === "/admin"
                            ? pathname === "/admin"
                            : pathname === link.href || pathname.startsWith(link.href + "/");

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                `block rounded px-3 py-2 text-sm font-medium transition,
                                ${isActive
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }
                            `}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
