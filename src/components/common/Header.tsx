"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { NavItem } from "@/types/navigation";
import { useSession, signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ModernHeaderAdvancedProps {
    navItems?: NavItem[];
    showBanner?: boolean;
    bannerText?: React.ReactNode;
    logo?: React.ReactNode;
}

const ModernHeaderAdvanced = ({
    navItems = [
        { name: "Home", href: "/" },
        { name: "Movies", href: "/movies" },
        { name: "Series", href: "/series" },
        { name: "Lists", href: "/lists" },
    ],
    showBanner = true,
    bannerText = (
        <>
            Explore trending, popular and upcoming movies.{" "}
            <Link href="/" className="underline underline-offset-2">
                Create your own watchlist.
            </Link>
        </>
    ),

    logo,
}: ModernHeaderAdvancedProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();
    //status degerleri loading,authenticated,unauthenticated
    const isAuthenticated = status === "authenticated";
    const user = session?.user;

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    if (status === "loading") {
        return (
            <div className="h-[70px] flex items-center px-6">
                {/* skeleton / boş header */}
            </div>
        );
    }

    return (
        <div className="text-sm w-full">
            {showBanner && (
                <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-primary-purple to-primary-orange text-white">
                    <p>{bannerText}</p>
                </div>
            )}

            <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 shadow">
                {logo || (
                    <Link href="/" className="shrink-0">
                        <AnimatedLogo />
                    </Link>
                )}

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center space-x-8 md:pl-28">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`
                  text-gray-700 text-[18px] hover:text-primary-violet transition-colors duration-200
                  ${pathname === item.href
                                        ? "text-primary-violet font-medium"
                                        : ""
                                    }
                `}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth Button */}
                <div className="hidden md:flex ml-20">
                    {!isAuthenticated ? (
                        <Link
                            href="/login"
                            className="bg-white hover:bg-gray-50 border border-gray-300 px-6 py-2 rounded-full active:scale-95 transition-all text-sm font-medium"
                        >
                            Log in
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-50 transition">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.image ?? undefined} />
                                        <AvatarFallback>
                                            {user?.name?.[0]?.toUpperCase() ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="text-sm font-medium text-gray-700">
                                        {user?.name}
                                    </span>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>
                                    <Link href="/account">My Account</Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link href="/settings">Settings</Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>


                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="menu-btn inline-block md:hidden active:scale-90 transition"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    {" "}
                    {isMobileMenuOpen ? (
                        <X size={30} className="text-primary-violet" />
                    ) : (
                        <Menu
                            size={30}
                            className="text-gray-900 cursor-pointer hover:text-primary-violet"
                        />
                    )}{" "}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 z-40 md:hidden"
                        onClick={toggleMobileMenu}
                    />
                )}

                {/* Mobile Menu Panel */}
                <div
                    className={`
            fixed top-[100px] left-0 w-full bg-white shadow-sm p-6 z-50
            md:hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-4 opacity-0 pointer-events-none"
                        }
          `}
                >
                    <ul className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    text-gray-700 hover:text-primary-violet transition-colors duration-200 block py-2
                    ${pathname === item.href
                                            ? "text-primary-violet font-medium"
                                            : ""
                                        }
                  `}
                                    onClick={toggleMobileMenu}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {!isAuthenticated ? (
                        <Link
                            href="/login"
                            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-full h-11 rounded-full flex items-center justify-center font-medium"
                            onClick={toggleMobileMenu}
                        >
                            Log In
                        </Link>
                    ) : (
                        <div className="flex flex-col space-y-4 mt-6">
                            <Link href="/account">
                                <button
                                    className="bg-white border border-gray-300 w-full h-11 rounded-full"
                                >
                                    My Account
                                </button>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className=" text-red-600 border border-red-200 w-full h-11 rounded-full"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default ModernHeaderAdvanced;
