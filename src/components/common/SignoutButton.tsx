import { signOut } from '@/auth';
import React from 'react'
import { Button } from '../ui/button';

export default function SignoutButton() {
    return (
        <div>
            <form
                action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                }}
            >
                <Button type="submit" variant="destructive">
                    Sign out
                </Button>
            </form>
        </div>
    )
}
