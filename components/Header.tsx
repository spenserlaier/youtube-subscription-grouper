import Link from "next/link";
//import { signIn, signOut } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Header() {
    return (
        <header className="flex flex-row justify-around items-center border text-xl rounded-lg">
            <Link className="border p-2 rounded-lg m-2" href="/home">
                {" "}
                Go Home
            </Link>
            <Link className="border p-2 rounded-lg m-2" href="/create-group">
                {" "}
                Create a Group of Subscriptions
            </Link>
            <Link className="border p-2 rounded-lg m-2" href="/view-groups">
                {" "}
                View Created Groups
            </Link>
            <LoginButton></LoginButton>
        </header>
    );
}
