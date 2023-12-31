import SubscriptionCard from "@/components/SubscriptionCard";
import {
    subscription,
    subscriptionResponse,
} from "@/types/youtube-utils-types";

export default async function Home() {
    const subscribedChannelsResponse = await fetch("/api/subscriptions");
    const subscribedChannelsJSON: subscriptionResponse =
        await subscribedChannelsResponse.json();
    const subscriptionCount = subscribedChannelsJSON.pageInfo.totalResults;
    const subscriptions = subscribedChannelsJSON.items;
    const subscriptionCards = subscriptions.map((sub) => {
        return (
            <SubscriptionCard
                subscriptionName={sub.snippet.title}
                key={sub.id}
            />
        );
    });

    return (
        <>
            <h1 className="text-red-50"> this is the homepage huzzah</h1>
            <div>Total Subscribed Channels Found: {subscriptionCount}</div>
            <div>retrieved credentials:</div>
            <div>
                retrieved channels:
                {subscriptionCards}
            </div>
        </>
    );
}
