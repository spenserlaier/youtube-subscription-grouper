"use client";
import { discovery_v1 } from "googleapis";
import { useSession, signOut, signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
export default function SignInButton() {
    const { data } = useSession();
    //console.log(data);

    if (data && data.user) {
        return (
            <div className="flex flex-row align-middle items-center">
                <div>Signed in as {data.user.email}</div>
                <div className="rounded-lg border text-center p-3 m-3">
                    <button onClick={() => signOut()}>Sign out</button>{" "}
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-row align-middle items-center">
            <div>Not signed in</div>
            <div className="rounded-lg border text-center p-3 m-3">
                <button onClick={() => signIn()}>Sign in</button>{" "}
            </div>
        </div>
    );
}
