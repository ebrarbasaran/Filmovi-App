import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";

export default async function AdminLayout({
    children,
}:{
    children: React.ReactNode;
}) {
    const session = await auth();

    if(!session){
        redirect("/login")
    }

    if(session.user.role !== "ADMIN"){
        redirect("/dashboard");
    }

    return(
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar/>
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}