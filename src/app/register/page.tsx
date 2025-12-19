"use client";

import { registerAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react"
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Register"}
        </Button>
    );
}

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerAction, null);
    const router = useRouter();

    // Redirect on success
    useEffect(() => {
        if (state?.success) {
            router.push("/dashboard");
        }
    }, [state?.success, router]);

    return (
        <form action={formAction} className="max-w-sm mx-auto space-y-4 mt-20">
            <h1 className="text-2xl font-bold">Create account</h1>

            {state?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">{state.error}</p>
                    {state.details && (
                        <div className="mt-2 text-sm">
                            {state.details.email && <p>Email: {state.details.email.join(", ")}</p>}
                            {state.details.username && <p>Username: {state.details.username.join(", ")}</p>}
                            {state.details.password && <p>Password: {state.details.password.join(", ")}</p>}
                        </div>
                    )}
                </div>
            )}

            {state?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Account created successfully! Redirecting...
                </div>
            )}

            <Input name="email" placeholder="Email" type="email" required />
            <Input name="username" placeholder="Username" required />
            <Input name="password" placeholder="Password" type="password" required />

            <SubmitButton />
        </form>
    );
}