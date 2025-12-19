import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) redirect("/login");
    //session yok -> login
    //session var -> dashboard render

    return (
        <div className="max-w-4xl mx-auto mt-20 p-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-2">
                    {/* login sirasinda authorize() returnu
                    oradaki user objesi sessiona yazilir session.user
                    authorize() - user - session.user */}
                    Welcome back, <span className="font-semibold">{session.user?.name}</span>!
                </p>
                <p className="text-sm text-gray-500 mb-6">{session.user?.email}</p>

                <form
                // server action form submit ile tetilendigi icin form icine yaziyoruz
                // button click - POST - server
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/login" });
                    }} //session silinir - cookie temizlenir - user logine gonderilir
                >
                    <Button type="submit" variant="destructive">
                        Sign out
                    </Button>
                </form>
            </div>
        </div>
    );
}


// LOGIN
// Form → Server Action → signIn → Session

// DASHBOARD
// auth() → session var mı? → render

// LOGOUT
// Form → Server Action → signOut → redirect