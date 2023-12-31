import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/components/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Youtube Subscription Grouper",
    description: "Group and manage your Youtube subscriptions",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NextAuthProvider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </NextAuthProvider>
    );
}
