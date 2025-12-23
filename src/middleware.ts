import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
});

// import { authConfig } from "@/auth.config";
// import NextAuth from "next-auth";
// import { NextResponse } from "next/server";

// const publicRoutes = ["/"];
// const authRoutes = ["/login", "/register"];
// const protectedRoutes = ["/dashboard", "/profile", "/settings"];
// const adminRoutes = ["/admin"];
// //sayfalari kategorize ettik
// //ehr sayfa ekledigimizde tek biur yerden guncelleme yapip kontrolleri saglayabiliriz

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;

//   const session = req.auth;
//   const isLoggedIn = !!session;
//   const role = session?.user?.role;

//   const pathname = nextUrl.pathname;

//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
//   const isProtectedRoutes = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isPublicRoutes = publicRoutes.includes(pathname);
//   const isAdminRoutes = adminRoutes.some((route) => pathname.startsWith(route));

//   if (isPublicRoutes) {
//     return NextResponse.next();
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl));
//     }
//     return NextResponse.next();
//   }

//   if (isAdminRoutes) {
//     if (!isLoggedIn) {
//       return NextResponse.redirect(new URL("/login", nextUrl));
//     }
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/unauthorized", nextUrl));
//     }
//     return NextResponse.next();
//   }

//   if (isProtectedRoutes && !isLoggedIn) {
//     const loginUrl = new URL("/login", nextUrl);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

// //middleware her zaman edge runtimeda calisir
// //auth() node.js runtime ister //bcrypt cryto adapter vs kullanir //edge uyumlu degildir bu yuzden patlar
