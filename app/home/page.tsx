import Image from 'next/image'
import { getAuthClient } from '@/utils/auth-utils'
import { redirect } from 'next/navigation';
import { getSubscribedChannels } from '@/utils/youtube/youtube-utils';
import { subscription, subscriptionResponse } from '@/utils/youtube/youtube-utils-types';
import SubscriptionCard from '@/components/SubscriptionCard';
//import Link from 'next/link';

export default async function Home() {
    const oauthClient = getAuthClient();
    const credentials = oauthClient.credentials;
    //console.log(credentials);
    if (credentials.access_token == undefined) {
        console.log("credentials are undefined. not properly set...")
        redirect("/login");
    }
    const subscribedChannelsResponse: subscriptionResponse = await getSubscribedChannels(credentials.access_token);
    //console.log("logging response from /home")
    //console.log(subscribedChannelsResponse);
    /*
    if (subscribedChannelsResponse != null ){
        for (const channel of subscribedChannelsResponse.items) {
            console.log(channel);
        }
    }
     */
    if (subscribedChannelsResponse != null) {
        //console.log(subscribedChannelsResponse)
        //console.log(subscribedChannelsResponse.nextPageToken)
        //console.log(subscribedChannelsResponse.prevPageToken)
        //console.log(subscribedChannelsResponse.pageInfo)
        //console.log(subscribedChannelsResponse.kind)
    }
    const subscriptions = subscribedChannelsResponse.items;
    const subscriptionCards = subscriptions.map( (sub) => {
        //console.log(sub.snippet.title);
        //console.log(sub)
        return <SubscriptionCard subscriptionName={sub.snippet.title} key={sub.id}/>
    })

  return (
      <>
          <h1 className="text-red-50"> this is the homepage huzzah</h1>
          <div> 
              retrieved credentials:
              {credentials.access_token}
          </div>
          <div>
              retrieved channels:
              {subscriptionCards}
          </div>
      </>
  )
}
