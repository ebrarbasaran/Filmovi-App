import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/"];
const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard", "/profile", "/settings"];
//sayfalari kategorize ettik
//ehr sayfa ekledigimizde tek biur yerden guncelleme yapip kontrolleri saglayabiliriz

const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; //!! boolena degerine zorlar

    const isAuthRoute = authRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );
    const isProtectedRoutes = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

    if (isPublicRoutes) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", nextUrl));
        }
        return NextResponse.next();
    }

    if (isProtectedRoutes && !isLoggedIn) 
        {
            const loginUrl = new URL("/login", nextUrl);
            loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

//middleware her zaman edge runtimeda calisir 
//auth() node.js runtime ister //bcrypt cryto adapter vs kullanir //edge uyumlu degildir bu yuzden patlar 