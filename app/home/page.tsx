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
export default async function Home() {
    const session = await getSession();
    const serverSession = await getServerSession(nextAuthOptions);
    //console.log("logging new serversession:");
    //console.log(serverSession);
    //console.log("done logging new sessiondata");
    //console.log("session data: ");
    //console.log(session);
    //const session = await getServerSession(authOptions);
    const subscribedChannelsResponse = await fetch(
        process.env.URL + "/api/subscriptions",
        {
            headers: headers(),
            method: "GET",
        }
    );
    let subscriptionCount = 0;
    let subscriptionCards: React.JSX.Element[] = [];
    if (subscribedChannelsResponse.ok) {
        //console.log(subscribedChannelsResponse);
        const subscribedChannelsJSON: subscriptionResponse =
            await subscribedChannelsResponse.json();
        subscriptionCount = subscribedChannelsJSON.pageInfo.totalResults;
        const subscriptions = subscribedChannelsJSON.items;
        subscriptionCards = subscriptions.map((sub) => {
            return (
                <SubscriptionCard
                    subscriptionName={sub.snippet.title}
                    key={sub.id}
                />
            );
        });
    } else {
        console.log("couldn't get subscriptions. something went wrong");
    }

    return (
        <>
            <h1 className="text-red-50"> this is the homepage huzzah</h1>
            <div>
                Total Subscribed Channels Found:{" "}
                {subscriptionCount ? subscriptionCount : 0}
            </div>
            <div>retrieved credentials:</div>
            <div>
                retrieved channels:
                {subscriptionCards}
            </div>
        </>
    );
}
