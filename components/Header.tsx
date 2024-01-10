import Link from "next/link";
//import { signIn, signOut } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Header() {
    return (
        <header className="flex flex-row justify-between border">
            <LoginButton></LoginButton>
            <Link href="/home"> Go Home</Link>
            <Link href="/create-group"> Create a Group of Subscriptions</Link>
            <Link href="/"> Root Page </Link>
            <Link href="/view-groups"> View Created Groups</Link>
        </header>
    );
}
