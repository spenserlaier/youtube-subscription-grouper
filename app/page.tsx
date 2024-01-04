import LoginButton from "@/components/LoginButton";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <h1>This is the Home Page</h1>
            <div>
                <LoginButton />
            </div>
            <div>
                <Link href="/home">Visit your home page</Link>
            </div>
        </>
    );
}
