import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) redirect("/login");

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">
                Welcome {session.user?.email}
            </h1>
        </div>
    );
}
