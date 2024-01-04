import SubscriptionCard from "@/components/SubscriptionCard";
import {
    subscription,
    subscriptionResponse,
} from "@/types/youtube-utils-types";
import { ReactElement } from "react";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/auth-utils";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import SubscriptionList from "@/components/SubscriptionList";
import Link from "next/link";
export default async function Home() {
    return (
        <>
            <h1 className="text-red-50"> this is the homepage huzzah</h1>
            <Link href="/create-group">Create A Subscription Group</Link>
        </>
    );
}
