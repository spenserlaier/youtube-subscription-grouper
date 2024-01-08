import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import NextAuthProvider from "@/components/NextAuthProvider";
import CustomDndProvider from "@/components/CustomDndProvider";
//import { HTML5Backend } from "react-dnd-html5-backend";
import CustomHtml5Backend from "@/components/CustomHtml5Backend";
import "./globals.css";
import Header from "@/components/Header";

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
            <CustomDndProvider backend={CustomHtml5Backend}>
                <html lang="en">
                    <body className={`${inter.className} bg-gray-600`}>
                        <Header />
                        {children}
                    </body>
                </html>
            </CustomDndProvider>
        </NextAuthProvider>
    );
}
