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
        <div>
            <h1 className="text-2xl text-center">
                Youtube Subscription Grouper. Create groups of subscriptions and
                stay up-to-date with new videos.
            </h1>
        </div>
    );
}
