"use client";

import { loginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
        </Button>
    );
}

export default function LoginPage() {
    const [state, formAction] = useActionState(loginAction, null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    // redirect kontrolu
    useEffect(() => {
        if (state?.success) {
            const callbackUrl = state?.callbackUrl || "/dashboard";
            router.push("/dashboard");
        }
    }, [state?.success, state?.callbackUrl, router]);

    return (
        <div className="max-w-sm mx-auto mt-20">
            <form action={formAction} className="space-y-4">
                <h1 className="text-2xl font-bold">Sign in</h1>
{/* serverdan gelen state gore ui */}
                {state?.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-bold">{state.error}</p>
                        {state.details && (
                            <div className="mt-2 text-sm">
                                {state.details.email && (
                                    <p>Email: {state.details.email.join(", ")}</p>
                                )}
                                {state.details.password && (
                                    <p>Password: {state.details.password.join(", ")}</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {state?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Login successful! Redirecting...
                    </div>
                )}

                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    autoComplete="email"
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    autoComplete="current-password"
                />

                <SubmitButton />
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
}