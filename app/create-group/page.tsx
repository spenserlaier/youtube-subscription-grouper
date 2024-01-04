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
import SubscriptionListForm from "@/components/SubscriptionListForm";

export default async function CreateGroup() {
    const session = await getSession();
    const serverSession = await getServerSession(nextAuthOptions);
    const subscribedChannelsResponse = await fetch(
        process.env.URL + "/api/subscriptions",
        {
            headers: headers(),
            method: "GET",
        }
    );
    let subscriptionCount = 0;
    let subscriptionCards: React.JSX.Element[] = [];
    let subscriptionNames: string[] = [];
    let subscriptions: subscription[] = [];
    if (subscribedChannelsResponse.ok) {
        const subscribedChannelsJSON: subscriptionResponse =
            await subscribedChannelsResponse.json();
        subscriptionCount = subscribedChannelsJSON.pageInfo.totalResults;
        subscriptions = subscribedChannelsJSON.items;
        subscriptionNames = subscriptions.map((sub) => sub.snippet.title);
        subscriptionCards = subscriptions.map((sub) => {
            return <SubscriptionCard {...sub} key={sub.id} />;
        });
        //console.log(subscribedChannelsJSON);
    } else {
        console.log("couldn't get subscriptions. something went wrong");
    }

    return (
        <>
            <div>
                Total Subscribed Channels Found:{" "}
                {subscriptionCount ? subscriptionCount : 0}
            </div>
            <SubscriptionListForm initialSubscriptions={[] /*subscriptions*/} />
        </>
    );
}
