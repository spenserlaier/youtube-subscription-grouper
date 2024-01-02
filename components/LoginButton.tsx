"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
export default function SignInButton() {
    const { data } = useSession();
    //console.log(data);

    if (data && data.user) {
        return (
            <>
                {" "}
                Signed in as {data.user.email} <br />{" "}
                <button onClick={() => signOut()}>Sign out</button>{" "}
            </>
        );
    }
    return (
        <>
            {" "}
            Not signed in <br />{" "}
            <button onClick={() => signIn()}>Sign in</button>{" "}
        </>
    );
}
